<template>
  <div class="search-list" v-show="searches.length">
    <transition-group name="slide" tag="ul">
      <li class="search-item" v-for="item in searches" :key="item">
        <span class="text">{{item}}</span>
        <span class="icon">
          <i class="icon-delete"></i>
        </span>
      </li>
    </transition-group>
  </div>
</template>

<script>
export default {
  props: {
    searches: {
      type: Array,
      default: []
    }
  }
};
</script>

<style lang="scss" scoped>
@import "commons/style/variable.scss";
@import "commons/style/mixin.scss";

.search-list {
  .search-item {
    display: flex;
    align-items: center;
    height: 32px;
    overflow: hidden;
    color: $color-text-l;
    &.slide-enter,
    &.slide-leave-to {
      height: 0;
    }
    &.slide-enter-active,
    &.slide-leave-active {
      transition: all 0.1s;
    }
    .text {
      flex: 1;
      padding: 2px 0;
      font-size: $font-size-medium;
      @include ellipsis();
      color: $color-text-d;
    }
    .icon {
      @include extend-click();
      .icon-delete {
        font-size: $font-size-small;
        color: $color-text-d;
      }
    }
  }
}
</style>
