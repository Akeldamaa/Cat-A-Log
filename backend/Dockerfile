FROM python:3.12

WORKDIR /home

ENV PYTHONDONTWRITEBYTECODE=1
ENV PYTHONUNBUFFERED=1 
ENV POSTGRES_NAME=catalog_ic77
ENV POSTGRES_USER=purrgrammers
ENV POSTGRES_PASSWORD=N0dHozw4WPDwD3g5DEYbMAvEhqlAcHfO
ENV POSTGRES_HOST=dpg-cr50ohaj1k6c7391tsg0-a.oregon-postgres.render.com
ENV DJANGO_SITE_URL=https://api.catalog-trading.fun

RUN pip install --upgrade pip  
COPY requirements.txt .
RUN pip install -r requirements.txt

COPY . .

ENTRYPOINT ["sh", "entrypoint.sh"]