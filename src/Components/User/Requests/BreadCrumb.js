import React from 'react'
import "./Requests.css"
const BreadCrumb = ({theme}) => {
    return (
        <div className='breadcrumbsuser'>
        <h3 style={{color:theme?"black":""}}>
            Home / Requests {" "}
        </h3>
    </div>
    )
}

export default BreadCrumb
