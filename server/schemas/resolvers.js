//example of a resolvers file
const { User } = require('../models');
const bookSchema = require('../models/Book');
const { signToken, AuthenicationError } = require('../utils/auth');

const resolvers = {
  Query: 
  {
    users: async () => {
      return await User.find().populate('savedBooks');
    },
    user: async (parent, { username }) => {
      return await User.findOne({ username }).populate('savedBooks');
    },
    me: async (parent, { context }) => {
      if (context.user) {
        return await User.findOne({_id: context.user._id}).populate('savedBooks');
      }
      throw new AuthenicationError('You need to be logged in!');
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
      
      if (!user) {
        throw AuthenicationError;
      }
      
      const correctPswd = await user.isCorrectPassword(password);
      if (!correctPswd) {
        throw AuthenicationError;
      }

      const token = signToken(user);

      return { token, user };
    },
    addSavedBooks: async (parent, { bookId }, context) => {
      if (context.user) {
        const savedBooks = await Book.create({
          authors,
          description,
          createdAt,
          bookId,
          image,
          link,
          title,
        });
        
        await User.findOneAndUpdate(
          {_id: context.user_id },
          { $addToSet: {savedBooks: savedBooks.bookId}}
          );

        return book;  
      }
      throw AuthenicationError;
      ('you need to be logged in!');
    },

     removeSavedBooks: async (parent, {savedBooksId }, context) => {
      if (context.user) {
        const savedBooks = await Book.findOneAndDelete(
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
