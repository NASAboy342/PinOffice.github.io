
import { createApp } from 'vue'
import App from './App.vue'
import TaskItem from './components/TodoTak/TaskItem.vue'
import Todo from './components/TodoTak/Todo.vue'
import TodoTaskLayout from './components/TodoTak/TodoTaskLayout.vue';
import SpinPortLayoutDesktop from './components/SpinPort/SpinPortLayoutDesktop.vue';
import SpinPortLayoutMobile from './components/SpinPort/SpinPortLayoutMobile.vue';

import SpinPortResumeDesktop from './components/SpinPort/Pages/Resume.vue';
import SpinPortHomeDesktop from './components/SpinPort/Pages/Home.vue';
import SpinPortHomeMobile from './components/SpinPort/Pages/HomeMobile.vue';
import SpinPortProjectDesktop from './components/SpinPort/Pages/Projects.vue';
import PageUnderMaintain from './components/SpinPort/Pages/PageUnderMaintain.vue';
import SpinPortContactDesktop from './components/SpinPort/Pages/Contacts.vue';
import SpinPortFooterDesktop from './components/SpinPort/Pages/footer.vue';
import SpinPortFooterMobile from './components/SpinPort/Pages/footerMobile.vue';
import SpinPortMultiColoredLine from './components/SpinPort/Pages/multiColoredLine.vue';

const app = createApp(App);
app.component('task-item', TaskItem);
app.component('todo', Todo);
app.component('todo-task-layout', TodoTaskLayout);
app.component('Spin-port-layout-desktop', SpinPortLayoutDesktop);
app.component('Spin-port-layout-mobile', SpinPortLayoutMobile);

app.component('Spin-port-resume-desktop', SpinPortResumeDesktop);
app.component('Spin-port-home-desktop', SpinPortHomeDesktop);
app.component('Spin-port-home-mobile', SpinPortHomeMobile);
app.component('Spin-port-project-desktop', SpinPortProjectDesktop);
app.component('Page-under-maintenance', PageUnderMaintain);
app.component('Spin-port-contact-desktop',SpinPortContactDesktop);
app.component('Spin-port-footer',SpinPortFooterDesktop);
app.component('Spin-port-footer-mobile',SpinPortFooterMobile);
app.component('Spin-port-muilty-colored-line',SpinPortMultiColoredLine);
app.mount('#app')
