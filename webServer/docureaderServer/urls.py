from django.urls import path
from . import views

urlpatterns = [
    path('', views.index, name='index'),
    path('api/', views.api_test, name='api_test'),
    path('retrieveUserInfo/', views.retrieveUserInfo, name='retrieveUserInfo'),
    path('createUser/', views.createUser, name='createUser')
]