export default function Hero() {
  return (
    <section className="py-20 text-center">
      <div className="max-w-4xl mx-auto px-4">
        <h1 className="text-5xl md:text-6xl font-extrabold tracking-tight">
          <span className="text-yellow-400">RESPAWN</span> — Gaming Tech Gear
        </h1>
        <p className="mt-4 text-gray-300 text-lg">
          Level up your rig — GPUs, keyboards, mice, headsets and more. Built for gamers.
        </p>
        <div className="mt-6 flex justify-center">
          <button className="bg-yellow-400 text-black px-6 py-2 rounded-md font-semibold hover:bg-yellow-500">
            Shop Now
          </button>
        </div>
        <div className="mt-8">
          <div className="bg-gradient-to-r from-black/40 via-transparent to-black/40 rounded-lg p-6 shadow-lg">
            <p className="text-sm text-gray-400">Official demo — this is a local dev store. Add products using the form on the left.</p>
          </div>
        </div>
      </div>
    </section>
  );
}
