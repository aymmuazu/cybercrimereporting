import React, { useEffect } from 'react'

const CustomTitlePage = ({ title, app_name }) => {
   
   useEffect(() => {
     document.title = title+' | '+app_name
   }, [])
}

export default CustomTitlePage
