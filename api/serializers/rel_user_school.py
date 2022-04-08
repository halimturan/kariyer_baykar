from rest_framework import serializers
from api.models import RelUserSchool
from api.serializers.school import SchoolSerializers


class RelCandidateSchoolSerializers(serializers.ModelSerializer):

    class Meta:
        model = RelUserSchool
        fields = '__all__'


class RelCandidateSchoolForGetSerializers(serializers.ModelSerializer):
    school = SchoolSerializers(read_only=True)

    class Meta:
        model = RelUserSchool
        fields = '__all__'
