import * as z from "zod";

// Here we will be defining several form schemas. A form schema is basically the structure or schematics of the data that we expect 
// to receive from a form. This is useful for type-checking and validation.

export const SignupValidationSchema = z.object({
    name: z.string().min(2, {message: "Name is too short"}), // The name field must be a string and must be at least 2 characters long. The min method collect a second parameter that carries the error message.
    username: z.string().min(2, {
      message: "Username must be at least 2 characters.",
    }),
    email: z.string().email({ message: "Invalid email address." }),
    password: z.string().min(8, { message: "Password must be at least 8 characters." }),
});

export const SigninValidationSchema = z.object({
    email: z.string().email({ message: "Invalid email address." }),
    password: z.string().min(8, { message: "Password must be at least 8 characters." }),
});