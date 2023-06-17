export const FONT_WEIGHT = {
  BOLD: 'bold',
  SEMI: 600,
  NORMAL: 'normal',
}

const textStyles = {
  display1: {
    fontSize: '4.8rem',
    fontWeight: FONT_WEIGHT.SEMI,
    lineHeight: '6rem',
  },
  display2: {
    fontSize: '4rem',
    fontWeight: FONT_WEIGHT.SEMI,
    lineHeight: '4.8rem',
  },
  h1Semi: {
    fontSize: '3.2rem',
    fontWeight: FONT_WEIGHT.SEMI,
    lineHeight: '4.0rem',
  },
  body1Semi: {
    fontSize: '2rem',
    fontWeight: FONT_WEIGHT.SEMI,
    lineHeight: '2.8rem',
  },
  body1: {
    fontSize: '2rem',
    fontWeight: FONT_WEIGHT.NORMAL,
    lineHeight: '2.8rem',
  },
  body2: {
    fontSize: '1.6rem',
    fontWeight: FONT_WEIGHT.NORMAL,
    lineHeight: '2.4rem',
  },
  body2Semi: {
    fontSize: '1.6rem',
    fontWeight: FONT_WEIGHT.SEMI,
    lineHeight: '2.4rem',
  },
  notesSmall: {
    fontSize: '0.8rem',
    fontWeight: FONT_WEIGHT.NORMAL,
    lineHeight: '1.2rem',
  },
  headerBold: {
    fontSize: '1.2em',
    fontWeight: FONT_WEIGHT.BOLD,
    lineheight: '1.4em',
  },
}

export type TextStyles = typeof textStyles

export default textStyles
