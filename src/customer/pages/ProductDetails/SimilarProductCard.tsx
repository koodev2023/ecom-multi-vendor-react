import "./SimilarProductCard.css"; // Import your CSS file

const SimilarProductCard = () => {
  return (
    <div>
      <div className="group relative w-min cursor-pointer">
        <div className="card relative overflow-hidden">
          <img
            className="card-media object-top absolute top-0 left-0 w-full h-full transition-transform duration-500 ease-in-out"
            src="https://images.unsplash.com/photo-1653839280015-8ea9c7a775d8?q=80&w=1598&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          />
        </div>

        {/* Product Info */}
        <div className="mt-2 text-sm text-gray-500">Awesome Gadgets</div>
        <div className="text-lg font-semibold tracking-tight text-gray-900">
          Super Gizmo 5000
        </div>
        <div className="mt-1 flex items-center">
          <span className="text-sm font-medium text-gray-800">$50</span>
          <span className="ml-2 text-xs line-through text-gray-500">$75</span>
          <span className="ml-2 rounded-full bg-red-100 px-2.5 py-0.5 text-xs font-semibold text-red-700">
            33% off
          </span>
        </div>
      </div>
    </div>
  );
};

export default SimilarProductCard;
