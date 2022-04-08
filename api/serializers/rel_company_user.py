from rest_framework import serializers
from api.models import RelCompanyUser


class RelCompanyUserSerializers(serializers.ModelSerializer):
    class Meta:
        model = RelCompanyUser
        fields = '__all__'
