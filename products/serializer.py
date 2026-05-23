from rest_framework import serializers
from .models import Products, Status, Size, Category


class StatusSerializer(serializers.ModelSerializer):
    class Meta:
        model = Status
        fields = ["id", "name", "description"]


class SizeSerializer(serializers.ModelSerializer):
    class Meta:
        model = Size
        fields = ["id", "name", "code"]


class CategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = Category
        fields = ["id", "name", "description"]


class ProductsSerializer(serializers.ModelSerializer):
    status_detail = StatusSerializer(source="status", read_only=True)
    size_detail = SizeSerializer(source="size_model", read_only=True)
    category_detail = CategorySerializer(source="category", read_only=True)

    class Meta:
        model = Products
        fields = [
            "id",
            "name",
            "description",
            "stock",
            "created_at",
            "status",
            "status_detail",
            "size_model",
            "size_detail",
            "category",
            "category_detail",
        ]
