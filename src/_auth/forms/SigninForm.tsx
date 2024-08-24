import { z } from "zod";
import { Button } from "@/components/ui/button";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { signInValidation } from "@/lib/validation";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { useUserContext } from "@/context/AuthContext";
import { useSignInAccount } from "@/lib/react-query/queriesAndMutations";
import Loader from "@/components/shared/Loader";
import { useToast } from "@/components/ui/use-toast";

const SigninForm = () => {
  const navigate = useNavigate();

  const { checkAuthUser, isLoading: isUserLoading } = useUserContext();
  const { mutateAsync: signInAccount, isPending } = useSignInAccount();

  const { toast } = useToast();

  const form = useForm<z.infer<typeof signInValidation>>({
    resolver: zodResolver(signInValidation),
    defaultValues: {
      email: "",

      password: "",
    },
  });

  async function onSubmit(values: z.infer<typeof signInValidation>) {
    const session = await signInAccount({
      email: values.email,
      password: values.password,
    });
    console.log({ session });
    console.log({ values });

    if (!session) {
      return toast({
        title: "Sign in failed, please try again",
      });
    }

    const isLoggedIn = await checkAuthUser();

    if (isLoggedIn) {
      form.reset();
      navigate("/");
    } else {
      return toast({
        title: "Sign In failed, please try again",
      });
    }
  }
  return (
    <>
      <Form {...form}>
        <div className="sm:w-420 flex-center flex-col">
          <img src="/assets/images/logo.svg" alt="logo" className="w-2/3" />

          <h2 className="h3-bold md:h2-bold pt-3 ">
            Login into your Account
          </h2>
          <p className="text-light-3 small-medium md:base-regular mt-2">
            To use Snapgram, please login your details
          </p>

          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="flex flex-col gap-5 w-full mt-4"
          >
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input type="text" className="shad-input" {...field} />
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
              {isPending || isUserLoading ? (
                <div className="flex-center gap-2">
                  <Loader /> Loading...
                </div>
              ) : (
                "Log in"
              )}
            </Button>
            <p className="text-small-regular text-light-2 text-center mt-2">
              Don't have an account?
              <Link
                to="/sign-up"
                className="text-primary-500 text-small-semibold ml-1"
              >
                Sign-up
              </Link>
            </p>
          </form>
        </div>
      </Form>
    </>
  );
};

export default SigninForm;
