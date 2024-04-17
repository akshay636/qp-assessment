import router from "./route";
// creating a First layer route to add the other layers
export default function appRoutes(app) {
    app.use("/api/v1", router);
};