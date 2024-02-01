import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';

interface MarkerPosition {
  lat: number;
  lng: number;
  label?: string;
}

interface MapContainerProps {
  markerPositions: MarkerPosition[];
  zoom?: number;
}

const MapContainer: React.FC<MapContainerProps> = ({
  markerPositions,
  zoom,
}) => {
  const mapStyles = {
    height: '50vh',
    width: '100%',
  };

  const labelStyles = {
    color: 'white',
    background: 'rgba(0, 0, 0, 0.7)',
    padding: '8px',
    borderRadius: '4px',
    fontSize: '14px',
    fontWeight: 'bold',
  };

  return (
    <LoadScript googleMapsApiKey={process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY!}>
      <GoogleMap
        mapContainerStyle={mapStyles}
        zoom={zoom ? zoom : 11}
        center={markerPositions[0]}
        mapTypeId={'terrain'}
      >
        {markerPositions.map((position, index) => (
          <Marker key={index} position={position} label={position.label} />
        ))}
      </GoogleMap>
    </LoadScript>
  );
};

export default MapContainer;
