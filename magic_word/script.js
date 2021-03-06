if(!window.webkitSpeechRecognition){
  log('Sorry this will work only in Chrome for now...');
}
const magic_word = 'system';
// initialize our SpeechRecognition object
let recognition = new webkitSpeechRecognition();
recognition.lang = 'en-US';
recognition.interimResults = false;
recognition.maxAlternatives = 1;
recognition.continuous = true;

check_flag = false;


// detect the magic word
recognition.onresult = e => {
	var transcripts  = [].concat.apply([], [...e.results].map(res => [...res].map(alt => alt.transcript)));
  if(transcripts.some(t=>t.indexOf(magic_word)>-1)){
      // log('Say a color');
        check_flag = true;
      document.getElementById('speech_color').style.display = "block";
      document.getElementById('listen').style.display = "block";
      document.getElementById('say_color').style.display = "block";

  }
  else{
	  // log('understood ' + JSON.stringify(transcripts));
      document.getElementById('listen').style.display = "block";
      document.getElementById('speech_color').style.display = "block";
      document.getElementById('say_color').style.display = "block";


      // colour = JSON.stringify(transcripts);
      colour = transcripts.toString();
      colour = colour.toLowerCase();
      // strip the spaces out of it
      colour = colour.replace(/\s/gi,'');
      $('h3').text(colour);

      console.log('color',colour);
      // colour = colour.toString();
      // $('body').css('background',colour);
      // $('svg').css('background',colour);
      // $('rect').css('fill',colour);
      $('h4').text(colour);


  }
};
// called when we detect silence
function stopSpeech(){
    setTimeout(function(){recognition.stop();
    },5000);
    setTimeout(function(){status_.className = 'inactive';
    },5000);
    setTimeout(function(){document.getElementById('listen').style.display = "none";
    },5000);
    setTimeout(function(){document.getElementById('speech_color').style.display = "none";
    },5000);

    // recognition.stop();
    // status_.className = 'inactive';
    // document.getElementById('listen').style.display = "none";

}
// called when we detect sound
function startSpeech(){
	try{ // calling it twice will throw...
	    if(check_flag === true){
            speech_flag = true;
            touch_flag = false;
            status_.className = 'active';

        }
	  recognition.start();

  }
  catch(e){}
  // status_.className = 'active';
}
// request a LocalMediaStream
navigator.mediaDevices.getUserMedia({audio:true})
// add our listeners
.then(stream => detectSilence(stream, stopSpeech, startSpeech))
.catch(e => log(e.message));


function detectSilence(
  stream,
  onSoundEnd = _=>{},
  onSoundStart = _=>{},
  silence_delay = 500,
  // silence_delay = 500,
  // min_decibels = -80
  min_decibels = -80

) {
  const ctx = new AudioContext();
  const analyser = ctx.createAnalyser();
  const streamNode = ctx.createMediaStreamSource(stream);
  streamNode.connect(analyser);
  analyser.minDecibels = min_decibels;

  const data = new Uint8Array(analyser.frequencyBinCount); // will hold our data
  let silence_start = performance.now();
  let triggered = false; // trigger only once per silence event

  function loop(time) {
    requestAnimationFrame(loop); // we'll loop every 60th of a second to check
    analyser.getByteFrequencyData(data); // get current data
    if (data.some(v => v)) { // if there is data above the given db limit
      if(triggered){
        triggered = false;
        onSoundStart();
        }
      silence_start = time; // set it to now
    }
    if (!triggered && time - silence_start > silence_delay) {
      onSoundEnd();
      triggered = true;
    }
  }
  loop();
}
function log(txt){
	log_.textContent += txt + '\n';
}


// Constructor for Shape objects to hold data for all drawn objects.
// For now they will just be defined as rectangles.
function Shape(x, y, w, h, fill) {
    // This is a very simple and unsafe constructor. All we're doing is checking if the values exist.
    // "x || 0" just means "if there is a value for x, use that. Otherwise use 0."
    // But we aren't checking anything else! We could put "Lalala" for the value of x
    this.x = x || 0;
    this.y = y || 0;
    this.w = w || 1;
    this.h = h || 1;
    this.fill = fill || '#AAAAAA';
}

// Draws this shape to a given context
Shape.prototype.draw = function(ctx) {

    ctx.fillStyle = this.fill;
    // ctx.fillStyle = this.selectionFill;
    ctx.fillRect(this.x, this.y, this.w, this.h);

};

// Determine if a point is inside the shape's bounds
Shape.prototype.contains = function(mx, my) {
    // All we have to do is make sure the Mouse X,Y fall in the area between
    // the shape's X and (X + Width) and its Y and (Y + Height)
    return  (this.x <= mx) && (this.x + this.w >= mx) &&
        (this.y <= my) && (this.y + this.h >= my);
};

function CanvasState(canvas) {
    // **** First some setup! ****
    this.canvas = canvas;
    this.width = canvas.width;
    this.height = canvas.height;
    this.ctx = canvas.getContext('2d');
    // This complicates things a little but but fixes mouse co-ordinate problems
    // when there's a border or padding. See getMouse for more detail
    var stylePaddingLeft, stylePaddingTop, styleBorderLeft, styleBorderTop;
    if (document.defaultView && document.defaultView.getComputedStyle) {
        this.stylePaddingLeft = parseInt(document.defaultView.getComputedStyle(canvas, null)['paddingLeft'], 10)      || 0;
        this.stylePaddingTop  = parseInt(document.defaultView.getComputedStyle(canvas, null)['paddingTop'], 10)       || 0;
        this.styleBorderLeft  = parseInt(document.defaultView.getComputedStyle(canvas, null)['borderLeftWidth'], 10)  || 0;
        this.styleBorderTop   = parseInt(document.defaultView.getComputedStyle(canvas, null)['borderTopWidth'], 10)   || 0;
    }
    // Some pages have fixed-position bars (like the stumbleupon bar) at the top or left of the page
    // They will mess up mouse coordinates and this fixes that
    var html = document.body.parentNode;
    this.htmlTop = html.offsetTop;
    this.htmlLeft = html.offsetLeft;

    // **** Keep track of state! ****

    this.valid = false; // when set to false, the canvas will redraw everything
    this.shapes = [];  // the collection of things to be drawn
    this.dragging = false; // Keep track of when we are dragging
    // the current selected object. In the future we could turn this into an array for multiple selection
    this.selection = null;
    this.dragoffx = 0; // See mousedown and mousemove events for explanation
    this.dragoffy = 0;
    colorChange = false;
    touch_flag = false;
    speech_flag = false;


    // **** Then events! ****

    // This is an example of a closure!
    // Right here "this" means the CanvasState. But we are making events on the Canvas itself,
    // and when the events are fired on the canvas the variable "this" is going to mean the canvas!
    // Since we still want to use this particular CanvasState in the events we have to save a reference to it.
    // This is our reference!
    var myState = this;

    //fixes a problem where double clicking causes text to get selected on the canvas
    canvas.addEventListener('selectstart', function(e) { e.preventDefault(); return false; }, false);
    // Up, down, and move are for dragging
    canvas.addEventListener('mousedown', function(e) {
        var mouse = myState.getMouse(e);
        var mx = mouse.x;
        var my = mouse.y;
        var shapes = myState.shapes;
        var l = shapes.length;
        for (var i = l-1; i >= 0; i--) {
            if (shapes[i].contains(mx, my)) {
                var mySel = shapes[i];
                // Keep track of where in the object we clicked
                // so we can move it smoothly (see mousemove)
                myState.dragoffx = mx - mySel.x;
                myState.dragoffy = my - mySel.y;
                myState.dragging = true;
                myState.selection = mySel;
                myState.valid = false;
                return;
            }
        }
        // havent returned means we have failed to select anything.
        // If there was an object selected, we deselect it
        if (myState.selection) {
            myState.selection = null;
            myState.valid = false; // Need to clear the old selection border
        }
    }, true);
    canvas.addEventListener('mousemove', function(e) {
        if (myState.dragging){
            var mouse = myState.getMouse(e);
            // We don't want to drag the object by its top-left corner, we want to drag it
            // from where we clicked. Thats why we saved the offset and use it here
            myState.selection.x = mouse.x - myState.dragoffx;
            myState.selection.y = mouse.y - myState.dragoffy;
            myState.valid = false; // Something's dragging so we must redraw
        }

    }, true);
    canvas.addEventListener('mouseup', function(e) {
        myState.dragging = false;
    }, true);
    // double click for making new shapes
    canvas.addEventListener('dblclick', function(e) {

        var mouse = myState.getMouse(e);
        var select_color = document.getElementById("touch_color_option");
        var fillColor = select_color.options[select_color.selectedIndex].value;

        console.log('fillColor shape',fillColor);

        if(speech_flag === true) {
            if (typeof colour === 'undefined') {
                fillColor = select_color.options[select_color.selectedIndex].value;
            } else {
                fillColor = colour;
            }
        }

        var width = document.getElementById("width");
        var height = document.getElementById("height");
        myState.addShape(new Shape(mouse.x - 10, mouse.y - 10, width.value, height.value, fillColor));

    }, true);

    // **** Options! ****
    this.selectionColor = '#CC0000';
    this.selectionWidth = 2;
    this.interval = 30;


    //randomly change color
    const color = Math.round(Math.random() * 0xFFFFFF)
    // Let's format the color to fit CSS requirements
    // this.fillStyle = fill;

    //change color random
    // const fill_color = '#' + color.toString(16).padStart(6,'0')
    //
    // // Let's apply our color in the
    // // element we actually clicked on
    // this.fillStyle = colour;
    setInterval(function() { myState.draw(); }, myState.interval);
}

CanvasState.prototype.addShape = function(shape) {
    this.shapes.push(shape);
    this.valid = false;
};

CanvasState.prototype.clear = function() {
    this.ctx.clearRect(0, 0, this.width, this.height);
};

// While draw is called as often as the INTERVAL variable demands,
// It only ever does something if the canvas gets invalidated by our code
CanvasState.prototype.draw = function() {
    // if our state is invalid, redraw and validate!
    if (!this.valid) {
        var ctx = this.ctx;
        var shapes = this.shapes;
        this.clear();

        // ** Add stuff you want drawn in the background all the time here **

        // draw all shapes
        var l = shapes.length;
        for (var i = 0; i < l; i++) {
            var shape = shapes[i];
            // We can skip the drawing of elements that have moved off the screen:
            if (shape.x > this.width || shape.y > this.height ||
                shape.x + shape.w < 0 || shape.y + shape.h < 0) continue;
            shapes[i].draw(ctx);
        }

        // draw selection
        // right now this is just a stroke along the edge of the selected Shape
        if (this.selection != null) {
            ctx.strokeStyle = this.selectionColor;
            ctx.lineWidth = this.selectionWidth;
            var mySel = this.selection;
            ctx.strokeRect(mySel.x,mySel.y,mySel.w,mySel.h);
            //change fillcolor
            // ctx.fillStyle= colour;
            // ctx.fillRect(mySel.x,mySel.y,mySel.w,mySel.h);
        }



        // ** Add stuff you want drawn on top all the time here **
        // change color randomly while being selected

        this.valid = true;
    }
};


// Creates an object with x and y defined, set to the mouse position relative to the state's canvas
// If you wanna be super-correct this can be tricky, we have to worry about padding and borders
CanvasState.prototype.getMouse = function(e) {
    var element = this.canvas, offsetX = 0, offsetY = 0, mx, my;

    // Compute the total offset
    if (element.offsetParent !== undefined) {
        do {
            offsetX += element.offsetLeft;
            offsetY += element.offsetTop;
        } while ((element = element.offsetParent));
    }

    // Add padding and border style widths to offset
    // Also add the <html> offsets in case there's a position:fixed bar
    offsetX += this.stylePaddingLeft + this.styleBorderLeft + this.htmlLeft;
    offsetY += this.stylePaddingTop + this.styleBorderTop + this.htmlTop;

    mx = e.pageX - offsetX;
    my = e.pageY - offsetY;

    // We return a simple javascript object (a hash) with x and y defined
    return {x: mx, y: my};
};

// If you dont want to use <body onLoad='init()'>
// You could uncomment this init() reference and place the script reference inside the body tag
//init();

function init() {
    // var s = new CanvasState(document.getElementById('canvas1'));
    var s = new CanvasState(document.getElementById('canvas'));
    s.addShape(new Shape(40,40,50,50)); // The default is gray
    // s.addShape(new Shape(60,140,40,60, 'lightskyblue'));
    // Lets make some partially transparent
    // s.addShape(new Shape(80,150,60,30, 'rgba(127, 255, 212, .5)'));
    // s.addShape(new Shape(125,80,30,80, 'rgba(245, 222, 179, .7)'));


}

// var speech  = function(){
//     var x = "lol";
//
//     recognition = new webkitSpeechRecognition();
//     // var recognition = new webkitSpeechRecognition();
//     // recognition.continuous = true;
//     recognition.continuous = false; // the recognition will stop when input stops
//
//     recognition.interimResults = true;
//
//     recognition.onresult = function(event) {
//         colour = event.results[event.results.length - 1][0].transcript;
//         // var colour = event.results[event.results.length - 1][0].transcript;
//
//
//         // var colour = event.results[event.results.length - 1][0].transcript;
//         // make it lowercase
//         colour = colour.toLowerCase();
//         // strip the spaces out of it
//         colour = colour.replace(/\s/gi,'');
//         console.log('color')
//         // $('body').css('background',colour);
//         // $('svg').css('background',colour);
//         // $('rect').css('fill',colour);
//         $('h4').text(colour);
//         // ctx.fillStyle= colour;
//         // ctx.fillRect(last_mousex,last_mousey,width,height);
//     };
//
//     // recognition.start();
//
// };

init();

// $('#start-record-btn').on('click', function(e) {
//     recognition.start();
// });
// $('#pause-record-btn').on('click', function(e) {
//     recognition.stop();
// });

function EnableTouch(){
    touch_flag = true;
    speech_flag = false;
    document.getElementById('touch_color').style.display = "inline";
    document.getElementById('touch_color_option').style.display = "inline";

    document.getElementById('speech_color').style.display = "none";
    document.getElementById('listen').style.display = "none";




    console.log('touch true');
    check_flag=false;

}

function EnableSpeech(){

    // recognition.stop();
    // recognition.start();
    speech_flag = true;
    touch_flag = false;
    document.getElementById('speech_color').style.display = "block";
    document.getElementById('listen').style.display = "block";


    document.getElementById('touch_color').style.display = "none";
    document.getElementById('touch_color_option').style.display = "none";


    console.log('speech true');
    check_flag = true;

}

// document.body.onclick = function() {
document.body.onclick = function(event) {
        // recognition.start();
    // recognition.stop();
    // recognition.start();


    if( $(event.target).closest("#speech").length > 0 ) {
        return false;
    }

    if( $(event.target).closest("#touch").length > 0 ) {
        touch_flag = true;
        speech_flag = false;
        return false;
    }

    if( $(event.target).closest("#touch_color").length > 0 ) {
        touch_flag = true;
        speech_flag = false;
        return false;
    }

    if( $(event.target).closest("#touch_color_option").length > 0 ) {
        touch_flag = true;
        speech_flag = false;
        return false;
    }

    if( $(event.target).closest("#width").length > 0 ) {
        return false;
    }

    if( $(event.target).closest("#height").length > 0 ) {
        return false;
    }

    if( $(event.target).closest("#canvas").length > 0 ) {
        return false;
    }

    // if( $(event.target).closest("#canvas").length > 0 ) {
    //     return false;
    // }

    document.getElementById('listen').style.display = "block";
    document.getElementById('speech_color').style.display = "block";

    document.getElementById('touch_color').style.display = "none";
    document.getElementById('touch_color_option').style.display = "none";
    speech_flag = true;
    touch_flag = false;
    check_flag = true;


    console.log('Ready to receive a color command.');
};


// if (!('webkitSpeechRecognition' in window)) {
//     alert("Sorry you require a browser that supports speech recognition");
// }
// else {
//     speech();
// }





// init();
// speech();
// Now go make something amazing!