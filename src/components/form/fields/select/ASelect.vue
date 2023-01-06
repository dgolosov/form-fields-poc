<script setup lang="ts">
import {type PropType} from "vue";
import {useUniqueId} from "../../../../composables";

defineProps({
  label: String,
  modelValue: String,
  invalid: Boolean,
  disabled: Boolean,
  options: {
    type: Array as PropType<{ label: string; value: string }[]>,
    default: () => [],
  }
})

defineEmits(['update:modelValue', 'blur', 'focus'])

const { createId } = useUniqueId('select')
const selectId = createId()

</script>

<script lang="ts">
export default {
  inheritAttrs: false,
}
</script>

<template>
  <div>
    <label :for="selectId">{{ label }}</label>
    <select
        :id="selectId"
        :value="modelValue"
        :class="{
          'ff__select--invalid': invalid,
        }"
        :disabled="disabled"
        @change="$emit('update:modelValue', $event.target.value)"
        @focus="$emit('focus', $event)"
        @blur="$emit('blur', $event)"
        v-bind="$attrs"
    >
      <option value="">Please select...</option>
      <option
          v-for="option in options"
          :value="option.value"
      >
        {{ option.label }}
      </option>
    </select>
  </div>
</template>

<style>
.ff__select--invalid {
  color: darkred;
  border: 1px solid red;
}
</style>
