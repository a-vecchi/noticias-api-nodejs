import newsService from "../services/newsService";

const resolvers = {

    newslist: async () => await newsService.get(),

    newsGetById: async (args) => {
        return await newsService.getById(args.id);
    },

    addNews: async (args) => {
        return await newsService.create(args.input);
    },

    deleteNews: async (args) => {
        return await newsService.delete(args.id);
    },

    updateNews: async (args) => {
        return await newsService.update(args.input._id, args.input);
    }
};

export default resolvers;