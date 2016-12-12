npm i --registry=https://registry.npm.taobao.org
npm run build
pm2 start pm2.yaml --env production
