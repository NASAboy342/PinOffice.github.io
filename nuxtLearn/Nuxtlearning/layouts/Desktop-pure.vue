<template>
    <header class="header">Pure</header>
    <main class="main">
        <NuxtPage></NuxtPage>
    </main>
    <footer class="footer">cna yuo raed ti? tsih si a sneten taht wsa wrtien ni rsvere</footer>
</template>

<style>
.header {
    font-size: 30px;
    font-weight: bold;
    background-color: rgb(0, 255, 251);
    width: 100%;
}
.footer {
    font-size: 10px;
    font-weight: bold;
    background-color: rgb(0, 242, 255);
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