import { Request, Response } from 'express'
import { UserDetails } from '../models/UserDetails'
import { User } from '../models/User'
import { Producto } from '../models/Producto'
import { Inventario } from '../models/Inventario'
import { UserRecipes } from '../models/UserRecipes'


export class UserController {


    static async buyProduct(req: Request, res: Response) {

        try {

         const buy = new UserDetails(req.body)

         const user = await User.findOne({
            where: {
                id: req.body.userId
            }
         })

         if (!user) {
            res.status(404).json({
                message: "Usuario no encontrado"
            })
            return
         }

         
         // Verificar si hay suficiente stock
         const inventarioCheck = await Inventario.findOne({
            where: {
               productoId: req.body.productoId
            }
         });
         
         if (!inventarioCheck || inventarioCheck.stockDisponible < (req.body.cantidad || 1)) {
            res.status(400).json({
               message: "No hay suficiente stock disponible"
            });
            return;
         }

         // Registrar la compra en UserRecipes
         const producto = await Producto.findByPk(req.body.productoId);
         
         if (!producto) {
            res.status(404).json({
               message: "Producto no encontrado"
            });
            return;
         }
         
         const cantidad = req.body.cantidad || 1;
         const precioUnitario = producto.precio;
         const total = req.body.total;
         
         const userRecipe = new UserRecipes({
            userId: req.body.userId,
            productoId: req.body.productoId,
            cantidad: cantidad,
            precioUnitario: precioUnitario,
            total: total,
            fechaCompra: new Date(),
            estado: 'completado'
         });
         
         await userRecipe.save();
         
   
         

         await buy.save()

         const inventario = await Inventario.findOne({
            where: {
               productoId: req.body.productoId
            }
         });
         
         if (!inventario) {
            res.status(404).json({
               message: "Producto no encontrado en inventario"
            });
            return
         }

         const cantidadCompra = req.body.cantidad || 1;
         inventario.stockDisponible = inventario.stockDisponible - cantidadCompra;
         producto.stock = producto.stock - cantidadCompra;
        
         await Promise.all([
            inventario.save(),
            producto.save()
         ])

         res.status(200).json({
            message: "Producto comprado exitosamente",
            buy
         })
          
        } catch (error) {
            console.log(error)
            res.status(500).json({
                message: "Error al comprar el producto"
            })
        }
    }

    static async getUserRecipes(req: Request, res: Response ) {

        try {

            const userRecipes = await UserRecipes.findAll({
                where: {
                    userId: req.params.id
                },
                include: [
                    {
                        model: User,
                        attributes: ['name', 'lastName', 'email']
                    },
                    {
                        model: Producto,
                        attributes: ['nombre', 'categoria', 'urlImagen']
                    }
                ]
            })

            if (!userRecipes) {
                res.status(404).json({
                    message: "No se encontraron recetas para este usuario"
                })
                return
            }

            res.status(200).json({
                message: "Recetas del usuario obtenidas exitosamente",
                userRecipes
            })

        } catch (error) {
            console.log(error)
            res.status(500).json({
                message: "Error al obtener las recetas del usuario"
            })
        }
    }
}




