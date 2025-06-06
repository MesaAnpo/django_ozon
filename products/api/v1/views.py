from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status, viewsets, filters
from products.tasks import parse_with_node_and_save
from products.models.models import ParsedProduct
from .serializers import ParsedProductSerializer

class StartParseView(APIView):
    def post(self, request):
        task_data = request.data
        result = parse_with_node_and_save.delay(task_data)
        return Response({"task_id": result.id}, status=status.HTTP_202_ACCEPTED)

class ParsedProductViewSet(viewsets.ReadOnlyModelViewSet):
    serializer_class = ParsedProductSerializer
    queryset = ParsedProduct.objects.all().order_by("-created_at")

    filter_backends = [filters.OrderingFilter, filters.SearchFilter]
    ordering_fields = ["price","created_at","title"]
    search_fields = ["title"]
