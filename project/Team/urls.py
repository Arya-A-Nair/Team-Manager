from rest_framework import routers
from django.urls import path

from .views import TeamsPartList, getTeamData

router = routers.DefaultRouter()
router.register('part', TeamsPartList)
urlpatterns = router.urls
urlpatterns += [
    path('getTeamData/', getTeamData),
]