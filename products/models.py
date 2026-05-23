from django.db import models
from django.utils.translation import gettext_lazy as _


class Size(models.Model):
    name = models.CharField(_("Nombre de Talla"), max_length=50, unique=True)
    code = models.CharField(_("Código/Sigla"), max_length=10, unique=True) 

    def __str__(self):
        return f"{self.name} ({self.code})"


class Status(models.Model):
    name = models.CharField(_("Nombre del Estado"), max_length=50, unique=True)
    description = models.TextField(blank=True)

    def __str__(self):
        return self.name


class Category(models.Model):
    name = models.CharField(_("Nombre del Estado"), max_length=50, unique=True)
    description = models.TextField(blank=True)


class Products(models.Model):
    name = models.CharField(_("Nombre"), max_length=200)
    description = models.TextField(_("Descripción"), blank=True)
    stock = models.PositiveIntegerField(_("Stock"), default=0)
    status = models.ForeignKey(
        Status, 
        on_delete=models.SET_NULL, 
        null=True, 
        verbose_name=_("Estado")
    )
    
    size_model = models.ForeignKey(
        Size, 
        on_delete=models.SET_NULL, 
        null=True, 
        blank=True, 
        verbose_name=_("Talla")
    )

    created_at = models.DateTimeField(auto_now_add=True)
    category = models.ForeignKey(
        Category, 
        on_delete=models.SET_NULL, 
        null=True, 
        verbose_name=_("categoria")
    )

    def __str__(self):
        return self.name