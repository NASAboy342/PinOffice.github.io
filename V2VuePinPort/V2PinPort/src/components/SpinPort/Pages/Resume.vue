<template>
    <div class="resumeCocent">
        <div><h1>Resume</h1></div>
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
.resumeCocent{
    margin-top: 100px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 30px;
    width: 100%;
    height: 100%;
}
.resumeContainer{
    display: flex;
    width: 60%;
    margin: auto;
    justify-content: space-between;
    gap: 10px;
}
.resumeNote{
    background-color: rgb(233, 233, 233);
    border-radius: 5px;
    box-shadow: 2px 2px 5px rgba(0, 0, 0, 0);
    text-wrap: wrap;
    padding-left: 10px;
    padding-right: 10px;
    padding-bottom: 10px;
    padding-top: 1px;
    margin-top: 10px;
    width: 100%;
    transition: box-shadow 0.2s, width 0.3s;
}
.resumeNote:hover{
    box-shadow: 2px 2px 10px rgba(0, 0, 0, 0.212);
    width: 110%;
    cursor: pointer;
}
</style>