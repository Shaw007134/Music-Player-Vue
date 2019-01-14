<template>
  <div class="music-list">
    <div class="back">
      <i class="icon-back"></i>
    </div>
    <h1 class="title"></h1>
    <div class="bg-image">
      <div class="filter"></div>
    </div>
  </div>
</template>

<script>
export default {
  
}
</script>

<style lang="scss" scoped>
@import 'commons/style/variable.scss';
@import 'commons/style/mixin.scss';

.music-list {
  position: fixed;
  z-index: 100;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: $color-background;
  font-size: 0;
  .back-btn {
    position: absolute;
    top: 0;
    left: 6px;
    z-index: 50;
    .icon-back {
      display: block;
      padding: 10px;
      font-size: $font-size-large-x;
      color: $color-theme;
    }
  }
  .list-title {
    position: absolute;
    top: 0;
    left: 10%;
    z-index: 40;
    width: 80%;
    @include ellipsis();
    text-align: center;
    line-height: 40px;
    font-size: $font-size-large;
    color: $color-text;
  }
  .bg-image {
    position: relative;
    padding-top: 70%;
    transform: scale(1);
    z-index: 0;
    height: 0;
    width: 100%;
    transform-origin: top; // 更改变形原点
    background-size: cover;
    .play-wrapper {
      position: absolute;
      bottom: 20px;
      z-index: 50;
      width: 100%;
      .play-btn {
        box-sizing: border-box;
        width: 135px;
        padding: 7px 0;
        margin: 0 auto;
        text-align: center;
        border: 1px solid $color-theme;
        color: $color-theme;
        border-radius: 100px;
        .icon-play, .play-content {
          display: inline-block;
          vertical-align: middle;
        }
        .icon-play {
          margin-right: 6px;
          font-size: $font-size-medium-x;
        }
        .play-content {
          font-size: $font-size-small;
        }
      }
    }
    .filter {
      position: absolute;
      top: 0;
      left: 0;
      bottom: 0;
      right: 0;
      background-color: rgba(7, 17, 27, 0.4);
    }
  }
  .bg-layer {
    position: relative;
    height: 100%;
    background-color: $color-background;
  }
  .songs-list-wrapper {
    position: fixed;
    bottom: 0; // top 在 mounted 钩子实现
    width: 100%;
    // overflow: hidden; // 设置 title 的 z-index 来实现相同效果
    .loading-wrapper {
      position: absolute;
      top: 50%;
      transform: translateY(-50%);
      width: 100%;
    }
  }
}
</style>

