<template>
  <div class="c-body">
    <div class="c-form">
      <form>
        <div class="c-input">
          <label>Text</label>
          <input type="text" />
        </div>
        <div class="c-pulldown">
          <p>Pulldown</p>
          <select>
            <option value="">選択してください</option>
            <option value="test1">test1</option>
            <option value="test2">test2</option>
            <option value="test3">test3</option>
            <option value="test4">test4</option>
            <option value="test5">test5</option>
          </select>
        </div>
        <p class="c-button-primary">
          <input type="submit" value="Send" v-on:click="calc" />
        </p>
        <p class="c-button-primary">
          <input type="submit" value="Send" disabled="disabled" />
        </p>
      </form>
    </div>
    <div class="c-result">
      <p>
        {{ period }}日で{{ goalPt }}Ptを達成するには、<br />
        1日あたり<br />
        通常曲を {{ nomalPlayTimes }} 回、<br />
        イベント曲を {{ eventPlayTimes }} 回ほどプレイしましょう。<br />
      </p>
    </div>
  </div>
</template>

<script>
export default {
  data: function() {
    return {
      // 固定値
      nomalBasisPt: {
        easy1: 217,
        easy2: 231,
        nomal1: 245,
        nomal2: 259,
        hard1: 274,
        hard2: 288,
        extra1: 304,
        extra2: 320,
        extra3: 336
      },
      eventBasisPt: {
        easy: 1100,
        nomal: 1320,
        hard: 1760,
        extra: 2200
      },
      gainMedal: 45, // todo 変数にする？
      usedMedal: {
        easy: 100,
        nomal: 120,
        hard: 160,
        extra: 200
      },
      // 入力値
      goalPt: 1000000,
      initialPt: 0,
      period: 10,
      scoreBounusRate: 15,
      specialBounusRate: 0,
      nomalLevel: "easy1",
      eventLevel: "easy",
      // 結果
      nomalPlayTimes: 0,
      eventPlayTimes: 0
    };
  },
  methods: {
    calc: function() {
      // todo levelが不正の場合エラーにする
      let pt = this.initialPt;
      let medals = 0;
      // 初期化
      this.nomalPlayTimes = this.eventPlayTimes = 0;
      while (pt < this.goalPt) {
        this.nomalPlayTimes++;
        pt += (1 + this.getBounusRate(pt)) * this.nomalBasisPt[this.nomalLevel];
        if (pt >= this.goalPt) {
          return;
        }
        medals += this.gainMedal;

        // イベント曲
        if (medals >= this.usedMedal[this.eventLevel]) {
          this.eventPlayTimes++;
          pt +=
            (1 + this.getBounusRate(pt)) * this.eventBasisPt[this.eventLevel];
          medals -= this.usedMedal[this.eventLevel];
        }
        // 無限ループ回避
        if (this.nomalPlayTimes > 10000) {
          return;
        }
      }
    },
    // 百分率を返す
    getBounusRate: function(pt) {
      return (
        (this.scoreBounusRate +
          this.specialBounusRate +
          this.getEventSpecialBounusRate(pt)) /
        100
      );
    },
    getEventSpecialBounusRate: function(pt) {
      if (pt < 60000) {
        return 0;
      } else if (pt < 90000) {
        return 10;
      } else if (pt < 120000) {
        return 12;
      } else if (pt < 150000) {
        return 14;
      } else if (pt < 200000) {
        return 16;
      } else if (pt < 250000) {
        return 18;
      } else if (pt < 300000) {
        return 20;
      } else if (pt < 400000) {
        return 21;
      } else if (pt < 500000) {
        return 22;
      } else if (pt < 600000) {
        return 23;
      } else if (pt < 700000) {
        return 24;
      } else {
        // 70万Pt以上で完凸
        return 25;
      }
    }
  }
};
</script>
