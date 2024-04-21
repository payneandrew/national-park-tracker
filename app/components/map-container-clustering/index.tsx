import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';
import { useState } from 'react';

interface MarkerPosition {
  lat: number;
  lng: number;
  label?: string;
  compliant?: boolean;
}

interface MapContainerClusteringProps {
  markerPositions: MarkerPosition[];
  zoom?: number;
}

const MapContainerClustering: React.FC<MapContainerClusteringProps> = ({
  markerPositions,
  zoom,
}) => {
  const mapStyles = {
    height: '100vh',
    width: '100%',
  };

  const [hoveredMarker, setHoveredMarker] = useState<number | null>(null);

  const handleMarkerMouseOver = (index: number) => {
    setHoveredMarker(index);
  };

  const handleMarkerMouseOut = () => {
    setHoveredMarker(null);
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
          <Marker
            key={index}
            position={position}
            onMouseOver={() => handleMarkerMouseOver(index)}
            onMouseOut={handleMarkerMouseOut}
            icon={{
              url: position.compliant ? 'icons/check.png' : 'icons/close.png',
              scaledSize: new google.maps.Size(30, 30),
            }}
          />
        ))}
        {hoveredMarker !== null && (
          <Marker
            position={markerPositions[hoveredMarker]}
            label={{
              //@ts-ignore
              text: markerPositions[hoveredMarker].label,
              className:
                'absolute top-0 left-1/2 transform -translate-x-1/2 bg-white rounded-lg p-2 shadow-md',
            }}
            icon={{
              url: markerPositions[hoveredMarker].compliant
                ? 'icons/check.png'
                : 'icons/close.png',
              scaledSize: new google.maps.Size(30, 30),
            }}
            onMouseOver={() => handleMarkerMouseOver(hoveredMarker)}
            onMouseOut={handleMarkerMouseOut}
          />
        )}
      </GoogleMap>
    </LoadScript>
  );
};

export default MapContainerClustering;
