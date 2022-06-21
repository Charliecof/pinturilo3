from django.contrib import admin
from .models import Player,Room,Game, Drawing
# Register your models here.
admin.site.register(Player)
admin.site.register(Room)
admin.site.register(Game)
admin.site.register(Drawing)