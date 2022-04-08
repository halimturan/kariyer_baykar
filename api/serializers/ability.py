from rest_framework import serializers
from api.models import Ability


class AbilitySerializers(serializers.ModelSerializer):
    class Meta:
        model = Ability
        fields = '__all__'
