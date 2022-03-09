

function removeAdd(deck, hand,) {       //--------#4 & #7  pop/pushes the cards nto new generic dealerHand/playerHand array
    let poppedCard = deck.pop();
    hand.push(poppedCard);

    // return poppedCard;
}

function dealCard(card, parentElement) {             //--------#4 & #7   fetches the images and appends them to the parentElement rectangles on the page
    let cardElement = document.createElement("img");
    cardElement.setAttribute("src", card.imgUrl);
    parentElement.appendChild(cardElement);
}

function render(hand, parentElement, pointsElement) {              //------#9     actually puts the images on the page, looping through the hand
    parentElement.innerHTML = "";

    hand.forEach(function (card) {
        dealCard(card, parentElement);
    });

    let points = calculatePoints(hand);  //------#12   added pointsElement as the generic parameter above to take in the dealerPointsELement and PlayerPointsELement arguments (when included in calling the render function)
    pointsElement.innerText = points; //----------#12

}

function shuffleArray(array) {            //--------#10(solution provided)
    for (var i = array.length - 1; i > 0; i--) {
        var j = Math.floor(Math.random() * (i + 1));
        var temp = array[i];
        array[i] = array[j];
        array[j] = temp;
    }
    return array;
}

function calculatePoints(hand) {            //--------#11
    let points = 0;

    hand.forEach(function (card) {
        switch (card.rank) {
            case (1):
                points += 1;    //do we cover anything for if it is decided ace is high?
                break;
            case (11):
                points += 10;          //jack
                break;
            case (12):
                points += 10;          //queen
                break;
            case (13):
                points += 10;          //king
                break;
            default:
                points += card.rank;
                break;
        }
    })


    let hasAce = false;

    hand.forEach(card => {    //before the points are finally totalled, loop through the have to see if there's an ace
        if (card.rank == 1){
            hasAce = true;
        }
        points += card.rank;  //add one for the ace
    })

    if(hasAce == true && points + 10 <= 21){    //if there's an ace AND points + 10 <= 21, then add 10 so ace is worth 11 (10 since we already added one and aces can be 11pts)
        points = points + 10
    }

    return points;
}



// let deal = document.getElementById('deal-button');
// or
// let deal = document.querySelector('#deal-button')   // identified the node
// deal.onclick = function(){ // identified event 
//   }
// or in order to NOT put an event listener on each and every node....
let classButtons = document.querySelector('.buttons')  // identified the WHOLE BLOCK OF nodes- so all the buttons--------#4

let dealerHandElement = document.querySelector('#dealer-hand'); //-------#4    //element to append image to
let dealerPointsElement = document.querySelector('#dealer-points');  //-------#12     //element to append points counter to
let playerHandElement = document.querySelector('#player-hand');  //-------#4     //element to append image to
let playerPointsElement = document.querySelector('#player-points');  //-------#12     //element to append points counter to

var playerHand = [];//-----#4
var dealerHand = [];//-----#4

classButtons.addEventListener('click', function (e) { // add generic event listener to all of 'em---"e" is an object from the browser telling us what was clicked on, we pass it to the function as an argument, can be anything oesn't have to be 'e'.
    //   console.log(e.target.id); // when you print 'e' you can drilldown in the console to find the 'target' and then the 'id' to find the value of that id and you can ask it to print that upon click

    switch (e.target.id) {   //identifies which button was targeted
        case 'deal-button':

            //pop a card from the deck array and push it to a new array called 'player-hand' into the div with id "player-hand"
            // Player Card 1
            // var poppedCard = deck.pop();        --------#4 & #7
            // playerHand.push(poppedCard);
            // let poppedCard = removeAdd(deck, playerHand);
            shuffleArray(deck);   //--------#10
            removeAdd(deck, playerHand);

            // var card = document.createElement("img");         --------#4 & #7
            // card.setAttribute("src", poppedCard.imgUrl);
            // playerHandElement.appendChild(card);
            // render(poppedCard, playerHandElement);

            //pop a card from the deck array  and push it to a new array called 'dealer-hand' into the div with id "dealer-hand"
            // Dealer Card 1
            // var poppedCard2 = deck.pop();
            // dealerHand.push(poppedCard2);
            // let poppedCard2 = removeAdd(deck, dealerHand);
            removeAdd(deck, dealerHand);

            // var card2 = document.createElement("img");
            // card2.setAttribute("src", poppedCard2.imgUrl);
            // dealerHandElement.appendChild(card2);
            // render(poppedCard2, dealerHandElement)

            //pop a card from the deck array  and push it to a new array called 'player-hand' into the div with id "player-hand"
            // Player Card 2
            // var poppedCard3 = deck.pop();
            // playerHand.push(poppedCard3);
            // let poppedCard3 = removeAdd(deck, playerHand);
            removeAdd(deck, playerHand);

            // var card3 = document.createElement("img");
            // card3.setAttribute("src", poppedCard3.imgUrl);
            // playerHandElement.appendChild(card3);
            // render(poppedCard3, playerHandElement);

            //pop a card from the deck array  and push it to a new array called 'dealer-hand' into the div with id "dealer-hand"
            // Dealer Card 2
            // var poppedCard4 = deck.pop();
            // dealerHand.push(poppedCard4);
            // let poppedCard4 = removeAdd(deck, dealerHand);
            removeAdd(deck, dealerHand);

            // var card4 = document.createElement("img");
            // card4.setAttribute("src", poppedCard4.imgUrl);
            // dealerHandElement.appendChild(card4);
            // render(poppedCard4, dealerHandElement);




            console.log(playerHand);
            console.log(dealerHand);

            var playerPoints = calculatePoints(playerHand)
            console.log(playerPoints);
            var dealerPoints = calculatePoints(dealerHand)
            console.log(dealerPoints);



            render(playerHand, playerHandElement, playerPointsElement);
            render(dealerHand, dealerHandElement, dealerPointsElement);
            break;

        case 'hit-button':
            //pop a card from the deck array and push it to a new array called 'player-hand' into the div with id "player-hand"

            // Player Hit Card 1
            // var poppedCard5 = deck.pop();
            // playerHand.push(poppedCard5);
            // let hitCardPlayer = removeAdd(deck, playerHand);
            removeAdd(deck, playerHand);

            // var card = document.createElement("img");
            // card.setAttribute("src", poppedCard5.imgUrl);
            // playerHandElement.appendChild(card);
            // render(hitCardPlayer, playerHandElement);

            render(playerHand, playerHandElement,playerPointsElement);
            render(dealerHand, dealerHandElement,dealerPointsElement);

            break;

        case 'stand-button':
    }



})


