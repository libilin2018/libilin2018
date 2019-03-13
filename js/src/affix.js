/* ========================================================================
 * Bootstrap: affix.js v3.3.5
 * http://getbootstrap.com/javascript/#affix
 * ========================================================================
 * Copyright 2011-2015 Twitter, Inc.
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
 * ======================================================================== */

+function ($) {
  'use strict';

  // AFFIX CLASS DEFINITION
  // ======================

  var Affix = function (element, options) {
    this.options = $.extend({}, Affix.DEFAULTS, options)

    this.$target = $(this.options.target)
      .on('scroll.bs.affix.data-api', $.proxy(this.checkPosition, this))
      .on('click.bs.affix.data-api',  $.proxy(this.checkPositionWithEventLoop, this))

    this.$element     = $(element)
    this.affixed      = null
    this.unpin        = null
    this.pinnedOffset = null

    this.checkPosition()
  }

  Affix.VERSION  = '3.3.5'

  Affix.RESET    = 'affix affix-top affix-bottom'

  Affix.DEFAULTS = {
    offset: 0,
    target: window
  }

  Affix.prototype.getState = function (scrollHeight, height, offsetTop, offsetBottom) {
    var scrollTop    = this.$target.scrollTop()
    var position     = this.$element.offset()
    var targetHeight = this.$target.height()

    if (offsetTop != null && this.affixed == 'top') return scrollTop < offsetTop ? 'top' : false

    if (this.affixed == 'bottom') {
      if (offsetTop != null) return (scrollTop + this.unpin <= position.top) ? false : 'bottom'
      return (scrollTop + targetHeight <= scrollHeight - offsetBottom) ? false : 'bottom'
    }

    var initializing   = this.affixed == null
    var colliderTop    = initializing ? scrollTop : position.top
    var colliderHeight = initializing ? targetHeight : height

    if (offsetTop != null && scrollTop <= offsetTop) return 'top'
    if (offsetBottom != null && (colliderTop + colliderHeight >= scrollHeight - offsetBottom)) return 'bottom'

    return false
  }

  Affix.prototype.getPinnedOffset = function () {
    if (this.pinnedOffset) return this.pinnedOffset
    this.$element.removeClass(Affix.RESET).addClass('affix')
    var scrollTop = this.$target.scrollTop()
    var position  = this.$element.offset()
    return (this.pinnedOffset = position.top - scrollTop)
  }

  Affix.prototype.checkPositionWithEventLoop = function () {
    setTimeout($.proxy(this.checkPosition, this), 1)
  }

  Affix.prototype.checkPosition = function () {
    if (!this.$element.is(':visible')) return

    var height       = this.$element.height()
    var offset       = this.options.offset
    var offsetTop    = offset.top
    var offsetBottom = offset.bottom
    var scrollHeight = Math.max($(document).height(), $(document.body).height())

    if (typeof offset != 'object')         offsetBottom = offsetTop = offset
    if (typeof offsetTop == 'function')    offsetTop    = offset.top(this.$element)
    if (typeof offsetBottom == 'function') offsetBottom = offset.bottom(this.$element)

    var affix = this.getState(scrollHeight, height, offsetTop, offsetBottom)

    if (this.affixed != affix) {
      if (this.unpin != null) this.$element.css('top', '')

      var affixType = 'affix' + (affix ? '-' + affix : '')
      var e         = $.Event(affixType + '.bs.affix')

      this.$element.trigger(e)

      if (e.isDefaultPrevented()) return

      this.affixed = affix
      this.unpin = affix == 'bottom' ? this.getPinnedOffset() : null

      this.$element
        .removeClass(Affix.RESET)
        .addClass(affixType)
        .trigger(affixType.replace('affix', 'affixed') + '.bs.affix')
    }

    if (affix == 'bottom') {
      this.$element.offset({
        top: scrollHeight - height - offsetBottom
      })
    }
  }


  // AFFIX PLUGIN DEFINITION
  // =======================

  function Plugin(option) {
    return this.each(function () {
      var $this   = $(this)
      var data    = $this.data('bs.affix')
      var options = typeof option == 'object' && option

      if (!data) $this.data('bs.affix', (data = new Affix(this, options)))
      if (typeof option == 'string') data[option]()
    })
  }

  var old = $.fn.affix

  $.fn.affix             = Plugin
  $.fn.affix.Constructor = Affix


  // AFFIX NO CONFLICT
  // =================

  $.fn.affix.noConflict = function () {
    $.fn.affix = old
    return this
  }


  // AFFIX DATA-API
  // ==============

  $(window).on('load', function () {
    $('[data-spy="affix"]').each(function () {
      var $spy = $(this)
      var data = $spy.data()

      data.offset = data.offset || {}

      if (data.offsetBottom != null) data.offset.bottom = data.offsetBottom
      if (data.offsetTop    != null) data.offset.top    = data.offsetTop

      Plugin.call($spy, data)
    })
  })

}(jQuery);


(function () {
 // 音乐播放器局部变量
  var allMusic = [],
      musicLis = [],
      ifPlay = false,
      ids = [],
      currentPlay = 0,
      ramdomCount = 0;

  // 
  getMusicData();


  function spyClick() {

    // 监听音乐结束
    $("audio").bind('ended', function() {
      if(currentPlay < ramdomCount + 3) {
        // 切换当前播放index
        $(".my-music_list li")[currentPlay - ramdomCount].className = "";
        currentPlay++;
        $(".my-music_list li")[currentPlay - ramdomCount].className = "current-play";
        $("audio")[0].src = musicLis[currentPlay - ramdomCount];

        // 切换播放器信息
        var img = "url(" + allMusic[currentPlay].pic + ") 0% 0% / cover";
        // console.log(img);
        $(".music-player_logo").css('background', img);
        $(".music-player_txt").html(allMusic[currentPlay].name);

        playMusic();
      } else {
        this.load();
        $(".my-music_list-current").css("visibility", "hidden");
        $(".music-player-control").css('background', "url(/upload/play.png) 0% 0% / cover");
      }
    })

    // 监听刷新点击
    $(".reflash-music").click(function () {
      showRamdomData();
    })

    // 监听播放器点击
    $(".music-player-control").click(function () {
      playMusic();
    })

    $(".my-music_list li").click(function () {
      // 切换当前播放index
      $(".my-music_list li")[currentPlay - ramdomCount].className = "";
      currentPlay = this.dataset.index;
      $(".my-music_list li")[currentPlay - ramdomCount].className = "current-play";

      // 切换播放器信息
      var img = "url(" + allMusic[currentPlay].pic + ") 0% 0% / cover";
      // console.log(img);
      $(".music-player_logo").css('background', img);
      $(".music-player_txt").html(allMusic[currentPlay].name);
      
      $("audio")[0].src = musicLis[currentPlay - ramdomCount];
      playMusic();

    })

  }

  function playMusic() {

    var audio= $("audio")[0];
    // console.log(audio.paused);
    if (audio.paused) {
      $(".music-player-control").css('background', "url(/upload/load.png) 0% 0% / cover");
      audio.play();
      var top = -5 + 20 * (currentPlay - ramdomCount) + 'px';
      $(".music-player-control").css('background', "url(/upload/pause.png) 0% 0% / cover");
      $(".my-music_list-current").css("visibility", "visible");
      $(".my-music_list-current").css("top", top);
    } else {
      audio.pause();
      $(".music-player-control").css('background', "url(/upload/play.png) 0% 0% / cover");
      $(".my-music_list-current").css("visibility", "hidden");
    }
  }

  function getMusicData() {

    $.ajax({
      url: "https://music.sharelab.club/user/record?uid=567470691&type=1",
      type: "GET",
      success: function (res) {
        if (res.code === 200) {
          res = res.weekData;
          for(var i=0; i<res.length; i++) {
            var obj = {};
            obj.name = res[i].song.name + " - " + res[i].song.ar[0].name;
            obj.id = res[i].song.id;
            obj.pic = res[i].song.al.picUrl;
            allMusic.push(obj);
            ids.push(res[i].song.id)
          }
          // console.log(allMusic, ids)
        }
        // console.log(ids)
        showRamdomData();
      },
      error: function(res) {
        // if(res.readyState === 0) {
        //   allMusic = defaultAllMusic, ids = defaultIds;
        //   showRamdomData();
        // }
      }

    })
  }

  function showRamdomData() {


    ramdomCount = Math.floor(Math.random() * (allMusic.length - 4));
    currentPlay = ramdomCount;
    // console.log(ramdomCount)

    var ul = $(".my-music_list"),
        newHtml = '',
        img = "url(" + allMusic[ramdomCount].pic + ") 0% 0% / cover";

    var musicIds = ids.slice(ramdomCount, ramdomCount+4).join(",");
    // console.log(musicIds)
    // 初始化
    $(".music-player_logo").css('background', img);
    $(".music-player_txt").html(allMusic[ramdomCount].name);

    for(var i=ramdomCount; i<ramdomCount+4; i++) {
      var cur = allMusic[i];
      if (i === ramdomCount) {
        newHtml += "<li class='current-play' data-index=" + i + " data-id=" + cur.id + ">" + cur.name + "</li>";
      } else {
        newHtml += "<li data-index=" + i + " data-id=" + cur.id + ">" + cur.name + "</li>";
      }
      
    }

    $(".my-music_list li").remove();
    ul.append(newHtml);

    $.ajax({
      url: 'https://music.sharelab.club/song/url?id=' +  musicIds,
      type: "GET",
      success: function(res) {
        res = res.data;
        for(var i=0; i<res.length; i++) {
          musicLis.push(res[i])
        }
        musicLis = resetList(musicLis, musicIds.split(","));
        // console.log(musicLis)
        // 初始化audio
        $("audio")[0].src = musicLis[0];
      }
    })
    spyClick();
  }

  function resetList(arr, target) {
    // console.log(arr, target)
    var newArr = [];
    for(var i=0; i<4; i++) {
      var cur = target[i];
      // console.log(cur);
      for(var j=0; j<4; j++) {
        if (cur == arr[j].id) {
          newArr.push(arr[j].url);
        }
      }
    }

    return newArr;
  }

})($)



