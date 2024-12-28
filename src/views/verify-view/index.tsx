import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/atoms/card";
import Container from "@/components/shared/container";
import Loader from "@/components/shared/loader";
import VerifyForm from "@/features/auth/components/verify-form";
import { useGenerateOtp } from "@/features/auth/hooks/use-generate-otp";
import { Link } from "react-router-dom";

const VerifyView = () => {
  const { mutate: generateOtp, status } = useGenerateOtp();
  const isLoading = status === "pending";

  if (isLoading) {
    return (
      <div className="relative w-screen h-screen">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
          <Loader />
        </div>
      </div>
    );
  }

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
            <p className="text-sm">
              <span>Didn't receive the email? </span>
              <span
                onClick={() => generateOtp()}
                className="hover:underline font-medium cursor-pointer"
              >
                Resend OTP
              </span>{" "}
              or skip for now and{" "}
              <Link to="/login" className="hover:underline font-medium">
                Login
              </Link>
            </p>
          </CardFooter>
        </Card>
      </Container>
    </div>
  );
};

export default VerifyView;
