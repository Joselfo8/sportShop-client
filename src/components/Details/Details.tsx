import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import { getDetails } from '../../redux/action'

export default function Details(){
    const dispatch = useDispatch()
    const productDetail: any = useSelector((state:any) => state.details)
    const params = useParams()

    console.log(productDetail)

    useEffect(()=>{
        dispatch(getDetails(params.id))
    },[dispatch, params.id])
    

  return (
    <div>
        <h1>{productDetail.title}</h1>
        <img src={productDetail.image} alt='Image not found'/>
        <p>{productDetail.description}</p>
        <button>Favoritos</button>
        <button>Carrito</button>
        <button>Valoracion</button>
        
    </div>
  )
}
