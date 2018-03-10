const start=$("#start");
const gamePage=$("#gamePage");
const startPage=$("#startPage");
const home=$(".home")
const gameOver=$("#gameOver")
const canvasPage=$("#canvasPage")
let strike=0
let index=0
let answer=[]
var words=['STRONG','SWING','FALSE','TREE','SCIENTIST','ABYSS','BAGPIPES','IVY','PNEUMONIA','PUPPY','CAT','BLIZZARD','HYPHEN','JINX','MNEMONIC','SCRATCH','VOODOO','WHISKEY','PHLEGM','PEEKABOO','JAZZ','WAVE']
var arr=[]
let score=0
var checkWord
/*$(document).ready(function(){
    gamePage.hide();
    gameOver.hide();
    canvasPage.hide();
    
})*/
function clearCanvas(){
    var c = document.getElementById("myCanvas");
    var ctx = c.getContext("2d");
    ctx.clearRect(0, 0, c.width, c.height);
    ctx.beginPath();
    
}
function initialDraw(){
    var c = document.getElementById("myCanvas");
    var ctx = c.getContext("2d");
    
    ctx.moveTo(50,50);
    ctx.lineTo(50,200);
    ctx.stroke();
    ctx.moveTo(50,50);
    ctx.lineTo(121,50);
    ctx.stroke();
    ctx.moveTo(25,200);
    ctx.lineTo(75,200);
    ctx.stroke();
    ctx.moveTo(120,50);
    ctx.lineTo(120,70);
    ctx.stroke();
    

}
function canvasfill(str){
    var c = document.getElementById("myCanvas");
    var ctx = c.getContext("2d");
    if(str===1)
    {
        ctx.moveTo(120,50);
        ctx.beginPath();
        ctx.arc(120,85,15,0,2*Math.PI);
        ctx.stroke();
    }
    else if(str===2)
    {
        ctx.moveTo(120,100);
        ctx.lineTo(120,140);
        ctx.stroke();
    }
    else if(str===3)
    {
        ctx.moveTo(120,120);
        ctx.lineTo(100,110);
        ctx.stroke();
    }
    else if(str===4)
    {
        ctx.moveTo(120,120);
        ctx.lineTo(140,110);
        ctx.stroke();
    }
    else if(str===5)
    {
        ctx.moveTo(120,140);
        ctx.lineTo(140,160);
        ctx.stroke();
    }
    else
    {
        ctx.moveTo(120,140);
        ctx.lineTo(100,160);
        ctx.stroke();
    }

}

function selectWord(){
    return (words[index]);
}
function showVal(word){
    
    for(var i=0;i<word.length;i++)
        {
            arr.push("_");
            arr.push(" ");
            answer.push(" ")
        }
    $("#answer").val((arr.toString()).replace(/\,/g, ""))
    
}
function newgame(){
    startPage.hide();
    gamePage.show();
    canvasPage.show();
    $("#snackbar").text("Lvl "+(index+1));
    myFunction()
    arr.length=0;
    answer.length=0;
    strike=0
    $("td").css("background-color","white")
    $("td").data('clicked',false)
    checkWord=selectWord()
    showVal(checkWord)
    clearCanvas()
    initialDraw()
}

function myFunction() {
    var x = document.getElementById("snackbar")
    x.className = "show";
    setTimeout(function(){ x.className = x.className.replace("show", ""); }, 500);
}

start.click(newgame)
home.click(function(){
    index=0;
    score=0;
    $("#update").val(score);
    gameOver.hide();
    canvasPage.hide();
    gamePage.hide();
    startPage.show();
})
function checker(check){
    
    if(checkWord===check)
        {
            alert("Congrats!You Won.The word was :"+checkWord);
            
            index++;
            if(index==words.length){
                alert("You completed the game!!");
                gamePage.hide();
                index=0
                gameOver.show();
            }
            else
            {
                newgame()
                
            }
        }
}
$("table").find('td').click(function(){
    
    let x=$(this).text();
    
    let flag=0
    if(!$(this).data('clicked')){
        for(var i=0;i<checkWord.length;i++){
            if(checkWord.charAt(i)==x){
                
                arr[i*2]=x
               
                answer[i]=x;
                flag=1
                $(this).css("background-color",'green')
            }
             
        }
        
        if(flag!==1){
            strike++;$(this).css("background-color",'red');
            canvasfill(strike);
            score--;
            $("#update").val(score)
        }
        else{
            score++;
            
            $("#update").val(score)
        }
        if(strike===6){
            gamePage.hide();
            index=0;
            let s="Your score :"+score
            $("#FinalScore").text(s)
            
            gameOver.show();
            canvasPage.show();
        }
        
        $(this).data('clicked',true);
        $("#answer").val((arr.toString()).replace(/\,/g, ""))
        //
        
    }
    checker((answer.toString()).replace(/\,/g, ""))
})
