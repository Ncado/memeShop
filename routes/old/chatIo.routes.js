const config = require('config')
const express = require('express')
const app = express();
const http = require('http');
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server);
const { Router } = require('express');
const mongoose = require('mongoose')
const ws = require('ws');
const socketIo = require('socket.io')
const PORT = config.get('port') || 5000
const router = Router();

router.get('/ChatIo', async (req, res) => {
    
	try {
		io.on('connection', (socket) => {
            console.log('a user connected');
          });
          
          server.listen(PORT, () => {
            console.log(`listening on *:${PORT}`);
          });
        
		
        res.set('Access-Control-Allow-Origin', '*');
	} catch (e) {
		res.status(500).json({ message: e+"    errr" })
	}
})