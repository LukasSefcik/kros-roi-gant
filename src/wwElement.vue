<template>
  <div class="container">
    <div class="timeline">
      <div v-for="week in weeklyTimeline" :key="week" class="timeline-week">
        <div
            class="timeline-week-text"
            :style="{ width: dayWidth * 7 + 'px' }"
        >
          {{ week }}
        </div>
      </div>
    </div>
    <DxList
        :data-source="dataSource"
        @item-click="onItemClick"
        key-expr="id"
    >
      <DxItemDragging
          :data="dataSource"
          :allow-reordering="true"
          :on-drag-start="onDragStart"
          :on-add="onAdd"
          :on-remove="onRemove"
          :on-reorder="onReorder"
          :group="content.draggingGroupName"
      />
      <template #item="{ data: item }">
        <div class="gantt-events">
          <div
              class="gantt-event"
              :style="{
              left: getDaysSinceStart(new Date(item.started_at), getMinDate()) * dayWidth + 'px',
              width: getDayDiff(new Date(item.started_at), getItemMaxDate(item)) * dayWidth + 'px'
            }"
          >
            {{ item.title }}
            <div
                v-for="checkpoint in item._indicators_of_sheets"
                :key="checkpoint.checkpoint_at"
                :id="`checkpoint-${checkpoint.id}`"
                class="gantt-checkpoint"
                :style="{ left: getDaysSinceStart(new Date(checkpoint.checkpoint_at), new Date(item.started_at)) * dayWidth + 'px' }"
            >
              <DxTooltip
                  :target="`#checkpoint-${checkpoint.id}`"
                  show-event="mouseenter"
                  hide-event="mouseleave"
              >
                {{ checkpoint.title }}
              </DxTooltip>
            </div>
          </div>
        </div>
      </template>
    </DxList>
  </div>
</template>

<script>
import "./dx.fluent.dx-light-theme.css";

import DxList, {DxItemDragging} from 'devextreme-vue/list';
import {DxTooltip} from 'devextreme-vue/tooltip';

export default {
  components: {
    DxList,
    DxItemDragging,
    DxTooltip,
  },
  data() {
    return {
      minDate: new Date("1.1.2024"),
      dates: [],
      dayWidth: 1,
      dataSource: [...this.content.data],
      weeklyTimeline: []
    };
  },
  props: {
    content: {type: Object, required: true},
  },
  emits: ["trigger-event"],
  computed: {},
  mounted() {
    this.generateWeeklyTimeline();
  },
  methods: {
    onDragStart(e) {
      console.log("onDragStart", e);
      e.itemData = this.dataSource[e.fromIndex];
    },
    onAdd(e) {
      console.log("onAdd", e);
      const newData = [...this.dataSource];
      newData.splice(e.toIndex, 0, e.itemData);
      this.dataSource = newData;
    },
    onRemove(e) {
      console.log("onRemove", e);
      const newData = [...this.dataSource];
      newData.splice(e.fromIndex, 1);
      this.dataSource = newData;
    },
    onReorder(e) {
      console.log("onReorder", e);
      this.onRemove(e);
      this.onAdd(e);
      this.$emit("trigger-event", {
        name: "onReorder",
        event: e,
      });
    },
    onItemClick(e) {
      console.log("onItemClick", e);
      this.$emit("trigger-event", {
        name: "onItemClick",
        event: e,
      });
    },
    getDayDiff(start, end) {
      const oneDay = 24 * 60 * 60 * 1000;
      return Math.round((end.getTime() - start.getTime()) / oneDay);
    },
    getDaysSinceStart(date, start) {
      const oneDay = 24 * 60 * 60 * 1000;
      return Math.round((date.getTime() - start.getTime()) / oneDay);
    },
    getItemMaxDate(item) {
      if (item && item._indicators_of_sheets?.length > 0) {
        const dates = item._indicators_of_sheets.flatMap(indicator => new Date(indicator.checkpoint_at));
        return new Date(Math.max(...dates));
      } else {
        return new Date();
      }
    },
    getMinDate() {
      // potential performance issue
      if (!this.dates || this.dates.length === 0) {
        this.dates = this.content.data.flatMap(event => [
          new Date(event.started_at),
          ...event._indicators_of_sheets
              .filter(indicator => indicator.checkpoint_at !== null)
              .map(indicator => new Date(indicator.checkpoint_at))
        ]);
      }
      return new Date(Math.min(...this.dates));
    },
    getMaxDate() {
      // potential performance issue
      if (!this.dates || this.dates.length === 0) {
        this.dates = this.content.data.flatMap(event => [
          new Date(event.started_at),
          ...event._indicators_of_sheets
              .filter(indicator => indicator.checkpoint_at !== null)
              .map(indicator => new Date(indicator.checkpoint_at))
        ]);
      }
      return new Date(Math.max(...this.dates));
    },
    generateWeeklyTimeline() {
      const minDate = this.getMinDate();
      const maxDate = this.getMaxDate();
      const oneWeek = 7 * 24 * 60 * 60 * 1000;
      let currentDate = new Date(minDate);

      while (currentDate <= maxDate) {
        this.weeklyTimeline.push(currentDate.getDate().toString().padStart(2, '0') + '.' +
            (currentDate.getMonth() + 1).toString().padStart(2, '0') + '.' +
            currentDate.getFullYear());
        currentDate = new Date(currentDate.getTime() + oneWeek);
      }
    },
  }
};
</script>

<style lang="scss" scoped>
.container {
  display: flex;
  flex-direction: column;
  position: relative;
}

.timeline {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: space-between;
  margin-bottom: 10px;
}

.timeline-week {
  flex: 1;
  text-align: center;
  border-right: 1px solid #ccc;
  padding: 5px;
  font-size: 12px;
}

.timeline-week-text {
  rotate: 90deg;
}

.dx-scrollable {
  margin-top: 50px;
  width: 100%;
}

.gantt-events {
  position: relative;
  display: flex;
  flex-direction: column;
}

.gantt-event {
  position: absolute;
  background-color: #3498db;
  color: white;
  padding: 0 8px;
  border-radius: 4px;
}

.gantt-checkpoint {
  position: absolute;
  width: 10px;
  height: 10px;
  background-color: red;
  border-radius: 50%;
  top: 50%;
  transform: translateY(-50%);
}
</style>
