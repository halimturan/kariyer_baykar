from rest_framework import viewsets
from rest_framework.permissions import IsAdminUser
from rest_framework_api_key.permissions import HasAPIKey
from api.models import Ability
from api.serializers.ability import AbilitySerializers


class AbilityViewSet(viewsets.ModelViewSet):
    permission_classes = [HasAPIKey | IsAdminUser]
    queryset = Ability.objects.all()
    serializer_class = AbilitySerializers
