from django.contrib.auth.models import User, Group
from django.contrib.auth import authenticate
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework_simplejwt.tokens import RefreshToken
import datetime
import jwt
from django.conf import settings

class RegisterView(APIView):
    def post(self, request):
        username = request.data.get("username")
        email = request.data.get("email")
        password = request.data.get("password")

        if User.objects.filter(username=username).exists():
            return Response({"error": "Username already exists"}, status=400)
        if User.objects.filter(email=email).exists():
            return Response({"error": "Email already exists"}, status=400)

        user = User.objects.create_user(username=username, email=email, password=password)
        donor_group, _ = Group.objects.get_or_create(name="Donor")
        user.groups.add(donor_group)

        return Response({"message": "User registered successfully"}, status=status.HTTP_201_CREATED)

class LoginView(APIView):
    def post(self, request):
        username = request.data.get("username")
        password = request.data.get("password")
        user = authenticate(username=username, password=password)

        if not user:
            return Response({"error": "Invalid credentials"}, status=401)

        groups = list(user.groups.values_list("name", flat=True))
        perms = list(user.user_permissions.values_list("codename", flat=True))

        for group in user.groups.all():
            perms += list(group.permissions.values_list("codename", flat=True))

        payload = {
            "username": username,
            "userID": user.id,
            "exp": datetime.datetime.utcnow() + datetime.timedelta(days=1),
            "iat": datetime.datetime.utcnow(),
            "role": groups[0] if groups else None,
            "permissions": list(set(perms))
        }

        token = jwt.encode(payload, settings.SECRET_KEY, algorithm="HS256")

        return Response({"token": token},status= status.HTTP_200_OK)

class ValidateToken(APIView):
    """
    Validate token
    """

    @staticmethod
    def get(request):
        """
        get method
        input: encoded token
        return username
        """

        token = request.headers.get('Authorization')
        try:
            payload = jwt.decode(token, settings.SECRET_KEY, algorithms=["HS256"])
            return Response({'username':payload["username"],'role':payload['role'],
                             'permission':payload['permissions']}, status=status.HTTP_200_OK)
        except jwt.ExpiredSignatureError:
            return Response({'message': "Session expired"}, status=status.HTTP_401_UNAUTHORIZED)
        except jwt.InvalidTokenError:
            return Response({'message': "Session expired"}, status=status.HTTP_401_UNAUTHORIZED)
