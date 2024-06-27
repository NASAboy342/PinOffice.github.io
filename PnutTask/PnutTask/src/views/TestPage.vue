<template>
    <div>
      <el-table :data="tasks" border>
        <el-table-column type="index" width="50"></el-table-column>
        <el-table-column label="Task">
          <template #default="{ row, $index }">
            <div
              class="draggable-item"
              draggable="true"
              @dragstart="onDragStart($index)"
              @dragover.prevent
              @drop="onDrop($index)"
            >
              <el-row>
                <el-col>{{ row.name }}</el-col>
              </el-row>
            </div>
          </template>
        </el-table-column>
        <el-table-column label="Priority" prop="priority"></el-table-column>
      </el-table>
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        tasks: [
          { id: 1, name: 'Task 1', priority: 'High' },
          { id: 2, name: 'Task 2', priority: 'Medium' },
          { id: 3, name: 'Task 3', priority: 'Low' },
          // Add more tasks as needed
        ],
        draggedIndex: null,
      };
    },
    methods: {
      onDragStart(index) {
        this.draggedIndex = index;
      },
      onDrop(index) {
        const draggedItem = this.tasks[this.draggedIndex];
        this.tasks.splice(this.draggedIndex, 1);
        this.tasks.splice(index, 0, draggedItem);
        this.draggedIndex = null;
      },
    },
  };
  </script>
  
  <style scoped>
  .draggable-item {
    display: flex;
    align-items: center;
  }
  .drag-handle {
    cursor: move;
  }
  </style>
  