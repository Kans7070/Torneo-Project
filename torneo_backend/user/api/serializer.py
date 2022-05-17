from this import d
from wsgiref import validate
from rest_framework.response import Response
from rest_framework import status
from user.models import User
from rest_framework import serializers
from django.contrib import auth, messages


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id', 'username', 'first_name', 'last_name', 'email',
                  'place', 'phone_number', 'is_active', 'is_admin','password','is_staff']
        extrakwargs = {'password': {'write_only': True}}

    def create(self):
        user = User.objects.create_user(username=self.validated_data['username'], first_name=self.validated_data['first_name'], last_name=self.validated_data['last_name'],
                                        email=self.validated_data['email'], place=self.validated_data['place'], phone_number=self.validated_data['phone_number'], password=self.validated_data['password'],)
        user.set_password(self.validated_data['password'])
        user.save()
        # print(data)
        return user

    def login(self):
        user = auth.authenticate(
            username=self.validated_data['username'], password=self.validated_data['password'])
        if user is not None:
            auth.login(user)
            return True
        else:
            return False

    def update(self, instance, data):
        user = instance
        try:
            user.first_name = data['first_name']
        except:
            pass
        try:
            user.last_name = data['last_name']
        except:
            pass
        try:
            user.username = data['username']
        except:
            pass
        try:
            user.email = data['email']

        except:
            pass
        try:
            user.place = data['place']
        except:
            pass
        try:
            user.phone_number = data['phone_number']
        except:
            pass  
        try:
            user.set_password(data['password'])
        except:
            pass    
        user.save()
        return user
