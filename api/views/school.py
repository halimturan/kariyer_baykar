from rest_framework import viewsets
from rest_framework.permissions import IsAdminUser
from rest_framework_api_key.permissions import HasAPIKey
from api.models import School
from api.serializers.school import SchoolSerializers


class SchoolViewSet(viewsets.ModelViewSet):
    permission_classes = [HasAPIKey | IsAdminUser]
    queryset = School.objects.all()
    serializer_class = SchoolSerializers
