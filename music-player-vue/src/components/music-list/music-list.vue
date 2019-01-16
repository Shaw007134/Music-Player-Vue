<template>
  <div class="music-list">
    <!--返回上一层-->
    <div class="back" @click="back">
      <i class="icon-back"></i>
    </div>
    <!--歌手信息-->
    <div class="bg-image" :style="bgStyle" ref="bgImage">
      <div class="album" v-show="songs.length" ref="album">
        <slot></slot>
      </div>
      <div class="play-wrapper">
        <div ref="playBtn" v-show="songs.length>0" class="play" @click="random">
          <i class="icon-play"></i>
          <span class="text">随机播放全部</span>
        </div>
      </div>
      <div class="filter" ref="filter"></div>
    </div>
    <div class="bg-layer" ref="layer"></div>
    <scroll
      :data="songs"
      class="list"
      ref="list"
      :probe-type="probeType"
      :listen-scroll="listenScroll"
      @scroll="scroll"
    >
      <!-- scroll组件需要根据数据更新高度 -->
      <div class="song-list-wrapper">
        <song-list @select="selectItem" :songs="songs"></song-list>
      </div>
      <div class="loadingContainer" v-show="!songs.length">
        <loading></loading>
      </div>
    </scroll>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import Scroll from "base/scroll/scroll";
import SongList from "base/song-list/song-list";
import { prefixStyle } from "commons/js/dom";
import Loading from "base/loading/loading";
import { playlistMixin } from "commons/js/mixin";
const RESERVED_HEIGHT = 38;
const transform = prefixStyle("transform");
const backdrop = prefixStyle("backdrop-filter");
export default {
  mixins: [playlistMixin],
  //插入mixin，同名方法覆盖，注意可能有多个mixin
  props: {
    songs: {
      type: Array,
      default: []
    },
    bgStyle: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      scrollY: 0
    };
  },
  created() {
    this.probeType = 3;
    this.listenScroll = true;
  },
  mounted() {
    this.imageHeight = this.$refs.bgImage.clientHeight;
    this.minTranslateY = -this.imageHeight + RESERVED_HEIGHT;
    this.$refs.list.$el.style.top = `${this.imageHeight}px`;
  },
  computed: {
    ...mapGetters([
      //数组内设置映射，映射属性到对应的getter，返回对应的计算值
      //相当于在Vue实例中挂载了一个叫singer的属性,实例中可使用该属性
      "singer"
    ]),
    // bgStyle() {
    //   return `background-image:url(${this.singer.avatar})`;
    // },
    
  },
  methods: {
    handlePlaylist(playlist) {
      const bottom = playlist.length > 0 ? "60px" : "";
      this.$refs.list.$el.style.bottom = bottom;
      this.$refs.list.refresh();
    },
    scroll(pos) {
      this.scrollY = pos.y;
    },
    back() {
      this.$router.back();
    },
    //这里不需要关系item，但子组件要尽可能把信息传递出去
    selectItem(item, index) {
      console.log(index);
      this.selectPlay({
        list: this.songs.slice(),
        // list: JSON.parse(JSON.stringify(this.songs)),
        index
      });
    },
    random() {
      this.randomPlay({
        list: this.songs.slice()
        // list: JSON.parse(JSON.stringify(this.songs))
      });
    },
    ...mapActions(["selectPlay", "randomPlay"])
  },
  watch: {
    scrollY(newY) {
      let zIndex = 0;
      let scale = 1;
      let blur = 0;
      let translateY = Math.max(this.minTranslateY, newY);
      this.$refs.layer.style[transform] = `translate3d(0,${translateY}px,0)`;
      const percent = Math.abs(newY / this.imageHeight);

      if (newY > 0) {
        scale = 1 + percent;
        zIndex = 10;
      } else {
        blur = Math.min(20 * percent, 20);
      }
      this.$refs.filter.style[backdrop] = `blur(${blur}px)`;
      if (newY < this.minTranslateY) {
        zIndex = 10;
        this.$refs.bgImage.style.paddingTop = 0;
        this.$refs.bgImage.style.height = `${RESERVED_HEIGHT}px`;
        this.$refs.playBtn.style.display = "none";
        this.$refs.album.style.display = "none";
      } else {
        this.$refs.bgImage.style.paddingTop = "62%";
        this.$refs.bgImage.style.height = 0;
        this.$refs.playBtn.style.display = "";
        this.$refs.album.style.display = "";
        // if(this.$refs.album.style.zIndex != 10){
        //   this.$refs.album.style.zIndex = 10
        // } 10
      }
      this.$refs.bgImage.style[transform] = `scale(${scale})`;
      this.$refs.bgImage.style.zIndex = zIndex;
    }
  },
  components: {
    Scroll,
    SongList,
    Loading
  }
};
</script>

<style lang="scss" scoped>
@import "commons/style/variable.scss";
@import "commons/style/mixin.scss";

.music-list {
  position: fixed;
  z-index: 100;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: $color-background;
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
    margin-bottom: 30px;
    z-index: 40;
  }

  .bg-image {
    position: relative;
    padding-top: 62%;
    transform: scale(1);
    // filter: blur(36px);
    // z-index: 20;
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
        .icon-play,
        .text {
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
      width: 100%;
      height: 100%;
      background-color: rgba(7, 17, 27, 0.4);
    }
  }
  // .bg-image::after {
  //   content: "";
  //   width:100%;
  //   height:100%;
  //   position: absolute;
  //   left:0;
  //   top:0;
  //   background: inherit;
  //   filter: blur(25px);
  //   transform: scale(1.5);
  //   z-index: inherit;
  // }
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

