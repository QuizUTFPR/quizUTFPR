echo "Instalando o Docker..."

curl -fsSL https://get.docker.com -o get-docker.sh

echo "Executando get-docker"

sudo sh get-docker.sh

echo "Executando rm get-docker"

rm get-docker.sh

echo "Instalando docker-compose"

sudo apt install docker-compose -y