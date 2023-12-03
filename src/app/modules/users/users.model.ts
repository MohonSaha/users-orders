import { Schema } from 'mongoose'
import {
  IUser,
  IUserAddress,
  IUserName,
  IUserOrder,
  UserModel,
} from './users.interface'
import { model } from 'mongoose'
import config from '../../config'
import bcrypt from 'bcrypt'

const userNameSchema = new Schema<IUserName>({
  firstName: {
    type: String,
    required: [true, 'First name is required'],
  },
  lastName: {
    type: String,
    required: [true, 'Last name is required'],
  },
})

const userAddressSchema = new Schema<IUserAddress>({
  street: {
    type: String,
    required: [true, 'street name is required'],
  },
  city: {
    type: String,
    required: [true, 'city name is required'],
  },
  country: {
    type: String,
    required: [true, 'country name is required'],
  },
})

const userOrderSchema = new Schema<IUserOrder>({
  productName: {
    type: String,
  },
  price: {
    type: Number,
  },
  quantity: {
    type: Number,
  },
})

const userSchema = new Schema<IUser, UserModel>(
  {
    userId: {
      type: Number,
      required: [true, 'user id is required'],
      unique: true,
    },
    username: {
      type: String,
      unique: true,
    },
    password: {
      type: String,
      select: false,
      required: [true, 'password is required'],
      maxlength: [20, 'password can not be more than 20 charecter'],
    },
    fullName: {
      type: userNameSchema,
      required: [true, 'Student Name is required'],
    },
    age: {
      type: Number,
      required: [true, 'user id is required'],
    },
    email: {
      type: String,
      required: [true, 'email is required'],
    },
    isActive: {
      type: Boolean,
      default: true,
    },
    hobbies: {
      type: [String],
      required: [true, 'Hobbies is required'],
    },
    address: {
      type: userAddressSchema,
      required: [true, 'Address is required'],
    },
    orders: {
      type: [userOrderSchema],
    },
  },
  // {
  //   // Set the transform option to exclude the 'password' field from JSON output
  //   toJSON: {
  //     transform: (doc, ret) => {
  //       delete ret.password
  //       return ret
  //     },
  //   },
  // },
)

userSchema.pre('find', function (next) {
  this.find().projection({
    username: 1,
    fullName: 1,
    age: 1,
    email: 1,
    address: 1,
  })
  next()
})

// custom static method to determine if the user exist or not
userSchema.statics.isUserExist = async function (userId: number) {
  const exisingUser = await User.findOne({ userId })
  return exisingUser
}

userSchema.statics.calcOrdersTotal = async function (
  userId: number,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
): Promise<{ result: any; totalPrice: number }> {
  const result = await User.aggregate([
    { $match: { userId: userId } },
    { $unwind: '$orders' },
    {
      $group: {
        _id: '$_id',
        totalPrice: {
          $sum: { $multiply: ['$orders.price', '$orders.quantity'] },
        },
      },
    },
  ])

  const totalPrice = parseFloat(result[0].totalPrice.toFixed(2))
  return { result, totalPrice }
}

// We will use it to hash our password
userSchema.pre('save', async function (next) {
  // eslint-disable-next-line @typescript-eslint/no-this-alias
  const user = this

  // Hashing password and save into db
  user.password = await bcrypt.hash(
    user.password,
    Number(config.bcrypt_salt_round),
  )
  next()
})

const User = model<IUser, UserModel>('User', userSchema)

export default User
