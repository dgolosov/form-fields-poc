export interface FieldWrapperSlotProps {
    label: string
    name: string
    invalid: boolean
    modelValue: unknown
    disabled: boolean
    'onUpdate:modelValue': (value: unknown) => void
    onBlur: (e: FocusEvent) => void
    onFocus: (e: FocusEvent) => void
    'aria-required': boolean
    'aria-errormessage': string
    'aria-invalid': boolean
}
