import bodyParser from "body-parser";
import express from "express";
import axios from "axios";
import { createRequire } from "module";

// This line is required in order to use enviornment variables
const require = createRequire(import.meta.url)
require("dotenv").config();

const app = express();
const port = 3000;

//const API_KEY = "2f83e405-8652-4cbb-9ba0-f29d61e13312";

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

// Function to get player ID based on player's name
async function getPlayerId(playerFN, playerLN) {
    try {
        const response = await axios.get(`https://api.balldontlie.io/v1/players?first_name=${playerFN}&last_name=${playerLN}`, {
            headers: {Authorization: process.env.API_KEY}
        });
        const player = response.data.data[0];
        if (player) {
            return player.id;
        } else {
            throw new Error(`Player ${playerFN + " " + playerLN} not found`);
        }
    } catch (error) {
        console.error(`Error fetching player ID for ${playerFN + " " + playerLN}:`, error.message);
    }
}

// Function to get player stats based on their ID
async function getPlayerStats(playerId) {
    try {
        const response = await axios.get(`https://api.balldontlie.io/v1/season_averages?player_ids[]=${playerId}&season=2023`, {
            headers: {Authorization: process.env.API_KEY}
        });
        const stats = response.data.data[0];
        if (stats) {
            return stats.pts;
        } else {
            throw new Error(`Stats not found for player ID ${playerId}`);
        }
    } catch (error) {
        console.error(`Error fetching stats for player ID ${playerId}:`, error.message);
    }
}

// Main function to compare two players' points
async function comparePlayers(player1FN, player1LN, player2FN, player2LN) {
    try {
        // Get player IDs
        const player1Id = await getPlayerId(player1FN, player1LN);
        const player2Id = await getPlayerId(player2FN, player2LN);

        // Get player points
        const player1Pts = await getPlayerStats(player1Id);
        const player2Pts = await getPlayerStats(player2Id);

        if (player1Pts > player2Pts) {
            console.log(`${player1FN + " " + player1LN} has more points (${player1Pts}) than ${player2FN + " " + player2LN} (${player2Pts}).`);
            const name = player1FN + " " + player1LN
            return name
        } else if (player2Pts > player1Pts) {
            console.log(`${player2FN + " " + player2LN} has more points (${player2Pts}) than ${player1FN + " " + player1LN} (${player1Pts}).`);
            const name = player2FN + " " + player2LN
            return name
        } else {
            console.log(`${player1FN + " " + player1LN} and ${player2FN + " " + player2LN} have the same points (${player1Pts}).`);
            const name = `${player1FN + " " + player1LN} and ${player2FN + " " + player2LN} have the same points (${player1Pts}).`
            return name
        }
    } catch (error) {
        console.error('Error comparing players:', error.message);
    }
}


app.post("/prediction", async (req, res) => {
    const firstPlayerFN = req.body["First-FN"];
    const firstPlayerLN = req.body["First-LN"];
    const secondPlayerFN = req.body["Second-FN"];
    const secondPlayerLN = req.body["Second-LN"];

    try {
        const name = await comparePlayers(firstPlayerFN, firstPlayerLN, secondPlayerFN, secondPlayerLN);
        console.log(name);
        res.render("index.ejs", {winner: name});
    } catch (error){
        console.log("Please enter a valid NBA player name");
    }  
});

app.get("/", (req, res) => {
    res.render("index.ejs")
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});

