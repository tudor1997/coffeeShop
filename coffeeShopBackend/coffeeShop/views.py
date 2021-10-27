from django.shortcuts import render
from .models import Products, Message
from django.http.response import JsonResponse
from rest_framework.parsers import JSONParser
from django.views.decorators.csrf import csrf_exempt
from .serializers import ProductsSerializer, MessageSerializer
from django.views import View
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
import json
# Create your views here.


def productApi(request, id=0):
    if request.method == "GET":
        products = Products.objects.all()
        products_serializer = ProductsSerializer(products, many = True)
        return JsonResponse(products_serializer.data, safe = False)
    elif request.method == "POST":
        products_data = JSONParser().parse(request)
        products_serializer = ProductsSerializer(data = products_data)
        if products_serializer.is_valid():
            products_serializer.save()
            return JsonResponse("Added Successfully",safe=False)
        return JsonResponse ("Failed to add",safe=False)
    elif request.method == "PUT":
        products_data = JSONParser().parse(request)
        products = Products.objects.get(id = products_data["id"])
        products_serializer = ProductsSerializer(products, data = products_data)
        if products_serializer.is_valid():
            products_serializer.save()
            return JsonResponse("Updated successfully",safe= False)
        return JsonResponse("Failed to update",safe = False)
    elif request.method == "DELETE":
        products = Products.objects.get(id = id)
        products.delete()
        return JsonResponse("Deleted successfully",safe= False)


class MessageView(APIView):
    def get(self, request, id=None):
        if id:
            message = Message.objects.get(id=id)
            serializer = MessageSerializer(message)
            return Response({"status":"success", "data":serializer.data}, status=status.HTTP_200_OK)
        message = Message.objects.all()
        serializer = MessageSerializer(message, many=True)
        return Response({"status":"success", "data":serializer.data}, status=status.HTTP_200_OK)
    def post(self,request):
        serializer = MessageSerializer(data = request.data)
        if serializer.is_valid():
            serializer.save()
            return Response({'status':'success', 'data':serializer.data}, status=status.HTTP_200_OK)
        else:
            return Response({'status':'error', 'data':serializer.errors}, status=status.HTTP_400_BAD_REQUEST)