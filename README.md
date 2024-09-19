# Player Stats Comparison Application

This application allows users to compare two NBA players' average points per game for the 2023 season. It uses the `balldontlie` API to fetch player data and provides a simple form interface where users can input player names, with the result displayed on a webpage.

## Technologies Used
- **Node.js**: JavaScript runtime for building server-side applications.
- **Express.js**: A web framework for handling HTTP requests and responses.
- **Axios**: A promise-based HTTP client for making API requests.
- **dotenv**: Module for loading environment variables from a `.env` file.
- **EJS**: Embedded JavaScript for templating the front end.
- **Body-Parser**: Middleware for parsing incoming request bodies in a middleware before your handlers.
  
## Features
1. **Player Data Fetching**: Retrieves NBA player data based on their first and last name using the `balldontlie` API.
2. **Points Comparison**: Compares the 2023 season average points per game for two players and declares the player with more points as the winner.
3. **Team Information**: Displays each player's current team along with the points comparison.
4. **User Input Validation**: If a user inputs an invalid player name, the app responds with an error message prompting for a valid NBA player.

## Prerequisites
To run this project locally, you need to have:
- Node.js installed.
- An API key for the `balldontlie` API (optional, since this API does not require authentication, but the code uses an environment variable for the key).

## Setup Instructions

1. **Clone the repository**:
   ```bash
   git clone <repository_url>
   ```

2. **Navigate into the project directory**:
   ```bash
   cd player-comparison-app
   ```

3. **Install the dependencies**:
   ```bash
   npm install
   ```

4. **Set up environment variables**:
   Create a `.env` file in the root of your project and add the following:
   ```
   API_KEY=your_api_key_here
   ```

5. **Run the application**:
   ```bash
   npm start
   ```

6. **Access the application**:
   Open your browser and go to `http://localhost:3000`.

## File Breakdown

- **app.js (Main Application File)**: This file initializes the Express server, handles routes, and defines the core logic for fetching and comparing player stats.
  
- **`getPlayerId` Function**: Retrieves a player's ID based on their first and last name.
  
- **`getPlayerStats` Function**: Fetches the player's stats (points per game) based on their player ID for the 2023 season.
  
- **`comparePlayers` Function**: Compares two players' stats and logs the player with the higher points.

- **Routes**:
  - `GET /`: Serves the homepage with an input form for entering player names.
  - `POST /prediction`: Processes the form submission and compares two players.

## Error Handling
- If a player is not found, or the API returns an error, the application logs a message and shows an appropriate error to the user.
  
## Example Usage
- Enter two NBA players' first and last names (e.g., "LeBron" and "James", "Stephen" and "Curry") into the form on the homepage.
- Click submit to see which player has a higher points-per-game average for the 2023 season.

## API Used
- **[balldontlie API](https://www.balldontlie.io/#get-all-players)**: Provides NBA player data, including player stats, teams, and IDs.

## **Live Screenshot**
<img width="1440" alt="Screen Shot 2024-09-19 at 7 24 29 PM" src="https://github.com/user-attachments/assets/daf51191-6832-4af8-a27f-e899839d4b1a">


## License
This project is open-source and available under the [MIT License](LICENSE).

## Acknowledgements
- Thanks to the `balldontlie` API for providing free access to NBA player data.
