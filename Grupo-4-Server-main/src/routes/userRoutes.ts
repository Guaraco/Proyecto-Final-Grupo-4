import { Router } from 'express'
import { AuthController } from '../controllers/AuthController'
import { UserController } from '../controllers/UserController'
import { UserProfileController } from '../controllers/UserProfileController'
import { ContactoController } from '../controllers/ContactoController'

const router: Router = Router()

router.post('/', AuthController.createUser)
router.post('/login', AuthController.login)
router.get('/:id/recipes', UserController.getUserRecipes)
router.put('/:id', UserProfileController.updateUserProfile)
router.put('/:id/password', UserProfileController.updateUserPassword)
router.post('/contact', ContactoController.createContacto)
router.get('/contact', ContactoController.getContacto)

export default router
