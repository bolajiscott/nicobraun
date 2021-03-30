install:
	docker run  --name web -d \
  	-v $(CURDIR)/public:/usr/share/nginx/html \
  	-v $(CURDIR)/logs:/var/log/nginx \
  	-v $(CURDIR)/certs:/certs \
  	-v $(CURDIR)/nginx.conf:/etc/nginx/conf.d/default.conf\
  	-p 80:80 -p 443:443 nginx

clean:
	docker stop web
	docker rm web