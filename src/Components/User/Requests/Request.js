import React from "react";
import "./Requests.css";
import Arrow from "../../../Images/Arrow.svg"
import SortArrow from "../../../Images/Sort arrow.svg"
import SortArrow2 from "../../../Images/Sort arrow 2.svg"
import SortArrow3 from "../../../Images/Sort arrow 3.svg"
import SortArrow3Orange from "../../../Images/Sort arrow 3 orange.svg"
import BreadCrumb from "./BreadCrumb"
import RequestStats from"./RequestStats"
import RoundedHexagon from "../../Utils/RoundedHexagon";
import Acheive from "./Acheive";
import TableSection from './TableSection'


const Request = ({theme, recent_products,getAllVendor,setCurrentSection,maximum_sales,pendingRequests,acceptedRequests,rejectedRequests,newRequests,savedRequests,pitchedRequests,setSelectedTableItem,selectedTableItem,temp_filter_new_requests,setTemp_filter_new_requests,temp_filter_pitched_requests,setTemp_filter_pitched_requests,temp_filter_saved_requests,setTemp_filter_saved_requests,temp_filter,tableSwitch,setTableSwitch}) => {
    let req_list
    if(maximum_sales?.length>6){
        req_list = maximum_sales?.slice(0,6)
    }
    else req_list = maximum_sales

    return (
        <div className='requestuser' style={{backgroundColor:theme?"white":""}}>
            <BreadCrumb theme={theme}/>
            <div className='request_containeruser'>
                <RequestStats theme={theme} recent_products={recent_products} setCurrentSection={setCurrentSection} setSelectedTableItem={setSelectedTableItem} pendingRequests={pendingRequests} acceptedRequests={acceptedRequests} rejectedRequests={rejectedRequests} pitchedRequests={pitchedRequests} newRequests={newRequests} Arrow={Arrow} SortArrow={SortArrow} SortArrow2={SortArrow2} SortArrow3={SortArrow3}/>
                <TableSection theme={theme} getAllVendor={getAllVendor} setCurrentSection={setCurrentSection} newRequests={newRequests} savedRequests={savedRequests} pitchedRequests={pitchedRequests} setSelectedTableItem={setSelectedTableItem} selectedTableItem={selectedTableItem} temp_filter_new_requests={temp_filter_new_requests} setTemp_filter_new_requests={setTemp_filter_new_requests} temp_filter_pitched_requests={temp_filter_pitched_requests} setTemp_filter_pitched_requests={setTemp_filter_pitched_requests} temp_filter_saved_requests={temp_filter_saved_requests} setTemp_filter_saved_requests={setTemp_filter_saved_requests} temp_filter={temp_filter} tableSwitch={tableSwitch} setTableSwitch={setTableSwitch} Arrow={Arrow} SortArrow={SortArrow} SortArrow2={SortArrow2} SortArrow3={SortArrow3} SortArrow3Orange={SortArrow3Orange}/>
            </div>

        </div>
    );
};

export default Request;
