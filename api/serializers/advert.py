from rest_framework import serializers
from api.models import Advert, RelUserAdvert
from api.serializers.company import CompanySerializers


class AdvertSerializers(serializers.ModelSerializer):
    class Meta:
        model = Advert
        fields = '__all__'


class AdvertForGetSerializers(serializers.ModelSerializer):
    company = CompanySerializers(read_only=True)
    applied_count = serializers.SerializerMethodField()

    class Meta:
        model = Advert
        fields = ('id', 'company', 'publisher', 'date', 'position_level', 'working_type', 'city', 'department', 'title',
                  'description', 'applied_count')

    @staticmethod
    def get_applied_count(obj):
        return RelUserAdvert.objects.filter(advert=obj.id).count()
