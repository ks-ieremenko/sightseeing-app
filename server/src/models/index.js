import { User } from '../user/user.model.js';
import { Role } from '../role/role.model.js';
import { PlaceCategory } from "../placeCategory/placeCategory.model.js";
import { Place } from "../place/place.model.js";

export const relations = async () => {
  await Role.hasMany(User);
  await User.belongsTo(Role);
  await PlaceCategory.hasMany(Place);
  await Place.belongsTo(PlaceCategory);
};
