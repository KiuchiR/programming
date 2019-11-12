/*
 * グローバル変数の定義
 */
var strX, strY;
var potX, potY;
var freeX, freeY;
 freeX = Number(freeX)
 freeY = Number(freeY)
 strX,strY = Number(strX, strY)
var eneX, eneY;

var row = 3, col = 3; // フィールドの大きさを定義
 row = Number(row);
 col = Number(col);

var x;
var y;
 x, y = Number(x, y);


var depth = 1
 depth = Number(depth)
var pNum = 0
 pNum = Number(pNum)

//ステータス関連
var maxHP;
var nowHP;
var nowExp = 0;
var att;
var dif;
var spe;
maxHP, att, dif, spe, nowHP= Number(maxHP, att, dif, spe, nowHP);

//敵ステータス関連
var eHP = 0;
var eAtt
var eDif
var eSpe
eHP, eAtt, eDif, eSpe = Number(eHP, eAtt, eDif, eSpe);

var minHP = 15;
var minAtt = 5;
var minDif = 5;
var minSpe = 5;
minHP, minAtt, minDif, minSpe, sibire = Number(minHP, minAtt, minDif, minSpe, sibire);

//ステータス変化系
var dam = 0;
var cHP = 0;
var cAtt = 0;
var cSpe = 0;
var cDif = 0;
var exp = 0;
var nExp = 10;
var lvl = 1;

//シビレカウント
var sibire = 0;
sibire = Number(sibire);

//デバッグ用
var j;

//敵の名前が入る
var enemyName;

//選んだお菓子が入る
var snack = 0;

//階段が歩かないか
var strs = 0;


// bodyの最後まで読み込み終わったら呼ばれる
window.onload = function(){
alert("どうも、こんにちは");
sweet();
}



function sweet(){

//好きなスイーツ設定

sweets = window.prompt("a)ケーキ　b)キャラメル　c)クッキー　d）アメ　e)すこんぶ　だったらどれが好きですか？", "");

//デバッグコマンド入力用。基礎値は自動的に最強に設定。
if(sweets == "de"){
  sweets = window.prompt("デバッグ用コマンド入力","")
  sibire = 100;
  setup();
}
else if (sweets == "a"){
  alert("ではケーキが盗まれたことにしましょう。");
  snack = "ケーキ"
  setup();}

else if (sweets == "b"){
  alert("ではキャラメルが盗まれたことにしましょう。");
  snack = "キャラメル"
  setup();}

else if (sweets == "c"){
  alert("ではクッキーが盗まれたことにしましょう。");
　snack = "クッキー"
  setup();}

else if (sweets == "d"){
  alert("ではアメが盗まれたことにしましょう。");
　snack = "アメ"
  setup();}

else if (sweets == "e"){
  alert("ではすこんぶが盗まれたことにしましょう。");
  snack = "すこんぶ"
  setup();}

//invalidな回答をするとシビレを切らす。

else if (sibire == 0){
  alert("記号で回答です");
  sibire = sibire + 1;
  sweet();}

  else if (sibire == 1){
  alert("記号は半角でお願いします");
  sibire = sibire + 1;
  sweet();}

  else if (sibire == 2){
  alert("分かります？半角って(笑)");
  sibire = sibire + 1;
  sweet();}

  else if (sibire == 3){
  alert("貴方がわざと間違えていると断定しました")
  alert("ゲームを辛口モードで実行します")
  setup();}

}

//フィールドのセットアップ

function setup(){
  alert("good luck!")
  // フィールド（テーブル）を初期化
  var table = document.getElementById('field');
  initField(table);

  // 宝を埋める

  makeStairs(x, y);
  makePotion(x, y);
  makeFreeSpace(x, y);
  makestats();
  makeEnemy(x, y);

  // debug
  // 宝の位置を表示する
  console.log(strX, strY);
  console.log(potX, potY);
  console.log(eneX, potY);
}

//階段を降りたときに発動。フィールドを初期化

function newField(){


　//階層を変える
  depth = depth + 1;

  document.getElementById("depth").innerHTML = "dlvl" + depth


  //フィールド各マスの状態を未探索にして黒く塗りつぶす
  for ( y = 0; y < col; y++) {
   for ( x = 0; x < row; x++) {
     var on = document.getElementById(y*10+x);
     on.setAttribute("name", "unfound");
     on.setAttribute("style", 'background-color:rgb(0,0,0);');
    }
   }

 if(strs == "1"){
 document.getElementById("img").innerHTML = ""
 document.getElementById("img").setAttribute('id',"");
}

  //階段はまだない
  strs = 0


  // いろいろ埋めなおす

  var x ,
      y;
      x = Number(x);
      y = Number(y);

  makeStairs(x, y);
  makePotion(x, y);

  //最初の一マスを作り、さらにそこを灰色にする

  makeFreeSpace(x, y);

//デバッグ
console.log(strX, strY);
console.log(potX, potY);
}
/**
 * フィールドを描画する
 */
function initField(table) {
  // rowとcolはグローバル変数
  for ( y = 0; y < col; y++) {
    var tr = document.createElement('tr');
    for ( x = 0; x < row; x++) {
      var td = document.createElement('td');

      //個別にidをつける。xが一の位、yが十の位と考えて数を生成。
      var id = y*10+x;
      td.setAttribute('id', id);
      td.setAttribute('onclick', 'judge('+x+','+y+',' + id + ');'); //onclick="judge(x, y, id);"
      td.setAttribute("name","unfound");
      tr.appendChild(td);

    }
    table.appendChild(tr);
  }
}



/**
 * いろいろセット
 *
 */
function makeStairs(x, y) {
  strX = Math.floor((Math.random() * row)),
  strY = Math.floor((Math.random() * col));
  if (depth == 5){
    strX = 100;
    strY = 100;
  }
}

//potionを置く
function makePotion(x, y){
  potX = Math.floor((Math.random() * row)),
  potY = Math.floor((Math.random() * col));
}

//初めの一マスを作る
function makeFreeSpace(x, y){
   freeX = Math.floor((Math.random() * row)),
   freeY = Math.floor((Math.random() * col));
   document.getElementById(freeY*10+freeX).setAttribute('style', 'background-color:rgb(204,204,204);');
   document.getElementById(freeY*10+freeX).setAttribute('name', 'found');
}

//敵を配置
function makeEnemy(x, y){
  if(sweets == "nE"){eneX = 100, eneY = 100}
  else{
  eneX = Math.floor((Math.random() * row)),
  eneY = Math.floor((Math.random() * col));
}
}


//主人公の初期ステータスを入力
function makestats(){
  var bHP;
  var bAtt;
  var bDif;
  var bSpe;

  bHP, bAtt, bDif, bSpe = Number(bHP, bAtt, bDif, bSpe)

  //デバッグの時のステータス。関数はsibireを流用。
  if(sibire == 100){
    minHP = 100;
    minAtt = 20;
    minDif = 20;
    minSpe = 20;
  }

  //選んだスイーツでステータスが少し変わる。実はすこんぶも結構弱い。
  else if(sweets == "a"){minHP = 20;}
  else if(sweets == "b"){minAtt = 10;}
  else if(sweets == "c"){minDif = 10;}
  else if(sweets == "d"){minSpe = 10;}
  else if(sweets == "e"){
    minHP = 10;
    minAtt = 2;
    minDif = 2;
    minSpe = 2;
  }
  else{
    minHP = 5;
    minAtt = 0;
    minDif = 0;
    minSpe = 0;
  }


　　//ステータスの乱数決定部分
   bHP = Math.floor((Math.random() * 15));
   bAtt = Math.floor((Math.random() * 5));
   bDif = Math.floor((Math.random() * 5));
   bSpe = Math.floor((Math.random() * 5));

   maxHP = bHP + minHP;
   att = bAtt + minAtt;
   dif = bDif + minDif;
   spe = bSpe + minSpe;

  nowHP=maxHP;

 document.getElementById("HP").innerHTML = nowHP + "/" + maxHP;
 document.getElementById("att").innerHTML = att;
 document.getElementById("dif").innerHTML = dif;
 document.getElementById("spe").innerHTML = spe;
 document.getElementById('exp').innerHTML = nowExp + "/" + nExp;
 document.getElementById('lvl').innerHTML = lvl;
}


//探索不可か否かの判定
function judge(x, y, id){

  //敵のhpが１以上の時は探索不可。
  if (eHP > 0){
    alert("敵から逃げることはできない！");
    enemyAttack();
  }

  //そのマスのnameがunfoundの時は探索不可。
  else if(document.getElementById(id).getAttribute("name") == "unfound"){
    alert("too dark to see");
  }
   //探索済みの所は探索不可。
   else{
     if(document.getElementById(id).getAttribute("name") == "nothing"){
      alert("you see nothing here")}

       //それ以外は探索可。
        else {explore(x, y, id);}}

}

/**
 *指定されたところが探索可能なら働く
 */
function explore(x, y, id) {

  id = Number(id);

 document.getElementById(id).setAttribute('style', 'background-color:rgb(255,255,255);');

 document.getElementById(id).setAttribute('name', 'found');

//灰色の部分を作るための準備。前後左右のidを数式的に表示。
 var down = document.getElementById(id+10);
 var up = document.getElementById(id-10);
 var left = document.getElementById(id-1);
 var right = document.getElementById(id+1);

//選んだところの上下左右を灰色にするコード。それぞれの端っこのマスを指定したときもエラーが出ないようにした。
 if((!(y == row-1)) && down.getAttribute("name") == "unfound"){
  down.setAttribute('style', 'background-color:rgb(204,204,204);');
  down.setAttribute('name','dim');}

 if(!(y == 0) && up.getAttribute("name") == "unfound"){
  up.setAttribute('style', 'background-color:rgb(204,204,204);');
  up.setAttribute("name","dim");}

 if(!(x == 0) && left.getAttribute("name") == "unfound"){
  left.setAttribute('style', 'background-color:rgb(204,204,204);');
  left.setAttribute("name","dim");}

 if(!(x == col-1) && right.getAttribute("name") == "unfound"){
  right.setAttribute('style', 'background-color:rgb(204,204,204);');
  right.setAttribute("name","dim");}


  //何か見つかったか検査。
  if (foundStairs(x, y) == true) {
    stairs(id);
  }
  else {if(foundEnemy(x,y) == true){
    enemy(id);
  }
  else {if(foundPotions(x,y) == true){
    potion(id);
  }
  else {alert("you see nothing here");}
}
}
}

/**
 * 渡されたx, yの位置に階段があるか判定する
 *
 *
 */
function foundStairs(x, y) {
  if (x === strX && y === strY) {
    return true;
  } else {
    return false;
  }
}

//敵がいるかチャレンジ。
function foundEnemy(x, y) {
  if (x === eneX && y === eneY) {
    return true;
  } else {
    return false;
  }
}

//渡されたx, yの位置にポーションがあるか判定する
function foundPotions(x, y) {
  if (x === potX && y === potY) {
    return true;
  } else {
    return false;
  }
}

/*
 * 階段を発見した時に呼ばれる関数
 */
 function stairs(id) {
   //デバッグの時,階段を好きなものにできる。
   if(sibire == 100){izumi(id);}
   // 階段があった場所を赤く塗りつぶす
   else{document.getElementById(id).innerHTML = "<div id= 'img'><img src ='20131223drakaidan.jpg' width = '100%' height = '100%' name='kaidan'></div>";
   alert('you see here a stairs.');
   strs = 1;
   godown();}
 }

//ポーションがあったときのアレ
 function potion(id) {

   // ポーションがあった場所を探索済みにする
   document.getElementById(id).setAttribute('style', 'background-color:rgb(255,255,255);');
   document.getElementById(id).setAttribute("name","nothing");

   //ポーションの種類を決め、持ち物に入れる
   potions(id);
 }

//敵がいたときのアレ
function enemy(id){
  //敵がいた場所を探索済みにする
  document.getElementById(id).setAttribute('style', 'background-color:rgb(255,255,255);');
  document.getElementById(id).setAttribute("name","nothing");
  //交戦状態に入る
  enemys(id);
}

 //階段を下る？
function godown(){
descend = window.prompt("will you go down?(y/n)", "");
if(descend == "y"){
  newField();
}
}

function goUp(){
  depth = depth - 2
  if(depth < 0){
    alert("これ以上は上がれない！");
    depth = 1
  }
  else{
    newField();
  }
}

/*
*
*以下、武器道具その他もろもろのデータ等。
*
*
*/


//見つかるポーションを決める
function potions(){
  which_potion = ["potionA","potionB","potionC","potionD","potionE"];
  var poti = document.getElementById('potions').innerHTML;
 //ここに薬の名前が入る
  var potion_name
  //ランダムな薬を決める
  var pot  = Math.floor(Math.random()*5);

　//デバッグコード。薬を固定できる。
  if(sweets == "heal"){
    pot = 0}//薬を回復薬に固定
  if(sweets == "poison"){
    pot = 1}//薬を毒薬に固定
  if(sweets == "energy"){
    pot = 3}//薬を増強剤に固定
  if(sweets == "hp"){
    pot = 2}//薬を体力剤に固定
  if(sweets == "wind"){
    pot = 4}//薬を風の薬に固定

//ランダムな薬に飛ばす
  eval(which_potion[pot])(potion_name, poti);
 }

//見つかったのはどの薬？

function potionA(potion_name, poti){
potion_name="回復薬";
potionType = "Heal"
pNum = pNum + 1
getPotion(potion_name, poti);}

function potionB(potion_name, poti){
potion_name = "毒薬"
potionType = "Poison"
pNum = pNum + 1
getPotion(potion_name, poti);}

function potionC(potion_name, poti){
potion_name = "体力剤";
potionType = "HP"
pNum = pNum + 1
getPotion(potion_name, poti);}


function potionD(potion_name, poti){
potion_name = "増強剤"
potionType = "Energy"
pNum = pNum + 1
getPotion(potion_name, poti);
}

function potionE(potion_name, poti){
potion_name = "風の薬"
potionType = "Wind"
pNum = pNum + 1
getPotion(potion_name, poti);
}

//見つけた薬をバッグにれる

function getPotion(potion_name, poti){
  var pId = pNum
  alert(potion_name+"を見つけた");
  poti = poti + "<li>" + potion_name + "<input type='button'  id = 'p" + pId + "' value='使う' onclick='use" + potionType + "Potion("+ pId + ");'>" + "</li>" ; //name='pId' onclick = 'use+PotionType+Potion();'
  document.getElementById('potions').innerHTML = poti;
}

  //薬効
function useHealPotion(pId){
   alert("回復薬を使った");
    dam = -20
    changeStats();
   usedP(pId);
   if(eHP > 0){
     enemyAttack();
   }
 }

function usePoisonPotion(pId){
   alert("毒薬を使った");
   dam = 20
    if(eHP > 0){
      alert(enemyName + "に" + dam + "ダメージを与えた！");
      changeEStats();
      usedP(pId);
      if(eHP > 0){
      enemyAttack();
    }
  }
    else{
    changeStats();
    usedP(pId);
   }
  }

function useHPPotion(pId){
    alert("体力剤を使った");
    cHP = 5;
    changeStats();
    usedP(pId);
    if(eHP > 0){
      enemyAttack();
    }
  }

function useEnergyPotion(pId){
    alert("増強剤を使った");
    cAtt = 3;
    changeStats();
    usedP(pId);
    if(eHP > 0){
      enemyAttack();
    }
  }

function useWindPotion(pId){
  alert("風の薬を使った");
  cSpe = 4;
  changeStats();
  usedP(pId);
  if(eHP > 0){
    enemyAttack();
  }
}



//ポーション使ったあとの処理
function usedP(pId){
      document.getElementById("p" + pId).setAttribute("onclick","areadyUsed();" );
      document.getElementById("p" + pId).setAttribute("value","使用済み");

      //デバッグ

      console.log("p" + pId)}


//使用済みだった…
function areadyUsed(){
  alert("使用済みだった…");
}

//見つかるポーションを決める
function enemys(){
  whichEnemy = ["enemyA","enemyB","enemyC","enemyD","enemyE","boss"];

   console.log(depth)
  //ランダムな敵を決める。下層に行くごとに少し強い敵にシフトする。第五層では必ずボスが出る。
  var ene = Math.floor(Math.random()*2) + depth - 1;
      if(depth == 5){ene = 5;}

   　//デバッグコマンド。見つかる敵を指定できる。
    if(sweets == "lichen"){ene = 0}; //苔の妖精しか出ない
    if(sweets == "goblin"){ ene = 1}; //ゴブリンしか出ない
    if(sweets == "dwarf"){ene = 2}; //ドワーフしか出ない
    if(sweets == "ork"){ene = 3}; //オークしか出ない
    if(sweets == "devil"){ene = 4}; //悪魔しか出ない
    if(sweets == "majin"){ene = 5}; //お菓子の魔人しか出ない

      //console
      console.log(depth)

　　//ランダムな敵を出す
    eval(whichEnemy[ene])();
   }

//各種敵ステータス。
function enemyA(){
  enemyName = "苔の妖精";
  eHP = 10;
  eAtt = 12;
  eDif = 2;
  eSpe = 9;
  exp = 5;
  battle();
}

function enemyB(){
  enemyName = "ゴブリン";
  eHP = 20;
  eAtt = 15;
  eDif = 3;
  eSpe = 8;
  exp = 10;
  battle();
}

function enemyC(){
  enemyName = "ドワーフ";
  eHP = 30;
  eAtt = 17;
  eDif = 4;
  eSpe = 3;
  exp = 20;
  battle();
}

function enemyD(){
  enemyName = "オーク";
  eHP = 50;
  eAtt = 20;
  eDif = 2;
  eSpe = 1;
  exp = 30;
  battle();
}

function enemyE(){
  enemyName = "悪魔";
  eHP = 50;
  eAtt = 30;
  eDif = 3;
  eSpe = 10;
  exp = 50;
  battle();
}

//お菓子の魔人は遭遇したときにセリフが入る。
function boss(){
  enemyName = "お菓子の魔神";
 if(sibire == 100){
    alert("うわっ、誰だお前！")
    alert("は？デバッグ？しらんがな…")
  }
  else if(snack == 0){
   alert("辛口モードでここまで来たとか…")
   alert("暇かよ…")
  }
  else{
    alert("よくぞここまで来た。誉めてやろう。")
    alert("良いだろう、" + snack + "は返してやる")
    alert("ただし…")
    alert("私を倒せたらの話だがな！")
  }
  eHP = 100;
  eAtt = 40;
  eDif = 5;
  eSpe = 7;
  exp = 100;
  battle();
}

//いざ勝負
function battle(){
  alert(enemyName + "が現れた！");

  //敵を出す
  document.getElementById('eName').innerHTML = enemyName;
  document.getElementById('eHP').innerHTML = eHP;

  //戦闘は自動で行われないので、それを行うためのボタンを作る。
  document.getElementById('fightButton').innerHTML = "<input type = 'button' value = '戦う' onclick = 'startBattle();'>";
}

//勝負のシステム
function startBattle(){



  //素早さで攻撃の順番を決める。changeStats();は回復薬とかとシステムを共有しているので、ダメージのメッセージはここで。
  if(eSpe > spe){
    dmg();
    alert(enemyName + "の攻撃！");
    changeStats();
    if(nowHP > 0){
      eDam();
      alert( "あなたの攻撃！");
      alert(enemyName + "に" + dam + "ダメージを与えた！");
      changeEStats();
    }
  }
  else{
    eDam();
    alert( "あなたの攻撃！");
    alert(enemyName + "に" + dam + "ダメージを与えた！");
    changeEStats();
    if(eHP > 0){
      dmg();
      alert(enemyName + "の攻撃！");
      changeStats();
    }
  }
}


//敵の一方的な攻撃。戦闘時に薬を使った時などに使う。
function enemyAttack(){
  alert(enemyName + "の攻撃！");
  dmg();
  changeStats();
}

//戦闘時ダメージ計算式
function dmg(){
  dam = eAtt + Math.floor(Math.random()*7) - 3 - dif;
  if(dam<0){dam = 0;}
}

function eDam(){
  dam = att + Math.floor(Math.random()*7) - 3 - eDif;
  if(dam<0){dam = 0;}
}


//ステータス操作

function changeStats(){

      //各種ステータス計算
      nowHP = nowHP - dam;
      maxHP = maxHP + cHP;
      att = att + cAtt;
      spe = spe + cSpe;
      dif = dif + cDif;

      //今のhpは最大を超えない。
      if(nowHP>maxHP){nowHP = maxHP};


      //html上書き
      document.getElementById('HP').innerHTML = nowHP + "/" + maxHP;
      document.getElementById('att').innerHTML = att;
      document.getElementById('spe').innerHTML = spe;
      document.getElementById('dif').innerHTML = dif;


      if(dam > 0 || (eHP > 0 && dam == 0)){
        alert("あなたは" + dam + "ダメージを受けた");
      }

      if(dam < 0){
        alert(-dam + "回復した")
      }

      if(cAtt > 0){
        alert("攻撃力が" + cAtt + "上がった！")
      }

      if(cSpe > 0){
        alert("素早さが" + cSpe + "上がった！")
      }

      if(cDif > 0){
        alert("防御力が" + cDif + "上がった！")
      }

      if(cHP > 0){
       alert("最大HPが" + cHP + "上がった！")
      }


      //各種数値リセット
      dam = 0;
      cHP = 0;
      cDif = 0;
      cAtt = 0;
      cSpe = 0;


      //死ぬ
     if(nowHP<1){dead();}
}


//経験値を得る。
function getExp(){
     nowExp = nowExp + exp;
      document.getElementById("exp").innerHTML = nowExp + "/" + nExp;
      alert( exp + "の経験値を手に入れた。");

    while(nowExp >= nExp){
      alert("レベルアップ！")
      cHP = Math.floor(Math.random()*10) + 10;
      cSpe = Math.floor(Math.random()*4) + 1;
      cAtt = Math.floor(Math.random()*4) + 1;
      cDif = Math.floor(Math.random()*4) + 1;
      nowExp = nowExp - nExp;
      nExp = nExp + 10;
      document.getElementById("exp").innerHTML = nowExp + "/" + nExp;
      changeStats();
      nowHP = maxHP;
      lvl = lvl + 1
      document.getElementById('HP').innerHTML = nowHP + "/" + maxHP;
      document.getElementById('lvl').innerHTML = lvl;
    }

}


//敵のステータス操作。
function changeEStats(){
  eHP = eHP - dam;
   document.getElementById('eHP').innerHTML = "HP:" + eHP;

   //ダメージのリセットは忘れない。
  dam = 0;

  //死んだ敵を消す。
  if(eHP < 1){
    alert(enemyName + "を倒した！");
    document.getElementById('eName').innerHTML = "";
    document.getElementById('eHP').innerHTML = "";
    document.getElementById('fightButton').innerHTML = "";
    getExp();

　   //お菓子の魔人を倒すとお菓子を返してもらえる。
    if(enemyName == "お菓子の魔神"){
      alert(snack + "をてにいれた！")
      location.href = "clear/gameClear.html"
    }
  }
}

//泉。色んな願いをかなえてくれる。階段はデバッグ時には泉になる。今のところそれ以外の用途は無い。
function izumi(id){
  //泉は青
  document.getElementById(id).setAttribute('style', 'background-color:rgb(0,0,255);');
  alert("泉を見つけた")
  wish = window.prompt("何を願う？","")

//泉に願えるもの
if(wish == "p"){for(j = 0; j < 6; j++) {potions();}}//ポーションを6つ生成できる
if(wish == "e"){enemys();}//敵を出せる
if(wish == "力"){cAtt = 100; changeStats();}//力を１００あげる。
if(wish == "de"){sweets = window.prompt("デバッグコードを入力","")}//デバックコードを入力できる
if(wish == "descend"){godown();}//階層を一つ下れる。
if(wish == "escape"){sibire = 0;}//デバッグモードを脱出できる(ステータスはそのまま)
}


/*こころざしなかばで ちからつきしものよ
*これよりさきは たましいのかえるところ
*おそれることはない・・・
*/
function dead(){
  alert("you die…");
  location.reload();}
