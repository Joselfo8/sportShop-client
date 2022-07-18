const CATEGORY = ["MAN", "WOMAN", "SPORTS", "KID"];
const SUBCATEGORY = ["CLOTHES","FOOTWEAR","ACCESSORIES"];

export default  function validateProducts(input:any):any{



    interface Errors{
        title: String,
        id:String,
        category:String,
        subCategory:String,
        price: String,
        description:String,
        product_care:String,
        sizes:String,
        // image:String
    }

    //Objeto que guarda errores
    let errors:Errors = {
        title: '',
        id:'',
        category:'',
        subCategory:'',
        price: '',
        description:'',
        product_care:'',
        sizes:'',
        // image:''
    }

    //Variables para Regular Expresions
    let REurl = /[(http(s)?):\/\/(www\.)?a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/g
    let REspaceWhite = /^\S/
    let REsymbol= /^[a-zA-Z0-9,_-]+( [a-zA-Z0-9,_-]+)*$/


    //  Varriables errores/imagenes 
    let errorEmptyImage = 'You must add at least one image'
    // Variables para errores
    let errorEmpty = 'The field cannot be empty'
    let errorisNaN= 'Only numbers are allowed'
    let errorNumber = 'Only number greater than 1 are allowed'
    let errorCharacters = 'Field must be between 1-100 characters'
    let errorCharac500 = 'Field must be between 1-500 characters'
    let errorSymbol = 'The field can only contain letters(A-Z), numbers(#), hyphens(-) and underscores( _ ).'
    let errorURL = 'The image most be a url link'
    let errorCategory = 'Category is invalid. Only MAN, WOMAN AND KID'
    // Validar el input para añadir errores

    // ERRORES NOMBRE
    if(!input.title ){
        errors.title = errorEmpty
    } else if(input.title.length > 100){
        errors.title = errorCharacters
    } else if(!REsymbol.test(input.title)) {
        errors.title = errorSymbol
    } 

    //ERRORES CATEGORIA 
    if(!input.category){
        errors.category = errorEmpty
    } else if(input.category.length > 100){
        errors.category = errorCharacters 
    } else if(!REsymbol.test(input.category)) {
        errors.category = errorSymbol
    } else if(!CATEGORY.includes(input.category.toUpperCase())){
        errors.category = errorCategory
    }
    //ERRORES SUB CATEGORIA
    if(!input.subCategory){
        errors.subCategory = errorEmpty
    } else if(input.subCategory.length > 100){
        errors.subCategory = errorCharacters 
    } else if(!REsymbol.test(input.subCategory)){
        errors.subCategory = errorSymbol
    } else if(!SUBCATEGORY.includes(input.subCategory.toUpperCase())){
        errors.subCategory = 'Sub-category is invalid. Only CLOTHES,FOOTWEAR AND ACCESORIES'
    }


    // ERRORES PRECIO
    if(!input.price){   
        errors.price = errorEmpty
    } else if (isNaN(input.price)){
        errors.price = errorisNaN
    } else if (input.price < 1){
        errors.price = errorNumber
    }


    //ERRORES DESCRIPCION 
    if(!input.description){
        errors.description = errorEmpty
    } else if(input.description.length > 500){
        errors.description = errorCharac500 
    } else if(!REsymbol.test(input.description)) {
        errors.description = errorSymbol
    }
    
     //ERRORES CUIDADOS
    if(!input.product_care){
        errors.product_care = errorEmpty
    } else if(input.product_care.length > 500){
        errors.product_care = errorCharac500 
    } else if(!REsymbol.test(input.product_care)) {
        errors.product_care = errorSymbol
    }
    
    
    // // ERRORES IMAGENES
    // if(!image){
    //     errors.image = errorEmptyImage
    // }  else if (!REurl.test(image)){
    //     errors.image = errorURL
    // } 

    return errors
}