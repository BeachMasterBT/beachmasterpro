import mongoose from "mongoose";

const connectDatabase = async () => {
  try {
    mongoose.set("strictQuery", true);

    await mongoose.connect(process.env.MONGODB_URI, {
      autoIndex: false,
      serverSelectionTimeoutMS: 5000
    });

    console.log("✅ Banco de dados conectado com sucesso");

    mongoose.connection.on("error", (err) => {
      console.error("❌ Erro no MongoDB:", err.message);
    });

    mongoose.connection.on("disconnected", () => {
      console.warn("⚠️ MongoDB desconectado");
    });

    process.on("SIGINT", async () => {
      await mongoose.connection.close();
      console.log("🔒 Conexão MongoDB encerrada");
      process.exit(0);
    });

  } catch (error) {
    console.error("🔥 Falha crítica ao conectar no banco:", error.message);
    process.exit(1);
  }
};

export default connectDatabase;
