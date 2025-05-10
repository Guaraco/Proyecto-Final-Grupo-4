import { Request, Response } from 'express'
import { User } from '../models/User'


export class AuthController {

    static async createUser(req: Request, res: Response) {

        try {

            const userExists = await User.findOne({
                where: {
                    email: req.body.email
                }
            })

            if (userExists) {
                res.status(400).json({ message: "El usuario ya existe"})
                return 
            }
            
            const user = new User(req.body)

            await user.save()
        
            res.status(201).json({
                message: "Usuario creado exitosamente",
                user
            })

        } catch (error) {
            console.log(error)
            res.status(500).json({
                message: "Error al crear el usuario"
            })
        }
        
    }

    static async login(req: Request, res: Response) {

        try {

            const user = await User.findOne({
                where: {
                    email: req.body.email
                }
            })

            if (!user) {
                res.status(400).json({ message: "El usuario no existe"})
                return
            }

            if (user.password !== req.body.password) {
                res.status(400).json({ message: "Contraseña incorrecta"})
                return
            }

            res.status(200).json({
                message: "Inicio de sesión exitoso",
                user: {
                    id: user.id,
                    name: user.name,
                    lastName: user.lastName,
                    email: user.email,
                    role: user.role
                }
            })

        } catch (error) {
            console.log(error)
            res.status(500).json({
                message: "Error al iniciar sesión"
            })
        }

    }

}

