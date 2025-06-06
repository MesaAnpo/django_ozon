from rest_framework import serializers
from products.models.models import ParsedProduct

class ParsedProductSerializer(serializers.ModelSerializer):
    class Meta:
        model = ParsedProduct
        fields = ["id","title","price","link","created_at"]
