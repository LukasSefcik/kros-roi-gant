<template>
  <DxScrollView id="scroll">
    <DxDraggable
      id="list"
      :group="content.draggingGroupName"
      :on-drag-start="onListDragStart"
      data="dropArea"
    >
      <DxDraggable
        v-for="(item, index) in content.data"
        :key="index"
        :clone="true"
        :group="content.draggingGroupName"
        :data="item"
        :on-drag-start="onItemDragStart"
        :on-drag-end="onItemDragEnd"
      >
        <wwLayoutItemContext
          :index="index"
          :item="null"
          is-repeat
          :data="item"
          :repeated-items="content.data"
        >
          <wwElement v-bind="content.itemContainer"></wwElement>
        </wwLayoutItemContext>
      </DxDraggable>
    </DxDraggable>
  </DxScrollView>
</template>

<script>
import "./dx.fluent.dx-light-theme.css";

import DxDraggable from "devextreme-vue/draggable";
import DxScrollView from "devextreme-vue/scroll-view";

export default {
  components: {
    DxDraggable,
  },
  props: {
    content: { type: Object, required: true },
  },
  emits: ["trigger-event"],
  computed: {},
  methods: {
    onListDragStart(event) {
      console.log("onListDragStart", event);
      event.cancel = true;
    },
    onItemDragStart(event) {
      console.log("onItemDragStart", event);
      event.itemData = event.fromData;
    },
    onItemDragEnd(event) {
      console.log("onItemDragEnd", event);
      if (event.toData) {
        event.cancel = true;
      }
    },
  },
};
</script>

<style lang="scss" scoped>
#scroll,
#list {
  height: 100%;
}

/*
.item {
  box-sizing: border-box;
  padding: 10px 20px;
  margin-bottom: 10px;
}
*/

.dx-draggable-source {
  opacity: 0.5;
}

.dx-draggable-dragging > * {
  box-shadow:
    0 1px 3px rgba(0, 0, 0, 0.1),
    0 6px 8px rgba(0, 0, 0, 0.2);
}
</style>
