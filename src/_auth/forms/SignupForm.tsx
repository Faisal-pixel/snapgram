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
import { SignupValidationSchema } from "@/lib/validation";
import Loader from "@/components/shared/Loader";
import { Link, useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import { useCreateUserAccountMutation, useSignInAccountMutation } from "@/lib/react-query/queriesAndMutations";
import { useUserContext } from "@/context/index";

const SignupForm = () => {
  const {toast} = useToast();
  
  const navigate = useNavigate();

  const {checkAuthUser, isLoading: isUserLoading} = useUserContext();

  // We get to destructure the mutateAsync function which is actually the createUserAccount that we are calling in the useCreateUserAccountMutation.
  // Remember we pass it as a method. You can check it out.
  const { mutateAsync: createUserAccount, isPending: isCreatingUser } = useCreateUserAccountMutation(); // Its a hook from the react-query library that we use to create a new user account. Find it in the queriesAndMutations.ts file
  const { mutateAsync: signInAccount, isPending: isSigningin } = useSignInAccountMutation();

  // 1. Define your form. We first define the schema of the forms which is in the SignUpValidationSchema. We then use the useForm hook to create a form instance.
  // Then we pass it into the resolver.
  const form = useForm<z.infer<typeof SignupValidationSchema>>({
    resolver: zodResolver(SignupValidationSchema),
    defaultValues: {
      name: "",
      username: "",
      email: "",
      password: "",
    },
  });

  // 2. Define a submit handler.
  async function onSubmit(values: z.infer<typeof SignupValidationSchema>) {
    // Once submitted, we want to create the user
    const newUser = await createUserAccount(values);

    if(!newUser) {
      return toast ({
        title: "Sign up failed. Please try again",
      })
    } 
    // After creating a user. We then always want to sign the user into a session
    const session = await signInAccount({
      email: values.email,
      password: values.password
    });

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
          Create a new account
        </h2>
        <p className="text-light-3 small-medium md:base-regular mt-2">
          To use Snapgram, please enter your details
        </p>

        <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-5 w-full mt-4">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Name</FormLabel>
                <FormControl>
                  <Input type="text" className="shad-input" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="username"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Username</FormLabel>
                <FormControl>
                  <Input type="text" className="shad-input" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
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
              isCreatingUser ? (
                <div className="flex-center gap-2">
                 <Loader />  Loading...
                </div>
              ) : "Sign up"
            }
          </Button>

          <p className="text-small-regular text-light-2 text-center mt-2">
            Already have an account?
              <Link to="/sign-in" className="text-primary-500 text-small-semibold ml-1">Log in</Link>
          </p>
        </form>
      </div>
    </Form>
  );
};

export default SignupForm;
