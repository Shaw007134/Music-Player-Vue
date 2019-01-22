<template>
  <transition name="slide">
    <music-list :songs="songs" :bgStyle="bgStyle">
      <div class="avatar">
        <img :src="bgImage">
      </div>
      <div class="info">
        <h1 class="name" v-html="title"></h1>
        <div class="creator">
          <img :src="avatar.img" alt>
          <p v-html="avatar.name"></p>
        </div>
        <div class="fans">{{listennum}}</div>
        <div class="desc" v-html="desc"></div>
      </div>
    </music-list>
  </transition>
</template>

<script>
import MusicList from 'components/music-list/music-list'
import { mapGetters } from 'vuex'
import { getDiscInfo } from 'api/disc'
import { ERR_OK } from 'api/config'
import { createSong } from 'commons/js/song'
export default {
  data() {
    return {
      songs: [],
      avatar: {},
      desc: ''
    }
  },
  computed: {
    title() {
      return this.disc.dissname
    },
    bgImage() {
      return this.disc.imgurl
    },
    bgStyle() {
      return `
      background-image:url(${this.disc.imgurl});
      `
    },
    listennum() {
      let num = this.disc.listennum
      try {
        if (num.toString().length > 5) {
          return '播放量: ' + ((num / 10000) | 0) + '万次'
        } else {
          return '播放量: ' + num + '次'
        }
      } catch (error) {
        return '播放量: ' + 0 + '次'
      }
    },
    ...mapGetters(['disc'])
  },
  created() {
    this._getDetail()
  },
  methods: {
    _getDetail() {
      let id = this.disc.dissid
      if (!id) {
        this.$router.back()
        return
      }
      getDiscInfo(id).then(res => {
        if (res.code === ERR_OK) {
          let cd = res.cdlist[0]
          this.desc = cd.desc
          this.avatar.img = cd.headurl
          this.avatar.name = cd.nickname
          // setTimeout(() => {
          this.songs = this._normalizeSongs(cd.songlist)
          // }, 300);
        }
      })
    },
    _normalizeSongs(list) {
      let ret = []
      list.forEach(musicData => {
        if (musicData.songmid && musicData.albummid) {
          ret.push(createSong(musicData))
        }
      })
      return ret
    }
  },
  components: {
    MusicList
  }
}
</script>

<style lang="scss" scoped>
@import "commons/style/variable.scss";
@import "commons/style/mixin.scss";
.slide-enter-active,
.slide-leave-active {
  transition: all 0.3s linear;
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
    // @include ellipsis();
    .name {
      line-height: 32px;
      font-size: $font-size-large;
      color: $color-text;
      @include ellipsis(1);
    }
    .creator {
      display: flex;
      align-items: center;
      padding: 5px 0;
      img {
        width: 25px;
        height: 25px;
        border-radius: 50%;
        margin-right: 6px;
        vertical-align: top;
      }
      p {
        flex: 1;
        font-size: $font-size-medium;
      }
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
