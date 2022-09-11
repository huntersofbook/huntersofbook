import { zxcvbnOptions } from '@zxcvbn-ts/core'
import {
  Match,
  MatchEstimated,
  MatchExtended,
  Matcher,
} from '@zxcvbn-ts/core/dist/types'

const regexMatcher: Matcher = {
  Matching: class MatchMinLength {
    match({ password }: { password: string }) {
      const matches: Match[] = []
      const re =
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/
      console.log('password', password)
      console.log(re, 're')
      if (re.test(password)) {
        matches.push({
          pattern: 'regex',
          token: password,
          i: 0,
          j: 1,
        })
      } else {
        matches.push({
          pattern: 'regex',
          token: password,
          i: 0,
          j: -1,
        })
      }
      console.log(matches, 'regexMatcher')
      return matches
    }
  },
  feedback(match: MatchEstimated, isSoleMatch?: any) {
    return {
      warning: zxcvbnOptions.translations.warnings.keyPattern,
      suggestions: [],
    }
  },
  scoring(match: MatchExtended) {
    console.log(match.regexMatch, 'regexMatcher')
    return match.regexMatch * 10
  },
}

export { regexMatcher }
