import React, { useState } from 'react';
import './App.css';

const App = () => {
  const [cart, setCart] = useState([]);
  const [deletedProducts, setDeletedProducts] = useState([]);
  let productIdCounter = 1;

  const addToCart = (productId, productName, productPrice) => {
    const product = { id: productId, name: productName, price: productPrice };
    setCart((prevCart) => [...prevCart, product]);

    console.log('Product Added to the cart.');
    console.log('List of products present in cart array:', cart);
  };

  const removeFromCart = (productId) => {
    setCart((prevCart) => {
      const removedProduct = prevCart.find(
        (product) => product.id === productId
      );
      const updatedCart = prevCart.filter(
        (product) => product.id !== productId
      );

      if (removedProduct) {
        setDeletedProducts((prevDeletedProducts) => [
          ...prevDeletedProducts,
          removedProduct,
        ]);

        console.log('Product removed from the cart.');
        console.log('List of deleted products:', deletedProducts);

        // Remove the corresponding product container from the DOM
        const productContainer = document.getElementById(
          `product-${productId}`
        );
        if (productContainer) {
          productContainer.remove();
        }

        // Remove the corresponding deleted product container from the DOM
        const deletedProductContainer = document.getElementById(
          `deleted-${productId}`
        );
        if (deletedProductContainer) {
          deletedProductContainer.remove();
        }
      }

      console.log('List of products present in cart array:', updatedCart);
      return updatedCart;
    });
  };

  const calculateTotalPrice = () => {
    return cart.reduce((total, product) => total + product.price, 0);
  };

  const renderProducts = (category) => {
    return (
      <div key={category.name} className="category-box">
        <h2>{category.name}</h2>
        {category.productList.map((product) => renderProduct(product))}
      </div>
    );
  };

  const renderProduct = (product) => {
    const productId = productIdCounter++;

    return (
      <div
        key={`product-${productId}`}
        id={`product-${productId}`}
        className="product-box"
      >
        <p>ID: {productId}</p>
        <p>Name: {product.name}</p>
        <p>Price: ${product.price}</p>
        <button
          className="cart-btn"
          onClick={() => addToCart(productId, product.name, product.price)}
        >
          Add to Cart
        </button>
        <button className="cart-btn" onClick={() => removeFromCart(productId)}>
          Remove from Cart
        </button>
      </div>
    );
  };

  return (
    <div>
      {data.map((category) => renderProducts(category))}
      <div>
        <h2>Deleted Products</h2>
        {deletedProducts.map((product) => (
          <div
            key={`deleted-${product.id}`}
            id={`deleted-${product.id}`}
            className="product-box"
          >
            <p>ID: {product.id}</p>
            <p>Name: {product.name}</p>
            <p>Price: ${product.price}</p>
          </div>
        ))}
      </div>
      <div>
        <h2>Total Price in Cart: ${calculateTotalPrice()}</h2>
      </div>
    </div>
  );
};

// Sample data
const data = [
  {
    name: 'Cosmetics',
    productList: [
      {
        name: 'Hair Oil',
        price: 122,
      },
      {
        name: 'Face wash',
        price: 123,
      },
    ],
  },
  {
    name: 'Household',
    productList: [
      {
        name: 'Hair Oil',
        price: 122,
      },
      {
        name: 'Face wash',
        price: 123,
      },
    ],
  },
];

export default App;
