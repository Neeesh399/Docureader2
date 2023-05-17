from django.shortcuts import render
from django.http import HttpResponse
from rest_framework.decorators import api_view
from rest_framework.response import Response
from django.db import IntegrityError
from .models import *
from .serializer import *

# Create your views here.

def index(request):
    return HttpResponse('Hello, World!')

@api_view(['GET'])
def api_test(request):
    data = {
        'message' : 'Hello, World!'
    }
    return Response(data)

@api_view(['GET'])
def retrieveUserInfo(request):
    myModels = UserInfo.objects.all()
    serializer = UserInfoSerializer(myModels, many=True)
    return Response(serializer.data)

@api_view(['POST'])
def createUser(request):
    try:
        username = request.data.get('username')
        passhash = request.data.get('passhash')
        mydata = {'username':username, 'password':passhash}
        serializer = UserInfoSerializer(data=mydata)
        if serializer.is_valid(raise_exception=True):
            serializer.save()
            return Response({'operationSuccess':True, 'username':username})
        #return Response({'operationSuccess':False, 'error':'Username already exists'})
    except IntegrityError:
        errorMessage = "IntegrityError"
        return Response({'operationSuccess':False, 'error':errorMessage})
    except serializers.ValidationError as e:
        errorMessage = "ValidationError: " + str(e.detail)
        return Response({'operationSuccess':False, 'error':errorMessage})
   