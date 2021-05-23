'use strict';
/**
 * 時、分、秒を秒に変換
 * @return {Number} 合計の秒数
 * @param {Number} 秒、分、時など
 */
function culcToSecond(hour, min, sec) {
  const value = {
    sec: sec,
    min: min * 60,
    hour: hour * 60 * 60
  };
  return (value.sec + value.min + value.hour)
}

//秒を時、分、秒の表記に変換
function culcToTime(count) {
  return {
    min: Math.floor((count / 60) % 60),
    sec: (count % 60).toString().padStart(2, '0')
  }
}

export { culcToSecond, culcToTime };