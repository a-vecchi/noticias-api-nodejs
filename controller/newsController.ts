import * as HttpStatus from "http-status";
import * as redis from "redis";

import NewsService from "../services/newsService";
import Helper from "../infra/helper";
import exportFiles from "../infra/exportFiles";
import auth from "../infra/auth";

class NewsController {

  async get(req, res) {
    console.log("carregando redis");
    // let client = redis.createClient();
    // let client = redis.createClient(6379, "redis");
    var client = redis.createClient(6380, "apitsnoticias.redis.cache.windows.net",
      { auth_pass: "TB2UhNEme9pn5TmXFbLsNJ5TdEyUQJ9vxSZvCCVAf6U=", tls: { servername: "apitsnoticias.redis.cache.windows.net" } });


    await client.get("news", async function (err, reply) {
      try {

        if (reply) {
          console.log("redis");
          Helper.sendResponse(res, HttpStatus.OK, JSON.parse(reply));
        } else {
          console.log("db");
          let response = await NewsService.get();

          client.set("news", JSON.stringify(response));
          client.expire("news", 20);
          Helper.sendResponse(res, HttpStatus.OK, response);
        }

      } catch (error) {
        console.error(error);
      }
    });
  }

  async getById(req, res) {
    try {
      const _id = req.params.id;
      let response = await NewsService.getById(_id);

      Helper.sendResponse(res, HttpStatus.OK, response);
    } catch (error) {
      console.error(error);
    }
  }

  async search(req, res) {
    try {
      const term = req.params.term;
      const page = (req.param('page')) ? parseInt(req.param('page')) : 1;
      const perPage = (req.param('limit')) ? parseInt(req.param('limit')) : 10;

      let response = await NewsService.search(term, page, perPage);

      Helper.sendResponse(res, HttpStatus.OK, response);
    } catch (error) {
      console.error(error);
    }
  }

  async exportToCsv(req, res) {
    try {
      let response = await NewsService.get();
      let filename = exportFiles.tocsv(response);

      Helper.sendResponse(res, HttpStatus.OK, req.get('host') + "/exports/" + filename);
    } catch (error) {
      console.error(error);
    }
  }

  async create(req, res) {
    try {
      let vm = req.body;

      // console.log(vm);
      NewsService.create(vm);
      Helper.sendResponse(res, HttpStatus.OK, "Noticia cadastrada com sucesso!");
    } catch (error) {
      console.error(error);
    }
  }

  async update(req, res) {
    try {
      const _id = req.params.id;
      let news = req.body;

      await NewsService.update(_id, news);
      Helper.sendResponse(res, HttpStatus.OK, "Notícia foi atualiza com sucesso!");
    } catch (error) {
      console.error(error);
    }
  }

  async delete(req, res) {
    try {
      const _id = req.params.id;
      await NewsService.delete(_id);
      Helper.sendResponse(res, HttpStatus.OK, "Noticia deletada com sucesso!");
    } catch (error) {
      console.error(error);
    }
  }
}

export default new NewsController();
