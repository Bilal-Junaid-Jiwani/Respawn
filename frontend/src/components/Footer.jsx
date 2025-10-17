export default function Footer() {
  return (
    <footer className="bg-black text-gray-400 py-10 mt-12">
      <div className="container mx-auto px-4 grid grid-cols-2 md:grid-cols-4 gap-6">
        <div>
          <h4 className="text-white font-bold mb-2">Respawn</h4>
          <p className="text-sm">Gaming tech & accessories for players.</p>
        </div>

        <div>
          <h4 className="text-white font-bold mb-2">Products</h4>
          <ul className="text-sm space-y-1">
            <li>Keyboards</li>
            <li>Mice</li>
            <li>Headsets</li>
          </ul>
        </div>

        <div>
          <h4 className="text-white font-bold mb-2">Support</h4>
          <ul className="text-sm space-y-1">
            <li>Contact</li>
            <li>Returns</li>
          </ul>
        </div>

        <div>
          <h4 className="text-white font-bold mb-2">Follow</h4>
          <ul className="text-sm space-y-1">
            <li>Instagram</li>
            <li>YouTube</li>
          </ul>
        </div>
      </div>

      <div className="text-center text-sm text-gray-500 mt-6">© 2025 Respawn. All rights reserved.</div>
    </footer>
  );
}
