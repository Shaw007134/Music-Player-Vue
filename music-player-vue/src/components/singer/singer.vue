<template>
  <div class="singer">
    <list-view @select="selectSinger" :data="singers"></list-view>
    <router-view></router-view>
  </div>
</template>

<script>
import {getSingerList} from 'api/singer';
import {ERR_OK} from 'api/config';
import Singer from 'commons/js/singer';
import ListView from 'base/listview/listview';
import {mapMutations} from 'vuex';

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
    selectSinger(singer) {
      this.$router.push({
        path: `/singer/${singer.id}`
      })
      this.setSinger(singer)
      //通过action传入payload实现mutation的提交
      //实际调用了this.$store.commit('SET_SINGER') 
      //执行了mutations中的SET_SINGER函数
    },
    _getSingerList() {
      getSingerList().then((res) => {
        if(res.code === ERR_OK){
          console.log(res.data.list)
          this.singers = this._normalizeSinger(res.data.list);
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
    },
    //扩展运算符调用mapMutations,做一个对象映射，将方法与常量名映射起来
    //然后通过...将此对象混入到methods对象中
    ...mapMutations({
      setSinger: 'SET_SINGER'
      // 将 `this.setSinger()` 映射为 `this.$store.commit('SET_SINGER')`
      // 可以在组件中使用 this.$store.commit('xxx') 提交 mutation，或者使用 mapMutations 辅助函数将组件中的 methods 映射为 store.commit 调用（需要在根节点注入 store）
    })
  },
  components: {
    ListView
  }
}
</script>

<style lang="scss" scoped>
  .singer {
    position: fixed;
    top: 88px;
    bottom: 0;
    width: 100%;
  }
</style>