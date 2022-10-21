import { Router }                   from "express"
import { carritoApi, productosApi } from "../controladores/index.js"

const rutaCarrito = Router()

rutaCarrito.get('/', async (req, res) => {
    try {
        const carritos = await carritoApi.mostrarTodos()
        
        res.json(carritos)
    } catch (error) {
        res.json(error)
    }
})

rutaCarrito.post('/', async (req, res) => {
    try {
        const { nombre } = req.body
        const id = 0;
        const carrito = await carritoApi.guardarElemento({nombre, productos: []})

        res.json(carrito)
    } catch (error) {
        res.json(error)
    }
})

rutaCarrito.post('/:id/productos', async (req, res) => {
    try {
        const {id} = req.params
        const {productoId} = req.body
        const carrito = await carritoApi.mostrarPorId(id)
        const producto = await productosApi.mostrarPorId(productoId)
        carrito.productos =  [...carrito.productos, producto]
        
        const respuesta = await carritoApi.actualizar(id, carrito)

        res.json(respuesta)

    } catch (error) {
        res.json(error)
    }
})

rutaCarrito.get('/:id/productos', async (req,res) => {
    try {
        const {id} = req.params
        const respuesta = await carritoApi.mostrarPorId(id)   
        if(!respuesta.productos) return res.json({message: 'Carrito no encontrado'})
        res.json(respuesta.productos)
    } catch (error) {
        res.json(error)
    }
})


export {rutaCarrito}