import pytest
from rest_framework.test import APIClient, force_authenticate
from unittest.mock import patch
from django.contrib.auth.models import User

@pytest.mark.django_db
@patch("products.api.v1.views.parse_with_node_and_save.delay")
def test_start_parse_view(mock_delay):
    mock_delay.return_value.id = "mock-task-id"
    
    user = User.objects.create_user(username="test", password="pass")
    client = APIClient()
    client.force_authenticate(user=user)
    
    sample_data = {
        "search_query": "смартфон",
        "price_min": "10000",
        "price_max": "40000",
        "color": "черный"
        }
    response = client.post("/api/v1/parse/", data = sample_data, format="json")

    assert response.status_code == 202
    assert response.data == {"task_id":"mock-task-id"}
    mock_delay.assert_called_once_with(sample_data)
