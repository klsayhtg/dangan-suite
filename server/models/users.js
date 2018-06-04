import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

const Schema = mongoose.Schema;

const Users = new Schema({
  username: String,
  password: String,
  created: { type: Date, default: Date.now }
});

// generates hash
Users.methods.generateHash = function(password) {
  return bcrypt.hashSync(password, 8);
};

// compares the password
Users.methods.validateHash = function(password) {
  return bcrypt.compareSync(password, this.password);
};

export default mongoose.model('users', Users);