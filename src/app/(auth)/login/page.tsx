"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { BASE_URL } from "@/utils/constants";
import axios from "axios";
axios.defaults.baseURL = BASE_URL;

export default function Home() {
  const router = useRouter();
  useEffect(() => {
    const User = JSON.parse(window.localStorage.getItem("user") || "{}");
    if (User.token) {
      router.push("/dashboard");
    }
  }, []);

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    const { email, password } = formData;

    try {
      const res = await axios.post("/api/login", {
        email,
        password,
      });
      const user = res.data.data.user;
      window.localStorage.setItem(
        "user",
        JSON.stringify({
          name: user.name,
          email: user.email,
          token: res.data.data.token,
        })
      );
      setLoading(false);
      router.push("/dashboard");
    } catch (err: any) {
      toast.error(`${err.response?.data.message || err.message} `, {
        position: "top-center",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      setLoading(false);
    }
  };

  return (
    <>
      <form
        className="bg-[#eee] text-xl flex flex-col w-[65%] md:w-[35%] [&>input]:my-3 items-center p-[2rem] border rounded-lg"
        onSubmit={handleSubmit}
      >
        SIGN IN
        <input
          className="w-full py-1 px-2 border rounded-md"
          type="email"
          name="email"
          required={true}
          placeholder="email"
          value={formData.email}
          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
        />
        <input
          className="w-full py-1 px-2 border rounded-md"
          type="password"
          name="password"
          required={true}
          placeholder="password"
          value={formData.password}
          onChange={(e) =>
            setFormData({ ...formData, password: e.target.value })
          }
        />
        <button
          className="py-1 w-full h-10 my-4 rounded-md bg-[#222] text-[#eee] flex justify-center items-center"
          type="submit"
          disabled={loading}
        >
          {(loading)?
            <Image
            src="/spinner.gif"
            alt="loading"
            width={25}
            height={25}
            />
            :"LOGIN"
          }
        </button>
        <div>
          New User?{" "}
          <Link className="text-[#6c6cd1] hover:text-[#444] mt-2" href="/signup">
            Sign Up
          </Link>
        </div>
      </form>
    </>
  );
}
