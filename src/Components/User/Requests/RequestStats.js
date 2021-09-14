import React, {useEffect, useState } from 'react'
import RoundedHexagon from "../../Utils/RoundedHexagon";
import "./Requests.css"

const RequestStats = ({theme, recent_products,setCurrentSection,setSelectedTableItem, pendingRequests, acceptedRequests, rejectedRequests, pitchedRequests, newRequests, Arrow, SortArrow, SortArrow2, SortArrow3}) => {
    const [total, setTotal]=useState(0)
    const [accepted, setAccepted]=useState(0)
    const [declined, setDeclined]=useState(0)
    const [today, setToday]=useState(0)
    const [totalPercent, setTotalPercent]=useState(0)
    const [acceptedPercent, setAcceptedPercent]=useState(0)
    const [declinedPercent, setDeclinedPercent]=useState(0)
    const [declinedArray, setDeclinedArray]=useState([])
    const [acceptedArray, setAcceptedArray]=useState([])
    const [pitchedToday, setPitchedToday]=useState([])

    useEffect(()=>{
        setTotal(rejectedRequests[0]?.count + pendingRequests[0]?.count + acceptedRequests[0]?.count ? rejectedRequests[0]?.count + pendingRequests[0]?.count + acceptedRequests[0]?.count :0)
        setAccepted(acceptedRequests[0]?.count?acceptedRequests[0]?.count:0)
        setDeclinedArray ( pitchedRequests.filter(item => (item.product_status==="rejectedPitch")));
        setAcceptedArray ( pitchedRequests.filter(item => (item.product_status==="acceptedPitch")));
        setDeclined(declinedArray.length)
        
        setPitchedToday(pitchedRequests.filter(item=>(item.updated_at===new Date().toISOString())))
        setToday(pitchedToday.length) 

        const date=new Date()
        let firstDayOfMonth=new Date(date.getFullYear(), date.getMonth(), 1);
        let previousMonth=new Date(date.getFullYear(), date.getMonth()-1, 1)
        let currentDate=new Date();

        let newRequestCurrentMonth = newRequests?.filter(a => {
            let date = new Date(a.placed_on);
            return (date >= firstDayOfMonth && date <= currentDate);
        });
        let newRequestPreviousMonth = newRequests?.filter(a => {
            let date = new Date(a.placed_on);
            return (date >= previousMonth && date < firstDayOfMonth);
        });
        let pitchedRequestCurrentMonth = pitchedRequests?.filter(a => {
            let date = new Date(a.placed_on);
            return (date >= firstDayOfMonth && date <= currentDate);
        });
        let pitchedRequestPreviousMonth = pitchedRequests?.filter(a => {
            let date = new Date(a.placed_on);
            return (date >= previousMonth && date < firstDayOfMonth);
        });

        let percent=(((pitchedRequestCurrentMonth?.length+newRequestCurrentMonth?.length)-(pitchedRequestPreviousMonth?.length+newRequestPreviousMonth?.length))/(pitchedRequestPreviousMonth?.length+newRequestPreviousMonth?.length))*100
        percent=percent.toFixed(2)
        setTotalPercent(percent)


        let acceptedRequestCurrentMonth = acceptedArray?.filter(a => {
            let date = new Date(a.updated_at);
            return (date >= firstDayOfMonth && date <= currentDate);
        });
        let acceptedRequestPreviousMonth = acceptedArray?.filter(a => {
            let date = new Date(a.updated_at);
            return (date >= previousMonth && date < firstDayOfMonth);
        });

        percent=((acceptedRequestCurrentMonth?.length-acceptedRequestPreviousMonth?.length)/(acceptedRequestPreviousMonth?.length))*100
        percent=percent.toFixed(2)
        setAcceptedPercent(percent)


        let declinedRequestCurrentMonth = declinedArray?.filter(a => {
            let date = new Date(a.updated_at);
            return (date >= firstDayOfMonth && date <= currentDate);
        });
        let declinedRequestPreviousMonth = declinedArray?.filter(a => {
            let date = new Date(a.updated_at);
            return (date >= previousMonth && date < firstDayOfMonth);
        });

        percent=((declinedRequestCurrentMonth?.length-declinedRequestPreviousMonth?.length)/(declinedRequestPreviousMonth?.length))*100
        percent=percent.toFixed(2)
        setDeclinedPercent(percent)

    },[pendingRequests, acceptedRequests, rejectedRequests, pitchedRequests, newRequests])

    const [isHover,setIsHover]=useState(false);
    const hexStyles1 = {
        width: "10rem",
        height: "11rem",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alginItems: "center",
        margin: "1.5rem 1.5rem 0",
        zIndex: "5",
        backgroundColor:isHover && "#ffb600",
        cursor:"pointer"
    };
    const hexStyles2 = {
        width:95,
        height: 96,
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alginItems: "center",
        margin: "1.5rem 1.5rem 0",
        zIndex: "5",
    };

    const [winsize,setwinsize]=useState(window.screen.width);
    const handleResize=()=>{
        if (window.innerWidth <1000) {
            setwinsize(window.innerWidth)
        }
        else{
            setwinsize(window.innerWidth)
        }
    }
    useEffect(() => {
        window.addEventListener("resize", handleResize)
    }, [window.screen.width])
    const handleClick=(index)=>{

        console.log("handleClick",index)
        setSelectedTableItem(recent_products[index])
        setCurrentSection(12)
    }


    
    return (
        <div className='stats-container' style={{backgroundColor:theme?"white":""}}>
            <div className="stats-div1" style={{backgroundColor:theme?"#F8F8F8":"", color:theme?"black":""}}>
                <div className="stats-div1-header" style={{color:theme?"black":""}}>Your Requests</div>
                <div className="stats-div1-description">You have recieved <span style={{color:theme?"black":"white"}}>{today} new pitches</span> today. Check and monitor your requests from here.</div>
            </div>    
            <div className="stats-div" style={{backgroundColor:theme?"#F8F8F8":"", color:theme?"black":""}}>
                 <div className="num">{total}</div>
                 <div className="information">Total Requests</div>
                 <div className="percent" style={{color:totalPercent<0?"red":""}}><img src={totalPercent>0?SortArrow2:SortArrow}></img> {totalPercent==="Infinity"?"__":totalPercent}</div>
            </div>
            <div className="stats-div" style={{backgroundColor:theme?"#F8F8F8":"", color:theme?"black":""}}>
                <div className="num">{accepted}</div>
                <div className="information">Accepted pitch</div>
                <div className="percent" style={{color:acceptedPercent<0?"red":""}}><img src={acceptedPercent>0?SortArrow2:SortArrow}></img> {acceptedPercent==="Infinity"?"__":acceptedPercent}</div>
            </div>
            <div className="stats-div stats-div2" style={{backgroundColor:theme?"#F8F8F8":"", color:theme?"black":""}}>
                <div className="num">{declined}</div>
                <div className="information">Declined pitch</div>
                <div className="percent" style={{color:declinedPercent<0?"red":""}}><img src={declinedPercent>0?SortArrow2:SortArrow}></img> {declinedPercent==="Infinity"?"__":declinedPercent}</div>
            </div>
        </div>
    )
}

export default RequestStats
