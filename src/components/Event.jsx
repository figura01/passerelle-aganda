import './Event.css';
import MapItem from './MapItem';
const Event = ({ data }) => {
  return <div className="event card">
    <div className="shadow rounded card">
      <h2 className="font-bold text-lg bg-sky-400 rounded text-white mb-2 px-2">{data.fields.title_fr}</h2>
      <div className="p-4">
        <p className="text-bold"><span className="font-bold">Ville: </span>{data.fields.location_city}</p>
        <p ><span className="font-bold">Addresse:</span> {data.fields.location_address}</p>
        <img  src={data.fields.thumbnail} alt="#" />
        <p>{data.fields.description_fr}</p>
      </div>
      <MapItem coords={data.geometry.coordinates} />
    </div> 
  </div>
}

export default Event;