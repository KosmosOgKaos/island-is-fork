import { responsiveStyleMap } from '@island.is/island-ui/theme'
import { style } from 'treat'

export const gradient = style({
  background:
    'linear-gradient(120.27deg, #0161FD -0.52%, #3F46D2 29.07%, #812EA4 59.85%, #C21578 90.63%, #FD0050 117.86%)',
})

export const tabSectionImg = responsiveStyleMap({
  maxWidth: {
    md: '382px',
  },
  maxHeight: '400px',
  width: '100%',
  float: 'right',
  marginLeft: {
    md: '20px',
  },
  marginRight: {
    lg: '-80px',
  },
})
