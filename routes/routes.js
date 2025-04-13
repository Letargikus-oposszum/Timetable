import express from "express"
import  * as Controllers from "../controllers/controller.js"

const router =express.Router()

router.get('/', Controllers.getClass)
router.get('/:id', Controllers.getClassById)
router.post('/', Controllers.createClass)
router.put('/:id',Controllers.updateClass)
router.delete('/:id', Controllers.deleteClass)

export default router