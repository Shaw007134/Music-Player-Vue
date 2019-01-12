<template>
  <div id="app">
    <!-- 标签可以小写 -->
    <m-header></m-header>
    <tab></tab>
    <keep-alive>
      <router-view></router-view>
    </keep-alive>
  </div>
</template>

<script type="text/ecmascript-6">
  //class的书写规范是第一个要大写
  import MHeader from 'components/m-header/m-header';
  import Tab from 'components/tab/tab';
  export default {
    components: {
      MHeader,
      Tab
    }
  };
</script>

<style scope lang="scss">

</style>
