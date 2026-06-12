const net = require('net');
const {decode,clients,emit} = require('./data')
const stored = require('./stored')

let i = 0;

const server = net.createServer((c)=>{
    i++;
    const id = Number(i);
    clients.set(id,c)
    c.on('data',(d)=>{
        const hex = d.toString('hex');
        if(hex.length > 4){
            const [packet,data] = decode(hex);
            console.log(packet,data)
            switch (Number('0x'+packet)) {
                case 1:
                    stored.movePlayer(
                        Buffer.from(data.slice(6),'hex').toString(),
                        new stored.Pos(
                            data.slice(0,2),
                            data.slice(2,4),
                            data.slice(4,6)
                        )
                    )
                    break;
                case 2:
                    console.log('player_join')
                    stored.joinPlayer(
                        Buffer.from(data,'hex').toString()
                    )
                    break;
                case 3:
                    console.log('player_leave')
                    stored.leavePlayer(
                        Buffer.from(data,'hex').toString())
                    break;
                case 4:
                    console.log('block_update')
                    console.log(
                        data.slice(0,2),
                        data.slice(2,4),
                        data.slice(4,6),
                        data.slice(6,8)
                    )
                    break;
                default:
                    break;
            }
            emit(hex,id)
        }
    })
    c.on('error',()=>{})
})
server.listen(4389)
server.on('error',()=>{})