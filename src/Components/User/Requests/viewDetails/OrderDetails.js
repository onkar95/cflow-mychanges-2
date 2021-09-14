import { Button, Card, CardContent } from '@material-ui/core'
import React, { useEffect, useState } from 'react'
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
// import viewDetails from './viewDetails/viewDetails';
require('dotenv').config()

const OrderDetails = ({
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
      ).then(data => console.log(data))
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
      ).then(data => console.log(data))
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
  console.log(data)
  console.log(price_detail)
  return (
    <div className='order-details-container' style={theme===true?{color:"black"}:{}}>
      <div className='order-details-top-container'>
        <div className='order-details-header-conatiner'>
          <h3 className='order-details-header' style={theme===true?{color:"black"}:{}}>Order Details</h3>
          {
            selectedTableItem?.product_status==="acceptedPitch" ?
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
          }
        </div>

        {/* <hr
              style={{
                width: '50%',
                marginTop: '5px',
                borderColor: ' #ffb600',
                backgroundColor: '#ffb600',
              }}
            ></hr> */}

        <div className='button-container'>
          {accept ? (
            <YellowAlert
              // alertText={
              //   'You can only see price and vendor details when you got a pitch!'
              // }
              alertText={
                'you have accepted this vendors pitch!'
              }
            />
          ) : decline ? (
            <RedAlert />
          ) : (
            <>
              <p>
                Accept the pitch for you to be able to see the vendor’s details.
              </p>
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
      <div className='divider-header' >
        <div className='header-1' >
          <div className='white-text' style={theme===true?{color:"black"}:{}}>Order summary</div>
          <div style={{ width: '100%' }}>
            <hr className='solid'></hr>
          </div>
          <div className='order-summary-container'>
            <div className='order-summary-rows'>
              <div className='items'>
                <div className='grey-headers' style={theme===true?{color:"black"}:{}}>Order</div>
                <h4 style={{ fontWeight: '400' }} style={theme===true?{color:"black"}:{}}>
                  {data?.brand ? data?.brand : ''}
                  {selectedTableItem?.type}
                </h4>
              </div>
            </div>
            <div className='order-summary-rows'>
              <div className='order-summary-columns'>
                <div className='items'>
                  <div className='grey-headers' style={theme===true?{color:"black"}:{}}>Type</div>
                  {/* <h4 style={{ fontWeight: '400' }}>
                    {data?.brand ? data?.brand : ''}
                    {selectedTableItem?.type}
                  </h4> */}
                  <h4 style={{ fontWeight: '400' }}>{data?.type ? data?.type : data?.grade ? data?.grade : "____"}</h4>

                </div>
              </div>
              <div className='order-summary-columns'>
                <div className='items'>
                  <div className='grey-headers' style={theme===true?{color:"black"}:{}}>Quantity</div>
                  {/* <h4 style={{ fontWeight: '400' }}>
                    {data?.brand ? data?.brand : ''}
                    {selectedTableItem?.type}
                  </h4> */}
                  <h4 style={{ fontWeight: '400' }}>{selectedTableItem?.quantity}</h4>

                </div>
              </div>
              <div className='order-summary-columns'>
                <div className='items'>
                  <div className='grey-headers' style={theme===true?{color:"black"}:{}}>Trade type</div>
                  {/* <h4 style={{ fontWeight: '400' }}>
                    {data?.brand ? data?.brand : ''}
                    {selectedTableItem?.type}
                  </h4> */}
                  <h4 style={{ fontWeight: '400' }} style={theme===true?{color:"black"}:{}}>{selectedTableItem?.trade ? "Trade" : "Non-trade"}</h4>

                </div>
              </div>
            </div>
            <div className='order-summary-rows'>
              <div className='items'>
                <div className='grey-headers' style={theme===true?{color:"black"}:{}}>Placed On</div>
                {/* <h4 style={{ fontWeight: '400' }}>
                  {data?.brand ? data?.brand : ''}
                  {selectedTableItem?.type}
                </h4> */}
                <h4 style={{ fontWeight: '400' }} style={theme===true?{color:"black"}:{}}>{selectedTableItem?.placed_on.slice(0, 10)}</h4>

              </div>
            </div>
          </div>
        </div>
        <div className='header-2' style={theme===true?{color:"black"}:{}}>
          <div className='white-text' style={theme===true?{color:"black"}:{}}>Delivery details</div>
          <div style={{ width: '100%' }}>
            <hr className='solid'></hr>
            <div className='delivery-details-container'>
              <div className='delivery-details-rows'>
                <div className='items'>
                  <div className='grey-headers' style={theme===true?{color:"black"}:{}}>Delivery address</div>
                  {/* <h4 style={{ fontWeight: '400' }}>
                    {data?.brand ? data?.brand : ''}
                    {selectedTableItem?.type}
                  </h4> */}
                  <h4 style={{ fontWeight: '400' }}>{DeliveryAddress1}</h4>

                </div>
              </div>
              <div className='delivery-details-rows'>
                <div className='items'>
                  <div className='grey-headers' style={theme===true?{color:"black"}:{}}>Delivery by</div>
                  {/* <h4 style={{ fontWeight: '400' }}>
                    {data?.brand ? data?.brand : ''}
                    {selectedTableItem?.type}
                  </h4> */}
                  <h4 style={{ fontWeight: '400' }} style={theme===true?{color:"black"}:{}}>{DeliveryDate}</h4>

                </div>
              </div>
              <div className='delivery-details-rows'>
                <div className='items'>
                  <div className='grey-headers' style={theme===true?{color:"black"}:{}}>Status</div>
                  <Status type={selectedTableItem?.product_status} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* <div className='order-delivery-wrapper'>
        <div className='order-summary'>
          <div className='items'>
            <div className='grey-headers'>Order</div>
            <h4 style={{ fontWeight: '400' }}>
              {data?.brand ? data?.brand : ''}
              {selectedTableItem?.type}
            </h4>
          </div>
           {data?.materials ? (
            <>
              <div className='items'>
                <div className='grey-headers'>Materials</div>
                <h4 style={{ fontWeight: '400' }}>{data?.materials}</h4>
              </div>
              <div className='items'>
                <div className='grey-headers'>Labour</div>
                <h4 style={{ fontWeight: '400' }}>
                  {data?.labour ? 'Required' : 'Not Required'}
                </h4>
              </div>
              <div className='items'>
                <h4>Gender</h4>
                <h4 style={{ fontWeight: '400' }}>{data?.gender}</h4>
              </div>
            </>
          ) : data?.driver ? (
            <>
              <div className='items'>
                <div className='grey-headers'>Driver</div>
                <h4 style={{ fontWeight: '400' }}>
                  {data?.driver ? 'Required' : 'Not Required'}
                </h4>
              </div>
            </>
          ) : (
            <>
              <div className='type-size-wrapper'>
                <div className='items'>
                  <div className='grey-headers'>Grade/Type</div>
                  <h4 style={{ fontWeight: '400' }}>
                    {data?.type
                      ? data?.type
                      : data?.grade
                      ? data?.grade
                      : '____'}
                  </h4>
                </div>
                <div className='items' style={{ marginLeft: '5rem' }}>
                  <div className='grey-headers'>Size</div>
                  <h4 style={{ fontWeight: '400' }}>
                    {data?.size ? data?.size : '____'}
                  </h4>
                </div>
              </div>
            </>
          )}
          <div className='items'>
            <div className='grey-headers'>Quantity</div>
            <h4 style={{ fontWeight: '400' }}>{selectedTableItem?.quantity}</h4>
          </div>
          <div className='items'>
            <div className='grey-headers'>Placed On</div>
            <h4 style={{ fontWeight: '400' }}>
              {selectedTableItem?.placed_on.slice(0, 10)}
            </h4>
          </div>
        </div>
        <div className='delivery-details'>
          <div className='items'>
            <div className='grey-headers'>Delivery Address</div>
            <h4 style={{ fontWeight: '400' }}>{DeliveryAddress1}</h4>
          </div>
          <div className='items'>
            <div className='grey-headers'>Deliver by</div>
            <span style={{ marginTop: '1rem' }}>
              {selectedTableItem?.urgent === 1 ? 'URGENT' : 'FLEXIBLE'}
            </span>
          </div>
          {data?.special_requirement && (
            <>
              <div className='items'>
                <div className='grey-headers'>Special requirement</div>
                <h4 style={{ fontWeight: '400' }}>
                  {data?.special_requirement}
                </h4>
              </div>
            </>
          )}
          <div className='items'>
            <div className='grey-headers'>Status</div>
            <h4>
              <Status type={selectedTableItem?.product_status} />
            </h4>
          </div>
          {(selectedTableItem?.type === 'Cement' ||
            selectedTableItem?.type === 'RMC' ||
            selectedTableItem?.type === 'Paint & Putty') && (
            <div className='items'>
              <div className='grey-headers'>Trade type</div>
              <h4 style={{ fontWeight: '400' }}>
                {selectedTableItem?.trade ? 'Trade' : 'Non-trade'}
              </h4>
            </div>
          )} 
        </div>
      </div> */}
    </div>
  )
}

export default OrderDetails
