read -p "Digite o domínio do frontend (ex: meudominio.com): " domain_front
read -p "Digite o domínio da api (ex: meudominio.com): " domain_api
read -p "Digite um e-mail (necessário para gerar os certificados): " email



sudo newgrp docker <<EONG
echo "Instalando e configurando o Nginx..."

sudo apt install nginx certbot python3-certbot-nginx -y


sudo rm -r /usr/share/nginx/html/*
sudo cp -r ./frontend/build/* /usr/share/nginx/html

sudo rm /etc/nginx/sites-available/quizapi.dacom.cm.utfpr.edu.br
sudo rm /etc/nginx/sites-available/quiz.dacom.cm.utfpr.edu.br
sudo rm /etc/nginx/sites-enabled/quizapi.dacom.cm.utfpr.edu.br
sudo rm /etc/nginx/sites-enabled/quiz.dacom.cm.utfpr.edu.br
sudo rm /etc/nginx/nginx.conf

sudo cp nginx/quizapi.dacom.cm.utfpr.edu.br /etc/nginx/sites-available
sudo cp nginx/quiz.dacom.cm.utfpr.edu.br /etc/nginx/sites-available
sudo cp nginx/nginx.conf /etc/nginx/nginx.conf

sudo ln -s /etc/nginx/sites-available/quizapi.dacom.cm.utfpr.edu.br /etc/nginx/sites-enabled/quizapi.dacom.cm.utfpr.edu.br
sudo ln -s /etc/nginx/sites-available/quiz.dacom.cm.utfpr.edu.br /etc/nginx/sites-enabled/quiz.dacom.cm.utfpr.edu.br

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

EONG

