<template>
  <transition name="slide">
    <music-list :songs="songs" :bgStyle="bgStyle">
      <div class="album" v-show="songs.length" ref="album">
        <div class="avatar">
          <img :src="avatar">
        </div>
        <div class="info">
          <h1 class="name" v-html="name"></h1>
          <div class="fans">{{fans}}</div>
          <div class="desc" v-html="desc"></div>
        </div>
      </div>
    </music-list>
      
  </transition>
</template>

<script>
import {mapGetters,mapMutations} from 'vuex' 
import {getSingerDetail} from 'api/singer'
import {createSong} from 'commons/js/song'
import {getMusic} from 'api/song'
import {ERR_OK} from 'api/config'
import MusicList from 'components/music-list/music-list'

export default {
  data() {
      return {
        songs: [],
      }
    },
  computed: {
    //通过mapGetters将数据扩展到computed计算属性中
    ...mapGetters([
      //数组内设置映射，映射属性到对应的getter，返回对应的计算值
      //相当于在Vue实例中挂载了一个叫singer的属性,实例中可使用该属性
      'singer'
    ]),
    name() {
      return this.singer.name;
    },
    fans() {
      let num = this.singer.fans;
      try {
        if (num.toString().length > 5) {
          return "粉丝: " + (num / 10000 | 0) + "万人"
        }else {
          return "粉丝: " + num + "人"
        }
      } catch (error) {
          return "粉丝: " + 0 + "人"
      }
    },
    desc() {
      return this.singer.desc;
    },
    avatar() {
      return this.singer.avatar;
    },
    bgStyle() {
      return `background-image:url(${this.singer.avatar})`;
    },
  },
  created() {
    this._getDetail()
  },
  methods: {
    ...mapMutations({
      updateSinger: 'UPDATE_SINGER'
    }),
    _getDetail() {
      if(!this.singer.id) {
        this.$router.push('/singer')
        return
      }
      getSingerDetail(this.singer.id).then((res) => {
        if(res.code === ERR_OK){
          let objs = {
            desc: res.data.SingerDesc,
            fans: res.data.fans
          }
          this.updateSinger(objs)
          this.songs = this._normalizeSongs(res.data.list)
        }
      })
    },
    _normalizeSongs(list) {
      let ret = []
      list.forEach((item) => {
        let {musicData} = item
        //判断
        if(musicData.songid && musicData.albummid) {
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
    },
  },
  components: {
    MusicList
  }
}
</script>

<style lang="scss" scoped>
@import "commons/style/variable.scss";
@import "commons/style/mixin.scss";


.slide-enter-active, .slide-leave-active{
  transition: all 0.3s;
}
.slide-enter, .slide-leave-to{
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
