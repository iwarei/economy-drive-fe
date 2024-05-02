import React, { useState } from 'react';
import Leaflet, { LatLng } from 'leaflet';
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  useMapEvents,
} from 'react-leaflet';

import 'leaflet/dist/leaflet.css';
import icon from 'leaflet/dist/images/marker-icon.png';
import iconShadow from 'leaflet/dist/images/marker-shadow.png';

import { PageTemplate } from '../templates/PageTemplate';
import { SelectWithLabel } from '../molecules/SelectWithLabel';

const DefaultIcon = Leaflet.icon({
  iconUrl: icon,
  shadowUrl: iconShadow,
  iconAnchor: [12, 52],
  popupAnchor: [0, -52],
});
Leaflet.Marker.prototype.options.icon = DefaultIcon;

const AddMaker = () => {
  const [positions, setPositions] = useState<LatLng[]>([]);

  useMapEvents({
    click(e) {
      setPositions((prev) => [...prev, e.latlng]);
      // 位置移動 const map = useMapEventとする。
      // map.flyTo(e.latlng, map.getZoom());
    },
  });

  return (
    <>
      {positions.map((position) => (
        <Marker position={position}>
          <Popup>Add marker.</Popup>
        </Marker>
      ))}
    </>
  );
};

export const NotifyPointMaster = () => {
  return (
    <PageTemplate headerText="通知地点マスタ">
      <SelectWithLabel
        id="lineName"
        name="lineName"
        labelText="線名"
        optionText={['鹿児島本線', '日豊本線', '篠栗線']}
        optionValue={['0', '1', '2']}
      />
      <MapContainer
        center={[33.60704791317926, 130.42362499693166]}
        zoom={16}
        style={{ height: '100vh', width: '100vw' }}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://mt1.google.com/vt/lyrs=r&x={x}&y={y}&z={z}"
        />
        <Marker position={[33.60704791317926, 130.42362499693166]}>
          <Popup>
            A pretty CSS3 popup. <br /> Easily customizable.
          </Popup>
        </Marker>
        <AddMaker />
      </MapContainer>
    </PageTemplate>
  );
};
