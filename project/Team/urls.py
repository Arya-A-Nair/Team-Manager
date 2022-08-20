from rest_framework import routers
from .views import TeamsPartList

router = routers.DefaultRouter()
router.register('part', TeamsPartList)
urlpatterns = router.urls