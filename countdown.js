'use strict'
import { culcToSecond, culcToTimeDisplay, toDoubleDigits } from './time-handle-util.js';
import { removeAllChildren, createBtn, replaceSetButton, buttonEventListener  } from './button-util.js';

let countNum = 0;
let interVal = null;// setInterval代入用

buttonEventListener('threeMin', 'click', getThreeBtn);
buttonEventListener('fourMin', 'click',  getFourBtn);
buttonEventListener('fiveMin', 'click', getFiveBtn);
//時間設定&ボタン置き換え実行用関数
function setTimer() {  
  if (countNum > 0) {
    removeAllChildren('settingArea');
    createBtn('settingArea', 'start', '<i class="fas fa-play"></i> Start');  
    buttonEventListener('start', 'click', start);
    document.getElementById('timeArea').innerText =
    `${culcToTimeDisplay (countNum).min}:${toDoubleDigits(culcToTimeDisplay(countNum).sec)}`;
  }
}
//ボタンのvalueを受け取ってセットする
function getThreeBtn() {
  const three = parseInt(document.getElementById('threeMin').value);
  countNum = culcToSecond(0, three, 0);
  setTimer();
}
function getFourBtn() {
  const four = parseInt(document.getElementById('fourMin').value);
  countNum = culcToSecond(0, four, 0);
  setTimer();
}
function getFiveBtn() {
  const five = parseInt(document.getElementById('fiveMin').value);
  countNum = culcToSecond(0, five, 0);
  setTimer();
}
//カウントダウン実行関数
function start() {
    removeAllChildren('settingArea');
    replaceSetButton();
    buttonEventListener('pause', 'click', pause);
    buttonEventListener('reset', 'click', reload);
    interVal = setInterval(() => {
      countNum --;
      document.getElementById('timeArea').innerText =
      `${culcToTimeDisplay(countNum).min}:${toDoubleDigits  (culcToTimeDisplay(countNum).sec)}`;
        if (countNum === 0) {
        removeAllChildren('settingArea');
        createBtn('settingArea', 'alarmStop', '<i class="fas fa-volume-mute fa-lg"></i> Sound Stop');
        createBtn('settingArea', 'reset', '<i id="resetIcon" class="fas fa-redo"></i> Reset');
        buttonEventListener('alarmStop', 'click', mute);
        buttonEventListener('reset', 'click', reload);
        alarm();//アラーム音
        stopTimer();
      }
    }, 1000);
}
//タイマー一時停止関数
function pause() {
    clearInterval(interVal);
    removeAllChildren('settingArea');
    createBtn('settingArea', 'startShort', '<i class="fas fa-play"></i> Re Start');
    createBtn('settingArea', 'reset', '<i class="fas fa-redo"></i> Reset'); 
    buttonEventListener('startShort', 'click', start);
    buttonEventListener('reset', 'click', reload); 
}
//タイマー停止関数
function stopTimer() {
  clearInterval(interVal);
}
//リセット、再読み込みする。
function reload() {
  location.reload();
}
//アラーム鳴らす関数
function alarm() {
  const audio = document.getElementById('alarm');
  audio.play();
}
//アラーム止める関数
function mute() {
  const audio = document.getElementById('alarm');
  audio.pause();
}