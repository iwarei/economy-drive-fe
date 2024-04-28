import React, { useState } from 'react';
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  useMapEvents,
} from 'react-leaflet';
import icon from 'leaflet/dist/images/marker-icon.png';
import iconShadow from 'leaflet/dist/images/marker-shadow.png';
import Leaflet, { LatLng, Icon } from 'leaflet';
import { PageTemplate } from '../templates/PageTemplate';
import { SelectWithLabel } from '../molecules/SelectWithLabel';
import 'leaflet/dist/leaflet.css';

const DefaultIcon = Leaflet.icon({
  iconUrl: icon,
  shadowUrl: iconShadow,
});
Leaflet.Marker.prototype.options.icon = DefaultIcon;

const AddMaker = () => {
  const [position, setPosition] = useState<any>();

  const map = useMapEvents({
    click(e) {
      setPosition(e.latlng);
      map.flyTo(e.latlng, map.getZoom());
    },
  });
  return !position ? null : (
    <Marker position={position}>
      <Popup>You are here</Popup>
    </Marker>
  );
};

export const NotifyPointMaster = () => {
  const positionList = [
    new LatLng(33.60704791317926, 130.42362499693166),
    new LatLng(33.60625898161045, 130.42343429388856),
    new LatLng(33.6054073955636, 130.42314384747036),
    new LatLng(33.604693913765274, 130.42286758303968),
  ];

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
        center={positionList[0]}
        zoom={16}
        style={{ height: '50vh', width: '100%' }}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://mt1.google.com/vt/lyrs=r&x={x}&y={y}&z={z}"
        />
        {positionList.map((p) => {
          return <Marker position={p} key={`${p.lat}-${p.lng}`} />;
        })}
        <AddMaker />
      </MapContainer>
      <p>テスト</p>
    </PageTemplate>
  );
};
