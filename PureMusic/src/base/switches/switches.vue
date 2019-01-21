<template>
  <ul class="switches">
    <li class="switch-item" 
        v-for="(item,index) in switches" 
        :key="item.id" 
        :class="{'active':currentIndex === index}"
        @click="switchItem(index)"
    >
      <span>{{item.name}}</span>
    </li>
  </ul>
</template>

<script>
export default {
  props: {
    switches: {
      type: Array,
      default: []
    },
    currentIndex: {
      type: Number,
      default: 0
    }
  },
  methods: {
    switchItem(index) {
      console.log(index)
      this.$emit('switch',index)
    }
  }
}
</script>

<style lang="scss" scoped>
@import 'commons/style/variable.scss';

.switches {
  display: flex;
  align-items: center;
  margin: 0 auto;
  width: 240px;
  border: 1px solid $color-highlight-background;
  border-radius: 5px;
  text-align: center;
  .switch-item {
    flex: 1;
    padding: 8px;
    font-size: $font-size-medium;
    color: $color-text-d;
    &.active {
      background-color: $color-highlight-background;
      color: $color-text;
    }
  }
}
</style>

