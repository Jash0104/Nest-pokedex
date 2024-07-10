import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import axios from 'axios';

import { Pokemon } from 'src/pokemon/entities/pokemon.entity';
import { PokeAPIResponse } from './interface/poke-api-response.interface';
import { AxiosAdapter } from 'src/common/adapters/axios.adapter';

@Injectable()
export class SeedService {

  constructor(
    @InjectModel( Pokemon.name )
    private readonly pokemonModel: Model<Pokemon>,
    private readonly http: AxiosAdapter
  ){}

  // const { data } = await axios.get<PokeAPIResponse>('https://pokeapi.co/api/v2/pokemon?limit=50') as { data: PokeAPIResponse}
  async executeSeed() {

    await this.pokemonModel.deleteMany({})

    const data = await this.http.get<PokeAPIResponse>('https://pokeapi.co/api/v2/pokemon?limit=650')
    
    let pokemonsToInsert: { name: string, no: number}[] = []

    data.results.map(({ name, url }) => {
      const urlSplits = url.split("/")
      pokemonsToInsert.push({
        name,
        no: +urlSplits[urlSplits.length - 2]
      })
    })

    // let promisesArray = []

    // for (const pokemon of pokemons) {
    //   promisesArray.push( this.pokemonModel.create( pokemon ) )
    // }

    // await Promise.all(promisesArray)

    await this.pokemonModel.insertMany(pokemonsToInsert)

    return {
      msg: "Data base succesfully poblated"
    }
  }
}
