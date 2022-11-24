export type CssColor = string

export interface ColorConfigEssentialColors {
  // Accent colors
  primary: CssColor
  secondary: CssColor
  success: CssColor
  error: CssColor
}

export type ColorConfig = {
  [colorName: string]: CssColor
} & ColorConfigEssentialColors
