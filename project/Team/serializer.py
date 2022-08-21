from rest_framework import serializers
from .models import Team

class TeamListSerializer(serializers.ModelSerializer):
    class Meta:
        model = Team
        fields = ['name','id']

class TeamDataSerializer(serializers.ModelSerializer):
    
    class Meta:
        model = Team
        fields = ['name','code','members','created_at']
        