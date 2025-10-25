"use client";

import Link from "next/link";
import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { SignUpForm, signUpSchema } from "../../../schema";
import { registerAction } from "./actions";
import { useRouter } from "next/navigation";

const SignUp = () => {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(signUpSchema),
    mode: "onChange",
  });

  const onSubmitForm = async (values: SignUpForm) => {
    const tmp = new FormData();
    tmp.set("name", values.name);
    tmp.set("email", values.email);
    tmp.set("password", values.password);

    const res = await registerAction(tmp);

    if (!res.success) {
      const { fieldErrors, formErrors } = res.errors;

      for (const [k, msgs] of Object.entries(fieldErrors ?? {})) {
        const msg = msgs?.[0];
        if (msg)
          setError(k as keyof SignUpForm, { type: "server", message: msg });
      }

      for (const err in formErrors)
        setError("root", { type: "server", message: err });
    }

    router.push("/dashboard");
  };

  return (
    <div className="min-h-screen bg-base-200 flex items-center justify-center">
      <div className="card w-full max-w-md shadow-xl bg-base-100">
        <form
          className="card-body space-y-4"
          onSubmit={handleSubmit(onSubmitForm)}
        >
          <h2 className="text-2xl font-bold text-center text-primary-content">
            Create an Account
          </h2>
          {errors.root && (
            <p className="text-error text-sm mx-5 mt-2">
              {errors.root?.message}
            </p>
          )}

          <div className="form-control">
            <input
              {...register("name")}
              type="text"
              placeholder="Enter username"
              className="input input-bordered input-neutral text-base-300 mx-10"
              required
            />
            {errors.name && (
              <p className="text-error text-sm mx-5 mt-2">
                {errors.name?.message}
              </p>
            )}
          </div>

          <div className="form-control">
            <input
              {...register("email")}
              type="email"
              placeholder="you@example.com"
              className="input input-bordered input-neutral text-base-300 mx-10"
              required
            />
            {errors.email && (
              <p className="text-error text-sm mx-5 mt-2">
                {errors.email?.message}
              </p>
            )}
          </div>

          <div className="form-control">
            <input
              {...register("password")}
              type="password"
              placeholder="••••••••"
              className="input input-bordered input-neutral text-base-300 mx-10"
              required
            />
            {errors.password && (
              <p className="text-error text-sm mx-5 mt-2">
                {errors.password?.message}
              </p>
            )}
          </div>

          <div className="form-control mt-4 mx-auto">
            <button className="btn btn-primary" type="submit">
              Sign Up
            </button>
          </div>

          <p className="text-center text-sm text-primary-content">
            Already have an account?{" "}
            <Link href="/api/auth/signin" className="link link-primary">
              Sign in
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};
export default SignUp;
