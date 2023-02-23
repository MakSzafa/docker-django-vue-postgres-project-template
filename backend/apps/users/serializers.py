from rest_framework import serializers
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from rest_framework_simplejwt.settings import api_settings
from django.contrib.auth.models import update_last_login

from django.conf import settings

from apps.users.models import User


class UserSerializer(serializers.ModelSerializer):
    avatar = serializers.SerializerMethodField()
    full_name = serializers.SerializerMethodField()
    short_name = serializers.SerializerMethodField()

    registered_at = serializers.DateTimeField(format='%H:%M %d.%m.%Y', read_only=True)
    url = serializers.HyperlinkedIdentityField(view_name='user-detail', lookup_field='pk')
    
    def get_avatar(self, obj):
        return obj.avatar.url if obj.avatar else settings.STATIC_URL + 'images/default_avatar.png'

    def get_full_name(self, obj):
        return obj.full_name

    def get_short_name(self, obj):
        return obj.short_name

    class Meta:
        model = User
        fields = ['id', 'url', 'email', 'avatar', 'full_name', 'short_name', 'registered_at']


class UserWriteSerializer(serializers.ModelSerializer):

    class Meta:
        model = User
        fields = ['email', 'password', 'first_name', 'last_name', 'avatar']


class UserPasswordResetSerializer(serializers.ModelSerializer):

    class Meta:
        model = User
        fields = ['email']

class UserPasswordResetChangeSerializer(serializers.ModelSerializer):

    class Meta:
        model = User
        fields = ['email', 'password', 'password_reset_token']

class MyTokenObtainPairSerializer(TokenObtainPairSerializer):

    def validate(self, attrs):
        data = super().validate(attrs)

        refresh = self.get_token(self.user)

        data['refresh'] = str(refresh)
        data['access'] = str(refresh.access_token)
        data['id'] = self.user.id

        if api_settings.UPDATE_LAST_LOGIN:
            update_last_login(None, self.user)

        return data