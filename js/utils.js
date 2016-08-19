/**
 * Created by gl on 2016/6/28.
 */
var utils = (function () {
    var flag = 'getComputedStyle' in window;

    function rnd(n, m) {
        n = Number(n);
        m = Number(m);
        if (isNaN(n) || isNaN(m)) {
            return Math.random();
        }
        if (n > m) {
            var tmp = n;
            n = m;
            m = tmp;
        }
        return Math.round(Math.random() * (m - n) + n);
    }

    function listToArray(arg) {
        if (flag) {
            return Array.prototype.slice.call(arg);
        }
        var ary = [];
        for (var i = 0; i < arg.length; i++) {
            ary.push(arg[i]);
        }
        return ary;
    }

    function jsonParse(jsonStr) {
        return 'JSON' in window ? JSON.parse(jsonStr) : eval('(' + jsonStr + ')');
    }

    function win(attr, value) {
        if (typeof value === 'undefined') {
            return document.documentElement[attr] || document.body[attr];
        }
        document.documentElement[attr] = document.body[attr] = value;
    }

    function offset(curEle) {
        var l = curEle.offsetLeft;
        var t = curEle.offsetTop;
        var par = curEle.offsetParent;
        while (par) {
            if (navigator.userAgent.indexOf('MSIE 8.0') === -1) {
                l += par.clientLeft;
                t += par.clientTop;
            }
            l += par.offsetLeft;
            t += par.offsetTop;
            par = par.offsetParent;
        }
        return {left: l, top: t};
    }

    function getByClass(strClass, curEle) {
        curEle = curEle || document;
        if (flag) {
            return this.listToArray(curEle.getElementsByClassName(strClass));
        }
        var ary = [];
        var aryClass = strClass.replace(/(^ +)|( +$)/g, '').split(/\s+/g);
        var nodeList = curEle.getElementsByTagName('*');
        for (var i = 0; i < nodeList.length; i++) {
            var curNode = nodeList[i];
            var bOk = true;
            for (var k = 0; k < aryClass.length; k++) {
                var curClass = aryClass[k];
                var reg = new RegExp('(^| +)' + curClass + '( +|$)');
                if (!reg.test(curNode.className)) {
                    bOk = false;
                    break;
                }
            }
            if (bOk) {
                ary.push(curNode)
            }
        }
        return ary;
    }

    function hasClass(curEle, cName) {
        cName = cName.replace(/(^ +)|( +$)/g, '');
        var reg = new RegExp('\\b' + cName + '\\b');
        return reg.test(curEle.className);
    }

    function addClass(curEle, strClass) {
        var aryClass = strClass.replace(/(^ +)|( +$)/g, '').split(/\s+/g);
        for (var i = 0; i < aryClass.length; i++) {
            var curClass = aryClass[i];
            if (!this.hasClass(curEle, curClass)) {
                curEle.className += ' ' + curClass;
            }
        }
    }

    function removeClass(curEle, strClass) {
        var aryClass = strClass.replace(/(^ +)|( +$)/g, '').split(/\s+/g);
        for (var i = 0; i < aryClass.length; i++) {
            if (hasClass(curEle, aryClass[i])) {
                curEle.className = curEle.className.replace(aryClass[i], '');
            }
        }
    }

    function getCss(curEle, attr) {
        var val, reg;
        if (flag) {
            val = getComputedStyle(curEle, false)[attr];
        } else {
            if (attr === 'opacity') {
                val = curEle.currentStyle.filter;
                reg = /^alpha\(opacity[:=](\d+)\)$/i;
                return reg.test(val) ? RegExp.$1 / 100 : 1;
            } else {
                val = curEle.currentStyle[attr];
            }
        }
        reg = /^([+-])?\d+(\.\d+)?(px|pt|rem|em)$/;
        return reg.test(val) ? parseFloat(val) : val;
    }

    function setCss(curEle, attr, value) {
        if (attr === 'float') {
            curEle.style.styleFloat = value;
            curEle.style.cssFloat = value;
            return;
        }
        if (attr === 'opacity') {
            curEle.style.opacity = value;
            curEle.style.filter = 'alpha(opacity=' + value * 100 + ')';
            return
        }
        var reg = /(width|height|top|right|bottom|left|((margin|padding)(top|right|bottom|left)?))/;
        if (reg.test(attr)) {
            value = parseFloat(value) + 'px';
        }
        curEle.style[attr] = value;
    }

    function setGroupCss(curEle, options) {
        for (var attr in options) {
            this.setCss(curEle, attr, options[attr])
        }
    }

    function css(curEle) {
        var arg2 = arguments[1];
        if (typeof arg2 === 'string') {
            var arg3 = arguments[2];
            if (typeof arg3 !== 'undefined') {
                this.setCss(curEle, arg2, arg3);
            } else {
                return this.getCss(curEle, arg2);
            }
        }
        if (arg2 instanceof Object) {
            this.setGroupCss(curEle, arg2);
        }
    }

    /*function getChildren(curEle) {
        if (flag) {
            return this.listToArray(curEle.children);
        }
        var ary = [];
        var nodeList = curEle.childNodes;
        for (var i = 0; i < nodeList.length; i++) {
            if (nodeList[i].nodeType === 1) {
                ary.push(nodeList[i]);
            }
        }
        return ary;
    }*/
    function getChildren(curEle,tag){
        var ary=[];
        var nodeList=curEle.childNodes;
        for(var i=0; i<nodeList.length; i++){
            if(nodeList[i].nodeType===1){
                if(typeof tag !=='undefined'){
                    var reg=new RegExp('^'+tag+'$','i')
                    reg.test(nodeList[i].tagName)?ary.push(nodeList[i]):null;
                }
            }
        }
        return ary;
    }

    function prev(curEle) {
        if (flag) {
            return curEle.previousElementSibling;
        }
        var pre = curEle.previousSibling;
        while (pre && pre.nodeType !== 1) {
            pre = pre.previousSibling;
        }
        return pre;
    }

    function prevAll(curEle) {
        var pre = this.prev(curEle);
        var ary = [];
        while (pre) {
            ary.unshift(pre);
            pre = this.prev(pre);
        }
        return ary;
    }

    function next(curEle) {
        if (flag) {
            return curEle.nextElementSibling;
        }
        var nex = curEle.nextSibling;
        while (nex && nex.nodeType !== 1) {
            nex = nex.nextSibling;
        }
        return nex;
    }

    function nextAll(curEle) {
        var nex = this.next(curEle);
        var ary = [];
        while (nex) {
            ary.push(nex);
            nex = this.next(nex);
        }
        return ary;
    }

    function sibling(curEle) {
        var pre = this.prev(curEle);
        var nex = this.next(curEle);
        var ary = [];
        if (pre) ary.push(pre);
        if (nex) ary.push(nex);
        return ary;
    }

    function siblings(curEle) {
        return this.prevAll(curEle).concat(this.nextAll(curEle));
    }

    function firstChild(curEle) {
        return this.getChildren(curEle)[0];
    }

    function lastChild(curEle) {
        var aChs = this.getChildren(curEle);
        return aChs[aChs.length - 1];
    }

    function index(curEle) {
        return this.prevAll(curEle).length;
    }

    function appendChild(parent,newEle){
        parent.appendChild(newEle);
    }

    function prependChild(parent, newEle) {
        var first = this.firstChild(parent);
        if (first) {
            parent.insertBefore(newEle, first);
        } else {
            parent.appendChild(newEle);
        }
    }

    function insertBefore(newEle, oldEle) {
        oldEle.parentNode.insertBefore(newEle, oldEle);
    }

    function insertAfter(newEle, oldEle) {
        var nex = this.next(oldEle);
        if (nex) {
            oldEle.parentNode.insertBefore(newEle, nex);
        } else {
            oldEle.parentNode.appendChild(newEle);
        }
    }

    return {
        rnd: rnd,//兼容版的求一定范围随机数
        listToArray: listToArray,//类数组转数组
        jsonParse: jsonParse,//把JSON格式的字符串转成JSON格式数据
        win: win,//处理（获取，设置）浏览器盒子模型兼容
        offset: offset,//当前元素到body的距离{left：l,top:t}
        getByClass: getByClass, //在一定范围内，通过className获取元素
        hasClass: hasClass, //验证这个元素上是否有某个class名
        addClass: addClass,//给元素添加样式类名
        removeClass: removeClass,//如果元素身上有这个class名才能删除
        getCss: getCss,//获取哪个元素经浏览器计算过的样式（获取非行间样式）
        setCss: setCss,//设置样式：给某个元素的某个属性添加某个值
        setGroupCss: setGroupCss, //设置一组样式
        css: css,//取值赋值合体的函数（getCss+setCss+setGroupCss）
        getChildren: getChildren,//获取所有的子节点
        prev: prev,//获取当前元素的哥哥元素
        prevAll: prevAll,//获取当前元素所有的哥哥元素
        next: next,//获取当前元素的下一个弟弟元素节点
        nextAll: nextAll,//获取所有的弟弟元素节点
        sibling: sibling,//获取当前元素的相邻元素
        siblings: siblings,//获取当前元素的所有兄弟节点
        firstChild: firstChild,//获取当前元素下的第一个子元素
        lastChild: lastChild,//当前元素下的第一个子元素
        index: index,//获取当前元素的索引
        appendChild:appendChild,
        prependChild: prependChild,//把新元素插入到当前元素的做开始
        insertBefore: insertBefore,//把新元素插入到指定元素的前面
        insertAfter: insertAfter//把新元素插入到指定元素的后面（插入到弟弟元素的前面）
    }
})();