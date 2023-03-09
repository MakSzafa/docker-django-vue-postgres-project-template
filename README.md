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
- [Axios](https://axios-http.com/docs/example)

## Project structure

| Location             |  Content                                   |
|----------------------|--------------------------------------------|
| `/backend`           | Django project & backend config & API      |
| `/backend/apps`      | Django backend apps entry point            |
| `/backend/config`    | Django configuration files entry point     |
| `/backend/.env`      | Example environmental variables            |
| `/frontend`          | Vue App & frontend config & Nginx          |
| `/frontend/nginx`    | Nginx configuration                        |
| `/frontend/src`      | Vue app entry point                        |
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

### `/backend/.env`

File containing environmental variables, don't share production version of this file in public!

### `/frontend/nginx`

Simple frontend serving nginx configuration
 
## Deploy to production

- backend port has to be updated in:
    - `/docker-compose.yml`
    - `/docker-compose-prod.yml`
    - `/backend/scripts/start_dev`
    - `/backend/scripts/start_prod`
    - `/frontend/nginx/nginx.conf`
- frontend port has to be updated in:
    - `/docker-compose.yml`
    - `/docker-compose-prod.yml`
    - `/backend/.env`
    - `/frontend/vue.config.js`
    - `/frontend/nginx/nginx.conf`
- `/frontend/nginx/nginx.conf` - change allowed IP for admin on directly on server!
- `/frontend/src/main.js` - axios.defaults.baseURL has to be changed to your website
- `/frontend/Dockerfile` - has to be switched in production mode
-  `/backend/.env` - variables has to be recreated for production mode

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

To create an admin account in production mode use:
`docker compose -f docker-compose-prod.yml run backend python manage.py createsuperuser`
