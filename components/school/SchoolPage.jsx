"use client";
import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import TeacherCase from "@/components/teacher/TeacherCase";
import StarRating from "@/components/UI/StarRating";
import SearchBar from "@/components/UI/SearchBar";
import FilterParameter from "../FilterParameter";
import TeacherForm from "@/components/teacher/TeacherForm";
import TinderCard, { Modal } from "@/components/teacher/TinderCard";
import { useRouter, useSearchParams } from "next/navigation";
import Report from "@/components/school/SchoolReport";
import LoginRegister from "@/components/UI/LoginRegister";
import LoadingSpinner from "../UI/LoadingSpinner";
import { Verified } from "lucide-react";
const decodeSub = (str) => {
  const stringMap = {
    biologija: "Biologija",
    chemija: "Chemija",
    daile: "Dailė",
    ekonomika: "Ekonomika",
    fizika: "Fizika",
    geografija: "Geografija",
    informacinestechnologijos: "Informacinės technologijos",
    istorija: "Istorija",
    fizinisugdymaskunokultura: "Fizinis ugdymas (kūno kultūra)",
    lietuviukalbairliteratura: "Lietuvių kalba ir literatūra",
    matematika: "Matematika",
    muzika: "Muzika",
    technologijos: "Technologijos",
    anglu: "Anglų",
    prancuzu: "Prancūzų",
    rusu: "Rusų",
    vokieciu: "Vokiečių",
  };
  return stringMap[str] || str;
};
const checkIfReported = async (object, session) => {
  const response = await fetch(
    `/api/report/schools/check?school=${object.url}&user=${session.user.email}`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
  if (!response.ok) {
    return false;
  }
  const data = await response.json();

  if (data.exists) {
    return true;
  } else {
    return false;
  }
};
const SchoolPage = ({ School }) => {
  const { data: session, status } = useSession();
  const [openFastRating, setOpenFastRating] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  const [showReport, setShowReport] = useState(false);
  const searchParams = useSearchParams();
  const queries = Object.fromEntries(searchParams.entries());
  const [loading, setLoading] = useState(true);
  const [teachers, setTeachers] = useState([]);
  const [form, setForm] = useState(false);
  const [report, setReport] = useState(false);
  const [schoolRating, setSchoolRating] = useState(0);
  const [active, setActive] = useState(false);
  const [filter, setFilter] = useState(decodeSub(queries["dalykas"]));
  const [search, setSearch] = useState("");
  const [filteredData, setFilteredData] = useState();
  const [login, setLogin] = useState(false);
  const router = useRouter()
  const subjects = [
    "Biologija",
    "Chemija",
    "Dailė",
    "Ekonomika",
    "Fizika",
    "Geografija",
    "Informacinės technologijos",
    "Istorija",
    "Fizinis ugdymas (kūno kultūra)",
    "Lietuvių kalba ir literatūra",
    "Matematika",
    "Muzika",
    "Technologijos",
    "Anglų",
    "Prancūzų",
    "Rusų",
    "Vokiečių",
  ];
  const handleForm = () => {
    if (status !== "authenticated") {
      setLogin(true);
      return;
    }
    setForm(true);
  };
  const handleBack = () => {
    router.push("/perziureti-mokyklas");
  };
  const handleFastRating = () => {
    if (!session) {
      setLogin(true);
      return;
    }
    setOpenModal(true);
  };

  const handleProceedToRate = () => {
    setOpenModal(false)
    setOpenFastRating(true)
  }
  useEffect(() => {
    async function getTeachers() {
      setLoading(true);
      const scrollY = window.scrollY || window.pageYOffset;
      try {
        const response = await fetch(
          `/api/teachers/view?school=${School._id}&dalykas=${queries["dalykas"]}`,
          { next: { revalidate: 100 } }
        );
        if (!response.ok) throw new Error("Failed to fetch teachers");

        const obj = await response.json();
        setTeachers(obj.data);
      } catch (error) {
        console.log("Error fetching teachers:", error);
      } finally {
        setLoading(false);
        window.scrollTo(0, scrollY);
      }
    }

    getTeachers();
    setSchoolRating(School.rating);
  }, [School]);
  useEffect(() => {
    setFilteredData(
      teachers.filter((teacher) =>
        `${teacher.name.toLowerCase()} ${teacher.surname.toLowerCase()}`.includes(
          search.toLowerCase()
        )
      )
    );
  }, [search, teachers]);
  useEffect(() => {
    if (status === "loading") {
      return;
    }
    if (!session) {
      setShowReport(true);
      return;
    }
    setShowReport(true);
  }, [session, School]);
  const handleReport = () => {
    if (status === "loading") {
      return;
    }
    if (!session) {
      setLogin(true);
      return;
    }
    setReport(true);
  };
  if (report) {
    return (
      <>
        <main className="bsm:mt-10 w-auto flex flex-col pb-8">
          <div className="flex gap-5 bsm:items-center flex-wrap flex-col bsm:flex-row bsm:px-6 sm:px-10">
            <div className="h-54 w-full bsm:w-auto overflow-hidden relative bsm:border-b-0 bsm:h-20">
              {School.status !== "pending" && (
                <img
                  src={School.imgUrl}
                  className="h-64 w-full bsm:h-20 bsm:w-20 bsm:opacity-100 object-cover bsm:rounded-lg bsm:border-2 md:border-2"
                />
              )}
              {School.status === "pending" && (
                <div className="h-20 bsm:h-20 bsm:rounded-lg bsm:border-2 md:border-2 bsm:w-20 bg-gray-100 flex items-center bsm:text-xs pl-1 justify-center"></div>
              )}
              <div className="bsm:hidden absolute bottom-0 left-0 w-full h-[70%] bg-gradient-to-t from-white/100 to-transparent"></div>
            </div>
            <div className="flex flex-col z-10 px-6 bsm:px-0">
              <h1 className="font-title text-xl font-medium md:text-3xl">
                {School.name}
              </h1>
              <div className="flex gap-2 mt-2">
                <StarRating r={schoolRating} size="xl" />
                <div className="relative group cursor-pointer">
                  <Verified
                    size={36}
                    fill="white"
                    stroke={School.status === "ok" ? "#009dff" : "#6b7280"}
                  />
                  <div
                    className="absolute bottom-full mb-1 left-1/2 -translate-x-1/2 whitespace-nowrap 
                              bg-black text-white text-sm px-2 py-1 rounded opacity-0 group-hover:opacity-100 
                              transition-opacity duration-200 pointer-events-none z-10"
                  >
                    {School.status === "ok" ? "Patvirtinta" : "Nepatvirtinta"}
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-3 w-full z-10 flex justify-between relative px-6 sm:px-10">
            <button
              onClick={() => setReport(false)}
              className="flex items-center gap-2 border px-4 py-2 text-sm rounded-md  transition-colors"
            >
              Grįžti atgal
            </button>
          </div>

          <div className="border mt-7"></div>
          <div className="px-6 sm:px-10 mb-8">
            <Report object={School} setReport={setReport} />
          </div>
        </main>
      </>
    );
  }
  if (openFastRating) {
    return (
      <main
        className="absolute z-[20] h-screen inset-0 bg-black"
        id="main-root-for-modal"
      >
        <TinderCard teachers={teachers} onClose={() => setOpenFastRating(false)}/>
      </main>
    );
  }
  return (
    <section className="pb-8">
      {openModal && <Modal onClose={handleProceedToRate}/>}
      {login && <LoginRegister setLogin={setLogin} login={login} />}
      <button
        onClick={handleBack}
        className="flex fixed top-16 bg-white z-[15] h-10 w-32 border p-2 bsm:hidden items-center gap-2 text-gray-700 hover:text-black transition-all duration-300  group"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="currentColor"
          className="w-6 h-6 group-hover:-translate-x-1 transition-transform duration-300"
        >
          <path
            fillRule="evenodd"
            d="M15.707 4.293a1 1 0 010 1.414L10.414 11H20a1 1 0 110 2h-9.586l5.293 5.293a1 1 0 11-1.414 1.414l-7-7a1 1 0 010-1.414l7-7a1 1 0 011.414 0z"
            clipRule="evenodd"
          />
        </svg>
        <span className="font-medium">Atgal</span>
      </button>
      <main className="bsm:mt-10 w-auto flex flex-col">
        <div className="flex gap-5 bsm:items-center flex-wrap flex-col bsm:flex-row bsm:px-6 sm:px-10">
          <div className="h-54 w-full bsm:w-auto overflow-hidden relative bsm:border-b-0 bsm:h-20">
            {School.status !== "pending" && (
              <img
                src={School.imgUrl}
                className="h-64 w-full bsm:h-20 bsm:w-20 bsm:opacity-100 object-cover bsm:rounded-lg bsm:border-2 md:border-2"
              />
            )}
            {School.status === "pending" && (
              <div className="h-20 bsm:h-20 bsm:rounded-lg bsm:border-2 md:border-2 bsm:w-20 bg-gray-100 flex items-center bsm:text-xs pl-1 justify-center"></div>
            )}
            <div className="bsm:hidden absolute bottom-0 left-0 w-full h-[70%] bg-gradient-to-t from-white/100 to-transparent"></div>
          </div>
          <div className="flex flex-col z-10 px-6 bsm:px-0">
            <h1 className="font-title text-xl font-medium md:text-3xl">
              {School.name}
            </h1>
            <div className="flex gap-2 mt-2">
              <StarRating r={schoolRating} size="xl" />
              <div className="relative group cursor-pointer">
                <Verified
                  size={36}
                  fill="white"
                  stroke={School.status === "ok" ? "#009dff" : "#6b7280"}
                />
                <div
                  className="absolute bottom-full mb-1 left-1/2 -translate-x-1/2 whitespace-nowrap 
                              bg-black text-white text-sm px-2 py-1 rounded opacity-0 group-hover:opacity-100 
                              transition-opacity duration-200 pointer-events-none z-10"
                >
                  {School.status === "ok" ? "Patvirtinta" : "Nepatvirtinta"}
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="mt-3 w-full z-10 flex justify-between relative px-6 sm:px-10 flex-wrap gap-3">
          <div className="flex flex-col gap-y-3">
            <button
              onClick={() => handleForm()}
              className="w-auto px-4 py-2 border rounded-lg border-primary transition-colors text-primary font-medium hover:text-black text-sm hover:bg-primary"
            >
              Pridėti {School.type === "Gimnazija" ? "mokytoją" : "dėstytoją"}
            </button>
            {/*fast rating(teacherss) */}
            {/* <button
              onClick={handleFastRating}
              className="md:hidden w-auto px-5 py-2 border rounded-lg border-primary bg-gradient-to-r from-primary to-violet-200 text-white text-sm hover:scale-[1.01] transition-transform shadow-lg"
            >
              Greitai įvertinti mokytojus
            </button> */}
          </div>

          {showReport === true && (
            <button
              onClick={() => handleReport()}
              className="flex text-sm h-fit items-center gap-2 border px-2 py-2 border-red-400 text-red-400 rounded-md hover:bg-red-400 hover:text-white transition-colors"
            >
              Pranešti
              <img
                src="/images/flag-country-svgrepo-com.svg"
                className="w-6 h-6"
                alt=""
              />
            </button>
          )}
        </div>

        <div className="border mt-6"></div>
      </main>

      {form === false ? (
        <div>
          <div className="px-6">
            <SearchBar
              setSearch={setSearch}
              parameter={`${
                School.type === "Gimnazija"
                  ? "Ieškokite mokytojo"
                  : "Ieškokite dėstytojo"
              }`}
            />
            {School.type === "Gimnazija" && (
              <div className="lg:max-w-screen-lg pl-6 pr-4 m-auto">
                <FilterParameter
                  type={"Dalykas"}
                  parameters={subjects}
                  active={active}
                  setActive={setActive}
                  filter={filter || decodeSub(queries["dalykas"])}
                  setFilter={setFilter}
                />
              </div>
            )}
          </div>
          <div>
            {loading ? (
              <div className="p-10 w-full flex justify-center items-center">
                <LoadingSpinner />
              </div>
            ) : teachers.length > 0 ? (
              <>
                <div className="w-full mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 px-10 justify-items-center mb-6">
                  {filteredData.map((teacher, index) => (
                    <TeacherCase key={index} teacher={teacher} />
                  ))}
                </div>
                <div className="pt-4 pb-8 m-auto px-10">
                  <p className="w-full text-wrap">
                    Nematote savo mokytojo?{" "}
                    <span
                      onClick={() => handleForm()}
                      className="hover:cursor-pointer hover:underline text-primary"
                    >
                      Pridėti
                    </span>
                  </p>
                </div>
              </>
            ) : (
              <div className="p-10 w-full flex justify-center items-center flex-col">
                <div>
                  {School.type === "Gimnazija" ? "Mokytojų" : "Dėstytojų"}{" "}
                  nerasta.
                </div>

                <div className="w-full px-2 py-8">
                  <p>
                    Nematote savo{" "}
                    {School.type === "Gimnazija" ? "mokytojo" : "dėstytojo"} ?{" "}
                    <span
                      onClick={() => handleForm()}
                      className="hover:cursor-pointer hover:underline text-primary"
                    >
                      Pridėti
                    </span>
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
      ) : (
        <div className="px-8 mb-8 py-2">
          <TeacherForm School={School} />
          <div className="max-w-lg m-auto">
            <button
              className="w-auto px-4 py-2 mb-2 border-gray-300 border rounded-md text-gray-700"
              onClick={() => setForm(false)}
            >
              Grįžti atgal
            </button>
          </div>
        </div>
      )}
    </section>
  );
};

export default SchoolPage;
