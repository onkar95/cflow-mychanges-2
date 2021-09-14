import { Button, Card, CardContent } from '@material-ui/core'
import React, { useEffect, useState } from 'react'
import './viewdetails.css'
import '../Details.css'
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
// import viewDetails from './viewDetails/viewDetails';
require('dotenv').config()

const VendorDetails = ({
  setCurrentSection,
  selectedTableItem,
  getAllVendor,
  accept,
  setAccept,
  decline,
  setDecline,
  theme
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

  return (
    <div className='vendor-details-container' style={theme === true ? { color: "black" } : {}}>
      <div className='vendor-details-wrapper'>
        <div className='vendor-details-content'>
          <h3 className='vendor-details-content-header' style={theme === true ? { color: "black" } : {}}>Vendor details</h3>
          <div className='vendor-details-content-desc'>
            {
              selectedTableItem?.product_status === "acceptedPitch" ?
                <p>
                  you have accepted the vendors pitch you can see vendors personal detail here.
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
        <div className='vendor-button-container'>
          {accept ? (
            <YellowAlert
              // alertText={
              //   'You can only see vendor details when you accept a pitch!'
              // }
              alertText={
                'you have accepted this vendors pitch!'
              }

            />
          ) : decline ? (
            <RedAlert />
          ) : (
            <>
              <div className='buttons-header'>
                Accept the pitch for you to be able to see the vendor’s details.
              </div>
              <div class='buttons'>
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

      <div className='personal-info-wrapper'>
        <div className='personal-info'>Personal information</div>
      </div>
      <div style={{ width: '100%' }}>
        <hr className='solid'></hr>
      </div>
      {accept ||selectedTableItem?.product_status=="acceptedPitch" ?
        <div className='personal-info-content-wrapper'>
          <div className='personal-info-content-rows'>
            <div className='personal-info-content-row'>
              <div className='personal-info-content-header' style={theme === true ? { color: "black" } : {}}>Name</div>
              <div className='personal-info-content-content' style={theme === true ? { color: "black" } : {}}>Ramesh S.</div>
            </div>
            <div className='personal-info-content-row'>
              <div className='personal-info-content-header' style={theme === true ? { color: "black" } : {}}>Company address</div>
              <div className='personal-info-content-content' style={theme === true ? { color: "black" } : {}}>
                Lorem ipsum dolor Ltd, Opp to landmark, city - pincode.
              </div>
            </div>
          </div>
          <div className='personal-info-content-rows'>
            <div className='personal-info-content-row'>
              <div className='personal-info-content-header' style={theme === true ? { color: "black" } : {}}>Email</div>
              <div className='personal-info-content-content' style={theme === true ? { color: "black" } : {}}>
                rameshS@email.com
              </div>
            </div>
            <div className='personal-info-content-row'>
              <div className='personal-info-content-header' style={theme === true ? { color: "black" } : {}}>Phone</div>
              <div className='personal-info-content-content' style={theme === true ? { color: "black" } : {}} >543210</div>
            </div>
            <div className='personal-info-content-row'>
              <div className='personal-info-content-header' style={theme === true ? { color: "black" } : {}}>Whatsapp</div>
              <div className='personal-info-content-content' style={theme === true ? { color: "black" } : {}}>9876543210</div>
            </div>
          </div>
        </div>
        :
        <h3>nothing to show accept the vendor details first</h3>
      }
    </div>
  )
}

export default VendorDetails
