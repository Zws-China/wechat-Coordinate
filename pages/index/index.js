var util = require('../../utils/WSCoordinate.js')  


Page({

  data: {
    results:[],
    types: ["将WGS-84(国际标准)转为GCJ-02(火星坐标)", "将GCJ-02(火星坐标)转为百度坐标", "将百度坐标转为GCJ-02(火星坐标)", "将GCJ-02(火星坐标)转为WGS-84"]
  },

  onLoad: function (options) {
    var array = [];

    //举例子：我们以经纬度 1 为例进行转换

    /**
     * 将WGS-84(国际标准)转为GCJ-02(火星坐标)
     */
    var result1 = util.transformFromWGSToGCJ(32.0806670849, 118.9060163095);
    console.log("result1 = ",result1)
    array.push(result1);
    
    /**
     * 将GCJ-02(火星坐标)转为百度坐标
     */
    var result2 = util.transformFromGCJToBaidu(32.0806670849, 118.9060163095);
    console.log("result2 = ",result2)
    array.push(result2);

    /**
     * 将百度坐标转为GCJ-02(火星坐标)
     */
    var result3 = util.transformFromBaiduToGCJ(32.0806670849, 118.9060163095);
    console.log("result3 = ",result3)
    array.push(result3);

    /**
     * 将GCJ-02(火星坐标)转为WGS-84
     */
    var result4 = util.transformFromGCJToWGS(32.0806670849, 118.9060163095);
    console.log("result4 = ",result4)
    array.push(result4);
    this.setData({ results: array })
  },

})