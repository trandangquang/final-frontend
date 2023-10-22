import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from '../axios';
import CardComponent from '../components/CardComponent';
import LoadingComponent from '../components/LoadingComponent';

function CategoryPage() {
  const { category } = useParams();
  const [loading, setLoading] = useState(false);
  const [products, setProducts] = useState([]);

  useEffect(() => {
    setLoading(true);
    axios
      .get(`/products/category/${category}`)
      .then(({ data }) => {
        setLoading(false);
        setProducts(data);
      })
      .catch((e) => {
        setLoading(false);
        console.log(e.message);
      });
  }, [category]);

  if (loading) {
    <LoadingComponent />;
  }

  const productsCategory = products.filter((product) =>
    product.category.toLowerCase()
  );

  return (
    <div className='px-44 pt-4'>
      <div className='flex w-full h-[100px] bg-slate-300 justify-center	items-center text-black'>
        <h1 >
          {category.charAt(0).toUpperCase() + category.slice(1)}
        </h1>
      </div>

      {productsCategory.length === 0 ? (
        <h1>No Products</h1>
      ) : (
        <div className='pt-4'>
          {productsCategory.map((productCategory) => (
            <CardComponent {...productCategory} />
          ))}
        </div>
      )}
    </div>
  );
}


export default CategoryPage;
