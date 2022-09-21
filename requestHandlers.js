const fs=require('fs');
const formidable=require('formidable');

function home(req,res){
	fs.stat("./feeds/index.html",(error)=>{
		if(!error){
			fs.readFile("./feeds/index.html",(error,contenido)=>{
				if(error){
					res.writeHead(500,{'content-type':'text/html'});
					res.write("<h1>Error interno</h1><img src='https://http.cat/500");
					res.end();
				}else{
					res.writeHead(200,{'content-type':'text/html'});
					res.write(contenido);
					res.end();
				}
			});
		}else{
			console.log("Error 404 not found");
			res.writeHead(404,{'content-type':'text/html'});
			res.write("<h1>Error 404 not found</h1> <img src='https://http.cat/404'>");
			res.end();
		}
	})
	let obj={};
	let form = new formidable.IncomingForm();
	form.parse(req,(err,fields, files) =>{
		 fs.readFile('./feeds/noticias.json',(err,contenido) =>{
			if(err) console.log(err);
		 	else{
        obj=contenido;
			}
	 });
		console.log(fields)
	})
	
}
function editarContenido(req,res){
	fs.stat("./feeds/editarContenido.html",(error)=>{
		if(!error){
			fs.readFile("./feeds/editarContenido.html",(error,contenido)=>{
				if(error){
					res.writeHead(500,{'content-type':'text/html'});
					res.write("<h1>Error interno</h1><img src='https://http.cat/500");
					res.end();
				}else{
					res.writeHead(200,{'content-type':'text/html'});
					res.write(contenido);
					res.end();
				}
			});
		}else{
			console.log("Error 404 not found");
			res.writeHead(404,{'content-type':'text/html'});
			res.write("<h1>Error 404 not found</h1> <img src='https://http.cat/404'>");
			res.end();
		}
	})

	
}

exports.home=home;
exports.editarContenido=editarContenido;
