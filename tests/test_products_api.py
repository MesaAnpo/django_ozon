import pytest
from rest_framework.test import APIClient
from products.models.models import ParsedProduct

@pytest.mark.django_db
def test_get_products_sorted():
    ParsedProduct.objects.bulk_create([
        ParsedProduct(title="B", price=100, link="x"),
        ParsedProduct(title="A", price=200, link="y"),
        ])

    client = APIClient()
    resp = client.get("/api/v1/products/?ordering=-price")
    titles = [item["title"] for item in resp.data["results"]]
    assert titles == ["A","B"]
