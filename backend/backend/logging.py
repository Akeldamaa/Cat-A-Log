from pathlib import Path
import os

BASE_DIR = Path(__file__).resolve().parent.parent

FORMATTERS = (
    {
        "verbose": {
            "format": "{levelname} {asctime:s} {threadName} {thread:d} {module} {filename} {lineno:d} {name} {funcName} {process:d} {message}",
            "style": "{",
        },
        "simple": {
            "format": "{levelname} {asctime:s} {module} {filename} {lineno:d} {name} {funcName} {message}",
            "style": "{",
        },
    },
)


HANDLERS = {
    "console": {
        "class": "logging.StreamHandler",
        "formatter": "simple",
    },
    "file": {
        "class": "logging.handlers.RotatingFileHandler",
        "filename": f"{BASE_DIR}/logs/file.log",
        "mode": "a",
        "encoding": "utf-8",
        "formatter": "simple",
        "backupCount": 5,
        "maxBytes": 1024 * 1024 * 5,  # 5 MB
    },
    "file_detailed": {
        "class": "logging.handlers.RotatingFileHandler",
        "filename": f"{BASE_DIR}/logs/file_detailed.log",
        "mode": "a",
        "formatter": "verbose",
        "backupCount": 5,
        "maxBytes": 1024 * 1024 * 5,  # 5 MB
    },
    "gunicorn": {
        "class": "logging.handlers.RotatingFileHandler",
        "filename": f"{BASE_DIR}/logs/gunicorn.log",
        "mode": "a",
        "formatter": "verbose",
        "backupCount": 5,
        "maxBytes": 1024 * 1024 * 5,  # 5 MB
    },
}

LOGGERS = (
    {
        "django": {
            "handlers": ["console", "file_detailed"],
            "level": "INFO",
            "propagate": False,
        },
        "django.request": {
            "handlers": ["file"],
            "level": "WARNING",
            "propagate": False,
        },
        "gunicorn.error": {
            "handlers": ["gunicorn"],
            "level": "ERROR",
            "propagate": True,
        },
        "gunicorn.access": {
            "handlers": ["gunicorn"],
            "level": "INFO",
            "propagate": True,
        },
    },
)

# Create log directories if it doesn't exist
log_file_dir = os.path.dirname(HANDLERS['file']['filename'])
if not os.path.exists(log_file_dir):
    os.makedirs(log_file_dir)

log_file_detailed_dir = os.path.dirname(HANDLERS['file_detailed']['filename'])
if not os.path.exists(log_file_detailed_dir):
    os.makedirs(log_file_detailed_dir)

gunicorn_log_dir = os.path.dirname(HANDLERS['gunicorn']['filename'])
if not os.path.exists(gunicorn_log_dir):
    os.makedirs(gunicorn_log_dir)


