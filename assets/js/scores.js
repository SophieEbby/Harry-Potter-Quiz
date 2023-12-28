var scores = document.getElementById("highscores")
var clear = document.getElementById("clear")

// Renders initials and scores from local storage to the page
function displayScores() {
    // Gets scores array from local storage
    var playerData = localStorage.getItem("playerInfo");

    // Check if playerData is not null or empty
    if (playerData) {
        // Parses scores data
        var playerInfo = JSON.parse(playerData);

        // Clear existing content in the "highscores" element
        scores.innerHTML = "";

        // For each score item
        playerInfo.forEach((info, index) => {
            // Creates div in which to render information
            var userInfo = document.createElement("div");

            // Sets class of "score"
            userInfo.setAttribute("class", "score");

            // Sets text content to player data
            userInfo.textContent = (`${index + 1}. ${info.playerInit}, ${info.score}`);

            // Appends div to page
            scores.appendChild(userInfo);
        });
    }
}

function clearScores() {
    // Clear local storage
    localStorage.clear();
    // Clear the content of the "highscores" element
    scores.innerHTML = "";
}

// Adds click listener to clear button and sets clearScores() as its action
clear.addEventListener("click", clearScores);
// calls displayScores() function
displayScores();