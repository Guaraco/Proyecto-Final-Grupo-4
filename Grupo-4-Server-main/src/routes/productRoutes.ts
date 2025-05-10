import { Router } from 'express'
import { InventarioController } from '../controllers/InventarioController'


const router: Router = Router()

router.post('/', InventarioController.createProducto)
router.get('/', InventarioController.getProduct)
router.put('/:id', InventarioController.updateProduct)
router.delete('/:id', InventarioController.deleteProduct)



export default router
                                                                                                                                                                                          