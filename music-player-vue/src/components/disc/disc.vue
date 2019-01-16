<template>
  <transition name="slide">
    <music-list :style="bgStyle" :songs="songs">
      <div class="album" ref="album">
        <div class="avatar">
          <img :src="bgImage">
        </div>
        <div class="info">
          <h1 class="name" v-html="title"></h1>
          <div class="fans" v-html="listennum"></div>
          <!-- <div class="desc" v-html="desc"></div> -->
        </div>
      </div>
    </music-list>
  </transition>
</template>

<script>
import MusicList from 'components/music-list/music-list'
import {mapGetters} from 'vuex'
import {getDiscInfo} from 'api/disc'
import {ERR_OK} from 'api/config'
import {createSong} from 'commons/js/song'
import {getMusic} from 'api/song'
export default {
  data() {
    return {
      songs: [],
    }
  },
  created() {
    this._getDetail()
  },
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
    listennum() {
      let num = this.disc.listennum
      try {
        if (num.toString().length > 5) {
          return "播放量: " + (num / 10000 | 0) + "万次"
        }else {
          return "播放量: " + num + "次"
        }
      } catch (error) {
          return "播放量: " + 0 + "次"
      }
    },
    ...mapGetters([
      'disc'
    ])
  },
  methods: {
    _getDetail() {
      let id = this.disc.dissid
      if(!id) {
        this.$router.back()
        return
      }
      getDiscInfo(id).then((res) => {
        if(res.code === ERR_OK){
          console.log(res.cdlist[0].songlist)
          this.songs = this._normalizeSongs(res.cdlist[0].songlist)
          console.log(this.songs)
        }
      })
    },
    _normalizeSongs(list) {
      let ret = []
      list.forEach((musicData) => {
        if(musicData.songmid) {
          getMusic(musicData.songmid).then((res)=>{
            if(res.code === ERR_OK) {
              const svkey = res.data.items
              const songVkey = svkey[0].vkey
              ret.push(createSong(musicData, songVkey))
            }
          })
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
 .slide-enter-active, .slide-leave-active {
   transition: all 0.3s;
 }
 .slide-enter, .slide-leave-to {
   transform: translate3d(100%, 0, 0)
 }
 .music-list {
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
 }
</style>


