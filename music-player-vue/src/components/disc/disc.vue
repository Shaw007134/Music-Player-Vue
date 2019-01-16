<template>
  <transition name="slide">
    <music-list>
      <div class="album" ref="album">
        <div class="avatar">
          <img :src="bgImage">
        </div>
        <div class="info">
          <h1 class="name" v-html="title"></h1>
          <div class="fans">{{fans}}</div>
          <div class="desc" v-html="desc"></div>
        </div>
      </div>
    </music-list>
  </transition>
</template>

<script>
import MusicList from 'components/music-list/music-list'
import {mapGetters} from 'vuex'
export default {
  computed: {
    title() {
      return this.disc.dissname
    },
    bgImage() {
      return this.disc.imgurl
    },
    bgStyle() {
      return `background-image:url(${this.disc.imgurl})`;
    },
    ...mapGetters([
      'disc'
    ])
  },
  components: {
    MusicList
  }
}
</script>


<style lang="scss" scoped>
 .slide-enter-active, .slide-leave-active {
   transition: all 0.3s;
 }
 .slide-enter, .slide-leave-to {
   transform: translate3d(100%, 0, 0)
 }
</style>


