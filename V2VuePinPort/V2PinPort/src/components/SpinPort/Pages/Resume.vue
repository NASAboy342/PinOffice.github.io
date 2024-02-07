<template>
    <div class="resumeCocent">
        <div><h1>Resume</h1></div>
        <div class="resumeContainer">
            <div class="resumeSection">
                <div class="resumeNoteTitle">📖 Education</div>
                <div class="resumeNote" v-for="note in educationNotes">
                    <h3>{{ note.title }}</h3>
                    <div>{{ note.description }}</div>
                    <div v-if="note.logo"><img v-bind:src="note.logo" alt="School logo"></div>
                </div>
            </div>
            <div class="resumeSection">
                <div class="resumeNoteTitle">💼 Experience</div>
                <div class="resumeNote" v-for="note in experienceNotes">
                    <h3>{{ note.title }}</h3>
                    <div>{{ note.description }}</div>
                    <div v-if="note.logo"><img v-bind:src="note.logo" alt="Company logo"></div>
                </div>
            </div>
        </div>
    </div>
    
</template>

<script lang="ts" setup>
    import { ref } from "vue";

    const educationNotes = ref(
        [
            {
                title: "2020-2024: Computer science",
                description: "Studied Computer science on Programming at Wester University",
                logo: "http://westernuniversity.edu.kh/themes/img/logo_wu_1.png"
            },
            {
                title: "2019-2023: Litterature of English",
                description: "Studied Litterature of English on Teaching at Wester University",
                logo: "http://westernuniversity.edu.kh/themes/img/logo_wu_1.png"
            },
            {
                title: "2019: High School",
                description: "Finnish High School at PongTik High School"
            },
        ]
    )
    const experienceNotes = ref(
        [
            {
                title: "2023-Current: JR. Product developer",
                description: "JR. Product developer at Techbodia",
                logo: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAPAAAADwCAYAAAA+VemSAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAA3ZpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDYuMC1jMDA2IDc5LmRhYmFjYmIsIDIwMjEvMDQvMTQtMDA6Mzk6NDQgICAgICAgICI+IDxyZGY6UkRGIHhtbG5zOnJkZj0iaHR0cDovL3d3dy53My5vcmcvMTk5OS8wMi8yMi1yZGYtc3ludGF4LW5zIyI+IDxyZGY6RGVzY3JpcHRpb24gcmRmOmFib3V0PSIiIHhtbG5zOnhtcE1NPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvbW0vIiB4bWxuczpzdFJlZj0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL3NUeXBlL1Jlc291cmNlUmVmIyIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bXBNTTpPcmlnaW5hbERvY3VtZW50SUQ9InhtcC5kaWQ6NTVmYWU3N2YtNWVlNy00ZmU1LWE4NTMtYTY1ZGVlZjJiMjcwIiB4bXBNTTpEb2N1bWVudElEPSJ4bXAuZGlkOjNEQzZGNkYwQTY2NTExRUNCOTk4RTU1RUY1RDFDRDJEIiB4bXBNTTpJbnN0YW5jZUlEPSJ4bXAuaWlkOjNEQzZGNkVGQTY2NTExRUNCOTk4RTU1RUY1RDFDRDJEIiB4bXA6Q3JlYXRvclRvb2w9IkFkb2JlIFBob3Rvc2hvcCAyMi40IChNYWNpbnRvc2gpIj4gPHhtcE1NOkRlcml2ZWRGcm9tIHN0UmVmOmluc3RhbmNlSUQ9InhtcC5paWQ6NTVmYWU3N2YtNWVlNy00ZmU1LWE4NTMtYTY1ZGVlZjJiMjcwIiBzdFJlZjpkb2N1bWVudElEPSJ4bXAuZGlkOjU1ZmFlNzdmLTVlZTctNGZlNS1hODUzLWE2NWRlZWYyYjI3MCIv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"
            },
            {
                title: "2021-2023: JR. Graphic designer",
                description: "JR. Graphic designer at TySiang CO., Ltd"
            },
        ]
    )
</script>

<style scoped>
img{
    width: 100%;
}
.resumeNoteTitle{
    text-align: center;
    font-weight: bold;
    font-size:x-large;
}
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
.resumeNote img{
    height: 50px;
    width: auto;
    margin-top: 10px;
}
.resumeNote:hover{
    box-shadow: 2px 2px 10px rgba(0, 0, 0, 0.212);
    width: 110%;
    cursor: pointer;
}
</style>