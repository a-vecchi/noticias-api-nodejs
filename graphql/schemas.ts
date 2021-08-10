import newsType from "./types/newsType";

const {buildSchema} = require('graphql');

const schemas = buildSchema(
    newsType
)

export default schemas;