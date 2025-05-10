import { Request, Response } from "express"
import { Contact } from "../models/Contact"


    export class ContactoController {

        static async createContacto(req: Request, res: Response) {
            try {
                
                const contacto = new Contact(req.body)

                await contacto.save()

                res.status(201).json({
                    message: "Contacto creado exitosamente",
                    contacto
                })

            } catch (error) {
                console.log(error)
                res.status(500).json({
                    message: "Error al crear el contacto"
                })
            }
        }

        static async getContacto(req: Request, res: Response) { 
            try {
                const contacto = await Contact.findAll()
                res.status(200).json({
                    message: "Contacto obtenido exitosamente",
                    contacto
                })
            } catch (error) {
                console.log(error)
                res.status(500).json({
                    message: "Error al obtener el contacto"
                })
            }
        }
    }

    export default ContactoController

