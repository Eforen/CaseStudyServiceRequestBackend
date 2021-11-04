import { CONFIG } from './config'
import { MakeApp } from './app'

MakeApp().listen(CONFIG.PORT, ()=> console.log(`Server listening on ${CONFIG.PORT}`))