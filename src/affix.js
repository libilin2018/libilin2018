!function(r){"use strict";var c=function(t,i){this.options=r.extend({},c.DEFAULTS,i),this.$target=r(this.options.target).on("scroll.bs.affix.data-api",r.proxy(this.checkPosition,this)).on("click.bs.affix.data-api",r.proxy(this.checkPositionWithEventLoop,this)),this.$element=r(t),this.affixed=null,this.unpin=null,this.pinnedOffset=null,this.checkPosition()};function e(s){return this.each(function(){var t=r(this),i=t.data("bs.affix"),e="object"==typeof s&&s;i||t.data("bs.affix",i=new c(this,e)),"string"==typeof s&&i[s]()})}c.VERSION="3.3.5",c.RESET="affix affix-top affix-bottom",c.DEFAULTS={offset:0,target:window},c.prototype.getState=function(t,i,e,s){var o=this.$target.scrollTop(),n=this.$element.offset(),a=this.$target.height();if(null!=e&&"top"==this.affixed)return o<e&&"top";if("bottom"==this.affixed)return null!=e?!(o+this.unpin<=n.top)&&"bottom":!(o+a<=t-s)&&"bottom";var l=null==this.affixed,r=l?o:n.top;return null!=e&&o<=e?"top":null!=s&&t-s<=r+(l?a:i)&&"bottom"},c.prototype.getPinnedOffset=function(){if(this.pinnedOffset)return this.pinnedOffset;this.$element.removeClass(c.RESET).addClass("affix");var t=this.$target.scrollTop(),i=this.$element.offset();return this.pinnedOffset=i.top-t},c.prototype.checkPositionWithEventLoop=function(){setTimeout(r.proxy(this.checkPosition,this),1)},c.prototype.checkPosition=function(){if(this.$element.is(":visible")){var t=this.$element.height(),i=this.options.offset,e=i.top,s=i.bottom,o=Math.max(r(document).height(),r(document.body).height());"object"!=typeof i&&(s=e=i),"function"==typeof e&&(e=i.top(this.$element)),"function"==typeof s&&(s=i.bottom(this.$element));var n=this.getState(o,t,e,s);if(this.affixed!=n){null!=this.unpin&&this.$element.css("top","");var a="affix"+(n?"-"+n:""),l=r.Event(a+".bs.affix");if(this.$element.trigger(l),l.isDefaultPrevented())return;this.affixed=n,this.unpin="bottom"==n?this.getPinnedOffset():null,this.$element.removeClass(c.RESET).addClass(a).trigger(a.replace("affix","affixed")+".bs.affix")}"bottom"==n&&this.$element.offset({top:o-t-s})}};var t=r.fn.affix;r.fn.affix=e,r.fn.affix.Constructor=c,r.fn.affix.noConflict=function(){return r.fn.affix=t,this},r(window).on("load",function(){r('[data-spy="affix"]').each(function(){var t=r(this),i=t.data();i.offset=i.offset||{},null!=i.offsetBottom&&(i.offset.bottom=i.offsetBottom),null!=i.offsetTop&&(i.offset.top=i.offsetTop),e.call(t,i)})})}(jQuery),function(){var a=[],l=[],r=[],c=0,f=0;function u(){var t=$("audio")[0];if(t.paused){$(".music-player-control").css("background","url(/upload/load.png) 0% 0% / cover"),t.play();var i=20*(c-f)-5+"px";$(".music-player-control").css("background","url(/upload/pause.png) 0% 0% / cover"),$(".my-music_list-current").css("visibility","visible"),$(".my-music_list-current").css("top",i)}else t.pause(),$(".music-player-control").css("background","url(/upload/play.png) 0% 0% / cover"),$(".my-music_list-current").css("visibility","hidden")}function p(){f=Math.floor(Math.random()*(a.length-4)),c=f;var t=$(".my-music_list"),i="",e="url("+a[f].pic+") 0% 0% / cover",s=r.slice(f,f+4).join(",");$(".music-player_logo").css("background",e),$(".music-player_txt").html(a[f].name);for(var o=f;o<f+4;o++){var n=a[o];i+=o===f?"<li class='current-play' data-index="+o+" data-id="+n.id+">"+n.name+"</li>":"<li data-index="+o+" data-id="+n.id+">"+n.name+"</li>"}$(".my-music_list li").remove(),t.append(i),$.ajax({url:"https://music.sharelab.club/song/url?id="+s,type:"GET",success:function(t){t=t.data;for(var i=0;i<t.length;i++)l.push(t[i]);l=function(t,i){for(var e=[],s=0;s<4;s++)for(var o=i[s],n=0;n<4;n++)o==t[n].id&&e.push(t[n].url);return e}(l,s.split(",")),$("audio")[0].src=l[0]}}),$("audio").bind("ended",function(){if(c<f+3){$(".my-music_list li")[c-f].className="",c++,$(".my-music_list li")[c-f].className="current-play",$("audio")[0].src=l[c-f];var t="url("+a[c].pic+") 0% 0% / cover";$(".music-player_logo").css("background",t),$(".music-player_txt").html(a[c].name),u()}else this.load(),$(".my-music_list-current").css("visibility","hidden"),$(".music-player-control").css("background","url(/upload/play.png) 0% 0% / cover")}),$(".reflash-music").click(function(){p()}),$(".music-player-control").click(function(){u()}),$(".my-music_list li").click(function(){$(".my-music_list li")[c-f].className="",c=this.dataset.index,$(".my-music_list li")[c-f].className="current-play";var t="url("+a[c].pic+") 0% 0% / cover";$(".music-player_logo").css("background",t),$(".music-player_txt").html(a[c].name),$("audio")[0].src=l[c-f],u()})}$.ajax({url:"https://music.sharelab.club/user/record?uid=567470691&type=1",type:"GET",success:function(t){if(200===t.code){t=t.weekData;for(var i=0;i<t.length;i++){var e={};e.name=t[i].song.name+" - "+t[i].song.ar[0].name,e.id=t[i].song.id,e.pic=t[i].song.al.picUrl,a.push(e),r.push(t[i].song.id)}}p()},error:function(t){}})}($);