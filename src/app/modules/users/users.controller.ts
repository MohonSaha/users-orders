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

export const userControllers = {
  crateUser,
  getAllUser,
  getSingleUser,
  updateUser,
}
