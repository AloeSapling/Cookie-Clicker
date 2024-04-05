from django.shortcuts import render
from rest_framework.generics import get_object_or_404
from backend_app.models import Save
from rest_framework.viewsets import GenericViewSet
from rest_framework.decorators import action
from rest_framework.response import Response
from backend_app.serializers import SaveSerializer
# Create your views here.
class Saves(GenericViewSet):
    serializer_class = SaveSerializer
    @action(detail=True, methods=['put'])
    def save(self, request, pk):
        save  = get_object_or_404(Save, id=pk)
        save.cookies = request.data['cookies']
        save.save()
        return Response("Zapisano grę")
    @action(detail=False, methods=['post'])
    def make_save(self, request):
        serializer = self.serializer_class(data=request.data)
        serializer.is_valid(raise_exception=True)
        serializer.save()
        return Response("Utworzono zapis gry")
    @action(detail=False, methods=['get'])
    def get_saves(self, request):
        return Response(self.serializer_class(Save.objects.all(),many = True).data)