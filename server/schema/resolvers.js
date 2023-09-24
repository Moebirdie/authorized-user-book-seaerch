//example of a resolvers file
const { User } = require('../models');
const bookSchema = require('../models/Book');
const { signToken, AuthenicationError } = require('../utils/auth');

const resolvers = {
  Query: 
  {
    users: async () => {
      return User.find().populate('savedBooks');
    },
    user: async (parent, { username }) => {
      return User.findOne({ username }).populate('savedBooks');
    },
    savedBooks: async (parent, { username }) => {
      const params = username ? { username }: {};
      return bookSchema.find(params).sort({createdAt: -1 });
    },
    me: async (parent, { context }) => {
      if (context.user) {
        return User.findOne({_id: context.user._id}).populate('savedBooks');
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
        throw AuthenticationError;
      }

      const token = signToken(user);

      return { token, user };
    },
    addSavedBooks: async (parent, { savedBookId }, context) => {
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
          { $addToSet: {savedBooks: book._id}}
          );

        return book;  
      }
      throw AuthenticationError;
      ('you need to be logged in!');
    },

     removeSavedBooks: async (parent, {savedBooksId }, context) => {
      if (context.user) {
        const savedBook = await Book.findOneAndDelete(
          { _id: savedBooksId},
        );
      
        await User.fineOneAndUpdate(
          { _id: context.user._id },
          { $pull: { savedBooks: book._id}}
          );
        
        return book;  
      }
      throw AuthenticationError;
    },
  },
};

module.exports = resolvers;
