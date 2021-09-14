import { Button, Card, CardContent } from '@material-ui/core'
import React, { useEffect, useState } from 'react'
import '../Details.css'
import './viewdetails.css'
import { makeStyles } from '@material-ui/core/styles'
import RedAlert from './Alert/RedAlert'
import YellowAlert from './Alert/YellowAlert'
import PersonIcon from '@material-ui/icons/Person'
import ApartmentIcon from '@material-ui/icons/Apartment'
import EmailIcon from '@material-ui/icons/Email'
import PhoneIcon from '@material-ui/icons/Phone'
import WhatsAppIcon from '@material-ui/icons/WhatsApp'
import LocationOnOutlinedIcon from '@material-ui/icons/LocationOnOutlined'
import Status from '../../../Table/Status/Status'
import axios from 'axios'
import PropTypes from 'prop-types'
import AppBar from '@material-ui/core/AppBar'
import Tabs from '@material-ui/core/Tabs'
import Tab from '@material-ui/core/Tab'
import Typography from '@material-ui/core/Typography'
import Box from '@material-ui/core/Box'

// import viewDetails from './viewDetails/viewDetails';
require('dotenv').config()

function TabPanel(props) {
  const { children, value, index, ...other } = props

  return (
    <div
      role='tabpanel'
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box p={3}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  )
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
}

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  }
}

const PitchSummery = ({
  setCurrentSection,
  selectedTableItem,
  getAllVendor,
  theme,
  accept,
  setAccept,
  decline,
  setDecline,
}) => {
  const [winsize, setwinsize] = useState(window.screen.width)
  const [winheight, setwinheight] = useState(window.screen.height)
  const handleResize = () => {
    if (window.innerWidth < 1000) {
      setwinsize(window.innerWidth)
    } else {
      setwinsize(window.innerWidth)
    }
    if (window.innerHeight < 1000) {
      setwinheight(window.innerHeight)
    } else {
      setwinheight(window.innerHeight)
    }
  }
  useEffect(() => {
    window.addEventListener('resize', handleResize)
    window.addEventListener('resize', handleResize)
    console.log(winsize, winheight, 'LandingPageImage')
  }, [window.screen.width, window.screen.height])
  console.log(selectedTableItem, 'selectedTableItem')

  const useStyles = makeStyles({
    root: {
      minWidth: winsize > 450 ? 400 : 300,
      //   maxWidth:400,
      //   minHeight:275,
      //   maxHeight:400,
      //   marginTop:20,
      borderWidth: 1,
      borderRadius: 10,
      borderColor: '#2D2D2D',
      backgroundColor: '#121417',
    },
    tabWrapper: {
      flexGrow: 1,
      width: '100%',
    },

    indicator: {
      backgroundColor: '#FFB600',
    },

    tabs: {
      backgroundColor: '#121111',
    },
  })
  const classes = useStyles()
  const [userId, setUserId] = useState(
    JSON.parse(localStorage.getItem('profile'))?.data?.id
  )
  const handleAccept = async () => {
    const sendingData = {
      Pid: selectedTableItem?.Pid,
      Uid: selectedTableItem?.Uid,
      pitch_value: selectedTableItem?.pitch_value,
    }
    await axios
      .post(
        `${process.env.REACT_APP_URL}/user/user_accepted_pitch/${userId}`,
        sendingData
      )
      .then(function (response) {
        console.log(response, 'success')
      })
    getAllVendor()
    // setCurrentSection(7)
    setAccept(true)
    window.scrollTo(0, 235)
  }
  const handleDecline = async () => {
    const sendingData = {
      Pid: selectedTableItem?.Pid,
      Uid: selectedTableItem?.Uid,
    }
    await axios
      .post(
        `${process.env.REACT_APP_URL}/user/user_rejected_pitch/${userId}`,
        sendingData
      )
      .then(function (response) {
        console.log(response, 'success')
      })
    // getAll()
    // setCurrentSection(8)
    setDecline(true)
    window.scrollTo(0, 235)
  }

  const DeliveryAddress = selectedTableItem
    ? JSON.parse(selectedTableItem?.delivery_address)
    : ''
  const DeliveryAddress1 = DeliveryAddress
    ? DeliveryAddress?.city + ',' + DeliveryAddress?.state
    : '___'
  const DeliveryDate =
    selectedTableItem?.deliver_by !== '0000-00-00 00:00:00'
      ? selectedTableItem?.deliver_by.toString().substring(0, 10)
      : selectedTableItem?.data?.startDate
        ? JSON.parse(selectedTableItem?.data)?.startDate?.slice(0, 10) +
        ' to ' +
        JSON.parse(selectedTableItem?.data)?.endDate?.slice(0, 10)
        : '___'

  const data = selectedTableItem ? JSON.parse(selectedTableItem?.data) : ''
  const price_detail = selectedTableItem
    ? JSON.parse(selectedTableItem?.price_detail)
    : ''

  // mui config

  const [value, setValue] = React.useState(0)

  const handleChange = (event, newValue) => {
    setValue(newValue)
  }

  return (
    <div className='pitch-summary-container'>
      <div className='pitch-summary-content-wrapper'>
        <div className='pitch-summary-content'>
          <div className='pitch-summary-header' style={theme === true ? { color: "black" } : {}}>Price details</div>
          <div className='pitch-summary-desc'>
            {
              selectedTableItem?.product_status === "acceptedPitch" ?
                <p>
                  you have accepted the vendors pitch go to vendor details tab to see vendors personal detail.
                </p>
                : decline ?
                  <p>
                    you have declined the vendor pitch you can no longer access the vendor complete details
                  </p>
                  :
                  <p>
                    A certain vendor have provided a price. Accept the pitch to see the
                    vendor’s details.
                  </p>
            }          </div>
        </div>
        <div className='pitch-summary-button-wrapper'>
          {accept ? (
            <YellowAlert
              // alertText={'You can only see price details when you got a pitch!'}
              alertText={
                'you have accepted this vendors pitch!'
              }

            />
          ) : decline ? (
            <RedAlert />
          ) : (
            <>
              <div className='pitch-summary-button-header'>
                Accept the pitch for you to be able to see the vendor’s details.
              </div>
              <div className='buttons'>
                <Button className='acceptbutton' onClick={handleAccept}>
                  Accept
                </Button>
                <Button className='rejectbutton' onClick={handleDecline}>
                  Decline
                </Button>
              </div>
            </>
          )}
        </div>
      </div>
      <div className='pitch-summary-tabs-wrapper'>
        <div className={classes.tabWrapper}>
          <AppBar
            position='static'
            style={{
              backgroundColor: theme ? '#ffffff' : '#121417',
              color: theme ? 'black' : '',
            }}
          >
            <Tabs
              value={value}
              onChange={handleChange}
              aria-label='simple tabs example'
              classes={{
                indicator: classes.indicator,
                tabs: classes.tabs,
              }}
            >
              <Tab label='Pitch 1' {...a11yProps(0)} />
              <Tab label='Pitch 2' {...a11yProps(1)} />
              <Tab label='Pitch 3' {...a11yProps(2)} />
            </Tabs>
          </AppBar>
          <TabPanel
            value={value}
            index={0}
            style={{
              backgroundColor: theme ? '#ffffff' : '#121417',
              color: theme ? 'black' : '',
            }}
          >
            <div className='invoice-wrapper'>
              <div
                style={{
                  fontFamily: 'Open Sans',
                  fontStyle: 'normal',
                  fontWeight: 'normal',
                  fontSize: '16px',
                  lineHeight: '22px',
                  letterSpacing: '0.02em',
                  color: '#F5F5F5',
                  marginBottom: '3rem',
                }}
              >
                Invoice
              </div>
              <div className='invoice-details-wrapper'>
                <div className='invoice-details-rows'>
                  <div className='invoice-details-row-1' style={theme === true ? { color: "black" } : {}}>Price</div>
                  <div className='invoice-details-row-2' style={theme === true ? { color: "black" } : {}}>₹ {price_detail?.price}</div>
                </div>
                <div className='invoice-details-rows'>
                  <div className='invoice-details-row-1' style={theme === true ? { color: "black" } : {}}>+GST</div>
                  <div className='invoice-details-row-2' style={theme === true ? { color: "black" } : {}}>{price_detail?.gst}</div>
                </div>
                <div className='invoice-details-rows'>
                  <div className='invoice-details-row-1' style={theme === true ? { color: "black" } : {}}>+Delivery charges</div>
                  <div className='invoice-details-row-2' style={theme === true ? { color: "black" } : {}}>{price_detail?.deliverycharges}</div>
                </div>
                <div className='invoice-details-rows'>
                  <div className='invoice-details-row-1' style={theme === true ? { color: "black" } : {}}>Extra charges</div>
                  <div className='invoice-details-row-2' style={theme === true ? { color: "black" } : {}}>{price_detail?.extracharges}</div>
                </div>
              </div>
              <div className='grand-total-wrapper'>
                <div className='grand-total-header' style={theme === true ? { color: "black" } : {}}>Grand total:</div>
                <div className='grand-total-amount'> ₹ {selectedTableItem?.pitch_value}</div>
              </div>
            </div>
          </TabPanel>
          <TabPanel value={value} index={1}>
            <div className='invoice-wrapper'>
              <div
                style={{
                  fontFamily: 'Open Sans',
                  fontStyle: 'normal',
                  fontWeight: 'normal',
                  fontSize: '16px',
                  lineHeight: '22px',
                  letterSpacing: '0.02em',
                  color: '#F5F5F5',
                  marginBottom: '3rem',
                }}
              >
                Invoice
              </div>
              <div className='invoice-details-wrapper'>
                <div className='invoice-details-rows'>
                  <div className='invoice-details-row-1' style={theme === true ? { color: "black" } : {}}>Price</div>
                  <div className='invoice-details-row-2' style={theme === true ? { color: "black" } : {}}>₹ 10,400</div>
                </div>
                <div className='invoice-details-rows'>
                  <div className='invoice-details-row-1' style={theme === true ? { color: "black" } : {}}>+GST</div>
                  <div className='invoice-details-row-2'>10%</div>
                </div>
                <div className='invoice-details-rows'>
                  <div className='invoice-details-row-1' style={theme === true ? { color: "black" } : {}}>+Delivery charges</div>
                  <div className='invoice-details-row-2'>₹ 500</div>
                </div>
                <div className='invoice-details-rows'>
                  <div className='invoice-details-row-1' style={theme === true ? { color: "black" } : {}}>Extra charges</div>
                  <div className='invoice-details-row-2'>₹ 500</div>
                </div>
              </div>
              <div className='grand-total-wrapper'>
                <div className='grand-total-header'>Grand total:</div>
                <div className='grand-total-amount'>₹ 13,000</div>
              </div>
            </div>
          </TabPanel>
          <TabPanel value={value} index={2}>
            <div className='invoice-wrapper'>
              <div
                style={{
                  fontFamily: 'Open Sans',
                  fontStyle: 'normal',
                  fontWeight: 'normal',
                  fontSize: '16px',
                  lineHeight: '22px',
                  letterSpacing: '0.02em',
                  color: '#F5F5F5',
                  marginBottom: '3rem',
                }}
              >
                Invoice
              </div>
              <div className='invoice-details-wrapper'>
                <div className='invoice-details-rows'>
                  <div className='invoice-details-row-1'>Price</div>
                  <div className='invoice-details-row-2'>₹ 10,400</div>
                </div>
                <div className='invoice-details-rows'>
                  <div className='invoice-details-row-1'>+GST</div>
                  <div className='invoice-details-row-2'>10%</div>
                </div>
                <div className='invoice-details-rows'>
                  <div className='invoice-details-row-1'>+Delivery charges</div>
                  <div className='invoice-details-row-2'>₹ 500</div>
                </div>
                <div className='invoice-details-rows'>
                  <div className='invoice-details-row-1'>Extra charges</div>
                  <div className='invoice-details-row-2'>₹ 500</div>
                </div>
              </div>
              <div className='grand-total-wrapper'>
                <div className='grand-total-header'>Grand total:</div>
                <div className='grand-total-amount'>₹ 13,000</div>
              </div>
            </div>
          </TabPanel>
        </div>
      </div>
    </div>
  )
}

export default PitchSummery
