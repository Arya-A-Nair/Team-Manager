from django.db import models
from django.contrib.auth import get_user_model

User=get_user_model()

# Create your models here.


class Team(models.Model):
    name=models.CharField(max_length=100,blank=False,null=False)
    code=models.CharField(max_length=100,blank=False,null=False)
    members=models.ManyToManyField(User,blank=True)
    created_at=models.DateTimeField(auto_now_add=True)
    created_by=models.ForeignKey(User,on_delete=models.CASCADE,related_name='created_by')

    def __str__(self):
        return self.name

class Task(models.Model):

    class Priority(models.IntegerChoices):
        LOW=1, 'Low'
        MEDIUM=2,"Medium"
        HIGH=3,"High"
        Critical=4,"Critical"

    name=models.CharField(max_length=200)
    assigned_to=models.ForeignKey(User,on_delete=models.CASCADE)
    description=models.TextField()
    priority=models.PositiveSmallIntegerField(choices=Priority.choices,default=Priority.LOW)
    deadline=models.DateField()
    completed=models.BooleanField(default=False)
    Team=models.ForeignKey(Team,on_delete=models.CASCADE)