// 変数定義
let isPlaying = false
let tapCount, time = 0
const tapBtn    = document.getElementById('js-tapBtn')
const startBtn  = document.getElementById('js-startBtn')
const countText = document.getElementById('js-count')
const timeText  = document.getElementById('js-time')

// ゲームの初期値設定
const setGame = () => {
  tapCount = 0
  time = 10000
  countText.innerText = tapCount
  timeText.innerHTML = time / 1000
}
setGame()

// タップした時にカウントを増やす
tapBtn.addEventListener('click', () => {
  if (!isPlaying) return false
  tapCount++
  countText.innerText = tapCount
})

// STARTボタンを押してゲームをスタートさせる
startBtn.addEventListener('click', () => {
  setGame()
  isPlaying = true
  tapBtn.disabled = false
  startBtn.style.display = 'none'

  const timer = setInterval( () => {
    time -= 10
    timeText.innerHTML = (time / 1000).toFixed(2)

    if (time === 0) {
      clearInterval(timer)
      isPlaying = false
      startBtn.style.display = 'inline-block'
      startBtn.innerText = 'もう一回'
    }
  }, 10)
})

    var request = new XMLHttpRequest();
 
    request.open('GET', 'https://asia-northeast1-sheetstowebapi.cloudfunctions.net/api?id=1u7TFoWtbeTS0PKKWKKXQ0RfdIgjbuzuQd53hCqOEuao&range=user!B3:E100', true);
    request.responseType = 'json';
 
    request.onload = function () {
      var data = this.response;
      console.log(data);
