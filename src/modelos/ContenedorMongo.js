import dotenv                   from "dotenv";
import mongoose                 from "mongoose";
import { productos }            from "./schemas/productos.js";
dotenv.config();

if (process.env.SELECTED_DB == "mongo"){
    try {
        mongoose.connect( 
            process.env.MONGO_DB_URI,
            {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            }
           
        )  
        console.log("conectado")
    } catch (error) {
        throw new Error(error)        
    }
}

class ContenedorMongo {
    constructor(nombreColeccion){
        this.coleccion = nombreColeccion  
    }

    // muestra todos CHECK OK
   async mostrarTodos() {
        const docs = await this.coleccion.find();
        return docs 
     }

    async nuevoProducto(nuevoElemento){

        
        
        try {
            const maximo = await this.coleccion.find().sort({id: -1}).limit(1);
            const nuevo  = new this.coleccion(nuevoElemento)
            nuevo.id     = maximo[0].id+1
            const err    = await nuevo.save().catch(err => err);
            if (!err.id){
                return {menssage : "No se actualizó el Producto"};     
            }  else {
                return err 
            }
    

        } catch (error) {
            throw new Error(error)
        }
    }

    async actualizarProducto(id, nuevaData){
        try {
            const elementoActualizado = this.coleccion.findOneAndUpdate({id:id}, {$set: nuevaData},
                {returnOriginal : false})
            return elementoActualizado
        } catch (error) {
            throw new Error(error)
        }
    }

    async actualizarCarrito(nuevoElemento){
       const nuevo = new this.coleccion(nuevoElemento)
       const resultado = await this.coleccion.findOne({id: nuevo.id})
       if (!resultado){
            const err = await nuevo.save().catch(err => err);
            if (!err.id){
                return {menssage : "No se dió de alta el Carrito"};     
            }  else {
                return err 
            }
        } else {
            const err = await this.coleccion.findOneAndUpdate({id:nuevo.id}, {productos: nuevo.productos},
                {returnOriginal : false});
             return err 
        }
    }

    

    async mostrarPorId(id){
        try {
            const resultado = await this.coleccion.findOne({id: id})
            return resultado
        } catch (error) {
            return error
        }
    }


    async veoUsuario(email){
        try {
            const resultado = await this.coleccion.findOne({email: email})
            return resultado
        } catch (error) {
            return error
        }
    }


    async eliminarPorId(id){
        try {
            const elementoeliminado = await this.coleccion.deleteOne({id: id})
            if(elementoeliminado.deletedCount == 1) return {message: 'Producto dado de baja'}
            return {message: 'Producto no encontrado'}
    
        } catch (error) {
            throw new Error(error)
        }
    }
}

export {ContenedorMongo}