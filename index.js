const server=require('./server');
const router=require('./router');
const requestHandlers=require('./requestHandlers');

const handle={};

handle['/home']=requestHandlers.home;
handle['/editarContenido']=requestHandlers.editarContenido;

server.start(router.route,handle);