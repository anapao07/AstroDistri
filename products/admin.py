from django.contrib import admin
from .models import Products, Size, Status

admin.site.register(Products)
admin.site.register(Status)
admin.site.register(Size)