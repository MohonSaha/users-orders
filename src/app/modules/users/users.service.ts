import { TUser } from './users.interface'
import User from './users.model'

const createUser = async (userData: TUser): Promise<TUser> => {
  const result = await User.create(userData)
  return result
}

const getAllUsers = async (): Promise<TUser[]> => {
  const result = await User.find()
  return result
}

export const userServices = {
  createUser,
  getAllUsers,
}
