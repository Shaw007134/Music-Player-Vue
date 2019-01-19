<template>
  <transition name="drop">
    <div class="top-tip" v-show="showFlag" @click.stop="hide">
      <slot></slot>
    </div>
  </transition>
</template>


<script>
export default {
  data() {
    return {
      showFlag: false
    }
  },
  props: {
    delay: {
      type: Number,
      default: 2000
    }
  },
  methods: {
    show() {
      this.showFlag = true
      clearTimeout(this.timer)
      this.timer = setTimeout( ()=> {
        this.hide()
      },this.delay)
    },
    hide() {
      this.showFlag = false
    }
  }
}
</script>

<style lang="scss" scoped>
@import 'commons/style/variable.scss';

.top-tip {
  position: fixed;
  top: 0;
  width: 100%;
  z-index: 500;
  background-color: $color-dialog-background;
  &.drop-enter, &.drop-leave-to {
    transform: translateY(-100%);
  }
  &.drop-enter-active, &.drop-leave-active {
    transition: all .3s;
  }
}
</style>

