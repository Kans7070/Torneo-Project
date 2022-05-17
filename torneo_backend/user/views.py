import json
from urllib import request
from rest_framework.response import Response
from django.http import HttpResponse, JsonResponse
from django.shortcuts import render
from user.otp import verify
from rest_framework import status
from user.otp import otp_verify
from .models import User
from rest_framework.views import APIView
from user.api.serializer import UserSerializer
from rest_framework import viewsets
from django.contrib import auth
from rest_framework.permissions import AllowAny, IsAuthenticated
# Create your views here.

# class UserViewSet(viewsets.ModelViewSet):
#     queryset = User.objects.all()
#     serializer_class = UserSerializer
#     http_method_names = ['get',]


class RegisterView(APIView):
    permission_classes = [AllowAny]

    def post(self, request):
        serializer = UserSerializer(data=request.data)
        print(request.data)
        if serializer.is_valid():
            print(serializer.data)
            serializer.create()
            return Response(serializer.validated_data)
        else:
            return Response(serializer.errors)


class OTPView(APIView):
    def post(self, request):
        print(request.data)
        print(request.data['otp_number'])
        print(request.data['phone_number'])
        if request.data['otp']:
            print('hai')
            # if verify(request.data['phone_number'],request.data['otp_number']):
            print('hai')
            return Response('otp verified', status=status.HTTP_202_ACCEPTED)
            # else:
            #     return Response('otp is wrong',status=status.HTTP_401_UNAUTHORIZED)
        else:
            print(request.data["otp"])
            # otp_verify(request.data['phone_number'])
            return Response('otp sended', status=status.HTTP_201_CREATED)


class LoginView(APIView):
    def post(self, request):
        # print(request.data)
        # try:
        #     admin = request.data["admin"]
        # except:
        #     admin = False
        # print(admin)
        # if admin:
        #     user = auth.authenticate(username=request.data['username'], password=request.data['password'])
        #     print(user)
        #     if user:
        #         user_serializer = UserSerializer(user)
        #         return Response(user_serializer.data, status=status.HTTP_202_ACCEPTED)
        #     return Response('login with admin credentials', status=status.HTTP_400_BAD_REQUEST)
        # else:
        user = auth.authenticate(
            username=request.data['username'], password=request.data['password'])
        if not user:
            return Response('user not found', status=status.HTTP_400_BAD_REQUEST)
        user_serializer = UserSerializer(user)
        print(user_serializer)
        return Response(user_serializer.data, status=status.HTTP_202_ACCEPTED)


class UserViewSet(APIView):
    def get(self, request, pk=None):
        print(pk)
        if pk is not None:
            user = User.objects.filter(id=pk)
            user_serializer = UserSerializer(user, many=True)
            return Response(user_serializer.data)
        user = User.objects.all()
        user_serializer = UserSerializer(user, many=True)
        return Response(user_serializer.data)

    def put(self, request, pk):
        user = User.objects.get(id=pk)
        user_serializer = UserSerializer(user, data=request.data)
        if user_serializer.is_valid():
            user_serializer.save()
            return Response(user_serializer.data)
        else:
            return Response(user_serializer.errors)

    def post(self, request):
        serializer = UserSerializer(data=request.data)
        print(request.data)
        if serializer.is_valid():
            print(serializer.data)
            serializer.create()
            return Response(serializer.validated_data)
        else:
            return Response(serializer.errors)
