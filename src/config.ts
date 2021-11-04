import dotenv from 'dotenv'
import uuid from 'uuid'

dotenv.config()

const PORT = process.env.PORT || 3000
const JWT_KEY = process.env.PORT || uuid.v4().toString()

export const CONFIG = {
    PORT,
    JWT: {
        KEY: JWT_KEY,
    }
}