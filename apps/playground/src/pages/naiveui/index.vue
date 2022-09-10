<script setup lang="ts">
import type { InputSchema } from 'huntersofbook'
import { FYup, FormSection, useFormSection } from 'huntersofbook'
import { HPasswordMetter } from '@huntersofbook/ui'
import { HNButton, HNCheckbox, HNInput, HNInputNumber, HNSelect, HNSwitch } from '@huntersofbook/form-naiveui'
import type { InputProps } from 'naive-ui'
interface SignInInput {
  data1: string
  data2: number
  data3: string
  data4: boolean
  data5: boolean
}
const schema: FYup.SchemaOf<SignInInput> = FYup.object({
  data1: FYup.string().required(),
  data2: FYup.number().required(),
  data3: FYup.string().required(),
  data4: FYup.boolean().required(),
  data5: FYup.boolean().required(),
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
        options: [
          {
            slot: 'password-invisible-icon',
            meta: {
              id: 'suffix',
              render() {
                return h('div', { class: 'i-carbon-sun text-blue-500 h-full flex items-center' })
              },
            },
          },
          {
            slot: 'password-visible-icon',
            meta: {
              id: 'suffix',
              render() {
                return h('div', { class: 'i-carbon-sun text-red-500 h-full flex items-center' }, '')
              },
            },
          },
          {
            slot: 'password-visible-icon',
            meta: {
              id: 'suffix',
              render() {
                return h(HPasswordMetter, { password: '123456' })
              },
            },
          },
        ],
        attrs: {
          'type': 'password',
          'on-update:value': () => console.log('asdasd'),
          'show-password-on': 'click',
        } as InputProps,
      },
      {
        id: 'data2',
        name: 'data2',
        label: 'HNInputNumber',
        component: HNInputNumber,
        options: [
          {
            slot: 'prefix',
            meta: {
              value: 'prefix',
            },
          },
          {
            slot: 'suffix',
            meta: {
              id: 'suffix',
              render() {
                return h('div', { class: 'i-carbon-sun h-full flex items-center' }, 'new')
              },
            },
          },
        ],
      },
      {
        id: 'data3',
        name: 'data3',
        label: 'HNSelect',
        component: HNSelect,
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
      {
        id: 'data4',
        name: 'data4',
        label: 'HNCheckbox',
        component: HNCheckbox,
        options: [
        ],
        attrs: {
          checkedValue: true,
          uncheckedValue: false,
        },
      },
      {
        id: 'data5',
        name: 'data5',
        label: 'HNSwitch',
        component: HNSwitch,
        options: [
        ],
      },
      {
        id: 'data5',
        name: 'data5',
        label: 'HNSwitch',
        component: HNButton,
        options: [
          {
            slot: 'prefix',
            meta: {
              value: 'prefix',
            },
          },
          {
            slot: 'icon',
            meta: {
              id: 'suffix',
              render() {
                return h('div', { class: 'i-carbon-sun h-full flex items-center' }, 'new')
              },
            },
          },
        ],
        attrs: {
          data: 'suffix',
        },
      },
    ],
  },
}
const { form, onInvalidSubmit } = useFormSection<SignInInput>(schemas.one.schema, {
  data1: '123',
  data2: 123,
  data3: 's',
  data4: false,
  data5: false,
})
const onSubmit = form.handleSubmit(async (values) => {
  console.log(values)
}, onInvalidSubmit)
const onReset = () => {
  console.log('aa')
  form.setValues({})
}
</script>

<template>
  <div class="grid grid-cols-4 gap-6 max-w-7xl mx-auto">
    <button class="dark:bg-gray-800 bg-gray-200 p-4 rounded-lg" @click="$router.push('/naiveui/login')">
      Login Page
    </button>
    <HPasswordMetter password="1ad" />
    <FormSection :forms="schemas.one.forms" class="grid grid-cols-12 gap-12 col-span-full" @post="onSubmit">
      <template #actions>
        <div class="grid grid-cols-2 gap-10 col-span-full">
          <div class="mb-8 w-full">
            <HNButton
              type="primary"
              attr-type="submit"
              block
              :disabled="form.isSubmitting.value"
              :class="{ 'opacity-25': form.isSubmitting.value }"
              @keypress.enter="onSubmit"
            >
              Send
            </HNButton>
          </div>

          <div class="mb-8 w-full">
            <HNButton
              type="error"
              attr-type="button"
              block
              :disabled="form.isSubmitting.value"
              :class="{ 'opacity-25': form.isSubmitting.value }"
              @click.prevent="onReset"
            >
              Clear All Data
            </HNButton>
          </div>
        </div>
      </template>
    </FormSection>
  </div>
</template>

  <route lang="yaml">
meta:
  layout: naiveui
  </route>
