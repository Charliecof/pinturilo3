from django.db import models
from django.contrib.auth.models import AbstractUser
from django.utils.translation import gettext_lazy as _


class User(AbstractUser):
    username = models.CharField(
        max_length=50, blank=True, null=True, unique=True)
    email = models.EmailField(_('email address'), unique=True)
    native_name = models.CharField(max_length=5)
    phone_no = models.CharField(max_length=10)
    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = ['username', 'first_name', 'last_name']

    def __str__(self):
        return "{}".format(self.email)

class Partida(models.Model):
    date = models.DateField(auto_now_add=True)
    winner = models.OneToOneField(User,on_delete=models.CASCADE,null=True)

    def __str__(self):
        return 'Partida' + str(self.date)

class Drawing(models.Model):
    name = models.CharField(max_length=255)
    user = models.OneToOneField(User,on_delete=models.CASCADE,null=True)
    partida = models.OneToOneField(Partida,on_delete=models.CASCADE,null=True)
    data = models.TextField()
    def __str__(self):
        return str(self.name)


   