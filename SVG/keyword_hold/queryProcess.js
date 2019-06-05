// this is the function that process query that detects keywords and lead to certain function
function QueryProcess(script){
    let myStr = script.toLowerCase();
    let tokenStr = myStr.split(" ");

    //make it all lower case
    console.log('tokenizedStr',tokenStr);
    var result = ["remove","insert","create","put","generate"].filter(function(n) {
        return tokenStr.indexOf(n) > -1;
    });

    if(["draw","insert","create","put","generate","add"].filter(n => tokenStr.indexOf(n) > -1).length > 0){
        let shape = ["circle","rectangle","square","circles","rectangles","squares"].filter(function(n) {
            return tokenStr.indexOf(n) > -1;
        });

        let color = ["red","green","yellow","pink","blue","lightblue","purple","gray","grey","white","pink","black","magenta","peru","salmon","wheat","violet","plum","tomato","teal","silver","yellow"].filter(function(n) {
            return tokenStr.indexOf(n) > -1;
        });

        let count = ["one","two","three","four","five","six","seven","eight","nine","ten"].filter(function(n) {
            return tokenStr.indexOf(n) > -1;
        });
        let n = mapToNumber(count[0]);
        drawShapes(shape[0],color[0],n);
        // putRect();
    }else if(["copy","duplicate","paste","copies"].filter(n => tokenStr.indexOf(n) > -1).length > 0){
        console.log('copy');

        let count = ["one","two","three","four","five","six","seven","eight","nine","ten"].filter(function(n) {
            return tokenStr.indexOf(n) > -1;
        });
        let n = mapToNumber(count[0]);

        copyShapes(n);
    }else if(["remove","delete","clear"].filter(n => tokenStr.indexOf(n) > -1).length > 0){
        console.log('delete');
        let shape = ["circle","rectangle","square","circles","rectangles","squares"].filter(function(n) {
            return tokenStr.indexOf(n) > -1;
        });

        console.log('shpae',shape);
        let color = ["red","green","yellow","pink","blue","lightblue","purple","gray","grey","white","pink","black","magenta","peru","salmon","wheat","violet","plum","tomato","teal","silver","yellow"].filter(function(n) {
            return tokenStr.indexOf(n) > -1;
        });

        console.log('color',color);

        removeShapes(shape[0],color[0]);


    }
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

