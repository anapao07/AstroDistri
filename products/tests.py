import pytest
from django.urls import reverse
from rest_framework import status
from rest_framework.test import APIClient
from .models import Products, Status, Size, Category


@pytest.mark.django_db
class TestProductsAPI:

    @pytest.fixture
    def api_client(self):
        return APIClient()

    @pytest.fixture
    def datos_iniciales(self):
        """Fixture para crear los objetos que necesita el producto"""
        estado = Status.objects.create(name="Activo", description="Producto disponible")
        talla = Size.objects.create(name="Mediana", code="M")
        categoria = Category.objects.create(
            name="Ropa", description="Prendas de vestir"
        )

        return {"status": estado, "size": talla, "category": categoria}

    def test_crear_producto_exitoso(self, api_client, datos_iniciales):
        url = reverse("Products-list")

        payload = {
            "name": "Playera Tipo Polo",
            "description": "Playera 100% algodón",
            "stock": 50,
            "status": datos_iniciales["status"].id,
            "size_model": datos_iniciales["size"].id,
            "category": datos_iniciales["category"].id,
        }

        response = api_client.post(url, payload, format="json")

        # Verificaciones
        assert response.status_code == status.HTTP_201_CREATED
        assert response.data["name"] == "Playera Tipo Polo"
        assert response.data["stock"] == 50
        assert response.data["status_detail"]["name"] == "Activo"
        assert response.data["size_detail"]["code"] == "M"

    def test_crear_producto_con_stock_negativo_falla(self, api_client, datos_iniciales):
        url = reverse("Products-list")

        payload = {
            "name": "Producto Fallido",
            "stock": -10,  # Esto debería fallar se usa PositiveIntegerField en ese campo
            "status": datos_iniciales["status"].id,
        }

        response = api_client.post(url, payload, format="json")

        # Verificar que falle con un error 400
        assert response.status_code == status.HTTP_400_BAD_REQUEST
        assert "stock" in response.data

    def test_listar_productos(self, api_client, datos_iniciales):
        """Prueba que el endpoint GET devuelva la lista de productos"""
        # Crea un producto directamente en la BD de pruebas
        Products.objects.create(
            name="Tenis Correr",
            stock=10,
            status=datos_iniciales["status"],
            size_model=datos_iniciales["size"],
            category=datos_iniciales["category"],
        )

        url = reverse("Products-list")
        response = api_client.get(url)

        assert response.status_code == status.HTTP_200_OK
        assert len(response.data) == 1
        assert response.data[0]["name"] == "Tenis Correr"
