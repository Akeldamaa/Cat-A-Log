@echo off
SETLOCAL

:: Function to handle errors
:ErrorHandler
echo.
echo ERROR: %1
echo.
pause
exit /b 1

:: Set up Python and virtual environment
echo Setting up Python virtual environment...
python -m venv env
if %errorlevel% neq 0 call :ErrorHandler "Failed to create virtual environment"
call env\Scripts\activate
if %errorlevel% neq 0 call :ErrorHandler "Failed to activate virtual environment"

:: Upgrade pip and install required Python packages
echo Upgrading pip and installing required Python packages...
pip install --upgrade pip
if %errorlevel% neq 0 call :ErrorHandler "Failed to upgrade pip"
pip install django djangorestframework django-cors-headers pillow
if %errorlevel% neq 0 call :ErrorHandler "Failed to install Python packages"

:: Set up Django project
echo Setting up Django project...
django-admin startproject backend
if %errorlevel% neq 0 call :ErrorHandler "Failed to start Django project"
cd backend
django-admin startapp myapp
if %errorlevel% neq 0 call :ErrorHandler "Failed to start Django app"

:: Add required settings to Django settings.py
echo Configuring Django settings...
(
echo from pathlib import Path
echo BASE_DIR = Path(__file__).resolve().parent.parent
echo SECRET_KEY = 'django-insecure-REPLACE_WITH_YOUR_SECRET_KEY'
echo DEBUG = True
echo ALLOWED_HOSTS = []
echo INSTALLED_APPS = [
echo     'django.contrib.admin',
echo     'django.contrib.auth',
echo     'django.contrib.contenttypes',
echo     'django.contrib.sessions',
echo     'django.contrib.messages',
echo     'django.contrib.staticfiles',
echo     'rest_framework',
echo     'corsheaders',
echo     'myapp',
echo ]
echo MIDDLEWARE = [
echo     'django.middleware.security.SecurityMiddleware',
echo     'django.contrib.sessions.middleware.SessionMiddleware',
echo     'corsheaders.middleware.CorsMiddleware',
echo     'django.middleware.common.CommonMiddleware',
echo     'django.middleware.csrf.CsrfViewMiddleware',
echo     'django.contrib.auth.middleware.AuthenticationMiddleware',
echo     'django.contrib.messages.middleware.MessageMiddleware',
echo     'django.middleware.clickjacking.XFrameOptionsMiddleware',
echo ]
echo ROOT_URLCONF = 'backend.urls'
echo TEMPLATES = [
echo     {
echo         'BACKEND': 'django.template.backends.django.DjangoTemplates',
echo         'DIRS': [],
echo         'APP_DIRS': True,
echo         'OPTIONS': {
echo             'context_processors': [
echo                 'django.template.context_processors.debug',
echo                 'django.template.context_processors.request',
echo                 'django.contrib.auth.context_processors.auth',
echo                 'django.contrib.messages.context_processors.messages',
echo             ],
echo         },
echo     },
echo ]
echo WSGI_APPLICATION = 'backend.wsgi.application'
echo DATABASES = {
echo     'default': {
echo         'ENGINE': 'django.db.backends.sqlite3',
echo         'NAME': BASE_DIR / 'db.sqlite3',
echo     }
echo }
echo AUTH_PASSWORD_VALIDATORS = [
echo     {
echo         'NAME': 'django.contrib.auth.password_validation.UserAttributeSimilarityValidator',
echo     },
echo     {
echo         'NAME': 'django.contrib.auth.password_validation.MinimumLengthValidator',
echo     },
echo     {
echo         'NAME': 'django.contrib.auth.password_validation.CommonPasswordValidator',
echo     },
echo     {
echo         'NAME': 'django.contrib.auth.password_validation.NumericPasswordValidator',
echo     },
echo ]
echo LANGUAGE_CODE = 'en-us'
echo TIME_ZONE = 'UTC'
echo USE_I18N = True
echo USE_TZ = True
echo STATIC_URL = '/static/'
echo DEFAULT_AUTO_FIELD = 'django.db.models.BigAutoField'
echo CORS_ORIGIN_ALLOW_ALL = True
) > backend/settings.py
if %errorlevel% neq 0 call :ErrorHandler "Failed to configure Django settings"

:: Set up React frontend
cd ..
if not exist frontend (
    echo Setting up React frontend...
    npx create-react-app frontend
    if %errorlevel% neq 0 call :ErrorHandler "Failed to create React app"
)
cd frontend

:: Install Solidity and GPT API packages (adjust as needed)
echo Installing Solidity and GPT API packages...
npm install ethers openai axios
if %errorlevel% neq 0 call :ErrorHandler "Failed to install npm packages"

:: Configure React app to work with Django
echo Configuring React app...
(
echo import React, { useState } from 'react';
echo import axios from 'axios';
echo const App = () => {
echo     const [selectedFile, setSelectedFile] = useState(null);
echo     const handleFileChange = (event) => {
echo         setSelectedFile(event.target.files[0]);
echo     };
echo     const handleUpload = async () => {
echo         const formData = new FormData();
echo         formData.append('file', selectedFile);
echo         try {
echo             const response = await axios.post('http://127.0.0.1:8000/api/upload/', formData, {
echo                 headers: {
echo                     'Content-Type': 'multipart/form-data',
echo                 },
echo             });
echo             console.log(response.data);
echo         } catch (error) {
echo             console.error('There was an error uploading the file!', error);
echo         }
echo     };
echo     return (
echo         <div>
echo             <input type="file" onChange={handleFileChange} />
echo             <button onClick={handleUpload}>Upload</button>
echo         </div>
echo     );
echo };
echo export default App;
) > src/App.js
if %errorlevel% neq 0 call :ErrorHandler "Failed to configure React app"

:: Go back to the backend to migrate and start the server
cd ..
cd backend
echo Running Django migrations...
python manage.py makemigrations
if %errorlevel% neq 0 call :ErrorHandler "Failed to run makemigrations"
python manage.py migrate
if %errorlevel% neq 0 call :ErrorHandler "Failed to run migrate"

echo Starting Django server...
start "" python manage.py runserver
if %errorlevel% neq 0 call :ErrorHandler "Failed to start Django server"

:: Go back to the frontend and start the React server
cd ..
cd frontend
echo Starting React server...
start "" npm start
if %errorlevel% neq 0 call :ErrorHandler "Failed to start React server"

echo All set up! Your Django backend and React frontend are running.

pause

ENDLOCAL
