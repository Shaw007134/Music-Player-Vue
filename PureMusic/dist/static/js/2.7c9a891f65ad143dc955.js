webpackJsonp([2],{"W1+L":function(e,t,i){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var s=i("Dd8w"),n=i.n(s),r=i("GQaK"),a=i("/1yU"),o={data:function(){return{dots:[],currentPageIndex:0}},props:{loop:{type:Boolean,default:!0},autoPlay:{type:Boolean,default:!0},interval:{type:Number,default:3e3}},mounted:function(){var e=this;setTimeout(function(){e._setSliderWidth(),e._initDots(),e._initSlider(),e.autoPlay&&e._play()},20),window.addEventListener("resize",function(){e.slider&&(e._setSliderWidth(!0),e.slider.refresh())})},methods:{_setSliderWidth:function(e){this.children=this.$refs.sliderGroup.children;for(var t=0,i=this.$refs.slider.clientWidth,s=0;s<this.children.length;s++){var n=this.children[s];Object(a.a)(n,"slider-item"),n.style.width=i+"px",t+=i}this.loop&&!e&&(t+=2*i),this.$refs.sliderGroup.style.width=t+"px"},_initDots:function(){this.dots=new Array(this.children.length)},_initSlider:function(){var e=this;this.slider=new r.a(this.$refs.slider,{scrollX:!0,scrollY:!1,momentum:!1,snap:{loop:this.loop,threshold:.3,speed:400},click:!0}),this.slider.on("scrollEnd",function(){var t=e.slider.getCurrentPage().pageX;e.currentPageIndex=t,e.autoPlay&&(clearTimeout(e.timer),e._play())})},_play:function(){var e=this;this.timer=setTimeout(function(){e.slider.next()},this.interval)}},destroyed:function(){clearTimeout(this.timer)}},l={render:function(){var e=this,t=e.$createElement,i=e._self._c||t;return i("div",{ref:"slider",staticClass:"slider"},[i("div",{ref:"sliderGroup",staticClass:"slider-group"},[e._t("default")],2),e._v(" "),i("div",{staticClass:"dots"},e._l(e.dots,function(t,s){return i("span",{staticClass:"dot",class:{active:e.currentPageIndex===s}})}),0)])},staticRenderFns:[]};var d=i("VU/8")(o,l,!1,function(e){i("loq2")},"data-v-1f6a0a8e",null).exports,c=i("qwAB"),u=i("y/jF"),h=i("//Fk"),m=i.n(h),f=i("woOf"),v=i.n(f),p=i("eGN8"),_=i("T452"),g=i("mtWM"),y=i.n(g);var w=i("pU8y"),C=i("NYxO"),L={mixins:[w.b],data:function(){return{recommends:[],discList:[]}},created:function(){this._getRecommend(),this._getDiscList()},methods:n()({handlePlaylist:function(e){var t=e.length>0?"60px":"";this.$refs.recommend.style.bottom=t,this.$refs.scroll.refresh()},selectItem:function(e){this.$router.push({path:"/recommend/"+e.dissid}),this.setDisc(e)},_getRecommend:function(){var e,t=this;(e=v()({},_.m,{platform:"h5",uin:0,needNewCode:1}),Object(p.a)(_.i,e,_.n)).then(function(e){e.code===_.c&&(t.recommends=e.data.slider)})},_getDiscList:function(){var e,t=this;(e=v()({},_.m,{platform:"yqq",hostUin:0,sin:0,ein:29,sortId:5,categoryId:1e7,needNewCode:0,rnd:Math.random(),format:"json"}),y.a.get(_.b,{params:e}).then(function(e){return m.a.resolve(e.data)})).then(function(e){e.code===_.c&&(t.discList=e.data.list,console.log(t.discList))})},loadImage:function(){this.checkLoaded||(this.$refs.scroll.refresh(),this.checkLoaded=!0)}},Object(C.d)({setDisc:"SET_DISC"})),components:{Slider:d,Scroll:c.a,Loading:u.a}},x={render:function(){var e=this,t=e.$createElement,i=e._self._c||t;return i("div",{ref:"recommend",staticClass:"recommend"},[i("scroll",{ref:"scroll",staticClass:"recommend-content",attrs:{data:e.discList}},[i("div",[e.recommends.length?i("div",{staticClass:"slider-wrapper"},[i("slider",e._l(e.recommends,function(t){return i("div",{key:t.key},[i("a",{attrs:{href:t.linkUrl}},[i("img",{attrs:{src:t.picUrl},on:{load:e.loadImage}})])])}),0)],1):e._e(),e._v(" "),i("div",{staticClass:"recommend-list"},[i("h1",{staticClass:"list-title"},[e._v("热门歌单推荐")]),e._v(" "),i("ul",e._l(e.discList,function(t){return i("li",{key:t.key,staticClass:"item",on:{click:function(i){e.selectItem(t)}}},[i("div",{staticClass:"icon"},[i("img",{directives:[{name:"lazy",rawName:"v-lazy",value:t.imgurl,expression:"item.imgurl"}],attrs:{height:"60",width:"60"}})]),e._v(" "),i("div",{staticClass:"text"},[i("h2",{staticClass:"name",domProps:{innerHTML:e._s(t.dissname)}}),e._v(" "),i("p",{staticClass:"desc",domProps:{innerHTML:e._s(t.creator.name)}})])])}),0)])]),e._v(" "),i("div",{directives:[{name:"show",rawName:"v-show",value:!e.discList.length,expression:"!discList.length"}],staticClass:"loading-container"},[i("loading")],1),e._v(" "),i("router-view")],1)],1)},staticRenderFns:[]};var k=i("VU/8")(L,x,!1,function(e){i("gNcv")},"data-v-7e4bfc1c",null);t.default=k.exports},gNcv:function(e,t){},loq2:function(e,t){}});
//# sourceMappingURL=2.7c9a891f65ad143dc955.js.map