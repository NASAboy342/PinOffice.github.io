<template>
    <header class="header">Main</header>
    <main class="main">
        <router-view></router-view>
    </main>
    <footer class="footer">cna yuo raed ti? tsih si a sneten taht wsa wrtien ni rsvere</footer>
</template>

<style scoped>
.header {
    font-size: 30px;
    font-weight: bold;
    background-color: rgb(0, 255, 4);
    width: 100%;
}
.footer {
    font-size: 10px;
    font-weight: bold;
    background-color: rgb(89, 255, 0);
    width: 100%;
}
.main {
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    background-color: rgb(255, 255, 255);
}
</style>