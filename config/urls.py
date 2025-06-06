from django.contrib import admin
from django.urls import path, include
from landing.main_endpoints import index_point
from drf_spectacular.views import SpectacularAPIView, SpectacularSwaggerView

urlpatterns = [
	path("admin/",admin.site.urls),
        path("", index_point, name="index"),
        path("api/v1/", include("products.api.v1.urls")),
        path("api/schema/", SpectacularAPIView.as_view(), name="schema"),
        path("api/docs",SpectacularSwaggerView.as_view(url_name="schema"),name="swagger-ui"),
	]
