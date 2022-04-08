from rest_framework import viewsets
from rest_framework.permissions import IsAdminUser
from rest_framework_api_key.permissions import HasAPIKey
from api.models import CandidateInfo
from api.serializers.candidate import CandidateInfoSerializers


class CandidateInfoViewSet(viewsets.ModelViewSet):
    permission_classes = [HasAPIKey | IsAdminUser]
    queryset = CandidateInfo.objects.all()
    serializer_class = CandidateInfoSerializers
