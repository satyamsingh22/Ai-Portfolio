from django.db import models

# Create your models here.
class Blog(models.Model):
    tittle= models.CharField(max_length=250)
    author= models.CharField(max_length=50)
    content = models.TextField()
    summary=models.CharField(max_length=500,blank=True)
    image = models.ImageField(upload_to="blog_images/", null=True, blank=True)
    created_at=models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.tittle
    
class Voicebot(models.Model):
    Voicebot = models.CharField(max_length=100)
    
    def __str__(self):
        return self.Voicebot
    
    
 
class Contact(models.Model):
    name = models.CharField(max_length=100)
    email = models.EmailField(max_length=100)
    message = models.TextField()
       