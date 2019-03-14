export function ErrorCode( number){
    if( number == 403 ){ return /forbidden/; }
    if( number == 401 ){ return /unauthorized/; }
    if( number == 404 ){ return /not_found/; }
    if( number == 400 ){ return /bad request/; }
    return "Unknown Error";
}