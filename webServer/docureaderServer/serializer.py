from rest_framework import serializers
from .models import *
import re

class UserInfoSerializer(serializers.ModelSerializer):
    class Meta:
        model = UserInfo
        fields = '__all__'

    def validate(self, data):
        regex = re.compile(r'([A-Za-z0-9]+[.-_])*[A-Za-z0-9]+@[A-Za-z0-9-]+(\.[A-Z|a-z]{2,})+')
        if not re.fullmatch(regex, data['username']):
            print('not valid')
            raise serializers.ValidationError('Username must be an email')
        return data