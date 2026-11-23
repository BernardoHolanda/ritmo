import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import { router } from './router.js'
import { carregarDados } from './store/estado.js'

await carregarDados()
createApp(App).use(router).mount('#app')
