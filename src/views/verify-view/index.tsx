import { Button } from "@/components/atoms/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/atoms/card";
import Container from "@/components/shared/container";
import VerifyForm from "@/features/auth/components/verify-form";
import { useGenerateOtp } from "@/features/auth/hooks/use-generate-otp";

const VerifyView = () => {
  const { mutate: generateOtp } = useGenerateOtp();
  return (
    <div>
      <Container className="min-h-screen flex items-center justify-center">
        <Card className="max-w-[300px] sm:max-w-sm md:max-w-md w-full">
          <CardHeader className="flex flex-col items-center justify-center text-center">
            <CardTitle className="text-2xl font-bold">
              Verify your email address
            </CardTitle>
            <CardDescription className="text-base font-normal">
              We have sent you an email with a verification link. Please check
              your email and click the link to verify your email address.
            </CardDescription>
          </CardHeader>
          <CardContent className="flex items-center justify-center">
            <VerifyForm />
          </CardContent>
          <CardFooter>
            <p>
              <span>Didn't receive the email? </span>
              <Button
                type="button"
                variant={"link"}
                className="px-1"
                onClick={() => generateOtp()}
              >
                Resend
              </Button>
            </p>
          </CardFooter>
        </Card>
      </Container>
    </div>
  );
};

export default VerifyView;
