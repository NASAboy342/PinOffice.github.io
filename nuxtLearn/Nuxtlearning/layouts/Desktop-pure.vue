<template>
    <header class="header">SpinPort</header>
    <main class="main">
        <NuxtPage></NuxtPage>
    </main>
    <footer class="footer">cna yuo raed ti? tsih si a sneten taht wsa wrtien ni rsvere</footer>
</template>

<style>
:root{
    --primary-color: rgb(221, 255, 254);
    --secondary-color: rgb(172, 210, 209);
}
</style>
<style scoped>
.header {
    font-size: 30px;
    font-weight: bold;
    display: flex;
    align-items: center;
    background-color: var(--primary-color);
    width: 100%;
    padding: 0px 20px;
    height: 100px;
    border-bottom: 1px solid rgba(0, 0, 0, 0.171);
    margin-bottom: 10px;
}
.footer {
    font-size: 12px;
    font-weight: bold;
    display: flex;
    align-items: center;
    background-color: var(--primary-color);
    width: 100%;
    padding: 0px 20px;
    height: 100px;
    border-top: 1px solid rgba(0, 0, 0, 0.171);
    border-bottom: 1px solid rgba(0, 0, 0, 0.171);
    margin-top: 10px;
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