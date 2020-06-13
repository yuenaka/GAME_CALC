<template>
  <div id="app">
    <div id="nav">
      <router-link to="/">Home</router-link>|
      <router-link to="/tenirb-medal">テニラビ メダルイベント</router-link>|
      <router-link to="/tenirb-contact">テニラビ コンタクトイベント</router-link>
    </div>
    <router-view />
  </div>
</template>

<style lang="scss">
@import "./css/reset.css";
@import "./css/style.scss";
</style>
