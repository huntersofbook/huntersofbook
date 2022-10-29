import { defineHuntersofbookConfig } from 'hobi/config'

export default defineHuntersofbookConfig({
  deneme: 'asdsd',
  tsTOjs: [
    {
      inputFile: 'src/sw.ts',
      outputFile: 'public/sw.js',
    },
    {
      inputFile: 'src/sw.ts',
      outputFile: 'public/swasadsd.js',
    },
  ],
  blockedWatch: {
    files: ['public/sw.js', 'public/swasadsd.js'],
  },
})
