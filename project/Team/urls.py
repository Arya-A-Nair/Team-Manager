from rest_framework import routers
from django.urls import path

from .views import TeamsPartList, getTeamData,getTaskAssigned,updateComplete, getTasks

router = routers.DefaultRouter()
router.register('part', TeamsPartList)
urlpatterns = router.urls
urlpatterns += [
    path('getTeamData/', getTeamData),
    path('getTaskAssigned/', getTaskAssigned),
    path('updateComplete/', updateComplete),
    path('getTasks/', getTasks),
]