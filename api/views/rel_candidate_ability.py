from rest_framework import viewsets, filters
from rest_framework.permissions import IsAdminUser
from rest_framework_api_key.permissions import HasAPIKey
from api.models import RelCandidateAbility
from api.serializers.rel_candidate_ability import RelCandidateAbilitySerializers
from django_filters.rest_framework import DjangoFilterBackend


class RelCandidateAbilityViewSet(viewsets.ModelViewSet):
    permission_classes = [HasAPIKey | IsAdminUser]
    queryset = RelCandidateAbility.objects.all()
    serializer_class = RelCandidateAbilitySerializers
    filter_backends = (DjangoFilterBackend, filters.OrderingFilter,)
    filterset_fields = ('candidate', 'ability')
