import {
  FC,
  useCallback,
  useState,
} from 'react';

import {
  GoogleMap,
  InfoWindow,
  Marker,
  MarkerClusterer,
  useJsApiLoader,
} from '@react-google-maps/api';

type Location = any;

type Props = {
  markers: Location[];
  width: number;
  height: number;
}

const center = {
  lat: 51.55424,
  lng: -0.138815,
};

export const Map: FC<Props> = ({
  width,
  height,
  markers,
}) => {
  const { isLoaded } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_API_KEY ?? '',
  })

  const [map, setMap] = useState<google.maps.Map | null>(null)
  const [activeMarkerPosition, setActiveMarkerPosition] = useState<google.maps.LatLng | null>(null);
  const [activeMarker, setActiveMarker] = useState<Location | null>(null);
  const onLoad = useCallback((map) => {
    setMap(map)
  }, [])

  const onUnmount = useCallback((map) => {
    setMap(null)
  }, [])

  return isLoaded ? (
    <GoogleMap
      mapContainerStyle={{
        width: `${width}px`,
        height: `${height}px`
      }}
      center={center}
      zoom={10}
      onLoad={onLoad}
      onBoundsChanged={() => console.log(map?.getBounds())}
      onUnmount={onUnmount}
    >
      <MarkerClusterer options={{}}>
        {(clusterer) =>
          markers.map((marker) => (
            <Marker key={marker.URN}
              position={JSON.parse(marker.COORDINATES)}
              onClick={(e) => {
                console.log(e);
                setActiveMarkerPosition(e.latLng);
                setActiveMarker(marker);
              }}
              clusterer={clusterer} />
          ))
        }
      </MarkerClusterer>
      {
        (activeMarkerPosition && activeMarker) &&
        <InfoWindow
          position={activeMarkerPosition}
          options={{ pixelOffset: { height: -40, width: 0 } as google.maps.Size }}
          onCloseClick={() => {
            setActiveMarkerPosition(null);
            setActiveMarker(null);
          }}>
          <h1>{activeMarker.SCHNAME}</h1>
        </InfoWindow>
      }
    </GoogleMap>
  ) : <>Loading map...</>
}
