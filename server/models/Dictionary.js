import mongoose from 'mongoose';

const Dictionary = new mongoose.Schema({
    userId: { type: String, required: true },
    title: { type: String, required: true },
    tags: { type: String, required: true },
    description: { type: String, required: true, default: '' },
    words: { type: Object, required: true, default: {} }
});

export default mongoose.model('Dictionary', Dictionary);