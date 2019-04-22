
# wechat-Coordinate
微信小程序经纬度转换，坐标系转换💯 WGS-84(国际标准)、GCJ-02(火星坐标) 、百度坐标相互转换

此转换库为本地坐标转换库，不需要依赖网络资源，计算速度高。可在极短时间内转换大量坐标。
如果使用过程中有问题，请issue我 (｡♥‿♥｡)  <br>
如果觉得对你还有些用，顺手点一下star吧 (｡♥‿♥｡) <br>

# Demo截图
![在这里插入图片描述](https://img-blog.csdnimg.cn/2019012411184361.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3FxXzI2NTk4MDc3,size_16,color_FFFFFF,t_70)
# 方法
提供以下方法

```ruby
/**
 *  判断经纬度是否超出中国境内
 */
function isLocationOutOfChina(latitude, longitude) 

/**
 *  将WGS-84(国际标准)转为GCJ-02(火星坐标):
 */
function transformFromWGSToGCJ(latitude, longitude)

/**
 *  将GCJ-02(火星坐标)转为百度坐标:
 */
function transformFromGCJToBaidu(latitude, longitude) 

/**
 *  将百度坐标转为GCJ-02(火星坐标):
 */
function transformFromBaiduToGCJ(latitude, longitude) 

/**
 *  将GCJ-02(火星坐标)转为WGS-84:
 */
function transformFromGCJToWGS(latitude, longitude) 

```
# 如何使用
下载此项目，将项目中的WSCoordinate.js复制到您的项目根目录utils文件夹(或其他文件夹)。

在您要使用的页面对应的.JS文件中引入
```ruby
    var util = require('../../utils/WSCoordinate.js')  
```

在您需要转换的地方使用
```ruby

    //将WGS-84(国际标准)转为GCJ-02(火星坐标)
    var result1 = util.transformFromWGSToGCJ(32.0806670849, 118.9060163095);
    
    // 将GCJ-02(火星坐标)转为百度坐标
    var result2 = util.transformFromGCJToBaidu(32.0806670849, 118.9060163095);

    //将百度坐标转为GCJ-02(火星坐标)
    var result3 = util.transformFromBaiduToGCJ(32.0806670849, 118.9060163095);

    //将GCJ-02(火星坐标)转为WGS-84
    var result4 = util.transformFromGCJToWGS(32.0806670849, 118.9060163095);

```
方法的返回值result是一个对象，格式为
```ruby
{
	latitude: 纬度的值, 
	longitude: 经度的值
}
```


#### github下载地址：[https://github.com/Zws-China/wechat-Coordinate](https://github.com/Zws-China/wechat-Coordinate)

如果使用过程中有问题，请issue我 (｡♥‿♥｡)  <br>
如果觉得对你还有些用，顺手点一下star吧 (｡♥‿♥｡)   你的支持是我继续的动力。<br>

