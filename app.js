var tileModel = {
    turned: [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
    backgroundColors: ["green","blue","green","red","red","yellow","white","black","orange","white","black","brown","yellow","blue","brown","orange"],
    isFirstAttempt: function(){
        let sum = 0;
        for(let i = 0; i < tileModel.turned.length; i++){
            sum += tileModel.turned[i];
        }
        return sum % 2 === 0;
    },
    lastTurnedIndex: -1,
}

var viewController = {
    clickTile: function(tileIndex){
        if(tileModel.isFirstAttempt()){
            console.log("first attempt.");
            tileModel.turned[tileIndex] = 1;
            viewController.render();
            tileModel.lastTurnedIndex = tileIndex;
        }else{
            if(tileIndex === tileModel.lastTurnedIndex){
                console.log("Clicked same tile twice! Skipping this click...");
            }else{
                if(tileModel.backgroundColors[tileIndex] === tileModel.backgroundColors[tileModel.lastTurnedIndex]){
                    console.log("match!");
                    tileModel.turned[tileIndex] = 1;
                    viewController.render();
                    tileModel.lastTurnedIndex = tileIndex;
                }else{
                    tileModel.turned[tileIndex] = 1;
                    viewController.render();
                    setTimeout(function(){
                        console.log("no match...");
                        console.log("tile " + tileModel.lastTurnedIndex);
                        tileModel.turned[tileIndex] = 0;
                        tileModel.turned[tileModel.lastTurnedIndex] = 0;
                        console.log("Actual value: " + tileModel.turned[tileModel.lastTurnedIndex]);
                        viewController.render();
                        tileModel.lastTurnedIndex = tileIndex;
                    },1000);
                }
            }
        }
        
        
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