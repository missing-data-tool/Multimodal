// this is the function that process query that detects keywords and lead to certain function
function QueryProcess(script){
    let myStr = script.toLowerCase();
    // let tokenStr = myStr.split(" ");

    //for color and stroke fill, styling
    if(["and","with"].filter(n => myStr.indexOf(n) > -1).length > 0){
        console.log('and with');
        var tokenStr = myStr.split(" ");

        var andStr = splitAnd(myStr);
        // console.log('after and split function',andStr[0],andStr[1]);

        var shape = shapes.filter(function(n) {
            return andStr[0].indexOf(n) > -1;
        });

        var color = colors.filter(function(n) {
            return andStr[0].indexOf(n) > -1;
        });

        var count = counts.filter(function(n) {
            return andStr[0].indexOf(n) > -1;
        });
        var n = mapToNumber(count[0]);

        if(["stroke","line"].filter(n => andStr[1].indexOf(n) > -1).length > 0){
            var strokeColor = colors.filter(function(n) {
                return andStr[1].indexOf(n) > -1;
            });
        }

        // console.log('stroke color',strokeColor);

    }else{
        console.log('normal');


        var tokenStr = myStr.split(" ");

        var shape = shapes.filter(function(n) {
            return tokenStr.indexOf(n) > -1;
        });

        var color = colors.filter(function(n) {
            return tokenStr.indexOf(n) > -1;
        });

        var count = counts.filter(function(n) {
            return tokenStr.indexOf(n) > -1;
        });

        var strokeColor = "black"; // dafault
        var n = mapToNumber(count[0]);
    }

    // let andStr = splitAnd(myStr); // this one is added for applying stroke color and fillcolor
    // let tokenStr = myStr.split(" ");
    //make it all lower case
    console.log('tokenizedStr',tokenStr);
    // var result = ["remove","insert","create","put","generate"].filter(function(n) {
    //     return tokenStr.indexOf(n) > -1;
    // });

    if(drawCommands.filter(n => tokenStr.indexOf(n) > -1).length > 0){
        drawShapes(shape[0],color[0],n,strokeColor[0]);
        // putRect();
    }else if(copyCommands.filter(n => tokenStr.indexOf(n) > -1).length > 0){
        console.log('copy');

        copyShapes(n);

    }else if(deleteCommands.filter(n => tokenStr.indexOf(n) > -1).length > 0){
        console.log('delete');

        removeShapes(shape[0],color[0],strokeColor[0]);

    }else{
        $("#output").text("A command did not work. Try again.");

    }

    // //make it all lower case
    // console.log('tokenizedStr',tokenStr);
    // var result = ["remove","insert","create","put","generate"].filter(function(n) {
    //     return tokenStr.indexOf(n) > -1;
    // });
    //
    // if(["draw","insert","create","put","generate","add"].filter(n => tokenStr.indexOf(n) > -1).length > 0){
    //     // console.log('insert token being processed',tokenStr);
    //     let shape = ["circle","rectangle","square","circles","rectangles","squares"].filter(function(n) {
    //         return tokenStr.indexOf(n) > -1;
    //     });
    //
    //     let color = ["red","green","yellow","pink","blue","lightblue","purple","gray","grey","white","pink","black","magenta","peru","salmon","wheat","violet","plum","tomato","teal","silver","yellow"].filter(function(n) {
    //         return tokenStr.indexOf(n) > -1;
    //     });
    //
    //     let count = ["one","two","three","four","five","six","seven","eight","nine","ten"].filter(function(n) {
    //         return tokenStr.indexOf(n) > -1;
    //     });
    //     let n = mapToNumber(count[0]);
    //     drawShapes(shape[0],color[0],n);
    //     // putRect();
    // }else if(["copy","duplicate","paste","copies"].filter(n => tokenStr.indexOf(n) > -1).length > 0){
    //     console.log('copy');
    //
    //     let count = ["one","two","three","four","five","six","seven","eight","nine","ten"].filter(function(n) {
    //         return tokenStr.indexOf(n) > -1;
    //     });
    //     let n = mapToNumber(count[0]);
    //
    //     copyShapes(n);
    // }else if(["remove","delete","clear"].filter(n => tokenStr.indexOf(n) > -1).length > 0){
    //     console.log('delete');
    //     let shape = ["circle","rectangle","square","circles","rectangles","squares"].filter(function(n) {
    //         return tokenStr.indexOf(n) > -1;
    //     });
    //
    //     console.log('shpae',shape);
    //     let color = ["red","green","yellow","pink","blue","lightblue","purple","gray","grey","white","pink","black","magenta","peru","salmon","wheat","violet","plum","tomato","teal","silver","yellow"].filter(function(n) {
    //         return tokenStr.indexOf(n) > -1;
    //     });
    //
    //     console.log('color',color);
    //
    //     removeShapes(shape[0],color[0]);
    // }else{
    //     $("#output").text("A command did not work. Try again.");
    // }
}

function mapToNumber(str){
    switch(str){
        case "one":
            return 1;
        case "two":
            return 2;
        case "three":
            return 3;
        case "four":
            return 4;
        case "five":
            return 5;
        case "six":
            return 6;
        case "seven":
            return 7;
        case "eight":
            return 8;
        case "nine":
            return 9;
        case "ten":
            return 10;
    }

}

