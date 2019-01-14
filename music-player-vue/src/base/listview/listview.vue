<template>
  <scroll class="list-view" 
          :data="data" 
          ref="listview" 
          :listenScroll="listenScroll"
          :probeType="probeType"
          @scroll="scroll"
  >
    <ul>
      <li v-for="group in data" class="list-group" :key="group.key" ref="listgroup">
        <h2 class="list-group-title">{{group.title}}</h2>
        <ul>
          <li @click="selectItem(item)"
              v-for="item in group.items" 
              class="list-group-item"
              :key="item.key"
          >
            <img v-lazy="item.avatar" class="avatar">
            <span class="name">{{item.name}}</span>
          </li>
        </ul>
      </li>
    </ul>
    <div class="list-shortcut" @touchstart="onShortcutTouchStart" @touchmove.stop.prevent="onShortcutTouchMove" >
        <!-- 需要阻止事件冒泡，防止浏览器的原生滚动，stop/prevent是vue提供的两个事件修饰符 -->
      <ul>
        <li :data-index="index" 
            v-for="(item,index) in shortcutList" 
            class="item"
            :class="{'current': currentIndex===index}"
            :key="item.key"
        >
          {{item}}
        </li>
      </ul>
    </div>
  </scroll>
</template>

<script>
import Scroll from 'base/scroll/scroll';
import {getData} from 'commons/js/dom';
const ANCHOR_HEIGHT = 18;
export default {
  created() {
    this.touch = {}
    this.listenScroll = true
    this.listHeight = []
    this.probeType = 3
  },
  data() {
    return {
      scrollY: -1,
      currentIndex: 0
    }
  },
  props: {
    data:{
      type: Array,
      default: []
    },
  },
  computed: {
    shortcutList() {
      return this.data.map((group) => {
        return group.title.substr(0,1)
      })
    }
  },
  methods: {
    selectItem(item) {
      this.$emit('select',item)
    },
    onShortcutTouchStart(e){
      let anchorIndex = getData(e.target, 'index')
      let firstTouch = e.touches[0]
      this.touch.y1 = firstTouch.pageY
      this.touch.anchorIndex = anchorIndex
      //touches获得触摸的位置，touches[0]是第一个
      this._scrollTo(anchorIndex)
    },
    onShortcutTouchMove(e){
      let firstTouch = e.touches[0]
      this.touch.y2 = firstTouch.pageY
      //delta向下取整
      let delta = (this.touch.y2 - this.touch.y1) / ANCHOR_HEIGHT | 0
      let anchorIndex = parseInt(this.touch.anchorIndex) + delta
      this._scrollTo(anchorIndex)
    },
    scroll(pos) {
      this.scrollY = pos.y
      //这里会调用scrollY方法，将pos.y作为参数传入
    },
    _scrollTo(index) {
      //参数0表示无须动画，无滚动时间
      this.$refs.listview.scrollToElement(this.$refs.listgroup[index],0)      
    },
    _calculateHeight() {
      this.listHeight = []
      const list = this.$refs.listgroup
      let height = 0
      this.listHeight.push(height)
      for (let i = 0; i < list.length; i++) {
        let item = list[i]
        height += item.clientHeight
        this.listHeight.push(height)
      }
    }
  },
  watch: {
    data() {
      setTimeout(() => {
        this._calculateHeight()
      },20)
    },
    scrollY(newY) {
      const listHeight = this.listHeight
      if (newY > 0) {
        this.currentIndex = 0
        return
      }
      for (let i = 0; i < listHeight.length-1; i++) {
        let height1 = listHeight[i]
        let height2 = listHeight[i+1]
        if(-newY>height1 && -newY <height2) {
          this.currentIndex = i+1
          console.log(this.currentIndex)
          return
        }
      }
      this.currentIndex = listHeight.length - 1
    }
  },
  components: {
    Scroll
  }
}
</script>

<style lang="scss" scoped>
@import "commons/style/variable.scss";

.list-view {
  position: relative;
  width: 100%;
  height: 100%;
  overflow: hidden;
  background: $color-background;
  .list-group {
    padding-bottom: 30px;
    .list-group-title {
      height: 30px;
      line-height: 30px;
      padding-left: 20px;
      font-size: $font-size-small;
      color: $color-text-l;
      background: $color-highlight-background;
    }
    .list-group-item {
      display: flex;
      align-items: center;
      padding: 20px 0 0 30px;
      .avatar {
        width: 50px;
        height: 50px;
        border-radius: 50%;
      }
      .name {
        margin-left: 20px;
        color: $color-text-l;
        font-size: $font-size-medium;
      }
    }
  }
  .list-shortcut {
    position: absolute;
    z-index: 30;
    right: 0;
    top: 50%;
    transform: translateY(-50%);
    width: 20px;
    padding: 20px 0;
    border-radius: 10px;
    text-align: center;
    background: $color-background-d;
    font-family: Helvetica;
    .item {
      padding: 3px;
      line-height: 1;
      color: $color-text-l;
      font-size: $font-size-small;
      &.current {
        color: $color-theme;
      }
    }
  }
  .list-fixed {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    .fixed-title {
      height: 30px;
      line-height: 30px;
      padding-left: 20px;
      font-size: $font-size-small;
      color: $color-text-l;
      background: $color-highlight-background;
    }
  }
  .loading-container {
    position: absolute;
    width: 100%;
    top: 50%;
    transform: translateY(-50%);
  }
}

</style>
