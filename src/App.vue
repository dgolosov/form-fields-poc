<script setup lang="ts">
import {ASelect, FieldWrapper, FieldAny, AInputText } from "./components";
import {ref} from "vue";

const textValue = ref(null)
const selectValue = ref(null)

const selectOptions = [
  { label: 'A', value: 'a' },
  { label: 'B', value: 'b' },
  { label: 'C', value: 'c' },
  { label: 'D', value: 'd' },
]
</script>

<template>
  <main>
    <h1>Form Fields Demo</h1>
    <div>
      <pre>{{ {textValue, selectValue } }}</pre>
    </div>
    <form @submit.prevent>
      <FieldWrapper
          v-slot="fieldProps"
          v-model="textValue"
          label="Text 1"
          name="text1"
          rules="required"
      >
        <AInputText v-bind="fieldProps"/>
      </FieldWrapper>

      <FieldAny
          type="text"
          v-model="textValue"
          label="Text 2"
          name="text2"
          rules="required"
      />

      <FieldWrapper
          v-slot="fieldProps"
          v-model="selectValue"
          label="Select 1"
          name="select1"
          rules="required"
      >
        <ASelect
            v-bind="fieldProps"
            :options="selectOptions"
        />
      </FieldWrapper>

      <FieldAny
          type="select"
          v-model="selectValue"
          label="Select 2"
          name="select2"
          rules="required"
          :options="selectOptions"
      />
    </form>
  </main>
</template>

<style scoped>
main {
  width: 100%;
  max-width: 300px;
  margin: 2rem auto;
}

pre {
  background: lightgray;
  padding: 1rem;
}

form {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  border: 1px solid slategray;
  padding: 1rem;
}

</style>

