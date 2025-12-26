import mongoose from "mongoose";

const pokemonSchema = new mongoose.Schema(
  {
    pokeApiId: {
      type: Number,
      required: true,
      unique: true,
    },
    name: {
      type: String,
      required: true,
    },
    imageUrl: {
      type: String,
      required: true,
    },
    types: {
      type: [String],
      required: true,
    },
    stats: {
      hp: { type: Number, required: true },
      attack: { type: Number, required: true },
      defense: { type: Number, required: true },
      specialAttack: { type: Number, required: true },
      specialDefense: { type: Number, required: true },
      speed: { type: Number, required: true },
    },
  },
  {
    timestamps: true,
  }
);

export const Pokemon = mongoose.model("Pokemon", pokemonSchema);
