from rest_framework import serializers
from .models import Products, Message

class ProductsSerializer(serializers.ModelSerializer):
    class Meta:
        model = Products
        fields = ("id",
                  "title",
                  "price",
                  "image")
class MessageSerializer(serializers.ModelSerializer):
    name = serializers.CharField(max_length=5000)
    email = serializers.EmailField()
    message = serializers.CharField()

    class Meta:
        model = Message
        fields = ('__all__')