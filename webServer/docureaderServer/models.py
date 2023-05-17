from django.db import models

# Create your models here.

class UserInfo(models.Model):
    id = models.BigAutoField(primary_key=True)
    username = models.CharField(unique=True, max_length=50)
    password = models.CharField(max_length=200)

    def __str__(self):
        return self.id + " " + self.username + " " + self.password