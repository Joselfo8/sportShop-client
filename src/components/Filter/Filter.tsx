import React from 'react'
import { useDispatch } from 'react-redux'
import { orderByPrice } from '../../redux/action'
import { useState } from 'react'


export default function Filter(){

    const dispatch = useDispatch()
    const [, setOrder] = useState<String>('')
    
    const handleFilterPrice = (e:any) => {
        e.preventDefault() 
        setOrder(e.target.value)
        dispatch(orderByPrice(e.target.value))    
    }
      
  return (
    <div>
        <select
        defaultValue='price'
        onChange={(e)=>handleFilterPrice(e)}
      >
        <option value='price' disabled>Filter By Price</option>
        <option value='minToMax'>Lower Price</option>
        <option value='maxToMin'>Higher Price</option>
      </select>
    </div>
  )
}
