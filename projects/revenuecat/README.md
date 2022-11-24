  <p>
      <a href="https://www.npmjs.com/package/@huntersofbook/revenuecat"><img src="https://img.shields.io/npm/v/@huntersofbook/revenuecat.svg?style=flat&colorA=002438&colorB=28CF8D" alt="Version"></a>
      <a href="https://www.npmjs.com/package/@huntersofbook/revenuecat"><img src="https://img.shields.io/npm/dm/@huntersofbook/revenuecat.svg?style=flat&colorA=002438&colorB=28CF8D" alt="Downloads"></a>
      <a href="./LICENSE"><img src="https://img.shields.io/github/license/huntersofbook/huntersofbook.svg?style=flat&colorA=002438&colorB=28CF8D" alt="License"></a>
    </p>

# RevenueCat REST API
## Installation
```bash
pnpm install @huntersofbook/revenuecat
```

## Usage
```ts
import { Revenuecat } from '@huntersofbook/revenuecat'
import * as dotenv from 'dotenv'
dotenv.config({
  path: '.env',
})

const revenuecat = new Revenuecat({
  secretKey: process.env.secretKey as string,
  iosKey: process.env.iosKey as string,
  androidKey: process.env.androidKey as string,
})

const userId = '$RCAnonymousID:17c0ff7b3c70462'

await revenuecat
  .getSubscriptions({ userId })
  .then(res => console.log(res.subscriber, 'getSubscriptions'))

await revenuecat
  .getOfferings({ userId, platform: 'ios' })
  .then(res => console.log(res.offerings, 'getOfferings'))

await revenuecat
  .postSubscriptionsAttributes({
    userId,
    data: {
      attributes: {
        $email: {
          value: 'asdasd',
        },
      },
    },
  }).then(res => console.log(res, 'postSubscriptionsAttributes'))
```

### TODO

- [ ] Add more methods - https://www.revenuecat.com/reference/basic
- [ ] Add more tests
- [ ] Add more examples

### Add more methods
- [ ] [Delete Subscriber](https://www.revenuecat.com/reference/delete-subscriber)
- [ ] [subscribersattribution](https://www.revenuecat.com/reference/subscribersattribution)
- [ ] [Override a Customer's Current Offering](https://www.revenuecat.com/reference/override-offering)
- [ ] [Remove a Customer's Current Offering Override](https://www.revenuecat.com/reference/delete-offering-override)
- [ ] [Create a Purchase](https://www.revenuecat.com/reference/receipts)
- [ ] [Google Play: Refund and Revoke Purchase](https://www.revenuecat.com/reference/refund-a-google-subscription)
- [ ] [Google Play: Refund and Revoke Subscription](https://www.revenuecat.com/reference/revoke-a-google-subscription)
- [ ] [Google Play: Defer a Subscription](https://www.revenuecat.com/reference/defer-a-google-subscription)
- [ ] [Grant a Promotional Entitlement](https://www.revenuecat.com/reference/grant-a-promotional-entitlement)
- [ ] [Revoke Promotional Entitlements](https://www.revenuecat.com/reference/revoke-promotional-entitlements)

## License

MIT License © 2022-PRESENT [productdevbook](https://github.com/productdevbook)