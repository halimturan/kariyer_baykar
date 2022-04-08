from rest_framework import serializers
from api.models import Company


class CompanySerializers(serializers.ModelSerializer):
    class Meta:
        model = Company
        fields = '__all__'
