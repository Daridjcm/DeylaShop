import React, { useState, useEffect } from 'react';

export function ProductList() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [selectedProduct, setSelectedProduct] = useState(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        console.log('Fetching products...');
        const res = await fetch('https://dummyjson.com/products');
        if (!res.ok) {
          throw new Error(`Network response was not ok: ${res.statusText}`);
        }
        const data = await res.json();
        const productData = data.products.map((product) => ({
          srcImg: product.thumbnail,
          altImg: product.title,
          idImg: product.id.toString(),
          name: product.title,
          description: product.description,
          price: product.price,
          reference: product.sku,
          category: product.category,
          weight: product.weight,
          availabilityStatus: product.availabilityStatus,
          warranty: product.warrantyInformation,
          rate: product.rating,
          stock: product.stock,
        }));
        setProducts(productData);
      } catch (error) {
        setError('Error fetching data.');
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const handleOpenModal = (product) => {
    setSelectedProduct(product);
  };

  const handleCloseModal = () => {
    setSelectedProduct(null);
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  if (products.length === 0) {
    return <p>No products found</p>;
  }

  return (
    <section id='Products'>
      <div className="flex flex-wrap content-center items-center gap-y-20 gap-x-3">
        {products.map((product) => (
          <div
            key={product.idImg}
            className="flex flex-col bg-[#0c0c0c] sm:w-1/2 md:w-1/3 lg:w-1/4 m-auto p-4 rounded-lg max-w-xs max-h-[400px] shadow-md cursor-pointer hover:scale-105 transition-transform"
          >
            <div className="flex justify-center">
              <img
                className="w-40 h-40 object-cover"
                src={product.srcImg}
                alt={product.altImg}
                id={product.idImg}
              />
            </div>
            <div className="flex flex-col justify-between h-full">
              <div className="overflow-hidden">
                <p className="text-slate-100 font-light truncate">
                  {product.name}
                </p>
                <p className="text-green-500 font-bold">${product.price}</p>
                <p
                  className="text-slate-200 font-semibold opacity-60 cursor-pointer truncate hover:opacity-100 transition-opacity"
                  onClick={() => handleOpenModal(product)}
                >
                  {product.description}
                </p>
                <p className='bg-slate-50 w-fit rounded-lg px-2 text-purple-400 font-bold'>
                  {product.category}
                </p>
              </div>
              <button
                className="bg-purple-400 text-purple-700 w-fit py-1 px-2 rounded-2xl hover:bg-purple-500 transition-all mt-4"
                type="button"
              >
                <span className="icon-[solar--cart-large-2-broken] text-slate-100 mr-1" role="img" aria-hidden="true" /> Add to cart
              </button>
            </div>
          </div>
        ))}
      </div>
      {selectedProduct && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-80 z-50">
          <div className="relative bg-[#131313] text-slate-100 p-4 rounded-lg max-w-md w-full h-fit">
            <button
              className="absolute top-2 right-2 text-white text-xl px-2 py-1"
              onClick={handleCloseModal}
            >
              <span className="icon-[mi--close] opacity-[0.5]" role="img" aria-hidden="true" />
            </button>
            <img className='w-4/12' src={selectedProduct.srcImg} alt={selectedProduct.altImg} />
            <h2 className="text-lg font-bold mb-2">
              {selectedProduct.name}
            </h2>
            <p className="mb-4">{selectedProduct.description}</p>
            <div className='list-none' id='otherInfo'>
              <li className="mr-3 text-yellow-300"><span className="icon-[material-symbols--star-half-outline] text-xl" />Rate: {selectedProduct.rate}</li>
              <li className="mr-3 text-blue-300"><span class="icon-[material-symbols-light--barcode] text-xl" /> Reference: {selectedProduct.reference}</li>
              <li className={`mr-3 ${selectedProduct?.availabilityStatus == 'In Stock' ? 'text-gray-500' : 'text-cyan-300'}`}>
              <span class="icon-[material-symbols--check-circle-rounded] text-xl" /> Availability: {selectedProduct.availabilityStatus} ({selectedProduct.stock})
              </li>
              <li className="mr-3 text-gray-300"><span class="icon-[hugeicons--weight-scale-01] text-xl" /> Weight: {selectedProduct.weight}</li>
              <li className="mr-3 text-pink-500"><span class="icon-[material-symbols--google-guarantee] text-xl" /> {selectedProduct.warranty}</li>
            </div>
          </div>
        </div>
      )}
    </section>

  );
}
