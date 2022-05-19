from curses.ascii import US
from django.contrib import admin
from .models import User, Drawing, Partida

admin.site.register(User)
admin.site.register(Drawing)
admin.site.register(Partida)