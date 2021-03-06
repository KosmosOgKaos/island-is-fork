import { style } from 'treat'

export const frameWrapper = style({
  height: '646px',
  width: '100%',
  minHeight: 124,
  boxSizing: 'border-box',
  overflowX: 'scroll',
  position: 'relative',
  background: 'transparent',
  outline: 'none',
  ':hover': {
    textDecoration: 'none',
  },
})

export const outerWrapper = style({
  width: '889px',
  minHeight: '156px',
  borderTopLeftRadius: '8px',
  borderTopRightRadius: '8px',
  alignItems: 'center',
})

export const innerWrapper = style({
  minHeight: '156px',
  borderTopLeftRadius: '8px',
  borderTopRightRadius: '8px',
})

export const graphWrapper = style({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  width: '889px',
  height: '100%',
})

export const graphParent = style({
  width: '90%',
  height: '80%',
})

export const pie = style({
  width: '100%',
})
