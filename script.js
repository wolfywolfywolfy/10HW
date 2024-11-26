//import rocket image
const rocket = new Image();
rocket.src = 'images/rocketrocket.png';

//import the canvas + set to 2d settings.
const myCanvas = document.getElementById('myCanvas');
const myContext = myCanvas.getContext('2d');

//initialize variable
let animationFrameId;
//for timer placeholder
let myCount;
//actual timer
let myTimer;


//load rocket onto screen as it is rendered into program.
rocket.onload = function () {
    draw(); 
};

//rocket object
let myRocket = {
    x: 360,
    y: 290
};

//title image
function drawTitle() {
    const titleCanvas = document.getElementById('myTitle');
    const titleContext = titleCanvas.getContext('2d');

    //set height to span the screen (x) and (y) to be 100px tall.
    titleCanvas.width = window.innerWidth;
    titleCanvas.height = 100;

    //clear previous stars when resizing page 
    titleContext.clearRect(0, 0, titleCanvas.width, titleCanvas.height);

    //design background (match width and height of canvas)
    titleContext.fillStyle = "#0f0f11";
    titleContext.fillRect(0, 0, titleCanvas.width, titleCanvas.height);

    //add stars!!
    for (let i = 0; i < 50; i++) { // Adjust the number of stars
        drawStar(titleContext, titleCanvas.width, titleCanvas.height);
    }

    //text orangey color
    titleContext.fillStyle = "#d7a643";
    //set font
    titleContext.font = "2.2em 'Kosugi Maru', sans-serif";
    //horizontal alignment of text.
    titleContext.textAlign = "center";
    //begin drawing here.
    titleContext.fillText("ロケットを飛ばす！", titleCanvas.width / 2, titleCanvas.height / 2);
    
}


//design canvas background
function draw() {
    //clear frame
    myContext.clearRect(0, 0, myCanvas.width, myCanvas.height);
    //design the background (blue and green);
    myContext.fillStyle = "#0A2540";
    myContext.fillRect(10, 10, 780, 340);

    myContext.fillStyle = "#073035";
    myContext.fillRect(10, 350, 780, 40);

    //draw the rocket in!
    myContext.drawImage(rocket, myRocket.x, myRocket.y, 80, 80);
}

//draw stars
function drawStar(context, canvasWidth, canvasHeight) {
    const x = Math.random() * canvasWidth; // Random x position within canvas
    const y = Math.random() * canvasHeight; // Random y position within sky
    const size = Math.random() * 2 + 1; // Random star size (1-3px)

    context.fillStyle = "#FFFFFF"; // White stars

    //draw small circles and fill them! 
    context.beginPath();
    context.arc(x, y, size, 0, Math.PI * 2); // Draw a small circle
    context.fill();
}

//launch rocket
document.getElementById("launchRocket").onclick = function() {
    
    //loop animation
    myCount = 5;
    myCountdown();
};

//to reset the screen (although I think there may be an easier way of doing this)
function resetCanvas () {
    cancelAnimationFrame(animationFrameId);
    myContext.clearRect(0, 0, myCanvas.width, myCanvas.height);
    myRocket.y = 290;

    myCount = 5;
    document.getElementById("countdown").textContent = `Countdown: ${myCount}`;
    draw();
}

//make animation loop while rocket is in bounds
function update() {
    if(myRocket.y > -80) {
        myRocket.y -= 2;
    }
    //else cancel
    else {
        cancelAnimationFrame(animationFrameId);
        setTimeout(resetCanvas, 1000);
    }
}

//to loop the animation
function loop() {
    draw();
    update();
    animationFrameId = requestAnimationFrame(loop);
}

//run canvas on function loading
window.onload = function () {
    drawTitle();
    draw();
};

//when page is altered in size, redraw the title
window.onresize = function () {
    drawTitle();
};

//countdown
function myCountdown () {
    document.getElementById("countdown").textContent = `Countdown: ${myCount}`;
    myCount--;
    myTimer = setTimeout(myCountdown, 1000);

    if(myCount < 0) {
        clearTimeout(myTimer);
        document.getElementById("countdown").textContent = "Pewwww!!";
        loop();
    }
}




