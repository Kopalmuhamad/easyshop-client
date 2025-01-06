import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/atoms/card";

const RelatedProductNotFound = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>We don't have any related products</CardTitle>
        <CardDescription>Please stay tuned for updates</CardDescription>
      </CardHeader>
    </Card>
  );
};

export default RelatedProductNotFound;
