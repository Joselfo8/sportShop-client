const initialState: any = {
    products : [],
    details : {}
};

function rootReducer(state = initialState, action: any){
    switch(action.type){
        case "GET_PRODUCTS":
            return{
                ...state,
                products: action.payload
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