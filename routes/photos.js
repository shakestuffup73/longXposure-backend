import { Router } from "express"
import * as photosCtrl from '../controllers/photos.js'
import { decodeUserFromToken, checkAuth } from '../middleware/auth.js'

const router = Router()

/* ---- Public Routes ---- */
router.get('/', photosCtrl.index)
router.get('/:id', photosCtrl.show)
router.post('/', photosCtrl.create)
router.put('/:id', photosCtrl.update)
router.delete('/:id', photosCtrl.delete)


/* ---- Protected Routes ---- */

router.use(decodeUserFromToken)




export {
  router
}