from django.urls import path
from .views import DonationAPIView

urlpatterns = [
    path('donation/', DonationAPIView.as_view(), name='donation-crud'),
]