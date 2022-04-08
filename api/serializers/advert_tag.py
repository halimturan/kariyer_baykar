from rest_framework import serializers
from api.models import AdvertTag
from api.serializers import AdvertForGetSerializers


class AdvertTagSerializers(serializers.ModelSerializer):

    class Meta:
        model = AdvertTag
        fields = '__all__'


class AdvertTagForGetSerializers(serializers.ModelSerializer):
    advert = AdvertForGetSerializers(read_only=True)

    class Meta:
        model = AdvertTag
        fields = '__all__'
