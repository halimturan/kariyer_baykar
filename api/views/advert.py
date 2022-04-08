from rest_framework import viewsets, filters
from rest_framework.permissions import IsAdminUser
from rest_framework_api_key.permissions import HasAPIKey
from api.models import Advert
from api.serializers.advert import AdvertSerializers, AdvertForGetSerializers
from django_filters.rest_framework import DjangoFilterBackend


class AdvertViewSet(viewsets.ModelViewSet):
    permission_classes = [HasAPIKey | IsAdminUser]
    queryset = Advert.objects.all()
    serializer_class = AdvertSerializers
    filter_backends = (DjangoFilterBackend, filters.OrderingFilter, filters.SearchFilter)
    filterset_fields = ('publisher', 'company', 'id', 'working_type', 'position_level', 'city')
    search_fields = ['title']

    def get_serializer_class(self):
        if self.request:
            if self.request.method != 'GET':
                return AdvertSerializers
        return AdvertForGetSerializers
