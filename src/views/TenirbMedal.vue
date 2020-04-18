<template>
  <div class="c-body">
    <div class="c-form">
      <form>
        <div class="c-input">
          <label>イベントは残り何日？</label>
          <input
            type="number"
            v-model.number="period"
            v-on:change="calc"
          /><span class="c-label">日</span>
        </div>
        <div class="c-input">
          <label>ズバリ！ 目標は何ポイント？</label>
          <input
            type="number"
            v-model.number="goalPt"
            v-on:change="calc"
          /><span class="c-label">Pt</span>
        </div>
        <div class="c-input">
          <label>今何ポイント？</label>
          <input
            type="number"
            v-model.number="initialPt"
            v-on:change="calc"
          /><span class="c-label">Pt</span>
        </div>
        <div class="c-input">
          <label>スコアボーナスはだいたい何％くらい取れる？</label>
          <input
            type="number"
            min="0"
            max="100"
            v-model.number="scoreBounusRate"
            v-on:change="calc"
          /><span class="c-label">%</span>
        </div>
        <div class="c-input">
          <label
            >特攻ボーナスは何％持ってる？（※今イベントのポイントボーナスSRは除く）</label
          >
          <input
            type="number"
            min="0"
            max="100"
            v-model.number="specialBounusRate"
            v-on:change="calc"
          /><span class="c-label">%</span>
        </div>
        <div class="c-pulldown">
          <label>通常曲のレベルは？</label>
          <select v-model="nomalLevel" v-on:change="calc">
            <option
              v-for="(name, value) in nomalLevelList"
              :key="value"
              :value="value"
              >{{ name }}</option
            >
          </select>
        </div>
        <div class="c-pulldown">
          <label>イベント曲のレベルは？</label>
          <select v-model="eventLevel" v-on:change="calc">
            <option
              v-for="(name, value) in eventLevelList"
              :key="value"
              :value="value"
              >{{ name }}</option
            >
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
        通常曲を {{ nomalPlayTimes / period }} 回、<br />
        イベント曲を
        {{ eventPlayTimes / period }} 回ほどプレイしましょう。<br />
      </p>
    </div>
  </div>
</template>

<script>
export default {
  data: function() {
    return {
      // 固定値
      nomalLevelList: {
        easy1: "EASY (★4~6)",
        easy2: "EASY (★7~9)",
        nomal1: "NOMAL (★10~11)",
        nomal2: "NOMAL (★12~13)",
        hard1: "HARD (★14~15)",
        hard2: "HARD (★16~17)",
        extra1: "EXTRA (★18~20)",
        extra2: "EXTRA (★21~23)",
        extra3: "EXTRA (★24~)"
      },
      eventLevelList: {
        easy: "EASY",
        nomal: "NOMAL",
        hard: "HARD",
        extra: "EXTRA"
      },
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
