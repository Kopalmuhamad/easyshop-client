export interface ICoordinates {
  latitude: number;
  longitude: number;
}

export interface IAddress {
  _id: string;
  userId: string;
  detail: string;
  subDistrict: string;
  district: string;
  city: string;
  province: string;
  country: string;
  postalCode: string;
  defaultAddress: boolean;
  coordinates?: ICoordinates; // Properti opsional
}

export interface IAddressResponse {
  data: IAddress[];
  message: string;
  status: string;
  success: boolean;
}
