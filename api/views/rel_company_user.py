from rest_framework import viewsets, filters
from rest_framework.permissions import IsAdminUser
from rest_framework_api_key.permissions import HasAPIKey
from api.models import RelCompanyUser
from api.serializers.rel_company_user import RelCompanyUserSerializers
from django_filters.rest_framework import DjangoFilterBackend


class RelCompanyUserViewSet(viewsets.ModelViewSet):
    permission_classes = [HasAPIKey | IsAdminUser]
    queryset = RelCompanyUser.objects.all()
    serializer_class = RelCompanyUserSerializers
    filter_backends = (DjangoFilterBackend, filters.OrderingFilter,)
    filterset_fields = ('company', 'user')
