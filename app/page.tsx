"use client"
import { useEffect } from "react"

function page() {
  useEffect(()=>{
    window.navigator.geolocation.getCurrentPosition((position)=>{
      const {latitude,longitude}=position.coords
      fetch(`/api/weather?lat=${latitude}&lon=${longitude}`)
      .then((res)=>res.json())
      .then((data)=>console.log(data))
    })
  },[])
  return (
    <div>page</div>
  )
}

export default page