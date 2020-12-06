import { style } from './styled'

export const UpArrow = style<'div', {}>('div', 'up-arrow', () => ({
  border: 'solid black',
  borderWidth: '0 5px 5px 0',
  padding: 3,
  width: 15,
  height: 15,
  transform: 'rotate(-135deg)',
  margin: '10px auto 0 auto',
  cursor: 'pointer'
}))

export const DownArrow = style<'div', {}>('div', 'down-arrow', () => ({
  border: 'solid black',
  borderWidth: '0 5px 5px 0',
  padding: 3,
  width: 15,
  height: 15,
  transform: 'rotate(135deg)',
  margin: '10px auto 0 auto',
  cursor: 'pointer'
}))