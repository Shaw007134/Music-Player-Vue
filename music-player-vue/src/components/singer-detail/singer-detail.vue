<template>
  <transition name="slide">
    <div class="singer-detail">
      
    </div>
  </transition>
</template>

<script>
import {mapGetters} from 'vuex' 
import {getSingerDetail} from 'api/singer'
import {createSong,getMusic} from 'commons/js/song'
import {ERR_OK} from 'api/config'
export default {
  computed: {
    data() {
      return {
        songs: []
      }
    },
    //通过mapGetters将数据扩展到computed计算属性中
    ...mapGetters([
      //数组内设置映射，映射属性到对应的getter，返回对应的计算值
      //相当于在Vue实例中挂载了一个叫singer的属性,实例中可使用该属性
      'singer'
    ])
  },
  created() {
    this._getDetail()
  },
  methods: {
    _getDetail() {
      if(!this.singer.id) {
        this.$router.push('/singer')
        return
      }
      getSingerDetail(this.singer.id).then((res) => {
        if(res.code === ERR_OK){
          this.songs = this._normalizeSongs(res.data.list)
          console.log(this.songs)
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
              //工厂方法，createSong返回new Song
              // console.log(songVkey)
              ret.push(createSong(musicData, songVkey))
              // console.log(ret)
            }
          })
        }
      })
      return ret
    }
  }
}
</script>

<style lang="scss" scoped>
@import "commons/style/variable.scss";

.singer-detail {
  position: fixed;
  z-index: 100;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: $color-background;
}
.slide-enter-active, .slide-leave-active{
  transition: all 0.3s;
}
.slide-enter, .slide-leave-to{
  transform: translate3d(100%, 0, 0)
}

</style>
