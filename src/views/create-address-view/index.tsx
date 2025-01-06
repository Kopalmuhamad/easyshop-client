import { Card, CardContent } from "@/components/atoms/card";
import {
  HeaderPage,
  HeaderPageContent,
  HeaderPageDescription,
  HeaderPageTitle,
} from "@/components/atoms/header-page";
import Container from "@/components/shared/container";
import CreateAddressForm from "@/features/address/components/create-address-form";

const CreateAddressView = () => {
  return (
    <Container className="pt-20 pb-10 space-y-4">
      <HeaderPage>
        <HeaderPageContent>
          <HeaderPageTitle>Create Address</HeaderPageTitle>
          <HeaderPageDescription>Create a new address</HeaderPageDescription>
        </HeaderPageContent>
      </HeaderPage>
      <Card>
        <CardContent className="py-4">
          <CreateAddressForm />
        </CardContent>
      </Card>
    </Container>
  );
};

export default CreateAddressView;
