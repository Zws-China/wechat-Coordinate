
/**
 *  判断经纬度是否超出中国境内
 */
function isLocationOutOfChina(latitude, longitude) {
  if (longitude < 72.004 || longitude > 137.8347 || latitude < 0.8293 || latitude > 55.8271)
    return true;
  return false;
}


/**
 *  将WGS-84(国际标准)转为GCJ-02(火星坐标):
 */
function transformFromWGSToGCJ(latitude, longitude) {
  var lat = "";
  var lon = "";
  var ee = 0.00669342162296594323;
  var a = 6378245.0;
  var pi = 3.14159265358979324;

  if (isLocationOutOfChina(latitude, longitude)) {
    lat = latitude;
    lon = longitude;
  }
  else {
    var adjustLat = transformLatWithXY(longitude - 105.0, latitude - 35.0);
    var adjustLon = transformLonWithXY(longitude - 105.0, latitude - 35.0);
    var radLat = latitude / 180.0 * pi;
    var magic = Math.sin(radLat);
    magic = 1 - ee * magic * magic;
    var sqrtMagic = Math.sqrt(magic);
    adjustLat = (adjustLat * 180.0) / ((a * (1 - ee)) / (magic * sqrtMagic) * pi);
    adjustLon = (adjustLon * 180.0) / (a / sqrtMagic * Math.cos(radLat) * pi);
    latitude = latitude + adjustLat;
    longitude = longitude + adjustLon;
  }
  return { latitude: latitude, longitude: longitude };

}

/**
 *  将GCJ-02(火星坐标)转为百度坐标:
 */
function transformFromGCJToBaidu(latitude, longitude) {  
  var pi = 3.14159265358979324 * 3000.0 / 180.0;

  var z = Math.sqrt(longitude * longitude + latitude * latitude) + 0.00002 * Math.sin(latitude * pi);
  var theta = Math.atan2(latitude, longitude) + 0.000003 * Math.cos(longitude * pi);
  var a_latitude = (z * Math.sin(theta) + 0.006);
  var a_longitude = (z * Math.cos(theta) + 0.0065);

  return { latitude: a_latitude, longitude: a_longitude };
}

/**
 *  将百度坐标转为GCJ-02(火星坐标):
 */
function transformFromBaiduToGCJ(latitude, longitude) {
  var xPi = 3.14159265358979323846264338327950288 * 3000.0 / 180.0;

  var x = longitude - 0.0065;
  var y = latitude - 0.006;
  var z = Math.sqrt(x * x + y * y) - 0.00002 * Math.sin(y * xPi);
  var theta = Math.atan2(y, x) - 0.000003 * Math.cos(x * xPi);
  var a_latitude = z * Math.sin(theta);
  var a_longitude = z * Math.cos(theta);

  return { latitude: a_latitude, longitude: a_longitude };
}

/**
 *  将GCJ-02(火星坐标)转为WGS-84:
 */
function transformFromGCJToWGS(latitude, longitude) {
  var threshold = 0.00001;

  // The boundary
  var minLat = latitude - 0.5;
  var maxLat = latitude + 0.5;
  var minLng = longitude - 0.5;
  var maxLng = longitude + 0.5;

  var delta = 1;
  var maxIteration = 30;

  while (true) {
    var leftBottom = transformFromWGSToGCJ(minLat, minLng);
    var rightBottom = transformFromWGSToGCJ(minLat, maxLng);
    var leftUp = transformFromWGSToGCJ(maxLat, minLng);
    var midPoint = transformFromWGSToGCJ((minLat + maxLat) / 2, (minLng + maxLng) / 2);
    delta = Math.abs(midPoint.latitude - latitude) + Math.abs(midPoint.longitude - longitude);

    if (maxIteration-- <= 0 || delta <= threshold) {
      return { latitude: (minLat + maxLat) / 2, longitude: (minLng + maxLng) / 2 };
    }

    if (isContains({ latitude: latitude, longitude: longitude }, leftBottom, midPoint)) {
      maxLat = (minLat + maxLat) / 2;
      maxLng = (minLng + maxLng) / 2;
    }
    else if (isContains({ latitude: latitude, longitude: longitude }, rightBottom, midPoint)) {
      maxLat = (minLat + maxLat) / 2;
      minLng = (minLng + maxLng) / 2;
    }
    else if (isContains({ latitude: latitude, longitude: longitude }, leftUp, midPoint)) {
      minLat = (minLat + maxLat) / 2;
      maxLng = (minLng + maxLng) / 2;
    }
    else {
      minLat = (minLat + maxLat) / 2;
      minLng = (minLng + maxLng) / 2;
    }
  }

}

function isContains(point, p1, p2) {
  return (point.latitude >= Math.min(p1.latitude, p2.latitude) && point.latitude <= Math.max(p1.latitude, p2.latitude)) && (point.longitude >= Math.min(p1.longitude, p2.longitude) && point.longitude <= Math.max(p1.longitude, p2.longitude));
}

function transformLatWithXY(x, y) {
  var pi = 3.14159265358979324;
  var lat = -100.0 + 2.0 * x + 3.0 * y + 0.2 * y * y + 0.1 * x * y + 0.2 * Math.sqrt(Math.abs(x));
  lat += (20.0 * Math.sin(6.0 * x * pi) + 20.0 * Math.sin(2.0 * x * pi)) * 2.0 / 3.0;
  lat += (20.0 * Math.sin(y * pi) + 40.0 * Math.sin(y / 3.0 * pi)) * 2.0 / 3.0;
  lat += (160.0 * Math.sin(y / 12.0 * pi) + 320 * Math.sin(y * pi / 30.0)) * 2.0 / 3.0;
  return lat;
}

function transformLonWithXY(x, y) {
  var pi = 3.14159265358979324;
  var lon = 300.0 + x + 2.0 * y + 0.1 * x * x + 0.1 * x * y + 0.1 * Math.sqrt(Math.abs(x));
  lon += (20.0 * Math.sin(6.0 * x * pi) + 20.0 * Math.sin(2.0 * x * pi)) * 2.0 / 3.0;
  lon += (20.0 * Math.sin(x * pi) + 40.0 * Math.sin(x / 3.0 * pi)) * 2.0 / 3.0;
  lon += (150.0 * Math.sin(x / 12.0 * pi) + 300.0 * Math.sin(x / 30.0 * pi)) * 2.0 / 3.0;
  return lon;
}



module.exports = {
  isLocationOutOfChina: isLocationOutOfChina,
  transformFromWGSToGCJ: transformFromWGSToGCJ,
  transformFromGCJToBaidu: transformFromGCJToBaidu,
  transformFromBaiduToGCJ: transformFromBaiduToGCJ,
  transformFromGCJToWGS: transformFromGCJToWGS
}
