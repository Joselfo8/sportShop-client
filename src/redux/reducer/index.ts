const initialState: any = {
    products : [],
};

function rootReducer(state = initialState, action: any){
    switch(action.type){
        case "GET_PRODUCTS":
            return{
                ...state,
                products: action.payload
            }
        default:
            return state;
    };
};

export default rootReducer;