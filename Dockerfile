FROM php:7.0-apache

RUN apt-get update && apt-get clean
RUN apt-get install vim curl -y

EXPOSE 80
COPY ./public/ /var/www/html/