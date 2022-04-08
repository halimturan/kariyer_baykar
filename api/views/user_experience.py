from rest_framework import viewsets, filters
from rest_framework.permissions import IsAdminUser
from rest_framework_api_key.permissions import HasAPIKey
from api.models import UserExperience
from api.serializers.user_experience import UserExperienceSerializers, UserExperienceForGetSerializers
from django_filters.rest_framework import DjangoFilterBackend


class UserExperienceViewSet(viewsets.ModelViewSet):
    permission_classes = [HasAPIKey | IsAdminUser]
    queryset = UserExperience.objects.all()
    serializer_class = UserExperienceSerializers
    filter_backends = (DjangoFilterBackend, filters.OrderingFilter,)
    filterset_fields = ('company', 'user')

    def get_serializer_class(self):
        if self.request:
            if self.request.method != 'GET':
                return UserExperienceSerializers
        return UserExperienceForGetSerializers
