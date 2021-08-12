import * as express from "express";
import * as bodyParser from "body-parser";
import * as cors from "cors";
import * as compression from "compression";
import { graphqlHTTP } from "express-graphql";
import * as appInsights from "applicationinsights";

import Database from "./infra/db";
import auth from "./infra/auth";
import uploads from "./infra/uploads-old";
import newsRouter from "./router/newsRouter";
import schemas from "./graphql/schemas";
import resolvers from "./graphql/resolvers";


class StartUp {

  public app: express.Application;
  private _db: Database;
  private bodyParser;

  constructor() {
    this.app = express();
    this._db = new Database();
    this._db.createConnection();
    this.middler();
    this.routes();
    this.monitoramento();
  }

  enableCors() {
    const options: cors.CorsOptions = {
      methods: "GET, OPTIONS, PUT, POST, DELETE",
      origin: "*" // "https://teste.net"
    }
    this.app.use(cors(options));
  }

  monitoramento() {
    appInsights.setup('a9f30609-2755-4799-8735-2117d30420d4').start();
  }

  middler() {
    this.enableCors();
    this.app.use(bodyParser.json());
    this.app.use(bodyParser.urlencoded({ extended: false }));
    this.app.use(compression());
    this.app.use('/exports', express.static(process.cwd() + '/exports'));
  }

  routes() {
    this.app.route("/").get((req, res) => {
      res.send({ versao: "0.0.1" });
    });

    this.app.route("/uploads").post(uploads.single("file"), (req, res) => {
      try {
        res.send("Arquivo enviado com sucesso.");
      } catch (error) {
        console.log(error);
      }
    });

    // this.app.use(auth.validate);

    this.app.use('/graphql', graphqlHTTP({
      schema: schemas,
      rootValue: resolvers,
      graphiql: true
    }))

    // news
    this.app.use("/", newsRouter);
  }
}

export default new StartUp();
