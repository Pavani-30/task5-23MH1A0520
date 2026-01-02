require('dotenv').config(); // MUST be first

const app = require('./app');

const PORT = process.env.PORT || 5000;
app.get('/', (req, res) => {
  res.send('Backend is running successfully 🚀');
});

app.listen(PORT, () => {
  console.log(`Backend running on port ${PORT}`);
});
