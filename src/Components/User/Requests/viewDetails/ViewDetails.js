import OrderDetails from './OrderDetails'
import PitchSummery from './PitchSummery'
import VendorDetails from './VendorDetails'
import { Button, Card, CardContent } from '@material-ui/core'
import React, { useEffect, useState } from 'react'
// import "../Details.css"
import { makeStyles } from '@material-ui/core/styles'
import PersonIcon from '@material-ui/icons/Person'
import ApartmentIcon from '@material-ui/icons/Apartment'
import EmailIcon from '@material-ui/icons/Email'
import PhoneIcon from '@material-ui/icons/Phone'
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos'
import WhatsAppIcon from '@material-ui/icons/WhatsApp'
import LocationOnOutlinedIcon from '@material-ui/icons/LocationOnOutlined'
import Status from '../../../Table/Status/Status'
import axios from 'axios'
// import "../../Profile/sections/Profile.css"
import personalDetialsYellow from '../../../../Images/newProfileYellow/Personal Details.png'
import companyDetailsYellow from '../../../../Images/newProfileYellow/Company details.png'
import companyAddressYellow from '../../../../Images/newProfileYellow/Company address.png'
import addressBookYellow from '../../../../Images/newProfileYellow/Site address book.png'
import FeedbackYellow from '../../../../Images/newProfileYellow/Feedback.png'
import helpYellow from '../../../../Images/newProfileYellow/Help.png'
import personalDetials from '../../../../Images/newProfile/Personal Details.png'
import companyDetails from '../../../../Images/newProfile/Company details.png'
import companyAddress from '../../../../Images/newProfile/Compay address.png'
import addressBook from '../../../../Images/newProfile/Site address book.png'
import help from '../../../../Images/newProfile/Help small.png'
import feedback from '../../../../Images/newProfile/Feedback.png'
import './viewdetails.css'
// import viewDetails from './viewDetails/viewDetails';
require('dotenv').config()

const ViewDetails = ({
  setCurrentSection,
  selectedTableItem,
  getAllVendor,
  theme,
}) => {
  const [winsize, setwinsize] = useState(window.screen.width)
  const [winheight, setwinheight] = useState(window.screen.height)
  const [viewDetailsSection, setViewDetailsSection] = useState(0)

  const [accept, setAccept] = useState(false)
  const [decline, setDecline] = useState(false)

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
  const profilSections = [
    companyAddress,
    companyDetails,
    addressBook,
    feedback,
    help,
  ]
  const profilSectionsYellow = [
    personalDetialsYellow,
    companyAddressYellow,
    companyDetailsYellow,
    addressBookYellow,
    FeedbackYellow,
    helpYellow,
  ]

  return (
    <div>
      <div className='breadcrumbs'>
        <h3 className='breadcrumb-style' style={theme===true?{color:"black"}:{}}>
          {' '}
          Home / New Requests /{' '}
          <span style={{ color: '#FFB600' }}>View Details</span>
        </h3>
        <h3 onClick={() => setCurrentSection(2)} className='back'style={theme===true?{color:"black"}:{}} >
          <ArrowBackIosIcon  style={theme === true ? { color: "black",height: '16px' } : {height: '16px'}}/> back
        </h3>
      </div>

      <div className='viewDetails'>
        <div className='viewDetail_sideMenu'>
          <div className='section_butns'>
            <img
              src={
                viewDetailsSection === 0
                  ? profilSectionsYellow[0]
                  : profilSections[0]
              }
              alt=''
              style={{ width: '30px', height: '30px' }}
            />
            <button
              style={
                viewDetailsSection === 0
                  ? {
                      color: '#ffb600',
                      borderStyle: 'none',
                    }
                  : theme === true
                  ? { color: '#2D2D2D' }
                  : {}
              }
              onClick={() => setViewDetailsSection(0)}
            >
              Order details
            </button>
          </div>
          <div className='section_butns'>
            <img
              src={
                viewDetailsSection === 1
                  ? profilSectionsYellow[1]
                  : profilSections[1]
              }
              alt=''
              style={{ width: '30px', height: '30px' }}
            />
            <button
              style={
                viewDetailsSection === 1
                  ? {
                      color: '#ffb600',
                      borderStyle: 'none',
                    }
                  : theme === true
                  ? { color: '#2D2D2D' }
                  : {}
              }
              onClick={() => setViewDetailsSection(1)}
            >
              Vendor details
            </button>
          </div>
          <div className='section_butns' >
            <img
              src={
                viewDetailsSection === 2
                  ? profilSectionsYellow[2]
                  : profilSections[2]
              }
              alt=''
              style={{ width: '30px', height: '30px' }}
            />
            <button
              style={
                viewDetailsSection === 2
                  ? {
                      color: '#ffb600',
                      borderStyle: 'none',
                    }
                  : theme === true
                  ? { color: '#2D2D2D' }
                  : {}
              }
              onClick={() => setViewDetailsSection(2)}
            >
              Pitch Summary
            </button>
          </div>
        </div>

        <div className='viewDetail_sections'>
          {viewDetailsSection == 0 && (
            <OrderDetails
              setCurrentSection={setCurrentSection}
              selectedTableItem={selectedTableItem}
              theme={theme}
              getAllVendor={getAllVendor}
              accept={accept}
              setAccept={setAccept}
              decline={decline}
              setDecline={setDecline}
            />
          )}
          {viewDetailsSection == 1 && (
            <VendorDetails
              setCurrentSection={setCurrentSection}
              theme={theme}
              getAllVendor={getAllVendor}
              selectedTableItem={selectedTableItem}
              accept={accept}
              setAccept={setAccept}
              decline={decline}
              setDecline={setDecline}
            />
          )}
          {viewDetailsSection == 2 && (
            <PitchSummery
              setCurrentSection={setCurrentSection}
              selectedTableItem={selectedTableItem}
              theme={theme}
              getAllVendor={getAllVendor}
              accept={accept}
              setAccept={setAccept}
              decline={decline}
              setDecline={setDecline}
            />
          )}
        </div>
      </div>
    </div>
  )
}

export default ViewDetails
