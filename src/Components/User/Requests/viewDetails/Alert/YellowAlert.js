import React from 'react'
import ErrorOutlineOutlinedIcon from '@material-ui/icons/ErrorOutlineOutlined'
import './styles.css'

const YellowAlert = ({ alertText }) => {
  return (
    <div className='yellowalert-container'>
      <ErrorOutlineOutlinedIcon
        style={{ color: '#FFB600', marginRight: '2rem' }}
      />
      <div className='yellowalert'>{alertText}</div>
    </div>
  )
}

export default YellowAlert
