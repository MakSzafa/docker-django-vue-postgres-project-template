# My docker-django-vue-postgres project template

This template is designed to develop application on Windows and deploy it on VPS using Docker.

Before you start, check your Docker version with `docker -v`.
You can install it from official site: [Docker](https://docs.docker.com/get-docker/)

## Table of contents

- [Tech stack](#tech-stack)
- [Project structure](#project-structure)
- [Deploy to production](#deploy-to-production)
- [Important commands](#important-commands)

## Tech stack

### Back-end

- [Django](https://docs.djangoproject.com/en/4.1/)
- [Django REST Framework](https://www.django-rest-framework.org/)
- [PostgreSQL](https://www.postgresql.org/docs/)

### Front-end

- [Vue.js](https://vuejs.org/guide/introduction.html)
- [Vue router](https://router.vuejs.org/guide/)
- [Vuex](https://vuex.vuejs.org/guide/)
- [Bulma](https://bulma.io/documentation/)

### Additional important extensions

- [Django Cors Headers](https://pypi.org/project/django-cors-headers/)
- [Django extensions](https://django-extensions.readthedocs.io/en/latest/index.html)
- [Django filters](https://django-filter.readthedocs.io/en/stable/index.html)
- [Django simple JWT](https://django-rest-framework-simplejwt.readthedocs.io/en/latest/)
- [Gunicorn](https://docs.gunicorn.org/en/stable/index.html)
- [Python environ](https://pypi.org/project/python-environ/)
- [Axios](https://axios-http.com/docs/example)

## Project structure

| Location             |  Content                                   |
|----------------------|--------------------------------------------|
| `/backend`           | Django project & backend config & API      |
| `/backend/apps`      | Django backend apps entry point            |
| `/backend/config`    | Django configuration files entry point     |
| `/frontend`          | Vue App & frontend config & Nginx          |
| `/frontend/nginx`    | Nginx configuration                        |
| `/frontend/src`      | Vue app entry point                        |
| `.env`               | Example environmental variables            |
| `docker-compose-prod.yml` | Docker compose configuration for production  |
| `docker-compose.yml` | Docker compose configuration for development  |


### `/backend/apps/users`

Directory containing customized Django Users app

- `models.py` - in class User, you can define model fields and properties based on fields
- `admin.py` - you can customize admin page  
- `serializers.py` - you can edit serializers realted to User model
- `views.py` - you can edit User ViewSet

### `/backend/config`

- `settings.py` - you can edit backend related issues  
- `urls.py` - you can add new apps endpoints 

### `/frontend/nginx`

Simple frontend serving nginx configuration

### `/frontend/src`

- `registerServiceWorker.js` - default PWA (Progressive Web App) service worker file

### `.env`

File containing environmental variables, don't share production version of this file in public! 

## Deploy to production

- `/backend/config/settings.py` - CORS_ALLOWED_ORIGINS should be transformed into env variable
- `/backend/scripts/start_prod` - Gunicorn has to be configured to serve project

- `/frontend/nginx/nginx.conf` - has to be checked before running production mode
- `/frontend/Dockerfile` - follow file instruction
- `/frontend/src/main.js` - axios.defaults.baseURL should be edited

-  `.env` - variables has to be recreated for production mode

Run command: `docker compose -f docker-compose-prod.yml up -d --build` to start your production mode and put it in the background

## Important commands

To build your project use:
`docker compose up --build` 

To shut down containers use:
`docker compose down`

To shut down containers and additionally clear volumes use:
`docker compose down --volumes`

To create an admin account use:
`docker compose run backend python manage.py createsuperuser`

To create an admin account from data stored in .env file use:
`docker compose run backend python manage.py createsuperuser --noinput`
