from rest_framework import serializers
from api.models import RelCandidateAbility


class RelCandidateAbilitySerializers(serializers.ModelSerializer):
    class Meta:
        model = RelCandidateAbility
        fields = '__all__'
