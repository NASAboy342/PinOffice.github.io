
import { createApp } from 'vue'
import App from './App.vue'
import TaskItem from './components/TaskItem.vue'

const app = createApp(App);
app.component('task-item', TaskItem);
app.mount('#app')
