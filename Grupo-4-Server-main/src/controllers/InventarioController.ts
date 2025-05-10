import { Request, Response } from 'express'
import { Producto } from '../models/Producto'
import { Inventario } from '../models/Inventario'


export class InventarioController {

    static async createProducto(req: Request, res: Response) {

        try {

            const producto = new Producto(req.body)

            await producto.save()

            const inventario = new Inventario({
                productoId: producto.idProducto,
                stockDisponible: producto.stock 
            })

            await inventario.save()

            res.status(201).json({
                message: "Producto creado exitosamente",
                producto
            })
            
        } catch (error) {
            console.log(error)
            res.status(500).json({
                message: "Error al crear el producto"
            })
        }

    }

    static async getProduct(req: Request, res: Response) {

        try {
            
            const inventario = await Inventario.findAll({
              include: [{
                model: Producto,
                attributes: ['nombre', 'descripcion', 'precio', 'categoria', 'urlImagen']
              }]
            })

            res.status(200).json({
                message: "Inventario obtenido exitosamente",
                inventario
            })
            
        } catch (error) {
            console.log(error)
            res.status(500).json({
                message: "Error al obtener el inventario"
            })
        }
    }

    static async updateProduct(req: Request, res: Response) {

        try {

            const producto = await Producto.findByPk(req.params.id)

            if (!producto) {
                res.status(404).json({
                    message: "Producto no encontrado"
                })
            }

            await producto.update(req.body)

            const inventario = await Inventario.findOne({
                where: {
                    productoId: producto.idProducto
                }
            })  
            
            if (inventario) {
                await inventario.update({
                    stockDisponible: producto.stock
                })
            }
            
            res.status(200).json({
                message: "Producto actualizado exitosamente",
                producto
            })
            
        } catch (error) {
            console.log(error)
            res.status(500).json({
                message: "Error al actualizar el producto"
            })
        }
    }

    static async deleteProduct(req: Request, res: Response) {

        try {

            const producto = await Producto.findByPk(req.params.id)

            if (!producto) {
                res.status(404).json({
                    message: "Producto no encontrado"
                })
            }

            await Inventario.destroy({
                where: {
                    productoId: producto.idProducto
                }
            })

            await Producto.destroy({
                where: {
                    idProducto: producto.idProducto
                }
            })

            res.status(200).json({
                message: "Producto eliminado exitosamente"
            })
        } catch (error) {
            console.log(error)
            res.status(500).json({
                message: "Error al eliminar el producto"
            })
        }

    }

}
        

