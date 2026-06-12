const clients = new Map();

function decode(hex){
    let i = 0;
    const length = hex[i]+hex[i+1]
    const id = hex[i+2]+hex[i+3]
    const data = hex.slice(4)//,2*length-2)
    return [id,data]
}

function encodeStr(str){
    const id = '02';
    const buf = Buffer.from(str).toString('hex');
    const length = Buffer.from([str.length]).toString('hex');
    return length+id+buf;
}

function emit(hex,id){
    clients.forEach((c,cid)=>{
        if(cid!==id){
            c.write(Buffer.from(hex,'hex'))
        }
    })
}

module.exports = {decode,encodeStr,clients,emit}