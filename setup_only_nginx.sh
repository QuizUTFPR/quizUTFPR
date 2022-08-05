read -p "Digite o domínio do frontend (ex: meudominio.com): " domain_front
read -p "Digite o domínio da api (ex: meudominio.com): " domain_api
read -p "Digite um e-mail (necessário para gerar os certificados): " email


echo "Instalando e configurando o Nginx..."

sudo apt install nginx certbot python3-certbot-nginx -y


sudo rm -r /var/www/html/quiz
sudo mkdir /var/www/html/quiz
sudo cp -r ./frontend/build/* /var/www/html/quiz


sudo rm /etc/nginx/sites-available/default
sudo rm /etc/nginx/sites-enabled/default

sudo rm /etc/nginx/sites-available/$domain_api
sudo rm /etc/nginx/sites-available/$domain_front
sudo rm /etc/nginx/sites-enabled/$domain_api
sudo rm /etc/nginx/sites-enabled/$domain_front
sudo rm /etc/nginx/nginx.conf

sudo cp nginx/$domain_api /etc/nginx/sites-available
sudo cp nginx/$domain_front /etc/nginx/sites-available
sudo cp nginx/nginx.conf /etc/nginx/nginx.conf

sudo ln -s /etc/nginx/sites-available/$domain_api /etc/nginx/sites-enabled/$domain_api
sudo ln -s /etc/nginx/sites-available/$domain_front /etc/nginx/sites-enabled/$domain_front

echo "Reiniciando nginx"

sudo nginx -t
sudo systemctl reload nginx
sudo systemctl restart nginx

echo "Gerando SSL para o painel de controle..."
sudo certbot --nginx -d $domain_front --email $email --non-interactive --agree-tos


echo "Gerando SSL para a API..."
sudo certbot --nginx -d $domain_api --email $email --non-interactive --agree-tos


echo "Aguardando os containers..."

until [ "`docker inspect -f {{.State.Running}} backend_prod`"=="true" ]; do
    sleep 0.1;
done;

echo "PATH=$PATH" > /etc/cron.d/certbot-renew

echo "@monthly certbot renew --nginx >> /var/log/cron.log 2>&1" >>/etc/cron.d/certbot-renew

crontab /etc/cron.d/certbot-renew