from django.shortcuts import render
from rest_framework import viewsets
from rest_framework import  permissions
from .models import Team

from rest_framework.response import Response
from .serializer import TeamListSerializer

# Create your views here.

class TeamsPartList(viewsets.ModelViewSet):
    permission_classes = [permissions.IsAuthenticated]
    queryset = Team.objects.all()
    serializer_class = TeamListSerializer
    
    def get_queryset(self):
        self.queryset=Team.objects.filter(created_by=self.request.user)
        self.queryset=Team.objects.filter(members__in=[self.request.user])
        return self.queryset
    
    
