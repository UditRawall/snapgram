import { z } from "zod";
import { Button } from "@/components/ui/button";
import { zodResolver } from "@hookform/resolvers/zod";
import { useToast } from "@/components/ui/use-toast";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";
import { signupValidation } from "@/lib/validation";

import Loader from "@/components/shared/Loader";
import { Link, useNavigate } from "react-router-dom";
import {
  useCreateUserAccount,
  useSignInAccount,
} from "@/lib/react-query/queriesAndMutations";
import { useUserContext } from "@/context/AuthContext";

const SignupForm = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const { checkAuthUser } = useUserContext();
  const { mutateAsync: createUserAccount, isPending: isCreatingUser } =
    useCreateUserAccount();

  const { mutateAsync: signInAccount } = useSignInAccount();
  const form = useForm<z.infer<typeof signupValidation>>({
    resolver: zodResolver(signupValidation),
    defaultValues: {
      username: "",
      name: "",
      email: "",
      password: "",
    },
  });

  async function onSubmit(values: z.infer<typeof signupValidation>) {
    const newUser = await createUserAccount(values);
    // console.log(newUser);
    if (!newUser) {
      return toast({
        title: "Sign up failer, please try again",
      });
    }
    const session = await signInAccount({
      email: values.email,
      password: values.password,
    });

    if (!session) {
      toast({
        title: "Sign in failed, please try again",
      });
      navigate("/sign-in");
      return;
    }

    const isLoggedIn = await checkAuthUser();

    if (isLoggedIn) {
      form.reset();
      navigate("/");
    } else {
      return toast({
        title: "Sign up failed, please try again",
      });
    }
  }

  return (
    <>
      <Form {...form}>
        <div className="sm:w-420 flex-center flex-col sm:px-4">
          <img
            src="/assets/images/logo.svg"
            alt="logo"
            className="w-2/3 sm:pt-12"
          />

          <h2 className="h3-bold md:h2-bold">Create a new account</h2>
          <p className="text-light-3 small-medium md:base-regular mt-2">
            To use Snapgram, please enter your details
          </p>

          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="flex flex-col gap-5 w-full mt-3 "
          >
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
              {isCreatingUser ? (
                <div className="flex-center gap-2">
                  <Loader /> Loading...
                </div>
              ) : (
                "Sign Up"
              )}
            </Button>
            <p className="text-small-regular text-light-2 text-center ">
              Already have an account?
              <Link
                to="/sign-in"
                className="text-primary-500 text-small-semibold ml-1"
              >
                Sign-in
              </Link>
            </p>
          </form>
        </div>
      </Form>
    </>
  );
};

export default SignupForm;
