import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { SigninValidationSchema } from "@/lib/validation";
import Loader from "@/components/shared/Loader";
import { Link, useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import { useSignInAccountMutation } from "@/lib/react-query/queriesAndMutations";
import { useUserContext } from "@/context/index";

const SigninForm = () => {
  const {toast} = useToast();
  
  const navigate = useNavigate();

  // We will need the context to check if the user is logged in. We will also need the context to store the user session.
  const {checkAuthUser, isLoading: isUserLoading} = useUserContext();

  // We will need the useSignInAccountMutation hook to sign the user in. Its a hook I created in the queriesAndMutations file.
  const { mutateAsync: signInAccount} = useSignInAccountMutation();

  // 1. Define your form. We first define the schema of the forms which is in the SigninValidationSchema. We then use the useForm hook to create a form instance.
  // Then we pass it into the resolver.
  const form = useForm<z.infer<typeof SigninValidationSchema>>({
    resolver: zodResolver(SigninValidationSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  // 2. Define a submit handler.
  async function onSubmit(values: z.infer<typeof SigninValidationSchema>) {
    // We go ahead and sign the user in. We pass in the email and password.
    const session = await signInAccount({
      email: values.email,
      password: values.password
    });
    // If no session, we return a toast message
    if(!session) {
      return toast ({
        title: "Sign in failed. Please try again",
      })
    }

    // Now we need to store the user session in a context. We need to know at all time that we have a user logged in.

    const isLoggedin = await checkAuthUser();

    if(isLoggedin) {
      form.reset();
      navigate('/');
    } else {
      return toast({
        title: "Sign in failed. Please try again",
      })
    }
  }
  return (
    <Form {...form}>
      <div className="sm:w-420 flex-center flex-col">
        <img src="/assets/images/logo.svg" alt="logo" />

        <h2 className="h3-bold md:h2-bold pt-5 sm:pt-12">
          Log in to your account
        </h2>
        <p className="text-light-3 small-medium md:base-regular mt-2">
          Welcome back! Please enter your details
        </p>

        <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-5 w-full mt-4">
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input type="email" className="shad-input" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <Input type="password" className="shad-input" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit" className="shad-button_primary">
            {
              isUserLoading ? (
                <div className="flex-center gap-2">
                 <Loader />  Loading...
                </div>
              ) : "Sign in"
            }
          </Button>

          <p className="text-small-regular text-light-2 text-center mt-2">
            Don't have an account?
              <Link to="/sign-up" className="text-primary-500 text-small-semibold ml-1">Sign up</Link>
          </p>
        </form>
      </div>
    </Form>
  );
};

export default SigninForm;
