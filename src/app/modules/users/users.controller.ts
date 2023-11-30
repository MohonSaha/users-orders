import { Request, Response, json } from 'express'
import User from './users.model'
import { userServices } from './users.service'

// Create a user
const crateUser = async (req: Request, res: Response) => {
  try {
    const userData = req.body
    const result = await userServices.createUser(userData)
    res.status(201).json({
      status: 'succcess',
      message: 'User created successfully!',
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

// get all user
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

// get a user
const getSingleUser = async (req: Request, res: Response) => {
  try {
    const userId = parseInt(req.params.userId)
    const result = await userServices.getSingleUser(userId)
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
    res.status(500).json({
      status: 'fail',
      message: error.message || 'something went wrong',
    })
  }
}

// update a user
const updateUser = async (req: Request, res: Response) => {
  try {
    const userIdToUpdate = parseInt(req.params.userId)
    const updatedData = req.body
    // Update a single document based on userId
    const result = await userServices.updateUser(userIdToUpdate, updatedData)
    const errorMessage = {
      success: false,
      message: 'User not found',
      error: {
        code: 404,
        description: 'User not found!',
      },
    }
    if (await User.isUserExist(userIdToUpdate)) {
      res.status(200).json({
        status: 'succcess',
        message: 'User updated successfully!',
        // data: result,
      })
    } else {
      throw errorMessage
    }

    res.status(200).json({
      status: 'succcess',
      message: 'User updated successfully!',
      data: result,
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

// append new order
// const addProductToOrder = async (req: Request, res: Response) => {
//   try {
//     const userId = parseInt(req.params.userId)
//     const { productName, price, quantity } = req.body

//     // Find the user by userId
//     const user = await User.findOne({ userId })

//     if (!user) {
//       // User not found, return an error response
//       return res.status(404).json({
//         success: false,
//         message: 'User not found',
//         error: {
//           code: 404,
//           description: 'User not found!',
//         },
//       })
//     }

//     // Check if the user already has an 'orders' property, if not, create it
//     if (!user.orders) {
//       user.orders = []
//     }

//     // Add the new product to the 'orders' array
//     user.orders.push({
//       productName,
//       price,
//       quantity,
//     })

//     // Save the updated user document
//     await user.save()

//     res.status(201).json({
//       success: true,
//       message: 'Order created successfully!',
//       data: user,
//     })
//   } catch (error: any) {
//     console.error('Error adding product to order:', error)
//     res.status(500).json({
//       success: false,
//       message: error.message || 'Internal Server Error',
//       error: {
//         code: 500,
//         description: 'Internal Server Error',
//       },
//     })
//   }
// }

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

export const userControllers = {
  crateUser,
  getAllUser,
  getSingleUser,
  updateUser,
  deleteUser,
  addOrder,
}
