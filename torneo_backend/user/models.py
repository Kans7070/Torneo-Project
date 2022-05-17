# Create your models here.
from django.db import models
from django.contrib.auth.models import AbstractBaseUser,BaseUserManager

class MyUserManager(BaseUserManager):
    def create_user(self, first_name, last_name, phone_number, username, email, password, place = None ):
        if not email:
            raise ValueError('User must have an email address ')

        if not username:
            raise ValueError('User must have an username')

        user = self.model(
            email=self.normalize_email(email),
            username=username,
            first_name=first_name,
            last_name=last_name,
            phone_number=phone_number,
            place=place,

        )
        user.is_active = True
        user.set_password(password)
        user.save(using=self._db)
        return user

    def create_superuser(self, username,email, password):
        user = self.create_user(
            username=username,
            email=email,
            password=None,
            first_name=None,
            last_name=None,
            phone_number=None
        )
        user.set_password(password)
        user.is_staff = True
        user.is_admin = True
        user.is_active = True
        user.save(using=self._db)
        return user


class User(AbstractBaseUser):
    first_name = models.CharField(max_length=50,null=True)
    last_name = models.CharField(max_length=50,null=True)
    username = models.CharField(max_length=50,null=True,unique=True)
    email = models.CharField(max_length=50, unique=True,null=True)
    phone_number = models.CharField(
        ('mobile number'), max_length=10, unique=True,null=True)
    profile_img = models.ImageField(
        null=True, blank=True, upload_to='userprofile',)
    place = models.CharField(max_length=50, null=True)
    date_joined = models.DateTimeField(auto_now_add=True)
    is_active = models.BooleanField(default=True)
    is_admin = models.BooleanField(default=False)
    is_staff = models.BooleanField(default=False)

    REQUIRED_FIELDS = ['email','password']
    USERNAME_FIELD='username'

    objects = MyUserManager()

    def _str_(self):
        return self.username

    def has_perm(self, perm, obj=None):
        return self.is_admin

    def has_module_perms(self, add_labels):
        return True,
    