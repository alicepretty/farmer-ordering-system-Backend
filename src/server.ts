import app from "./index";
import dbConnect from "./config/db.config";
import setPort from "./utils/setPort";
setPort();
dbConnect();
export default app;
