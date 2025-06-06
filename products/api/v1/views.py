from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from products.tasks import parse_with_node_and_save

class StartParseView(APIView):
    def post(self, request):
        task_data = request.data
        result = parse_with_node_and_save.delay(task_data)
        return Response({"task_id": result.id}, status=status.HTTP_202_ACCEPTED)
