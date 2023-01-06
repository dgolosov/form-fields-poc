<script setup lang="ts">
import {useUniqueId} from "../../../../composables";

defineProps({
  label: String,
  modelValue: String,
  invalid: Boolean,
  disabled: Boolean,
})

defineEmits(['update:modelValue', 'blur', 'focus'])

const { createId } = useUniqueId('input-text')
const inputId = createId()

</script>

<script lang="ts">
export default {
  inheritAttrs: false,
}
</script>

<template>
  <div>
    <label :for="inputId">{{ label }}</label>
    <input
        :id="inputId"
        type="text"
        :value="modelValue"
        :class="{
          'ff__input--invalid': invalid,
        }"
        :disabled="disabled"
        @input="$emit('update:modelValue', $event.target.value)"
        @focus="$emit('focus', $event)"
        @blur="$emit('blur', $event)"
        v-bind="$attrs"
    />
  </div>
</template>

<style>
.ff__input--invalid {
  color: darkred;
  border: 1px solid red;
}
</style>
