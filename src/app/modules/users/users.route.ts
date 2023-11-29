import express from 'express'
import { userControllers } from './users.controller'

const router = express.Router()

router.post('/', userControllers.crateUser)
router.get('/', userControllers.getAllUser)

export const UserRoute = router
