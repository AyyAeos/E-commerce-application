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

import { useNavigate, Link } from "react-router-dom";
import { useState } from "react";
import {
  FaUser,
  FaPhone,
  FaEnvelope,
  FaLock,
  FaArrowRight,
  FaArrowLeft,
} from "react-icons/fa";
import { Alert, AlertDescription } from "@/components/ui/alert";
import axiosInstance from "@/utils/axiosInstance";

const Register: React.FC = () => {
  const navigate = useNavigate();
  const [errorMessage, setErrorMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  // Validation Schema
  const formSchema = z.object({
    name: z.string().min(2, "Name must be at least 2 characters"),
    userPhone: z.string().min(10, "Phone number must be at least 10 digits"),
    username: z.string().min(2, "Username must be at least 2 characters"),
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
    email: z.string().email("Invalid email address"),
  });

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      userPhone: "",
      username: "",
      password: "",
      email: "",
    },
  });

  //Register user
  const onSubmit = async (values: any) => {
    setIsLoading(true);
    try {
      const response = await axiosInstance.post("/logins/register", values);
      console.log(response.data);
      if (response.data.code === 0) {
        setErrorMessage(response.data.msg);
      } else if (
        response.data.msg === "success" &&
        response.data.data === true
      ) {
        console.log("Registration successful");
        navigate("/logins");
      }
    } catch (error: any) {
      console.log("Registration failed", error);
      const message =
        error.response?.data?.msg || "Registration failed. Try again.";
      console.log(message);
      setErrorMessage(message);
    } finally {
      setIsLoading(false);
    }
  };

  // Form Icon
  const fieldIcons = {
    name: <FaUser />,
    userPhone: <FaPhone />,
    username: <FaUser />,
    email: <FaEnvelope />,
    password: <FaLock />,
  };

  //  Form Tittle
  const fieldLabels = {
    name: "Full Name",
    userPhone: "Phone Number",
    username: "Username",
    email: "Email Address",
    password: "Password",
  };

  return (
    <div className="min-h-screen bg-primary flex flex-col items-center justify-center p-4">
      <div className="max-w-md w-full bg-white/10 rounded-2xl p-8 border border-white/20 shadow-xl">
        <div className="mb-6 text-center">
          <h1 className="text-3xl font-bold text-white">Create Account</h1>
          <p className="mt-2 text-pink-100">Join Tusla and get started today</p>
        </div>

        {/* Display Form */}
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            {["name", "userPhone", "username", "email", "password"].map(
              (fieldName) => (
                <FormField
                  key={fieldName}
                  control={form.control}
                  name={fieldName as any}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-white">
                        {fieldLabels[fieldName as keyof typeof fieldLabels]}
                      </FormLabel>
                      <FormControl>
                        <div className="relative">
                          <div className="absolute left-3 top-3 text-white">
                            {fieldIcons[fieldName as keyof typeof fieldIcons]}
                          </div>
                          <Input
                            type={
                              fieldName === "password" ? "password" : "text"
                            }
                            placeholder={`Enter your ${fieldLabels[
                              fieldName as keyof typeof fieldLabels
                            ].toLowerCase()}`}
                            className="bg-white/20 border-white/30 pl-10 text-white placeholder:text-white focus-visible:ring-pink-500"
                            {...field}
                          />
                        </div>
                      </FormControl>
                      <FormMessage className="text-pink-200" />
                    </FormItem>
                  )}
                />
              )
            )}

            {/* Resgister Failed */}
            {errorMessage.trim() !== "" && (
              <Alert className="bg-red-500/20 border border-red-500/50">
                <AlertDescription className="text-white">
                  {errorMessage}
                </AlertDescription>
              </Alert>
            )}

            <div className="pt-2">
              <Button
                type="submit"
                className="w-full py-5 text-lg font-medium rounded-xl bg-black hover:scale-105 flex items-center justify-center gap-2"
                disabled={isLoading}
              >
                {isLoading ? (
                  <div className="animate-spin h-5 w-5 border-2 border-white rounded-full border-t-transparent" />
                ) : (
                  <>
                    <span>Create Account</span>
                    <FaArrowRight />
                  </>
                )}
              </Button>
            </div>

            <div className="flex justify-between pt-4 text-sm">
              <Link
                to="/"
                className="text-pink-200 hover:text-white hover:scale-[1.2] flex items-center gap-1"
              >
                <FaArrowLeft size={12} />
                <span>Back to Home</span>
              </Link>

              <Link
                to="/logins"
                className="text-pink-200 hover:scale-[1.2] hover:text-white"
              >
                Already have an account? Login
              </Link>
            </div>
          </form>
        </Form>
      </div>
    </div>
  );
};

export default Register;
