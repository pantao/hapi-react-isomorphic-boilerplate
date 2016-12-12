npm i --registry=https://registry.npm.taobao.org
npm run build
pm2 startOrRestart ecosystem.config.js --env testing
