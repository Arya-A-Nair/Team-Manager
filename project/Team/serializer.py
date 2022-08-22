from rest_framework import serializers
from .models import Team,Task
from django.contrib.auth.models import User

class TeamListSerializer(serializers.ModelSerializer):
    class Meta:
        model = Team
        fields = ['name','id']

class TeamDataSerializer(serializers.ModelSerializer):
    
    class Meta:
        model = Team
        fields = ['name','members','created_at','id']

class TaskSerializer(serializers.ModelSerializer):
    assigned_to=serializers.CharField(source='assigned_to.username')
    class Meta:
        model = Task
        fields='__all__'

class MemberSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = '__all__'

class TeamMemberSerializer(serializers.ModelSerializer):
    members=MemberSerializer(many=True)
    class Meta:
        model = Team
        fields=['name','members']

        