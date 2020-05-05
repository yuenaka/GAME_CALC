<template>
  <div class="l-body" id="tenirb-medal">
    <div class="note">※ 入力フォームのフォーカスを外すと計算処理が走ります</div>
    <div class="box box-goal_setting">
      <div class="row">
        <div class="item-title"><label>目標ポイント</label></div>
        <div class="item-text">
          <div class="input">
            <input type="number" v-model.number="goalPt" v-on:blur="calc" />
          </div>
          <span class="unit">Pt</span>
        </div>
      </div>
      <div class="row">
        <div class="item-title"><label>現在のポイント</label></div>
        <div class="item-text">
          <div class="input">
            <input type="number" v-model.number="initialPt" v-on:blur="calc" />
          </div>
          <span class="unit">Pt</span>
        </div>
      </div>
      <div class="row">
        <div class="item-title">
          <label>現在の所持メダル (購入予定含む)</label>
        </div>
        <div class="item-text">
          <div class="input">
            <input
              type="number"
              v-model.number="initialMedal"
              v-on:blur="calc"
            />
          </div>
          <span class="unit">枚</span>
        </div>
      </div>
      <div class="row">
        <div class="item-title"><label>イベント残り日数</label></div>
        <div class="item-text">
          <div class="input">
            <input type="number" v-model.number="period" v-on:blur="calc" />
          </div>
          <span class="unit">日</span>
        </div>
      </div>
    </div>
    <div class="box box-level_setting">
      <div class="row">
        <div class="item-title">
          <label>平均スコアボーナス</label>
        </div>
        <div class="item-text">
          <div class="input">
            <input
              type="number"
              min="0"
              max="100"
              v-model.number="scoreBounusRate"
              v-on:blur="calc"
            />
          </div>
          <span class="unit">%</span>
        </div>
      </div>
      <div class="row">
        <div class="item-title">
          <label>特攻ボーナス</label>
        </div>
        <div class="item-text">
          <div class="input">
            <input
              type="number"
              min="0"
              max="100"
              v-model.number="specialBounusRate"
              v-on:blur="calc"
            />
          </div>
          <span class="unit">%</span>
        </div>
      </div>
      <div class="row">
        <div class="item-title">
          <label> ―ポイボSRの特攻ボーナスを加算する<sup>※1</sup></label>
        </div>
        <div class="item-text">
          <div class="input">
            <input
              id="isUseSR"
              type="checkbox"
              v-model="isUseSR"
              v-on:change="calc"
            />
            <label for="isUseSR" class="checkbox">&thinsp;</label>
          </div>
        </div>
      </div>
      <div class="row">
        <div class="item-title">
          <label>通常曲のレベル</label>
        </div>
        <div class="item-text">
          <div class="input">
            <select v-model="nomalLevel" v-on:blur="calc">
              <option
                v-for="(name, value) in nomalLevelList"
                :key="value"
                :value="value"
                >{{ name }}</option
              >
            </select>
          </div>
        </div>
      </div>
      <div class="row">
        <div class="item-title">
          <label>イベント曲のレベル</label>
        </div>
        <div class="item-text">
          <div class="input">
            <select v-model="eventLevel" v-on:blur="calc">
              <option
                v-for="(name, value) in eventLevelList"
                :key="value"
                :value="value"
                >{{ name }}</option
              >
            </select>
          </div>
        </div>
      </div>
    </div>
    <div class="note">
      ※1)
      チェックが入っている場合、累計ポイントがポイボSR取得ラインに到達した時点からポイボSRの特攻ボーナスを加算します。<br />
      ポイボSRをオーダーに組み込まない場合はチェックを外してください。<br />
      チェックを入れた場合、「特攻ボーナス」にはポイボSR分を除いた数値を入力してください。
    </div>

    <div class="box box-result">
      <p>
        {{ period }}日で{{ goalPt }}Ptを達成するには、<br />
        1日あたり{{ (goalPt / period).toFixed(1) }}Pt稼ぐ必要があります。<br />
        通常曲を {{ Math.ceil(nomalPlayTimes / period) }} 回、<br />
        イベント曲を
        {{ Math.ceil(eventPlayTimes / period) }} 回ほど<br />
        プレイしましょう。<sup>※2</sup><br />
      </p>
    </div>
    <div class="note">※2) ブーストを使わない場合</div>
    <div class="updated">最終更新: 2020/4/29</div>
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
      initialMedal: 0,
      period: 10,
      scoreBounusRate: 15,
      specialBounusRate: 0,
      isUseSR: true,
      nomalLevel: "easy1",
      eventLevel: "easy",
      // 結果
      nomalPlayTimes: 0,
      eventPlayTimes: 0
    };
  },
  methods: {
    calc: function() {
      let pt = this.initialPt;
      let medals = this.initialMedal;
      // 初期化
      this.nomalPlayTimes = this.eventPlayTimes = 0;
      while (pt < this.goalPt) {
        // イベント曲
        while (medals >= this.usedMedal[this.eventLevel]) {
          this.eventPlayTimes++;
          pt +=
            (1 + this.getBounusRate(pt)) * this.eventBasisPt[this.eventLevel];
          medals -= this.usedMedal[this.eventLevel];
          if (pt >= this.goalPt) {
            return;
          }
        }
        // 通常曲
        this.nomalPlayTimes++;
        pt += (1 + this.getBounusRate(pt)) * this.nomalBasisPt[this.nomalLevel];
        medals += this.gainMedal;

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
      if (!this.isUseSR) {
        return 0;
      }
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
