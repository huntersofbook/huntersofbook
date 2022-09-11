import { zxcvbnOptions } from '@zxcvbn-ts/core'
import {
  Match,
  MatchEstimated,
  MatchExtended,
  Matcher,
} from '@zxcvbn-ts/core/dist/types'

function regexMatcher(regex: RegExp) {
  const minLengthMatcher: Matcher = {
    Matching: class MatchMinLength {
      minLength = 8

      match({ password }: { password: string }) {
        const matches: Match[] = []
        const re = regex

        if (!re.test(password)) {
          matches.push({
            pattern: 'minLength',
            token: password,
            i: 0,
            j: password.length - 1,
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
      // this will take the length of the password and multiple it by 10
      // to create a higher scoring the more characters are added
      return match.token.length * 10
    },
  }
  return minLengthMatcher
}
export { regexMatcher }
