# Used

```ts
import { defineHuntersofbookConfig } from 'huntersofbook/config'

export default defineHuntersofbookConfig({
  tsTOjs: [
    {
      inputFile: 'src/sw.ts',
      outputFile: 'public/sw.js',
    },
    {
      inputFile: 'src/sw.ts',
      outputFile: 'public/yen1i1.js',
    },
  ],
  jsonCopy: {
    schema: 'language/en-US.json',
    outputPath: 'public',
    outputNames: ['en-US', 'tr-TR'],
  },
  blockedWatch: {
    files: ['public/sw.js', 'public/swasadsd.js'],
  },
})
```

## License

MIT License © 2022-PRESENT [productdevbook](https://github.com/productdevbook)
