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
  orders: IUserOrder[] | null
}

export interface UserModel extends Model<IUser> {
  isUserExist(id: number): Promise<IUser | null>
}

export interface OrdersTotalModel extends Model<IUser> {
  calcOrdersTotal(id: number): Promise<void>
}
