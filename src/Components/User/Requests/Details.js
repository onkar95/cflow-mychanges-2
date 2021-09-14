import { Button, Card, CardContent } from '@material-ui/core'
import React, { useEffect, useState } from 'react'
import "./Details.css"
import { makeStyles } from '@material-ui/core/styles';
import PersonIcon from '@material-ui/icons/Person';
import ApartmentIcon from '@material-ui/icons/Apartment';
import EmailIcon from '@material-ui/icons/Email';
import PhoneIcon from '@material-ui/icons/Phone';
import WhatsAppIcon from '@material-ui/icons/WhatsApp';
import LocationOnOutlinedIcon from '@material-ui/icons/LocationOnOutlined';
import Status from "../../Table/Status/Status"
import axios from 'axios';
import ViewDetails from './viewDetails/ViewDetails';
require('dotenv').config()



const Details = ({ setCurrentSection, selectedTableItem, getAllVendor,theme }) => {
    const [winsize, setwinsize] = useState(window.screen.width);
    const [winheight, setwinheight] = useState(window.screen.height);
    const handleResize = () => {
        if (window.innerWidth < 1000) {
            setwinsize(window.innerWidth)
        }
        else {
            setwinsize(window.innerWidth)
        }
        if (window.innerHeight < 1000) {
            setwinheight(window.innerHeight)
        }
        else {
            setwinheight(window.innerHeight)
        }
    }
    useEffect(() => {
        window.addEventListener("resize", handleResize)
        window.addEventListener("resize", handleResize)
        console.log(winsize, winheight, "LandingPageImage")
    }, [window.screen.width, window.screen.height])
    console.log(selectedTableItem, "selectedTableItem")

    const useStyles = makeStyles({
        root: {
            minWidth: winsize > 450 ? 400 : 300,
            //   maxWidth:400,
            //   minHeight:275,
            //   maxHeight:400,
            //   marginTop:20,
            borderWidth: 1,
            borderRadius: 10,
            borderColor: "#2D2D2D",
            backgroundColor: "#121417"
        },
    })
    const classes = useStyles()
    const [userId, setUserId] = useState(JSON.parse(localStorage.getItem('profile'))?.data?.id)
    const handleAccept = async () => {
        const sendingData = { Pid: selectedTableItem?.Pid, Uid: selectedTableItem?.Uid, pitch_value: selectedTableItem?.pitch_value }
        await axios.post(`${process.env.REACT_APP_URL}/user/user_accepted_pitch/${userId}`, sendingData)
            .then(function (response) {
                console.log(response, "success")
            })
        getAllVendor();
        setCurrentSection(7)
        window.scrollTo(0, 235)
    }
    const handleDecline = async () => {
        const sendingData = { Pid: selectedTableItem?.Pid, Uid: selectedTableItem?.Uid }
        await axios.post(`${process.env.REACT_APP_URL}/user/user_rejected_pitch/${userId}`, sendingData)
            .then(function (response) {
                console.log(response, "success")
            })
        // getAll()
        setCurrentSection(8)
        window.scrollTo(0, 235)
    }

    const DeliveryAddress = selectedTableItem ? JSON.parse(selectedTableItem?.delivery_address) : ""
    const DeliveryAddress1 = DeliveryAddress ? DeliveryAddress?.city + "," + DeliveryAddress?.state : "___"
    const DeliveryDate = selectedTableItem?.deliver_by !== "0000-00-00 00:00:00" ? selectedTableItem?.deliver_by.toString().substring(0, 10) : selectedTableItem?.data?.startDate ? JSON.parse(selectedTableItem?.data)?.startDate?.slice(0, 10) + " to " + JSON.parse(selectedTableItem?.data)?.endDate?.slice(0, 10) : "___"


    const data = selectedTableItem ? JSON.parse(selectedTableItem?.data) : ""
    const price_detail = selectedTableItem ? JSON.parse(selectedTableItem?.price_detail) : ""
    return (
        <div className="details">
            <ViewDetails  setCurrentSection={setCurrentSection} selectedTableItem={selectedTableItem}  theme={theme} getAllVendor={getAllVendor} />

        </div>
    )
}

export default Details
