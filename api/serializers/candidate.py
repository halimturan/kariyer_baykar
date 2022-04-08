from rest_framework import serializers
from api.models import CandidateInfo


class CandidateInfoSerializers(serializers.ModelSerializer):
    class Meta:
        model = CandidateInfo
        fields = '__all__'
