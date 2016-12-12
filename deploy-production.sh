npm i --registry=https://registry.npm.taobao.org
npm run build
pm2 startOrRestart pm2.json --env  production
