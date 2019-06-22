# desWebI-laravel

## Install

1. Clone repository
2. Setup `.env`, like this:
```
DB_CONNECTION=pgsql
DB_HOST=postgresql
DB_PORT=5432
DB_DATABASE=deswebii
DB_USERNAME=postgres
DB_PASSWORD=
```
3. Build containers: `docker-compose build /path/to/docker-compose.yml`.
4. Start containers: `docker-compose up /path/to/docker-compose.yml`
5. Import database: `docker exec -it deswebii-postgresql /bin/bash -c "sh ./docker-entrypoint-initdb.d/create.sh"`

Ps.: application running on port 80.
