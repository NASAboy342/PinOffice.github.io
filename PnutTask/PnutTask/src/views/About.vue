<!-- src/views/About.vue -->
<template>
    <div class="invis"></div>
    <el-container>
      <el-header>
        <h1>About This website</h1>
      </el-header>
      <el-main>
        <el-card>
          <el-row>
            <el-col :span="24">
              <h2>By Pin Sopheaktra</h2>
              <p>
                This website is made by Pin Sopheaktra. During the performance review of the year.
              </p>
              <p>
                Requirements:
                Frontend: Vue.js with TypeScript, Tailwind CSS, ElementUi-Plus, Storybook Backend: C#, MSSQL, Dapper
                    Basic Requirements:
                    - Task Creation: Allow users to create, update, and delete tasks.
                    - Task List: Display a list of tasks with details such as due date and priority.
                    - API Endpoints: Create RESTful APIs for managing tasks (CRUD operations).
                    - Database: Use MSSQL to store task data, and Dapper for database operations.

                    Advanced Requirements:
                    - User Authentication: Implement user registration and login.
                    - Categorization: Implement categories for tasks (e.g., Work, Personal).
                    - Search and Filter: Enable users to search and filter tasks.
                    - Localization: Support multiple languages, including Khmer.
              </p>
            </el-col>
          </el-row>
        </el-card>
      </el-main>
    </el-container>
  </template>
  
  <script lang="ts">
  import { defineComponent } from 'vue';
  
  export default defineComponent({
    name: 'About'
  });
  </script>
  
  <style scoped>
  h1 {
    margin: 0;
    font-size: 2em;
  }
  h2 {
    margin-top: 0;
  }
  p {
    margin: 1em 0;
  }
  .invis{
    height: 50px;
  }
  </style>
  