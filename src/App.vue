<template>
  <div id="app">
    <div id="nav">
      <router-link to="/">Home</router-link> |
      <router-link to="/tenirb-medal">テニラビ メダルイベント</router-link>
    </div>
    <router-view />
  </div>
</template>

<style lang="scss">
@import "./css/reset.css";
@import "./css/style.scss";
</style>
