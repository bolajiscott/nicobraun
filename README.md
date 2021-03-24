# Website


## Getting Started

```
echo "<!DOCTYPE html><html><head></head><body>ok</body></html>" > $PWD/html/index.html
docker run --rm  -v $PWD/public:/usr/share/nginx/html -p 80:80 nginx

sudo certbot certonly
sudo cp -r /etc/letsencrypt/live/rainbowstack.dev ./certs
chmod -R 755 ./certs

docker run  --name web -d \
  -v $PWD/public:/usr/share/nginx/html \
  -v $PWD/logs:/var/log/nginx \
  -v $PWD/certs:/certs \
  -v $PWD/nginx.conf:/etc/nginx/conf.d/default.conf\
  -p 80:80 -p 443:443 nginx
```