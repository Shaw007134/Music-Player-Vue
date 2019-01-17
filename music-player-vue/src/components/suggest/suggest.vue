<template>
  <div class="suggest">
    <ul class="suggest-list">
      <li class="suggest-item" v-show="singer" v-for="item in singer" :key="item.id">
        <div class="icon">
          <i :class="getIconCls(item)"></i>
        </div>
        <div class="name">
          <p class="text" v-html="getDisplayName(item)"></p>
        </div>
      </li>
      <li class="suggest-item" v-show="songs" v-for="item in songs" :key="item.id">
        <div class="icon">
          <i :class="getIconCls(item)"></i>
        </div>
        <div class="name">
          <p class="text" v-html="getDisplayName(item)"></p>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
import { search } from "api/search";
import { ERR_OK } from "api/config";
import { createSong } from "commons/js/song";
import { getMusic } from "api/song";

const TYPE_SINGER = "singer";
export default {
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
      singer: [],
      songs: []
    };
  },
  computed: {},
  methods: {
    search() {
      search(this.query, this.page, this.showSinger, 20).then(res => {
        if (res.code === ERR_OK) {
          console.log(res.data);
          this.singer = this._getResult(res.data);
          this.songs = this._normalizeSongs(res.data.song.list)
          console.log(this.songs)
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
    _getResult(data) {
      let ret = [];
      if (data.zhida && data.zhida.singerid) {
        ret.push({ ...data.zhida, ...{ type: TYPE_SINGER } });
      }
      return ret;
    },
    _normalizeSongs(list) {
      let ret = [];
      list.forEach(musicData => {
        if (musicData.songid && musicData.albumid) {
          getMusic(musicData.songmid).then(res => {
            if (res.code === ERR_OK) {
              const svkey = res.data.items;
              const songVkey = svkey[0].vkey;
              ret.push(createSong(musicData, songVkey));
            }
          })
        }
      })
      return ret;
    }
  },
  watch: {
    query() {
      this.search();
    }
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

