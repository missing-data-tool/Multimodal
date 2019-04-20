function copyCircle() {
    var self = this;
    var ellipse, eData = [], isDown = false, isDragging = false, m1, m2, radiusX, radiusY, click = 1;

    // svg.on('mousedown', function () {
    svg.on('touchstart', function () {
        console.log('circle touchstart');
        m1 = d3.mouse(this);
        if (!isDown && click == 1) {
            // if (!isDown) {
            // if(!isDragging){
            //     self.eData = [{
            //         x1: m1[0],
            //         y1: m1[1],
            //         x2: m1[0],
            //         y2: m1[1],
            //         a: 0,
            //         b: 0
            //     }];
            //     // self.ellipseElement = d3.select('svg').append('ellipse').attr("id","circle_" + cId).attr('class', 'ellipse').on("click",clicked).call(dragE);
            //     self.ellipseElement = d3.select('svg').append('ellipse').attr("id","circle_" + cId).attr('class', 'ellipse').call(dragE);
            //     self.pointElement1 = d3.select('svg').append('circle').attr('class', 'pointE').call(dragP);
            //     self.pointElement2 = d3.select('svg').append('circle').attr('class', 'pointE').call(dragP);
            //     self.pointElement3 = d3.select('svg').append('circle').attr('class', 'pointE').call(dragP);
            //     self.pointElement4 = d3.select('svg').append('circle').attr('class', 'pointE').call(dragP);
            //     updateEllipse();
            // }
        } else {
            isDragging = true;
        }
        isDown = !isDown;
        click++;
        // cId++;
    })
        .on('touchmove', function () {
            // .on('mousemove', function () {
            console.log('circle touchmove');
            m2 = d3.mouse(this);
            // if (isDown && !isDragging) {
            if (isDown && !isDragging && click == 2) {
                self.eData[0].x2 = m2[0];
                self.eData[0].y2 = m2[1];
                self.eData[0].a = Math.abs(m2[0] - m1[0]);
                self.eData[0].b = Math.abs(m2[1] - m1[1]);
                updateEllipse();
            }else{
                console.log('touch more than two');
            }
        });

    function updateEllipse() {
        ellipse = d3.select(self.ellipseElement[0][0]).data(self.eData);
        ellipse.attr('cx', function (d) { return d.x1; })
            .attr('cy', function (d) { return d.y1; })
            .attr('rx', function (d) { return Math.abs(d.a); })
            .attr('ry', function (d) { return Math.abs(d.b); });
        point1 = d3.select(self.pointElement1[0][0]).data(self.eData);
        point1.attr('id', 1)
            .attr('r', 8)
            .attr('cx', function (d) { return d.x1; })
            .attr('cy', function (d) { return d.y1 - d.b; });
        point2 = d3.select(self.pointElement2[0][0]).data(self.eData);
        point2.attr('id', 2)
            .attr('r', 8)
            .attr('cx', function (d) { return d.x1 + d.a; })
            .attr('cy', function (d) { return d.y1; });
        point3 = d3.select(self.pointElement3[0][0]).data(self.eData);
        point3.attr('id', 3)
            .attr('r', 8)
            .attr('cx', function (d) { return d.x1; })
            .attr('cy', function (d) { return d.y1 + d.b; });
        point4 = d3.select(self.pointElement4[0][0]).data(self.eData);
        point4.attr('id', 4)
            .attr('r', 8)
            .attr('cx', function (d) { return d.x1 - d.a; })
            .attr('cy', function (d) { return d.y1; });


    }

    // var dragE = d3.behavior.drag().on('dragstart', dragStart).on('dragend', dragEnd).on('drag', dragEllipse);
    // var dragP = d3.behavior.drag().on('dragstart', dragStart).on('dragend', dragEnd).on('drag', dragPoint);

    var dragE = d3.behavior.drag().on('dragstart', dragStart).on('dragend', dragEnd).on('drag', dragEllipse);
    var dragP = d3.behavior.drag().on('dragstart', dragStart).on('dragend', dragEnd).on('drag', dragPoint);


    var shapeWidth = d3.select("#"+shapeId).style("rx");
    var shapeHeight = d3.select("#"+shapeId).style("ry");
    var shapeColor = d3.select("#"+shapeId).style("fill");
    var tempFill = d3.rgb(shapeColor);
    let color = "rgb("+tempFill.r+","+tempFill.g+","+tempFill.b+")";
    var shapeStroke = d3.select("#"+shapeId).style("stroke");
    var tempStroke = d3.rgb(shapeStroke);
    let strokeColor = "rgb("+tempStroke.r+","+tempStroke.g+","+tempStroke.b+")";

    if(!isDragging){
        self.eData = [{
            x1: 100+cId*30,
            y1: 200+cId*30,
            x2: 100+cId*30+20,
            y2: 200+cId*30+20,
            a: parseInt(shapeWidth,10),
            b: parseInt(shapeHeight,10)
        }];
        // self.ellipseElement = d3.select('svg').append('ellipse').attr("id","circle_" + cId).attr('class', 'ellipse').on("click",clicked).call(dragE);
        self.ellipseElement = d3.select('svg').append('ellipse').attr("id",shapeId + "_copy").attr('class', 'ellipse').style("fill",color)
        // .style("fill",shapeColor)
            .style("stroke",strokeColor).call(dragE);
        self.pointElement1 = d3.select('svg').append('circle').attr('class', 'pointE').call(dragP);
        self.pointElement2 = d3.select('svg').append('circle').attr('class', 'pointE').call(dragP);
        self.pointElement3 = d3.select('svg').append('circle').attr('class', 'pointE').call(dragP);
        self.pointElement4 = d3.select('svg').append('circle').attr('class', 'pointE').call(dragP);
        updateEllipse();
        cId++;
    }

    function dragStart(d) {
        console.log('dragstart');
        isDown = false;
        isDragging = true;
        // d3.event.sourceEvent.stopPropagation();
        // d3.event.sourceEvent.preventDefault();
    }

    function dragEnd(d) {
        console.log('dragend');
        isDown = isDragging = false;
    }

    function dragEllipse(d) {
        console.log('dragelipse');
        isDragging = true;
        var e = d3.event;
        d.x1 += e.dx;
        d.y1 += e.dy;
        d.x2 += e.dx;
        d.y2 += e.dy;
        self.ellipseElement.style('cursor', 'move');
        updateEllipse();
    }

    function dragPoint(d) {
        console.log('drag point');
        var e = d3.event;
        var id = d3.select(this).attr('id');
        if(id == 3 || id == 4) {
            d.a -= e.dx;
            d.b += e.dy;
        } else {
            d.a += e.dx;
            d.b -= e.dy;
        }
        updateEllipse();
    }

}//end Ellipse



