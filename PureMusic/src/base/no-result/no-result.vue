<template>
  <div class="no-result">
    <div class="no-result-icon"></div>
    <p class="no-result-text">{{title}}</p>
  </div>
</template>

<script>
export default {
  props: {
    title: {
      type: String,
      default: ''
    }
  }
}
</script>

<style lang="scss" scoped>
@import 'commons/style/variable.scss';
@import 'commons/style/mixin.scss';

.no-result {
  text-align: center;
  .no-result-icon {
    width: 50px;
    height: 50px;
    margin: 0 auto;
    @include bg-image('no-result');
    background-size: 50px 50px;
  }
  .no-result-text {
    margin-top: 10px;
    font-size: $font-size-medium;
    color: $color-text-d;
  }
}
</style>
