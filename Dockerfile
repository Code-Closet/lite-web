# prepare nginx
FROM nginx:1.25.2-alpine-slim

COPY ./packages/web/build /usr/share/nginx/html
RUN rm /etc/nginx/conf.d/default.conf
COPY  ./nginx.conf /etc/nginx/conf.d

# fire up nginx
EXPOSE 80
CMD [ "nginx", "-g", "daemon off;" ]
