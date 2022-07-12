read -p "Digite o domínio da api (ex: meudominio.com): " domain_api
read -p "Digite um e-mail (necessário para gerar os certificados): " email

echo "Instalando o Docker..."

curl -fsSL https://get.docker.com -o get-docker.sh

echo "Executando get-docker"

sudo sh get-docker.sh

echo "Executando rm get-docker"

rm get-docker.sh

echo "Instalando docker-compose"

sudo apt install docker-compose -y


echo "Criando pasta para upload de arquivos..."

sudo mkdir -p ./backend/tmp/uploads

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

echo "Iniciando container do backend"


docker-compose -f docker-compose-prod-only-api.yml up -d --build

echo "Instalando e configurando o Nginx..."

sudo apt install nginx certbot python3-certbot-nginx -y




sudo rm /etc/nginx/sites-available/$domain_api
sudo rm /etc/nginx/sites-enabled/$domain_api
sudo rm /etc/nginx/nginx.conf

sudo cp nginx/$domain_api /etc/nginx/sites-available
sudo cp nginx/nginx.conf /etc/nginx/nginx.conf

sudo ln -s /etc/nginx/sites-available/$domain_api /etc/nginx/sites-enabled/$domain_api

echo "Reiniciando nginx"

sudo nginx -t
sudo systemctl reload nginx
sudo systemctl restart nginx


echo "Gerando SSL para a API..."
sudo certbot --nginx -d $domain_api --email $email --non-interactive --agree-tos


echo "Aguardando os containers..."

until [ "`docker inspect -f {{.State.Running}} backend_prod`"=="true" ]; do
    sleep 0.1;
done;

echo "PATH=$PATH" > /etc/cron.d/certbot-renew

echo "@monthly certbot renew --nginx >> /var/log/cron.log 2>&1" >>/etc/cron.d/certbot-renew

crontab /etc/cron.d/certbot-renew