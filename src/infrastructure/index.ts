import express from "express";
import { config } from "./config/config.ts";
import zipCodeRoutes from "./routes/ZipCodeRoutes.ts";
import cors from "cors";

const app = express();

app.use(express.json());

app.use(cors({ origin: "http://localhost:5173" }));

// Endpoints
app.use("/api/v1/zipcodes", zipCodeRoutes);

// Launch server
const PORT = config.port || 8000;
app.listen(PORT, () => {
  console.log(`🚀 Server launched on http://localhost:${PORT}`);
});
