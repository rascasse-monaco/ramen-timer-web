'use strict'
import { culcToSecond, culcToTime } from './time-handle-util.js';
import { RemoveElement, EventListener, CreateChildElement } from './dom-util.js';

const eventListener = new EventListener();
const removeElement = new RemoveElement();
const createChildElement = new CreateChildElement();

let count = 0;
let interVal = null;// setInterval代入用
let progressMaxValue = 0;//プログレスバー計算用最大値
// ボタンへイベントリスナー追加
new Promise((resolve) => { // 3分ボタン
  eventListener.getId('threeMin');
  resolve();
})
.then(() => {
  return new Promise((resolve) => {
    eventListener.add('click', () => { getButtonValue('threeMin'); });
    resolve();
  });
})
.then(() => { // 4分ボタン
  return new Promise((resolve) => {
    eventListener.getId('fourMin');
    resolve();
  });
})
.then(() => {
  return new Promise((resolve) => {
    eventListener.add('click', () => { getButtonValue('fourMin'); });
    resolve();
  });
})
.then(() => { // 5分ボタン
  return new Promise((resolve) => {
    eventListener.getId('fiveMin');
    resolve();
  });
})
.then(() => {
  return new Promise((resolve) => {
    eventListener.add('click',  () => { getButtonValue('fiveMin'); });
    resolve();
  });
});

//ボタンのvalueを受け取ってセットする
function getButtonValue(id) {
  const value = parseInt(document.getElementById(id).value);
  count = culcToSecond(0, value, 0);
  if (count > 0) {
    document.getElementById('num').innerText =
    `${culcToTime(count).min}:${culcToTime(count).sec}`;
    start();
  }
  progressMaxValue = count;
}

//カウントダウン実行関数
function start() {
    removeElement.removeAllChildren('settingArea');
    createChildElement.getParentElement('settingArea');
    createChildElement.create('button', 'button', 'pause', '<i class="fas fa-pause"></i> Pause');
    createChildElement.getParentElement('settingArea');
    createChildElement.create('button', 'button', 'reset', '<i class="fas fa-redo"></i> Reset');

    eventListener.getId('pause');
    eventListener.add('click', pause);
    eventListener.getId('reset');
    eventListener.add('click', reload)

    interVal = setInterval(() => {
      count --;
        //プログレスバーの表示
        let progressNowValue = count;
        let progressValuePercentage = (Math.round((1 - progressNowValue / progressMaxValue) * 100)) + '';
        removeElement.removeAllChildren('progressArea');
        const progressArea = document.getElementById('progressArea');
        const progress = document.createElement('progress');
              progress.setAttribute('id', 'progressBar');
              progress.setAttribute('value', `${progressValuePercentage}`);
              progress.setAttribute('max', '100');
        progressArea.appendChild(progress);
        const percentage = document.createElement('div');
              percentage.setAttribute('id', 'percentage');
              percentage.innerText = `${progressValuePercentage}%`;
        progressArea.appendChild(percentage);
      //残り時間の表示
      document.getElementById('num').innerText =
      `${culcToTime(count).min}:${culcToTime(count).sec}`;
        //ゼロになったら止める
      if (count === 0) {
        clearInterval(interVal);
        removeElement.removeAllChildren('settingArea');
        createChildElement.getParentElement('settingArea');
        createChildElement.create('button', 'button', 'alarmStop', '<i class="fas fa-volume-mute fa-lg"></i> Stop  (<i class="fas fa-redo"></i> Reset)')
        eventListener.getId('alarmStop');
        eventListener.add('click', mute);

        alarm();//アラーム音
      }
    }, 1000);
}
//タイマー一時停止関数
function pause() {
    clearInterval(interVal);
    removeElement.removeAllChildren('settingArea');
    createChildElement.getParentElement('settingArea');
    createChildElement.create('button', 'button', 'startShort', '<i class="fas fa-play"></i> Re Start');
    createChildElement.getParentElement('settingArea');
    createChildElement.create('button', 'button', 'reset', '<i class="fas fa-redo"></i> Reset')

    eventListener.getId('startShort');
    eventListener.add('click', start);

    eventListener.getId('reset');
    eventListener.add('click', reload);
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
  reload();
}