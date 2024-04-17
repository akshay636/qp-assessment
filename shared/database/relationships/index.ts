import { User } from "../models";
import Role from "../models/Role";
import Order from "../models/Order";
import OrderItem from "../models/OrderItem";
import UserRoles from "../models/UserRoles";

User.belongsToMany(Role, {
  through: UserRoles,
  foreignKey: "userUuid",
});

Role.belongsToMany(User, {
  through: UserRoles,
  foreignKey: "roleUuid",
});

Order.hasMany(OrderItem);
OrderItem.belongsTo(Order);