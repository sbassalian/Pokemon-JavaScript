

const pokemon = [];

export async function getPokemon(){
    for (let i = 1; i < 200; i++) {
   
        const url = `https://pokeapi.co/api/v2/pokemon/${i}`

        await fetch(url).then(res => res.json()).then
            (data => {
                let obj = {};
                obj['name'] = data.name;
                obj['front'] = data.sprites.front_default;
                obj['back'] = data.sprites.back_default;
                obj['moves'] = [];
                data.moves.forEach((move) => {
                    let obj2 = {};

                    obj2[`${move.move.name}`] = (move.move);
                    obj['moves'].push(obj2);

                })

                obj['types'] = [];

                data.types.forEach((type) => {

                    obj.types.push(`${type.type.name}`)

                })
                
                obj['hp'] = data.stats[0].base_stat;
                
                
                // return obj;
                pokemon.push(obj)
            }
        )
        // .then((obj) => pokemon.push(obj))
        // .then(() => {if (pokemon.length === 9){return(pokemon)}});
    }

    return pokemon;
}

// const getMoves = () => {
//     const url2 = "https://pokeapi.co/api/v2/move/5/";
//     fetch(url2).then(res => res.json()).then(data => console.log(data));
// }

// my set up will make it so its first name, then power, then type of move

// export async function getDamage(){
//     let moveinfo = []
//     const url3 = "https://pokeapi.co/api/v2/move/89/";
//     await fetch(url3).then(res => res.json()).then(data => {
//         moveinfo.push(data.name);
//         moveinfo.push(data.power);
//         moveinfo.push(data.type.name);
//     })
//     // console.log(moveinfo);
// }


// getPokemon();
// getMoves();
// getDamage();


// module.exports = {getPokemon}

