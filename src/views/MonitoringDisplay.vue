<template>
    <div class="big_screen">
        <div class="monitor_display_nav">
            <ul>
                <li :class="{curColor:navCurrent==1}" :style="{backgroundImage:'url('+ navImgSel +')'}">冲洗设备</li>
                <li :class="{curColor:navCurrent==2}" :style="{backgroundImage:'url('+ navImg +')'}">黑车识别</li>
            </ul>
            <div class="monitor_display_t">鼎洲智慧监管</div>
            <div class="monitor_display_time">
                <span>2020-09-18  14:50:23</span>
                <img src="../assets/images/quanp.png">
            </div>
        </div>


        <div class="monitor_display_content">
            <div class="monitor_display_left">
                <h2>冲洗监控<img src="../assets/images/icon01.png"></h2>
                <div class="congx">
                    <img src="../assets/images/congx.jpg" alt="">
                </div>
                <h2 class="congxzk">冲洗状况<img src="../assets/images/icon01.png"></h2>
                <div class="congxzk_content">
                    <div class="congxzk_content_th">
                        <span>通行车辆</span>
                        <span>通行时间</span>
                        <span>自动冲洗状态</span>
                        <span>冲洗结果</span>
                    </div>
                    <div class="congxzk_content_list">
                        <div class="congxzk_content_tr">
                            <span>鲁Q023GS</span>
                            <span>02:35:02</span>
                            <span>不冲洗通行</span>
                            <span>冲洗不干净</span>
                        </div>
                        
                    </div>
                   
                </div>
            </div>

            <div class="monitor_display_map">
                <baidu-map class="bm-view" :mapStyle="mapStyle"  @resize="resize" ref="bm_view" :scroll-wheel-zoom="true" ak="PYswOGSEIdfO5RcGfgetWd5cbhonKUpz" :center="center" :zoom="zoom" @ready="handler">
                    <mapMarkerClusterer :averageCenter="true" :minClusterSize="minClusterSize">
                        <mapMarker :position="{lng: marker.lng, lat: marker.lat}"></mapMarker>
                    </mapMarkerClusterer>
                </baidu-map>
            </div>

            <div class="monitor_display_right">
                <h2>范围查车<img src="../assets/images/icon01.png">
                    <img class="set" src="../assets/images/set.png">
                </h2>
                <div class="range_car">
                    <h3>1500米范围内共有 <em>2</em> 辆车</h3>
                    <ul>
                        <li><span></span>鲁Q023GS</li>
                        <li><span></span>鲁Q023GS</li>
                        
                    </ul>
                </div>
                <h2 class="congxzk">今日作业车辆<img src="../assets/images/icon01.png">
                </h2>
                <div class="task_car">
                    <div class="task_car_echarts">
                        <div class="task_car_echarts_l">
                            <div class="task_car_echarts_map_l" ref="echarts_bar_l"></div>
                            <div class="yesterday">昨日</div>
                        </div>
                        <div class="task_car_echarts_r">
                            <div class="task_car_echarts_map_r" ref="echarts_bar_r"></div>
                            <div class="yesterday">今日</div>
                        </div>
                    </div>
                    <ul>
                        <li><span></span>黑车</li>
                        <li><span></span>套牌车</li>
                        <li><span></span>绕行</li>
                        <li><span></span>未冲洗</li>
                        <li><span></span>冲洗时间不足</li>
                        <li><span></span>冲洗不干净</li>
                    </ul>
                </div>
                <h2 class="congxzk">冲洗状况<img src="../assets/images/icon01.png">
                </h2>
                <div class="wash_status">
                    <h4>鲁Q023GS</h4>
                    <dl>
                        <dt>
                            <img src="../assets/images/load.png"/>
                            <p>加载中请稍后...</p>
                        </dt>
                        <dd>
                            <p><span>进入时间：</span>2020-09-20 02:03:13</p>
                            <p><span>离开时间：</span>2020-09-20 02:03:13</p>
                            <p><span>停留时间：</span>277s</p>
                            <p><span>冲洗状态：</span>冲洗通行</p>
                            <p><span>冲洗结果：</span>冲洗干净</p>
                            <p><span>所属企业：</span>运输公司</p>
                            <p><span>车辆型号：</span>大车</p>
                        </dd>
                    </dl>
                </div>
            </div>
        </div>

    </div>
</template>

<script>

import echarts from 'echarts/lib/echarts'
import 'echarts/lib/chart/pie'
import BaiduMap from 'vue-baidu-map/components/map/Map.vue'
import mapMarkerClusterer from 'vue-baidu-map/components/extra/MarkerClusterer.vue'
import mapMarker from 'vue-baidu-map/components/overlays/Marker.vue'
export default {
    data() {
        return {
            navImg:require('@/assets/images/big_nosel.png'),
            navImgSel:require('@/assets/images/big_sel.png'),
            navCurrent:1,
            center: {lng: 0, lat: 0},  //经纬度
            map:'',
            BMap:'',
            zoom:12,
            minClusterSize:1,
            mapStyle:{
                styleJson:[
                    {
                        "featureType": "land",
                        "elementType": "geometry",
                        "stylers": {
                            "visibility": "on",
                            "color": "#0e1c33"
                        }
                    },
                    {
                        "featureType": "water",
                        "elementType": "geometry",
                        "stylers": {
                            "visibility": "on",
                            "color": "#113549ff"
                        }
                    },
                     {
                        "featureType": "green",
                        "elementType": "geometry",
                        "stylers": {
                            "visibility": "on",
                            "color": "#0e1b30ff"
                        }
                    }, 
                    {
                        "featureType": "building",
                        "elementType": "geometry",
                        "stylers": {
                            "visibility": "on"
                        }
                    }, 
                    {
                        "featureType": "building",
                        "elementType": "geometry.topfill",
                        "stylers": {
                            "color": "#113549ff"
                        }
                    }, {
                        "featureType": "building",
                        "elementType": "geometry.sidefill",
                        "stylers": {
                            "color": "#143e56ff"
                        }
                    }, {
                        "featureType": "building",
                        "elementType": "geometry.stroke",
                        "stylers": {
                            "color": "#dadada00"
                        }
                    }, {
                        "featureType": "subwaystation",
                        "elementType": "geometry",
                        "stylers": {
                            "visibility": "on",
                            "color": "#113549B2"
                        }
                    }, {
                        "featureType": "education",
                        "elementType": "geometry",
                        "stylers": {
                            "visibility": "on",
                            "color": "#12223dff"
                        }
                    }, {
                        "featureType": "medical",
                        "elementType": "geometry",
                        "stylers": {
                            "visibility": "on",
                            "color": "#12223dff"
                        }
                    }, {
                        "featureType": "scenicspots",
                        "elementType": "geometry",
                        "stylers": {
                            "visibility": "on",
                            "color": "#12223dff"
                        }
                    }, {
                        "featureType": "highway",
                        "elementType": "geometry",
                        "stylers": {
                            "visibility": "on",
                            "weight": "4"
                        }
                    }, 
                    {
                        "featureType": "highway",
                        "elementType": "geometry.fill",
                        "stylers": {
                            "color": "#12223dff"
                        }
                    }, {
                        "featureType": "highway",
                        "elementType": "geometry.stroke",
                        "stylers": {
                            "color": "#fed66900"
                        }
                    }, {
                        "featureType": "highway",
                        "elementType": "labels",
                        "stylers": {
                            "visibility": "on"
                        }
                    }, {
                        "featureType": "highway",
                        "elementType": "labels.text.fill",
                        "stylers": {
                            "color": "#12223dff"
                        }
                    }, {
                        "featureType": "highway",
                        "elementType": "labels.text.stroke",
                        "stylers": {
                            "color": "#ffffff00"
                        }
                    }, {
                        "featureType": "highway",
                        "elementType": "labels.icon",
                        "stylers": {
                            "visibility": "on"
                        }
                    }, {
                        "featureType": "arterial",
                        "elementType": "geometry",
                        "stylers": {
                            "visibility": "on",
                            "weight": "2"
                        }
                    }, {
                        "featureType": "arterial",
                        "elementType": "geometry.fill",
                        "stylers": {
                            "color": "#12223dff"
                        }
                    }, {
                        "featureType": "arterial",
                        "elementType": "geometry.stroke",
                        "stylers": {
                            "color": "#ffeebb00"
                        }
                    }, {
                        "featureType": "arterial",
                        "elementType": "labels",
                        "stylers": {
                            "visibility": "on"
                        }
                    }, {
                        "featureType": "arterial",
                        "elementType": "labels.text.fill",
                        "stylers": {
                            "color": "#2dc4bbff"
                        }
                    }, {
                        "featureType": "arterial",
                        "elementType": "labels.text.stroke",
                        "stylers": {
                            "color": "#ffffff00"
                        }
                    }, {
                        "featureType": "local",
                        "elementType": "geometry",
                        "stylers": {
                            "visibility": "on",
                            "weight": "1"
                        }
                    }, {
                        "featureType": "local",
                        "elementType": "geometry.fill",
                        "stylers": {
                            "color": "#12223dff"
                        }
                    }, {
                        "featureType": "local",
                        "elementType": "geometry.stroke",
                        "stylers": {
                            "color": "#ffffff00"
                        }
                    }, {
                        "featureType": "local",
                        "elementType": "labels",
                        "stylers": {
                            "visibility": "on"
                        }
                    }, {
                        "featureType": "local",
                        "elementType": "labels.text.fill",
                        "stylers": {
                            "color": "#979c9aff"
                        }
                    }, {
                        "featureType": "local",
                        "elementType": "labels.text.stroke",
                        "stylers": {
                            "color": "#ffffffff"
                        }
                    }, {
                        "featureType": "railway",
                        "elementType": "geometry",
                        "stylers": {
                            "visibility": "off",
                            "weight": "1"
                        }
                    }, {
                        "featureType": "railway",
                        "elementType": "geometry.fill",
                        "stylers": {
                            "color": "#123c52ff"
                        }
                    }, {
                        "featureType": "railway",
                        "elementType": "geometry.stroke",
                        "stylers": {
                            "color": "#12223dff"
                        }
                    },
                    {
    "featureType": "subway",
    "elementType": "geometry",
    "stylers": {
        "visibility": "off",
        "weight": "1"
    }
}, {
    "featureType": "subway",
    "elementType": "geometry.fill",
    "stylers": {
        "color": "#d8d8d8ff"
    }
}, {
    "featureType": "subway",
    "elementType": "geometry.stroke",
    "stylers": {
        "color": "#ffffff00"
    }
}, {
    "featureType": "subway",
    "elementType": "labels",
    "stylers": {
        "visibility": "on"
    }
}, {
    "featureType": "subway",
    "elementType": "labels.text.fill",
    "stylers": {
        "color": "#979c9aff"
    }
}, {
    "featureType": "subway",
    "elementType": "labels.text.stroke",
    "stylers": {
        "color": "#ffffffff"
    }
}, {
    "featureType": "continent",
    "elementType": "labels",
    "stylers": {
        "visibility": "on"
    }
}, {
    "featureType": "continent",
    "elementType": "labels.icon",
    "stylers": {
        "visibility": "on"
    }
}, {
    "featureType": "continent",
    "elementType": "labels.text.fill",
    "stylers": {
        "color": "#2dc4bbff"
    }
}, {
    "featureType": "continent",
    "elementType": "labels.text.stroke",
    "stylers": {
        "color": "#ffffff00"
    }
}, {
    "featureType": "city",
    "elementType": "labels.icon",
    "stylers": {
        "visibility": "off"
    }
}, {
    "featureType": "city",
    "elementType": "labels",
    "stylers": {
        "visibility": "on"
    }
}, {
    "featureType": "city",
    "elementType": "labels.text.fill",
    "stylers": {
        "color": "#2dc4bbff"
    }
}, {
    "featureType": "city",
    "elementType": "labels.text.stroke",
    "stylers": {
        "color": "#ffffff00"
    }
}, {
    "featureType": "town",
    "elementType": "labels.icon",
    "stylers": {
        "visibility": "on"
    }
}, {
    "featureType": "town",
    "elementType": "labels",
    "stylers": {
        "visibility": "off"
    }
}, {
    "featureType": "town",
    "elementType": "labels.text.fill",
    "stylers": {
        "color": "#454d50ff"
    }
}, {
    "featureType": "town",
    "elementType": "labels.text.stroke",
    "stylers": {
        "color": "#ffffffff"
    }
}, {
    "featureType": "road",
    "elementType": "geometry.fill",
    "stylers": {
        "color": "#12223dff"
    }
}, {
    "featureType": "poilabel",
    "elementType": "labels",
    "stylers": {
        "visibility": "on"
    }
}, {
    "featureType": "districtlabel",
    "elementType": "labels",
    "stylers": {
        "visibility": "off"
    }
}, {
    "featureType": "road",
    "elementType": "geometry",
    "stylers": {
        "visibility": "on"
    }
}, {
    "featureType": "road",
    "elementType": "labels",
    "stylers": {
        "visibility": "off"
    }
}, {
    "featureType": "road",
    "elementType": "geometry.stroke",
    "stylers": {
        "color": "#ffffff00"
    }
}, {
    "featureType": "district",
    "elementType": "labels",
    "stylers": {
        "visibility": "on"
    }
}, {
    "featureType": "poilabel",
    "elementType": "labels.icon",
    "stylers": {
        "visibility": "off"
    }
}, {
    "featureType": "poilabel",
    "elementType": "labels.text.fill",
    "stylers": {
        "color": "#2dc4bbff"
    }
}, {
    "featureType": "poilabel",
    "elementType": "labels.text.stroke",
    "stylers": {
        "color": "#ffffff00"
    }
}, {
    "featureType": "manmade",
    "elementType": "geometry",
    "stylers": {
        "color": "#12223dff"
    }
}, {
    "featureType": "districtlabel",
    "elementType": "labels.text.stroke",
    "stylers": {
        "color": "#ffffffff"
    }
}, {
    "featureType": "entertainment",
    "elementType": "geometry",
    "stylers": {
        "color": "#12223dff"
    }
}, {
    "featureType": "shopping",
    "elementType": "geometry",
    "stylers": {
        "color": "#12223dff"
    }
}, {
    "featureType": "nationalway",
    "stylers": {
        "level": "6",
        "curZoomRegionId": "0",
        "curZoomRegion": "6-10"
    }
}, {
    "featureType": "nationalway",
    "stylers": {
        "level": "7",
        "curZoomRegionId": "0",
        "curZoomRegion": "6-10"
    }
}, {
    "featureType": "nationalway",
    "stylers": {
        "level": "8",
        "curZoomRegionId": "0",
        "curZoomRegion": "6-10"
    }
}, {
    "featureType": "nationalway",
    "stylers": {
        "level": "9",
        "curZoomRegionId": "0",
        "curZoomRegion": "6-10"
    }
}, {
    "featureType": "nationalway",
    "stylers": {
        "level": "10",
        "curZoomRegionId": "0",
        "curZoomRegion": "6-10"
    }
}, {
    "featureType": "nationalway",
    "elementType": "geometry",
    "stylers": {
        "visibility": "off",
        "level": "6",
        "curZoomRegionId": "0",
        "curZoomRegion": "6-10"
    }
}, {
    "featureType": "nationalway",
    "elementType": "geometry",
    "stylers": {
        "visibility": "off",
        "level": "7",
        "curZoomRegionId": "0",
        "curZoomRegion": "6-10"
    }
}, {
    "featureType": "nationalway",
    "elementType": "geometry",
    "stylers": {
        "visibility": "off",
        "level": "8",
        "curZoomRegionId": "0",
        "curZoomRegion": "6-10"
    }
}, {
    "featureType": "nationalway",
    "elementType": "geometry",
    "stylers": {
        "visibility": "off",
        "level": "9",
        "curZoomRegionId": "0",
        "curZoomRegion": "6-10"
    }
}, {
    "featureType": "nationalway",
    "elementType": "geometry",
    "stylers": {
        "visibility": "off",
        "level": "10",
        "curZoomRegionId": "0",
        "curZoomRegion": "6-10"
    }
}, {
    "featureType": "nationalway",
    "elementType": "labels",
    "stylers": {
        "visibility": "off",
        "level": "6",
        "curZoomRegionId": "0",
        "curZoomRegion": "6-10"
    }
}, {
    "featureType": "nationalway",
    "elementType": "labels",
    "stylers": {
        "visibility": "off",
        "level": "7",
        "curZoomRegionId": "0",
        "curZoomRegion": "6-10"
    }
}, {
    "featureType": "nationalway",
    "elementType": "labels",
    "stylers": {
        "visibility": "off",
        "level": "8",
        "curZoomRegionId": "0",
        "curZoomRegion": "6-10"
    }
}, {
    "featureType": "nationalway",
    "elementType": "labels",
    "stylers": {
        "visibility": "off",
        "level": "9",
        "curZoomRegionId": "0",
        "curZoomRegion": "6-10"
    }
}, {
    "featureType": "nationalway",
    "elementType": "labels",
    "stylers": {
        "visibility": "off",
        "level": "10",
        "curZoomRegionId": "0",
        "curZoomRegion": "6-10"
    }
}, {
    "featureType": "cityhighway",
    "stylers": {
        "level": "6",
        "curZoomRegionId": "0",
        "curZoomRegion": "6-9"
    }
}, {
    "featureType": "cityhighway",
    "stylers": {
        "level": "7",
        "curZoomRegionId": "0",
        "curZoomRegion": "6-9"
    }
}, {
    "featureType": "cityhighway",
    "stylers": {
        "level": "8",
        "curZoomRegionId": "0",
        "curZoomRegion": "6-9"
    }
}, {
    "featureType": "cityhighway",
    "stylers": {
        "level": "9",
        "curZoomRegionId": "0",
        "curZoomRegion": "6-9"
    }
}, {
    "featureType": "cityhighway",
    "elementType": "geometry",
    "stylers": {
        "visibility": "off",
        "level": "6",
        "curZoomRegionId": "0",
        "curZoomRegion": "6-9"
    }
}, {
    "featureType": "cityhighway",
    "elementType": "geometry",
    "stylers": {
        "visibility": "off",
        "level": "7",
        "curZoomRegionId": "0",
        "curZoomRegion": "6-9"
    }
}, {
    "featureType": "cityhighway",
    "elementType": "geometry",
    "stylers": {
        "visibility": "off",
        "level": "8",
        "curZoomRegionId": "0",
        "curZoomRegion": "6-9"
    }
}, {
    "featureType": "cityhighway",
    "elementType": "geometry",
    "stylers": {
        "visibility": "off",
        "level": "9",
        "curZoomRegionId": "0",
        "curZoomRegion": "6-9"
    }
}, {
    "featureType": "cityhighway",
    "elementType": "labels",
    "stylers": {
        "visibility": "off",
        "level": "6",
        "curZoomRegionId": "0",
        "curZoomRegion": "6-9"
    }
}, {
    "featureType": "cityhighway",
    "elementType": "labels",
    "stylers": {
        "visibility": "off",
        "level": "7",
        "curZoomRegionId": "0",
        "curZoomRegion": "6-9"
    }
}, {
    "featureType": "cityhighway",
    "elementType": "labels",
    "stylers": {
        "visibility": "off",
        "level": "8",
        "curZoomRegionId": "0",
        "curZoomRegion": "6-9"
    }
}, {
    "featureType": "cityhighway",
    "elementType": "labels",
    "stylers": {
        "visibility": "off",
        "level": "9",
        "curZoomRegionId": "0",
        "curZoomRegion": "6-9"
    }
}, {
    "featureType": "subwaylabel",
    "elementType": "labels",
    "stylers": {
        "visibility": "off"
    }
}, {
    "featureType": "subwaylabel",
    "elementType": "labels.icon",
    "stylers": {
        "visibility": "off"
    }
}, {
    "featureType": "tertiarywaysign",
    "elementType": "labels",
    "stylers": {
        "visibility": "off"
    }
}, {
    "featureType": "tertiarywaysign",
    "elementType": "labels.icon",
    "stylers": {
        "visibility": "off"
    }
}, {
    "featureType": "provincialwaysign",
    "elementType": "labels",
    "stylers": {
        "visibility": "off"
    }
}, {
    "featureType": "provincialwaysign",
    "elementType": "labels.icon",
    "stylers": {
        "visibility": "off"
    }
}, {
    "featureType": "nationalwaysign",
    "elementType": "labels",
    "stylers": {
        "visibility": "off"
    }
}, {
    "featureType": "nationalwaysign",
    "elementType": "labels.icon",
    "stylers": {
        "visibility": "off"
    }
}, {
    "featureType": "highwaysign",
    "elementType": "labels",
    "stylers": {
        "visibility": "off"
    }
}, {
    "featureType": "highwaysign",
    "elementType": "labels.icon",
    "stylers": {
        "visibility": "off"
    }
}, {
    "featureType": "village",
    "elementType": "labels",
    "stylers": {
        "visibility": "off"
    }
}, {
    "featureType": "district",
    "elementType": "labels.text",
    "stylers": {
        "fontsize": "20"
    }
}, {
    "featureType": "district",
    "elementType": "labels.text.fill",
    "stylers": {
        "color": "#2dc4bbff"
    }
}, {
    "featureType": "district",
    "elementType": "labels.text.stroke",
    "stylers": {
        "color": "#ffffff00"
    }
}, {
    "featureType": "country",
    "elementType": "labels.text.fill",
    "stylers": {
        "color": "#2dc4bbff"
    }
}, {
    "featureType": "country",
    "elementType": "labels.text.stroke",
    "stylers": {
        "color": "#ffffff00"
    }
}, {
    "featureType": "water",
    "elementType": "labels.text.fill",
    "stylers": {
        "color": "#2dc4bbff"
    }
}, {
    "featureType": "water",
    "elementType": "labels.text.stroke",
    "stylers": {
        "color": "#ffffff00"
    }
}, {
    "featureType": "cityhighway",
    "elementType": "geometry.fill",
    "stylers": {
        "color": "#12223dff"
    }
}, {
    "featureType": "cityhighway",
    "elementType": "geometry.stroke",
    "stylers": {
        "color": "#ffffff00"
    }
}, {
    "featureType": "tertiaryway",
    "elementType": "geometry.fill",
    "stylers": {
        "color": "#12223dff"
    }
}, {
    "featureType": "tertiaryway",
    "elementType": "geometry.stroke",
    "stylers": {
        "color": "#ffffff10"
    }
}, {
    "featureType": "provincialway",
    "elementType": "geometry.fill",
    "stylers": {
        "color": "#12223dff"
    }
}, {
    "featureType": "provincialway",
    "elementType": "geometry.stroke",
    "stylers": {
        "color": "#ffffff00"
    }
}, {
    "featureType": "nationalway",
    "elementType": "geometry.fill",
    "stylers": {
        "color": "#12223dff"
    }
}, {
    "featureType": "nationalway",
    "elementType": "geometry.stroke",
    "stylers": {
        "color": "#ffffff00"
    }
}, {
    "featureType": "highway",
    "elementType": "labels.text",
    "stylers": {
        "fontsize": "20"
    }
}, {
    "featureType": "nationalway",
    "elementType": "labels.text.stroke",
    "stylers": {
        "color": "#ffffff00"
    }
}, {
    "featureType": "nationalway",
    "elementType": "labels.text.fill",
    "stylers": {
        "color": "#12223dff"
    }
}, {
    "featureType": "nationalway",
    "elementType": "labels.text",
    "stylers": {
        "fontsize": "20"
    }
}, {
    "featureType": "provincialway",
    "elementType": "labels.text.fill",
    "stylers": {
        "color": "#12223dff"
    }
}, {
    "featureType": "provincialway",
    "elementType": "labels.text.stroke",
    "stylers": {
        "color": "#ffffff00"
    }
}, {
    "featureType": "provincialway",
    "elementType": "labels.text",
    "stylers": {
        "fontsize": "20"
    }
}, {
    "featureType": "cityhighway",
    "elementType": "labels.text.fill",
    "stylers": {
        "color": "#12223dff"
    }
}, {
    "featureType": "cityhighway",
    "elementType": "labels.text",
    "stylers": {
        "fontsize": "20"
    }
}, {
    "featureType": "cityhighway",
    "elementType": "labels.text.stroke",
    "stylers": {
        "color": "#ffffff00"
    }
}, {
    "featureType": "estate",
    "elementType": "geometry",
    "stylers": {
        "color": "#12223dff"
    }
}, {
    "featureType": "tertiaryway",
    "elementType": "labels.text.fill",
    "stylers": {
        "color": "#2dc4bbff"
    }
}, {
    "featureType": "tertiaryway",
    "elementType": "labels.text.stroke",
    "stylers": {
        "color": "#ffffff00"
    }
}, {
    "featureType": "fourlevelway",
    "elementType": "labels.text.fill",
    "stylers": {
        "color": "#2dc4bbff"
    }
}, {
    "featureType": "fourlevelway",
    "elementType": "labels.text.stroke",
    "stylers": {
        "color": "#ffffff00"
    }
}, {
    "featureType": "scenicspotsway",
    "elementType": "geometry.fill",
    "stylers": {
        "color": "#12223dff"
    }
}, {
    "featureType": "scenicspotsway",
    "elementType": "geometry.stroke",
    "stylers": {
        "color": "#ffffff00"
    }
}, {
    "featureType": "universityway",
    "elementType": "geometry.fill",
    "stylers": {
        "color": "#12223dff"
    }
}, {
    "featureType": "universityway",
    "elementType": "geometry.stroke",
    "stylers": {
        "color": "#ffffff00"
    }
}, {
    "featureType": "vacationway",
    "elementType": "geometry.fill",
    "stylers": {
        "color": "#12223dff"
    }
}, {
    "featureType": "vacationway",
    "elementType": "geometry.stroke",
    "stylers": {
        "color": "#ffffff00"
    }
}, {
    "featureType": "fourlevelway",
    "elementType": "geometry",
    "stylers": {
        "visibility": "on"
    }
}, {
    "featureType": "fourlevelway",
    "elementType": "geometry.fill",
    "stylers": {
        "color": "#12223dff"
    }
}, {
    "featureType": "fourlevelway",
    "elementType": "geometry.stroke",
    "stylers": {
        "color": "#ffffff00"
    }
}, {
    "featureType": "transportationlabel",
    "elementType": "labels",
    "stylers": {
        "visibility": "on"
    }
}, {
    "featureType": "transportationlabel",
    "elementType": "labels.icon",
    "stylers": {
        "visibility": "off"
    }
}, {
    "featureType": "transportationlabel",
    "elementType": "labels.text.fill",
    "stylers": {
        "color": "#2dc4bbff"
    }
}, {
    "featureType": "transportationlabel",
    "elementType": "labels.text.stroke",
    "stylers": {
        "color": "#ffffff00"
    }
}, {
    "featureType": "educationlabel",
    "elementType": "labels",
    "stylers": {
        "visibility": "on"
    }
}, {
    "featureType": "educationlabel",
    "elementType": "labels.icon",
    "stylers": {
        "visibility": "off"
    }
}, {
    "featureType": "educationlabel",
    "elementType": "labels.text.fill",
    "stylers": {
        "color": "#2dc4bbff"
    }
}, {
    "featureType": "educationlabel",
    "elementType": "labels.text.stroke",
    "stylers": {
        "color": "#ffffff00"
    }
}, {
    "featureType": "transportation",
    "elementType": "geometry",
    "stylers": {
        "color": "#113549ff"
    }
}, {
    "featureType": "airportlabel",
    "elementType": "labels.text.fill",
    "stylers": {
        "color": "#2dc4bbff"
    }
}, {
    "featureType": "airportlabel",
    "elementType": "labels.text.stroke",
    "stylers": {
        "color": "#ffffff00"
    }
}, {
    "featureType": "scenicspotslabel",
    "elementType": "labels.text.fill",
    "stylers": {
        "color": "#2dc4bbff"
    }
}, {
    "featureType": "scenicspotslabel",
    "elementType": "labels.text.stroke",
    "stylers": {
        "color": "#ffffff00"
    }
}, {
    "featureType": "medicallabel",
    "elementType": "labels.text.fill",
    "stylers": {
        "color": "#2dc4bbff"
    }
}, {
    "featureType": "medicallabel",
    "elementType": "labels.text.stroke",
    "stylers": {
        "color": "#ffffff00"
    }
}, {
    "featureType": "medicallabel",
    "elementType": "labels.icon",
    "stylers": {
        "visibility": "off"
    }
}, 
                ]
            },
            marker:{
                lng:'121.308090',
                lat:'31.137270'
            }
        }
    },
    mounted(){
        this.myChart1 = echarts.init(this.$refs.echarts_bar_l);
        this.myChart1.setOption({
            title: {
                text: '南丁格尔玫瑰图',
                subtext: '纯属虚构',
                left: 'center'
            },
            series: [
                {
                    name: '面积模式',
                    type: 'pie',
                    label: {
                        position: 'inner'
                    },
                    roseType: 'area',
                    radius: ['30%', '100%'],
                    data: [
                        {value: 1, name: '1',itemStyle: { color: '#ff5a00' }},
                        {value: 2, name: '2',itemStyle: { color: '#ffc500' }},
                        {value: 3, name: '3',itemStyle: { color: '#1dd58f' }},
                        {value: 3, name: '3',itemStyle: { color: '#00beff' }},
                        {value: 5, name: '5',itemStyle: { color: '#7bbed5' }},
                        {value: 4, name: '4',itemStyle: { color: '#6d45ee' }},
                    ]
                }
            ]
        });

        this.myChart2 = echarts.init(this.$refs.echarts_bar_r);
        this.myChart2.setOption({
            title: {
                text: '南丁格尔玫瑰图',
                subtext: '纯属虚构',
                left: 'center'
            },
            series: [
                {
                    name: '面积模式',
                    type: 'pie',
                    label: {
                        position: 'inner'
                    },
                    roseType: 'area',
                    radius: ['30%', '100%'],
                    data: [
                        {value: 1, name: '1',itemStyle: { color: '#ff5a00' }},
                        {value: 2, name: '2',itemStyle: { color: '#ffc500' }},
                        {value: 3, name: '3',itemStyle: { color: '#1dd58f' }},
                        {value: 3, name: '3',itemStyle: { color: '#00beff' }},
                        {value: 5, name: '5',itemStyle: { color: '#7bbed5' }},
                        {value: 4, name: '4',itemStyle: { color: '#6d45ee' }},
                    ]
                }
            ]
        });
     
    },
    components:{
        BaiduMap,
        mapMarkerClusterer,
        mapMarker
    },
    methods:{
        handler ({BMap, map}) {
            this.center.lng = 121.308090
            this.center.lat = 31.137268
            this.map = map
            this.BMap = BMap
            this.zoom = 12
        },
        resize({type, target, size}	){
            this.map.centerAndZoom(new this.BMap.Point(this.center.lng, this.center.lat), this.zoom)
        },

    }
}
</script>

<style scoped lang='less'>
    
    .big_screen{
        background: url(../assets/images/top.png) #101624 center 3.2vh no-repeat;
        background-size: auto;
        height: 100vh;
        .top_line{
            img{
                width: 100%;
                display: block;
            }
        }
    }
    .monitor_display_nav{
        display: flex;
        color: #fff;
        padding-top: 1.39vh;
        ul{
            overflow: hidden;
            width: 400px;
            padding-left: 60px;
            li{
                float: left;
                height: 4vh;
                line-height: 4vh;
                width: 114px;
                text-align: center;
                background-size: 100% 4vh;
                background-position: left center;
                font-size: 14px;
                background-repeat: no-repeat;
                &:last-child{
                    margin-left: -12px;
                }
            }
            .curColor{
                color: #00d8ff;
            }
        }
        .monitor_display_t{
            flex: 1;
            text-align: center;
            font-size: 24px;
        }
        .monitor_display_time{
            width: 400px;
            text-align: right;
            padding-right: 30px;
            margin-top: 0.925vh;
            font-size: 12px;
            span{
                padding-right: 18px;
            }
        }
    }

    .monitor_display_content{
        display: block;
        margin-top: 3.3vh;
        display: flex;
        padding: 0 20px;
        .monitor_display_left{
            height: 88vh;
            background: url(../assets/images/background1.png) left center no-repeat;
            background-size: 100% 88vh;
            padding:  1.67vh 25px;
            width: 390px;
            box-sizing: border-box;
            h2{
                color: #fff;
                font-size: 15px;
                img{
                    padding-left: 5px;
                }
            }
            .congx{
                img{
                    width: 100%;
                }
            }
            .congxzk{
                margin-top: 3.18vh;
            }
            .congxzk_content{
                background: url(../assets/images/background5.png) left center no-repeat;
                background-size: 100% 100%;
                padding: 1vh 6px 0;
            }
            .congxzk_content_th{
                color: #fff;
                font-size: 12px;
                display: flex;
                span{
                    flex: 1;
                    text-align: left;
                    &:nth-child(3){
                        flex: 1.5;
                    }
                }
            }
            .congxzk_content_list{
                height: 47vh;
                overflow: auto;
            }
            .congxzk_content_tr{
                color: #fff;
                font-size: 12px;
                display: flex;
                padding: 1vh 0;
                align-items: center;
                span{
                   flex: 1;
                    text-align: left;
                    word-break: break-all;
                    &:nth-child(3){
                        flex: 1.5;
                    } 
                }
            }
        }
        .monitor_display_map{
            flex: 1;
        }
        .monitor_display_right{
            height: 88vh;
            box-sizing: border-box;
            background: url(../assets/images/background1.png) left center no-repeat;
            background-size: 100% 88vh;
            padding:  1.67vh 25px;
            width: 390px;
            box-sizing: border-box;
            h2{
                position: relative;
                color: #fff;
                font-size: 15px;
                img{
                    padding-left: 5px;
                }
                .set{
                    position: absolute;
                    right: 0;
                    top: 0;
                    cursor: pointer;
                }
            }
            .congxzk{
                margin-top: 3.18vh;
            }
            .range_car{
                color: #fff;
                font-size: 12px;
                background: url(../assets/images/background4.png) left center no-repeat;
                background-size: 100% 100%;
                height: 16.75vh;
                overflow: auto;
                padding-top: 1.3vh;
                h3{
                    text-align: center;
                    color: #fff;
                    font-size: 12px;
                    margin-bottom: 1vh;
                    em{
                        font-style: normal;
                        font-size: 16px;
                        color: #00dfff;
                    }
                }
                ul{
                    box-sizing: border-box;
                    padding: 0 20px;
                    overflow: hidden;
                    li{
                        float: left;
                        padding-right: 30px;
                        margin-bottom: 6px;
                        span{
                            display: inline-block;
                            width:8px;
                            height:8px;
                            border-radius: 50%;
                            background: #fff;
                            margin-right: 5px;
                        }
                    }
                }
                
            }
            .task_car{
                height: 26vh;
                background: url(../assets/images/background6.png) left center no-repeat;
                background-size: 100% 100%;
                overflow: hidden;
                .task_car_echarts{
                    display: flex;
                    margin-top: 1vh;
                    .yesterday{
                        margin-top: -10px;
                        margin-bottom: 10px;
                    }
                    .task_car_echarts_l{
                        flex: 1;
                        text-align: center;
                        color: #fff;
                        font-size: 12px;
                        .task_car_echarts_map_l{
                             height: 16vh;
                        }
                    }
                    .task_car_echarts_r{
                        flex: 1;
                         color: #fff;
                        font-size: 12px;
                        text-align: center;
                        .task_car_echarts_map_r{
                             height: 16vh;
                        }
                    }
                }
                ul{
                    overflow: hidden;
                    padding: 0 32px;
                    li{
                        float: left;
                        color: #fff;
                        padding-right: 20px;
                        span{
                            display: inline-block;
                            width: 12px;
                            height: 12px;
                            background: #ff5a00;
                            border-radius: 2px;
                            margin-right: 5px;
                        }
                        &:nth-child(2){
                            span{
                             background: #ffc500;   
                            }
                        }
                        &:nth-child(3){
                            span{
                             background: #1dd58f;   
                            }
                        }

                        &:nth-child(4){
                            padding-right: 0px;
                             span{
                             background: #00beff;   
                            }
                        }
                        &:nth-child(5){
                            padding-right: 38px;
                            span{
                             background: #7bbed5;   
                            }
                        }
                        &:last-child{
                            span{
                             background: #6d45ee;   
                            }
                        }
                    }
                }
            }
            .wash_status{
                height: 23vh;
                color: #fff;
                font-size: 12px;
                background: url(../assets/images/background7.png) left center no-repeat;
                background-size: 100% 100%;
                padding: 0 12px;
                overflow: hidden;
                p{
                    margin: 0;
                }
                h4{
                    color: #fff;
                    padding-left: 15px;
                    font-size: 14px;
                    margin-top: 1vh;
                }
                dl{
                    display: flex;
                    
                }
                dt{
                    width: 100px;
                    background: #161e31;
                    text-align: center;
                    margin-right: 10px;
                    img{
                        display: inline-block;
                        margin-top: 5vh;
                    }
                }
                dd{
                    flex: 1;
                }
            }
        }

        .monitor_display_map{
             height: 88vh;
             margin: 0 15px;
            .bm-view{
                height: 88vh;
            }
        }
        
    }
</style>