# Getting Started

## Overview

While we were coding huntersofbook, we decided to open source some of our structures. Especially the ui side.

We look forward to making more open source contributions in the future. We are still a learning team.

## Trying huntersofbook Online

soon...

## Adding huntersofbook to your Project

<Tabs>
<Tab name="pnpm" text="pnpm">

```bash

pnpm install huntersofbook

```

</Tab>
<Tab name="npm" text="npm">

```bash

npm install huntersofbook

```

</Tab>
<Tab name="yarn" text="yarn">

```bash

yarn add huntersofbook

```

</Tab>
</Tabs>

## Adding huntersofbook to your Tailwind CSS config

```js
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './index.html',
    './src/**/*.{vue,js,ts,jsx,tsx}',
    './node_modules/@huntersofbook/**/dist/**/*.js',
    './node_modules/huntersofbook/dist/**/*.js',
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}

```
:::tip
huntersofbook requires Vite >=v3.0.0, Vue >=v3.2.0, Node >=v16 and TailwindCSS >v3.0.0
:::

## Contents

- [Form Component](naiveui/)
