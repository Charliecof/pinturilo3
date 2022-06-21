from distutils.log import info
from django.db import models
from django.contrib.auth.models import User

# Create your models here.

class Player(User):
    class Meta:
        proxy = True


class Room(models.Model):
    title = models.CharField(max_length=30,default="no name")
    name = models.CharField(max_length=30)
    players_online = models.IntegerField()

    def __str__(self):
        return self.title + " players: " + str(self.players_online)
    
class Game(models.Model):
    winner = models.ForeignKey(Player,on_delete=models.CASCADE)
    points = models.IntegerField()
    room = models.ForeignKey(Room,on_delete=models.CASCADE,null=True)

class Drawing(models.Model):
    name = models.CharField(max_length=60)
    owner = models.ForeignKey(Player,on_delete=models.CASCADE)
    data = models.TextField()