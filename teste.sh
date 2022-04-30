echo "Criando pasta para upload de arquivos..."

sudo mkdir -p ./backend/tmp/uploads

echo "Configurando Verão do Node"

curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.1/install.sh | bash

export NVM_DIR="$([ -z "${XDG_CONFIG_HOME-}" ] && printf %s "${HOME}/.nvm" || printf %s "${XDG_CONFIG_HOME}/nvm")"
[ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh" # This loads nvm

source ~/.bashrc

nvm install v16.13.2
nvm use v16.13.2

echo "Versão do node instalada:"
node -v

echo "Iniciando processo de build do painel de controle"

npm install --global yarn
cd frontend
yarn

yarn build
cd ..

