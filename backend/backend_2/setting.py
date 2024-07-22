# myproject/myproject/settings.py

DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.sqlite3',
        'NAME': BASE_DIR / "db.sqlite3",
    }
}

# myproject/myproject/settings.py

INSTALLED_APPS = [
    
    'myapp',
]
