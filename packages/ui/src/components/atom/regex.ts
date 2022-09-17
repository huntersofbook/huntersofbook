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
      return matches
    }
  },
  feedback(_match: MatchEstimated, _isSoleMatch?: any) {
    return {
      warning: zxcvbnOptions.translations.warnings.keyPattern,
      suggestions: [],
    }
  },
  scoring(match: MatchExtended) {
    return match.regexMatch * 10
  },
}

export { regexMatcher }
