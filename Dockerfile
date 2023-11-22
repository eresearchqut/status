FROM httpd:2.4

EXPOSE 8080

# Install dependencies
RUN apt-get update && apt-get -y install \
  cron \
  netcat-traditional \
  iputils-ping \
  zsh \
  procps \
  curl;


COPY ./tinystatus /usr/local/bin/tinystatus
COPY ./incidents.txt /usr/local/bin/incidents.txt
COPY ./checks.csv /usr/local/bin/checks.csv

# Run httpd on port 8080 as non-root user
RUN sed -i 's/Listen 80/Listen 8080/g' /usr/local/apache2/conf/httpd.conf

# changes required to run as non-root
RUN chown 33:33 /usr/local/apache2/htdocs/index.html
RUN chmod 777 /usr/local/apache2/logs 

USER www-data

CMD while true; do /usr/local/bin/tinystatus /usr/local/bin/checks.csv /usr/local/bin/incidents.txt >| /usr/local/apache2/htdocs/index.html; sleep 60; done & /usr/local/apache2/bin/httpd -D FOREGROUND
