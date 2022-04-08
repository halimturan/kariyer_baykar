from rest_framework import serializers
from api.models import RelUserAdvert
from api.serializers import UserSerializersForGet


class RelUserAdvertSerializers(serializers.ModelSerializer):
    class Meta:
        model = RelUserAdvert
        fields = '__all__'


class RelUserAdvertForGetSerializers(serializers.ModelSerializer):
    user = UserSerializersForGet(read_only=True)

    class Meta:
        model = RelUserAdvert
        fields = '__all__'
