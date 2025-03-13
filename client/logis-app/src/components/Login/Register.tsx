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
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useState } from "react";


const Register: React.FC = () => {
    const navigate = useNavigate();
    const [errorMessage, setErrorMessage] = useState("");

    // Validation Schema
    const formSchema = z.object({
        name: z.string().min(2, "Name must be at least 2 characters"),
        userPhone: z.string().min(10, "Phone number must be at least 10 digits"),
        username: z.string().min(2, "Username must be at least 2 characters"),
        password: z.string()
            .min(6, { message: "Password must be at least 6 characters." })
            .regex(/[A-Z]/, { message: "Must contain at least one uppercase letter." })
            .regex(/[a-z]/, { message: "Must contain at least one lowercase letter." })
            .regex(/[0-9]/, { message: "Must contain at least one number." })
            .regex(/[^A-Za-z0-9]/, { message: "Must contain at least one special character." }),
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

    const onSubmit = async (values: any) => {
        try {
            const response = await axios.post("http://localhost:8080/logins/register", values);
            console.log(response.data);
            if (response.data.code === 0) {
                setErrorMessage(response.data.msg);
            } else if (response.data.msg === 'success' && response.data.data === true) {
                console.log("Registration successful");
                navigate('/logins');
            }

        } catch (error: any) {
            console.log("Registration failed", error);
            const message = error.response?.data?.msg || "Registration failed. Try again.";
            console.log(message);
            setErrorMessage(message);
        } finally {

            console.log("Please Try Again");
        }

    }


    return (
        <div className="flex flex-col justify-center items-center bg-primary min-h-screen text-black px-4">
            <div className="border-6 bg-white p-4 w-full max-w-3xl">

            <div className="text-center text-bold text-2xl">
                            <p>REGISTER</p>
                </div>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-y-4">
                        {['name', 'userPhone', 'username', 'email', 'password'].map((field) => (
                            <FormField
                                key={field}
                                control={form.control}
                                name={field as any}
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>{field.name.charAt(0).toUpperCase() + field.name.slice(1)}</FormLabel>
                                        <FormControl>
                                            <Input
                                                type={field.name === 'password' ? 'password' : 'text'}
                                                placeholder={`Enter your ${field.name}`}
                                                {...field}
                                                className="ml-3"
                                            />
                                        </FormControl>
                                        <FormMessage>{form.formState.errors[field.name as keyof typeof form.formState.errors]?.message}</FormMessage>
                                    </FormItem>
                                )}
                            />
                        ))}


                        {errorMessage.trim() !== "" && (
                            <div className="text-red-500 text-center mb-4">
                                <p>{errorMessage}</p>
                            </div>
                        )}


                        <div className="flex justify-center mt-2">
                            <Button type="submit" className="flex justify-center items-center p-2 bg-blue-500 text-white rounded">
                                Submit
                            </Button>
                        </div>

                    </form>
                </Form>
            </div>
        </div>
    );
};

export default Register;