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
                // label={position.label}
                clusterer={clusterer}
                icon={{
                  url: '/icons/pine.png',
                  scaledSize: new window.google.maps.Size(50, 50),
                }}
                onMouseOver={() => setHoveredMarker(index)}
                onMouseOut={() => setHoveredMarker(null)}
              />
            ))
          }
        </MarkerClusterer>
        {hoveredMarker !== null && (
          <Marker
            position={markerPositions[hoveredMarker]}
            label={markerPositions[hoveredMarker].label}
            icon={{
              url: '/icons/pine.png',
              scaledSize: new window.google.maps.Size(50, 50),
            }}
            options={{ visible: true }}
          />
        )}
      </GoogleMap>
    </LoadScript>
  );
};

export default MapContainerClustering;
