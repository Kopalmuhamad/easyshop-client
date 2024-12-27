import { buttonVariants } from "@/components/atoms/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/atoms/card";
import Container from "@/components/shared/container";
import RegisterForm from "@/features/auth/components/register-form";
import { cn } from "@/lib/utils";
import { Link } from "react-router-dom";

const RegisterView = () => {
  return (
    <div>
      <Container className="flex items-center justify-center min-h-screen">
        <Card className="max-w-[300px] sm:max-w-sm md:max-w-md w-full">
          <CardHeader className="flex flex-col items-center justify-center text-center">
            <CardTitle className="text-2xl font-bold">Register</CardTitle>
            <CardDescription className="text-base font-normal">
              Please fill in the form below to create an account.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <RegisterForm />
          </CardContent>
          <CardFooter>
            <span className="text-sm flex flex-wrap items-center justify-center">
              <p className="text-nowrap">Already have an account ?</p>
              <Link
                className={cn(buttonVariants({ variant: "link" }), "px-1")}
                to={"/register"}
              >
                Please login
              </Link>
            </span>
          </CardFooter>
        </Card>
      </Container>
    </div>
  );
};

export default RegisterView;
