# Form Generator Naive UI Setup



We made each of the [Naive UI](https://www.naiveui.com/en-US/os-theme) components vee-validate compatible and made the components usable again.

You can fully use Naive UI all props etc.



### Step. 1: Adding Naive UI componenents to your Project

<Tabs>
<Tab name="pnpm" text="pnpm">

```bash

pnpm install @huntersofbook/form-naiveui

```

</Tab>
<Tab name="npm" text="npm">

```bash

npm install @huntersofbook/form-naiveui

```

</Tab>
<Tab name="yarn" text="yarn">

```bash

yarn add @huntersofbook/form-naiveui


```

</Tab>
</Tabs>

## Step. 2: Adding Volar Support
Add some scripts to tsconfig.json.


```json

{
  "compilerOptions": {
    ...
    "types": [
      ...
      "naive-ui/volar",
      "@huntersofbook/ui/volar",
      "@huntersofbook/form-naiveui/volar",
      ...
    ],
    ...
  },
}

```

:::tip
huntersofbook requires Vite >=v3.0.0, Vue >=v3.2.0, Node >=v16, Tailwind CSS >v3.0.0 and Typescript >=v4.7.4
:::
