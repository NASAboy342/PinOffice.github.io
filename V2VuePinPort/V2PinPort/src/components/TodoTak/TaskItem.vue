<template>
    <Button class="task-menu" v-if="AddingItem == 0" v-on:click="AddingItem = 1">Add Item</Button>
    <Form v-if="AddingItem == 1" class="native-form">
            <input class="native-input" type="text" v-model="taskName" placeholder="Task Name">
            <input class="native-input" type="textarea" v-model="taskDescription" placeholder="Task Description">
            <Button class="task-menu" type="submit" v-on:click.prevent="addTask(taskName,taskDescription)">Add</Button>
    </Form>
    <table>
        <thead>
            <tr>
                <th>Task</th>
                <th>Description</th>
                <th>Status</th>
            </tr>
        </thead>
        <tbody>
            <tr v-for="item in ITaskItems">
                <td>{{ item.name }}</td>
                <td>{{ item.description }}</td>
                <td v-if="item.status == 'Todo'">
                    <div class="todo-button">{{ item.status }}</div>
                </td>
                <td v-else-if="item.status == 'InProgress'">
                    <div class="inprogress-button">{{ item.status }}</div>
                </td>
                <td v-else>
                    <div class="done-button">{{ item.status }}</div>
                </td>
            </tr>
        </tbody>
    </table>
</template>

<script lang="ts">
import axios from 'axios'
interface ITaskItem {
    name: string;
    description: string;
    status: string;
}
export default {
    data() {
        return {
            name: 'SKA',
            message: "do it do it!",
            ITaskItems: Array<ITaskItem>(),
            taskName: "",
            taskDescription: "",
            taskStatus: "Todo",
            AddingItem: 0
        }
    },
    methods: {
        async GetData(){
            const response = await axios.get("https://spinport.ddns.net/Todo/get-get-all-task");
            this.ITaskItems = response.data;
        },
        async addTask(pName: string,pDescription: string) {
            const response = await axios.post("https://spinport.ddns.net/Todo/Add-task", {
                name: pName,
                description: pDescription,
                status: this.taskStatus,
            });
            if(response.data.errorCode == 0){
                this.GetData();
                this.taskName = '';
                this.taskDescription = '';
                this.AddingItem = 0;
            }
            else{
                alert(response.data.errorMessage);
                this.GetData();
                this.AddingItem = 0;
            }
        }
    },
    created() {
    this.GetData()
  }
}

</script>

<style>
:root {
    --main-background-color: white;
    --main-text-color: rgb(82, 72, 109);
    --sup-background-color: rgb(255, 94, 0);
    --sup-text-color: rgb(255, 255, 255);
    --main-font: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
    --line-color: rgba(54, 54, 54, 0.096);
    --todo-color: gray;
    --inprogess-color: rgb(56, 124, 212);
    --done-color: rgb(0, 255, 21);
}

body {
    font-family: var(--main-font);
}

.table {
    display: flex;
    flex-direction: column;
}

.header {
    display: flex;
    background-color: var(--sup-background-color);
    justify-content: space-around;
    height: 50px;
    text-align: left;
    border-bottom: 2px solid var(--line-color);
}

.body {
    display: flex;
    background-color: var(--sup-background-color);
    justify-content: space-around;
    background-color: var(--main-background-color);
    color: var(--main-text-color);
}

table {
    margin-top: 10px;
    width: 90%;
    border-collapse: collapse;
}

thead {
    background-color: var(--main-background-color);
    color: var(--main-text-color);
}

thead th {
    text-align: left;
    height: 50px;
    padding-left: 40px;
    border-bottom: 2px solid var(--line-color);
}

tbody {
    background-color: var(--main-background-color);
    color: var(--main-text-color);
}
tbody tr:hover{
    background-color: var(--sup-background-color);
    color: var(--sup-text-color);
}
tbody td {
    text-align: left;
    height: 40px;
    padding-left: 40px;
    border-bottom: 1px solid var(--line-color);
}

.todo-button {
    text-align: center;
    background-color: var(--todo-color);
    color: var(--sup-text-color);
    width: fit-content;
    padding: 5px 15px;
    border-radius: 5px;
}

.inprogress-button {
    text-align: center;
    background-color: var(--inprogess-color);
    color: var(--sup-text-color);
    width: fit-content;
    padding: 5px 15px;
    border-radius: 5px;
}

.done-button {
    text-align: center;
    background-color: var(--done-color);
    width: fit-content;
    padding: 5px 15px;
    border-radius: 5px;
}
.task-menu{
  color: var(--main-text-color);
  text-align: left;
  padding-left: 10px;
  text-wrap: wrap;
  padding-top: 10px;
  padding-bottom: 10px;
  border: none;
  transition: padding-left 0.2s, background-color 0.4s, padding-top 0.2s, padding-bottom 0.4s;
}
.task-menu:hover{
  background-color: var(--sup-background-color);
  color: var(--sup-text-color);
  padding-left: 20px;
  padding-bottom: 13px;
}
.task-menu:active{
  background-color: var(--main-background-color);
  color: var(--sup-text-color);
  padding-left: 20px;
}
.native-input{
    text-align: left;
    height: 40px;
    padding-left: 40px;
    border: none;
    border-bottom: 2px solid var(--line-color);
    outline: none;
}
</style>