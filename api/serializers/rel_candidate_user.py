from rest_framework import serializers
from api.models import RelCandidateUser
from api.serializers import UserSerializersForGet
from api.serializers import CandidateInfoSerializers


class RelCandidateUserSerializers(serializers.ModelSerializer):

    class Meta:
        model = RelCandidateUser
        fields = '__all__'


class RelCandidateUserForGetSerializers(serializers.ModelSerializer):
    user = UserSerializersForGet(read_only=True)
    candidate = CandidateInfoSerializers(read_only=True)

    class Meta:
        model = RelCandidateUser
        fields = '__all__'
