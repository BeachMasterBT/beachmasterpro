import mongoose from 'mongoose';
import User from '../models/User.js';
import dotenv from 'dotenv';

dotenv.config();

const seedData = async () => {
  await mongoose.connect(process.env.MONGO_URI);
  
  // Aqui a IA coloca os dados que você enviou nos CSVs
  const atletasIniciais = [
    { name: "Joao Silva", email: "joao@email.com", role: "athlete" },
    { name: "Maria BT", email: "maria@email.com", role: "athlete" }
  ];

  await User.deleteMany();
  await User.insertMany(atletasIniciais);

  console.log("Banco de dados abastecido com sucesso!");
  process.exit();
};

seedData();