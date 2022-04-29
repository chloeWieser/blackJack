
//grab items from dom

let dealButton = document.getElementById('deal-button');
let hitButton = document.querySelector('#hit-button');
let standButton = document.querySelector('#stand-button');

let dealerHandNode = document.getElementById('dealer-hand');
let playerHandNode = document.getElementById('player-hand');

let dealerPoints = document.getElementById('dealer-points');
let playerPoints = document.getElementById('player-points');

let messages = document.getElementById('messages');

let cardDeck = []
let playerHand = []
let dealerHand = []

let suitMap = {
    D : 'diamonds',
    C : 'clubs',
    H : 'hearts',
    S : 'spades'
}
//build deck- each time we run the 'build deck function we're going to call the 'createCardObj' function to creata each object (breaking up the functions)
//[{}, {}, {}] each card will represent an object with 3 keys: {points, suit, imageURL}
const createCardObj = (points, suit) => {
    let card = {
        points: points,
        suit: suit,
        imageURL: ""
    }
    if(points > 1 && points <= 10){
        card.imageURL = `images/${points}_of_${suitMap[suit]}.png`
    }

    //special cards Ace, Jack, Queen , King

    switch(points){
        case 1: //Ace
            card.imageURL = `images/ace_of_${suitMap[suit]}.png`;
            break;
        case 11: //jack
            card.imageURL = `images/jack_of_${suitMap[suit]}.png`;
            card.points = 10;
            break;
        case 12: //queen
            card.imageURL = `images/queen_of_${suitMap[suit]}.png`;
            card.points = 10;
            break;
        case 13: //king
            card.imageURL = `images/king_of_${suitMap[suit]}.png`;
            card.points = 10;
            break;
        default:
            break;
    }
    return card
}

const buildDeck = () => {
    //loop through suitMap and create 13 cards for each suit
    for(let suit in suitMap){
        for(let points = 1; points <= 13; points++){
            //push a new card into the global cardDeck
            cardDeck.push(createCardObj(points,suit))
        }
    }
}

//shuffle logic
function shuffleArray(array){
    for (var i = array.length -1; i > 0; i--) {
        var j = Math.floor(Math.random() * (i + 1));
        var temp = array[i];
        array[i] = array[j];
        array[j] = temp;
    }
    return array;
}

const displayCards = (handArr, node, pointsNode, nameOfHand) => { //pointsNode = container
    let imageHTMLFragment = "";
    handArr.forEach(cardObj => {
        let img = `<img src= "${cardObj.imageURL}">`
        imageHTMLFragment += img
    })
    node.innerHTML = imageHTMLFragment;

    let points = calculateHand(handArr) //give us points

    pointsNode.innerHTML = points.toString(); //displays vlue of current hand


    let isBust = isBusted(points, nameOfHand)

    if(isBust)disableButtons();
}

const isBusted = (handPoints, typeOfHand) => {
    let isBust = false;

    if (handPoints > 21 && typeOfHand == "player"){
        messages.innerHTML = "<b>You Bust</b>"
        isBust = true;
    }

    if (handPoints > 21 && typeOfHand == "dealer"){
        messages.innerHTML = "<b>Dealer Busts</b>";
        isBust = true;
    }

    return isBust;
}

//[{points}, {}, {}, {}]
const calculateHand = (hand) => { //hand could be player or dealer
    let points = 0;
    let hasAce = false;


    hand.forEach(cardObj => {
        if(cardObj.points==1){
            hasAce = true;
        }
        points += cardObj.points;
    })

    if(hasAce == true && points + 10 <= 21){
        points = points + 10
    }

    return points; //returns total points of our hand
}

const checkWinner = () => {

    let dealerPoints = calculateHand(dealerHand)
    let playerPoints = calculateHand(playerHand)

    if(playerPoints <= 21 && playerPoints > dealerPoints){
        messages.innerHTML = "<b>You Win!</b>"
    }
    else if (dealerPoints <= 21 && dealerPoints > playerPoints){
        messages.innerHTML = "<b>Dealer Wins!</b>"
    }
    else{
        messages.innerHTML = "<b>Tie</b>"
    }

        //disable buttons
    disableButtons();
}

    const disableButtons = () => {
        hitButton.disabled = true;
        standButton.disabled = true;
        dealButton.disabled = false; //this is when the game is over
    }


//event listeners

dealButton.addEventListener('click', e=> {
    cardDeck = []
    playerHand = []  //don't need let bc these are already defined globally
    dealerHand = []

    hitButton.disabled = false;
    standButton.disabled = false;
    //build deck
    buildDeck();
    console.log(cardDeck)

    //randomize deck
    shuffleArray(cardDeck)

    //deal cards
    playerHand.push(cardDeck.pop())
    dealerHand.push(cardDeck.pop())

    playerHand.push(cardDeck.pop())
    dealerHand.push(cardDeck.pop())

    //display cards on screen
    displayCards(dealerHand, dealerHandNode, dealerPoints, "dealer");  
    displayCards(playerHand, playerHandNode, playerPoints, "player");
})

hitButton.addEventListener('click', e => {
    //player receives a card
    playerHand.push(cardDeck.pop())
    displayCards(playerHand, playerHandNode, playerPoints, "player")

})

standButton.addEventListener('click', e=> {
    //calculate dealer hand
    let points = calculateHand(dealerHand);

    let isBust = false;

    while(points < 17){
        dealerHand.push(cardDeck.pop());

        displayCards(dealerHand, dealerHandNode, dealerPoints, "dealer")

        points = calculateHand(dealerHand)
        isBust = isBusted(points, "dealer") 
    }
    //check to see who the winner is
    if (isBust == false)checkWinner();
})
