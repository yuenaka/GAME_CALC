<template>
  <div id="app">
    <div id="nav">
      <router-link to="/">Home</router-link> |
      <router-link to="/tenirb-medal">テニラビ メダルイベント</router-link>
    </div>
    <router-view />
  </div>
</template>

<style lang="sass">
@import url("https://fonts.googleapis.com/css2?family=M+PLUS+Rounded+1c:wght@300;400;700&display=swap");
@import "./css/reset.css";
@import "./css/style.scss";
</style>
