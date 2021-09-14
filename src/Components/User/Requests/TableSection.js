import React , { useState , useEffect}  from 'react'
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import {  InputLabel, MenuItem  } from "@material-ui/core";
import StickyHeadTable from "../../Table/Table";
import { makeStyles } from "@material-ui/core/styles";
import Fuse from "fuse.js"
import "./Requests.css"

function TableSection({theme, getAllVendor,setCurrentSection,newRequests,savedRequests,pitchedRequests,setSelectedTableItem,selectedTableItem,temp_filter_new_requests,setTemp_filter_new_requests,temp_filter_pitched_requests,setTemp_filter_pitched_requests,temp_filter_saved_requests,setTemp_filter_saved_requests,temp_filter,tableSwitch,setTableSwitch, Arrow, SortArrow, SortArrow2, SortArrow3, SortArrow3Orange }) {
    const useStyles = makeStyles((theme) => ({
        formControl: {
            //   margin: theme.spacing(1),
            marginRight: theme.spacing(2),
            // minWidth: 150,
            backgroundColor: "#FFB600",
            borderRadius: theme.spacing(1),
            "& .Mui-focused .MuiOutlinedInput-notchedOutline": {
                    border: "1px solid black",
                    borderRadius: "5px 5px 0 0",
                    color:"white",
                    backgroundColor:"transparent"
            }
        },
        formControl1: {
            //   margin: theme.spacing(1),
            marginRight: theme.spacing(2),
            // minWidth: 150,
            backgroundColor: "#202020",
            borderRadius: theme.spacing(1),
                    borderRadius: "5px 5px 5px 5px",
                    color:"white",
            "& .Mui-focused .MuiOutlinedInput-notchedOutline": {
                    border: "0px",
                    borderRadius: "5px 5px 0 0",
                    color:"white"
            },
        },
        input: {
            "& .MuiSelect-selectMenu": {backgroundColor:"white", color:"black", height:"0px"}
        },
        dropdownStyle: 
        {
             backgroundColor:"white"
        },
        icon: {
            fill: "#ffb600"
        },
        "@global": {
            ".MuiSelect-outlined.MuiSelect-outlined":{
                backgroundColor: "transparent",
                paddingTop:"25%"
            },
            ".MuiPaper-root": {
                backgroundColor: "black"
              },
        }
    }));
    const classes = useStyles();
    const tabs = [
        "New Requests",
        "Pitched Requests",
        "History"
    ];
    const product_filters = temp_filter
    const [currentFilter, setCurrentFilter] = useState(null);
    const [currentProductFilter, setCurrentProductFilter] = useState(0);
    const filters = [
        "Newest First",
        "Sort by Date",
        "Sort by Urgency",
        "Completed Leads",
        "Pending Leads",
        "Rejected Leads",
    ];

    useEffect(() =>
    {
        setTemp_filter_new_requests(newRequests?.filter((item) => item.type === product_filters[currentProductFilter]?.type))  
        setTemp_filter_pitched_requests(pitchedRequests?.filter((item) => item.type === product_filters[currentProductFilter]?.type)) 
        setTemp_filter_saved_requests(savedRequests?.filter((item) => item.type === product_filters[currentProductFilter]?.type))
    },[currentProductFilter])

    
    useEffect(() => {
        getAllVendor()
    },[tableSwitch])

    const [search, setSearch]=useState("")

    useEffect(() =>
    {
        if(currentFilter === 5)
        {
            setTemp_filter_new_requests(newRequests?.filter((item) => item?.product_status === "rejectedPitch"))
            setTemp_filter_pitched_requests(pitchedRequests?.filter((item) => item?.product_status === "rejectedPitch"))
            setTemp_filter_saved_requests(savedRequests?.filter((item) => item?.product_status === "rejectedPitch"))
        }
        else if(currentFilter === 4)
        {
            setTemp_filter_new_requests(newRequests?.filter((item) => item?.product_status === "pitched"))
            setTemp_filter_pitched_requests(pitchedRequests?.filter((item) => item?.product_status === "pitched"))
            setTemp_filter_saved_requests(savedRequests?.filter((item) => item?.product_status === "pitched"))
        }
        else if(currentFilter === 3)
        {
            setTemp_filter_new_requests(newRequests?.filter((item) => item?.product_status === "acceptedPitch"))
            setTemp_filter_pitched_requests(pitchedRequests?.filter((item) => item?.product_status === "acceptedPitch"))
            setTemp_filter_saved_requests(savedRequests?.filter((item) => item?.product_status === "acceptedPitch"))
        }
        else if(currentFilter === 2)
        {
            setTemp_filter_new_requests(newRequests?.filter((item) => item?.urgent === "1"))
            setTemp_filter_pitched_requests(pitchedRequests?.filter((item) => item?.urgent === "1"))
            setTemp_filter_saved_requests(savedRequests?.filter((item) => item?.urgent === "1"))
        }
        else if(currentFilter === 1)
        { 
            setTemp_filter_new_requests(newRequests?.sort((a, b) => b.deliver_by - a.deliver_by))
            setTemp_filter_pitched_requests(pitchedRequests?.sort((a, b) => b.deliver_by - a.deliver_by))
            setTemp_filter_saved_requests(savedRequests?.sort((a, b) => b.deliver_by - a.deliver_by))
        }
        else
        {
            setTemp_filter_new_requests(newRequests)
            setTemp_filter_pitched_requests(pitchedRequests)
            setTemp_filter_saved_requests(savedRequests)
        }
    },[currentFilter, tableSwitch])


    
    return (
        <div className='recentuser'  style={{backgroundColor:theme?"white":""}}>
                    <div className='tablesectionuser1'>
                        <div>
                            <div className='switchsectionuser1'>
                               {tabs.map((tab, index) => (
                                <div className="tab" style={{ border:(theme && tableSwitch===index)?"2px solid #ffb600":"" ,backgroundColor:(tableSwitch===index && !theme)?"#202020":(tableSwitch===index && theme)?"white":"", color:(tableSwitch===index && !theme)?"white":(tableSwitch===index && theme)?"black":theme?"black":""}} onClick={()=>{setTableSwitch(index)}}>
                                        {tab} <span class="quantity-div" style={{backgroundColor:(theme)?"#ffb600":tableSwitch===index?"#ffb600":"", color:(tableSwitch===index && theme)?"black":tableSwitch===index?"black":""}}>{tab==="New Requests"?newRequests?.length:tab==="Pitched Requests"?pitchedRequests?.length:savedRequests?.length}</span>
                                </div>
                            ))}
                            </div>
                            <div><input type="text" placeholder="Search by vendor, urgency or status" className="request-search" onChange={(e)=>{setSearch(e.target.value)}} value={search} style={{backgroundColor:theme?"#F8F8F8":"", color:theme?"black":""}}></input></div>
                        </div>          
                        <div className='filteruser1' style={{backgroundColor:theme?"white":"black", color:theme?"black":"white"}}>
                            <div className="filter-tag">Filter:</div>
                            <FormControl
                                variant='outlined'
                                className={`${classes.formControl1} req-dropdown`}
                                InputProps={{ disableOutline: true}}
                                style={{backgroundColor:theme?"white":"", color:theme?"black":"white"}}
                            >
                                <Select
                                    labelId='demo-simple-select-label'
                                    id='demo-simple-select'
                                    inputProps={{classes:{icon:classes.icon}}}
                                    style={{backgroundColor:theme?"#f2f3f4":"", color:theme?"black":"white", height:"40px", fontSize:"small"}}
                                    classes={{
                                        listbox: theme?classes.input:"",
                                        list:theme?classes.condition:""
                                    }}
                                    MenuProps={{ classes: { list: theme?classes.dropdownStyle:"" } }}
                                >
                                    {filters.map((filter, index) => (
                                        <MenuItem
                                            className='filter_itemuser'
                                            onClick={() =>
                                                setCurrentFilter(index)
                                            }
                                            value={index}
                                            style={{backgroundColor:theme?"white":"black", color:theme?"black":"white"}}

                                        >
                                            {filter}
                                        </MenuItem>
                                    ))}
                                </Select>
                            </FormControl>
                        </div>
                    </div>
                    <div className='tableuser'>
                        <StickyHeadTable theme={theme} search={search} setCurrentSection={setCurrentSection} tableSwitch={tableSwitch} newRequests={temp_filter_new_requests} pitchedRequests={temp_filter_pitched_requests} savedRequests={temp_filter_saved_requests} setSelectedTableItem={setSelectedTableItem} selectedTableItem={selectedTableItem} Arrow={Arrow} SortArrow={SortArrow} SortArrow2={SortArrow2} SortArrow3={SortArrow3} SortArrow3Orange={SortArrow3Orange}/>
                    </div>
                </div>
    )
}

export default TableSection