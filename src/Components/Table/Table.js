import React , {useEffect, useState} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import Details from "../User/Requests/Details"
import Fuse from "fuse.js";
import "./Table.css"

function createData( Product, Quantity, DeliveryDate, CompanyName, OrderType, PitchStatus, ProductStatus, Amount, Invoice) {


  return { Product, Quantity, DeliveryDate, CompanyName, OrderType, PitchStatus, ProductStatus, Amount, Invoice};
}


const useStyles = makeStyles({
  root: {
    width: '100%'
  },
  "@global": {
    ".MuiInputBase-input": {
      padding: "0px 0 35%",
    }
  }
  /*container: {
    maxHeight: "0%"
    // overflowX:'hidden'
  },*/
});

export default function StickyHeadTable({theme, search, setCurrentSection,tableSwitch,newRequests,savedRequests,pitchedRequests,setSelectedTableItem,selectedTableItem, Arrow, SortArrow, SortArrow2, SortArrow3, SortArrow3Orange}) {
  const classes = useStyles();
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  const columns =  
                    [
                    { id: 'Product', label: 'Product', minWidth: 100 ,align: 'center'},
                    { id: 'Quantity', label: 'Quantity', minWidth: 100 ,align: 'center'},
                    { id: 'DeliveryDate',label: 'Deliver\u00a0by', minWidth: 100, align: 'center'},
                    { id: 'CompanyName',label: 'Company/Vendor', minWidth: 100, align: 'center' },  
                    { id: 'OrderType',label: 'Order\u00a0type', minWidth: 100, align: 'center' }, 
                    { id: 'PitchStatus',label: 'Pitch\u00a0status', minWidth: 100, align: 'center' },                   
                    { id: 'ProductStatus', label: 'Product\u00a0status',minWidth: 100,align: 'center'},
                    { id: 'Amount', label: 'Amount',minWidth: 100,align: 'center'},
                    { id: 'Invoice', label: '',minWidth: 0,align: 'center'}
                    ]

  const [rows, setRows]=useState([])   
  const [rowSearch, setRowSearch]=useState([])
  const [sortTrigger1, setSortTrigger1]=useState(true)
  const [sortTrigger2, setSortTrigger2]=useState(false)
  const fuse = new Fuse(rows, {
    keys: ["OrderType", "CompanyName", "Product", "DeliveryDate", "PitchStatus", "ProductStatus"], threshold:0.3
});
  useEffect(()=>{

      if(tableSwitch===0){ 
        let r=newRequests?.map((item,index)=> createData(item?.type, item?.quantity ,item?.deliver_by!=="0000-00-00 00:00:00"? item?.deliver_by?.slice(0,10): JSON.parse(item?.data)?.startDate?.slice(0,10) + " to " +JSON.parse(item?.data)?.endDate?.slice(0,10), item?.vendor_name ? item?.vendor_name : "___", item?.urgent==="0"?"FLEXIBLE":"URGENT", item?.status==="pending"?"None":item?.status==="accepted"?"Accepted":"Declined", "____", "____",item))
        setRows(r)
      }
      else if(tableSwitch===1){
        let r=pitchedRequests?.map((item,index)=> createData(item?.type, item?.quantity ,item?.deliver_by!=="0000-00-00 00:00:00"? item?.deliver_by?.slice(0,10): JSON.parse(item?.data)?.startDate?.slice(0,10) + " to " +JSON.parse(item?.data)?.endDate?.slice(0,10), item?.vendor_name ? item?.vendor_name : "___", item?.urgent==="0"?"FLEXIBLE":"URGENT", "____", item?.product_status==="pitched"?"pending":item.product_status==="acceptedPitch"?"Accepted":"Cancelled", item?.pitch_value, item))
        setRows(r)
      }
      else if(tableSwitch===2){
        let r=savedRequests?.map((item,index)=> createData(item?.type, item?.quantity ,item?.deliver_by!=="0000-00-00 00:00:00"? item?.deliver_by?.slice(0,10): JSON.parse(item?.data)?.startDate?.slice(0,10) + " to " +JSON.parse(item?.data)?.endDate?.slice(0,10), item?.vendor_name ? item?.vendor_name : "___", item?.urgent==="0"?"FLEXIBLE":"URGENT", "____", item?.product_status==="pitched"?"pending":item.product_status==="acceptedPitch"?"Accepted":"Cancelled", item?.pitch_value, item))
        setRows(r)  
      }
      else {
        setRows([])
      }
      console.log(rows)
      if(search!=="" && search!==" "){
        setRowSearch(fuse.search(search).map(o=>o.item))
      }
      else {
        setRowSearch([])
      }
      console.log(rowSearch)

    setPage(0)
 
    setSortTrigger2(false)
  },[tableSwitch, newRequests, pitchedRequests, savedRequests, search]) 

  const sortDeliveryDate = () => {
    sortTrigger2===true?setSortTrigger2(false):setSortTrigger2(true)

    if (sortTrigger2===false) {
      setRows(rows.sort(function(a, b) {
        return new Date(b.DeliveryDate) - new Date(a.DeliveryDate);
      }))
      setRowSearch(rowSearch.sort(function(a, b) {
        return new Date(b.DeliveryDate) - new Date(a.DeliveryDate);
      }))

    }
    else if (sortTrigger2===true) {
      setRows(rows.sort(function(a, b) {
        return new Date(a.DeliveryDate) - new Date(b.DeliveryDate);
      }))
      setRowSearch(rowSearch.sort(function(a, b) {
        return new Date(a.DeliveryDate) - new Date(b.DeliveryDate);
      }))

    }
  }

  /*const rows = 
  tableSwitch === 0 ?  
                       
  newRequests?.map((item,index)=> createData(item?.type, item?.quantity ,item?.deliver_by!=="0000-00-00 00:00:00"? item?.deliver_by?.slice(0,10): JSON.parse(item?.data)?.startDate?.slice(0,10) + " to " +JSON.parse(item?.data)?.endDate?.slice(0,10), item?.vendor_name ? item?.vendor_name : "___", item?.urgent==="0"?"FLEXIBLE":"URGENT", item?.status, item?.product_status, item?.pitch_value, item))                    
                        
                      
                      :
                        tableSwitch === 1 ?
                        pitchedRequests?.map((item,index)=> createData(item?.type, item?.quantity ,item?.deliver_by!=="0000-00-00 00:00:00"? item?.deliver_by?.slice(0,10): JSON.parse(item?.data)?.startDate?.slice(0,10) + " to " +JSON.parse(item?.data)?.endDate?.slice(0,10), item?.vendor_name ? item?.vendor_name : "___", item?.urgent==="0"?"FLEXIBLE":"URGENT", item?.status, item?.product_status, item?.pitch_value, item))
                        :
                        savedRequests?.map((item,index)=> createData(item?.type, item?.quantity ,item?.deliver_by!=="0000-00-00 00:00:00"? item?.deliver_by?.slice(0,10): JSON.parse(item?.data)?.startDate?.slice(0,10) + " to " +JSON.parse(item?.data)?.endDate?.slice(0,10), item?.vendor_name ? item?.vendor_name : "___", item?.urgent==="0"?"FLEXIBLE":"URGENT", item?.status, item?.product_status, item?.pitch_value, item))
    */                   
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };
  const handleDetail=(row)=>{
    setSelectedTableItem(row?.Invoice)
    setCurrentSection(7)
    window.scrollTo(0,200)
    
  }
  const handleDetail1=(row)=>{
    setSelectedTableItem(row?.Invoice)
    setCurrentSection(6)
    window.scrollTo(0,200)
  }
  const handleHistory=(row)=>{

    // take props and send either to DetailHistoryAccepted or DetailHistoryDeclined
    // setCurrentSection(9)
    setSelectedTableItem(row?.Invoice)
    if(row?.Invoice?.product_status === "acceptedPitch")
    {
       setCurrentSection(8)
    }
    else
    {
       setCurrentSection(9)
    }
    
   
    window.scrollTo(0,200)
  }


// useEffect(() => {
// },[selectedTableItem])
useEffect(()=>{
  console.log(newRequests)
  console.log(pitchedRequests)
  console.log(savedRequests)
},[])

  
  return (
    <div className="table-root">
      <TableContainer className={classes.container}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              {columns.map((column) => (
                <TableCell
                
                  key={column?.id}
                  align={column.align}
                  style={{ minWidth: column.minWidth,backgroundColor:theme?"#F8F8F8":"#08090C" ,color:theme?"black":"#fff",borderBottom:"1px solid grey",fontSize:14,fontWeight:'600',padding:15}}
                >
                  {column.label!=="Deliver\u00a0by" && column.label}
                  {column.label==="Deliver\u00a0by" && <div>{column.label} <img src={theme?SortArrow3Orange:SortArrow3} style={{transform: sortTrigger2===true?"rotate(180deg)":"", cursor:"pointer"}} onClick={()=>{sortDeliveryDate()}}></img></div>}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
        
          <TableBody>
          { (search==="" || search===" ")?
              rows?.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row,index) => {
              return (
                <TableRow hover role="checkbox" tabIndex={-1} key={row.code}>
                  {columns.map((column) => {
                    const value = row[column.id];
                    return (
                      <TableCell key={column.id} align={column.align} style={{background:theme?"#F8F8F8":"#121417",color:"#fff",border:"0px solid grey",fontSize:14,fontWeight:'400',padding:0}}>
                      {/*column.label!=='Order\u00a0type' && column.id!=='Invoice' && column.label!=="Product\u00a0status" && column.label!=="Pitch\u00a0status" && (column.format && typeof value === 'number' ? column.format(value) : value)*/}
                      {column.label!=='Order\u00a0type' && column.id!=='Invoice' && column.label!=="Product\u00a0status" && column.label!=="Pitch\u00a0status" && <div style={{color:theme?"black":"#fff"}}>{value}</div>}
                      {column.label === "Order\u00a0type" && <div style={{color:value==="URGENT"?"red":"green"}}>{value}</div>}
                      {column.label === "Pitch\u00a0status" && <div style={{color:((value==="None" || value==="____") && theme)?"black":(value==="None" || value==="____")?"white":value==="Accepted"?"green":"red"}}>{value}</div>}
                      {column.label === "Product\u00a0status" && <div style={{color:((value==="None" || value==="____") && theme)?"black":value==="pending"?"orange":value==="____"?"white":value==="Accepted"?"green":"red"}}>{value}</div>}
                      {column.id === "Invoice" && <h3 style={{fontWeight:"200",cursor:"pointer",fontSize:"1rem", color:"#ffb600", marginLeft:"-200%"}} onClick={()=>{(row['ProductStatus']==="Accepted" || row['ProductStatus']==="Cancelled")?handleHistory(row):row['ProductStatus']==="pending"?handleDetail1(row):handleDetail(row)}}> <img src={Arrow}></img> </h3>}
                      
                      </TableCell> 
                    );
                  })}
                </TableRow>
              );
            }):
            rowSearch?.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row,index) => {
              return (
                <TableRow hover role="checkbox" tabIndex={-1} key={row.code}>
                  {columns.map((column) => {
                    const value = row[column.id];
                    return (
                      <TableCell key={column.id} align={column.align} style={{background:theme?"#F8F8F8":"#121417",color:"#fff",border:"0px solid grey",fontSize:14,fontWeight:'400',padding:0}}>
                      {/*column.label!=='Order\u00a0type' && column.id!=='Invoice' && column.label!=="Product\u00a0status" && column.label!=="Pitch\u00a0status" && (column.format && typeof value === 'number' ? column.format(value) : value)*/}
                      {column.label!=='Order\u00a0type' && column.id!=='Invoice' && column.label!=="Product\u00a0status" && column.label!=="Pitch\u00a0status" && <div style={{color:theme?"black":"#fff"}}>{value}</div>}
                      {column.label === "Order\u00a0type" && <div style={{color:value==="URGENT"?"red":"green"}}>{value}</div>}
                      {column.label === "Pitch\u00a0status" && <div style={{color:((value==="None" || value==="____") && theme)?"black":(value==="None" || value==="____")?"white":value==="Accepted"?"green":"red"}}>{value}</div>}
                      {column.label === "Product\u00a0status" && <div style={{color:((value==="None" || value==="____") && theme)?"black":value==="pending"?"orange":value==="____"?"white":value==="Accepted"?"green":"red"}}>{value}</div>}
                      {column.id === "Invoice" && <h3 style={{fontWeight:"200",cursor:"pointer",fontSize:"1rem", color:"#ffb600", marginLeft:"-200%"}} onClick={()=>{(row['ProductStatus']==="Accepted" || row['ProductStatus']==="Cancelled")?handleHistory(row):row['ProductStatus']==="pending"?handleDetail1(row):handleDetail(row)}}> <img src={Arrow}></img> </h3>}
                      
                      </TableCell> 
                    );
                  })}
                </TableRow>
              );
            })
          }
          </TableBody>
          
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[10, 25, 100]}
        component="div"
        count={(search!=="" && search !==" ") ? rowSearch?.length :rows?.length > 0 ? rows?.length : 0}
        rowsPerPage={rowsPerPage}
        style={{background:theme?"white":"#08090C",color:theme?"black":"#fff",border:"0px solid grey"}}
        page={page}
        onChangePage={handleChangePage}
        onChangeRowsPerPage={handleChangeRowsPerPage}
      />
    </div>
  );
}
