import express, { Application, Request, Response } from 'express'
const app: Application = express()
import cors from 'cors'
import { UserRoute } from './app/modules/users/users.route'

// parsers
app.use(express.json())
app.use(cors())

app.use('/api/users', UserRoute)

app.get('/', (req: Request, res: Response) => {
  res.status(200).json({
    status: 'success',
    message: 'Wellcome to users and orders project by mohon saha',
  })
})

export default app
