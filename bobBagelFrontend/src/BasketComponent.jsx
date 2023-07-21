/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React, { useEffect, useState } from 'react'

function BasketComponent({ basket, setBasket, capacity, setCapacity, productNames }) {
    const [selectedValue, setSelectedValue] = useState(5);
    const removeProduct = (product) => {
        setBasket((previousBasket)=>previousBasket.filter((curr)=>curr.sku != product.sku))
    }

  return (
      <div className='container option' >
          <ul className='list-group'>
          {basket && basket.map((product) => 
              <li className='list-group-item p-1' key={product.sku}>{ productNames[product.index]} <button className='ms-4 btn btn-secondary' onClick={() => removeProduct(product)}>Remove product</button></li>
              )}
          </ul>
          <input type="range" className="form-range mt-4" min="1" max="50" step="1" id="customRange3" value={selectedValue} onChange={(event) => setSelectedValue(event.target.value)} /> 
          <div>{selectedValue}</div>
        <button className="btn btn-secondary" onClick={()=>setCapacity(selectedValue)} disabled={selectedValue === capacity}> Choose capacity</button>
      </div>
  )
}

export default BasketComponent