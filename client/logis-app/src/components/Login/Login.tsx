import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";

import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { FaUser, FaLock, FaArrowRight, FaArrowLeft } from "react-icons/fa";
import { Alert, AlertDescription } from "@/components/ui/alert";
import axiosInstance from "@/utils/axiosInstance";

const Login: React.FC = () => {
  const navigate = useNavigate();

  // Validation Schema
  const formSchema = z.object({
    username: z.string().min(2, "Must be at least 2 characters"),
    password: z
      .string()
      .min(6, { message: "Password must be at least 6 characters." })
      .regex(/[A-Z]/, {
        message: "Must contain at least one uppercase letter.",
      })
      .regex(/[a-z]/, {
        message: "Must contain at least one lowercase letter.",
      })
      .regex(/[0-9]/, { message: "Must contain at least one number." })
      .regex(/[^A-Za-z0-9]/, {
        message: "Must contain at least one special character.",
      }),
  });

  const [loginFailed, setLoginFailed] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [fetchFailed, setFetchFailed] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: "",
      password: "",
    },
  });

  //Validate User
  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    setIsLoading(true);
    try {
      const response = await axiosInstance.post("/logins", {
        username: values.username,
        password: values.password,
      });

      if (response.data.msg === "success" && response.data.code === 1) {
        setLoginFailed(false);
        window.location.href = "/products";
      } else {
        setLoginFailed(true);
        setErrorMessage("Invalid username or password.");
      }
    } catch (error) {
      console.log("Catch error", error);
      setFetchFailed(true);
      setLoginFailed(true);
    } finally {
      setIsLoading(false);
    }
  };

  //Connection Problem with server
  if (fetchFailed) {
    return (
      <div className="min-h-screen bg-primary flex items-center justify-center p-4">
        <div className="bg-white/10 rounded-2xl p-8 max-w-md w-full border border-white/20 shadow-xl text-white text-center">
          <Alert className="bg-red-500 border border-red-500/50 mb-6 text-pink">
            <AlertDescription>
              Connection error. Please try again later.
            </AlertDescription>
          </Alert>
          <Button
            onClick={() => window.location.reload()}
            className="bg-white/20 hover:bg-white/30 text-white hover:scale-150"
          >
            Refresh Page
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-primary flex flex-col items-center justify-center p-4">
      <div className="max-w-md w-full bg-white/10 rounded-2xl p-8 border border-white/20 shadow-xl">
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-bold text-white">Welcome Back</h1>
          <p className="mt-2 text-pink-100">Sign in to your Tusla account</p>
        </div>

        {/* Display Form */}
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="username"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-white">Username</FormLabel>
                  <FormControl>
                    <div className="relative">
                      <div className="absolute left-3 top-3 text-white">
                        <FaUser />
                      </div>
                      <Input
                        type="text"
                        placeholder="Enter your username"
                        className="bg-white/20 border-white/30 pl-10 text-white placeholder:text-white focus-visible:ring-pink-500"
                        {...field}
                      />
                    </div>
                  </FormControl>
                  <FormMessage className="text-pink-200" />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-white">Password</FormLabel>
                  <FormControl>
                    <div className="relative">
                      <div className="absolute left-3 top-3 text-white">
                        <FaLock />
                      </div>
                      <Input
                        type="password"
                        placeholder="Enter your password"
                        className="bg-white/20 border-white/30 pl-10 text-white placeholder:text-white focus-visible:ring-pink-500"
                        {...field}
                      />
                    </div>
                  </FormControl>
                  <FormMessage className="text-pink-200" />
                </FormItem>
              )}
            />

            {loginFailed && (
              <Alert className="bg-red-500/20 border border-red-500/50">
                <AlertDescription className="text-white">
                  {errorMessage}
                </AlertDescription>
              </Alert>
            )}

            <div className="pt-2">
              <Button
                type="submit"
                className="w-full py-6 text-lg font-medium rounded-xl bg-black hover:scale-105 flex items-center justify-center gap-2"
                disabled={isLoading} // isloading = true disable this means query stil running
              >
                {isLoading ? (
                  <div className="animate-spin h-5 w-5 border-2 border-white border-t-transparent" />
                ) : (
                  <>
                    <span>Sign In</span>
                    <FaArrowRight />
                  </>
                )}
              </Button>
            </div>

            <div className="flex justify-between pt-4 text-sm">
              <Link
                to="/"
                className="text-pink-100 hover:text-white hover:scale-[1.2] flex items-center gap-1"
              >
                <FaArrowLeft size={12} />
                <span>Back to Home</span>
              </Link>

              <Link
                to="/register"
                className="text-pink-100 hover:scale-[1.2] hover:text-white"
              >
                Create Account
              </Link>
            </div>
          </form>
        </Form>
      </div>
    </div>
  );
};

export default Login;
