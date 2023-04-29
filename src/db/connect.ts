import mongoose from 'mongoose';

const url = `mongodb+srv://alex:Qazwsxedc11123@cluster0.8sczgfl.mongodb.net/sahar?retryWrites=true&w=majority`;
mongoose.connect(url);
mongoose.connection.on('connected', () => {
	console.log('DataBase status: connect');
});
mongoose.connection.on('error', () => {
	console.log('error connection DataBase');
})