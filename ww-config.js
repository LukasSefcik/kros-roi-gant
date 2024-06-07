export default {
    editor: {
        label: {
            en: "kros-roi-gant",
        }
    },
    triggerEvents: [
        { name: 'mousedown', label: { en: 'broMousedown' }, event: { value: [] }, default: true }
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
    },
};
