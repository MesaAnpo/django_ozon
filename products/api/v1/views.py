from rest_framework.views import APIView
from django.contrib.auth import authenticate, login, logout
from rest_framework.response import Response
from rest_framework import status, viewsets, filters
from products.tasks import parse_with_node_and_save
from products.models.models import ParsedProduct
from .serializers import ParsedProductSerializer
from rest_framework.permissions import IsAuthenticated
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import AllowAny


@api_view(["GET"])
@permission_classes([AllowAny])
def auth_status(request):
    user = request.user
    if user.is_authenticated:
        return Response({
            "authenticated":  True,
            "username": user.username,
            })
    return Response({"authenticated": False})

class StartParseView(APIView):
    permission_classes = [IsAuthenticated]
    def post(self, request):
        print("User:", request.user)
        task_data = request.data
        result = parse_with_node_and_save.delay(task_data)
        return Response({"task_id": result.id}, status=status.HTTP_202_ACCEPTED)

class ParsedProductViewSet(viewsets.ReadOnlyModelViewSet):
    permission_classes = [IsAuthenticated]
    serializer_class = ParsedProductSerializer
    queryset = ParsedProduct.objects.all().order_by("-created_at")

    filter_backends = [filters.OrderingFilter, filters.SearchFilter]
    ordering_fields = ["price","created_at","title"]
    search_fields = ["title"]

class LoginView(APIView):
    def post(self, request):
        username = request.data.get("username")
        password = request.data.get("password")
        user = authenticate(request,username=username,password=password)
        if user is not None:
            login(request, user)
            return Response({"detail":"successful"}, status=status.HTTP_200_OK)
        return Response({"detail":"Invalid credentials"}, status=status.HTTP_401_UNAUTHORIZED)

class LogoutView(APIView):
    def post(self, request):
        logout(request)
        return Response({"detail":"successful"}, status=status.HTTP_200_OK)



                        
