import React, { useState } from "react";

export default function RSVPForm() {
  const [formData, setFormData] = useState({
    name: "",
    attendance: "hadir",
    guests: "1",
    dietary: ""
  });
  
  const [status, setStatus] = useState("idle"); // idle, loading, success

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [id]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name.trim()) {
      alert("Silakan masukkan nama lengkap Anda.");
      return;
    }

    setStatus("loading");
    
    // Simulate server request
    setTimeout(() => {
      setStatus("success");
    }, 1500);
  };

  const resetForm = () => {
    setFormData({
      name: "",
      attendance: "hadir",
      guests: "1",
      dietary: ""
    });
    setStatus("idle");
  };

  return (
    <div className="max-w-2xl mx-auto bg-surface-container-lowest p-stack-lg md:p-16 border border-outline-variant/30 relative rounded-xl shadow-sm">
      {/* Floating Leaves Animation (Conceptual) */}
      <div className="absolute inset-0 pointer-events-none opacity-5 overflow-hidden rounded-xl">
        <div className="absolute top-10 left-10 w-24 h-24 rotate-45 border border-primary/20 rounded-full"></div>
        <div className="absolute bottom-20 right-20 w-48 h-48 -rotate-12 border border-primary/20 rounded-full"></div>
      </div>

      <div className="relative z-10">
        <div className="text-center mb-stack-lg">
          <h2 className="font-headline-md text-headline-md text-primary mb-2">
            Konfirmasi Kehadiran
          </h2>
          <p className="font-body-md text-on-surface-variant italic">
            Mohon kesediaannya untuk mengonfirmasi kehadiran Anda sebelum tanggal 10 Oktober 2024
          </p>
        </div>

        {status === "success" ? (
          <div className="text-center py-8 space-y-4 animate-fade-in">
            <span className="material-symbols-outlined text-primary text-6xl" style={{ fontVariationSettings: "'FILL' 1" }}>
              task_alt
            </span>
            <h3 className="font-headline-sm text-primary">Konfirmasi Terkirim!</h3>
            <p className="font-body-md text-on-surface-variant max-w-md mx-auto">
              Terima kasih atas konfirmasi Anda. Kehadiran dan doa restu Anda sangat berarti bagi kami.
            </p>
            <button
              onClick={resetForm}
              className="mt-4 px-6 py-2 border border-primary text-primary hover:bg-primary/5 rounded-full font-label-caps text-label-caps transition-all"
            >
              Kirim Konfirmasi Baru
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-stack-lg">
            {/* Name Input */}
            <div className="relative">
              <input
                type="text"
                id="name"
                value={formData.name}
                onChange={handleChange}
                className="peer w-full bg-transparent border-0 border-b border-outline focus:ring-0 focus:border-primary px-0 py-2 placeholder-transparent transition-all focus:outline-none"
                placeholder=" "
                required
                disabled={status === "loading"}
              />
              <label
                htmlFor="name"
                className="absolute left-0 -top-3.5 text-label-caps text-on-surface-variant transition-all peer-placeholder-shown:text-body-md peer-placeholder-shown:top-2 peer-focus:-top-3.5 peer-focus:text-primary"
              >
                Nama Lengkap
              </label>
            </div>

            {/* Attendance & Guests Grid */}
            <div className="grid grid-cols-2 gap-stack-md">
              {/* Attendance Select */}
              <div className="relative">
                <select
                  id="attendance"
                  value={formData.attendance}
                  onChange={handleChange}
                  className="w-full bg-transparent border-0 border-b border-outline focus:ring-0 focus:border-primary px-0 py-2 text-body-md appearance-none focus:outline-none"
                  disabled={status === "loading"}
                >
                  <option value="hadir">Akan Hadir</option>
                  <option value="tidak-hadir">Berhalangan Hadir</option>
                </select>
                <label className="absolute left-0 -top-3.5 text-label-caps text-primary" htmlFor="attendance">
                  Status Kehadiran
                </label>
              </div>

              {/* Guests Count */}
              <div className="relative">
                <input
                  type="number"
                  id="guests"
                  value={formData.guests}
                  onChange={handleChange}
                  min="1"
                  max="5"
                  className="w-full bg-transparent border-0 border-b border-outline focus:ring-0 focus:border-primary px-0 py-2 text-body-md focus:outline-none"
                  disabled={status === "loading" || formData.attendance === "tidak-hadir"}
                />
                <label className="absolute left-0 -top-3.5 text-label-caps text-primary" htmlFor="guests">
                  Jumlah Tamu
                </label>
              </div>
            </div>

            {/* Special Request Textarea */}
            <div className="relative">
              <textarea
                id="dietary"
                value={formData.dietary}
                onChange={handleChange}
                rows="2"
                className="peer w-full bg-transparent border-0 border-b border-outline focus:ring-0 focus:border-primary px-0 py-2 placeholder-transparent focus:outline-none"
                placeholder=" "
                disabled={status === "loading"}
              ></textarea>
              <label
                htmlFor="dietary"
                className="absolute left-0 -top-3.5 text-label-caps text-on-surface-variant transition-all peer-placeholder-shown:text-body-md peer-placeholder-shown:top-2 peer-focus:-top-3.5 peer-focus:text-primary"
              >
                Catatan Khusus / Alergi Makanan
              </label>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={status === "loading"}
              className="w-full bg-primary text-on-primary py-4 font-label-caps text-label-caps tracking-widest hover:bg-on-primary-container transition-all flex items-center justify-center gap-2 group disabled:opacity-50"
            >
              {status === "loading" ? (
                <>
                  MENGIRIM...
                  <svg className="animate-spin h-5 w-5 text-white" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"></path>
                  </svg>
                </>
              ) : (
                <>
                  KIRIM KONFIRMASI
                  <span className="material-symbols-outlined transition-transform group-hover:translate-x-1">
                    send
                  </span>
                </>
              )}
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
