export default {
    editor: {
        label: {
            en: "kros-roi-gant",
        }
    },
    triggerEvents: [
        {
            name: "onDragStart",
            label: { en: "On drag start" },
            event: {},
        },
        {
            name: "onRemove",
            label: { en: "On remove item" },
            event: {},
        },
        {
            name: "onAdd",
            label: { en: "On add item" },
            event: {},
        },
        {
            name: "onReorder",
            label: { en: "On reorder item" },
            event: {},
        }
    ],
    inherit: {
        type: "ww-layout"
    },
    options: {
        layout: ["flex"]
    },
    properties: {
        data: {
            label: {
                en: "📦 Data"
            },
            type: "Info",
            options: {
                text: {
                    en: "Bind your data"
                }
            },
            bindable: "repeatable",
            section: "settings",
            bindingValidation: {
                validations: [
                    {
                        type: "array"
                    },
                    {
                        type: "object"
                    }
                ],
                tooltip: "An array of data ``[{...}, {...}, {...}]``, <br> or a collection."
            }
        },
        itemContainer: {
            hidden: true,
            defaultValue: {
                isWwObject: true,
                type: "ww-flexbox"
            }
        },
        draggingGroupName: {
            label: {
                en: "Dragging Group Name",
            },
            type: "Text",
            defaultValue: "",
            section: "settings",
        },
        displayExpr: {
            label: {
                en: "Display Expression"
            },
            type: "Text",
            defaultValue: "text",
            section: "settings"
        },
    },
};
