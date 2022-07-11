import {
    GET_PRODUCTSBYNAME,
    GET_PRODUCTS_BY_CATEGORY_AND_SUBCATEGORY
} from '../actionsTypes/actionsTypes'

const initialState: any = {
    products : [],
    productsFiltered : [],
    searchProducts: [],
    productCart: [],
    details : {}
};

function rootReducer(state = initialState, action: any){
    switch(action.type){
        case "GET_PRODUCTS":
            return{
                ...state,
                products: action.payload,
                productCart: action.payload.slice(0, 3)
            }

        case "GET_DETAILS":
            return {
                ...state,
                details: action.payload
            }

        case GET_PRODUCTSBYNAME:
            const filter: any = state.products.filter((product: any) => product.title.toLowerCase().includes(action.payload.toLowerCase()))
            return {
                ...state,
                productsFiltered: filter
            }

        case "GET_BY_CATEGORY":
            return{
                ...state,
                productsFiltered:action.payload,
            }

        case GET_PRODUCTS_BY_CATEGORY_AND_SUBCATEGORY:
            return{
                ...state,
                productsFiltered:action.payload,
            }


        case "CLEAN_STORE":
            console.log("desde CLEAN_STORE")
            return{
                ...state,
                productsFiltered: [],
            }

        case "ORDER_BY_PRICE":
            console.log(action.payload)
            let byPrice = 
            (action.payload === 'minToMax') 
            ? state.products.sort((a:any,b:any)=>{
                return a.price - b.price
              })
              : state.products.sort((a:any,b:any)=>{
                return b.price - a.price
              }) 


              console.log(byPrice)
          return {
            ...state,
            products: byPrice
          }

        default:
            return state;
    };
};

export default rootReducer;