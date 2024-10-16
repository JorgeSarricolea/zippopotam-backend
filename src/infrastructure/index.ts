import express from "express";
import { config } from "./config/config.ts";
import zipCodeRoutes from "./routes/ZipCodeRoutes.ts";

const app = express();

app.use(express.json());

// Endpoints
app.use("/api/v1/zipcodes", zipCodeRoutes);

// Launch server
const PORT = config.port || 8000;
app.listen(PORT, () => {
  console.log(`🚀 Server launched on http://localhost:${PORT}`);
});
