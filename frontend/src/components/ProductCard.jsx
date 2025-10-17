export default function ProductCard({ product }) {
  return (
    <div className="bg-gray-800 rounded-lg shadow-lg p-4 flex flex-col">
      <div className="h-44 bg-gray-900 rounded flex items-center justify-center mb-4">
        {/* If image missing, show placeholder */}
        {product.image ? (
          <img src={product.image} alt={product.title} className="max-h-40 object-contain" />
        ) : (
          <div className="text-gray-500">No image</div>
        )}
      </div>

      <h3 className="font-semibold text-lg">{product.title}</h3>
      <p className="text-sm text-gray-400">{product.brand} • {product.category}</p>

      <div className="mt-3 flex items-center justify-between">
        <span className="text-yellow-400 font-bold">Rs {product.price}</span>
        <button className="bg-yellow-400 text-black px-3 py-1 rounded">Add to Cart</button>
      </div>

      {product.description && <p className="mt-3 text-sm text-gray-300">{product.description}</p>}
      <div className="mt-2 text-xs text-gray-400">Stock: {product.stock ?? "N/A"}</div>
    </div>
  );
}
