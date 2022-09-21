const URL=require('url');
const fs=require('fs');
const mime=require('mime-types');

function route(handle,req,res){
	const pathname= URL.parse(req.url).pathname;
	// console.log("Request for path "+pathname+" recibed");
	if(typeof handle[pathname]==='function'){
		handle[pathname](req,res);
	}else{
		const camino=`./feeds${pathname}`;
		fs.stat(camino,(error)=>{

			if(!error){

				fs.readFile(camino,(error,contenido)=>{

					if(error){

						res.writeHead(503,{'content-type':'text/html'});
						res.write("<h1>Error interno</h1><img src='https://http.cat/503");
						res.end();
					}else{
						res.writeHead(200,{'content-type':mime.lookup(pathname)});
						res.write(contenido);
						res.end();
					}
				});
			}else{
				console.log("No request handler found for "+ pathname);
				res.writeHead(404,{'content-type':'text/html'});
				res.write("<h1>404 not found</h1><img src='https://http.cat/404'>");
				res.end();
			}
		});
	}
}

exports.route=route;