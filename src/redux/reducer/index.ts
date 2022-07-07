import {
    GET_PRODUCTSBYNAME
} from '../actionsTypes/actionsTypes'

const initialState: any = {
    products : [],
    productsFiltered : [],
    searchProducts: [],
    details : {}
};

function rootReducer(state = initialState, action: any){
    switch(action.type){
        case "GET_PRODUCTS":
            return{
                ...state,
                products: action.payload,
                productsFiltered: action.payload
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
                    searchProducts: filter
                }
                
        default:
            return state;
    };
};

export default rootReducer;