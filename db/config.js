const moongose = require('mongoose'); 

const dbConnection = async ()=>{
    try{
        await moongose.connect(process.env.MONGODB_CNN, {});
        console.log('Base de datos conectada existosamente');
    }catch(e){
        throw new Error('Error al conectar a la base de datos', e);

    }
};

module.exports = {
    dbConnection
}