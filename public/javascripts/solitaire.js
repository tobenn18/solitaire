/*var container = $(".board");
var clubArray = [];
var heartArray = [];
var diamondArray = [];
var spadeArray = [];*/
var deck = [];
var card;
var suitData = {};
var colors = {
    red: ["hearts", "diamonds"],
    black: ["clubs", "spades"]
};
var specialCards = {
    "1": "A",
    "11": "J",
    "12": "Q",
    "13": "K"
};
var specialCardsReverse = {
    "A": 1,
    "J": 11,
    "Q": 12,
    "K": 13
};
var oppositeColors = {
    red: "black",
    black: "red"
};
var suit;

for (var color in colors) {
    // loop over the array of suits of that color
    // create cards a-k for those colors

    for (var i = 0, suits = colors[color], total = suits.length; i < total; i++) {
         suit = suits[i];
        for (var cardNumber = 1; cardNumber < 14; cardNumber++) {
            card = {
                number: specialCards[cardNumber] ? specialCards[cardNumber] : cardNumber,
                color: color,
                suit: suit
            };

            card.element = createCardElement(card);

            if (!suitData[suit]) {
                suitData[suit] = [];
            }

            suitData[suit].push(card);
            deck.push(card);
        }
    }
}

function createCardElement(card){

    // Cards have a front and a back
    // To flip a card face up, hide the back and show the front,
    // To flip a card face down, hide the front, and show the back
    
    var cardElement = $("<div/>",{
        class : "card"
    });

    cardElement.data(card);

    var cardText = $("<div/>",{
        class : "cardText",
        html : card.number + " of " + card.suit
    });

    cardElement.append(cardText);

    return cardElement;

};

/*
function makeDeck(cardElement){
    
    for(var i = 1; i < 52; i++){
       deck.push(cardElement) ; 
    }
}
*/
/*Shuffle*/
function shuffle(array) {
  var currentIndex = array.length, temporaryValue, randomIndex ;

  // While there remain elements to shuffle...
  while (0 !== currentIndex) {

    // Pick a remaining element...
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;

    // And swap it with the current element.
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }

  return array;
}


/*
    card card card card card card card
         card card card card card card
              card card card card card
                   card card card card
                        card card card
                             card card
                                  card
*/


// 1. Add a click to each card (hint: event delegation)
//  1a. If another card is already selected, assume the user is trying to move the currently selected card.
//  1b. If a card is not already selected, store the selected card.
// 2. Check to see if the move is valid
//  2a. Check to see if the currently selected card (the moving one) is a lower number -- if it is, it's a valid move

var stock;
var waste = [];
function setupGameBoard(columns) {
    console.log("setting up gameboard");
    shuffle(deck);

    var counter = 0;

    $(".column").empty();

    for (var i = 0; i < 7; i++) {
        var columnNumber = i + 1;
        var column = columns[i];

        for (var j = 0; j < columnNumber; j++) {
            var card = deck[counter];
            column.append(card.element);
            counter++;
        }
    }

    waste = [];
    stock = deck.slice(counter, deck.length);
    stockElement.html(stock.length + " cards");
}

$(function () {
    window.columns = [
        $("#column1"),
        $("#column2"),
        $("#column3"),
        $("#column4"),
        $("#column5"),
        $("#column6"),
        $("#column7")
    ];

    window.stockElement = $("#stock");
    window.wasteContainerElement = $("#wasteContainer");
    setupGameBoard(columns);
});

/*$(".tableau").on("click",".card",function(){
     colorCard();
    console.log($(this).text());
},false);*/

var selectedCard = null;

function selectCard(card) {
    selectedCard = card;
    card.addClass("success");
}
// 8-31
// If it's a valid move, move the card and deselect the colored card. (hint: decolor the border, and make sure that selectedCard variable has been reset)

$(".stock .card").on("click", function () {
    var card = stock.shift();
    waste.push(card);
    wasteContainerElement.empty();
    wasteContainerElement.append(createCardElement(card));
    stockElement.html(stock.length + " cards");
});




// 9-3
// Allow a user to attempt to move a card in the waste to the board.  Verify it's a valid move.
// When a card is successfully moved, remove it from the waste and the waste array
// when the stock is at 0 and they click it, shuffle the waste back in to the stock and deal the first card

$(".tableau").on("click", ".card", function (event) {
    var card = $(this);
    var cardData;
    var selectedCardData;
    var cardNumber;
    var selectedCardNumber;
    var cardColor;
    var selectedCardColor;
    var validColor;
    
    if (selectedCard) {
        console.log("Comparing ", selectedCard, card);

        cardData = card.data();
        selectedCardData = selectedCard.data();

        cardNumber = cardData.number;
        selectedCardNumber = selectedCardData.number;
        cardColor = cardData.color;
        selectedCardColor = selectedCardData.color;

        console.log("Comparing", selectedCardNumber, cardNumber);

        cardNumber = specialCardsReverse[cardNumber] ? specialCardsReverse[cardNumber] :  cardNumber;
        selectedCardNumber = specialCardsReverse[selectedCardNumber] ? specialCardsReverse[selectedCardNumber] : selectedCardNumber;

        console.log("Transformed data", selectedCardNumber, cardNumber);

        validColor = oppositeColors[selectedCardColor];

        if (selectedCardNumber < cardNumber && cardColor === validColor) {
            /*console.log("valid move", selectedCardNumber + " < " + cardNumber, cardColor + "  = " + validColor);*/
            selectedCard.prependTo(card.parent());
            selectedCard.removeClass("success");
            selectedCard = null;

            
        }else {
            console.log("Invalid move", selectedCardNumber, cardNumber, cardColor, validColor);
            $(".success").removeClass("success");
            selectedCard = null;
        }
    } else {
        selectCard(card);
    }
});
$(".waste").on("click",function(event){
    var wasteCard = $(".waste .card");
    
    wasteCard.detach();

});




/*if (selectedCardNumber < cardNumber && cardColor === validColor) {
            console.log("valid move", selectedCardNumber + " < " + cardNumber, cardColor + "  = " + validColor);
        } else {
            console.log("Invalid move", selectedCardNumber, cardNumber, cardColor, validColor);
        }*/

/*
var hasBeenClicked = false;
$(".tableau").on("click",".card",function(event){
    
    if(hasBeenClicked){
       $(this). 
    } else {
    
    }

});*/
    
    

/*if(!$(this).hasClass("success")){
        $(".card.success").removeClass("success");
        $(this).addClass("success");
     }*/


/*console.log($(this).text());*/
/*Draw Cards*/
/*
function drawCards(deck){
    var cardElement;

    for(var i = 1; total = deck.length; i++){
        container = createCardElement(card[i]).
        container.append(cardElement);
    }
}
*/

/*
for (var i = 1; i < 14; i++){
    var clubCard = {
        rank : i,
        suit : "Club",
        color : "black"
    }
    clubArray.push(clubCard);
    
};
   
for (var i = 1;i < 14; i++){
    var spadeCard = {
        rank : i,
        suit : "Spade",
        color : "black"
    }
    spadeArray.push(spadeCard);
};
for (var i = 1;i < 14;i++){
    var heartCard ={
        rank : i,
        suit : "Heart",
        color: "red"
    }
    heartArray.push(heartCard);
};

for(var i = 1;i < 14;i++){
    var diamondCard = {
        rank : i,
        suit : "heart",
        color: "red"
    }
    diamondArray.push(diamondCard);
}
deck.push(clubArray,heartArray,spadeArray,diamondArray);
console.log(deck);
*/







