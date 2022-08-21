from django.shortcuts import render
from rest_framework import viewsets
from rest_framework import  permissions
from .models import Team, Task
from rest_framework.permissions import IsAuthenticated
from rest_framework.decorators import permission_classes, api_view

from rest_framework.response import Response
from .serializer import TeamListSerializer, TeamDataSerializer, TaskSerializer

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

@api_view(['POST'])
@permission_classes((IsAuthenticated,))
def getTaskAssigned(request):
    team_id=request.data['team_id']
    team=Team.objects.get(id=team_id)
    tasks=Task.objects.filter(Team=team, assigned_to=request.user)
    serializer=TaskSerializer(tasks,many=True)
    return Response(serializer.data)

@api_view(['POST'])
@permission_classes((IsAuthenticated,))
def updateComplete(request):
    task_id=request.data['task_id']
    task=Task.objects.get(id=task_id)
    if task.completed==True:
        task.completed=False
    else:
        task.completed=True
    task.save()
    return Response()


@api_view(['POST'])
@permission_classes((IsAuthenticated,))
def getTasks(request):
    team_id=request.data['team_id']
    team=Team.objects.get(id=team_id)
    tasks=Task.objects.filter(Team=team)
    serializer=TaskSerializer(tasks,many=True)
    if team.created_by==request.user or team.members.filter(id=request.user.id).exists():
        return Response(serializer.data)
    return Response({"Error":"You are not authorized to access this team"},status=401)
    


