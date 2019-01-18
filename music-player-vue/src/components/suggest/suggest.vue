<template>
  <scroll class="suggest" ref="suggest" :data="result" :pullup="pullup" @scrollToEnd="searchMore">
    <ul class="suggest-list">
      <li class="suggest-item" @click=selectItem(item) v-show="result" v-for="item in result" :key="item.id">
        <div class="icon">
          <i :class="getIconCls(item)"></i>
        </div>
        <div class="name">
          <p class="text" v-html="getDisplayName(item)"></p>
        </div>
      </li>
      <loading v-show="hasMore" title=""></loading>
    </ul>
    <div v-show="!hasMore &&!result.length" class="no-result-wrapper">
      <no-result title="抱歉，暂无搜索结果"></no-result>
    </div>
  </scroll>
</template>

<script>
import { search } from "api/search";
import { ERR_OK } from "api/config";
import { createSong } from "commons/js/song";
import Scroll from "base/scroll/scroll";
import { playlistMixin } from "commons/js/mixin";
import Loading from 'base/loading/loading'
import Singer from 'commons/js/singer'
import { mapMutations,mapActions } from 'vuex';
import NoResult from 'base/no-result/no-result'
const TYPE_SINGER = "singer";
const perpage = 20;
export default {
  mixins: [playlistMixin],
  props: {
    query: {
      type: String,
      default: ""
    },
    showSinger: {
      type: Boolean,
      default: true
    }
  },
  data() {
    return {
      page: 1,
      result: [],
      pullup: true,
      hasMore: true
    };
  },
  computed: {},
  methods: {
    handlePlaylist(playlist) {
      console.log(playlist.length)
      //这里更改好像无效？
      const bottom = playlist.length > 0 ? "120px" : "";
      this.$refs.suggest.$el.style.bottom = bottom;
      this.$refs.suggest.refresh();
    },
    search() {
      this.hasMore = true;
      this.page = 1
      this.$refs.suggest.scrollTo(0,0)
      search(this.query, this.page, this.showSinger, perpage).then(res => {
        if (res.code === ERR_OK) {
          console.log(res.data);
          this.result = this._getResult(res.data);
          this._checkMore(res.data);
        }
      });
    },
    searchMore() {
      if (!this.hasMore) {
        return;
      }
      this.page++;
      search(this.query, this.page, this.showSinger, perpage).then(res => {
        if (res.code === ERR_OK) {
          console.log(res.data);
          this.result = this.result.concat(this._getResult(res.data));
          this._checkMore(res.data);
        }
      });
    },
    getIconCls(item) {
      if (item.type === TYPE_SINGER) {
        return "icon-mine";
      } else {
        return "icon-music";
      }
    },
    getDisplayName(item) {
      if (item.type === TYPE_SINGER) {
        return item.singername;
      } else {
        return `${item.name} - ${item.singer}`;
      }
    },
    selectItem(item) {
      if (item.type === TYPE_SINGER) {
        const singer = new Singer({
          id: item.singermid,
          name: item.singername
        })
        this.$router.push({
          path: '/search/${singer.id}'
        })
        this.setSinger(singer)
      } else {
        console.log(item)
        this.insertSong(item)
      }
    },
    _checkMore(data) {
      const song = data.song;
      if (this.curr_num != song.cur_num) this.curr_num = song.cur_num;
      if (
        !song.list.length ||
        song.curnum + song.curpage * perpage >= song.totalnum
      ) {
        this.hasMore = false;
      }
    },
    _getResult(data) {
      let ret = [];
      if (this.page === 1 && data.zhida && data.zhida.singerid) {
        ret.push({ ...data.zhida, ...{ type: TYPE_SINGER } });
      }
      if (data.song) ret = ret.concat(this._normalizeSongs(data.song.list));
      return ret;
    },
    _normalizeSongs(list) {
      let ret = [];
      list.forEach(musicData => {
        if (musicData.songid && musicData.albumid) {
          ret.push(createSong(musicData));
        }
      });
      return ret;
    },
    ...mapMutations({
      setSinger: 'SET_SINGER'
    }),
    ...mapActions([
      'insertSong'
    ])
  },
  watch: {
    query() {
      this.search();
    }
  },
  components: {
    Scroll,
    Loading,
    NoResult
  }
};
</script>

<style lang="scss" scoped>
@import "commons/style/variable.scss";
@import "commons/style/mixin.scss";

.suggest {
  height: 100%;
  overflow: hidden;
  .suggest-list {
    padding: 0 30px;
    .suggest-item {
      display: flex;
      align-items: center;
      padding-bottom: 20px;
    }
    .icon {
      flex: 0 0 30px;
      width: 30px;
      [class^="icon-"] {
        font-size: 14px;
        color: $color-text-d;
      }
    }
    .name {
      flex: 1;
      font-size: $font-size-medium;
      color: $color-text-d;
      overflow: hidden;
      .text {
        padding: 2px 0;
        @include ellipsis();
      }
    }
  }
  .no-result-wrapper {
    position: absolute;
    width: 100%;
    top: 50%;
    transform: translateY(-50%);
  }
}
</style>

