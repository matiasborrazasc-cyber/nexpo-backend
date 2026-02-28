import 'dotenv/config'; 
import Server from './config/server';
import db from './config/connection';

const startApp = async () => {
    try {
        await db.query('SELECT 1');
        console.log('✅ Base de datos conectada correctamente');

        const server = new Server();
        await server.listen(); 
    } catch (error) {
        console.error('❌ Error al iniciar la app o conectar la base de datos:', error);
        process.exit(1);
    }
};

startApp();
