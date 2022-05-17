from user.views import RegisterView,OTPView,LoginView,UserViewSet
from django.urls import include, path
from rest_framework import routers


user_router = routers.DefaultRouter()



urlpatterns = [
    # path('/',include(user_router.urls) ),
    path('register/',RegisterView.as_view(),name='register'),
    path('login/',LoginView.as_view(),name='login'),
    path('otp/',OTPView.as_view(),name='otp'),
    path('',include(user_router.urls)),
    path('user/',UserViewSet.as_view()),
    path('user/<int:pk>/',UserViewSet.as_view())
]
