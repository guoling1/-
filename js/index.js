var oSearch = document.getElementById('search');
var oForm = oSearch.getElementsByTagName('form')[0];
var oInp = oForm.getElementsByTagName('input')[0];
var oHistory = document.getElementById('his');
var oSpan = oSearch.getElementsByTagName('span')[0];
var oOl = oSearch.getElementsByTagName('ol')[0];
var oLi1 = oSearch.getElementsByTagName('li')[0];
var oLi2 = oSearch.getElementsByTagName('li')[1];
oSpan.onclick = function () {
    if (oOl.style.display = 'block') {
        oOl.style.display = 'none'
    }
    oOl.style.display = 'block'
}
oLi1.onclick = function () {
    oSpan.innerHTML = '搜商品';
    oOl.style.display = 'none'
    oInp.value = "简约时尚套装"
}
oLi2.onclick = function () {
    oSpan.innerHTML = '搜店铺';
    oOl.style.display = 'none'
    oInp.value = null
}
oInp.onfocus = function () {
    oHistory.style.display = 'block';
    var tmp = oInp.value
    oInp.value = null;
    oInp.onblur = function () {
        utils.css(oHistory, 'display', 'none');
        oInp.value = tmp
    }
};
oInp.onclick = function (e) {
    e = e || window.event;
    e.stopPropagation ? e.stopPropagation() : e.cancelable = true;
};

//回到顶部
var backTop = document.getElementById('sideBottom');
window.onscroll = function () {
    if (utils.win('scrollTop') > 0) {
        backTop.style.display = 'block'
    } else {
        backTop.style.display = 'none';
    }
    if (utils.win('clientHeight') < utils.win('scrollTop')) {
        rock.style.top = '0px';
    } else {
        rock.style.top = '-50px';
    }
}
//右侧导航隐藏
var rightBar = document.getElementById('rightBar');
var myCar = document.getElementById('myCar');
window.onresize = function () {
    if (utils.win('clientWidth') < 1260) {
        rightBar.style.right = '-30px';
        backTop.style.left = myCar.style.left = '-30px';
        rightBar.style.transition = 'right .5s';
        backTop.style.transition = myCar.style.transition = 'left .5s'
    } else {
        rightBar.style.right = '0';
        backTop.style.left = myCar.style.left = '0px';
        rightBar.style.transition = 'right .5s';
        backTop.style.transition = myCar.style.transition = 'left .5s'
    }
};

//轮播图
(function () {
    var banner = document.getElementById('banner');
    var bannerImg = banner.getElementsByTagName('div')[0];
    var aA = bannerImg.getElementsByTagName('a');
    var aImg = bannerImg.getElementsByTagName('img');
    var oUl = banner.getElementsByTagName('ul')[0];
    var aLi = oUl.getElementsByTagName('li');
    var oBtnLeft = utils.getByClass('btnLeft')[0];
    var oBtnRight = utils.getByClass('btnRight')[0];
    utils.css(aA[0], 'opacity', 1);
    utils.css(aA[0], 'left', 0);
    var step = 0;
    var autoTimer = null;
    var interval = 5000;
    clearInterval(autoTimer);
    autoTimer = setInterval(autoMove, interval);
    function autoMove() {
        if (step >= aA.length - 1) {
            step = -1;
        }
        step++;
        setBanner()
    }

    function setBanner() {
        for (var i = 0; i < aA.length; i++) {
            var curEle = aA[i];
            if (i === step) {
                var siblings = utils.siblings(curEle);
                utils.css(curEle, 'zIndex', 1);
                zhufengAnimate(curEle, {opacity: 1, left: 0}, 400);
                for (var k = 0; k < siblings.length; k++) {
                    zhufengAnimate(siblings[k], {left: -175}, 500, function () {
                        for (var i = 0; i < siblings.length; i++) {
                            utils.css(siblings[i], 'left', '175px');
                            utils.css(siblings[i], 'opacity', 0);
                        }
                    });
                }
                continue;
            }
            utils.css(curEle, 'zIndex', 0);
        }
        bannerTip();
    }

    function bannerTip() {
        for (var i = 0; i < aLi.length; i++) {
            var curEle = aLi[i];
            curEle.className = i === step ? 'fl' : '';
        }
    }

    banner.onmouseover = function () {
        clearInterval(autoTimer);
        oBtnLeft.style.display = oBtnRight.style.display = 'block';
    }
    banner.onmouseout = function () {
        autoTimer = setInterval(autoMove, interval);
        oBtnLeft.style.display = oBtnRight.style.display = 'none';
    }
    handleChange();
    function handleChange() {
        for (var i = 0; i < aLi.length; i++) {
            aLi[i].index = i;
            aLi[i].onclick = function () {
                step = this.index;
                setBanner()
            }
        }
    }

    oBtnLeft.onclick = function () {
        if (step <= 0) {
            step = aA.length
        }
        step--;
        setBanner()
    };
    oBtnRight.onclick = autoMove;
})();

//倒计时
var oT = document.getElementById('timer');
var timer_h = document.getElementById('timer_h');
var timer_m = document.getElementById('timer_m');
var timer_s = document.getElementById('timer_s');
function toDou(n) {
    return n >= 0 && n < 10 ? '0' + n : '' + n;
}
function countDown() {
    var oDate = new Date();
    var newDate = new Date('2016/10/1 00:00:00');
    var s = Math.round((newDate.getTime() - oDate.getTime()) / 1000);
    s %= 86400;
    var h = Math.floor(s / 3600);
    s %= 3600;
    var m = Math.floor(s / 60);
    s %= 60;
    timer_h.innerHTML = toDou(h);
    timer_m.innerHTML = toDou(m);
    timer_s.innerHTML = toDou(s);
}

countDown();
clearTimeout(timer);
var timer = setInterval(countDown, 1000);



