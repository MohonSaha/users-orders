import express from 'express'
import { userControllers } from './users.controller'

const router = express.Router()

router.post('/', userControllers.crateUser)
router.get('/', userControllers.getAllUser)
router.get('/:userId', userControllers.getSingleUser)
router.put('/:userId', userControllers.updateUser)
router.delete('/:userId', userControllers.deleteUser)

// for add orders
router.put('/:userId/orders', userControllers.addOrder)

// for get user's orders
router.get('/:userId/orders', userControllers.getOrders)

router.get('/:userId/orders/total-price', userControllers.totalOrdersPrice)

// PUT /api/users/:userId/orders

export const UserRoute = router
