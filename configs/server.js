'use strict'

import express from 'express'; 
import cors from 'cors'; 
import helmet from 'helmet'; 
import morgan from 'morgan'; 
import { dbConnection } from './mongo.js'; 
import userRoutes from '../src/User/user.routes.js'
import categoryRoutes from '../src/Categories/category.routes.js'
class Server{
  constructor(){
      this.app = express();
      this.port = process.env.PORT;
      this.userPath = '/api/user/'
      this.categoryPath = '/api/category/'
      this.conectarDB();
      this.middlewares();
     this.routes();  
  }

  async conectarDB(){
      await dbConnection();
  }
  middlewares(){
      this.app.use(express.static('public'));
      this.app.use(cors());
      this.app.use(express.json());
  }
  routes(){
    this.app.use(this.userPath, userRoutes)
    this.app.use(this.categoryPath, categoryRoutes)
  }

  listen(){
      this.app.listen(this.port, () =>{
          console.log('Servidor ejecutado y escuchando en el puerto', this.port);
      });
  }

}
export default  Server;