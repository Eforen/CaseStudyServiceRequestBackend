import express from "express"
import { AuthMiddleware } from "../routes/API/User"

import routes from "../routes"

export const app = express()
app.use(express.json())
app.use(AuthMiddleware)

app.use('/', routes)