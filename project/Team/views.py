from django.shortcuts import render
from rest_framework import viewsets
from rest_framework import  permissions
from .models import Team
from rest_framework.permissions import IsAuthenticated
from rest_framework.decorators import permission_classes, api_view

from rest_framework.response import Response
from .serializer import TeamListSerializer, TeamDataSerializer

# Create your views here.

class TeamsPartList(viewsets.ModelViewSet):
    permission_classes = [permissions.IsAuthenticated]
    queryset = Team.objects.all()
    serializer_class = TeamListSerializer
    
    def get_queryset(self):
        self.queryset=Team.objects.filter(created_by=self.request.user)
        self.queryset=Team.objects.filter(members__in=[self.request.user])
        return self.queryset

@api_view(['POST'])
@permission_classes((IsAuthenticated,))
def getTeamData(request):
    team_id=request.data['team_id']
    team=Team.objects.get(id=team_id)
    if(team.created_by==request.user or team.members.filter(id=request.user.id).exists()):
        serializer=TeamDataSerializer(team)
        return Response(serializer.data)
    else:
        return Response({"message":"You are not authorized to access this team"},status=401)

