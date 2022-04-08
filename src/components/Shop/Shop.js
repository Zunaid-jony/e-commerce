import React, { useEffect, useState } from 'react';
import { addToDb, getStoredCart } from '../../utilities/fakedb';
import Cart from '../Cart/Cart';
import Product from '../Product/Product';
import './Shop.css'

const Shop = () => {
    
        const [products , setProducts] = useState([]);
        const [cart, setCart] = useState([]);
        const [displayProducts,setDisplayProducts] = useState([]);
        
      useEffect( () =>{
          fetch('https://raw.githubusercontent.com/ProgrammingHero1/ema-john-simple-resources/master/fakeData/products.JSON')
          .then(response => response.json())
          .then(data => setProducts(data));
      },[])

      //database 
      useEffect(() =>{
         if(products.length){
            const savedCart = getStoredCart();
            const storedCart =[];
            for( const key in savedCart){
                 
              const addedProduct = products.find(product => product.key === key);
              //sconsole.log(key, addedProduct)
              if(addedProduct){
                  const quantity = savedCart[key]
                  addedProduct.quantity= quantity;
                storedCart.push(addedProduct)
                  
              }
       
            }
            setCart(storedCart)
         }
      }, [products])


      const handleAddToCart = (product) =>{
         // console.log(product.name);
         const newCart =[...cart,product];
         setCart(newCart);

         // save to local stoage (for now)
         addToDb(product.key);
       


      }
      const handleSearch = event =>{
          const searchText = event.target.value;
          const matchedProducts = products.filter(product => product.name.ToLowerCase().includes(searchText.ToLowerCase()));
          setDisplayProducts(matchedProducts);
          console.log(matchedProducts.length);
      }
    
    return (
        <>  <div className='search-container'>
            <input onChange={handleSearch}
            type='text' placeholder='Search Product'></input>
        </div>
            <div className='shop-container'>
                <div className='product-container'>
                    <h3>
                    {products.img}
                    </h3>
                    {
                        products.map(product => <Product
                            key={product.key}
                            product={product}
                            handleAddToCart ={handleAddToCart}
                            
                            ></Product>)
                    }
                </div>
                <div className='cart-container'>
                <Cart   cart={cart}   ></Cart>
                
                
                </div>
                
            </div>
        
        </>
    );
};

export default Shop;