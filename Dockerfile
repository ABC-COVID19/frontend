FROM php:7.0-apache

RUN apt-get update && apt-get clean

EXPOSE 80
COPY ./public/ /var/www/html/