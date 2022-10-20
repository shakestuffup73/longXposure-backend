import { Router } from "express"
import * as photosCtrl from '../controllers/photos.js'
import { decodeUserFromToken, checkAuth } from '../middleware/auth.js'

const router = Router()

/* ---- Public Routes ---- */
router.get('/', photosCtrl.index)


/* ---- Protected Routes ---- */
router.use(decodeUserFromToken)
router.get('/:id', checkAuth, photosCtrl.show)
router.post('/', checkAuth, photosCtrl.create)
router.put('/:id', checkAuth, photosCtrl.update)
router.delete('/:id', checkAuth, photosCtrl.delete)
router.post('/:id/comments', checkAuth, photosCtrl.createComment)


export {
  router
}