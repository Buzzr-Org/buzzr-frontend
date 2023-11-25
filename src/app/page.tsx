"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import { BASE_URL } from "@/utils/constants";
axios.defaults.baseURL = BASE_URL;

export default function Home() {
  const router = useRouter();
  useEffect(() => {
    const User = JSON.parse(window.localStorage.getItem("user") || "{}");
    if (User.token) {
      const token = User.token;
      axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
      axios
        .get("/api/checkValidToken")
        .then((res) => {
          console.log(res);
          if (res.data.success) {
            router.push("/dashboard");
          } else {
            window.localStorage.removeItem("user");
            router.push("/login");
          }
        })
        .catch((err) => {
          console.log(err);
          window.localStorage.removeItem("user");
          router.push("/login");
        });
    } else {
      router.push("/login");
    }
  }, []);
  return (
    <div className="bg-[#222] text-[#ccc] font-semibold text-3xl h-[100vh] flex flex-col justify-center items-center">
      Buzzr
    </div>
  );
}
