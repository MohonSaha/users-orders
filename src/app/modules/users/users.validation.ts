import { z } from 'zod'

const userNameValidationSchema = z.object({
  firstName: z.string({
    required_error: 'Name is required',
  }),
  lastName: z.string({
    required_error: 'Name is required',
  }),
})

const userAddressValidationSchema = z.object({
  street: z.string({
    required_error: 'street is required',
  }),
  city: z.string({
    required_error: 'city is required',
  }),
  country: z.string({
    required_error: 'country is required',
  }),
})

const userOrderValidationSchema = z.object({
  productName: z.string(),
  price: z.number(),
  quantity: z.number(),
})

export const userValidationSchema = z.object({
  userId: z.number(),
  username: z.string(),
  password: z
    .string()
    .min(6, { message: 'Must be 6 or more characters long' })
    .max(20, { message: 'Must be 20 or fewer characters long' }),
  fullName: userNameValidationSchema,
  age: z.number(),
  email: z.string().email({ message: 'Invalid email address' }),
  isActive: z.boolean(),
  hobbies: z.array(z.string().min(1)),
  address: userAddressValidationSchema,
  orders: z.array(userOrderValidationSchema).optional(),
})
