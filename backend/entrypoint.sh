#!/bin/bash

# echo "Migrating database..."
# python manage.py makemigrations --noinput
# python manage.py migrate --noinput
# echo "Database migrated"

echo "Creating superuser..."
python manage.py superuser || true
echo "Superuser created"

echo "Collecting static files..."
python manage.py collectstatic --noinput
echo "Static files collected"

echo "Starting server..."
gunicorn backend.wsgi:application --bind 0.0.0.0:8000 --worker-class gevent --timeout 1000