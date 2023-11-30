import express from 'express'
import { userControllers } from './users.controller'

const router = express.Router()

// create a user
router.post('/', userControllers.crateUser)

// get all user
router.get('/', userControllers.getAllUser)

// get a user
router.get('/:userId', userControllers.getSingleUser)

// update a user
router.put('/:userId', userControllers.updateUser)

// delete a user
router.delete('/:userId', userControllers.deleteUser)

// add orders
router.put('/:userId/orders', userControllers.addOrder)

// get specific user's orders
router.get('/:userId/orders', userControllers.getOrders)

// get orders total price
router.get('/:userId/orders/total-price', userControllers.totalOrdersPrice)

export const UserRoute = router
