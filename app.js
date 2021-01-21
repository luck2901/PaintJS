const canvas = document.getElementById("jsCanvas");
const ctx = canvas.getContext("2d");
const colors = document.getElementsByClassName("jsColor");
const range = document.getElementById("jsRange");
const modebtn = document.getElementById("jsMode");
const savebtn = document.getElementById("jsSave");

canvas.width = 700;
canvas.height = 700;

ctx.fillStyle = "white";
ctx.fillRect(0,0,700,700);
ctx.strokeStyle="#2c2c2c";
ctx.fillStyle="#2c2c2c";
ctx.lineWidth = 2.5;

let painting = false;
let filling = false;

function onMouseMove(event){
    const x = event.offsetX;
    const y = event.offsetY;
    if(!painting){
        ctx.beginPath();
        ctx.moveTo(x,y);
    } else{
        ctx.lineTo(x,y);
        ctx.stroke();
    }
}
function startPainting(){
    painting=true;

}
function stopPainting(){
    painting = false;
}
function onMouseDown(event){
    painting=true;
}

function changeColor(event){
    const color = event.target.style.backgroundColor;
    ctx.strokeStyle = color;
    ctx.fillStyle = color;
}

function changeSize(event){
    const size = event.target.value;
    ctx.lineWidth = size;
}

function changeBtn(event){
    if(filling === true)
    {
        modebtn.innerText = "Fill"
        filling = false;

    }else{
        modebtn.innerText = "Paint";
        filling = true;
    }
}

function handleCanvasClick(event){
    if(filling){
        ctx.fillRect(0,0,700,700);
    }
}
function handleCM(event){
    event.preventDefault();
}
function handleSaveClick(){
    const image = canvas.toDataURL("image/jpeg")
    const link = document.createElement("a");
    link.href = image;
    link.download = "PaingJS[EXPORT]";
    link.click();
}
if(canvas){
    canvas.addEventListener("mousemove", onMouseMove);
    canvas.addEventListener("mousedown", startPainting);
    canvas.addEventListener("mouseup", stopPainting);
    canvas.addEventListener("mouseleave", stopPainting);
    canvas.addEventListener("click" , handleCanvasClick);
    canvas.addEventListener("contextmenu" , handleCM);
}

Array.from(colors).forEach(color => color.addEventListener("click",changeColor));

if(range){
    range.addEventListener("input" ,changeSize);
}

if(modebtn){
    modebtn.addEventListener("click", changeBtn);
}

if(savebtn){
    savebtn.addEventListener("click", handleSaveClick);
}