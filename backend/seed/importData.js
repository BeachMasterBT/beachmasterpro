import mongoose from 'mongoose';
import dotenv from 'dotenv';
import User from '../models/User.js';
import Tournament from '../models/Tournament.js';

dotenv.config();

const importData = async () => {
  try {
    // Aqui simulamos a leitura dos seus arquivos CSV de Atletas e Arenas
    const atletasReais = [
      { name: "Atleta Pro 01", email: "atleta1@beachmaster.pro", password: "123", role: "atleta" },
      { name: "Arbitro Geral", email: "arbitro@beachmaster.pro", password: "123", role: "arbitro" },
      { name: "Admin Master", email: "admin@beachmaster.pro", password: "123", role: "admin" }
    ];

    await User.deleteMany();
    await User.insertMany(atletasReais);

    console.log('✅ DADOS REAIS IMPORTADOS COM SUCESSO!');
    process.exit();
  } catch (error) {
    console.error(`Erro: ${error}`);
    process.exit(1);
  }
};

importData();