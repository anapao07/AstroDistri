from rest_framework import viewsets, status
from rest_framework.decorators import action
from rest_framework.response import Response
from .serializer import ProductsSerializer, StatusSerializer
from .models import Products, Status
import pandas as pd
import os

class ProductsView(viewsets.ModelViewSet):
    serializer_class =  ProductsSerializer
    queryset = Products.objects.all()

    @action(detail=False, methods=['post'])
    def bulk_upload(self, request):
        file = request.FILES.get('file')
        if not file:
            return Response({'error': 'No file provided'}, status=status.HTTP_400_BAD_REQUEST)
        
        # Detectar el tipo de archivo por extensión
        file_extension = os.path.splitext(file.name)[1].lower()
        
        try:
            if file_extension == '.csv':
                df = pd.read_csv(file)
            elif file_extension in ['.xlsx', '.xls']:
                df = pd.read_excel(file)
            else:
                return Response({'error': 'Unsupported file format. Please use CSV or XLSX.'}, status=status.HTTP_400_BAD_REQUEST)
            
            # Convertir a lista de diccionarios, eliminando valores NaN
            products_data = df.where(pd.notnull(df), None).to_dict(orient='records')
        except Exception as e:
            return Response({'error': f'Error processing file: {str(e)}'}, status=status.HTTP_400_BAD_REQUEST)
        
        created_products = []
        for row in products_data:
            serializer = ProductsSerializer(data=row)
            if serializer.is_valid():
                serializer.save()
                created_products.append(serializer.data)
            else:
                return Response({'error': serializer.errors}, status=status.HTTP_400_BAD_REQUEST)
        
        return Response(created_products, status=status.HTTP_201_CREATED)


class StatusView(viewsets.ModelViewSet):
    serializer_class = StatusSerializer
    queryset = Status.objects.all()