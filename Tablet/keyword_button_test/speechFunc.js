
function drawShapes(shape, color,count,stroke,here) {
    if (shape === "circle" || shape === "circles") {
        if (count) {
            for (i = 0; i < count; i++) {
                if(here === true){
                    // new putCircleHere(color,stroke);
                    new putCircleHere(color,stroke);
                }else{
                    new putCircle(color,stroke);

                }
                // new putCircleHere(color,stroke);

            }//for loop

            $("#output").text("Drawing completed");

        } else {

            // new putCircle(color,stroke);
            if(here === true){
                // new putCircleHere(color,stroke);
                new putCircleHere(color,stroke);

            }else{
                new putCircle(color,stroke);

            }
            // new putCircleHere(color,stroke);

            $("#output").text("Drawing completed");

        }
    } else if (shape === "rectangle" || shape === "square" || shape === "rectangles" || shape === "squares") {
        if (count) {
            for (i = 0; i < count; i++) {
                if(here === true){
                    new putRectHere(color,stroke);
                }else{
                    new putRect(color,stroke);
                }
            }//for loop
            $("#output").text("Drawing completed");
        } else {
            if(here === true){
                new putRectHere(color,stroke);
            }else{
                new putRect(color,stroke);
            }
            $("#output").text("Drawing completed");
        }

    }//else if rect
}

function pointEProcess(id){
    var concatId = ".pointE." + id;

    return concatId;
}

function pointCProcess(id){
    var concatId = ".pointC." + id;

    return concatId;
}

function removeShapes(shape, color,stroke) {

    if (colors.indexOf(color) >= 0) {
        var color_flag = true;
    }else{
        var color_flag = false;
    }

    if(colors.indexOf(stroke) >=0){
        var stroke_flag = true;

    }else{
        var stroke_flag = false;
    }

    console.log('color & stroke flag',color_flag, stroke_flag);

    if (shape === "circle" || shape === "circles") {
        if(color && stroke === "n"){// when specify color and shape
            var inColor = d3.rgb(color);

            console.log('her color check');
            d3.selectAll('ellipse').each(function(d,i){
                var elt = d3.select(this);

                var color = d3.rgb(elt.style("fill"));
                if(color.r === inColor.r && color.g === inColor.g && color.b === inColor.b){
                    var temp = d3.select(this);
                    var tempId = pointEProcess(temp.attr("id"));
                    temp.remove();
                    d3.selectAll(tempId).remove();
                    // d3.select(this).remove();

                    // d3.selectAll(".pointE").remove(); //testing
                }
            });// iterate on ellipses
            $("#output").text("Removal completed");
        }else if(color && stroke !== "n"){

            var inColor = d3.rgb(color);
            var strokeColor = d3.rgb(stroke);

            d3.selectAll('ellipse').each(function(d,i){
                var elt = d3.select(this);
                var slt = d3.select(this);

                console.log(elt.style("fill"));
                console.log("id",elt.attr("id"));

                var color = d3.rgb(elt.style("fill"));
                var scolor = d3.rgb(slt.style("stroke"));

                if(color.r === inColor.r && color.g === inColor.g && color.b === inColor.b && scolor.r === strokeColor.r && scolor.g === strokeColor.g && scolor.b === strokeColor.b){
                    var temp = d3.select(this);
                    var tempId = pointEProcess(temp.attr("id"));
                    temp.remove();
                    d3.selectAll(tempId).remove();
                }
            });// iterate on ellipses
            $("#output").text("Removal completed");

        }else{// when specify shape
            console.log('***remove all circles');


            d3.selectAll("ellipse").remove();
            d3.selectAll(".pointE").remove();

            $("#output").text("Removal completed");
        }
    }else if (shape === "rectangle" || shape === "square" || shape === "rectangles" || shape === "squares") {
        if(color && stroke === "n"){// when specify color and shape
            console.log('***color ');
            var inColor = d3.rgb(color);

            console.log('her color check');
            d3.selectAll('rect').each(function(d,i){
                var elt = d3.select(this);
                console.log(elt.style("fill"));
                var color = d3.rgb(elt.style("fill"));
                if(color.r === inColor.r && color.g === inColor.g && color.b === inColor.b){
                    var temp = d3.select(this);
                    var tempId = pointCProcess(temp.attr("id"));
                    temp.remove();
                    d3.selectAll(tempId).remove();
                }
            });// iterate on ellipses
            $("#output").text("Removal completed");
        }else if(color && stroke !== "n"){
            console.log('***both color and  stroke');

            var inColor = d3.rgb(color);
            var strokeColor = d3.rgb(stroke);


            console.log('her color check');
            d3.selectAll('rect').each(function(d,i){
                var elt = d3.select(this);
                var slt = d3.select(this);

                console.log(elt.style("fill"));
                var color = d3.rgb(elt.style("fill"));
                var scolor = d3.rgb(slt.style("stroke"));

                if(color.r === inColor.r && color.g === inColor.g && color.b === inColor.b && scolor.r === strokeColor.r && scolor.g === strokeColor.g && scolor.b === strokeColor.b){
                    var temp = d3.select(this);
                    var tempId = pointCProcess(temp.attr("id"));
                    temp.remove();
                    d3.selectAll(tempId).remove();
                }
            });// iterate on ellipses
            $("#output").text("Removal completed");

        }else if(color_flag === false && stroke_flag === false){
            console.log('false false');
            $("#output").text("Command did not work. Try again.");
        }else{
            d3.selectAll("rect").remove();
            d3.selectAll(".pointC").remove();

            $("#output").text("Removal completed");

        }


    }//else if rect
}// end of remove shapes

function removeThisShape(){

    console.log('remove this shape');

    console.log("remove this id",shapeId);

    var tempId = shapeId;
    var id = idProcess(tempId);
    console.log('remove shape',id);

    if(id === "rect"){
        d3.selectAll("rect").each(function(d,i){
            var elt = d3.select(this);
            if(elt.attr("id") === shapeId) {
                var temp  = d3.select(this);
                temp.remove();
                var tempId = pointCProcess(temp.attr("id"));
                temp.remove();
                d3.selectAll(tempId).remove();
            }
        });

        $("#output").text("Removal completed");

    }else if(id === "circle"){
        d3.selectAll("ellipse").each(function(d,i){
            var elt = d3.select(this);
            if(elt.attr("id") === shapeId) {
                var temp  = d3.select(this);
                temp.remove();
                var tempId = pointEProcess(temp.attr("id"));
                temp.remove();
                d3.selectAll(tempId).remove();            }
        });
    }

    $("#output").text("Removal completed");

}

function updateShapes(color, stroke){

    if (colors.indexOf(color) >= 0) {
        var color_flag = true;
    }else{
        var color_flag = false;
    }

    if(colors.indexOf(stroke) >=0){
        var stroke_flag = true;

    }else{
        var stroke_flag = false;
    }

    console.log('update color shape');

    var tempId = shapeId;
    var id = idProcess(tempId);
    console.log('remove shape',id);

    if(id === "rect"){

        if(color_flag === false && stroke_flag == false){
            $("#output").text("Command did not work. Try again.");


        }else{
            d3.selectAll("rect").each(function(d,i){
                var elt = d3.select(this);
                if(elt.attr("id") === shapeId) {
                    elt.style("fill",color);
                    elt.style("stroke",stroke);

                }
            });

            $("#output").text("Style updated");

        }


    }else if(id === "circle"){
        if(color_flag === false && stroke_flag == false){
            $("#output").text("Command did not work. Try again.");


        }else{
            d3.selectAll("ellipse").each(function(d,i){
                var elt = d3.select(this);
                if(elt.attr("id") === shapeId) {
                    elt.style("fill",color);
                    elt.style("stroke",stroke);        }
            });

            $("#output").text("Style updated");

        }

    }else{
        $("#output").text("Command did not work. Try again.");

    }


}


var space = 0;
function copyShapes(count){
    space++;

    console.log('shapeId',shapeId);
    var tempId = shapeId;
    console.log('tempId',tempId);
    shape = d3.select("#"+tempId);
    var id = idProcess(tempId);

    if(id === "circle"){
        if (count) {
            for (i = 0; i < count; i++) {
                new copyCircle();
            }//for loop
            $("#output").text("Copied");

        } else {
            new copyCircle();
            $("#output").text("Copied");
        }
    }else if(id === "rect"){
        if (count) {
            for (i = 0; i < count; i++) {
                new copyRect();
            }//for loop
            $("#output").text("Copied");
        } else {
            new copyRect();
        }

        $("#output").text("Copied");

    }
    // $("#output").text("Copy completed");
}

function shapeFill(){
    console.log('shape fill');
    var fillColor = $("#color option:selected").text();

    return fillColor;

}

function strokeFill(){
    var fillColor = $("#border_color option:selected").text();

    return fillColor;
}

function idProcess(script){
    let myStr = script.toLowerCase();
    let tokenStr = myStr.split("_");
    //make it all lower case
    console.log('tokenizedStr',tokenStr);

    if(["rect"].filter(n => tokenStr.indexOf(n) > -1).length > 0){
        return "rect";
    }else if(["circle","duplicate","paste"].filter(n => tokenStr.indexOf(n) > -1).length > 0){
        console.log('copy');
        return "circle";
    }
}



document.getElementById('shapeFormat').style.display = "block";
$("#color").change(function () {
    console.log("id colorchange",shape);

    let fill = shapeFill();
    shape.style("fill",fill);

    $("#output").text("Updated object style");

    document.getElementById('color').selectedIndex = 0;

});
$("#border_color").change(function () {


    let stroke = strokeFill();
    shape.style("stroke",stroke);

    $("#output").text("Updated object style");

    document.getElementById('border_color').selectedIndex = 0;


});

//when click on a object those objects will have thicker width
d3.select('svg').on('click', function(d, i) {
    // if (d3.event.defaultPrevented) return; // dragged

    globM = d3.mouse(this);
    console.log('global click',globM[0],globM[1]);

    // Somehow console.log the ID of the circle clicked on (if any).
    console.log("Clicked ID: " + d3.event.target.id);
    shapeId = d3.event.target.id;
    console.log("shapeId click",shapeId);

    var tempId = d3.event.target.id;
    shape = d3.select("#"+tempId);


    var id = idProcess(tempId);
    if(id ==="rect"){
        // d3.select("#"+tempId).transition()
        //     .style("stroke-width", "6px");
        document.getElementById('shapeFormat').style.display = "block";

        d3.selectAll("rect").each(function(d,i){
            var elt = d3.select(this);
            if(elt.attr("id") === shapeId){
                d3.select(this).transition()
                    .style("stroke-width", "6px");
            }else{
                d3.select(this).transition()
                    .style("stroke-width", "2px");
            }
        });

        d3.selectAll(".pointC").style("opacity",0);
        d3.selectAll(".pointC").filter("."+shapeId).style("opacity",1);

        d3.selectAll("ellipse").each(function(d,i){
            var elt = d3.select(this);
            if(elt.attr("id") === shapeId){
                d3.select(this).transition()
                    .style("stroke-width", "6px");
            }else{
                d3.select(this).transition()
                    .style("stroke-width", "2px");
            }
        });



    }else if(id==="circle"){
        // d3.select("#"+tempId).transition()
        //     .style("stroke-width", "6px");

        d3.selectAll("ellipse").each(function(d,i){
           var elt = d3.select(this);
           if(elt.attr("id") === shapeId){
               d3.select(this).transition()
                   .style("stroke-width", "6px");
           }else{
               d3.select(this).transition()
                   .style("stroke-width", "2px");
           }
        });

        d3.selectAll(".pointE").style("opacity",0);
        d3.selectAll(".pointE").filter("."+shapeId).style("opacity",1);
        // ellipses

        //rect part
        d3.selectAll("rect").each(function(d,i){
            var elt = d3.select(this);
            if(elt.attr("id") === shapeId){
                d3.select(this).transition()
                    .style("stroke-width", "6px");
            }else{
                d3.select(this).transition()
                    .style("stroke-width", "2px");
            }
        });



        document.getElementById('shapeFormat').style.display = "block";

    }else{

        console.log('svg');
        d3.selectAll("rect").style('stroke-width',"2px");
        d3.selectAll("ellipse").style('stroke-width',"2px");
        d3.selectAll("circle").style("opacity",0);

        document.getElementById('shapeFormat').style.display = "none";
    }


});

document.getElementById('shapeFormat').style.display = "none";



