from rest_framework import viewsets
from .serializer import ProductsSerializer, StatusSerializer
from .models import Products, Status

class ProductsView(viewsets.ModelViewSet):
    serializer_class =  ProductsSerializer
    queryset = Products.objects.all()


class StatusView(viewsets.ModelViewSet):
    serializer_class = StatusSerializer
    queryset = Status.objects.all()