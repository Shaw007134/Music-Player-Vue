<template>
  <transition name="slide">
    <music-list :bgStyle="bgStyle" :songs="songs">
      <div class="avatar">
        <img :src="bgImage">
      </div>
      <div class="info">
        <h1 class="name" v-html="title"></h1>
        <div class="fans">{{listennum}}</div>
        <div class="desc" v-html="desc"></div>
      </div>
    </music-list>
  </transition>
</template>

<script>
import MusicList from "components/music-list/music-list";
import { mapGetters } from "vuex";
import { getTopList_F } from "api/rank";
import { ERR_OK } from "api/config";
import { getMusic } from "api/song";
import { createSong } from "commons/js/song";
export default {
  data() {
    return {
      songs: [],
      desc: ''
    };
  },
  computed: {
    title() {
      return this.topList.topTitle;
    },
    bgStyle() {
      return `background-image:url(${this.topList.picUrl})`;
    },
    bgImage() {
      return this.topList.picUrl
    },
    listennum() {
      let num = this.topList.listenCount;
      try {
        if (num.toString().length > 5) {
          return "播放量: " + ((num / 10000) | 0) + "万次";
        } else {
          return "播放量: " + num + "次";
        }
      } catch (error) {
        return "播放量: " + 0 + "次";
      }
    },
    ...mapGetters(["topList"])
  },
  created() {
    this._getDetail();
  },
  methods: {
    _getDetail() {
      if (!this.topList.id) {
        this.$router.push("/rank");
        return;
      }
      getTopList_F(this.topList.id).then(res => {
        if (res.code === ERR_OK) {
          this.desc = res.topinfo.info
          this.songs = this._normalizeSong(res.songlist);
        }
      });
    },
    _normalizeSong(list) {
      let ret = [];
      list.forEach(item => {
        const musicData = item.data;
        if (musicData.songid && musicData.albumid) {
          getMusic(musicData.songmid).then(res => {
            if (res.code === ERR_OK) {
              const svkey = res.data.items;
              const songVkey = svkey[0].vkey;
              ret.push(createSong(musicData, songVkey));
            }
          });
        }
      });
      return ret;
    }
  },
  components: {
    MusicList
  }
};
</script>

<style lang="scss" scoped>
@import "commons/style/variable.scss";
@import "commons/style/mixin.scss";
.slide-enter-active,
.slide-leave-active {
  transition: all 0.3s ease;
}
.slide-enter,
.slide-leave-to {
  transform: translate3d(100%, 0, 0);
}
.music-list {
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
      line-height: 32px;
      font-size: $font-size-large;
      color: $color-text;
    }
    .fans {
      line-height: 12px;
      font-size: $font-size-small;
      margin: 5px 0;
    }
    .desc {
      font-size: $font-size-small;
      @include ellipsis(2);
      line-height: 1.3em;
    }
  }
}
</style>
