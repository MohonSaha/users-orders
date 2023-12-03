/* eslint-disable @typescript-eslint/no-explicit-any */
import { Request, Response } from 'express'
import User from './users.model'
import { userServices } from './users.service'
import { userValidationSchema } from './users.validation'

// Create a new user
const crateUser = async (req: Request, res: Response) => {
  try {
    const userData = req.body

    // data valiation using zod
    const zodParseData = userValidationSchema.parse(userData)

    const result = await userServices.createUser(zodParseData)
    // Exclude password field
    const resultWithoutPassword = JSON.parse(JSON.stringify(result))
    delete resultWithoutPassword.password

    res.status(201).json({
      status: 'succcess',
      message: 'User created successfully!',
      data: resultWithoutPassword,
    })
  } catch (error: any) {
    // eslint-disable-next-line no-console
    console.log(error)
    res.status(500).json({
      status: 'fail',
      message: error.message || 'something went wrong',
    })
  }
}

// Retrieve a list of all users
const getAllUser = async (req: Request, res: Response) => {
  try {
    const result = await userServices.getAllUsers()
    res.status(201).json({
      status: 'succcess',
      message: 'Users fetched successfully!',
      data: result,
    })
  } catch (error: any) {
    // eslint-disable-next-line no-console
    console.log(error)
    res.status(500).json({
      status: 'fail',
      message: error.message || 'something went wrong',
    })
  }
}

// Retrieve a specific user by ID
const getSingleUser = async (req: Request, res: Response) => {
  try {
    const userId = parseInt(req.params.userId)
    // Use the custom static method to check if the user exists
    const existingUser = await User.isUserExist(userId)
    if (existingUser) {
      res.status(200).json({
        status: 'success',
        message: 'User fetched successfully!',
        data: existingUser,
      })
    } else {
      res.status(404).json({
        success: false,
        message: 'User not found',
        error: {
          code: 404,
          description: 'User not found!',
        },
      })
    }
  } catch (error: any) {
    // eslint-disable-next-line no-console
    console.log(error)
    res.status(500).json({ message: 'Internal server error' })
  }
}

// Update user information
const updateUser = async (req: Request, res: Response) => {
  try {
    const userId = parseInt(req.params.userId)
    const updatedData = req.body

    const existingUser = await User.isUserExist(userId)
    if (existingUser) {
      const result = await userServices.updateUser(userId, updatedData)

      res.status(200).json({
        success: true,
        message: 'User updated successfully!',
        data: result,
      })
    } else {
      res.status(404).json({
        success: false,
        message: 'User not found',
        error: {
          code: 404,
          description: 'User not found!',
        },
      })
    }

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    // eslint-disable-next-line no-console
    console.log(error)
    res.status(500).json({
      status: 'fail',
      message: error.message || 'something went wrong',
    })
  }
}

// delete a user
const deleteUser = async (req: Request, res: Response) => {
  try {
    const id = parseInt(req.params.userId, 10)
    await userServices.deleteUser(id)
    res.status(200).json({
      status: 'succcess',
      message: 'user deleted successfully',
      data: null,
    })
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    // eslint-disable-next-line no-console
    console.log(error)
    res.status(500).json({
      status: 'fail',
      message: error.message || 'something went wrong',
    })
  }
}

// add order
const addOrder = async (req: Request, res: Response) => {
  try {
    const userId = parseInt(req.params.userId, 10)
    const orderInfo = req.body

    // Use the custom static method to check if the user exists
    const existingUser = await User.isUserExist(userId)
    if (existingUser) {
      await userServices.addOrderIntoDB(userId, orderInfo)
      res.status(200).json({
        success: true,
        message: 'Order created successfully!',
        data: null,
      })
    } else {
      res.status(404).json({
        success: false,
        message: 'User not found',
        error: {
          code: 404,
          description: 'User not found!',
        },
      })
    }
  } catch (error: any) {
    // eslint-disable-next-line no-console
    console.log(error)
    res.status(500).json({
      status: 'fail',
      message: error.message || 'something went wrong',
    })
  }
}

// get user's orders
const getOrders = async (req: Request, res: Response) => {
  const userId = parseInt(req.params.userId, 10)

  try {
    const existingUser = await User.isUserExist(userId)
    if (existingUser) {
      const orders = existingUser.orders || []

      res.status(200).json({
        success: true,
        message: 'Order fetched successfully!',
        data: orders,
      })
    } else {
      res.status(404).json({
        success: false,
        message: 'User not found',
        error: {
          code: 404,
          description: 'User not found!',
        },
      })
    }
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error(error)
    return res.status(500).json({ message: 'Internal server error' })
  }
}

const totalOrdersPrice = async (req: Request, res: Response) => {
  try {
    const userId = parseInt(req.params.userId, 10)

    const existingUser = await User.isUserExist(userId)
    if (existingUser) {
      const { result, totalPrice } = await User.calcOrdersTotal(userId)

      if (result.length === 0) {
        return res.status(404).json({
          success: false,
          message: 'User not found or no orders available',
        })
      }

      res.status(200).json({
        success: true,
        message: 'Total price calculated successfully!',
        data: { totalPrice },
      })
    } else {
      res.status(404).json({
        success: false,
        message: 'User not found',
        error: {
          code: 404,
          description: 'User not found!',
        },
      })
    }
  } catch (err) {
    res.status(500).json({
      success: false,
      message: 'Something went wrong',
      error: err,
    })
  }
}

export const userControllers = {
  crateUser,
  getAllUser,
  getSingleUser,
  updateUser,
  deleteUser,
  addOrder,
  getOrders,
  totalOrdersPrice,
}
