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

const { google } = require('googleapis');
const sheets = google.sheets('v4');
const path = require('path');

execAPI('1u7TFoWtbeTS0PKKWKKXQ0RfdIgjbuzuQd53hCqOEuao', 'user!B3:E100');

async function execAPI(spreadsheetId, range) {
  const auth = await google.auth.getClient({
    keyFile: path.join(__dirname, 'service_account.json'),
    scopes: ['https://www.googleapis.com/auth/spreadsheets'],
  });

  const apiOptions = {
    auth,
    spreadsheetId,
    range,
  };

  sheets.spreadsheets.values.get(apiOptions, (err, res) => {
    console.log(res.data.values);
  });
}
