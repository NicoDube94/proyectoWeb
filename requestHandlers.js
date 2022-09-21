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
					let obj;
					let form = new formidable.IncomingForm();
					form.parse(req,(err,fields, files) =>{
						obj=JSON.parse(fs.readFileSync('./feeds/noticias.json'))
						console.log(obj.news.id)
						if(!fields.content){
							console.log('Error no hay contenido o no corresponde'.red.bold)
						}else{
							obj.news.forEach(i=>{
								if(fields.id==i.id){
									i.content=fields.content;
									fs.writeFileSync('./feeds/noticias.json',JSON.stringify(obj,null,2),(error)=>{if(error){console.log(error)}});
								}
								
							})
							
						}
						
					})
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
// exports.editarContenido=editarContenido;
