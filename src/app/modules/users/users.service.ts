import { IUser } from './users.interface'
import User from './users.model'

const createUser = async (userData: IUser): Promise<IUser> => {
  const result = await User.create(userData)
  return result
}

// get all users
const getAllUsers = async (): Promise<IUser[]> => {
  const result = await User.find()
  return result
}

// get single user through userId
const getSingleUser = async (userId: number): Promise<IUser[] | null> => {
  const result = await User.aggregate([{ $match: { userId: userId } }])
  return result
}

//update user data
const updateUser = async (
  userId: number,
  userData: IUser,
): Promise<IUser | null> => {
  const result = await User.findOneAndUpdate(
    { userId: userId },
    { $set: userData },
    { new: true, runValidators: true },
  )
  return result
}

// delete a user
const deleteUser = async (userId: number): Promise<IUser | null> => {
  const result = await User.findOneAndDelete({ userId: userId })
  return result
}

export const userServices = {
  createUser,
  getAllUsers,
  getSingleUser,
  updateUser,
  deleteUser,
}
