## Install

1. Clone repository
2. Setup `.env`, like this:
```
DB_CONNECTION=pgsql
DB_HOST=postgresql
DB_PORT=5432
DB_DATABASE=tb_todo
DB_USERNAME=postgres
DB_PASSWORD=
```
3. Execute command

```
php artisan migrate
php artisan serve
```

Ps.: application running on port 8000.
