import { buttonVariants } from "@/components/atoms/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/atoms/card";
import { IAddress } from "@/features/address/utils/interface-address";
import { LatLngLiteral } from "leaflet";
import { useState } from "react";
import {
  MapContainer,
  Marker,
  Popup,
  TileLayer,
  useMapEvents,
} from "react-leaflet";
import { Link } from "react-router-dom";

interface IProps {
  address: IAddress;
}

const ProfileAddress = ({ address }: IProps) => {
  function LocationMarker() {
    const [position, setPosition] = useState<LatLngLiteral | null>(
      address?.coordinates
        ? {
            lat: address.coordinates.latitude,
            lng: address.coordinates.longitude,
          }
        : null
    );
    const map = useMapEvents({
      click() {
        map.locate();
      },
      locationfound(e) {
        setPosition({
          lat: address?.coordinates?.latitude || e.latlng.lat,
          lng: address?.coordinates?.longitude || e.latlng.lng,
        });
        map.flyTo(
          {
            lat: address?.coordinates?.latitude || e.latlng.lat,
            lng: address?.coordinates?.longitude || e.latlng.lng,
          },
          map.getZoom()
        );
      },
    });

    return position === null ? null : (
      <Marker position={position}>
        <Popup>You are here</Popup>
      </Marker>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Address</CardTitle>
        <CardDescription>Default Address</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col md:flex-row md:items-center justify-between text-base font-medium py-1 border-b border-border">
          <span className="text-nowrap">Country : </span>
          <span className="text-muted-foreground">{address?.country}</span>
        </div>
        <div className="flex flex-col md:flex-row md:items-center justify-between text-base font-medium py-1 border-b border-border">
          <span className="text-nowrap">Province : </span>
          <span className="text-muted-foreground">{address?.province}</span>
        </div>
        <div className="flex flex-col md:flex-row md:items-center justify-between text-base font-medium py-1 border-b border-border">
          <span className="text-nowrap">City : </span>
          <span className="text-muted-foreground">{address?.city}</span>
        </div>
        <div className="flex flex-col md:flex-row md:items-center justify-between text-base font-medium py-1 border-b border-border">
          <span className="text-nowrap">District : </span>
          <span className="text-muted-foreground">{address?.district}</span>
        </div>
        <div className="flex flex-col md:flex-row md:items-center justify-between text-base font-medium py-1 border-b border-border">
          <span className="text-nowrap">Sub District : </span>
          <span className="text-muted-foreground">{address?.subDistrict}</span>
        </div>
        <div className="flex flex-col md:flex-row md:items-center justify-between text-base font-medium py-1 border-b border-border">
          <span className="text-nowrap">Postal Code : </span>
          <span className="text-muted-foreground">{address?.postalCode}</span>
        </div>
        <div className="flex flex-col md:flex-row md:items-start justify-between text-base font-medium gap-2">
          <span className="text-nowrap">Detail : </span>
          <span className="text-muted-foreground">
            {address?.country}, {address?.province}, {address?.city},
            {address?.district}, {address?.subDistrict}, {address?.postalCode},{" "}
            {address?.detail}
          </span>
        </div>
        <div className="mt-4">
          <MapContainer
            className="h-[300px] -z-0"
            center={{
              lat: address?.coordinates?.latitude || 0,
              lng: address?.coordinates?.longitude || 0,
            }}
            zoom={13}
            scrollWheelZoom={false}
          >
            <TileLayer
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            <LocationMarker />
          </MapContainer>
          <p className="text-sm text-gray-600">
            Selected Coordinates: {address?.coordinates?.latitude.toFixed(5)},{" "}
            {address?.coordinates?.longitude.toFixed(5)}
          </p>
        </div>
      </CardContent>
      <CardFooter>
        <Link to={"address"} className={buttonVariants({ variant: "secondary" })}>
          Manage Address
        </Link>
      </CardFooter>
    </Card>
  );
};

export default ProfileAddress;
