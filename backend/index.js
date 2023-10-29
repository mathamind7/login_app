import express from 'express';
import bodyParser from 'body-parser';
import mysql from 'mysql2/promise';
import cors from 'cors';
import bcrypt from "bcrypt";
import session from 'express-session';

const app = express();
app.use(bodyParser.json());
app.use(cors());
app.use(session({
  secret: 'secretkey',
  resave: false,
  saveUninitialized: true,
}));

const dbConfig = {
  host: 'sql12.freesqldatabase.com',
  user: 'sql12657561',
  password: 'Xdlmj57VXe',
  database: 'sql12657561',
};

app.post('/registration', async (req, res) => {
  try {
    const connection = await mysql.createConnection(dbConfig);

    const { firstName, lastName, email, password, address1, address2, number } = req.body;

    if (!firstName || !lastName || !email || !password || !address1 || !address2 || !number) {
      res.status(400).json({ message: 'All fields are required' });
      return;
    }

    const [result] = await connection.execute(
      'INSERT INTO users (firstName, lastName, email, password, address1, address2, number) VALUES (?, ?, ?, ?, ?, ?, ?)',
      [firstName, lastName, email, password, address1, address2, number]
    );

    const hashedPassword = await bcrypt.hash(password, 10);

    const [result_admin] = await connection.execute(
      'INSERT INTO admin (email, password) VALUES (?, ?)',
      [email, hashedPassword]
    );

    req.session.userEmail = email;
    connection.end();
    res.status(201).json({ message: 'User registered successfully', user: result });
  } catch (error) {
    console.error('Error during registration:', error);
    res.status(500).json({ message: 'Registration failed' });
  }
});

app.post('/login', async (req, res) => {
  try {
    const connection = await mysql.createConnection(dbConfig);

    const { email, password } = req.body;

    if (!email || !password) {
      res.status(400).json({ message: 'Email and password are required' });
      return;
    }

    req.session.email = email;

    const [results] = await connection.execute('SELECT * FROM users WHERE email = ? AND password = ?', [email, password]);

    if (results.length === 0) {
      connection.end();
      res.status(401).json({ message: 'Login failed' });
      return;
    }

    connection.end();
    res.status(200).json({ message: 'Login successful' });
  } catch (error) {
    console.error('Error during login:', error);
    res.status(500).json({ message: 'Login failed' });
  }
});

app.get('/admin', async (req, res) => {
  try {
    const connection = await mysql.createConnection(dbConfig);

    const [results] = await connection.execute('SELECT * FROM admin');

    connection.end();

    res.status(200).json(results);
  } catch (error) {
    console.error('Error retrieving admin user data:', error);
    res.status(500).json({ message: 'Error retrieving admin user data' });
  }
});

app.route('/dashboard')
  .get(async (req, res) => {
    try {
      const userEmail = req.session.email;
      if (!userEmail) {
        res.status(401).json({ message: 'Unauthorized' });
        return;
      }

      const connection = await mysql.createConnection(dbConfig);

      const [results] = await connection.execute(
        'SELECT firstName, lastName, address1, address2, number FROM users WHERE email = ?',
        [userEmail]
      );

      connection.end();

      if (results.length === 0) {
        res.status(404).json({ message: 'User not found' });
      } else {
        res.status(200).json(results[0]);
      }
    } catch (error) {
      console.error('Error retrieving user data:', error);
      res.status(500).json({ message: 'Error retrieving user data' });
    }
  })
  .put(async (req, res) => {
    try {
      const updatedData = req.body;
      const userEmail = req.session.email;

      if (!userEmail) {
        res.status(401).json({ message: 'Unauthorized' });
        return;
      }

      const connection = await mysql.createConnection(dbConfig);

      await connection.execute(
        'UPDATE users SET firstName = ?, lastName = ?, address1 = ?, address2 = ?, number = ? WHERE email = ?',
        [
          updatedData.firstName,
          updatedData.lastName,
          updatedData.address1,
          updatedData.address2,
          updatedData.number,
          userEmail,
        ]
      );

      connection.end();
      res.status(200).json({ message: 'User data updated successfully' });
    } catch (error) {
      console.error('Error updating user data:', error);
      res.status(500).json({ message: 'User data update failed' });
    }
  });

app.post('/logout', (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      console.error('Error during logout:', err);
      res.status(500).json({ message: 'Logout failed' });
    } else {
      res.clearCookie('connect.sid'); // Clear the session cookie
      res.status(200).json({ message: 'Logout successful' });
    }
  });
});

const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
