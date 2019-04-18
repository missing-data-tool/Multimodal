var rId = 0;

// d3.select('#touchRect').on('click', function(){ new Rectangle(); });


// var svg = d3.select('body').append('svg').attr({width: w, height: h});

function putRect() {
    console.log('in this rect function');
    var self = this, rect, rectData = [], isDown = false, m1, m2, isDrag = false;

    // svg.on('mousedown', function() {
    svg.on('touchstart', function() {
        console.log('touch start');

        m1 = d3.mouse(this);
        // m1 = d3.touch(this);
        if (!isDown && !isDrag) {
            rId++;
            self.rectData = [ { x: m1[0], y: m1[1] }, { x: m1[0], y: m1[1] } ];
            // self.rectangleElement = d3.select('svg').append('rect').attr("id","rect_"+rId).attr('class', 'rectangle').on("click",clicked).call(dragR);
            self.rectangleElement = d3.select('svg').append('rect').attr("id","rect_"+rId).attr('class', 'rectangle').call(dragR);
            self.pointElement1 = d3.select('svg').append('circle').attr('class', 'pointC').call(dragC1);
            self.pointElement2 = d3.select('svg').append('circle').attr('class', 'pointC').call(dragC2);
            self.pointElement3 = svg.append('circle').attr('class', 'pointC').call(dragC3);
            self.pointElement4 = svg.append('circle').attr('class', 'pointC').call(dragC4);
            updateRect();
            isDrag = false;
        } else{
            console.log('drag');
            isDrag = true;
            // document.getElementById('shapeFormat').style.display = "none";
        }
        isDown = !isDown;
    })
        .on('touchmove', function() {
            // .on('mousemove', function() {
            console.log('touch move');

            m2 = d3.mouse(this);
            // m2 = d3.touch(this);
            if(isDown && !isDrag) {
                self.rectData[1] = { x: m2[0], y: m2[1] };
                updateRect();
            }
        });
    // .on("touchend",dragEnd);


    //for changing colors
    // document.getElementById('shapeFormat').style.display = "block";
    // $("#color").change(function () {
    //     console.log("id colorchange",shape);
    //     let fill = shapeFill();
    //     shape.style("fill",fill);
    // });
    // $("#border_color").change(function () {
    //     let stroke = strokeFill();
    //     shape.style("stroke",stroke);
    //
    // });
    // var prev;
    // var count = 0;
    // function clicked(d,i){
    //     count ++;
    //     console.log('count',count);
    //     if (d3.event.defaultPrevented) return; // dragged
    //
    //     console.log('d3.select',d3.select(this).attr("id"));
    //     var id = d3.select(this).attr("id");
    //     shape = d3.select("#"+id);
    //
    //     d3.select(this).transition()
    //         .style("stroke-width", "6px");
    //
    // }
    //changing colors


    function updateRect() {
        rect = d3.select(self.rectangleElement[0][0]);
        rect.attr({
            x: self.rectData[1].x - self.rectData[0].x > 0 ? self.rectData[0].x :  self.rectData[1].x,
            y: self.rectData[1].y - self.rectData[0].y > 0 ? self.rectData[0].y :  self.rectData[1].y,
            width: Math.abs(self.rectData[1].x - self.rectData[0].x),
            height: Math.abs(self.rectData[1].y - self.rectData[0].y),
        });

        var point1 = d3.select(self.pointElement1[0][0]).data(self.rectData);
        point1.attr('r', 5)
            .attr('cx', self.rectData[0].x)
            .attr('cy', self.rectData[0].y);
        var point2 = d3.select(self.pointElement2[0][0]).data(self.rectData);
        point2.attr('r', 5)
            .attr('cx', self.rectData[1].x)
            .attr('cy', self.rectData[1].y);
        var point3 = d3.select(self.pointElement3[0][0]).data(self.rectData);
        point3.attr('r', 5)
            .attr('cx', self.rectData[1].x)
            .attr('cy', self.rectData[0].y);
        var point3 = d3.select(self.pointElement4[0][0]).data(self.rectData);
        point3.attr('r', 5)
            .attr('cx', self.rectData[0].x)
            .attr('cy', self.rectData[1].y);
    }

    var dragR = d3.behavior.drag().on('drag', dragRect);

    function dragRect() {
        var e = d3.event;
        for(var i = 0; i < self.rectData.length; i++){
            d3.select(self.rectangleElement[0][0])
                .attr('x', self.rectData[i].x += e.dx )
                .attr('y', self.rectData[i].y += e.dy );
        }
        rect.style('cursor', 'move');

        // document.getElementById('shapeFormat').style.display = "block";
        // var color = document.getElementById('color').addEventListener('change', shapeFill());
        // var stroke = document.getElementById('border_color').addEventListener('change', strokeFill);
        // console.log('color and stroke',color, stroke);
        updateRect();
    }

    var dragC1 = d3.behavior.drag().on('drag', dragPoint1);
    var dragC2 = d3.behavior.drag().on('drag', dragPoint2);
    var dragC3 = d3.behavior.drag().on('drag', dragPoint3);
    var dragC4 = d3.behavior.drag().on('drag', dragPoint4);

    function dragEnd(){
        // isDown = false;
        // isDrag = false;
        // d3.selectAll(".pointC").attr("opacity",0);

    }

    function dragPoint1() {
        var e = d3.event;
        d3.select(self.pointElement1[0][0])
            .attr('cx', function(d) { return d.x += e.dx })
            .attr('cy', function(d) { return d.y += e.dy });
        updateRect();
    }

    function dragPoint2() {
        var e = d3.event;
        d3.select(self.pointElement2[0][0])
            .attr('cx', self.rectData[1].x += e.dx )
            .attr('cy', self.rectData[1].y += e.dy );
        updateRect();
    }

    function dragPoint3() {
        var e = d3.event;
        d3.select(self.pointElement3[0][0])
            .attr('cx', self.rectData[1].x += e.dx )
            .attr('cy', self.rectData[0].y += e.dy );
        updateRect();
    }

    function dragPoint4() {
        var e = d3.event;
        d3.select(self.pointElement4[0][0])
            .attr('cx', self.rectData[0].x += e.dx )
            .attr('cy', self.rectData[1].y += e.dy );
        updateRect();
    }





}//end Rectangle




