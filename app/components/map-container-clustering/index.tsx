import {
  GoogleMap,
  LoadScript,
  Marker,
  MarkerClusterer,
} from '@react-google-maps/api';
import { useState } from 'react';

interface MarkerPosition {
  lat: number;
  lng: number;
  label?: string;
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
    height: '50vh',
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
        <MarkerClusterer gridSize={60} averageCenter enableRetinaIcons>
          {(clusterer) =>
            //@ts-ignore
            markerPositions.map((position, index) => (
              <Marker
                key={index}
                position={position}
                clusterer={clusterer}
                onMouseOver={() => handleMarkerMouseOver(index)}
                onMouseOut={handleMarkerMouseOut}
              />
            ))
          }
        </MarkerClusterer>
        {hoveredMarker !== null && (
          <Marker
            position={markerPositions[hoveredMarker]}
            label={{
              //@ts-ignore
              text: markerPositions[hoveredMarker].label,
              className: 'font-bold',
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
