from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import permissions, status
from .models import Donation
from .serializers import DonationSerializer
from django.core.paginator import Paginator
from django.shortcuts import get_object_or_404
from rest_framework.permissions import IsAuthenticated
from django.contrib.auth.models import User
from donation.models import Donation

class DonationAPIView(APIView):
    def get(self, request):
        userName = request.query_params.get("userID")

        user = User.objects.get(username=userName)

        if user.groups.filter(name='ngo_admin').exists():
            donations = Donation.objects.all().order_by('-id')
        else:
            donations = Donation.objects.filter(user=user).order_by('-id')

        paginator = Paginator(donations, 10)
        page_number = request.query_params.get("page", 1)
        page_obj = paginator.get_page(page_number)

        serializer = DonationSerializer(page_obj, many=True)
        return Response({
            "results": serializer.data,
            "count": paginator.count,
            "num_pages": paginator.num_pages,
            "current_page": page_obj.number
        })

    def post(self, request):
        serializer = DonationSerializer(data=request.data)
        user, _ = User.objects.get_or_create(username=serializer.initial_data['donorName'])
        if serializer.is_valid():
            serializer.save(user=user)
            return Response(serializer.data, status=201)
        return Response(serializer.errors, status=400)

    def put(self, request):
        donation_id = request.data['id']
        user = User.objects.get(username=request.data['userID'])
        if not donation_id:
            return Response({"detail": "Donation ID is required for update"}, status=400)

        donation = get_object_or_404(Donation, id=donation_id)
        if not (user.groups.filter(name='ngo_admin').exists()):
            return Response({"detail": "Not authorized."}, status=403)

        serializer = DonationSerializer(donation, data=request.data, partial=True)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=400)

    def delete(self, request):
        donation_id = request.data['id']
        user = User.objects.get(username=request.data['userID'])
        if not donation_id:
            return Response({"detail": "Donation ID is required to delete"}, status=400)

        if not (user.groups.filter(name='ngo_admin').exists()):
            return Response({"detail": "Not authorized."}, status=403)

        donation = Donation.objects.get(id=donation_id)
        donation.delete()
        return Response({"detail": "Donation deleted successfully."}, status=204)
