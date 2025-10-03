import { createApp } from 'vue'
import { createPinia } from 'pinia'
import { clerkPlugin } from '@clerk/vue'
import './style.css'
import router from './routes'
import App from './App.vue'
import { library } from '@fortawesome/fontawesome-svg-core';

// import common icons like user, delete, edit, etc.
import { faUser, faTrash, faSave, faEye, faEdit, faPlus, faSearch, faHeart, faR, faClipboardList, faUserCircle } from '@fortawesome/free-solid-svg-icons';

// 2. Import the Vue Font Awesome component
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';

// AOS imports
import 'aos/dist/aos.css'
import 'vue3-toastify/dist/index.css';

// register icons
library.add(faUser, faTrash, faEdit, faPlus, faEye, faSave, faSearch, faHeart, faR, faClipboardList, faUserCircle);

const PUBLISHABLE_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY

if (!PUBLISHABLE_KEY) {
  throw new Error('Add your Clerk Publishable Key to the .env file')
}

const app = createApp(App)

app.component('font-awesome-icon', FontAwesomeIcon);

app.use(router)
app.use(createPinia())
app.use(clerkPlugin, { publishableKey: PUBLISHABLE_KEY })
app.mount('#app');