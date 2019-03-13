function ErrorCode( number){
    if( number == 403 ){ return /forbidden/; }
    return "Unknown Error";
}