from rest_framework import viewsets, filters
from rest_framework.permissions import IsAdminUser
from rest_framework_api_key.permissions import HasAPIKey
from api.models import RelUserSchool
from api.serializers.rel_user_school import RelCandidateSchoolSerializers, RelCandidateSchoolForGetSerializers
from django_filters.rest_framework import DjangoFilterBackend


class RelCandidateSchoolViewSet(viewsets.ModelViewSet):
    permission_classes = [HasAPIKey | IsAdminUser]
    queryset = RelUserSchool.objects.all()
    serializer_class = RelCandidateSchoolSerializers
    filter_backends = (DjangoFilterBackend, filters.OrderingFilter,)
    filterset_fields = ('user', 'school')

    def get_serializer_class(self):
        if self.request:
            if self.request.method != 'GET':
                return RelCandidateSchoolSerializers
        return RelCandidateSchoolForGetSerializers

