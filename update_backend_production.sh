echo "Parando container do backend"

docker-compose -f docker-compose-prod-only-api.yml down

echo "Iniciando container do backend"

docker-compose -f docker-compose-prod-only-api.yml up -d


