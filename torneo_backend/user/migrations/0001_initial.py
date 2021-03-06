# Generated by Django 4.0.4 on 2022-05-09 12:07

from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='User',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('password', models.CharField(max_length=128, verbose_name='password')),
                ('last_login', models.DateTimeField(blank=True, null=True, verbose_name='last login')),
                ('first_name', models.CharField(max_length=50, null=True)),
                ('last_name', models.CharField(max_length=50, null=True)),
                ('username', models.CharField(max_length=50, null=True, unique=True)),
                ('email', models.CharField(max_length=50, null=True, unique=True)),
                ('phone_number', models.CharField(max_length=10, null=True, unique=True, verbose_name='mobile number')),
                ('profile_img', models.ImageField(blank=True, null=True, upload_to='userprofile')),
                ('place', models.CharField(max_length=50, null=True)),
                ('date_joined', models.DateTimeField(auto_now_add=True)),
                ('is_active', models.BooleanField(default=True)),
                ('is_superuser', models.BooleanField(default=False)),
            ],
            options={
                'abstract': False,
            },
        ),
    ]
