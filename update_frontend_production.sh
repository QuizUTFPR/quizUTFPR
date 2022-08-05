echo "Iniciando processo de build do painel de controle"

cd frontend
sudo rm -r node_modules
sudo rm yarn.lock
yarn --production=true

sudo rm -r build
yarn build
cd ..

echo "Atualizando versão de produção no Nginx"

sudo rm -r /var/www/html/quiz
sudo mkdir /var/www/html/quiz
sudo cp -r ./frontend/build/* /var/www/html/quiz


echo "Atualizado com sucesso..."
