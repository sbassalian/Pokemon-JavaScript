import {getPokemon} from './game.js';

async function main(){

console.log(!!pokemon)
console.log("hello bob")
let pokemon = await getPokemon();

let player1data = [];
let player2data = [];

let player2moves= [];

let gameStarted = 0;

async function getDamage(name) {
    let moveinfo = []
    const url3 = `https://pokeapi.co/api/v2/move/${name}/`;
    await fetch(url3).then(res => res.json()).then(data => {
        moveinfo.push(data.name);
        moveinfo.push(data.power);
        moveinfo.push(data.type.name);
    })

    return moveinfo;


}



// class Pokemon{
//     constructor(name, front, back, hp, type, move1, move2, move3, move4){
//         this.name = name;
//         this.front = front;
//         this.back = back;
//         this.hp = hp;
//         this.type = type;
//         this.move1 = move1;
//         this.move2 = move2;
//         this.move3 = move3;
//         this.move4 = move4;
//     }
// }

pokemon.forEach((poke, i) => {
    let span = document.createElement('span');
    span.setAttribute("id", `${i}`);
    
    document.getElementById('index').appendChild(span);
    let button = document.createElement('button');
    button.addEventListener('click', ((e) => initialspawn(i)));
    button.addEventListener('click', (() => clearMoves()));
    button.addEventListener('click', ((e) => {
        console.log(e.path);
        fetchMoves(i)}))
    button.addEventListener('click', (() =>{
        let firstRemove = document.getElementById('remove1');
        firstRemove.remove();
    }));
    button.setAttribute("id", `${poke.name}`);
    document.getElementById(`${i}`).appendChild(button);
    let pokepic = document.createElement('img');
    pokepic.src = poke.front;
    document.getElementById(`${poke.name}`).appendChild(pokepic);


})



function initialspawn(id){
   let poke = pokemon[id];
    
    let randomvar = document.getElementById('fixpokename')
  
    randomvar.innerHTML = poke.name;

    player1data = [];
    player1data.push(poke.name, poke.front, poke.back, poke.hp + 200, poke.types)
   
    
}


function clearMoves(){
    document.getElementById('index3').innerHTML = "";
}



function fetchMoves(id){
  
    pokemon[id].moves.forEach((move, i) => {
        let values = Object.values(move);
        let name = values[0].name;
        let damage = 0;
        let span = document.createElement('span');
        span.setAttribute("id", `${name}`);
        // span.setAttribute("class", 'moves');
        document.getElementById('index3').appendChild(span);
        let button = document.createElement('button');
        button.setAttribute("id", `${name}1`);
        button.addEventListener('click', ((e) => spawnmoves(e.path[1].id)));
        document.getElementById(`${name}`).appendChild(button);
        getDamage(name).then(data => {
            damage = data[1];
            if (!damage){
                damage = 0
            }
        }).then(() => document.getElementById(`${name}1`).innerHTML = `${name}` + ' : ' + ` Power = ${damage}` )
        ;
    })
}

let pokemoves = [];

function spawnmoves(move) {
    if (pokemoves.length < 3){
        pokemoves.push(move)
        player1data.push(move);
        let span = document.createElement('span');
        span.innerHTML = move;
        document.getElementById('poke-info').appendChild(span);
        
    }
    else if (pokemoves.length === 3){
        pokemoves.push(move)
        player1data.push(move);
        let span = document.createElement('span');
        span.setAttribute("id", 'last-move');
        span.innerHTML = move;
        document.getElementById('poke-info').appendChild(span);
    }
    else if (pokemoves.length === 4) {
        pokemoves.pop();
        pokemoves.push(move);
        player1data.pop();
        player1data.push(move);
        let last = document.getElementById('last-move');
        last.innerHTML = move;
        console.log(pokemoves);
    }

}

function spawnPlayer1(){
    
    let player1pic = document.createElement('img');
    player1pic.src = player1data[2];
    player1pic.setAttribute("id", 'player1');
    document.getElementById(`player1box`).appendChild(player1pic);
    let move1 = document.getElementById('move1');
    let move2 = document.getElementById('move2');
    let move3 = document.getElementById('move3');
    let move4 = document.getElementById('move4');
    move1.innerHTML = player1data[5];
    move2.innerHTML = player1data[6];
    move3.innerHTML = player1data[7];
    move4.innerHTML = player1data[8];
    let as2 = document.getElementById('as2');
    as2.innerHTML = 'Type : ' + player1data[4];

}



function spawnPlayer2(){
    let randompoke = pokemon[Math.floor(Math.random() * pokemon.length)]

    // let randommove = '';
    // let power = 0;

    // while (player2moves.length < 4){
    //     randommove = randompoke.moves[Math.floor(Math.random() * randompoke.moves.length)];

    //     getDamage(randommove).then((data) => {
    //         power = data[1];
    //         if (!player2moves.includes(randommove) && power > 0){
    //             player2moves.push(randommove);
    //         }
    //         else{
    //             player2moves.push("fail")
    //         }
    //     })
        
    // }

    let randommove1a = randompoke.moves[Math.floor(Math.random() * randompoke.moves.length)];
    let randommove1 = Object.values(randommove1a)[0].name;
    let randommove2a = randompoke.moves[Math.floor(Math.random() * randompoke.moves.length)];
    let randommove2 = Object.values(randommove2a)[0].name;
    let randommove3a = randompoke.moves[Math.floor(Math.random() * randompoke.moves.length)];
    let randommove3 = Object.values(randommove3a)[0].name;
    let randommove4a = randompoke.moves[Math.floor(Math.random() * randompoke.moves.length)];
    let randommove4 = Object.values(randommove4a)[0].name;
    
    player2data.push(randompoke.name, randompoke.front, randompoke.back, randompoke.hp + 200, randompoke.types, randommove1, randommove2, randommove3, randommove4 )

    player2moves.push(randommove1, randommove2, randommove3, randommove4)

    // player2data.push(randompoke.name, randompoke.front, randompoke.back, randompoke.hp + 200, randompoke.types, player2moves[0], player2moves[1], player2moves[2], player2moves[3])

    let player2pic = document.createElement('img');
    player2pic.src = randompoke.front;
    player2pic.setAttribute("id", 'player2');
    document.getElementById(`player2box`).appendChild(player2pic);

    
    
}

function removers(){
    let secondRemove = document.getElementById('remove2');
    secondRemove.remove();
    let thirdRemove = document.getElementById('remove3');
    thirdRemove.remove();
}

function startGame(){
    gameStarted += 1
    if (gameStarted > 1) {
        return false
    } 
    let button = document.getElementById('testingbutton');

    // button.addEventListener('click', (() => {
    //     let secondRemove = document.getElementById('remove2');
    //     secondRemove.remove();
    // }));

    // button.addEventListener('click', (() => {
    //     let thirdRemove = document.getElementById('remove3');
    //     thirdRemove.remove();
    // }));

    button.addEventListener('click', removers());
    button.addEventListener('click', spawnPlayer1());
    button.addEventListener('click', spawnPlayer2());




    console.log(player2moves);
    
    let span = document.createElement('span');
    let span3 = document.createElement('span');
    span3.innerHTML = "HP"
    span3.setAttribute("id", 'HP1');
    let hpinfo = player1data[3];
    span.innerHTML = hpinfo;
    span.setAttribute("id", 'battlehp1');
    document.getElementById('player-1-going').appendChild(span3);
    document.getElementById('player-1-going').appendChild(span);

    let span2 = document.createElement('span');
    let span4 = document.createElement('span');
    span4.innerHTML = "HP"
    span4.setAttribute("id", 'HP2');
    let hpinfo2 = player2data[3];
    span2.innerHTML = hpinfo2;
    span2.setAttribute("id", 'battlehp2');
    document.getElementById('player-2-going').appendChild(span4);
    document.getElementById('player-2-going').appendChild(span2);

    

}

let button100 = document.getElementById('testingbutton');
button100.addEventListener('click', startGame);



document.getElementById('move1').addEventListener('click', ()=> attack(player1data[0], player2data[0], getDamage(player1data[5])) )

document.getElementById('move2').addEventListener('click', () => attack(player1data[0], player2data[0], getDamage(player1data[6])))

document.getElementById('move3').addEventListener('click', () => attack(player1data[0], player2data[0], getDamage(player1data[7])))

document.getElementById('move4').addEventListener('click', () => attack(player1data[0], player2data[0], getDamage(player1data[8])))


function attack(attacker, defender, move) {
    let damage = 0;

    move.then(data => {
        console.log(data);
        console.log(data[1])
        console.log(data[0])
        if (!!data[1]){
            damage = data[1]
        }
    });

    document.getElementById('desc').style.border = '1px solid white'
    
    move.then(data => document.getElementById('desc').innerHTML = attacker + ' used ' + data[0] + ' on ' + defender + '!' ).then(() => document.getElementById('battlehp2').innerHTML -= damage ).then(()=> {
        if (document.getElementById('battlehp2').innerHTML <= 0){
            // document.getElementById('desc').innerHTML = attacker + ' Won! ' + ' Please refresh page to start a new battle!'
            let name = attacker.toUpperCase()

            setTimeout(() => window.location.reload(), 1000);

            alert(name + ' WON!')

        }
        else{
            setTimeout(() => enemyAttack(defender, attacker), 1500)
        }
    })

    
}


function enemyAttack(attacker, defender){

    let battlemove = player2moves[Math.floor(Math.random() * player2moves.length)]

    let damage = 0;

    getDamage(battlemove).then(data => {

        if (!!data[1]) {
            damage = data[1]
        }
    });

    getDamage(battlemove).then(data => document.getElementById('desc').innerHTML = attacker + ' used ' + battlemove + ' on ' + defender + '!').then(() => document.getElementById('battlehp1').innerHTML -= damage ).then(()=> {
        if (document.getElementById('battlehp1').innerHTML <= 0) {
            // document.getElementById('desc').innerHTML = attacker + ' Won! ' + ' Please refresh page to start a new battle!'
            let name = attacker.toUpperCase()
            setTimeout(() => window.location.reload(), 1000)

            alert(name + ' WON!');


        }
    })

    
}

}

main();














