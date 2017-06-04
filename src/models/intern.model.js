import mongoose from 'mongoose';
import User from './user.model';
const Schema = mongoose.Schema;

const InternSchema = new Schema({
    resume: String,
    education: String,
    qualification: String,
    skills: [{title: String}],
    certificates: [{title: String, description: String}],
    access_to_vehicle: Boolean,
    languages: [{name: String}]
});

module.exports = mongoose.model('intern', InternSchema);
