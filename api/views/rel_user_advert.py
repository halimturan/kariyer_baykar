from rest_framework import viewsets, filters
from rest_framework.permissions import IsAdminUser
from rest_framework_api_key.permissions import HasAPIKey
from api.models import RelUserAdvert
from api.serializers.rel_user_advert import RelUserAdvertSerializers, RelUserAdvertForGetSerializers
from django_filters.rest_framework import DjangoFilterBackend


class RelUserAdvertViewSet(viewsets.ModelViewSet):
    permission_classes = [HasAPIKey | IsAdminUser]
    queryset = RelUserAdvert.objects.all()
    serializer_class = RelUserAdvertSerializers
    filter_backends = (DjangoFilterBackend, filters.OrderingFilter,)
    filterset_fields = ('user', 'advert')

    def get_serializer_class(self):
        if self.request:
            if self.request.method != 'GET':
                return RelUserAdvertSerializers
        return RelUserAdvertForGetSerializers
