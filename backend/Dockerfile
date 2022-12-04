FROM python:3.8

# python envs
ENV PYTHONDONTWRITEBYTECODE=1
ENV PYTHONUNBUFFERED=1

# python dependencies
RUN apt-get update \
  # dependencies for building Python packages
  && apt-get install -y build-essential \
  # psycopg2 dependencies
  && apt-get install -y libpq-dev \
  # Translations dependencies
  && apt-get install -y gettext \
  # Additional dependencies
  && apt-get install -y procps \
  # cleaning up unused files
  && apt-get purge -y --auto-remove -o APT::AutoRemove::RecommendsImportant=false \
  && rm -rf /var/lib/apt/lists/*

COPY ./requirements.txt /
RUN pip install -r ./requirements.txt

# upload scripts
COPY ./scripts/entrypoint.sh /
RUN sed -i 's/\r$//g' /entrypoint.sh
RUN chmod +x /entrypoint.sh

COPY ./scripts/start_dev.sh /
RUN sed -i 's/\r$//g' /start_dev.sh
RUN chmod +x /start_dev.sh

COPY ./scripts/start_prod.sh /
RUN sed -i 's/\r$//g' /start_prod.sh
RUN chmod +x /start_prod.sh

WORKDIR /app

ENTRYPOINT ["/scripts/entrypoint.sh"]