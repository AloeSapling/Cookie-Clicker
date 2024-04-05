from rest_framework.serializers import ModelSerializer
from backend_app.models import Save
class SaveSerializer(ModelSerializer):
    class Meta:
        model = Save
        fields='__all__'