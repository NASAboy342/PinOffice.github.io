<template>
  <div class="tool-bar">
    <el-button :icon="CirclePlus" @click="dialogFormVisible = true" circle />
    <el-button :icon="Search" circle />
  </div>
  <el-table 
  :data="tasks" 
  style="width: 100%"
  header-cell-class-name="custom-header-row">
    <el-table-column prop="id" label="Id" width="100">
      <template #default="{ row, $index }">
            <div
              class="draggable-item"
              draggable="true"
              @dragstart="OnDragStart(row.priority, $index)"
              @dragover.prevent
              @drop="onDrop(row.priority, $index)"
            >
              <el-row>
                <el-col><el-icon><Sort /></el-icon> {{ row.id }}</el-col>
              </el-row>
            </div>
          </template>
    </el-table-column>
    <el-table-column prop="title" label="Title" width="180" />
    <el-table-column prop="description" label="Description" />
    <el-table-column prop="status" label="Status" width="180">
      <template #default="scope">
        <div :class="GetClassBaseOnStatus(scope.row.enumTaskStatus)">
          <el-select v-model="scope.row.status" placeholder="please select current status" >
            <el-option label="Todo" :value="GetTaskRequest.EnumTaskStatus.Todo" @click="UpdateTaskStatus(scope.$index, GetTaskRequest.EnumTaskStatus.Todo)"/>
            <el-option label="InProgress" :value="GetTaskRequest.EnumTaskStatus.InProgress" @click="UpdateTaskStatus(scope.$index, GetTaskRequest.EnumTaskStatus.InProgress)"/>
            <el-option label="Pending" :value="GetTaskRequest.EnumTaskStatus.Pending" @click="UpdateTaskStatus(scope.$index, GetTaskRequest.EnumTaskStatus.Pending)"/>
            <el-option label="Done" :value="GetTaskRequest.EnumTaskStatus.Done" @click="UpdateTaskStatus(scope.$index, GetTaskRequest.EnumTaskStatus.Done)"/>
            <el-option label="Delete" :value="GetTaskRequest.EnumTaskStatus.Delete" @click="UpdateTaskStatus(scope.$index, GetTaskRequest.EnumTaskStatus.Delete)"/>
          </el-select>
        </div>
      </template>
    </el-table-column>
    <el-table-column prop="dueOn" label="DueOn" width="180" :formatter="DateFormter"/>
    <el-table-column label="Actions" width="180">
      <template #default="{ row, $index }">
        <div>
          <el-button size="mini" type="primary" @click="GetUpdateDailog($index)">
            <el-icon><Edit /></el-icon>
          </el-button>
          <el-button size="mini" type="info">
            <el-icon><More /></el-icon>
          </el-button>
        </div>
      </template>
    </el-table-column>
  </el-table>

  <el-dialog v-model="dialogFormVisible" title="Add tasks" width="500">
    <el-form :model="setTasksRequest" label-width="auto" style="max-width: 600px">
      <el-form-item label="Title">
        <el-input v-model="setTasksRequest.title" />
      </el-form-item>
      <el-form-item label="Description">
        <el-input v-model="setTasksRequest.description" />
      </el-form-item>
      <el-form-item label="Status">
        <el-select v-model="setTasksRequest.status" placeholder="please select current status">
          <el-option label="Todo" :value="GetTaskRequest.EnumTaskStatus.Todo" />
          <el-option label="InProgress" :value="GetTaskRequest.EnumTaskStatus.InProgress" />
          <el-option label="Pending" :value="GetTaskRequest.EnumTaskStatus.Pending" />
          <el-option label="Done" :value="GetTaskRequest.EnumTaskStatus.Done" />
          <el-option label="Delete" :value="GetTaskRequest.EnumTaskStatus.Delete" />
        </el-select>
      </el-form-item>
      <el-form-item label="DueDate">
        <el-col :span="11">
        <el-date-picker
          v-model="setTasksRequest.dueOn"
          type="datetime"
          placeholder="Pick a date"
          style="width: 100%"
        />
      </el-col>
      </el-form-item>
    </el-form>
    <template #footer>
      <div class="dialog-footer">
        <el-button @click="dialogFormVisible = false">Cancel</el-button>
        <el-button type="primary" @click="AddTasks()">
          Confirm
        </el-button>
      </div>
    </template>
  </el-dialog>

  <el-dialog v-model="showUpdateDialog" title="Edit tasks" width="500">
    <el-form :model="updatingTask" label-width="auto" style="max-width: 600px">
      <el-form-item label="Title">
        <el-input v-model="updatingTask.title" />
      </el-form-item>
      <el-form-item label="Description">
        <el-input v-model="updatingTask.description" />
      </el-form-item>
      <el-form-item label="Status">
        <el-select v-model="updatingTask.status" placeholder="please select current status">
          <el-option label="Todo" :value="GetTaskRequest.EnumTaskStatus.Todo" />
          <el-option label="InProgress" :value="GetTaskRequest.EnumTaskStatus.InProgress" />
          <el-option label="Pending" :value="GetTaskRequest.EnumTaskStatus.Pending" />
          <el-option label="Done" :value="GetTaskRequest.EnumTaskStatus.Done" />
          <el-option label="Delete" :value="GetTaskRequest.EnumTaskStatus.Delete" />
        </el-select>
      </el-form-item>
      <el-form-item label="DueDate">
        <el-col :span="11">
        <el-date-picker
          v-model="updatingTask.dueOn"
          type="datetime"
          placeholder="Pick a date"
          style="width: 100%"
        />
      </el-col>
      </el-form-item>
    </el-form>
    <template #footer>
      <div class="dialog-footer">
        <el-button @click="showUpdateDialog = false">Cancel</el-button>
        <el-button type="primary" @click="UpdateTask()">
          Update
        </el-button>
      </div>
    </template>
  </el-dialog>
</template>

<script lang="ts" setup>
import { defineProps, onMounted, ref } from 'vue';
import * as GetTaskRequest from '@/Models/Requests/GetTaskRequest';
import * as GetTaskResopnse from '@/Models/Responses/GetTaskResopnse';
import * as TaskInfo from '@/Models/Responses/GetTaskResopnse';

import { ApiCalling } from '@/utils/ApiCalling';
import { Search, CirclePlus } from '@element-plus/icons-vue';
import { SetTasksRequest } from '@/Models/Requests/SetTasksRequest';
import { BaseResponse } from '@/Models/BaseResponse';
import { UpdateTasksRequest } from '@/Models/Requests/UpdateTasksRequest';
import { format } from 'date-fns';
import { IUpdateTaskDisplayOrderRequest } from '@/Models/Requests/UpdateTaskDisplayerOrder';
interface Prop {
  getTaskRequest: GetTaskRequest.GetTaskRequest
}

const props = defineProps<Prop>();
const tasks = ref<TaskInfo.TaskInfo[]>([]);
const dialogFormVisible = ref(false);

const GetTasks = async () => {
  const response:GetTaskResopnse.GetTaskResopnse = await ApiCalling.GetTasks(props.getTaskRequest);
  tasks.value = response.tasks;
}
onMounted(() => {
  GetTasks();
});
const setTasksRequest = ref<SetTasksRequest>({
    userId: 1,
    priority: 1,
    title: '',
    description: '',
    status: GetTaskRequest.EnumTaskStatus.Todo,
    dueOn: new Date(),
  });
const AddTasks = async () => {
  dialogFormVisible.value = false;
  setTasksRequest.value.userId = 1;
  setTasksRequest.value.dueOn.setHours(setTasksRequest.value.dueOn.getHours() +7);
  const response: BaseResponse = await ApiCalling.SetTasks(setTasksRequest.value);
  setTasksRequest.value = {
    userId: 1,
    priority: 1,
    title: '',
    description: '',
    status: GetTaskRequest.EnumTaskStatus.Todo,
    dueOn: new Date(),
  };
  GetTasks();
};
const UpdateTaskStatus = async (index: number, newStatus: GetTaskRequest.EnumTaskStatus) => {
  const updateTaskRequest = ref<UpdateTasksRequest>({
    userId: 1,
    id: tasks.value[index].id,
    title: tasks.value[index].title,
    description: tasks.value[index].description,
    enumTaskStatus: newStatus,
    dueOn: tasks.value[index].dueOn,
    modifyOn: tasks.value[index].modifyOn,
  });
  const response = await ApiCalling.UpdateTask(updateTaskRequest.value);
  GetTasks();
}
const GetClassBaseOnStatus = (stats: GetTaskRequest.EnumTaskStatus) => {
  if(stats === GetTaskRequest.EnumTaskStatus.Todo){
    return 'todo-status';
  }
  if(stats === GetTaskRequest.EnumTaskStatus.InProgress){
    console.log(`Go ${stats}`);
    return 'in-progress-status';
  }
  if(stats === GetTaskRequest.EnumTaskStatus.Pending){
    return 'in-progress-status';
  }
  if(stats === GetTaskRequest.EnumTaskStatus.Done){
    return 'done-status';
  }
  if(stats === GetTaskRequest.EnumTaskStatus.Delete){
    return 'delete-status';
  }
  return 'todo-status'
}
const DateFormter = (row: TableData, column: any, cellValue: Date) => {
  console.log(cellValue);
  return format(cellValue, 'yyyy-MM-dd: hh:mm:ss');
};
const draggedPriority = ref(0);
const draggedIndex = ref(0);

const OnDragStart = (priority: number, index: number) => {
  draggedPriority.value = priority;
  draggedIndex.value = index;
};
const onDrop = async (priority: number, index: number) => {
  tasks.value[index].priority = draggedPriority.value;
  tasks.value[draggedIndex.value].priority = priority;
  const updateTaskDisplayOrderRequest = ref<IUpdateTaskDisplayOrderRequest>({});
  updateTaskDisplayOrderRequest.value.TaskDisplayOrders = tasks.value.map((map) => ({TaskId: map.id, Priority: map.priority}))
  const response = await ApiCalling.UpdateTaskDisplayOrder(updateTaskDisplayOrderRequest.value);
  GetTasks();
};
const showUpdateDialog = ref(false);
const updatingTask = ref<TaskInfo.TaskInfo>({});
const GetUpdateDailog = (taskIndex: number) => {
  showUpdateDialog.value = true;
  updatingTask.value = tasks.value[taskIndex];
}
const UpdateTask = async () => {
  const updateTaskRequest = ref<UpdateTasksRequest>({
    userId: 1,
    id: updatingTask.value.id,
    title: updatingTask.value.title,
    description: updatingTask.value.description,
    enumTaskStatus: updatingTask.value.enumTaskStatus,
    dueOn: updatingTask.value.dueOn,
    modifyOn: updatingTask.value.modifyOn,
  });
  updateTaskRequest.value.dueOn.setHours(updateTaskRequest.value.dueOn.getHours() +7);
  const response = await ApiCalling.UpdateTask(updateTaskRequest.value);
  GetTasks();
  showUpdateDialog.value = false;
}
</script>

<style scoped>
.el-table--fit{
  border-left: 5px solid var(--Main-color);
}
:deep(.custom-header-row){
  border-bottom: 1px solid var(--Main-color) !important;
  border-top: 1px solid var(--Main-color) !important;
  color: var(--Main-color);
}
.tool-bar{
  display: flex;
  justify-content: flex-end;
  gap: 10px;
  margin-bottom: 10px;
  padding-left: 10px;
  padding-right: 10px;
}
.el-button.is-circle:hover{
  background-color: var(--hover-bg-main-color);
  border: 1px solid var(--hover-border-main-color);
}
.el-button.is-circle:active{
  background-color: var(--Main-color);
}
.done-status{
  border: 3px solid greenyellow;
  border-radius: 5px;
}
.todo-status{
  border: 3px solid transparent;
  border-radius: 5px;
}
.in-progress-status{
  border: 3px solid var(--Main-color);
  border-radius: 5px;
}
.delete-status{
  border: 3px solid red;
  border-radius: 5px;
}
:deep(.el-select__wrapper) {
  background-color: transparent;
}
.draggable-item{
  color: var(--Main-color);
  font-weight: bold;
}
.el-button--primary{
  background-color: var(--Main-color);
}
.el-button--primary:hover{
  background-color: rgb(255, 197, 90) !important;
  border-color: var(--Main-color);
}
.el-button:hover{
  background-color: rgba(255, 166, 0, 0.18);
  border-color: var(--Main-color);
}
</style>