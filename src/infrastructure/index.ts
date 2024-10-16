import express from "express";
import { config } from "./config/config.ts";

const app = express();

app.use(express.json());

// Endpoints

// Launch server
const PORT = config.port || 8000;
app.listen(PORT, () => {
  console.log(`🚀 Server launched on http://localhost:${PORT}`);
});
