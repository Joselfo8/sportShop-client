const initialState: any = {
    products : [],
    productsFiltered : [],
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
        default:
            return state;
    };
};

export default rootReducer;