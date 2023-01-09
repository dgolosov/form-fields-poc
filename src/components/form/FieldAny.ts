import {defineComponent, defineAsyncComponent, type PropType, h} from "vue";
import {FieldWrapper} from "./wrapper";
import type {FieldWrapperSlotProps} from "./wrapper/types";

const inputComponents = {
    select: [() => import('./fields/select/ASelect.vue'), (props) => ({ options: props.options })],
    text: [() => import('./fields/input-text/AInputText.vue'), (props) => ({})],
} as const

export default defineComponent({
    name: 'FieldAny',
    props: {
        type: {
            type: String as PropType<keyof typeof inputComponents>,
            required: true,
        },

        // FieldWrapper's props
        label: String,
        name: String,
        modelValue: String,
        rules: String,

        // Input component's props
        options: {
            type: Array as PropType<{ label: string; value: string }[]>,
            default: () => [],
        }
    },
    emits: ['update:modelValue', 'blur', 'focus'],
    setup(props, ctx) {
        const [componentImport, getInputComponentProps] = inputComponents[props.type]
        const inputComponent = defineAsyncComponent(componentImport)

        return () => h(
            FieldWrapper,
            {
                label: props.label,
                name: props.name,
                modelValue: props.modelValue,
                rules: props.rules,
                'onUpdate:modelValue': (value: unknown) => ctx.emit('update:modelValue', value),
                onFocus: (e: FocusEvent) => ctx.emit('focus', e),
                onBlur: (e: FocusEvent) => ctx.emit('blur', e),
            },
            {
                default: (slotProps: FieldWrapperSlotProps) => h(inputComponent, {
                    ...slotProps,
                    ...getInputComponentProps(props),
                }),
            },
        )
    }
})
