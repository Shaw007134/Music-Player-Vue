<template>
  <div class="music-list">
    <!--返回上一层-->
    <div class="back">
      <i class="icon-back"></i>
    </div>
    <!--歌手信息-->
    <div class="album">
      <div class="avatar">
        <img :src=avatar>
      </div>
      <div class="info">
        <h1 class="name" v-html="name"></h1>
        <div class="fans" >{{fans}}</div>
        <div class="desc" v-html="desc"></div>
      </div>
    </div>
    <div class="bg-image" :style="bgStyle">
      <div class="filter"></div>
    </div>
  </div>
</template>

<script>
import {mapGetters,mapState} from 'vuex' 

export default {
  props: {
    songs: {
      type: Array,
      default: []
    },
  },
  created() {

  },
  computed: {
     ...mapGetters([
      //数组内设置映射，映射属性到对应的getter，返回对应的计算值
      //相当于在Vue实例中挂载了一个叫singer的属性,实例中可使用该属性
      'singer'
    ]),
    bgStyle() {
      return `background-image:url(${this.singer.avatar})`
    },
    name() {
      return this.singer.name
    },
    fans() {
      console.log(this.singer)
      console.log(this.singer.fans)
      return '粉丝: ' + this._normalizeFans(this.singer.fans)
    },
    desc() {
      return this.singer.desc
    },
    avatar() {
      return this.singer.avatar
    }
  },
  methods: {
    _normalizeFans(fans) {
      try {
        let fans_num = parseInt(fans)
        if(fans_num < 9999 && fans_num >0) return fans_num + ' 人'
        else if(fans_num > 9999) return parseInt(fans_num/10000) + ' 万人'
        else return 0
      } catch (error) {
        return 0
      }
    }
  }
}
</script>

<style lang="scss" scoped>
@import 'commons/style/variable.scss';
@import 'commons/style/mixin.scss';

.music-list {
  position: fixed;
  z-index: 100;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: $color-background;
  font-size: 0;
  .back {
    position: absolute;
    top: 0;
    left: 6px;
    z-index: 50;
    .icon-back {
      display: block;
      padding: 10px;
      font-size: $font-size-large-x;
      color: $color-theme;
    }
  }
  .album {
    position: absolute;
    top: 0;
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 18px;
    margin-top: 30px;
    z-index: 40;
    .avatar {
      img {
        width: 125px;
        height: 100%;
      }
    }
    .info {
      flex: 1;
      padding: 0 10px;
      display: flex;
      flex-direction: column;
      // align-items: center;
      justify-content: center;
      @include ellipsis();
      .name {
        line-height: 40px;
        font-size: $font-size-large;
        color: $color-text;
      }
      .fans {
        font-size: $font-size-medium;
        margin-bottom: 8px;
      }
      .desc {
        font-size: $font-size-small;
        @include ellipsis(2);
        line-height: 1.3em;
      }
    }
    
  }
  .bg-image {
    position: relative;
    padding-top: 70%;
    transform: scale(1);
    filter: blur(36px);
    z-index: -1;
    height: 0;
    width: 100%;
    transform-origin: top; // 更改变形原点
    background-size: cover;
    .play-wrapper {
      position: absolute;
      bottom: 20px;
      z-index: 50;
      width: 100%;
      .play {
        box-sizing: border-box;
        width: 135px;
        padding: 7px 0;
        margin: 0 auto;
        text-align: center;
        border: 1px solid $color-theme;
        color: $color-theme;
        border-radius: 100px;
        .icon-play, .text {
          display: inline-block;
          vertical-align: middle;
        }
        .icon-play {
          margin-right: 6px;
          font-size: $font-size-medium-x;
        }
        .text {
          font-size: $font-size-small;
        }
      }
    }
    .filter {
      position: absolute;
      top: 0;
      left: 0;
      bottom: 0;
      right: 0;
      background-color: rgba(7, 17, 27, 0.4);
    }
  }
  .bg-layer {
    position: relative;
    height: 100%;
    background-color: $color-background;
  }
  .list {
    position: fixed;
    top: 0;
    bottom: 0; // top 在 mounted 钩子实现
    width: 100%;
    background: $color-background;
    .song-list-wrapper {
      padding: 20px 30px;
    }
    // overflow: hidden; // 设置 title 的 z-index 来实现相同效果
    .loading-wrapper {
      position: absolute;
      top: 50%;
      transform: translateY(-50%);
      width: 100%;
    }
  }
}
</style>

