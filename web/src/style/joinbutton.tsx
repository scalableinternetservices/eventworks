import { style } from './styled';

const BUTTON_SIZE = '54px';

export const JoinButtonBase = style<'div', {}>('div', 'join-button', () => ({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  borderRadius: '50%',
  height: BUTTON_SIZE,
  width: BUTTON_SIZE,
  backgroundColor: 'limegreen',
  verticalAlign: 'middle',
  lineHeight: BUTTON_SIZE,
  color: "white",
  fontWeight: "bold",
  boxShadow: '3px 3px 10px rgba(0, 0, 0, 0.5)',
  cursor: 'pointer',
  ':hover': {
    backgroundColor: 'rgb(118, 245, 118)'
  }
}))

export const LeaveButtonBase = style<'div', {}>('div', 'leave-button', () => ({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  borderRadius: '50%',
  height: BUTTON_SIZE,
  width: BUTTON_SIZE,
  backgroundColor: 'red',
  verticalAlign: 'middle',
  lineHeight: BUTTON_SIZE,
  color: "white",
  fontWeight: "bold",
  fontSize: 14,
  boxShadow: '3px 3px 10px rgba(0, 0, 0, 0.5)',
  cursor: 'pointer',
  ':hover': {
    backgroundColor: 'indianred'
  }
}))