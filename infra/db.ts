import * as mongoose from "mongoose";

class Database {
  // private DB_URL = "mongodb://localhost:27017/db_portal";
  // private DB_URL = "mongodb://link-db/db_portal";
  private DB_URL = "mongodb://apistsnoticias:0ENH6BZEvjOEy8SeM42dPTJlXGcdOTwBbzmFVOdD1vatVboOb4HJyviGJZpkOvCVEOt8grBnpWpOeGyaOo4kdQ%3D%3D@apistsnoticias.mongo.cosmos.azure.com:10255/?ssl=true&retrywrites=false&maxIdleTimeMS=120000&appName=@apistsnoticias@"
  
  createConnection() {
    mongoose.connect(this.DB_URL);
  }
}

export default Database;