<template>
  <transition name="slide">
    <music-list :songs="songs" >
    </music-list>
      
  </transition>
</template>

<script>
import {mapGetters,mapMutations} from 'vuex' 
import {getSingerDetail} from 'api/singer'
import {createSong,getMusic} from 'commons/js/song'
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
  },
  components: {
    MusicList
  }
}
</script>

<style lang="scss" scoped>
@import "commons/style/variable.scss";


.slide-enter-active, .slide-leave-active{
  transition: all 0.3s;
}
.slide-enter, .slide-leave-to{
  transform: translate3d(100%, 0, 0)
}

</style>
