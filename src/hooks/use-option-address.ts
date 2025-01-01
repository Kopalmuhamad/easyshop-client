import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useAddress } from "@/features/address/hooks/use-address";
import { useCurrentUser } from "@/features/auth/hooks/use-current-user";
import { setSelectedAddress } from "@/store/slices/selected-address-slice";
import { RootState } from "@/store/store";

export const useOptionAddress = () => {
  const dispatch = useDispatch();
  const { data: address, status: addressStatus } = useAddress();
  const { data: user, status: userStatus } = useCurrentUser();
  const isLoading = addressStatus === "pending" || userStatus === "pending";

  const choosedAddress = useSelector(
    (state: RootState) => state.address.addressId
  );

  const defaultAddress = address?.find((address) => address.defaultAddress);
  const selectedAddress = address?.find(
    (address) => address._id === choosedAddress
  );

  const handleChangeAddress = (addressId: string) => {
    dispatch(setSelectedAddress(addressId));
  };

  useEffect(() => {
    if (!choosedAddress && defaultAddress?._id) {
      dispatch(setSelectedAddress(defaultAddress._id));
    }
  }, [choosedAddress, defaultAddress, dispatch]);

  return {
    address,
    user,
    selectedAddress,
    handleChangeAddress,
    isLoading,
  };
};
