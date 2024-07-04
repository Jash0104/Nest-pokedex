import { Injectable } from '@nestjs/common';
import axios, { AxiosInstance } from 'axios';
import { PokeAPIResponse } from './interface/poke-api-response.interface';

@Injectable()
export class SeedService {

  // private readonly axios: AxiosInstance;

  // const { data } = await axios.get<PokeAPIResponse>('https://pokeapi.co/api/v2/pokemon?limit=50') as { data: PokeAPIResponse}
  async executeSeed() {

    const { data } = await axios.get<PokeAPIResponse>('https://pokeapi.co/api/v2/pokemon?limit=5')
    
    const pokemons = data.results.map(({ name, url }, index) => {
      const urlSplits = url.split("/")
      return {
        name,
        no: +urlSplits[urlSplits.length - 2]
      }
    })

    return pokemons
  }
}
