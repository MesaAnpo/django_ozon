from django.urls import path
from .views import StartParseView

urlpatterns = [
	path("parse/", StartParseView.as_view(), name="start-parse"),
]