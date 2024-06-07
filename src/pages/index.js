import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

export default function Home() {
  const router = useRouter();
  const [showData, setShowData] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [name, setName] = useState("");
  const [website, setWebsite] = useState("");
  const [komentar, setKomentar] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false); 

  useEffect(() => {
    fetchData(); // Fungsi untuk memuat data komentar saat pertama kali komponen dimuat
  }, []);

  const fetchData = () => {
    fetch("/api/getData")
      .then((res) => res.json())
      .then((data) => {
        // Urutkan data komentar berdasarkan waktu atau tanggal (diasumsikan menggunakan properti 'createdAt')
        const sortedData = data.data.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
        setShowData(sortedData);
      });
  };

  const handleSubmit = async () => {
    try {
      setIsSubmitting(true);
  
      // Validasi input
      if (!name.trim() || !komentar.trim()) {
        throw new Error('Nama dan komentar harus diisi');
      }
  
      const response = await fetch("/api/insertData", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name, website, komentar }),
      });
  
      if (!response.ok) {
        throw new Error("Gagal menambahkan komentar");
      }
  
      setName("");
      setKomentar("");
      setShowModal(false);
  
      // Setelah mengirim komentar, muat ulang data komentar tanpa memuat ulang halaman
      fetchData();
  
      alert("Komentar ditambahkan");
    } catch (error) {
      console.error("Error:", error.message);
      alert(error.message);
    } finally {
      setIsSubmitting(false);
    }
  };
  

  return (
    <div className="w-11/12 m-auto my-10 p-4 rounded-lg border-2 border-black">
      <div className="flex items-center justify-between">
        <h1 className="p-3 font-bold text-xl">HubPro</h1>
        <h1 className="p-3 font-serif">Versi 0.0.1</h1>
      </div>
      <div className="mt-4 mb-8">
        <p>
          Kalimat disini
        </p>
      </div>
      {showData.length === 0 && <p>Belum ada komentar</p>}
      <p className="mt-2 mb-1">Komentar</p>
      {showData.length > 0 && (
        <div className="max-h-96 overflow-y-auto">
          {showData.map((data, index) => (
            <div
              key={index}
              className="bg-slate-100 my-3 p-3 rounded-lg flex flex-col gap-4 w-[99%] m-auto"
            >
              <div className="flex flex-col">
                <p className="font-semibold text-lg">{data.name}</p>
                <Link href={data.website} target="blank" className="text-sm font-medium">
                  {data.website}
                </Link>
              </div>
              <p>{data.komentar}</p>
            </div>
          )).reverse()} {/* Reverse data untuk menampilkan komentar terbaru di atas */}
        </div>
      )}
      <div className="mt-5">
        <button
          onClick={() => setShowModal(true)}
          className="border-2 border-black px-4 py-3 rounded-full w-full"
        >
          Tambahkan Komentar
        </button>

        {showModal && (
          <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-black bg-opacity-50">
            <div className="bg-white p-6 rounded-lg w-10/12">
              <h2 className="text-lg font-semibold mb-4">Tambahkan Komentar</h2>
              <input
                type="text"
                placeholder="Nama"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="border border-gray-300 rounded-lg px-3 py-2 mb-3 w-full"
              />
              <input
                type="text"
                placeholder="Website"
                value={website}
                onChange={(e) => setWebsite(e.target.value)}
                className="border border-gray-300 rounded-lg px-3 py-2 mb-3 w-full"
              />
              <textarea
                placeholder="Komentar"
                value={komentar}
                onChange={(e) => setKomentar(e.target.value)}
                className="border border-gray-300 rounded-lg px-3 py-2 mb-3 w-full resize-none"
              />
              <div className="flex justify-between">
                <button
                  onClick={() => setShowModal(false)}
                  className="border border-gray-300 rounded-lg px-4 py-2 mr-2"
                >
                  Tutup
                </button>
                <button
                  onClick={handleSubmit}
                  className="border border-black rounded-lg px-4 py-2 bg-black text-white"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? "Loading..." : "Kirim"}
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
