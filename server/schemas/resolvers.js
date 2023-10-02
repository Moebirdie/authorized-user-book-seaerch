//example of a resolvers file
const { User } = require('../models');
const bookSchema = require('../models/Book')
const { signToken, AuthenticationError } = require('../utils/auth');


const resolvers = {
  Query: 
  {
    users: async () => {
      return await User.find().populate('savedBooks');
    },
    user: async (parent,{ _id }) => {
      return User.findOne( { _id} ).populate('savedBooks');
    },
    me: async (parent, args, context ) => {
      if (context.user) {
        return await User.findOne({_id: context.user._id}).populate('savedBooks');
      }
      throw new AuthenticationError('You need to be logged in!');
    },
  },

  Mutation: {
    createUser: async (parent, { username, email, password }) => {
      const user = await User.create({ username, email, password });
      const token = signToken(user);
      return { token, user };
    },
    login: async (parent, { email, password }) => {
      const user = await User.findOne({email});
      console.log(user);
      if (!user) {
        throw AuthenticationError;
      }
      
      const correctPswd = await user.isCorrectPassword(password);
      console.log(correctPswd);
      if (!correctPswd) {
        throw AuthenticationError;
      }

      const token = signToken(user);
      console.log(user);
      return { token, user };
    },
   addSavedBooks: async (parent, { saveBookData }, context) => {

      if (context.user) {
        const savedBook = await bookSchema.create(saveBookData);
               
        await User.findOneAndUpdate(
          {_id: context.user_id },
          { $addToSet: {savedBooks: savedBook}}
          );

        return savedBook;  
      }
      throw AuthenticationError;
    },

     removeSavedBooks: async (parent, {savedBooksId }, context) => {
      if (context.user) {
        const savedBooks = await bookSchema.findOneAndDelete(
          { bookId: savedBooksId},
        );
      
        await User.fineOneAndUpdate(
          { _id: context.user._id },
          { $pull: { savedBooks: savedBooks.bookId}}
          );
        
        return book;  
      }
      throw AuthenticationError;
    },
  },
};

module.exports = resolvers;
