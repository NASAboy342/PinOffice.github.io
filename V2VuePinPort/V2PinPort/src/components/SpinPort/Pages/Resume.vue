<template>
    <div class="resumeContainer">
        <div class="resumeSection">
            <div class="resumeNote" v-for="note in resumeNotes">
                <h3>{{ note.title }}</h3>
                <div>{{ note.description }}</div>
            </div>
        </div>
        <div class="resumeSection">
            <div class="resumeNote" v-for="note in resumeNotes">
                <h3>{{ note.title }}</h3>
                <div>{{ note.description }}</div>
            </div>
        </div>
    </div>
</template>

<script lang="ts" setup>
    import { ref } from "vue";

    const resumeNotes = ref(
        [
            {
                title: "2024",
                description: "Graduated from Wester University (Computer science)"
            },
            {
                title: "2024",
                description: "Graduated from Wester University (Computer science)"
            },
            {
                title: "2024",
                description: "Graduated from Wester University (Computer science)"
            },
            {
                title: "2024",
                description: "Graduated from Wester University (Computer science)"
            },
            {
                title: "2024",
                description: "Graduated from Wester University (Computer science)"
            },
        ]
    )
</script>

<style>
.resumeContainer{
    display: flex;
    width: 60%;
    margin: auto;
    margin-top: 100px;
    justify-content: space-between;
    gap: 10px;
}
.resumeNote{
    background-color: rgb(233, 233, 233);
    border-radius: 5px;
    box-shadow: 2px 2px 5px rgba(0, 0, 0, 0.212);
    text-wrap: wrap;
    padding-left: 10px;
    padding-right: 10px;
    padding-bottom: 10px;
    padding-top: 1px;
    margin-top: 10px;
}
</style>