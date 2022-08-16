<script setup lang="ts">
import type { InputSchema } from 'huntersofbook'
import { FYup, FormSection, useFormSection } from 'huntersofbook'
import { HNInput, HNInputNumber, HNSelect } from '@huntersofbook/form-naiveui'
import { AtomButton } from '@huntersofbook/ui'

interface SignInInput {
  data1: string
  data2: string
  data3: string
  data4: string
  data5: string
}

const schema: FYup.SchemaOf<SignInInput> = FYup.object({
  data1: FYup.string().required(),
  data2: FYup.string().required(),
  data3: FYup.string().required(),
  data4: FYup.string().required(),
  data5: FYup.string().required(),
})

const schemas: InputSchema<SignInInput, 'one'> = {
  one: {
    schema,
    forms: [
      {
        id: 'data1',
        name: 'data1',
        label: 'HNInput',
        component: HNInput,
        options: [],
      },
      {
        id: 'data2',
        name: 'data2',
        label: 'HNInputNumber',
        component: HNInputNumber,
        options: [],
      },
      {
        id: 'data3',
        name: 'data3',
        label: 'HNSelect',
        component: HNSelect,
        options: [{
          meta: {
            options: [
              {
                label: 's',
                value: 's',
              },
              {
                label: 's1',
                value: 's1',
              },
            ],
          },
        }],

      },
    ],
  },
}

const { form, onInvalidSubmit } = useFormSection<SignInInput>(schemas.one.schema, {
  data1: '',
  data2: '',
  data3: '',
  data4: '',
  data5: '',
})

const onSubmit = form.handleSubmit(async (values) => {
  console.log(values)
}, onInvalidSubmit)
</script>

<template>
  <div class="grid grid-cols-4 gap-6 max-w-7xl mx-auto">
    <button class="dark:bg-gray-800 bg-gray-200 p-4 rounded-lg" @click="$router.push('/naiveui/login')">
      Login Page
    </button>
    <FormSection :forms="schemas.one.forms" class="col-span-full" @post="onSubmit">
      <template #actions>
        <div class="mb-8 w-full">
          <AtomButton
            type="primary"
            attr-type="submit"
            block
            :disabled="form.isSubmitting.value"
            :class="{ 'opacity-25': form.isSubmitting.value }"
            @keypress.enter="onSubmit"
          >
            Send
          </AtomButton>
        </div>
      </template>
    </FormSection>
  </div>
</template>

<route lang="yaml">
meta:
  layout: naiveui
</route>
