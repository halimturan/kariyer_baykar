from rest_framework import serializers
from api.models import UserExperience
from api.serializers import CompanySerializers


class UserExperienceSerializers(serializers.ModelSerializer):

    class Meta:
        model = UserExperience
        fields = '__all__'


class UserExperienceForGetSerializers(serializers.ModelSerializer):
    company = CompanySerializers(read_only=True)

    class Meta:
        model = UserExperience
        fields = '__all__'
