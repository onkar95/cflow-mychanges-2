import { makeStyles } from '@material-ui/core/styles'

export const useStyles = makeStyles((theme) => ({
  cssOutlinedInput: {
    '&$cssFocused $notchedOutline': {
      borderColor: '#FFB600; !important',
    },
  },

  cssFocused: {},

  notchedOutline: {
    borderWidth: '1px',
  },

  textfield: {
    backgroundColor: '#383838',
    border: '1px solid #2D2D2D',
    boxSizing: 'border-box',
    borderRadius: '8px',
  },

  inputLabel: {
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    width: '100%',
    color: 'red',
  },

  input: {
    '&::placeholder': {
      textOverflow: 'ellipsis !important',
      color: 'blue',
    },
  },

  icon: {
    color: '#FFFFFF',
  },

  button: {
    marginBottom: '5rem',
    background: '#FFB600',
    padding: '1rem 2rem',
    boxShadow:
      '0px 4px 7px -1px rgba(0, 0, 0, 0.11), 0px 2px 4px -1px rgba(0, 0, 0, 0.07)',
    borderRadius: '20px',
    fontFamily: 'Open Sans',
    fontStyle: 'normal',
    fontWeight: 'bold',
    fontSize: '12px',
    lineHeight: '12px',
    display: 'flex',
    alignItems: 'center',
    textAlign: 'center',
    letterSpacing: '-0.04em',
    color: '#121317',
    '&:hover': {
      background: '#ffc533',
    },
  },

  //   submit: {
  //     backgroundColor: theme.palette.action.selected,
  //     color: theme.typography.color.main,
  //     padding: '0.6rem 2rem 0.6rem 2rem',
  //     margin: '0.5rem 0 1rem 0',
  //     borderRadius: '20px',
  //     fontSize: '1rem',
  //     '&:hover': {
  //       backgroundColor: theme.palette.action.hover,
  //     },
  //   },
}))
