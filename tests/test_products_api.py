import pytest
from rest_framework.test import APIClient
from products.models.models import ParsedProduct
from django.contrib.auth.models import User

@pytest.mark.django_db
def test_get_products_sorted():
    user = User.objects.create_user(username="test", password="pass")
    client = APIClient()
    client.force_authenticate(user=user)
    
    ParsedProduct.objects.bulk_create([
        ParsedProduct(title="B", price=100, link="x"),
        ParsedProduct(title="A", price=200, link="y"),
        ])

    resp = client.get("/api/v1/products/?ordering=-price")
    titles = [item["title"] for item in resp.data["results"]]
    assert titles == ["A","B"]
