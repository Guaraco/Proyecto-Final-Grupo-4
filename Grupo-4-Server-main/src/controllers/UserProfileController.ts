import { Request, Response } from 'express';
import { User } from '../models/User';

export class UserProfileController {

    static async updateUserProfile(req: Request, res: Response) {

        try {

            const userId = req.params.id;

            const user = await User.findByPk(userId);

            console.log(user);

            if (!user) {
                res.status(404).json({
                    message: "Usuario no encontrado"
                });
                return;
            }
            const { name, lastName, email } = req.body;

            await user.update({
                name,
                lastName,
                email,
            });

            await user.save();

            res.status(200).json({
                message: "Usuario actualizado exitosamente",
                user
            });
            
        } catch (error) {
            console.log(error);
            res.status(500).json({
                message: "Error al actualizar el usuario"
            });
        }
    }

    static async updateUserPassword(req: Request, res: Response) {
        try {

            const userId = req.params.id;

            const { password } = req.body;

            const user = await User.findByPk(userId);

            if (!user) {
                res.status(404).json({
                    message: "Usuario no encontrado"
                });
                return;
            }

            await user.update({
                password
            });

            await user.save();

            res.status(200).json({
                message: "Contraseña actualizada exitosamente",
                user
            }); 
            
        } catch (error) {
            console.log(error);
            res.status(500).json({
                message: "Error al actualizar la contraseña"
            });
        }
    }
        
    

  
}
