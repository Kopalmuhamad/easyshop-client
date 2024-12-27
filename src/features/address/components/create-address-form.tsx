import { useForm } from "react-hook-form";
import { z } from "zod";
import { addressSchema, useCreateAddress } from "../hooks/use-create-address";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/atoms/form";
import { Input } from "@/components/atoms/input";
import { Button } from "@/components/atoms/button";
import { useNavigate } from "react-router-dom";
import { MapContainer, TileLayer, Marker, useMapEvents } from "react-leaflet";
import { LatLngExpression } from "leaflet";
import { LeafletMouseEvent } from "leaflet";
import { useState } from "react";

const CreateAddressForm = () => {
  const navigate = useNavigate();
  const [coordinates, setCoordinates] = useState({ latitude: 0, longitude: 0 });
  const defaultCenter: LatLngExpression = [-6.2, 106.816666];

  const form = useForm<z.infer<typeof addressSchema>>({
    resolver: zodResolver(addressSchema),
    defaultValues: {
      country: "Indonesia",
      coordinates: { latitude: 0, longitude: 0 },
    },
  });

  const { mutate: address, status } = useCreateAddress();
  const isLoading = status === "pending";

  const onSubmit = async (data: z.infer<typeof addressSchema>) => {
    const parsedData = {
      ...data,
      coordinates,
    };
    address(parsedData);
  };

  // Component to handle map click events
  const MapClickHandler = () => {
    useMapEvents({
      click(e: LeafletMouseEvent) {
        setCoordinates({ latitude: e.latlng.lat, longitude: e.latlng.lng });
      },
    });
    return null;
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <FormField
          name="country"
          control={form.control}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Country</FormLabel>
              <FormControl>
                <Input
                  type="text"
                  placeholder="Enter your country"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          name="province"
          control={form.control}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Province</FormLabel>
              <FormControl>
                <Input
                  type="text"
                  placeholder="Enter your province"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          name="city"
          control={form.control}
          render={({ field }) => (
            <FormItem>
              <FormLabel>City</FormLabel>
              <FormControl>
                <Input type="text" placeholder="Enter your city" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          name="district"
          control={form.control}
          render={({ field }) => (
            <FormItem>
              <FormLabel>District</FormLabel>
              <FormControl>
                <Input
                  type="text"
                  placeholder="Enter your district"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          name="subDistrict"
          control={form.control}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Sub District</FormLabel>
              <FormControl>
                <Input
                  type="text"
                  placeholder="Enter your sub district"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          name="postalCode"
          control={form.control}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Postal Code</FormLabel>
              <FormControl>
                <Input
                  type="text"
                  placeholder="Enter your sub postal code"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          name="detail"
          control={form.control}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Detail</FormLabel>
              <FormControl>
                <Input type="text" placeholder="Detail" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          name="coordinates"
          control={form.control}
          render={() => (
            <FormItem>
              <FormLabel>Coordinates</FormLabel>
              <FormControl>
                <div className="mb-4">
                  <MapContainer
                    center={defaultCenter}
                    zoom={13}
                    style={{ height: "300px", width: "100%" }}
                  >
                    <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
                    <MapClickHandler />
                    <Marker
                      position={[coordinates.latitude, coordinates.longitude]}
                    />
                  </MapContainer>
                </div>
              </FormControl>
              <p className="text-sm text-gray-600">
                Selected Coordinates: {coordinates.latitude.toFixed(5)},{" "}
                {coordinates.longitude.toFixed(5)}
              </p>
            </FormItem>
          )}
        />

        <div className="mt-4 space-x-4 flex items-center justify-start">
          <Button variant={"secondary"} type="submit" disabled={isLoading}>
            {isLoading ? "Loading..." : "Save"}
          </Button>
          <Button
            variant={"destructive"}
            type="button"
            onClick={() => navigate(-1)}
          >
            Cancel
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default CreateAddressForm;
