from rest_framework import viewsets, filters, status
from rest_framework.permissions import IsAdminUser
from rest_framework_api_key.permissions import HasAPIKey
from api.models import User
from api.serializers.user import UserSerializers, UserSerializersForGet, UserSerializer2
from django_filters.rest_framework import DjangoFilterBackend
from rest_framework.response import Response


class UserViewSet(viewsets.ModelViewSet):
    permission_classes = [HasAPIKey | IsAdminUser]
    queryset = User.objects.all()
    serializer_class = UserSerializers
    filter_backends = (DjangoFilterBackend, filters.OrderingFilter,)
    filterset_fields = ('username', 'email', 'id')

    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        self.perform_create(serializer)
        headers = self.get_success_headers(serializer.data)
        return Response(serializer.data, status=status.HTTP_201_CREATED, headers=headers)

    def partial_update(self, request, *args, **kwargs):
        user_id = request.data.get("id")
        user = User.objects.get(pk=user_id)
        serializer = UserSerializer2(user, data=request.data, partial=True)
        serializer.is_valid(raise_exception=True)
        serializer.save()
        return Response(serializer.data)

    def update(self, request, *args, **kwargs):
        user_id = request.data.get("id")
        user = User.objects.get(pk=user_id)
        serializer = UserSerializer2(user, data=request.data, partial=True)
        serializer.is_valid(raise_exception=True)
        serializer.save()
        return Response(serializer.data)

    def get_serializer_class(self):
        if self.request:
            if self.request.method == 'PUT' or self.request.method == 'PATCH':
                return UserSerializer2
            elif self.request.method == "GET":
                return UserSerializersForGet
        return UserSerializers
