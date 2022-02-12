import express from 'express';
import cors from 'cors';
import { sequelize } from './src/constants/sequelize.js';
import { errorHandler } from './src/config/error-handler.js';
// import { authRouter } from './src/auth/auth.routes.js';
import { userRouter } from './src/user/user.routes.js';
import { placeRouter } from "./src/place/place.routes.js";
import { relations } from './src/models/index.js';
import { Role } from './src/role/role.model.js';
import { placeCategoryRouter } from "./src/placeCategory/placeCategory.routes.js";

const app = express();

const corsOptions = {
  origin: ['http://localhost:3000', 'http://localhost:3001', 'http://localhost:8081'],
};

app.use(cors(corsOptions));

app.use(express.json());

app.use(express.urlencoded({ extended: true }));

// database

sequelize.sync();
// sequelize.sync({ force: true }).then(() => {
//   console.log('Drop and Resync Database with { force: true }');
//   initial();
// });
relations();

// src.get('/', (req, res) => {
//   res.json({ message: 'Welcome to bezkoder application.' });
// });
// src.use(authRouter);
app.use(userRouter);
app.use(placeRouter);
app.use(placeCategoryRouter);
// src.use(subwayStationRouter);

app.use(errorHandler);
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});

function initial() {
  Role.create({ name: 'User', });
  Role.create({ name: 'Admin', });
}
