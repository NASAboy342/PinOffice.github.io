<script lang="ts">
export default {
  data() {
    return {
      PageLable: "Todo List"
    };
  }
}
</script>

<template>
  <div class="big-div">
    <div class="menu">
      <div class="task-menu">All Task</div>
      <div class="task-menu">Todo</div>
      <div class="task-menu">In Progress</div>
      <div class="task-menu">Done</div>
    </div>
    <div class="page-body">
      <div >
        <h1 class="page-label">{{ PageLable }}</h1>
      </div>
      <div class="page-def">
        <task-item></task-item>
      </div>
    </div>
  </div>
</template>

<style>
:root {
  --main-background-color: white;
  --main-text-color: rgb(82, 72, 109);
  --sup-background-color: rgb(255, 94, 0);
  --sup-text-color: rgb(255, 255, 255);
  --main-font: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  --line-color: rgba(54, 54, 54, 0.158);
  --todo-color: gray;
  --inprogess-color: rgb(56, 124, 212);
  --done-color: rgb(0, 255, 21);
}

.big-div {
  position: fixed;
  display: flex;
  width: 100%;
  height: 100%;
}

.menu {
  width: 10%;
  display: flex;
  flex-direction: column;
  gap: 5px;
  border-right: 1px solid var(--line-color);
}

.page-body {
  display: flex;
  flex-direction: column;
  width: 100%;
}
.task-menu{
  color: var(--main-text-color);
  text-align: left;
  padding-left: 10px;
  text-wrap: wrap;
  padding-top: 10px;
  padding-bottom: 10px;
  border-bottom: 1px solid var(--line-color);
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
.page-label{
  background-color: var(--sup-background-color);
  color: var(--sup-text-color);
  text-align: center;
}
</style>
