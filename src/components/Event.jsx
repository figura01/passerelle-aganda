import './Event.css';
import MapItem from './MapItem';
const Event = ({ data }) => {
  return <div className="event card w-full">
    <div className="flex flex-col  w-full shadow rounded-t-4 card mb-4">
      <h2 className="font-bold text-lg bg-sky-400 rounded text-white mb-2 px-2">{data.fields.title_fr}</h2>
      <div className="flex flex-row w-full p-4">
        <img  src={data.fields.thumbnail} alt="#" className="mr-4" />
        
        <div className="flex flex-col w-full">
          <p className="text-bold"><span className="font-bold">Ville: </span>{data.fields.location_city}</p>
          <p ><span className="font-bold">Addresse:</span> {data.fields.location_address}</p>
          
          <p>{data.fields.description_fr}</p>
        </div>  
        <MapItem coords={data.geometry.coordinates} />
      </div>
    </div> 
  </div>
}

export default Event;