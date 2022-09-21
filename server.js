const http = require('http');
colors = require('colors');

function start(route,handle){
	function requestListener(req,res){
		route(handle,req,res);
	}
	http.createServer(requestListener).listen(8888);
	console.log("Server started".cyan.strikethrough);
}
exports.start=start;
