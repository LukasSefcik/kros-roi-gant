<template>
  <DxList
      :data-source="content.data"
      @item-reordered="onItemReordered"
  >
    <DxItemDragging
        :data="content.data"
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
    };
  },
  props: {
    content: {type: Object, required: true},
  },
  emits: ["trigger-event"],
  computed: {},
  methods: {
    onDragStart(event) {
      console.log("onDragStart", event);
      event.itemData = event.fromData;
    },
    onAdd(e) {
      console.log("onAdd", e);
      const newData = [...this.content.data[e.toData].value];
      newData.splice(e.toIndex, 0, e.itemData);
      this.content.data[e.toData].value = newData;
    },
    onRemove(e) {
      console.log("onRemove", e);
      const newData = [...this.content.data[e.fromData].value];
      newData.splice(e.fromIndex, 1);
      this.content.data[e.fromData].value = newData;
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
    onItemReordered(event) {
      console.log("onItemReordered", event);
      this.$emit("trigger-event", {
        name: "onItemReordered",
        event: event,
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
      const dates = item._indicators_of_sheets.flatMap(indicator => new Date(indicator.checkpoint_at));
      return new Date(Math.max(...dates));
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
  }
};
</script>

<style lang="scss" scoped>
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
