"use client";

import { useForm, SubmitHandler } from "react-hook-form";
import axios from "axios";
import "./styles.css";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { UserDataValidation } from "@/validations/user";
import { useEffect, useState } from "react";
import { Button } from "../ui/button";
import { LuLoaderPinwheel } from "react-icons/lu";
import { FcGoogle } from "react-icons/fc";
import { signIn } from "next-auth/react";

type UserData = z.infer<typeof UserDataValidation>;

const UserRegisterForm = () => {
  const [isCredentialSign, SetIsCredentialSign] = useState(false);
  const [isGoogleSign, SetIsGoogleSign] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<UserData>({
    resolver: zodResolver(UserDataValidation),
  });

  const onSubmit: SubmitHandler<UserData> = async (data) => {
    SetIsCredentialSign(true);

    try {
      const { name, email, password, image } = data;

      const newUserData = await axios.post(
        process.env.NEXT_PUBLIC_BASE_URL + "/api/user/new",
        {
          name: name,
          email: email,
          password: password,
          image: image,
        },
      );

      if (newUserData.status !== 201) {
        toast.error(newUserData.data.error || "Failed to create user");
        return;
      }

      toast.success("User created successfully");
    } catch (error) {
      if (error instanceof Error) {
        toast.error(error.message || "An error occurred while creating user");
      } else {
        toast.error("An unexpected error occurred");
      }
    } finally {
      SetIsCredentialSign(false);
    }
  };

  const handleGoogleAuth = async () => {
    SetIsGoogleSign(true);

    try {
      signIn("google", {
        callbackUrl: "/dashboard",
      });
    } catch (error) {
      if (error instanceof Error) {
        toast.error(error.message || "An error occurred during Google sign-in");
      } else {
        toast.error("An unexpected error occurred during Google sign-in");
      }
    } finally {
      SetIsGoogleSign(false);
    }
  };

  useEffect(() => {
    if (errors && errors !== undefined && Object.keys(errors).length > 0) {
      console.log(
        "Validation errors on form change:",
        errors[Object.keys(errors)[0] as keyof typeof errors],
      );

      const errorMessage =
        errors[Object.keys(errors)[0] as keyof typeof errors];

      toast.error(errorMessage?.message || "Validation error");
    }
  }, [errors]);

  return (
    <div className="flex flex-col w-full max-w-md mx-auto ">
      <form onSubmit={handleSubmit(onSubmit)} className="w-full h-full">
        <input
          placeholder="Ennter your name"
          {...register("name", { required: true })}
        />
        {errors.name && <span>Name is required</span>}

        <input
          placeholder="Email"
          type="email"
          {...register("email", { required: true })}
        />
        {errors.email && <span>Email is required</span>}

        <input
          placeholder="Password"
          type="password"
          {...register("password", { required: true })}
        />
        {errors.password && <span>Password is required</span>}

        <input
          placeholder="Enter your image URL"
          accept="image/*"
          {...register("image")}
        />

        <Button
          type="submit"
          disabled={isCredentialSign}
          className="w-full h-full"
        >
          {isCredentialSign ? (
            <>
              <LuLoaderPinwheel className="mr-2 h-4 w-4 animate-spin" />
              Creating Account...
            </>
          ) : (
            "Register"
          )}
        </Button>
      </form>
      <div className="space-y-3">
        <Button
          onClick={handleGoogleAuth}
          variant="secondary"
          className="w-full h-full flex items-center justify-center"
          disabled={isGoogleSign}
        >
          <FcGoogle className="mr-2 h-5 w-5" />
          {isGoogleSign && (
            <LuLoaderPinwheel className="mr-2 h-4 w-4 animate-spin" />
          )}
          Continue with Google
        </Button>
      </div>
    </div>
  );
};

export default UserRegisterForm;
