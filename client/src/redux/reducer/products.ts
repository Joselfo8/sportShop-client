const initialState: any = {
    products : [],
};

function products(state = initialState, action : any){
    switch(action.type){
        case "ALL_PRODUCTS":
            return{
                ...state,
                products: action.payload
            };
        case "SEARCH_PRODUCT":
            return{
                ...state,
                products: action.payload
            }
        default:
            return state;
    };
};

export default products;