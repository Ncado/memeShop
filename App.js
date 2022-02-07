const config = require('config')
const express = require('express')
const app = express();


const { createServer } = require("http");
const httpServer = createServer(app);

const { Server } = require("socket.io");
const cors = require('cors')


const path = require('path')
const mongoose = require('mongoose');
const fileUpload = require('express-fileupload');



app.use(express.static(path.resolve(__dirname, 'static')))

app.use(express.json({ extended: true }))
app.use(fileUpload({}))
app.use('/api/auth', require('./routes/auth.routes'));
app.use('/api/art', require('./routes/Art.routes'));
app.use('/api/comment', require('./routes/Comment.routes'));
app.use('/api/favourite', require('./routes/Favourite.routes'));
//app.use('/api/basket', require('./routes/Basket.routes'))

//app.use("/api/chat",require("./routes/chatIo.routes"))


const PORT = config.get('port') || 5000

async function start() {
	try {
		await mongoose.connect(config.get('mongoUri'), {
			useNewUrlParser: true,
			useUnifiedTopology: true,


		})



	

		httpServer.listen(PORT);
		console.log(`listening on *:${PORT}`)
		

	}
	catch (e) {
		console.log('Server Eror', e.message)
		process.exit(1);
	}
}
start()