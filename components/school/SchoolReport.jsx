
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useState } from "react";

const Report = ({ object, setReport }) => {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [form, setForm] = useState(false);
  const [jsonData, setJsonData] = useState({ message: "" });
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const toggleReport = () => {
    if (status === "loading") {
      return;
    }
    if (!session) {
      router.push("/prisijungti");
      return;
    }
    setForm(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (jsonData.message.trim() === "") {
      setError("Prašome užpildyti lauką");
      return;
    }

    setError(null);
    setLoading(true);
    const reportData = {
      ...jsonData,
      school: object?.n,
      user: session?.user?.email,
    }
    try {
        const res = await fetch('/api/report/schools', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(reportData),
        })
    } catch (error) {
        console.log('error', error)
    } finally {
        setReport(false);
        setLoading(false)
    }
  }
  const handleChange = (e) => {
    setJsonData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="mx-auto w-full max-w-screen-md bg-white border rounded-lg p-8 space-y-6 font-title mt-4"
    >
      <h3>Praneškite apie klaidingą informaciją</h3>
      <div className="space-y-4">
        <textarea
          name="message"
          onChange={handleChange}
          className="w-full h-48 rounded-md focus:border-primary border border-md resize-none outline-none px-3 py-2"
          placeholder="Jūsų žinutė..."
        ></textarea>
        {error && <p className="text-sm text-red-600">{error}</p>}
      </div>

      <button
        type="submit"
        disabled={loading}
        className="btn btn-outline btn-primary w-full py-2 rounded-lg"
      >
        {loading ? "Kraunama..." : "Siųsti"}
      </button>
    </form>
  );
};

export default Report