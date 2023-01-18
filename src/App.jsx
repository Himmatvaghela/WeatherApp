import React, { useEffect, useState } from "react";
import { WiDayRain,WiDaySunny,WiDayFog,WiCloudy } from "react-icons/wi";

function App() {

    const [data,setdata]=useState(null);
    const [country,setcountry]=useState()
    const [weather,setweather]=useState()
    const [city,setcity]=useState("delhi")
    
    
    let callapi= async () =>{
        let getdata=await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=806d3e817991a0ce28948195e2cd3ea1&units=metric`);
        let result=await getdata.json();
        setdata(result.main)
        setcountry(result.sys.country)
        setweather(result.weather[0])
    }

    function changefunc(e) {
        setcity(e.target.value)
        console.log(e.target.value);
    }
    
    useEffect(()=>{
        callapi()
    },[city])
    console.log(data);
    

    const newdate= new Date();
    function fulldat() {
        let weeks=["SUN","M0N","TUE","WED","THU","FRI","SAT"]
        let months=["JAN","FEB","MAR","APR","MAY","JUNE","JULY","AUG","SEP","OCT","NOV","DEC"];

        let day= weeks[newdate.getDay()]
        let month= months[newdate.getMonth()]
        let numday= newdate.getDate()
        // console.log(numday)

        return `${day} | ${month} ${numday}`
    }

    function time() {
        let hours=newdate.getHours()
        let minutes=newdate.getMinutes()
        let z= "AM"
        if (hours>11) {
            z="PM"
            if (hours>12) {
                hours-=12
            }
        }
        return hours+":"+minutes +" "+ z
            
    }


    return (
        <>
            <div className="box">
                <div className="inputdiv">
                <input type="text" className="inputcls"
                onChange={changefunc} 
                placeholder="city name"/>
                </div>
        {!data?(
            <h1 className="temp">not found</h1>
        ): (
            <div>
            <div className="wave -one"></div>
                <div className="wave -two"></div>
                <div className="wave -three"></div>

                {weather.main==="Clouds"?(
                    <div className="weatherconClouds"><WiCloudy/></div>
                ):weather.main==="Smoke" || weather.main==="Fog"? (
                    <div className="weatherconFog"><WiDayFog/></div>
                ):weather.main==="Rain"? (
                    <div className="weatherconRain"><WiDayRain/></div>
                ):<div className="weatherconSunny"><WiDaySunny/></div>}
                
                <div className="info">
                    <h2 className="location">{city}, {country},</h2>
                    <p className="date">{fulldat()} | {time()}</p>
                    <h1 className="temp">{data.temp}</h1>
                    <h3 className="tempmin_max">min {data.temp_min} |max {data.temp_max}</h3>
                </div>
            </div>
        )}
                
            </div>
        </>
    )
}

export default App;
