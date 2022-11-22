import { Revenuecat } from '@huntersofbook/revenuecat-ts'
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

// await revenuecat
//   .getOfferings({ userId, platform: 'ios' })
//   .then(res => console.log(res.offerings, 'getOfferings'))

// await revenuecat
//   .postSubscriptionsAttributes({
//     userId,
//     data: {
//       attributes: {
//         $email: {
//           value: 'asdasd',
//         },
//       },
//     },
//   }).then(res => console.log(res, 'postSubscriptionsAttributes'))
