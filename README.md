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
* POST /API/V1/LOGIN
* POST /API/V1/LOGOUT
* GET /API/V1/PRODUCTS/
* GET /API/DOCS/


доп:

собрать реакт 
cd frotend
npm run build
кинуть build в templates