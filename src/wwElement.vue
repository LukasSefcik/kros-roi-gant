<template>
  <DxList
      :data-source="content.data"
      key-expr="id"
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
  </DxList>

<!--  <DxScrollView id="scroll">-->
<!--    <DxDraggable-->
<!--      id="list"-->
<!--      :group="content.draggingGroupName"-->
<!--      :on-drag-start="onListDragStart"-->
<!--      data="dropArea"-->
<!--    >-->
<!--      <DxDraggable-->
<!--        v-for="(item, index) in content.data"-->
<!--        :key="index"-->
<!--        :clone="true"-->
<!--        :group="content.draggingGroupName"-->
<!--        :data="item"-->
<!--        :on-drag-start="onItemDragStart"-->
<!--        :on-drag-end="onItemDragEnd"-->
<!--      >-->
<!--        <wwLayoutItemContext-->
<!--          :index="index"-->
<!--          :item="null"-->
<!--          is-repeat-->
<!--          :data="item"-->
<!--          :repeated-items="content.data"-->
<!--        >-->
<!--          <wwElement v-bind="content.itemContainer"></wwElement>-->
<!--        </wwLayoutItemContext>-->
<!--      </DxDraggable>-->
<!--    </DxDraggable>-->
<!--  </DxScrollView>-->
</template>

<script>
import "./dx.fluent.dx-light-theme.css";

import DxList, { DxItemDragging } from 'devextreme-vue/list';

export default {
  components: {
    DxList,
    DxItemDragging,
  },
  props: {
    content: { type: Object, required: true },
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
  },
};
</script>

<style lang="scss" scoped>
</style>
