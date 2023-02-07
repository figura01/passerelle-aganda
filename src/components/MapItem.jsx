import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import React, { useState, useEffect } from "react";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import icon from "../images/icon.png";
import axios from 'axios';
import './MapItem.css'

export default function Map({ coords }) {

  const latitude = coords[1]
  const longitude = coords[0];
  
  console.log(latitude);
  console.log(longitude);
  // console.log(longitude );
  // const { lat, long } = coords;
  const [data, setData ] = useState({})
  const [error, setError ] = useState(false)
  const [isPending, setIsPending ] = useState(true)
  const customIcon = new L.Icon({
    iconUrl: icon,
    iconSize: [25, 35],
    iconAnchor: [5, 30]
  });

  function MapView() {
    let map = useMap();
    map.setView([latitude, longitude], map.getZoom());

    return null;
  }

  useEffect(() => {

    const fetchingData = async () => {
      let url=`https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=${latitude}&lon=${longitude}`
      console.log(url)
      try {
        let response = await axios.get(
          url, { method: "GET", mode: 'cors', headers: { "Access-Control-Allow-Origin": "https://o2cj2q.csb.app"}}
        )
        console.log(response.data)
        if(response.data) {

          setData(response.data)
          setError(false)
          setIsPending(false)
        }

      } catch(error) {
        console.log(error)
        setError(true)
        setIsPending(false)
      }
    }
    fetchingData()
  }, [latitude, longitude])
  
  return (
    <div className="w-50 h-50 relative">
        {isPending && (
          <div className="flex flex-col absolute z-10 justify-center top-1/2 left-1/2 items-center w-10 h-10 bg-sky-400">
            <svg class="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
              <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
          </div>
        )}
        
  
    
        <MapContainer
          classsName="map"
          center={[latitude, longitude]}
          zoom={5}
          scrollWheelZoom={true}
        >
          <TileLayer
            attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> 
            contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          <Marker icon={customIcon} position={[latitude, longitude]}>
            <Popup>test</Popup>
          </Marker>
          <MapView />
        </MapContainer>

    </div>
  );
}