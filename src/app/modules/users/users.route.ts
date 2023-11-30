import express from 'express'
import { userControllers } from './users.controller'

const router = express.Router()

router.post('/', userControllers.crateUser)
router.get('/', userControllers.getAllUser)
router.get('/:userId', userControllers.getSingleUser)
router.put('/:userId', userControllers.updateUser)

export const UserRoute = router
