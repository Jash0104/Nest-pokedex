import { BadRequestException, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { isValidObjectId, Model } from 'mongoose';

import { CreatePokemonDto } from './dto/create-pokemon.dto';
import { UpdatePokemonDto } from './dto/update-pokemon.dto';
import { Pokemon } from './entities/pokemon.entity';

@Injectable()
export class PokemonService {

  constructor (

    @InjectModel( Pokemon.name )
    private readonly pokemonModel: Model<Pokemon>

  ) {}

  async create(createPokemonDto: CreatePokemonDto) {
    
    try {
      createPokemonDto.name = createPokemonDto.name.toLowerCase()
  
      const pokemon = await this.pokemonModel.create( createPokemonDto )
      
      return pokemon
      
    } catch (error) {
      this.handleExceptions(error)
    }

  }

  findAll() {
    return `This action returns all pokemon`;
  }

  async findOne(term: string) {
    let pokemon: Pokemon;
    
    if ( !isNaN(+term) ) {
      pokemon = await this.pokemonModel.findOne({ no: term })
    }

    // MongoID
    if ( isValidObjectId( term ) ) {
      pokemon = await this.pokemonModel.findById( term )
    }

    // Name
    if ( !pokemon ) {
      pokemon = await this.pokemonModel.findOne({ name: term.toLocaleLowerCase().trim() })
    }

    if ( !pokemon ) 
      throw new NotFoundException(`Pokemon with id, name or no: ${term} not found`)


    return pokemon
  }

  async update(term: string, updatePokemonDto: UpdatePokemonDto) {

    const pokemon = await this.findOne( term )

    try {
      if ( updatePokemonDto.name )
        updatePokemonDto.name = updatePokemonDto.name.toLowerCase()
  
      await pokemon.updateOne( updatePokemonDto, {
        new: true
      })
  
      return { ...pokemon.toJSON(), ...updatePokemonDto}

    } catch (error) {
      this.handleExceptions(error)
    }
    
  }

  async remove(id: string) {
    // const pokemon = await this.findOne( id )
    // await pokemon.deleteOne()
    const { deletedCount } = await this.pokemonModel.deleteOne({ _id: id })

    if ( deletedCount === 0)
      throw new BadRequestException(`There is no pokemon with id ${id}`)
    
    return {
      msg: 'Pokemon deleted correctly'
    }

  }


  private handleExceptions( error: any ) {
    if (error.code === 11000) 
      throw new BadRequestException(`This data is already been in use ${ JSON.stringify( error.keyValue ) }`)
    
    throw new InternalServerErrorException(`Can't do this action - Please check server logs`)
  }
}
