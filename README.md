НАХОДИТСЯ В РАЗРАБОТКЕ


# СБОРКА И ЗАПУСК

```bash
docker-compose ip --build

Включает:

* Django + drf (api + админка)
* Celery + Redis (фоновые таски)
* OpenAPI документация (drf-spectacular)
* PostgreSQL

API Endpoints:

* POST /API/V1/PARSE/
* GET /API/V1/PRODUCTS/
* GET /API/DOCS/