<template>
  <div id="home" class="l-body">
    <router-view></router-view>
    <div class="main">
      <div class="article">
        <h2 class="subhead">このサイトについて</h2>
        <div class="text">
          ソシャゲのイベント走る計画を立てるためのツールです。<br />
          夏休みの宿題は溜め込まず毎日コツコツやりたい人向け。<br />
          目標プレイ回数はあくまで目安です。
        </div>
      </div>
      <div class="article">
        <h2 class="subhead">免責事項</h2>
        <div class="text">
          <span class="bold">あくまで目安です。</span><br />
          運要素については体感でおよその平均値を使って計算していますので、誤差が発生します。<br />
          ゲームパラメータが変更になった場合、結果が変わってきますので、最終更新日をご確認ください。<br />
          <br />
          想定外の入力があった場合、表示がおかしくなる可能性があります。（数値であるべき項目に日本語を入力するなど）<br />
          動作がおかしくなった場合、再読み込みしてください。<br />
          <br />
          表示確認は MacOS Google Chrome、MacOS Firefox、Android Google Chrome
          で行っています。<br />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Home"
};
</script>
