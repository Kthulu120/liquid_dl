FROM python:3.6-alpine3.6

EXPOSE 8000
VOLUME ["/downloads"]

COPY . /app
WORKDIR /app

# Temp (alpine mirror having issues)
RUN echo http://dl-2.alpinelinux.org/alpine/v3.6/main > /etc/apk/repositories; \
    echo http://dl-2.alpinelinux.org/alpine/v3.6/community >> /etc/apk/repositories

RUN apk --update --no-cache add ffmpeg wget
RUN pip install scdl youtube-dl
RUN pip install -r requirements.txt

CMD ["python", "manage.py", "runserver", "0.0.0.0:8000"]
