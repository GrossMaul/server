class Pos{
    constructor(x,y,z){
        this.x = x;
        this.y = y;
        this.z = z;
    }
}

const Players = new Map();

const Blocks = Array(100).fill(Array(50).fill(Array(100).fill(0)))

function updateBlock(pos,id){
    Blocks[pos.x][pos.y][pos.z] = id;
}

function joinPlayer(name){
    Players.set(name,new Pos(0,0,0))
}

function movePlayer(name,pos){
    Players.set(name,new Pos(pos.x,pos.y,pos.z))
}

function leavePlayer(name){
    Players.delete(name)
}

module.exports = {updateBlock,joinPlayer,movePlayer,leavePlayer,Pos};