<template>
  <div>
    歌手页面
  </div>
</template>

<script>
import {getSingerList} from 'api/singer';
import {ERR_OK} from 'api/config';
import Singer from 'commons/js/singer';
const HOT_NAME = '热门'
const HOT_SINGER_LEN = 10
export default {
  data() {
    return {
      singers: []
    }
  },
  created() {
    this._getSingerList()
  },
  methods: {
    _getSingerList() {
      getSingerList().then((res) => {
        if(res.code === ERR_OK){
          this.singers = res.data.list;
          console.log(this._normalizeSinger(this.singers))
        }
      })
    },
    _normalizeSinger(list) {
      let map = {
        hot: {
          title: HOT_NAME,
          items: []
        }
      }
      list.forEach((item, index) => {
        if (index < HOT_SINGER_LEN) {
          map.hot.items.push(new Singer({
            id: item.Fsinger_mid,
            name: item.Fsinger_name,
          }))
        }
        const key = item.Findex
        if (!map[key]) {
          map[key] = {
            title: key,
            items: []
          }
        }
        map[key].items.push(new Singer({
          id: item.Fsinger_mid,
          name: item.Fsinger_name,
        }))
      })
      // 对象的遍历是无序的，需处理map
      let hot = []
      let ret = []
      let other = []
      console.log(map)
      for (let key in map) {
        let val = map[key]
        if (val.title.match(/[a-zA-Z]/)){
          ret.push(val)
        } else if (val.title === HOT_NAME) {
          hot.push(val)
        }else {
          val.title = '#' // 将非 hot 和 非字母开头的 title 转换为统一符号'#'
          other.push(val)
        }
        ret.sort((a,b) => {
          return a.title.charCodeAt(0) - b.title.charCodeAt(0)
        })
      }
      return hot.concat(ret).concat(other)
    }
  }
}
</script>

<style lang="scss" scoped>
  .artist {
    position: fixed;
    top: 88px;
    bottom: 0;
    width: 100%;
  }
</style>