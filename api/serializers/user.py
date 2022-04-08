from rest_framework import serializers
from api.models import User
from django.core import exceptions
import django.contrib.auth.password_validation as validators


class UserSerializersForGet(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('id', 'first_name', 'last_name', 'username', 'email', 'photo', 'status')


class UserSerializer2(serializers.HyperlinkedModelSerializer):
    password = serializers.CharField(
        write_only=True,
        required=False
    )

    class Meta:
        model = User
        fields = (
            'id',
            'username',
            'password',
            'first_name',
            'last_name',
            'email',
            'photo',
        )

    def update(self, instance, validated_data):
        if validated_data.get('password') is not None:
            password = validated_data.pop("password")
            instance.__dict__.update(validated_data)
            errors = dict()
            if password:
                user = User.objects.get(username=instance)
                try:
                    validators.validate_password(password, user)
                    user.set_password(password)
                    user.save()
                except exceptions.ValidationError as e:
                    errors['password'] = list(e.messages)
                if errors:
                    raise serializers.ValidationError(errors)
                return super(UserSerializer2, self).validate(instance)
        else:
            instance.__dict__.update(validated_data)
            instance.save()
        return instance


class UserSerializers(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = '__all__'

    def validate(self, data):
        password = data.get('password')
        errors = dict()
        try:
            validators.validate_password(password, User)
        except exceptions.ValidationError as e:
            errors['password'] = list(e.messages)
        if errors:
            raise serializers.ValidationError(errors)
        return super(UserSerializers, self).validate(data)

    def create(self, validated_data):
        user = super(UserSerializers, self).create(validated_data)
        user.set_password(validated_data['password'])
        user.save()
        return user
