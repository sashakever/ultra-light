import {MarkerF} from '@react-google-maps/api';
import React, {FC} from 'react';

type Props = {
  lat: number;
  lng: number;
  id: number;
  onClick?: (id: number) => void;
};

const Marker: FC<Props> = ({lat, lng, id, onClick}) => (
  <MarkerF
    onClick={() => onClick?.(id)}
    position={{
      lat,
      lng,
    }}
    // Here, let's set default markers until I find the reason for this behavior
    icon={{
      path: 'M16 29C16 29 26 22 26 13C26 10.3478 24.9464 7.8043 23.0711 5.92893C21.1957 4.05357 18.6522 3 16 3C13.3478 3 10.8043 4.05357 8.92893 5.92893C7.05357 7.8043 6 10.3478 6 13C6 22 16 29 16 29ZM20 13C20 15.2091 18.2091 17 16 17C13.7909 17 12 15.2091 12 13C12 10.7909 13.7909 9 16 9C18.2091 9 20 10.7909 20 13Z',
      fillColor: '#6439FF',
      fillOpacity: 1,
      anchor: new google.maps.Point(0, 32),
      strokeWeight: 1,
      strokeColor: '#6439FF',
    }}
  />
);

export default Marker;
