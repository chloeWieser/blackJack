function buildDeck() {
    // Initialize
    let deck = [];

    // For loop: 4 suits
    for (let i = 0; i < 4; i++) {
        // For loop: 13 cards per suit
        for (let j = 0; j < 13; j++) {
            // Rank = j + 1

            // Suit = switch(i): case(0): suit = "diamonds" case(1): suit = "clubs";
            // First loop (i is 0) set suit to diamonds, etc.

            // Image URL = ${rankName}_of_${suit}.png
            // rankName = j+1 OR ace/jack/queen/king
            // switch(j + 1): case(1): rankName = "ace" case(13): rankeName = "king" 

            // Rank
            let rank = j + 1;

            // Suit
            let suit = "";
            switch(i) {
                case(0):
                    suit = "diamonds";
                    break;
                case(1):
                    suit = "clubs";
                    break;
                case(2):
                    suit = "hearts";
                    break;
                case(3):
                    suit = "spades";
                    break;
            }

            // Image URL
            let rankName = "";
            let imgUrl = "";

            switch(rank) {
                case(1):
                    rankName = "ace";
                    break;
                case(11):
                    rankName = "jack";
                    break;
                case(12):
                    rankName = "queen";
                    break;
                case(13):
                    rankName = "king";
                    break;
                default:
                    rankName = rank;
            }

            imgUrl = `images/${rankName}_of_${suit}.png`;

            deck.push({
                rank: rank,
                suit: suit,
                imgUrl: imgUrl
            })
        }
    }

    // Return
    return deck;
}

console.log(buildDeck());

