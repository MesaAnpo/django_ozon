import pytest
from django.test import Client

@pytest.mark.django_db
def test_admin_login_accesible():
    client = Client()
    response = client.get("/admin/login/")
    assert response.status_code == 200
