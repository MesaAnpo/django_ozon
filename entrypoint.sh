#!/bin/sh

echo "Ждем БД"
sleep 3

echo "Применяем миграции"
python manage.py migrate

sleep 3
echo "Создаём суперюзера"
python manage.py shell << END
from django.contrib.auth import get_user_model
User = get_user_model()
username = "${DJANGO_SUPERUSER_USERNAME}"
if not User.objects.filter(username=username).exists():
    User.objects.create_superuser(
        username=username,
        email="${DJANGO_SUPERUSER_EMAIL}",
        password="${DJANGO_SUPERUSER_PASSWORD}"
    )
END

echo "Запускаем сервер"
exec python manage.py runserver 0.0.0.0:8000