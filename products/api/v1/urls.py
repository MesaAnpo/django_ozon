from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import (StartParseView,
                    ParsedProductViewSet,
                    LoginView,
                    LogoutView,
                    auth_status
                    )

router = DefaultRouter()
router.register(r"products", ParsedProductViewSet, basename = "products")

urlpatterns = [
	path("parse/", StartParseView.as_view(), name="start-parse"),
        path("login/", LoginView.as_view(), name="login"),
        path("logout/", LogoutView.as_view(), name="logout"),
        path("auth-status/", auth_status, name="auth-status"),
        path("", include(router.urls)),
        
]
