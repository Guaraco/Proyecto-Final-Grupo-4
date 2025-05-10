import { Sequelize } from 'sequelize-typescript';
import { User } from '../models/User';
import { Producto } from '../models/Producto';
import { Inventario } from '../models/Inventario';
import { loadEnvFile } from 'node:process';
import { UserDetails } from '../models/UserDetails';
import { UserRecipes } from '../models/UserRecipes';
import { Contact } from '../models/Contact';

loadEnvFile()

// Verificar que tenemos la URL de la base de datos
if (!process.env.DATABASE_URL) {
    throw new Error('DATABASE_URL no está definida en las variables de entorno');
}

 //Inicializar conexión a la base de datos
 const db = new Sequelize(process.env.DATABASE_URL, {
    logging: false,
    dialectOptions: {
      ssl: {
        require: true,
        rejectUnauthorized: false
      },
      connectionTimeoutMillis: 30000  // Timeout de 30 segundos
    }
  });

//Inicializar modelos
db.addModels([User, Producto, Inventario, UserDetails, UserRecipes, Contact]);

//const db = new Sequelize(
 //   "Grupo4", 
    //'postgres', 
    //'12345678', 
   // {
   //     host: 'localhost',
   //     dialect: 'postgres',
   //     models: [__dirname + '/../models/**/*.ts'],
   //     logging: false
   // }
//)

export default db;
