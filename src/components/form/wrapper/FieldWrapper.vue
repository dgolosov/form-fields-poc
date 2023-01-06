<script setup lang="ts">
import {computed, ref} from 'vue';
import {useUniqueId} from "../../../composables";
import {FieldWrapperSlotProps} from "./types";

const props = defineProps({
  label: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  modelValue: String,
  rules: String,
  disabled: Boolean,
})

const emit = defineEmits(['update:modelValue', 'blur', 'focus'])

const { createId } = useUniqueId('form-field-error')

const formFieldErrorId = createId()
const isTouched = ref(false)
const isDirty = ref(false)
const isShowError = computed(() => isTouched.value)
const errorMessage = computed(() => {
  if (props.rules === 'required' && (props.modelValue == null || props.modelValue === '')) {
    return `${props.label} is required`
  }

  return ''
})
const isRequired = computed(() => props.rules?.includes('required') || false)
const isInvalid = computed(() => isShowError.value && !!errorMessage.value)

function onUpdate(value: unknown) {
  isDirty.value = true
  emit('update:modelValue', value)
}

function onBlur(e: FocusEvent) {
  isTouched.value = true
  emit('blur', e)
}

function onFocus(e: FocusEvent) {
  emit('focus', e)
}

const slotProps = computed<FieldWrapperSlotProps>(() => ({
  label: props.label,
  name: props.name,
  invalid: isInvalid.value,
  modelValue: props.modelValue,
  disabled: props.disabled,
  'onUpdate:modelValue': onUpdate,
  onBlur,
  onFocus,
  'aria-required': isRequired.value,
  'aria-errormessage': formFieldErrorId,
  'aria-invalid': isInvalid.value,
}))
</script>

<template>
  <div>
    <slot v-bind="slotProps" />
    <p
        v-show="isShowError"
        :id="formFieldErrorId"
        class="ff__error-message"
        aria-live="assertive"
        aria-atomic="true"
    >
      {{ errorMessage }}
    </p>
  </div>
</template>

<style>
.ff__error-message {
  color: darkred;
  margin: 0;
}
</style>
