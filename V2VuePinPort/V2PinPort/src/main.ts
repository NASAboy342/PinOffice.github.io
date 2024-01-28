
import { createApp } from 'vue'
import App from './App.vue'
import TaskItem from './components/TodoTak/TaskItem.vue'
import Todo from './components/TodoTak/Todo.vue'
import TodoTaskLayout from './components/TodoTak/TodoTaskLayout.vue';
import SpinPortLayoutDesktop from './components/SpinPort/SpinPortLayoutDesktop.vue';
import SpinPortResumeDesktop from './components/SpinPort/Pages/Resume.vue';
import SpinPortHomeDesktop from './components/SpinPort/Pages/Home.vue';
import SpinPortProjectDesktop from './components/SpinPort/Pages/Projects.vue';

const app = createApp(App);
app.component('task-item', TaskItem);
app.component('todo', Todo);
app.component('todo-task-layout', TodoTaskLayout);
app.component('Spin-port-layout-desktop', SpinPortLayoutDesktop);
app.component('Spin-port-resume-desktop', SpinPortResumeDesktop);
app.component('Spin-port-home-desktop', SpinPortHomeDesktop);
app.component('Spin-port-project-desktop', SpinPortProjectDesktop);
app.mount('#app')
