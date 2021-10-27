from django.conf.urls import url
from django.urls import path
from . import views
from .views import MessageView
urlpatterns = [
    url(r'^products/$',  views.productApi),
    url(r'products/([0-9]+)$', views.productApi),
    path('message/',MessageView.as_view())
]
