if (annyang) {

    console.log("annyang**");
    // Let's define a command.
    var commands = {
        'hello': function() { alert('Hello world!'); },
        'system':function(){alert('system called');}
    };

    console.log('***commands');

    annyang.interimResults = true;

    annyang.addCallback('resultMatch', function(userSaid, commandText, phrases) {
        console.log(userSaid); // sample output: 'hello'
        $("#output").text(userSaid);
        console.log(commandText); // sample output: 'hello (there)'
        console.log(phrases); // sample output: ['hello', 'halo', 'yellow', 'polo', 'hello kitty']
        console.log('result match printout');
    });

    console.log('***reusltmatch');

    // Add our commands to annyang
    annyang.addCommands(commands);

    console.log('***after add commands');


    // Start listening.
    // annyang.start();
}


var recognition = annyang.getSpeechRecognizer();
var final_transcript = '';
recognition.interimResults = true;

annyang.start();
count = 0;
command_flag = false;

recognition.onresult = function(event) {
    var interim_transcript = '';
    var ret = '';

    final_transcript = '';
    // console.log('commang flag before loop',command_flag);
    for (var i = event.resultIndex; i < event.results.length; ++i) {
        if (event.results[i].isFinal) {
            final_transcript += event.results[i][0].transcript;
            console.log("***final_transcript:::",final_transcript);
            count++;
            if(command_flag === true){
                final_transcript = final_transcript.replace(/system/g,'');
                $("#log").val(final_transcript);
                QueryProcess(final_transcript);
                $('input.b').removeClass("flash");// I think this is a problem
            }
        } else {
            interim_transcript += event.results[i][0].transcript;
            var trueStr = interim_transcript.split(" ");
            console.log("trueStr",trueStr);
            console.log("here first and second",trueStr[0],trueStr[1]);
            if(trueStr[0] === "system"){
                command_flag = true;
            }else if(trueStr[1] === "system"){
                command_flag = true;
            }else{
                command_flag = false;
            }

        }
    }// end of for loop
    if(interim_transcript!='') {
        // console.log('interim transcript typeof',typeof interim_transcript);
        var temp = interim_transcript;
        ret = temp.replace(/system/g,'');
        if(command_flag === true){
            // $("#log").val(interim_transcript);
            $("#log").val(ret);
            $('input.b').addClass("flash");
            // $('input.b').addClass("flash");

        }else{//end of sentence
            // $("#log").val(ret);
            // $('input.b').removeClass("flash");// I think this is a problem

        }

    }
};


// this is to track the position
window.addEventListener('load', function(){
    // annyang.start();
    // var box1 = document.getElementById('box1')
    var box1 = document.getElementById('container');
    var startx = 0;
    var starty = 0;

    box1.addEventListener('pointerdown', function(e){
        // var touchobj = e.changedTouches[0] ;// reference first touch point (ie: first finger)
        // startx = parseInt(touchobj.clientX) ;// get x position of touch point relative to left edge of browser
        // startx = e.clientX;// get x position of touch point relative to left edge of browser
        // starty = e.clientY;
        startx = e.pageX;// get x position of touch point relative to left edge of browser
        starty = e.pageY;
        console.log('pointer down tract', startx - box1.offsetLeft, starty - box1.offsetTop);

        globX = startx - box1.offsetLeft-12;
        globY = starty - box1.offsetTop-12;

        e.preventDefault();
    }, false);

}, false);

document.oncontextmenu = function() {
    return false;
};

//drawing rectangle pre-selected
document.addEventListener("DOMContentLoaded", function(event) {
    document.getElementById("touchRect").click();
});

