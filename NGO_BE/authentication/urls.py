from django.urls import path
from .views import RegisterView, LoginView, ValidateToken

urlpatterns = [
    path('register/', RegisterView.as_view()),
    path('login/', LoginView.as_view()),
    path('validate-token/', ValidateToken.as_view())
]
