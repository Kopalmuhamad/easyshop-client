import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/atoms/card";
import Container from "@/components/shared/container";
import CreateAddressForm from "@/features/address/components/create-address-form";

const CreateAddressView = () => {
  return (
    <Container>
      <Card>
        <CardHeader>
          <CardTitle>Create Address</CardTitle>
          <CardDescription>Create a new address</CardDescription>
        </CardHeader>
        <CardContent>
          <CreateAddressForm />
        </CardContent>
        <CardFooter></CardFooter>
      </Card>
    </Container>
  );
};

export default CreateAddressView;
