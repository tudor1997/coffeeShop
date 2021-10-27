from django.db import models

# Create your models here.

class Products(models.Model):
     id = models.AutoField(primary_key = True)
     title = models.CharField(max_length=5000)
     price = models.FloatField()
     image = models.CharField(max_length=100000)
     amount = models.IntegerField()

class Message(models.Model):
     name = models.CharField(max_length=5000)
     email = models.EmailField()
     message = models.TextField()

     def __str__(self):
          return self.name

