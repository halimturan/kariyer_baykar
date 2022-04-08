from rest_framework import viewsets
from rest_framework.permissions import IsAdminUser
from rest_framework_api_key.permissions import HasAPIKey
from api.models import Company
from api.serializers.company import CompanySerializers


class CompanyViewSet(viewsets.ModelViewSet):
    permission_classes = [HasAPIKey | IsAdminUser]
    queryset = Company.objects.all()
    serializer_class = CompanySerializers
