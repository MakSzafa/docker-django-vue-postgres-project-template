from django.core.mail import send_mail
from django.template.loader import render_to_string
from django.contrib.auth.tokens import PasswordResetTokenGenerator

from rest_framework import viewsets, status, permissions
from rest_framework.decorators import action
from rest_framework.response import Response

from apps.users.models import User
from apps.users.serializers import UserSerializer, UserWriteSerializer, UserPasswordResetSerializer, UserPasswordResetChangeSerializer


class UserViewSet(viewsets.ModelViewSet):
    queryset = User.objects.all()
    serializer_class = UserSerializer
    permission_classes = []

    def get_serializer_class(self):
        if self.action in ['list', 'retrieve']:
            return UserSerializer
        return UserWriteSerializer

    def get_permissions(self):

        if self.action == 'create':
            permission_classes = []
        else:
            permission_classes = [] # permissions.isAuthenticated permissions.IsAuthenticatedOrReadOnly

        return [permission() for permission in permission_classes]

    def perform_create(self, serializer):
        user = serializer.save()
        user.set_password(self.request.data.get('password'))
        user.save()

    def perform_update(self, serializer):
        user = serializer.save()
        if 'password' in self.request.data:
            user.set_password(self.request.data.get('password'))
            user.save()

    # If you want to keep user related data after deleting, change its is_active instead of deleting

    # def perform_destroy(self, instance):
    #     instance.is_active = False
    #     instance.save()

    @action(methods=['POST'], detail=False, serializer_class=UserPasswordResetSerializer)
    def password_reset(self, request):
        if User.objects.filter(email=request.data['email']).exists():
            user = User.objects.get(email=request.data['email'])
            user.password_reset_token = PasswordResetTokenGenerator().make_token(user)
            user.save()
            params = {'user': user, 'DOMAIN': 'https://example.com'}
            send_mail(
                subject='Password reset',
                message=render_to_string('templates/password_reset.txt', params),
                from_email='from@example.com',
                recipient_list=[request.data['email']],
            )
            return Response(status=status.HTTP_200_OK)
        else:
            return Response(status=status.HTTP_404_NOT_FOUND)

    @action(methods=['POST'], detail=False, serializer_class=UserPasswordResetChangeSerializer)
    def password_change(self, request):
        if User.objects.filter(email=request.data['email']).exists():
            user = User.objects.get(email=request.data['email'])
            if PasswordResetTokenGenerator().check_token(user, request.data['password_reset_token']):
                user.set_password(request.data['password'])
                user.password_reset_token = None
                user.save()
                return Response(status=status.HTTP_200_OK)
            else:
                return Response(status=status.HTTP_404_NOT_FOUND)
        else:
            return Response(status=status.HTTP_404_NOT_FOUND)
