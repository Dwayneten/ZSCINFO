//创建和初始化地图函数：
function initMap(){
    createMap();//创建地图
    setMapEvent();//设置地图事件
    addMapControl();//向地图添加控件
    addMarker();//向地图中添加marker
    addPolyline();//向地图中添加线
    addRemark();//向地图中添加文字标注
}

//创建地图函数：
function createMap(){
    var map = new BMap.Map("dituContent");//在百度地图容器中创建一个地图
    var point = new BMap.Point(113.396356,22.533892);//定义一个中心点坐标
    map.centerAndZoom(point,17);//设定地图的中心点和坐标并将地图显示在地图容器中
    window.map = map;//将map变量存储在全局
}

//地图事件设置函数：
function setMapEvent(){
    map.enableDragging();//启用地图拖拽事件，默认启用(可不写)
    map.disableScrollWheelZoom();//禁用地图滚轮放大缩小，默认禁用(可不写)
    map.enableDoubleClickZoom();//启用鼠标双击放大，默认启用(可不写)
    map.enableKeyboard();//启用键盘上下左右键移动地图
}

//地图控件添加函数：
function addMapControl(){
    //向地图中添加缩放控件
var ctrl_nav = new BMap.NavigationControl({anchor:BMAP_ANCHOR_TOP_LEFT,type:BMAP_NAVIGATION_CONTROL_LARGE});
map.addControl(ctrl_nav);
            //向地图中添加比例尺控件
var ctrl_sca = new BMap.ScaleControl({anchor:BMAP_ANCHOR_BOTTOM_LEFT});
map.addControl(ctrl_sca);
}

//标注点数组
var markerArr = [{title:"南门",content:"报道可从此门入",point:"113.395485|22.530062",isOpen:0,icon:{w:21,h:21,l:0,t:0,x:6,lb:5}}
     ,{title:"北门",content:"邻近龙腾宿舍区&nbsp;附近商铺较多",point:"113.399276|22.536688",isOpen:0,icon:{w:21,h:21,l:0,t:0,x:6,lb:5}}
     ,{title:"东门",content:"邻近龙腾与香山宿舍区&nbsp;附近有一些商铺",point:"113.400524|22.534401",isOpen:0,icon:{w:21,h:21,l:0,t:0,x:6,lb:5}}
     ,{title:"岐头门",content:"邻近岐头宿舍区",point:"113.395799|22.536821",isOpen:0,icon:{w:21,h:21,l:0,t:0,x:6,lb:5}}
     ,{title:"西门（大概位置）",content:"很小的一个门",point:"113.392727|22.531989",isOpen:0,icon:{w:21,h:21,l:0,t:0,x:6,lb:5}}
     ,{title:"山顶足球场&篮球场",content:"山顶足球场和山顶篮球场",point:"113.396958|22.535303",isOpen:0,icon:{w:21,h:21,l:0,t:0,x:6,lb:5}}
     ];
//创建marker
function addMarker(){
    for(var i=0;i<markerArr.length;i++){
        var json = markerArr[i];
        var p0 = json.point.split("|")[0];
        var p1 = json.point.split("|")[1];
        var point = new BMap.Point(p0,p1);
        var iconImg = createIcon(json.icon);
        var marker = new BMap.Marker(point,{icon:iconImg});
        var iw = createInfoWindow(i);
        var label = new BMap.Label(json.title,{"offset":new BMap.Size(json.icon.lb-json.icon.x+10,-20)});
        marker.setLabel(label);
        map.addOverlay(marker);
        label.setStyle({
                    borderColor:"#808080",
                    color:"#333",
                    cursor:"pointer"
        });
        
        (function(){
            var index = i;
            var _iw = createInfoWindow(i);
            var _marker = marker;
            _marker.addEventListener("click",function(){
                this.openInfoWindow(_iw);
            });
            _iw.addEventListener("open",function(){
                _marker.getLabel().hide();
            })
            _iw.addEventListener("close",function(){
                _marker.getLabel().show();
            })
            label.addEventListener("click",function(){
                _marker.openInfoWindow(_iw);
            })
            if(!!json.isOpen){
                label.hide();
                _marker.openInfoWindow(_iw);
            }
        })()
    }
}
//创建InfoWindow
function createInfoWindow(i){
    var json = markerArr[i];
    var iw = new BMap.InfoWindow("<b class='iw_poi_title' title='" + json.title + "'>" + json.title + "</b><div class='iw_poi_content'>"+json.content+"</div>");
    return iw;
}
//创建一个Icon
function createIcon(json){
    var icon = new BMap.Icon("http://app.baidu.com/map/images/us_mk_icon.png", new BMap.Size(json.w,json.h),{imageOffset: new BMap.Size(-json.l,-json.t),infoWindowOffset:new BMap.Size(json.lb+5,1),offset:new BMap.Size(json.x,json.h)})
    return icon;
}
//标注线数组
var plPoints = [{style:"solid",weight:4,color:"#f00",opacity:0.6,points:["113.396904|22.536671","113.396635|22.537189"]}
     ];
//向地图中添加线函数
function addPolyline(){
    for(var i=0;i<plPoints.length;i++){
        var json = plPoints[i];
        var points = [];
        for(var j=0;j<json.points.length;j++){
            var p1 = json.points[j].split("|")[0];
            var p2 = json.points[j].split("|")[1];
            points.push(new BMap.Point(p1,p2));
        }
        var line = new BMap.Polyline(points,{strokeStyle:json.style,strokeWeight:json.weight,strokeColor:json.color,strokeOpacity:json.opacity});
        map.addOverlay(line);
    }
}
//文字标注数组
var lbPoints = [{point:"113.393661|22.533208",content:"山底足球场"}
     ,{point:"113.394416|22.534126",content:"体育馆&游泳池"}
     ,{point:"113.398279|22.536145",content:"龙腾片区"}
     ,{point:"113.398638|22.534543",content:"香山片区"}
     ,{point:"113.397686|22.533608",content:"教学楼"}
     ,{point:"113.398023|22.532131",content:"实验楼"}
     ,{point:"113.396118|22.531297",content:"行政楼"}
     ,{point:"113.395516|22.532907",content:"凤翔片区"}
     ,{point:"113.396235|22.537823",content:"岐头片区"}
     ,{point:"113.395377|22.530829",content:"1号教学楼（报到处）"}
     ];
//向地图中添加文字标注函数
function addRemark(){
    for(var i=0;i<lbPoints.length;i++){
        var json = lbPoints[i];
        var p1 = json.point.split("|")[0];
        var p2 = json.point.split("|")[1];
        var label = new BMap.Label("<div style='padding:2px;'>"+json.content+"</div>",{point:new BMap.Point(p1,p2),offset:new BMap.Size(3,-6)});
        map.addOverlay(label);
        label.setStyle({borderColor:"#999"});
    }
}

initMap();//创建和初始化地图