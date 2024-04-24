'use strict'

import { dbConnection } from "./mongo.js"
import express from 'express'
import cors from 'cors'
import helmet from 'helmet'
import morgan from 'morgan'
import userRoutes from '../src/users/user.routes.js'
import authRoutes from '../src/auth/auth.routes.js'
import taskRoutes from '../src/taskList/taskList.routes.js'

class Server {
    constructor() {
        this.app = express()
        this.port = process.env.PORT
        this.userPath = '/almtesoro/v1/user'
        this.authPath = '/almtesoro/v1/auth'
        this.taskPath = '/almtesoro/v1/task'

        this.middlewares()
        this.routes()
        this.conectarDB()
    }

    async conectarDB() {
        await dbConnection()
    }

    middlewares() {
        this.app.use(express.urlencoded({ extended: false }))
        this.app.use(cors())
        this.app.use(express.json())
        this.app.use(helmet())
        this.app.use(morgan('dev'))
    }

    routes() {
        this.app.use(this.userPath, userRoutes)
        this.app.use(this.authPath, authRoutes)
        this.app.use(this.taskPath, taskRoutes)
    }

    listen() {
        this.app.listen(this.port, () => {
            console.log('Server running on port', this.port);
        })
    }
}

export default Server;