import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button"
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";

const Login: React.FC = () => {

    const navigate = useNavigate();

    //Validation Schema
    const formSchema = z.object({
        username: z.string().min(2, "Must be at least 2 characters"),
        password: z.string()
            .min(6, { message: "Password must be at least 6 characters." })
            .regex(/[A-Z]/, { message: "Must contain at least one uppercase letter." })
            .regex(/[a-z]/, { message: "Must contain at least one lowercase letter." })
            .regex(/[0-9]/, { message: "Must contain at least one number." })
            .regex(/[^A-Za-z0-9]/, { message: "Must contain at least one special character." }),
    });


    const [loginFailed, setLoginFailed] = useState(false);
    const [ errorMessage, setErrorMessage] = useState("");


    const form = useForm({
        resolver: zodResolver(formSchema),
        defaultValues: {
            username: "",
            password: "",
        },
    });


    const onSubmit = async (values: z.infer<typeof formSchema>) => {

        try {
            const response = await axios.post("http://localhost:8080/logins", {
                username: values.username,
                password: values.password,
            });


            if (response.data.msg === 'success' && response.data.code === 1) {
                console.log("Login successful:");
                localStorage.setItem("userId", response.data.data);
                setLoginFailed(false);
                navigate('/products')
            } else {
                setLoginFailed(true);
                setErrorMessage("Invalid username or password.");
            }
        } catch (error) {
            console.log("Catch error", error);
            setLoginFailed(true);
        } finally {

        }
    };




    return (
        <>
            <div className="flex flex-col justify-center items-center bg-primary min-h-screen text-black">
                <div className="border-6 bg-white p-10 shadow-lg rounded-lg">
                    {/* ..form = get all prop of form and pass in between <FOrm></FOrm> */}
                    <Form {...form}>
                        {/* this handlesubmit will validate the schema first before submit */}
                        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                            <FormField
                                control={form.control}
                                name="username"
                                render={({ field }) => (

                                    <FormItem>


                                        <div className="flex justify-center mb-4">
                                            <p className="text-3xl font-bold">LOGIN</p>
                                        </div>

                                        {/* Username Field */}
                                        <div className="space-y-5">
                                            <FormLabel>Username</FormLabel>
                                            <FormControl>
                                                <Input
                                                    type="text"
                                                    placeholder="Please enter your name"
                                                    {...field} 
                                                    className="ml-3"
                                                />
                                            </FormControl>
                                            <FormMessage>{form.formState.errors.username?.message}</FormMessage>
                                            <FormDescription>

                                            </FormDescription>
                                        </div>

                                    </FormItem>
                                )}
                            />

                            <FormField
                                control={form.control}
                                name="password"
                                render={({ field }) => (
                                    <FormItem>
                                        <div className="space-y-6">
                                            <FormLabel>Password</FormLabel>
                                            <FormControl>
                                                <Input
                                                    type="password"
                                                    placeholder="Please enter your password"
                                                    {...field} 
                                                    className="ml-3"
                                                />
                                            </FormControl>

                                            <FormDescription>

                                            </FormDescription>
                                            <FormMessage>{form.formState.errors.password?.message}</FormMessage>

                                        </div>

                                        {loginFailed && (
                                            <div className="text-red-500 text-center mb-4">
                                                <p>{errorMessage}</p>
                                            </div>
                                        )}

                                        <div className="flex justify-center mt-2">
                                            <Button type="submit" className="flex justify-center items-center p-2 bg-blue-500 text-white rounded">
                                                Submit
                                            </Button>
                                        </div>

                                        <div className="text-center mt-4">
                                            <p>
                                                Don't have an account?{" "}
                                                <Link to="/register" className="text-blue-500 hover:underline">
                                                    Click here
                                                </Link>
                                            </p>
                                        </div>

                                    </FormItem>
                                )}
                            />

                        </form>
                    </Form>
                </div>
            </div>
        </>
    )
};

export default Login;
