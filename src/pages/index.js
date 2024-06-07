import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import 'animate.css';

export default function Home() {
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
    <div className="w-11/12 m-auto my-10 p-4 rounded-lg border-2 border-black shadow-2xl shadow-slate-700 animate__animated animate__fadeIn">
      <div className="flex items-center justify-between">
        <h1 className="p-3 font-bold text-xl">HubPro</h1>
        <h1 className="p-3 font-serif">Versi 0.0.1</h1>
      </div>
      <div className="mt-4 mb-8">
        <p className="indent-5 text-justify mb-5">
          Hai, HubProvers! Saya <span className="font-semibold">Raihan Regita Harjuno</span> sebagai <span className="font-semibold">Founder HubPro</span>, Kami ingin menyampaikan penghargaan kami atas kepercayaan Anda sebagai pengguna setia HubPro. Kami sadar bahwa Anda memiliki pilihan, dan kami berjanji untuk terus memberikan layanan terbaik yang kami bisa. Bagian penting dari misi kami adalah mendengarkan dengan cermat kebutuhan, keinginan, dan pengalaman Anda sebagai pengguna. Oleh karena itu, kami ingin mengajak Anda untuk berpartisipasi dalam memberikan feedback tentang pengalaman Anda menggunakan HubPro. Apakah ada momen tertentu yang membuat Anda merasa senang, frustrasi, atau bahkan terkesan? Apakah ada fitur yang menurut Anda sangat berguna atau mungkin kurang efektif? Apakah Anda memiliki ide kreatif atau perbaikan yang dapat membantu kami meningkatkan pengalaman pengguna? Kami sangat menghargai setiap pendapat Anda, dan kami berjanji untuk menggunakan feedback Anda untuk terus menyempurnakan HubPro. Mari bersama-sama menciptakan komunitas yang lebih baik dan memastikan bahwa setiap pengguna HubPro merasa dihargai dan didengar. Terima kasih atas dedikasi dan kontribusi Anda dalam membangun HubPro yang lebih baik untuk kita semua.
        </p>
        <div className="indent-5">
          <p className="mb-5">HubPro dapat digunakan di semua device, mulai dari mobile hingga laptop.</p>
          <div className="flex flex-col items-center lg:flex-row justify-center lg:gap-4">
            <Image
              src="/laptop.png"
              className="order-1"
              width={600}
              height={300}
              alt="Picture of the author"
            />
            <Image
              src="/mobile-device.png"
              width={200}
              height={200}
              alt="Picture of the author"
            />
          </div>
        </div>
        <div className="mt-6">
          <span>Profile pembuat: </span>
          <Link href={'https://www.linkedin.com/in/reraihan/'} target="blank">https://www.linkedin.com/in/reraihan/</Link>
        </div>
      </div>
      <p className="my-3">Komentar</p>
      {showData.length === 0 && <p>Belum ada komentar</p>}
      {showData.length > 0 && (
        <div className="max-h-96 overflow-y-auto">
          {showData.map((data, index) => (
            <div
              key={index}
              className="bg-slate-100 my-3 p-3 rounded-lg flex flex-col gap-4 w-[99%] m-auto border-2 shadow-lg shadow-slate-300 animate__animated animate__bounceIn"
            >
              <div className="flex flex-col">
                <p className="font-semibold text-lg">{data.name}</p>
                <Link href={data.website} target="blank" className="text-sm font-medium">
                  {data.website}
                </Link>
              </div>
              <p className="text-slate-700">{data.komentar}</p>
            </div>
          )).reverse()} {/* Reverse data untuk menampilkan komentar terbaru di atas */}
        </div>
      )}
      <div className="mt-5">
        <button
          onClick={() => setShowModal(true)}
          className="border-2 border-black px-4 py-3 rounded-full w-full font-semibold"
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
                placeholder="Website Profile"
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
