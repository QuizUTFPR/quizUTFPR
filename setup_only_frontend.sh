read -p "Digite o domínio do frontend (ex: meudominio.com): " domain_front
read -p "Digite um e-mail (necessário para gerar os certificados): " email


echo "Configurando versão do Node"

curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.1/install.sh | bash

export NVM_DIR="$([ -z "${XDG_CONFIG_HOME-}" ] && printf %s "${HOME}/.nvm" || printf %s "${XDG_CONFIG_HOME}/nvm")"
[ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh" # This loads nvm

source ~/.bashrc

nvm install v16.16.0
nvm use v16.16.0
nvm alias default 16.16.0

echo "Versão do node instalada:"
node -v

echo "Iniciando processo de build do painel de controle"

npm install --global yarn
cd frontend
sudo rm -r node_modules
sudo rm yarn.lock
yarn --production=true

sudo rm -r build
yarn build
cd ..


echo "Instalando e configurando o Nginx..."

sudo apt install nginx certbot python3-certbot-nginx -y


sudo rm -r /var/www/html/quiz
sudo mkdir /var/www/html/quiz
sudo cp -r ./frontend/build/* /var/www/html/quiz


sudo rm /etc/nginx/sites-available/$domain_front
sudo rm /etc/nginx/sites-enabled/$domain_front
sudo rm /etc/nginx/nginx.conf

sudo cp nginx/$domain_front /etc/nginx/sites-available
sudo cp nginx/nginx.conf /etc/nginx/nginx.conf

sudo ln -s /etc/nginx/sites-available/$domain_front /etc/nginx/sites-enabled/$domain_front

echo "Reiniciando nginx"

sudo nginx -t
sudo systemctl reload nginx
sudo systemctl restart nginx

echo "Gerando SSL para o painel de controle..."

sudo certbot --nginx -d $domain_front --email $email --non-interactive --agree-tos


echo "PATH=$PATH" > /etc/cron.d/certbot-renew

echo "@monthly certbot renew --nginx >> /var/log/cron.log 2>&1" >>/etc/cron.d/certbot-renew

crontab /etc/cron.d/certbot-renew