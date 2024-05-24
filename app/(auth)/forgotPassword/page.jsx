"use client";

import { useForm } from "react-hook-form";
import validator from "validator";
import { Helmet } from "react-helmet";
import { useRouter } from "next/navigation";
import Toastify from "@lib/Toastify";
import Loading from "@containers/Loading";
import Link from "next/link";
import sendNewPasswordLink from "@api/mutation/sendNewPasswordLink";

const ForgotPasswordPage = () => {
  const router = useRouter();
  const { ToastContainer, showSuccessMessage, showErrorMessage } = Toastify();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    defaultValues: {
      email: "",
    },
  });

  const onSubmit = async (data) => {
    const { email } = data;
    try {
      await sendNewPasswordLink(email);
      showSuccessMessage({ message: "Successfully Sent OTP to your Email ID" });
      setTimeout(() => {
        router.push("/login");
      }, 5000);
    } catch (error) {
      showErrorMessage({
        message: "Something went wrong. Try later...",
      });
    }
  };

  return (
    <>
      <Helmet>
        <title>Forgot Password</title>
        <meta name="discription" content="Send reset password link" />
      </Helmet>
      <section className="w-full h-screen flex flex-col justify-center items-center bg-white text-black">
        <form
          className="h-[600px] w-[600px] border flex flex-col justify-center  gap-4 px-8 rounded-xl shadow-xl"
          onSubmit={handleSubmit(onSubmit)}
        >
          <p className="text-xl font-bold tracking-wide text-center mb-6">
            Forgot Password
          </p>
          <div className="w-full  rounded-xl">
            <div className="w-full h-12 rounded-xl border border-color_3 text-color_1">
              <input
                {...register("email", {
                  required: "Email is required",
                  validate: (value) => {
                    return (
                      validator.isEmail(value) ||
                      "Please provide a valid email."
                    );
                  },
                })}
                placeholder="Type your email "
                className="w-full h-full px-4 rounded-xl"
                autoComplete="off"
                spellCheck="false"
              />
            </div>

            <p
              role="alert"
              className="w-full h-4 mt-1 ml-2 text-red-200 text-xs "
            >
              {errors.email?.message}
            </p>
          </div>
          <div>
            <div className="w-full h-12 bg-color_1 border border-color_3 flex justify-center items-center rounded-xl bg-purple-300 font-semibold text-lg tracking-wide cursor-pointer  text-color_1">
              {isSubmitting ? (
                <Loading hScreen={false} small={true} />
              ) : (
                <input type="submit" className="w-full h-full cursor-pointer" />
              )}
            </div>
            <div className="flex justify-between px-6 mt-1">
              <p className="underline">
                <Link href={`/login`}>Login</Link>
              </p>
              <p className="underline">
                <Link href={`/signup`}>SignUp</Link>
              </p>
            </div>
          </div>
          <p className="text-xs mt-10">
            A <strong>link</strong> will be send to your email to create new
            password and then you can login with your new password.
          </p>
        </form>
      </section>
      <ToastContainer />
    </>
  );
};

export default ForgotPasswordPage;
