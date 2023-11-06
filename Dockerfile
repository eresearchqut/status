FROM httpd:2.4

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

# Setup cron job
RUN (crontab -l ; echo "*  *  *  *  * /usr/local/bin/tinystatus /usr/local/bin/checks.csv /usr/local/bin/incidents.txt  >| /usr/local/apache2/htdocs/index.html") | crontab

CMD ( cron -f & ) && httpd -D FOREGROUND
