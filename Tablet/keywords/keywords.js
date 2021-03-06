if (annyang) {
    // Let's define a command.
    var commands = {
        'hello': function() { alert('Hello world!'); },
        'system':function(){alert('system called');}
    };

    annyang.interimResults = true;

    annyang.addCallback('resultMatch', function(userSaid, commandText, phrases) {
        console.log(userSaid); // sample output: 'hello'
        $("#output").text(userSaid);
        console.log(commandText); // sample output: 'hello (there)'
        console.log(phrases); // sample output: ['hello', 'halo', 'yellow', 'polo', 'hello kitty']
    });

    // Add our commands to annyang
    annyang.addCommands(commands);

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
    final_transcript = '';
    for (var i = event.resultIndex; i < event.results.length; ++i) {
        if (event.results[i].isFinal) {
            final_transcript += event.results[i][0].transcript;
            //this is where I call a query processer, when the speech input ends
            if(command_flag === true){
                QueryProcess(final_transcript);
                $("#log").val(final_transcript);
                // document.getElementById('listen').style.display = "none";
                // $('input.b').removeClass("flash");

            }

            // annyang.start(); //If the sentence is "final" for the Web Speech API, we can try to trigger the sentence
        }
        interim_transcript += event.results[i][0].transcript;
        var magic_word = interim_transcript.split(' ');
        command_flag = false;
        if(count === 0){
            if(magic_word[0] === "system" || magic_word[0] === " system"){
                command_flag =true;
            }

        }else{
            if(magic_word[1] === "system" || magic_word[1] === " system" ){
                command_flag =true;

            }

        }


    }
    if(interim_transcript!='') {
        if(command_flag === true){
            // document.getElementById('listen').style.display = "block";
            $('input.b').addClass("flash");

            $("#log").val(interim_transcript);
        }else{
            // document.getElementById('listen').style.display = "none";
            $('input.b').removeClass("flash");

        }


    }

};

// recognition.onresult = function(event) {
//     var interim_transcript = '';
//     final_transcript = '';
//     for (var i = event.resultIndex; i < event.results.length; ++i) {
//         if (event.results[i].isFinal) {
//             final_transcript += event.results[i][0].transcript;
//             count++;
//             //this is where I call a query processer, when the speech input ends
//             if(command_flag === true){
//                 QueryProcess(final_transcript);
//                 $("#log").val(final_transcript);
//                 // document.getElementById('listen').style.display = "none";
//                 // $('input.b').removeClass("flash");
//
//             }
//             annyang.start();
//
//             // annyang.start(); //If the sentence is "final" for the Web Speech API, we can try to trigger the sentence
//         } else {
//             interim_transcript += event.results[i][0].transcript;
//             var magic_word = interim_transcript.split(' ');
//             command_flag = false;
//             if(count === 0){
//                 if(magic_word[0] === "system" || magic_word[0] === " system"){
//                     command_flag =true;
//                     annyang.abort();
//                 }
//
//             }else{
//                 if(magic_word[1] === "system" || magic_word[1] === " system" ){
//                     command_flag =true;
//                     annyang.abort();
//
//                 }
//
//             }
//
//         }
//     }
//     if(interim_transcript!='') {
//         if(command_flag === true){
//             // document.getElementById('listen').style.display = "block";
//             $('input.b').addClass("flash");
//
//             $("#log").val(interim_transcript);
//         }else{
//             // document.getElementById('listen').style.display = "none";
//             $('input.b').removeClass("flash");
//
//         }
//
//
//     }
//
// };




// this is to track the position
window.addEventListener('load', function(){

    // annyang.start();


    // var box1 = document.getElementById('box1')
    var box1 = document.getElementById('container');
    var statusdiv = document.getElementById('statusdiv');
    var startx = 0;
    var starty = 0;
    var dist = 0;

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

        // statusdiv.innerHTML = 'Status: touchtracj<br> Client_xy: ' + globX + 'px' + globY + 'px';
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

