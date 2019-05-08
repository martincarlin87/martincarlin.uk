# martincarlin.uk

Personal website using ghost and docker

### SASS

```
sass --style compressed content/themes/carlin/assets/sass/input.scss content/themes/carlin/assets/css/screen.css
```

### Generate SSL Certificate

```
docker run -it --rm \
    -v "/etc/letsencrypt:/etc/letsencrypt" \
    -v "/var/lib/letsencrypt:/var/lib/letsencrypt" \
    -v /srv/www/martincarlin.uk:/data/letsencrypt \
    certbot/certbot \
    certonly --webroot \
    --email martin@martincarlin.uk \
    --no-eff-email \
    --agree-tos \
    --webroot-path=/data/letsencrypt \
    -d 'martincarlin.uk, www.martincarlin.uk'
```