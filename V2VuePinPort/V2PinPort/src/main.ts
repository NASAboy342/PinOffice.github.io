
import { createApp } from 'vue'
import App from './App.vue'
import TaskItem from './components/TaskItem.vue'
import Todo from './components/Todo.vue'

const app = createApp(App);
app.component('task-item', TaskItem);
app.component('todo', Todo);
app.mount('#app')
