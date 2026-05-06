from rest_framework import viewsets
from .serializer import ProductsSerializer
from .models import Products

class ProductsView(viewsets.ModelViewSet):
    serializer_class =  ProductsSerializer
    queryset = Products.objects.all()