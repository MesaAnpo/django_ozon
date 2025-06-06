from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import StartParseView, ParsedProductViewSet

router = DefaultRouter()
router.register(r"products", ParsedProductViewSet, basename = "products")

urlpatterns = [
	path("parse/", StartParseView.as_view(), name="start-parse"),
        path("", include(router.urls)),
]
