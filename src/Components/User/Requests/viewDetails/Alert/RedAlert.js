import React from 'react'
import ThumbDownOutlinedIcon from '@material-ui/icons/ThumbDownOutlined'
import './styles.css'

const RedAlert = () => {
  return (
    <div className='redalert-container'>
      <ThumbDownOutlinedIcon
        style={{ color: '#F03738', marginRight: '2rem' }}
      />
      <div className='redalert'>You have declined this vendor’s pitch.</div>
    </div>
  )
}

export default RedAlert
