<script setup lang="ts">
import { FYup, FormSection, useFormSection } from 'huntersofbook'
import type { InputSchema } from 'huntersofbook'
import { BookNInputMobile } from '@huntersofbook/form-naiveui'

const { t } = useI18n()
interface SignInInput {
  email: string
  isCookies?: boolean
  password: string
  rememberMe?: boolean
}

const schema: FYup.SchemaOf<SignInInput> = FYup.object({
  email: FYup.string().required().email(),
  password: FYup.string()
    .required()
    .matches(
      /^.*(?=.{8,})((?=.*[!@#$%^&*()\-_=+{};:,<.>]){1})(?=.*\d)((?=.*[a-z]){1})((?=.*[A-Z]){1}).*$/,
      t('profile.settings.password_matches'),
    ),
  rememberMe: FYup.boolean().required(),
  isCookies: FYup.boolean().required(),
})

const schemas: InputSchema<SignInInput, 'one'> = {
  one: {
    schema,
    forms: [
      {
        id: 'email',
        name: 'email',
        label: t('login.email'),
        component: BookNInputMobile,
        options: [],
      },
      {
        id: 'password',
        name: 'password',
        label: t('login.password'),
        component: BookNInputMobile,
        options: [],
        attrs: {
          type: 'password',
          placeholder: '********',
        },
      },
    ],
  },
}

const { form, onInvalidSubmit } = useFormSection<SignInInput>(schemas.one.schema, {
  email: 'hi@productdevbook.com',
  password: '}c3!c+zs6~X+eJ)q',
  isCookies: false,
  rememberMe: false,
})

const onSubmit = form.handleSubmit(async (values) => {
  console.log(values)
}, onInvalidSubmit)

const isLoading = ref(false)
</script>

<template>
  <div class="grid w-full p-4">
    <div class="mb-10">
      <h2 class="mt-6 text-2xl font-extrabold">
        Sign in to your account
      </h2>
      <p class="mt-2 text-sm text-gray-600">
        productdevbook mobile app
      </p>
    </div>
    <FormSection :forms="schemas.one.forms" @post="onSubmit">
      <template #actions>
        <div class="mb-8 w-full">
          <AtomButton
            type="primary"
            attr-type="submit"
            block
            :loading="isLoading"
            :disabled="form.isSubmitting.value"
            :class="{ 'opacity-25': form.isSubmitting.value }"
            @keypress.enter="onSubmit"
          >
            {{ t('login.login-in') }}
          </AtomButton>
        </div>
      </template>
      <div class="flex flex-col items-center justify-center">
        <div>
          <router-link
            to="/auth/signup"
            class="ion-margin-top text-muted-blue-500 font-semibold underline"
          >
            {{ t('login.create-new') }}
          </router-link>
        </div>
      </div>
    </FormSection>
  </div>
</template>

<route lang="yaml">
meta:
  layout: naiveui
</route>
