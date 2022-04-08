from rest_framework import viewsets, filters
from rest_framework.permissions import IsAdminUser
from rest_framework_api_key.permissions import HasAPIKey
from api.models import RelCandidateUser
from api.serializers.rel_candidate_user import RelCandidateUserSerializers, RelCandidateUserForGetSerializers
from django_filters.rest_framework import DjangoFilterBackend


class RelCandidateUserViewSet(viewsets.ModelViewSet):
    permission_classes = [HasAPIKey | IsAdminUser]
    queryset = RelCandidateUser.objects.all()
    serializer_class = RelCandidateUserSerializers
    filter_backends = (DjangoFilterBackend, filters.OrderingFilter,)
    filterset_fields = ('candidate', 'user')

    def get_serializer_class(self):
        if self.request:
            if self.request.method != 'GET':
                return RelCandidateUserSerializers
        return RelCandidateUserForGetSerializers
