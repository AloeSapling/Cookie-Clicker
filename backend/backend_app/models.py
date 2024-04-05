from django.db import models

# Create your models here.
class Save(models.Model):
    cookies = models.CharField(max_length=255)