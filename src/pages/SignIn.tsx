import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@radix-ui/react-label";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

interface Inputs {
  email: string;
  password: string;
}

const SignIn = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm<Inputs>();

  const navigate = useNavigate();

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    setIsLoading(true);
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/api/v1/auth/sign-in`,
        {
          email: data.email,
          password: data.password,
        }
      );
      localStorage.setItem("jwtToken", response.data.token);
      // setRole(response.data.user.role);
      navigate("/dashboard");
    } catch (err: any) {
      if (err.response?.data?.msg === "User not registered") {
        setError("email", {
          type: "manual",
          message: "Email id not registered",
        });
      } else {
        setError("password", {
          type: "manual",
          message: "Incorrect password",
        });
      }
      console.log(err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <Card className="border-none shadow-none mx-auto max-w-sm fromTop duration-500">
        <CardHeader className="text-center pb-10 ">
          <CardTitle className="text-4xl">Welcome back</CardTitle>
          <CardDescription>Enter your information to sign in</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4">
            <form className="grid gap-4" onSubmit={handleSubmit(onSubmit)}>
              <div className="grid gap-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  className="border-slate-500 focus:border-none"
                  id="email"
                  type="email"
                  placeholder="m@example.com"
                  {...register("email", { required: "Email is required" })}
                />
                {errors.email && (
                  <span className="text-red-500 text-xs">
                    {errors.email.message}
                  </span>
                )}
              </div>
              <div className="grid gap-2">
                <Label htmlFor="password">Password</Label>
                <Input
                  className="border-slate-400 focus:border-none"
                  id="password"
                  type="password"
                  {...register("password", {
                    required: "Password is required",
                  })}
                />
                {errors.password && (
                  <span className="text-red-500 text-xs">
                    {errors.password.message}
                  </span>
                )}
              </div>
              <Button
                type="submit"
                className="bg-violet-800 text-white hover:bg-violet-900 hover:text-white"
                disabled={isLoading}
              >
                {isLoading ? (
                  <div className="flex items-center justify-center">
                    <div className="w-4 h-4 border-2 border-t-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                    Loading...
                  </div>
                ) : (
                  "Sign In"
                )}
              </Button>
            </form>
          </div>
          <div className="mt-4 text-center text-sm">
            Do not have an account?{" "}
            <Link to="/sign-up" className="underline">
              Sign up
            </Link>
          </div>
        </CardContent>
      </Card>
    </>
  );
};

export default SignIn;
