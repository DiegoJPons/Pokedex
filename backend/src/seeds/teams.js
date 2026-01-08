import mongoose from "mongoose";
import { Team } from "../models/team.model.js";
import { User } from "../models/user.model.js";
import { config } from "dotenv";

config();

const teams = [
  // Team size 1
  {
    name: "Solo Starter",
    pokemon: [
      {
        id: 1,
        name: "bulbasaur",
        types: ["grass", "poison"],
        imageUrl:
          "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/1.png",
      },
    ],
  },

  // Team size 2
  {
    name: "Electric Duo",
    pokemon: [
      {
        id: 25,
        name: "pikachu",
        types: ["electric"],
        imageUrl:
          "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/25.png",
      },
      {
        id: 26,
        name: "raichu",
        types: ["electric"],
        imageUrl:
          "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/26.png",
      },
    ],
  },

  // Team size 3
  {
    name: "Kanto Starters",
    pokemon: [
      {
        id: 1,
        name: "bulbasaur",
        types: ["grass", "poison"],
        imageUrl:
          "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/1.png",
      },
      {
        id: 4,
        name: "charmander",
        types: ["fire"],
        imageUrl:
          "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/4.png",
      },
      {
        id: 7,
        name: "squirtle",
        types: ["water"],
        imageUrl:
          "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/7.png",
      },
    ],
  },

  // Team size 4
  {
    name: "Mixed Four",
    pokemon: [
      {
        id: 10,
        name: "caterpie",
        types: ["bug"],
        imageUrl:
          "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/10.png",
      },
      {
        id: 16,
        name: "pidgey",
        types: ["normal", "flying"],
        imageUrl:
          "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/16.png",
      },
      {
        id: 21,
        name: "spearow",
        types: ["normal", "flying"],
        imageUrl:
          "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/21.png",
      },
      {
        id: 39,
        name: "jigglypuff",
        types: ["normal", "fairy"],
        imageUrl:
          "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/39.png",
      },
    ],
  },

  // Team size 5
  {
    name: "Dragon Five",
    pokemon: [
      {
        id: 147,
        name: "dratini",
        types: ["dragon"],
        imageUrl:
          "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/147.png",
      },
      {
        id: 148,
        name: "dragonair",
        types: ["dragon"],
        imageUrl:
          "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/148.png",
      },
      {
        id: 149,
        name: "dragonite",
        types: ["dragon", "flying"],
        imageUrl:
          "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/149.png",
      },
      {
        id: 330,
        name: "flygon",
        types: ["ground", "dragon"],
        imageUrl:
          "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/330.png",
      },
      {
        id: 148,
        name: "gible",
        types: ["dragon", "ground"],
        imageUrl:
          "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/443.png",
      },
    ],
  },

  // Team size 6
  {
    name: "Ultimate Six",
    pokemon: [
      {
        id: 6,
        name: "charizard",
        types: ["fire", "flying"],
        imageUrl:
          "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/6.png",
      },
      {
        id: 9,
        name: "blastoise",
        types: ["water"],
        imageUrl:
          "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/9.png",
      },
      {
        id: 3,
        name: "venusaur",
        types: ["grass", "poison"],
        imageUrl:
          "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/3.png",
      },
      {
        id: 149,
        name: "dragonite",
        types: ["dragon", "flying"],
        imageUrl:
          "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/149.png",
      },
      {
        id: 150,
        name: "mewtwo",
        types: ["psychic"],
        imageUrl:
          "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/150.png",
      },
      {
        id: 151,
        name: "mew",
        types: ["psychic"],
        imageUrl:
          "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/151.png",
      },
    ],
  },
];

const seedTeams = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);

    const user = await User.findOne();
    if (!user) throw new Error("No user found to attach teams");

    await Team.deleteMany({});

    const userTeams = teams.map((team) => ({
      ...team,
      user: user._id,
    }));

    await Team.insertMany(userTeams);

    console.log("✅ Teams seeded successfully");
  } catch (error) {
    console.error("❌ Error seeding teams:", error);
  } finally {
    await mongoose.connection.close();
  }
};
seedTeams();
