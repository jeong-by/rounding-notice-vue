const fs = require('fs');
const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
//   devServer: {
// 	host: 'http://192.168.188.110',
//     port: 40020,
// 	https: {
// 		key: fs.readFileSync('./cert/eboard.samsunghospital.com.key.pem'),
// 		cert: fs.readFileSync('./cert/eboard.samsunghospital.com.crt.pem'),
// 		ca: fs.readFileSync('./cert/ca-chain-bundle.pem')
// 	},
// 	allowedHosts:'all' ,
// 	//client: {
// 	//	webSocketURL: 'ws://0.0.0.0:40020/ws	'
// 	//}
//   },
})
