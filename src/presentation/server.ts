import express, { Router } from 'express'
import path from 'path';


interface Options {
    port: number;
    routes: Router;
    public_path?: string;
}

export class Server {

    private readonly port;
    private readonly publicPath;
    private readonly routes;

    constructor(options: Options){
        const {port,routes,public_path = 'public'} = options;
        this.port = port;
        this.publicPath = public_path;
        this.routes = routes;

    }

    private app = express();

    

    async start() {

        //*Middleware // Culaquier peticion que pase por cualquier peicion lo seraliza como json
        this.app.use(express.json()); // raw
        this.app.use(express.urlencoded({extended: true})); // x-www-form-urlencoded

        //* Folder
        //Sirve para ubicar la aplicacion de react
        this.app.use(express.static(this.publicPath));

        //El archivo de rutas principal
        this.app.use(this.routes);



        // SPA
        this.app.get('/{*splat}',(req,res)=>{
            const indexPath = path.join(__dirname + `../../../${this.publicPath}/index.html`);
            res.sendFile(indexPath);
        });

        this.app.listen(this.port,()=>{
            console.log(`Server running on port ${this.port}`)
        })
    }
}

