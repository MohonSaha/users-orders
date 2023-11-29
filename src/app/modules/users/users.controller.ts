import { Request, Response } from 'express'
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

export const userControllers = {
  crateUser,
  getAllUser,
}
