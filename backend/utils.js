export function random(len){
    let options  = "saxzdfghbfghdsadFSGRBFDVCAX12345678" ; 
    let ans = "" ; 
    let length = options.length ; 
    for(let i = 0 ; i < len ; i++){
        ans += options[Math.floor((Math.random() * length))]
    }

    return ans ; 
}