import { CONFIG } from './config'
import { app } from './app'

app.listen(CONFIG.PORT, ()=> console.log(`Server listening on ${CONFIG.PORT}`))