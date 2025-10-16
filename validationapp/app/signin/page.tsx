"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import React from "react";
import { useForm } from "react-hook-form";
import { SignInForm, signInSchema } from "../schema";
import Link from "next/link";

const SignIn = () => {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(signInSchema),
    mode: "onChange",
  });

  async function onSubmitLogin(data: SignInForm) {
    const res = await signIn("credentials", {
      email: data.email,
      password: data.password,
      redirect: false,
    });

    if (res?.error) {
      console.log(res.error);
      setError("root", {
        type: "server",
        message: "Invalid email or password.",
      });
      return;
    }

    router.push("/dashboard");
  }

  return (
    <div className="min-h-screen bg-base-200 flex items-center justify-center">
      <div className="card w-full max-w-md shadow-xl bg-base-100">
        <form
          className="card-body space-y-4"
          onSubmit={handleSubmit(onSubmitLogin)}
        >
          <h2 className="text-2xl font-bold text-center">
            Sign into an existing Account
          </h2>

          {errors.root && (
            <p className="text-error text-sm mx-5 mt-2">
              {errors.root?.message}
            </p>
          )}

          <div className="form-control">
            <input
              {...register("email", { required: "This field is required" })}
              type="email"
              placeholder="you@example.com"
              className="input input-bordered mx-10"
              required
            />
          </div>

          <div className="form-control">
            <input
              {...register("password", { required: "This field is required" })}
              type="password"
              placeholder="••••••••"
              className="input input-bordered mx-10"
              required
            />
          </div>

          <div className="form-control mt-4 mx-auto">
            <button className="btn btn-primary" type="submit">
              Sign in
            </button>
          </div>

          <p className="text-center text-sm">
            Dont have an account?{" "}
            <Link href="/register" className="link link-primary">
              Sign up
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default SignIn;
