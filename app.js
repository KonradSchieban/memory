var tileModel = {
    turned: [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
    backgroundColors: ["green","blue","green","red","red","yellow","white","black","orange","white","black","brown","yellow","blue","brown","orange"],
    isFirstAttempt: true,
    lastTurnedIndex: -1,
    isLocked: false,
}

var viewController = {
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
        }else{
            
            if(tileModel.backgroundColors[tileIndex] === tileModel.backgroundColors[tileModel.lastTurnedIndex]){
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
            },1000);
        }

        tileModel.isFirstAttempt = !tileModel.isFirstAttempt;
        
    },
    render: function(){
        let tiles = document.getElementsByClassName("tile");
        for(let tileIndex = 0; tileIndex < tiles.length; tileIndex++){
            if(tileModel.turned[tileIndex] === 1){
                tiles[tileIndex].style.backgroundColor = tileModel.backgroundColors[tileIndex];
            }else{
                tiles[tileIndex].style.backgroundColor = "";
            }
        }
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


document.addEventListener("DOMContentLoaded", function() {
    let tiles = document.getElementsByClassName("tile");
    for(let tileIndex = 0; tileIndex < tiles.length; tileIndex++){
        tiles[tileIndex].addEventListener("click",function(){
            viewController.clickTile(tileIndex);
        });
    }
});