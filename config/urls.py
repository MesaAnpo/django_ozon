from django.contrib import admin
from django.urls import path, include
from landing.main_endpoints import index_point

urlpatterns = [
	path("admin/",admin.site.urls),
        path("", index_point, name="index"),
        path("api/v1/", include("products.api.v1.urls")),
	]
