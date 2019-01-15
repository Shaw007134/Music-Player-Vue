<template>
  <div class="song-list">
    <ul>
      <li v-for="(song,index) in songs" 
          class="item" 
          :key=song.key
          @click="selectItem(song,index)"
      >
        <div class="content">
          <h2 class="name">{{song.name}}</h2>
          <p class="desc">{{getDesc(song)}}</p>
          <!-- 这里也可以使用filter -->
        </div>

      </li>
    </ul>
  </div>
</template>


<script>
export default {
  props: {
    songs: {
      type: Array,
      default:[]
    },
  },
  methods: {
    getDesc(song){
      return `${song.singer}·${song.album}`
    },
    selectItem(item, index){
      this.$emit('select', item, index)
    }
    //基础组件，不写复杂业务逻辑，仅仅派发事件
  },
}
</script>



<style lang="scss" scoped>
@import "commons/style/variable.scss";
@import "commons/style/mixin.scss";

.song-list {
  .item {
    display: flex;
    align-items: center;
    box-sizing: border-box;
    height: 64px;
    font-size: $font-size-medium;
    .rank {
      flex: 0 0 25px;
      width: 25px;
      margin-right: 30px;
      text-align: center;
      .icon {
        display: inline-block;
        width: 25px;
        height: 24px;
        background-size: 25px 24px;
        &.icon0 {
          @include bg-image('first');
        }
        &.icon1 {
          @include bg-image('second');
        }
        &.icon2 {
          @include bg-image('third');
        }
      }
      .text {
        color: $color-theme;
        font-size: $font-size-large;
      }
    }
    .content {
      flex: 1;
      line-height: 20px;
      overflow: hidden;
      .name {
        @include ellipsis();
        color: $color-text;
      }
      .desc {
        @include ellipsis();
        margin-top: 4px;
        color: $color-text-d;
      }
    }
  }
}

</style>
