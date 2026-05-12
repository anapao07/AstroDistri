
from django.urls import path, include
from rest_framework import routers
from products import views
from drf_spectacular.views import SpectacularAPIView, SpectacularSwaggerView, SpectacularRedocView

router = routers.DefaultRouter()
router.register(r'products', views.ProductsView, 'Products')
router.register(r'statuses', views.StatusView, 'Statuses')

urlpatterns = [
    path("api/v1/", include(router.urls)),
   # Ruta para descargar (YAML/JSON)
    path('api/schema/', SpectacularAPIView.as_view(), name='schema'),
    # Interfaz gráfica de Swagger
    path('api/docs/', SpectacularSwaggerView.as_view(url_name='schema'), name='swagger-ui'),
    # Interfaz alternativa de Redoc
    path('api/redoc/', SpectacularRedocView.as_view(url_name='schema'), name='redoc'),
]