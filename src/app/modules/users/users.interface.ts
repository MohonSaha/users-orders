/* eslint-disable no-unused-vars */
import { Model } from 'mongoose'

export interface IUserName {
  firstName: string
  lastName: string
}

export interface IUserAddress {
  street: string
  city: string
  country: string
}

export interface IUserOrder {
  productName: string
  price: number
  quantity: number
}

export interface IUser {
  userId: number
  username: string
  password: string
  fullName: IUserName
  age: number
  email: string
  isActive: boolean
  hobbies: string[]
  address: IUserAddress
  orders?: IUserOrder[]
}

// static methods
export interface UserModel extends Model<IUser> {
  isUserExist(id: number): Promise<IUser | null>
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  calcOrdersTotal(userId: number): Promise<{ result: any; totalPrice: number }>
}
