var num = ["A",2,3,4,5,6,7,8,9,10,"J","Q","K","A"]; //二回Aが出て来ているが、14番目のそれは文字出力でしか使われない(なので同じスートのAがダブって出てしまったりはしない）
var sute = ["◇","♡","♤","♧"]; //使うスート
var sude = []; //場の状態全てが入る。カードがダブっていないかの確認にも使われる
var cards = []; //引いたｎ枚のカードが入る
var fieldCards = []; //役を調べる五枚のカードが入る。場のカードが入るわけではないという点に注意。
var playerHand = []; //全てのプレイヤーの手札の情報が入る
var playerCards = []; //与えられた五枚のカードナンバーが入る
var playerSuit = []; //与えられた五枚のスートナンバーが入る
var playerNumber = []; //与えられた五枚の数字-1
var fieldSuit = []; //場に出たカードのスートの情報が入る
var fieldNumber = []; //場に出たカードの数字の情報が入る
var bestCards = []; //今まで出たカードで最も良い手の情報が入る
var playerName = ["gonbey"]; //プレイヤーの名前が入る。入力する前に空だとエラーを出しずらいので仮にgonbeyを入れてある
var winnerArray = [] //勝者の名前の入った配列。引き分けの時、同じプレイヤーがダブっていないかを確認するために使う。

//文字を出力するときに使う変数
var mojiHands = "<li>" + "プレイヤーズハンド" + "</li>" //全員の手札を出力するときに使う
var unique; //フラッシュならスート、ペアならペアを作っている数字等が入る

var yakuLevel = 0; //役の強さについての情報
var maxLevel = 0; //今まで出た中で一番強い役のレベル
var maxNumber = [0,0,0,0,0]; //一番強い手札の数字の情報。
var maxUniqueNum = 0; //ペア系の役が最高で同レベルの役の時、役を作っているカードの強さを比べるときに使う。

var numberIdentification = [0,0,0,0,0,0,0,0,0,0,0,0,0]; //どの数字が何枚出ているかについての情報が入る
var suitIdentification = [0,0,0,0]; //どのスートが何枚出ているかについての情報が入る

//ペアがいくつ(一つか二つ)あるか確認する変数
var pairCount = 0;

var de; //デバッグモードに入っているかを確認するための変数


var riset; //resetがありそうだからあえてrisetにしてある。スペルミスではない

//役の識別に使うやつ
var pair;
var twoPairs;
var threeOfKinds;
var fourCards;
var fullhouce;
var flash;
var straight;
var royalStraight;
var straightFlash;
var royalStraightFlash;
var hikiwake = false;

//“次のゲーム”を押したときに呼び出される。
function risetto(){
    if(playerName[0] == ["gonbey"]){
      alert("まずはゲームを始めてください");
    }
    else{
      riset = prompt("次のゲームを始める？(y/n)")
      if(riset == "y"){
          delCards();
          choice();
        }
        //以下デバッグモードのコード
      else if(riset == "de"){
          de = prompt("デバッグコードを入力");
          if(de == "sude"){printSude();}
          delCards();
          choice();
        }
    }
}

/*
“次のゲーム”ボタン（risetto()）を押した後の入力でデバッグモード"sude"に入るとひとつ前のゲームのsude(場の状態をデータ化したもの)を出力してくれる
ここで出力したsudeは“ゲーム開始”ボタン（startGame()）を押した後の入力でデバッグモードに入ることで入力でき、これによってバグが出たときの状態などをページをリロードした後でも再現できる。
*/
function printSude(){
  for(t = playerHand.length - 1; t >= 0; t--){
    sude = playerHand[t].concat(sude);
  }
  alert(sude)
}

//初期化する
function delCards(){
    sude = [];
    cards = [];
    fieldCards = [];
    playerHand = [];
    playerCards = [];
    playerSuit = [];
    playerNumber = [];
    fieldSuit = [];
    fieldNumber = [];
    bestCards = [];
    mojiHands = "<li>" + "プレイヤーズハンド" + "</li>";
}

//ゲームを始める
function startGame(){
         kakunin = prompt("ゲームを最初から始める？(y/n)");
    if(kakunin == "de"){de = "debug";alert("デバッグモードに入りました");startGame();}　//デバッグモードのコード
    else if(kakunin == "y"){
        delCards();
        playerName = [];
        players = prompt("プレイヤー人数を入力してください");
        for(t = 0; t < players; t++){
            playerName.push(prompt("プレイヤー名を入力"));
        }
        choice();
    }

}

//必要な枚数(場のカード五枚+人数×2枚)だけカードを配る
function choice(){
    x = Math.floor((Math.random() * 13));
    y = Math.floor((Math.random() * 4));

    z = x*10 + y;//このｚがカードコード。xは数字を決め、yはスートを決めている。
    card_n = sute[y] + "の" + num[x];



    if(check() == false){
        choice();
    }
    else{
        cards.unshift(card_n);

        if(cards.length == 5 + players*2){
            distributeCards();
            console.log("New game!!");
        }
        else{
            choice();
        }
    }
}

//カードがダブっていないか確認している
function check(){
    if(sude.includes(z)){
        return false;
    }
    else{
        sude.push(z)
        return true;
    }
}

//ここでカードを配り、そして配られたカードと場のカードでどんな役ができるかという確認まで全て行っている。
function distributeCards(){
  if(de == "debug"){
    var printedSude = prompt("sudeを入力");
    printedSude = printedSude.split(",");
    var printedSudeLength = printedSude.length;
    for(t = 0; t < printedSudeLength; t++){
        printedSude[t] = Number(printedSude[t])
    }
    sude = printedSude;
  }
    for( t = 0;  t < players; t++){
        playerHand[t] = sude.splice(0,2);
    }
    for( a = 0;  a < players; a++){
        pickFiveCards(); //この関数の下にずっと関数が続いている。
    }
    printCards();
    printHands();
    p_yaku();
}

//プレイヤーの手札二枚と、場のカード五枚の計7枚からどの5枚を選び出すかを決めている。
function pickFiveCards(){
    for(q = 0; q < 7 ; q++){
        for(w = q + 1; w < 7 ; w++){
            field();
        }
    }
}

//ここでのfieldCardsとは場のカードではなく、その時調べる5枚のカードの事。
function field(){
    fieldCards = [];
    fieldCards = playerHand[a].concat(sude);
    hand();
}

function hand(){
    playerCards = [];
    fieldCards.splice(w,1);
    fieldCards.splice(q,1);
    playerCards = fieldCards.concat();
    [playerNumber,playerSuit] = numberMachene(playerCards);
    sikibetu();
}


/*
カードコードを入力するとスートコードとナンバーコードに分けて返してくれる。
入力方法は[numberCodeOutput,suitCodeOutput] = numberMachene(cardsCode);
*/
function numberMachene(cardsArray){
    var numberArray = [];
    var suitArray = [];
    maisu = cardsArray.length
    for(t=0; t<maisu; t++){
       for(s = 0; s <= 3; s++){
           if((cardsArray[t] - s)%10 == 0){
               suitArray.push(s);
               numberArray.push((cardsArray[t] - s)/10)
           }
        }
    }
    return [numberArray.concat(),suitArray.concat()];
}

//何の何が有るかを識別する
function sikibetu(){
    numberIdentification = [0,0,0,0,0,0,0,0,0,0,0,0,0];
    suitIdentification = [0,0,0,0];
    for(t = 0; t < 5; t++){
        for(s=0; s < 13; s++){
            if(playerNumber[t] == s){
                numberIdentification[s] = numberIdentification[s] + 1;
            }
        }
    }
    for(t = 0; t < 5; t++){
        for(s=0; s < 4; s++){
            if(playerSuit[t] == s){
                suitIdentification[s] = suitIdentification[s] + 1;
            }
        }
    }
    flushCheck();
    uniqueNum = -1; //ペア系の役になったときペア等を作っているカードの中で一番大きい数字が代入される
    pair_c();
    straightCheck();
    complexYakuCheck();
    yakuCompare();
}

//フラッシュが有るかのチェックをする
function flushCheck(){
    for(t=0;t<4; t++){
        if(suitIdentification[t] == 5){
            flash = true;
            unique = sute[t] + "の";
            yakuLevel = 6;
        }
    }
}

//ペアが有るかチェックする
function pair_c(){
    for(t = 0; t < 13; t++){
        if(numberIdentification[t] == 2){
            if(pairCount == 1){
                pair = false;
                twoPairs = true;
                unique = num[t] + "と" + unique;
                uniqueNum = t;
                yakuLevel = 2;
            }
            else{
                pair = true;
                unique = num[t] + "の";
                yakuLevel = 1;
                uniqueNum = t;
                pairCount = 1;
            }
        }
        if(numberIdentification[t] == 3){
            threeOfKinds = true;
            unique = num[t] + "の"
            uniqueNum = t;
            yakuLevel = 3;
        }
        if(numberIdentification[t] == 4){
            fourCards = true;
            unique = num[t] + "の";
            uniqueNum = t;
            yakuLevel = 8;
        }
    }
    if(threeOfKinds && pair == true){
        threeOfKinds = false;
        pair = false;
        fullhouce = true;
        yakuLevel = 7;
        unique = 0;
    }
}

//ストレートが有るかチェックする
function straightCheck(){
     playerNumberCopy = playerNumber.concat();
     playerNumber.sort((a, b) => a - b);
     if(playerNumber[0] == 0 && playerNumber[1] == 9 && playerNumber[2] == 10 && playerNumber[3] == 11 && playerNumber[4] == 12){
         royalStraight = true;
         yakuLevel = 5;
        }
        else{
            for(t = 0; t < 4; t++){
                if(playerNumber[t + 1] - playerNumber[t] == 1){
                    straight = true;
                    unique = 0;
                }
                else{
                    straight = false;
                    break;
                }
            }
        }
        if(straight == true){
            yakuLevel = 4;
        }
        else if(playerNumber[0] == 0){
            playerNumber[0] = 13;
            playerNumber.sort((a, b) => a - b)
        }
    }
//複合役(ストレートフラッシュまたはロイヤルストレートフラッシュ)が有るかを確認する
function complexYakuCheck(){
    if(straight == true && flash == true){
        straight =false;
        flash = false;
        straightFlash = true;
        yakuLevel = 9;
    }
    if(royalStraight == true && flash == true){
        royalStraight = false;
        flash = false;
        royalStraightFlash = true;
        yakuLevel = 10;
    }
}

//今までに出た最大の役と今の自分の役を比べる
function yakuCompare(){
    if(maxLevel == yakuLevel){
        if(!uniqueNum == -1){
            if(uniqueNum > maxUniqueNum){
                hikiwake = false;
                update();
            }
        }
        else{
            for(t = 4; t >= 0; t--){
                if(maxNumber[t] <= playerNumber[t]){
                   if(maxNumber[t] == playerNumber[t]){
                       if(t == 0){
                           hikiwake = true;
                           update();
                           break;
                       }
                       else{continue;}
                   }
                   else{
                       hikiwake = false;
                       update();
                       break;
                   }
               }
               else{break;}
           }
        }        
    }
    else if(maxLevel < yakuLevel){
        hikiwake = false;
        update();
    }
    pair = false;
    twoPairs = false;
    threeOfKinds = false;
    fourCards = false;
    fullhouce = false;
    flash = false;
    straight = false;
    royalStraight = false;
    straightFlash = false;
    royalStraightFlash = false;
    yakuLevel = 0;
    pairCount = 0;
}

//辞意分の持っている役の方が強かった場合、各種データをアップデートする。
function update(){
    if(hikiwake == true && (!(winnerArray.includes(playerName[a])))){
        bestCardsTwo = mojikaMachine(playerNumberCopy,playerSuit,"off");
        bestCards = bestCards + "と" + bestCardsTwo;
        winner = winner + "と" + playerName[a];
        winnerArray.push(playerName[a]);
    }
    else{
        maxLevel = yakuLevel;
        maxNumber = playerNumber.concat();
        bestCards = mojikaMachine(playerNumberCopy,playerSuit,"off");
        uniqueIs = unique;
        maxUniqueNum = uniqueNum;
        winner = playerName[a];
        winnerArray = [];
        winnerArray[0] = playerName[a];
    }

    console.log("lvl" + yakuLevel)
    console.log("card" + bestCards)
    console.log("code" + playerCards)
    console.log("num" + playerNumberCopy)
    console.log("suit" + playerSuit)
    console.log(unique)
}


/*
ナンバーのコードとスートのコードを入力すると文字列にして返してくれる。
入力方法は outputArray = mojikaMachiene(numberArray,suitArray,"off")
numberMacheneと連携してカードコードを入力するだけで勝手にナンバーコードとスートコードに変換してくれる機能付き。
入力方法は outputArray = mojikaMachene(cardArray,0,"on")
*/
function mojikaMachine(numberArray,suitArray,addOn){
    var mojiCardsArray = [];
    if(addOn == "on"){
        [numberArray,suitArray] = numberMachene(numberArray)
    }
    var arrayLength = suitArray.length
    for(t=0; t < arrayLength; t++){
        mojiCardsArray.push(sute[suitArray[t]] + "の" + num[numberArray[t]])
    }
    return mojiCardsArray.concat();
}

//場のカードを出力
function printCards(){
    mojikaField = mojikaMachine(sude,0,"on");
    document.getElementById('card').innerHTML ="<li>" + mojikaField + "</li>";
}

//手札のカードを出力
function printHands(){
    players = Number(players);
    for(k = 0; k < players; k++){
        mojiHands = mojiHands + "<li>" + playerName[k] + "の手札:" + mojikaMachine(playerHand[k],0,"on") + "</li>" ;
    }
    document.getElementById('hand').innerHTML = mojiHands;
}

//勝者とその勝ち手の役を出力
function p_yaku(){
  var yakuZenbu = ["ハイカード","ワンペア","ツーペア","スリーカード","ストレート","ロイヤルストレート","フラッシュ","フルハウス","フォーカード","ストレートフラッシュ","ロイヤルストレートフラッシュ"]

    {document.getElementById("bestCards").innerHTML ="<li>" + bestCards + "で" + "</li>";}
    if(maxLevel == 0){
        if(maxNumber == 13){maxNumber = 0}
      {document.getElementById("yak").innerHTML ="<li>" + num[maxNumber] + "の" + "ハイカード！" + "</li>";}
    }
    else if(uniqueIs == 0){
      {document.getElementById('yak').innerHTML ="<li>" + yakuZenbu[maxLevel]　+ "</li>";}
    }
    else{
      {document.getElementById('yak').innerHTML ="<li>" + uniqueIs +　yakuZenbu[maxLevel]　+ "</li>";}
    }

    document.getElementById("winner").innerHTML ="<li>" + winner + "の勝ち！" + "</li>";

    maxLevel = -1;
    maxNumber = 0;
    uniqueIs = 0;
    maxUniqueNum = 0;

    if(riset == "de"){
        de = 0;
        riset = 0;
        sude = [];
        cards = [];
        alert("カードをリセットしました")
    }
    cards = [];
}