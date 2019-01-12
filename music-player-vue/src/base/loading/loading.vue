<template>
  <div class="loading">
    <img src="./loading.gif" width="24" height="24">
    <p class="desc">{{title}}</p>
  </div>
</template>

<script>
export default {
  props: {
    title: {
      type: String,
      default: 'Loading....'
    }
  }
}
</script>

<style lang="scss" scoped>
@import 'commons/style/variable.scss';
.loading {
  width: 100%;
  text-align: center;
  font-size: 0;
  .desc {
    line-height: 20px;
    font-size: $font-size-small;
    color: $color-text-l;
  }
}
</style>
