from rest_framework import routers
from django.urls import path

from .views import TeamsPartList, getTeamData,getTaskAssigned,updateComplete, getTasks,createTeam, getTeamPartData, joinTeam, getMembers, createTask

router = routers.DefaultRouter()
# router.register('part', TeamsPartList)
urlpatterns = router.urls
urlpatterns += [
    path('part/',getTeamPartData),
    path('getTeamData/', getTeamData),
    path('getTaskAssigned/', getTaskAssigned),
    path('updateComplete/', updateComplete),
    path('getTasks/', getTasks),
    path('createTeam/', createTeam),
    path('joinTeamCode/', joinTeam),
    path('getMembers/', getMembers),
    path('createTask/', createTask),
]