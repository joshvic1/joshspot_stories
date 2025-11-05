export default function AgePage() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-purple-600 via-pink-500 to-red-500 text-white px-4">
      <h1 className="text-3xl md:text-5xl font-extrabold text-center mb-10 drop-shadow-lg">
        Are you above 18 years old?
      </h1>

      <div className="flex gap-6">
        <a
          href="/a"
          className="px-8 py-3 bg-white text-purple-600 font-semibold rounded-xl shadow-lg hover:scale-105 transition-transform"
        >
          Yes
        </a>
        <a
          href="/b"
          className="px-8 py-3 bg-black/30 text-white font-semibold rounded-xl shadow-lg hover:scale-105 transition-transform"
        >
          No
        </a>
      </div>
    </div>
  );
}
