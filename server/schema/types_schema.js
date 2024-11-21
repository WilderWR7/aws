const {GraphQLSchema, GraphQLNonNull, GraphQLObjectType, GraphQLID, GraphQLString, GraphQLInt, GraphQLBoolean, GraphQLFloat} = require('graphql');

//Scalar Type
/*
    String = GraphQLString
    int
    Float
    Boolean
    ID
*/

const Person = new GraphQLObjectType({
    name: 'Person',
    description: 'Person description',
    fields: () => ({
        id: {type: GraphQLID},
        name: {type: new GraphQLNonNull(GraphQLString)},
        age: {type: new GraphQLNonNull(GraphQLInt)},
        isMarried: {type: GraphQLBoolean},
        gpa: {type: GraphQLFloat},
        justAType: {
            type: Person,
            resolve(parent, args) {
                return parent
            } 
        }
    }) 
})


//RootQuery
const RootQuery =  new GraphQLObjectType({
    name: 'RootQueryType',
    description: 'Description',
    fields: {
        person: {
            type: Person,
            resolve(parent, args) {
                let personObj = {
                    name: 'Antonio', 
                    age: 25,
                    isMarried: false,
                    gpa: 4.0
                };
                return personObj
            }
        }
    }
})

module.exports = new GraphQLSchema({
    query: RootQuery,
});