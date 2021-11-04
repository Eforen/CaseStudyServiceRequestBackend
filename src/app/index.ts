import express from "express"

export const app = express()
app.use(express.json())

// app.use('/api', routes)
app.get('/ping', (req: express.Request, res: express.Response) => res.status(200).json({status: 'OK'}))