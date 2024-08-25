#!/bin/bash

# echo "Migrating database..."
# python manage.py makemigrations --noinput
# python manage.py migrate --noinput
# echo "Database migrated"

echo "Collecting static files..."
python manage.py collectstatic --noinput
echo "Static files collected"

echo "Starting server..."
# gunicorn backend.wsgi:application --bind 0.0.0.0:8000 --timeout 200 --workers 3
gunicorn backend.wsgi:application --bind 0.0.0.0:8000 --workers 2