const {
    GraphQLObjectType,
    GraphQLID,
    GraphQLString,
    GraphQLInt,
    GraphQLSchema,
    GraphQLList
} = require('graphql');
var _ = require('lodash');
//escribe data falsa para UserType
const usersData = [
    {id:'1', name: 'test one', age: 12, profession: 'test 1'},
    {id:'2', name: 'test two', age: 13, profession: 'test 2'},
    {id:'3', name: 'test three', age: 14, profession: 'test 3'},
    {id:'4', name: 'test four', age: 15, profession: 'test 4'},
    {id:'5', name: 'test five', age: 17, profession: 'test 5'}
]

const hobbiesData = [
    {id: '1',title: 'Garcia',description: 'brown', userId: '5'},
    {id: '2',title: 'Hurst',description: 'brown', userId: '1'},
    {id: '3',title: 'Estella',description: 'blue', userId: '2'},
    {id: '15',title: 'Ida',description: 'blue', userId: '3'},
    {id: '30',title: 'Soto',description: 'blue', userId: '1'}
]
const postsData = [
    {id: '0',comment: 'Terrell', userId: '1'},
    {id: '1',comment: 'Ida', userId: '1'},
    {id: '2',comment: 'Morrison', userId: '2'},
    {id: '3',comment: 'Marie', userId: '3'},
    {id: '4',comment: 'Charmaine', userId: '4'}
]

const UserType = new GraphQLObjectType({
    name: 'User',
    description : 'Documentation for user ...',
    fields: () => ({
        id: {type: GraphQLID},
        name: {type: GraphQLString},
        age: {type: GraphQLInt},
        profession: {type: GraphQLString},
        posts: {
            type: new GraphQLList(PostType),
            resolve(parent, args) {
                return _.filter(postsData, {userId: parent.id});
            }
        },
        hobbies: {
            type: new GraphQLList(HobbyType),
            resolve(parent, args) {
                return _.filter(hobbiesData, {userId: parent.id})
            }
        }
    })
});

const HobbyType = new GraphQLObjectType({
    name: 'Hobby',
    description : 'Hobby description',
    fields: () => ({
        id: {type: GraphQLID},
        title: {type: GraphQLString},
        description : {type: GraphQLString},
        user: {
            type: UserType,
            resolve(parent, args) {
                return _.find(usersData, {id: parent.userId});
            } 
        }
    })
});

const PostType = new GraphQLObjectType({
    name : 'Post',
    description : 'Post description',
    fields: () => ({
        id: {type: GraphQLID},
        comment : {type: GraphQLString},
        user: {
            type: UserType,
            resolve(parent, args) {
                return _.find(usersData, {id: parent.userId});
            }
        }
    })
});

//RootQuery
const RootQuery = new GraphQLObjectType({
    name: 'RootQueryType',
    description: 'Description',
    fields: {
        user: {
            type: UserType,
            args: {
                id: {type: GraphQLString}
            },
            resolve(parent, args) {
                //we resolve whit data
                //get and return data form a datasource
                return _.find(usersData, {id: args.id});
            }
        },
        users: {
            type: new GraphQLList(UserType),
            resolve(parent, args) {
                return usersData;
            }
        },
        hobby : {
            type: HobbyType,
            args: {
                id: {type: GraphQLString}
            },
            resolve(parent, args) {
                return _.find(hobbiesData, {id: args.id});
            }
        },
        hobbies: {
            type: new GraphQLList(HobbyType),
            resolve(parent, args) {
                return hobbiesData;
            }
        },
        post : {
            type: PostType,
            args: {
                id: {type: GraphQLString}
            },
            resolve(parent, args) {
                return _.find(postsData, {id: args.id});
            }
        },
        posts: {
            type: new GraphQLList(PostType),
            resolve(parent, args) {
                return postsData;
            }
        }
    }
}); 


//Mutations
const Mutation = new GraphQLObjectType({
    name: 'Mutation',
    fields: {
        createUser: {
            type: UserType,
            args: {
                name: {type: GraphQLString},
                age: {type: GraphQLInt},
                profession: {type: GraphQLString}
            },
            resolve(parent, args) {
                let user = {
                    id: usersData.length + 1,
                    name: args.name,
                    age: args.age,
                    profession: args.profession
                }
                usersData.push(user);
                return user;
            }
        },
        createPost: {
            type: PostType,
            args: {
                // id: {type: GraphQLID},
                comment: {type: GraphQLString},
                userId: {type: GraphQLID}
            },
            resolve(parent, args) {
                let post = {
                    id: postsData.length + 1,
                    comment: args.comment,
                    userId: args.userId
                }
                return post;
            }
        },
        createHobby: {
            type: HobbyType,
            args: {
                title: {type: GraphQLString},
                description: {type: GraphQLString},
                userId: {type: GraphQLID}
            },
            resolve(parent, args) {
                let hobby = {
                    id: hobbiesData.length + 1,
                    title: args.title,
                    description: args.description,
                    userId: args.userId
                }
                return hobby;
            }
        }
    }
});

module.exports = new GraphQLSchema({
    query: RootQuery,
    mutation: Mutation
});