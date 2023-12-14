"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
import Image from "next/image";
import Link from "next/link";
import { BASE_URL } from "@/utils/constants";
axios.defaults.baseURL = BASE_URL;
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import { useBuzzrStore } from "@/store/Buzzr";
import DeleteBuzzrModal from "@/components/DeleteBuzzrModal";

const Container = ({ children }: { children: React.ReactElement }) => {
  return (
    <div className="h-[55vh] w-[45%] min-w-[35%] m-5 rounded-md text-[#444] shadow-lg shadow-[#b086b7]">
      {children}
    </div>
  );
};

const Page = () => {

  interface Buzzr {
    _id: string;
    title: string;
    maxQuestions: number;
    questions: any[];
  }

  const {buzzrs,addBuzzr,setBuzzrs,removeAllBuzzrs} = useBuzzrStore();
  const [loading, setLoading] = useState(false);
  const [contLoading, setContLoading] = useState(true);

  useEffect(() => {
    if(typeof window!=='undefined'){
      const user = JSON.parse(window.localStorage.getItem("user") || "{}");
      axios.get("/api/myquizzes",{
        headers: {
          Authorization: `Bearer ${user.token}`,
          "ngrok-skip-browser-warning":"any",
        },
      }).then((res) => {
        setContLoading(false);
        removeAllBuzzrs();
        console.log(res.data)
        const buzzrs = res.data.data.quizzes;
        setBuzzrs(buzzrs);
      }).catch((err) => {
        if(err.response?.status == 401){
          window.localStorage.removeItem("user");
          router.push("/login");
        }
        setContLoading(false);
        toast.error(`${err.response?.data.message || err.message} `, {
          position: "top-center",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          draggable: true,
          progress: undefined,
        });
        console.log(err);
      });
    }
  },[]);

  const router = useRouter();

  const [formData, setFormData] = useState({
    title: "",
    questions: 0,
  });

  const handleTitleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((formData) => {
      return {
        ...formData,
        [name]: value,
      };
    });
  };

  const handleQuesChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((formData) => {
      return {
        ...formData,
        [name]: Number(value),
      };
    });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    console.log(formData);
    try {
      const user = JSON.parse(window.localStorage.getItem("user") || "{}");
      const res = await axios.post(
        "/api/quiz/create",
        {
          title: formData.title,
          maxQuestions: formData.questions,
        },
        {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        }
      );
      // console.log(res);
      toast.success(`${res.data.message}`, {
        position: "top-center",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        draggable: true,
        progress: undefined,
      });
      setLoading(false);
      addBuzzr(res.data.data.quiz);
    } catch (err: any) {
      console.log(err);
      if (err.response?.status == 401) {
        window.localStorage.removeItem("user");
        router.push("/login");
      }
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

  const handleLinkClick = (id:string) => {
    router.push(`/dashboard/buzzr/${id}`);
  }

  return (
    <>
      <div className="text-3xl font-semibold p-4 w-[100%] text-center">
        Welcome to the Dashboard!
      </div>
      <div className="flex flex-wrap justify-center items-center w-[100%] h-[100%]">
        <Container>
          <>
            <div className="text-3xl font-semibold p-4 w-[100%] text-center">
              Create New Buzzr
            </div>
            <form
              onSubmit={handleSubmit}
              className="flex flex-col text-xl w-[80%] mx-auto [&>*]:mb-4 [&>*]:p-2 [&>*]:rounded-sm"
            >
              <input
                className=""
                required={true}
                type="text"
                placeholder="Title"
                name="title"
                value={formData.title}
                onChange={handleTitleChange}
              />
              <select name="questions" required={true} onChange={handleQuesChange}>
                <option value="" disabled selected>
                  Number of questions
                </option>
                <option value="5">5</option>
                <option value="10">10</option>
                <option value="15">15</option>
                <option value="20">20</option>
              </select>
              <button
                className="bg-[#333] text-white mt-10 flex justify-center items-center h-10"
                disabled={loading}
              >
                {(loading)?
                 <Image
                  src="/spinner.gif"
                  alt="loading"
                  width={25}
                  height={25}
                 />
                :"CREATE"}
              </button>
            </form>
          </>
        </Container>
        <Container>
          <>
          <div className="text-3xl font-semibold p-4 w-[100%] text-center">
            My Buzzrs
          </div>
          {(contLoading)?
          <div className="text-3xl font-semibold p-4 w-[100%] text-center">
            Loading...
          </div>:
          <div className="flex flex-col items-center p-1 [&>*]:w-[95%] h-auto max-h-[75%] overflow-y-scroll">
            {buzzrs.map((buzzr, index) => {
              return (
                <div
                  className="flex justify-start [&>*]:flex [&>*]:items-center gap-4 p-2 text-white text-xl rounded-md py-3 my-1 bg-[#b387ba] hover:bg-[#8f6c95] hover:cursor-pointer"
                  key={index}
                  // href={`/dashboard/buzzr/${buzzr._id}`}
                  onClick={()=>handleLinkClick(buzzr._id)}
                >
                  <div>{buzzr.title}</div>
                  <div>
                    Max Questions: {buzzr.maxQuestions}
                  </div>
                  <div>
                    Questions: {buzzr.questions.length}
                  </div>
                  <div className="ml-auto">
                  <DeleteBuzzrModal id={buzzr._id} />
                  </div>
                </div>
              );
            })}
          </div>}
          </>
        </Container>
      </div>
    </>
  );
};

export default Page;
