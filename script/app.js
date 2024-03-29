var productList = getProductList();
console.log(productList);

nextQuestion();

function getProductList() {
  var request = new XMLHttpRequest();

  request.open('GET', 'https://asia-northeast1-sheetstowebapi.cloudfunctions.net/api?id=1JaOv-aQi13P6gco2AmnmXVxgyHmv6zLIBwZ810mjXes&range=A1:C370', false);
  // request.responseType = 'json';
  request.send();

  if (request.status === 200) {
    var ret = JSON.parse(request.response);
    //      console.log(ret);
    ret.forEach(function(value) {
      // console.log(value.url);
      // console.log(value.product_name);
      // console.log(value.product_detail);
    });
    return ret;
  }
}

function nextQuestion() {

  document.getElementById("text_a").innerHTML = "";
  document.getElementById("text_b").innerHTML = "";
  document.getElementById("text_c").innerHTML = "";

  var tmp = randomPick(productList, 3);
  tmp.forEach(function(value) {
    console.log(value.url);
    console.log(value.product_name);
    console.log(value.product_detail);
  })
  //tmp.sort(function() { Math.random() - .5; });
  var correctNo = Math.floor(Math.random() * 3);

  qa = new Array();
  console.log(correctNo);

  qa = [tmp[0], tmp[1], tmp[2], correctNo];

  //初期設定
  q_sel = 3; //選択肢の数
  setReady(correctNo);
}

//初期設定
function setReady(correctNo) {
  count = 0; //問題番号
  ansers = new Array(); //解答記録
  //最初の問題
  quiz(correctNo);
}

function randomPick(array, num) {
  var a = array;
  var t = [];
  var r = [];
  var l = a.length;
  var n = num < l ? num : l;
  while (n-- > 0) {
    var i = Math.random() * l | 0;
    r[n] = t[i] || a[i];
    --l;
    t[i] = t[l] || a[l];
  }
  return r;
}

//問題表示
function quiz(correctNo) {
  var s, n;
  //問題
  //document.getElementById("text_q").innerHTML = (count + 1) + "問目：" + qa[count][0];
  document.getElementById("text_q").innerHTML = "<p>"+qa[correctNo].product_detail+"</p>";

  //選択肢
  document.getElementById("text_s1").innerHTML = "<a class='btn-square' href='javascript:anser(" + 0 + ")'>" + qa[0].product_name + "</a>";
  document.getElementById("text_s2").innerHTML = "<a class='btn-square' href='javascript:anser(" + 1 + ")'>" + qa[1].product_name + "</a>";
  document.getElementById("text_s3").innerHTML = "<a class='btn-square' href='javascript:anser(" + 2 + ")'>" + qa[2].product_name + "</a>";
}

//解答表示
function anser(num) {
  console.log("num: " + num);
  console.log("qa: " + qa[3]);
  //答え合わせ
  if (num == qa[3]) {
    //正解
    ansers[count] = "○";
  } else {
    ansers[count] = "×";
  }
  document.getElementById("text_a").innerHTML = ansers[count];
  document.getElementById("text_b").innerHTML = "あなたの回答：" + qa[num].product_name;
  document.getElementById("text_c").innerHTML = "正解：" + qa[qa[3]].product_name;
}
