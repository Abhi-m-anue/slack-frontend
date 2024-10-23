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
import NavbarTop from "@/components/Navbar/NavbarTop";

interface Inputs {
  name: string;
  email: string;
  password: string;
}

const SignUp = () => {
  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm<Inputs>();

  const navigate = useNavigate();

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    setLoading(true);
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/api/v1/auth/sign-up`,
        {
          name: data.name,
          email: data.email,
          password: data.password,
        }
      );
      localStorage.setItem("jwtToken", response.data.token);
      localStorage.setItem("user", JSON.stringify(response.data?.user));
      navigate("/dashboard");
    } catch (err: any) {
      console.log(err);
      if (err.response?.data?.msg === "Duplicate value entered for email") {
        setError("email", {
          type: "manual",
          message: "Email id already registered",
        });
      } else {
        setError("root", {
          type: "manual",
          message: "something went wrong",
        });
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <NavbarTop></NavbarTop>
      <Card className="border-none shadow-none mx-auto max-w-sm fromTop duration-500">
        <CardHeader className="text-center pt-0 pb-10">
          <CardTitle className="text-4xl">Get started</CardTitle>
          <CardDescription>
            Enter your information to create an account
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4">
            <form className="grid gap-4" onSubmit={handleSubmit(onSubmit)}>
              <div className="grid gap-2">
                <Label className="text-sm" htmlFor="Name">
                  Name
                </Label>
                <Input
                  className="border-slate-500 focus:border-none"
                  id="first-name"
                  placeholder="Max"
                  {...register("name", { required: "Name is required" })}
                />
                {errors.name && (
                  <span className="text-red-500 text-xs">
                    {errors.name.message}
                  </span>
                )}
              </div>
              <div className="grid gap-2">
                <Label className="text-sm" htmlFor="email">
                  Email
                </Label>
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
                <Label className="text-sm" htmlFor="password">
                  Password
                </Label>
                <Input
                  className="border-slate-500 focus:border-none"
                  id="password"
                  type="password"
                  {...register("password", {
                    required: "Password is required",
                    minLength: { value: 6, message: "Password is too short" },
                  })}
                />
                {errors.password && (
                  <span className="text-red-500 text-xs">
                    {errors.password.message}
                  </span>
                )}
              </div>
              {errors.root && (
                <span className="text-red-500 text-xs">
                  {errors.root.message}
                </span>
              )}
              <Button
                type="submit"
                className="bg-violet-800 text-white hover:bg-violet-900 hover:text-white"
                disabled={loading}
              >
                {loading ? (
                  <div className="flex items-center justify-center">
                    <div className="w-4 h-4 border-2 border-t-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                    Creating...
                  </div>
                ) : (
                  "Create an account"
                )}
              </Button>
            </form>
          </div>
          <div className="mt-4 text-center text-sm">
            Already have an account?{" "}
            <Link to="/sign-in" className="underline">
              Sign in
            </Link>
          </div>
        </CardContent>
      </Card>
    </>
  );
};

export default SignUp;
