from rest_framework import viewsets, filters
from rest_framework.permissions import IsAdminUser
from rest_framework_api_key.permissions import HasAPIKey
from api.models import AdvertTag
from api.serializers.advert_tag import AdvertTagSerializers, AdvertTagForGetSerializers
from django_filters.rest_framework import DjangoFilterBackend


class AdvertTagViewSet(viewsets.ModelViewSet):
    permission_classes = [HasAPIKey | IsAdminUser]
    queryset = AdvertTag.objects.all()
    serializer_class = AdvertTagSerializers
    filter_backends = (DjangoFilterBackend, filters.OrderingFilter, filters.SearchFilter)
    filterset_fields = ('advert',)
    search_fields = ['name']

    def get_serializer_class(self):
        if self.request:
            if self.request.method != 'GET':
                return AdvertTagSerializers
        return AdvertTagForGetSerializers
