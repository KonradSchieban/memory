var tileModel = {
    turned: [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
    backgroundImages: ["images/1.jpg",
                       "images/2.jpg",
                       "images/3.jpg",
                       "images/4.jpg",
                       "images/5.jpg",
                       "images/6.jpg",
                       "images/7.jpg",
                       "images/8.jpg",
                       "images/1.jpg",
                       "images/2.jpg",
                       "images/3.jpg",
                       "images/4.jpg",
                       "images/5.jpg",
                       "images/6.jpg",
                       "images/7.jpg",
                       "images/8.jpg"],
    isFirstAttempt: true,
    lastTurnedIndex: -1,
    isLocked: false,
    numberOfTries: 0,
}

var viewController = {
    init: function(){
        viewController.shuffleImages();
    },
    shuffleImages: function(){
        for (let i = tileModel.backgroundImages.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [tileModel.backgroundImages[i], tileModel.backgroundImages[j]] = [tileModel.backgroundImages[j], tileModel.backgroundImages[i]];
        }
        return tileModel.backgroundImages;
    },
    clickTile: function(tileIndex){
        if(tileModel.isLocked){
            console.log("locked!")
            return;
        }

        if(tileIndex === tileModel.lastTurnedIndex){
            console.log("Clicked same tile twice! Skipping this click...");
            return;
        }
        
        tileModel.turned[tileIndex] = 1;
        viewController.render();

        if(tileModel.isFirstAttempt){
            console.log("first attempt.");
            tileModel.lastTurnedIndex = tileIndex;
            tileModel.numberOfTries++;
        }else{
            
            if(tileModel.backgroundImages[tileIndex] === tileModel.backgroundImages[tileModel.lastTurnedIndex]){
                console.log("match!");
                tileModel.lastTurnedIndex = tileIndex;
            }else{
                tileModel.isLocked = true;
                setTimeout(function(){
                    console.log("no match...");
                    tileModel.turned[tileIndex] = 0;
                    tileModel.turned[tileModel.lastTurnedIndex] = 0;
                    viewController.render();
                    tileModel.isLocked = false;
                },1000);
            }
        }

        if(viewController.checkWon()){
            setTimeout(function(){
                alert("Congratulations!");
            },700);
        }

        tileModel.isFirstAttempt = !tileModel.isFirstAttempt;
        
    },

    render: function(){
        let tiles = document.getElementsByClassName("tile");
        for(let tileIndex = 0; tileIndex < tiles.length; tileIndex++){
            if(tileModel.turned[tileIndex] === 1){
                tiles[tileIndex].getElementsByTagName("img")[0].src = tileModel.backgroundImages[tileIndex];
            }else{
                tiles[tileIndex].getElementsByTagName("img")[0].src = "";
            }
        }
        document.getElementById("tries-p").innerHTML = "Number of tries: " + tileModel.numberOfTries;
    },

    checkWon: function(){
        let hasWon = true;
        for(let i = 0; i < tileModel.turned.length; i++){
            if(tileModel.turned[i] === 0){
                hasWon = false;
                break;
            }
        }
        return hasWon;
    }
}

viewController.init();

document.addEventListener("DOMContentLoaded", function() {
    let tiles = document.getElementsByClassName("tile");
    for(let tileIndex = 0; tileIndex < tiles.length; tileIndex++){
        tiles[tileIndex].addEventListener("click",function(){
            viewController.clickTile(tileIndex);
        });
    }

    var seconds = 0;
    var el = document.getElementById('time-p');
    
    function incrementSeconds() {
        seconds += 1;
        el.innerHTML = "Elapsed Time: " + seconds + "s";
    }
    var cancel = setInterval(incrementSeconds, 1000);
});

