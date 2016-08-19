var module=(function(){
    //右上角图标效果
    function changeHid(){
        var hidden=document.getElementById('hidden');
        var hid1=document.getElementById('hid1');
        var hid2=document.getElementById('hid2');
        hidden.onclick=function(){
            if(hid1.style.display=='none'){
                hid1.style.display='block';
                hid2.style.display='none';
                this.style.background="url('image/login/inp2.png') -6px 1px"
            }else{
                hid1.style.display='none';
                hid2.style.display='block';
                this.style.background="url('image/login/inp1.png') "
            }
        }

    }
    //中间的
    function modHid(){
        var mod=document.getElementById('mod'),
            aMod=mod.getElementsByTagName('a'),
            modhid0=document.getElementById('modhid1'),
            modhid1=document.getElementById('modhid2');
        var ary=[modhid0,modhid1]
        for(var i=0;i<aMod.length;i++){
            aMod[i].index = i;
            aMod[i].onclick=function(){
                for (var i = 0; i < aMod.length; i++) {
                    aMod[i].className='';
                    ary[i].style.display='none';
                }
                this.className+='tab_on'
                ary[this.index].style.display='block';
            }
        }
    }



    function init(){
        changeHid()
        modHid()
    }
    return {init:init}
})();
module.init()