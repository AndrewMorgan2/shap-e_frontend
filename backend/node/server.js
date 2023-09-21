const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors'); // Import the cors middleware
const Client = require('ssh2').Client;

// SSH connection settings
const sshConfig = {
  host: '34.123.200.181',
  port: 22,
  username: 'andrewdmorgan_2', // Replace with your VM's username
  privateKey: require('fs').readFileSync('/home/andy/.ssh/newGoogleCloud'),
};

// SSH connection and command execution
const conn = new Client();
conn.on('ready', () => {
  console.log('SSH connection established.');
  conn.exec('ls', (err, stream) => {
    if (err) throw err;
    stream
      .on('data', (data) => {
        console.log('Received: ' + data.toString());
      })
      .on('close', (code, signal) => {
        console.log('SSH command executed successfully.');
        conn.end();
      });
  });
}).connect(sshConfig);

const app = express();
const port = 3001; // Choose any available port

// Enable CORS for all routes (you can configure it more specifically if needed)
app.use(cors());

app.use(bodyParser.json());

// Define a sample API endpoint
app.post('/run-command', (req, res) => {
  const { command } = req.body;
  // Execute the command or perform any desired logic
  const arrayOfInputs = command.split('/');
  for (let i = 0; i < arrayOfInputs.length; i++) {
    if (i == 0){
        console.log(`Text Input: ${arrayOfInputs[i]} `)
    }
    else if (i == 1){
        console.log(`Guide Input: ${arrayOfInputs[i]} `)
    }
    else if (i == 2){
        console.log(`Batch Input: ${arrayOfInputs[i]} `)
    }
  }

  res.header('Access-Control-Allow-Origin', '*'); // Allow all origins (not recommended for production)
  res.json({ message: 'Command received and executed.' });
});

app.listen(port, () => {
  console.log(`Local API server is running on port ${port}`);
});
