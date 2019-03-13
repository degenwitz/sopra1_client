export function ErrorCode( number){
    if( number == 403 ){ return /forbidden/; }
    if( number == 401 ){ return /unauthorized/; }
    if( number == 404 ){ return /not_found/; }
    return "Unknown Error";
}