<template>
  <DxList
      :data-source="content.data"
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
        </div>
      </div>
    </template>
  </DxList>
</template>

<script>
import "./dx.fluent.dx-light-theme.css";

import DxList, {DxItemDragging} from 'devextreme-vue/list';

export default {
  components: {
    DxList,
    DxItemDragging,
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
    onAdd(event) {
      console.log("onAdd", event);
    },
    onRemove(event) {
      console.log("onRemove", event);
    },
    onReorder(event) {
      console.log("onReorder", event);
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
  padding: 5px;
  border-radius: 4px;
  line-height: 15px;
}
</style>
