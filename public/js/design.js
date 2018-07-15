$(function () {
    if ($('#design-panel').length) {
        var width = $('#design-panel').width();
        var height = 650;

        // first we need Konva core things: stage and layer
        var stage = new Konva.Stage({
            container: 'design-panel',
            width: width,
            height: height
        });

        var layer = new Konva.Layer();
        stage.add(layer);


        // then we are going to draw into special canvas element
        var canvas = document.createElement('canvas');
        canvas.width = stage.width() - 40;
        canvas.height = stage.height() - 40;

        // created canvas we can add to layer as "Konva.Image" element
        var image = new Konva.Image({
            image: canvas,
            x: 20,
            y: 20,
            stroke: 'green',
            shadowBlur: 5
        });
        layer.add(image);
        stage.draw();

        // Good. Now we need to get access to context element
        var context = canvas.getContext('2d');
        context.strokeStyle = "#df4b26";
        context.lineJoin = "round";
        context.lineWidth = 5;

        // Add image
        var shirt = new Image();
        shirt.onload = function () {
            //draw background image
            context.drawImage(shirt, canvas.width / 2 - 250, 20);
        };
        shirt.src = 'images/blank-shirt.png';



        var isPaint = false;
        var lastPointerPosition;
        var mode = 'brush';


        // now we need to bind some events
        // we need to start drawing on mousedown
        // and stop drawing on mouseup
        stage.on('contentMousedown.proto', function () {
            isPaint = true;
            lastPointerPosition = stage.getPointerPosition();

        });

        stage.on('contentMouseup.proto', function () {
            isPaint = false;
        });

        // and core function - drawing
        stage.on('contentMousemove.proto', function () {

            if (!isPaint) {
                return;
            }

            if (mode === 'brush') {
                context.globalCompositeOperation = 'source-over';
            }
            if (mode === 'eraser') {
                context.globalCompositeOperation = 'destination-out';
            }
            context.beginPath();

            var localPos = {
                x: lastPointerPosition.x - image.x(),
                y: lastPointerPosition.y - image.y()
            };
            context.moveTo(localPos.x, localPos.y);
            var pos = stage.getPointerPosition();
            localPos = {
                x: pos.x - image.x(),
                y: pos.y - image.y()
            };
            context.lineTo(localPos.x, localPos.y);
            context.closePath();
            context.stroke();


            lastPointerPosition = pos;
            layer.draw();
        });



        var select = document.getElementById('tool');
        select.addEventListener('change', function () {
            mode = select.value;
        });

        var colorSelect = document.getElementById('inpColor');
        colorSelect.addEventListener('change', (event) => {
            var color = event.target.value;
            var shirt = new Image();
            shirt.onload = function () {
                //draw background image
                context.drawImage(shirt, canvas.width / 2 - 250, 20);

            };
            switch (color) {
                case 'white':
                    shirt.src = 'images/blank-shirt.png';
                    break;
                case 'red':
                    shirt.src = 'images/blank-shirt-red.png';
                    break;
                case 'blue':
                    shirt.src = 'images/blank-shirt-blue.png';
                    break;
                case 'yellow':
                    shirt.src = 'images/blank-shirt-yellow.png';
                    break;
            }
        });

        var brushColor = document.getElementById('inpBrushColor');
        brushColor.addEventListener('change', (event) => {
            var color = event.target.value;
            context.strokeStyle = color;
        });
    }
});