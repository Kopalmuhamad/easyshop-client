import { buttonVariants } from "@/components/atoms/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/atoms/card";
import Container from "@/components/shared/container";
import PopUpUpdateUser from "@/components/moleculs/pop-up-update-user";
import { useCurrentUser } from "@/features/auth/hooks/use-current-user";
import PopUpUpdatePassword from "@/components/moleculs/pop-up-update-password";
import { useDefaultAddress } from "@/features/address/hooks/use-default-address";
import {
  MapContainer,
  Marker,
  Popup,
  TileLayer,
  useMapEvents,
} from "react-leaflet";
import { useState } from "react";
import { LatLngLiteral } from "leaflet";
import { Link } from "react-router-dom";

const ProfileView = () => {
  const { data: currentUser } = useCurrentUser();
  const { data: address } = useDefaultAddress();

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
    <Container className="py-20 grid grid-cols-1 md:grid-cols-2 gap-4 grid-flow-row">
      <Card className="h-fit">
        <CardHeader>
          <figure className="w-fit">
            <img
              src={
                currentUser?.image ||
                "https://static.vecteezy.com/system/resources/thumbnails/004/511/281/small_2x/default-avatar-photo-placeholder-profile-picture-vector.jpg"
              }
              alt={currentUser?.username || "profile_image"}
              className="aspect-square w-full max-w-[300px] rounded-full object-cover object-center"
            />
            {!currentUser?.image && (
              <p className="text-center mt-2 text-sm text-muted-foreground">
                You don't have a profile picture
              </p>
            )}
          </figure>
        </CardHeader>
        <CardContent className="space-y-2">
          <div className="flex flex-col md:flex-row md:items-center justify-between text-base font-medium">
            <span className="text-nowrap">Username : </span>
            <span className="text-muted-foreground">
              {currentUser?.username}
            </span>
          </div>
          <div className="flex flex-col md:flex-row md:items-center justify-between text-base font-medium">
            <span className="text-nowrap">Email : </span>
            <span className="text-muted-foreground">{currentUser?.email}</span>
          </div>
          <div className="flex flex-col md:flex-row md:items-center justify-between text-base font-medium">
            <span className="text-nowrap">Phone No : </span>
            <span className="text-muted-foreground">{currentUser?.phone}</span>
          </div>
        </CardContent>
        <CardFooter className="flex items-center justify-start gap-2">
          <PopUpUpdateUser />
          <PopUpUpdatePassword />
          {currentUser?.isVerified === false && (
            <Link
              to={"/verify"}
              className={buttonVariants({ variant: "outline" })}
            >
              Verification account
            </Link>
          )}
        </CardFooter>
      </Card>
      {address ? (
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
              <span className="text-muted-foreground">
                {address?.subDistrict}
              </span>
            </div>
            <div className="flex flex-col md:flex-row md:items-center justify-between text-base font-medium py-1 border-b border-border">
              <span className="text-nowrap">Postal Code : </span>
              <span className="text-muted-foreground">
                {address?.postalCode}
              </span>
            </div>
            <div className="flex flex-col md:flex-row md:items-start justify-between text-base font-medium gap-2">
              <span className="text-nowrap">Detail : </span>
              <span className="text-muted-foreground">
                {address?.country}, {address?.province}, {address?.city},
                {address?.district}, {address?.subDistrict},{" "}
                {address?.postalCode}, {address?.detail}
              </span>
            </div>
            <div className="mt-4">
              <MapContainer
                className="h-[300px]"
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
                Selected Coordinates:{" "}
                {address?.coordinates?.latitude.toFixed(5)},{" "}
                {address?.coordinates?.longitude.toFixed(5)}
              </p>
            </div>
          </CardContent>
          <CardFooter>
            <Link to={"address"} className={buttonVariants({})}>
              Manage Address
            </Link>
          </CardFooter>
        </Card>
      ) : (
        <Card>
          <CardHeader>
            <CardTitle>You don&apos;t have any address</CardTitle>
            <CardDescription>
              Create your first address before checkout
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Link to={"address/create"} className={buttonVariants({})}>
              Add Address
            </Link>
          </CardContent>
        </Card>
      )}
    </Container>
  );
};

export default ProfileView;
