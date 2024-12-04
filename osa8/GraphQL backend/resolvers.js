const { GraphQLError } = require('graphql')
const jwt = require('jsonwebtoken')
const { PubSub } = require('graphql-subscriptions')
const bcrypt = require('bcrypt')
const Book = require('./models/Book_model')
const User = require('./models/User_model')
const Author = require('./models/Author_model')
const { PubSubAsyncIterableIterator } = require('graphql-subscriptions/dist/pubsub-async-iterable-iterator')

const pubsub = new PubSub()
const resolvers = {
    Query: {
      me: (root, args, context) => {
        const currentUser = context.currentUser
          if (!currentUser) {
            throw new GraphQLError('not authenticated', {
              extensions: {
                code: 'BAD_USER_INPUT',
              }
            })
          }
        return currentUser
      },
      bookCount: () => Book.collection.countDocuments(),
      authorCount: () => Author.collection.countDocuments(),
      allBooks: async (root,args) => {
        let res = await Book.find({}).populate('author',{name:1,born:1,id:1})
        console.log(res)
        if (!args){
          return res
        }
        if (args.author){
          const byauthor = (book) =>      
            args.author === book.author.name ? book : !book 
          console.log(res)
          res = res.filter(byauthor)
          
        }
        
        if (args.genre){
          const bygenre = book => {
            if (book.genres.includes(args.genre)){
              return book
            }
          }
          res = res.filter(bygenre)
        }
        return res
        
      },
      allAuthors: async (root,args) => {
        const authors = await Author.find({})
        return authors
      }
    },
    Subscription: {
      bookAdded: {
        subscribe: () => pubsub.asyncIterableIterator('BOOK_ADDED')
      },
    },
    Mutation: {
        addBook: async (root,args,context) => {
          const currentUser = context.currentUser
          if (!currentUser) {
            throw new GraphQLError('not authenticated', {
              extensions: {
                code: 'BAD_USER_INPUT',
              }
            })
          }
          const name = args.author
          const author = await Author.findOne({ name })
          
          if (author != null){
            console.log("null juu")
            const newBook = new Book({
              title:args.title,
              author:author,
              published:args.published,
              genres:args.genres, 
              })
            try {
                const savedbook = await newBook.save()
                pubsub.publish('BOOK_ADDED',{bookAdded:savedbook})
                author.books.push(args.title)
                console.log(author)
                const saveauthor = await Author.findOneAndUpdate({name},{books:author.books})
                console.log(saveauthor)
                return newBook
            }catch (error){
                console.log(error)
                return error
                  }
            
              
              
          
            }else{
            const newAuthor = new Author({name:args.author,books:[args.title]})
            await newAuthor.save()

            const newBook = new Book({
                title:args.title,
                author:newAuthor,
                published:args.published,
                genres:args.genres, 
                })
            try {
              await newBook.save()
              
              
              pubsub.publish('BOOK_ADDED',{bookAdded:newBook})
              return newBook
            }catch (error){
              return error
              }
          
            }
      },
      editAuthor: async (root,args,context) => {
        console.log(args)
        console.log(context)
        const currentUser = context.currentUser
        console.log(currentUser)
        if (!currentUser) {
          throw new GraphQLError('not authenticated', {
            extensions: {
              code: 'BAD_USER_INPUT',
            }
          })
        }
        const filter = {name:args.name}
        const update = {born:args.setBornTo}
        const res = await Author.findOneAndUpdate(filter,update,{new:true,rawResult: true})
        return res
        
      },
      createUser: async (root,args) => {
        const salt_rounds = 10
        const passwordHash = await bcrypt.hash(args.password,salt_rounds)
        const user = new User({ username: args.username, password_hash: passwordHash,favoriteGenre:args.favoriteGenre})
        return user.save()
        .catch(error => {
          throw new GraphQLError('Creating the user failed', {
            extensions: {
              code: 'BAD_USER_INPUT',
              invalidArgs: args.username,
              error
            }
          })
        })
    },
    login: async (root, args) => {
      const user = await User.findOne({ username: args.username })
      const password_correct = user === null
      ? false
      : await bcrypt.compare(args.password,user.password_hash)
      
      if ( !user || !password_correct) {
        throw new GraphQLError('wrong credentials', {
          extensions: {
            code: 'BAD_USER_INPUT'
          }
        })        
      }
      console.log(user)
      const userForToken = {
        username: user.username,
        id: user._id,
      }
      
      return { value: jwt.sign(userForToken, process.env.JWT_SECRET) }
    }},
    
  }
module.exports = resolvers