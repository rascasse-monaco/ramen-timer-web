'use strict';
/**
 * 時、分、秒を秒に変換
 * @return {Number} 合計の秒数
 * @param {Number} 秒、分、時など
 */
function culcToSecond(hour, min, sec) {
  const inputNum = {
    sec: sec,
    min: min * 60,
    hour: hour * 60 * 60
  };
  return (inputNum.sec + inputNum.min + inputNum.hour)
}
//秒を時、分、秒の表記に変換
function culcToTimeDisplay(Num) {
  return {
    hour: Math.floor(Num / 60 / 60),
    min: Math.floor((Num / 60) % 60),
    sec: Num % 60
  }
}
/**
 * 10の位に0を挿入して数字の桁数を合わせる
 * @return {String} 0を足した文字列
 * @param {Number} num 秒、分など
 */
function toDoubleDigits(num){
  num += '';
  if (num.length === 1) {
    return num = `0${num}`;
  } else {
    return num;
  }
}

export { culcToSecond, culcToTimeDisplay, toDoubleDigits };