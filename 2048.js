var button = document.getElementsByClassName("box");
let h1 = document.getElementById("score");
let hs = document.getElementById("hscore");// high score

let newgame = document.getElementById("newgame");  //new game button

grid=[
    [0,0,0,0],
    [0,0,0,0],
    [0,0,0,0],
    [0,0,0,0]

];
var score =0;


var game = document.getElementById("game_over");

document.getElementById("overlay").style.display = "block";

function off()
{
    document.getElementById("overlay").style.display = "none";
    }
    



    function off1()// Off Function For Overlay1 When user Clicks On Play Again Button
{  
    document.getElementById("overlay1").style.display = "none";
    location.reload();//Game Reloads
   
}

function gamestart(board)  //to start the game with 2 random num 2 or 4
 {
     let r = Math.floor(Math.random() * 4);  //generated a random row
     let c =Math.floor(Math.random() * 4);   //generated a random column
     if(board[r][c])   //if there is value this will turn into truthy 
     {
         gamestart(board);  //there is a recursive call
     }
     else
     {
     board[r][c] =(Math.random()>0.5)? 2 :4;   //2 or 4 value is written on board
     
     }
}

gamestart(grid);
gamestart(grid);  //called 2 times to generate 2 numbers on start of game
fill(grid,button);
localstore();  //to display high score

function fill(arr,but)   //it reflects changes to html board
{   
   h1.innerHTML=score;
    let g=0;
    for(let i=0;i<arr.length;i++)
    {
        for(let j=0;j<arr.length;j++)
        {
            if(arr[i][j])
            {
            but[g].innerHTML =arr[i][j];
            }
            else
            {
            but[g].innerHTML ="";
            but[g].style.backgroundColor="#F4F0F0";
            }
            colorsetter(g,arr[i][j]);

            g++;
        }
    }
}




window.addEventListener("keydown",listening);

function listening(e)
{
    if(e.keyCode>=37 && e.keyCode<=40) //if it is a valid move
    { 
        let oldstate =[
        [...grid[0]],
        [...grid[1]],
        [...grid[2]],
        [...grid[3]]
    ];
       if(e.keyCode==37) //left
       {
            swipeleft(grid);
            sumleft(grid);
       }
       else if(e.keyCode==38) //up
       {
            swipeup(grid);
            sumup(grid);
       }
       else if(e.keyCode==39) //right
       {
            swiperight(grid);
            sumright(grid);
       }
       else if(e.keyCode==40)  //down
        {
            swipedown(grid);
            sumdown(grid);
        }

                if(toputnewvalueornot(oldstate,grid)) //if the state changes
                {
                    find(grid);
                    fill(grid,button); //to reflect changes on board
                    localstore();
                }
                else if(!(checkgameover_row(grid)||checkgameover_col(grid)||checkgameover_num(grid)))
                {   
                    
                      over();
                    document.getElementById("overlay1").style.display = "block"; 
                }
                

    }
}


function swiperight(grid)
{
    for(let i=0;i<grid.length;i++)
    {
        for(let j=1;j<grid[i].length;j++)
        {
            if(grid[i][j]==0)
            {
                for(let k=j;k>0;k--)
                {
                    grid[i][k]=grid[i][k-1];
                    grid[i][k-1]=0;
                }
            }
        }
    }
   
} 
function sumright(arr)
 {
     for(let i=arr.length-1;i>0;i--)
     {
         for(let j=0;j<arr.length;j++)
         {
            if(arr[j][i])  //if the value is not zero
            {
                if(arr[j][i]==arr[j][i-1]) //if the values are equal 
                {
                    arr[j][i]+=arr[j][i-1]; //adding the values
                    arr[j][i-1]=0  //after adding values giving the value 0 
                    score+=arr[j][i];
                }
            }
         }
         
     }
     swiperight(arr); //call shift right to shift values to the right after changes due to addition 
 }


function swipeleft(grid)
{
    for(let i=0;i<grid.length;i++)
    {
        for(let j=grid.length-2;j>=0;j--)
        {
            if(grid[i][j]==0)
            {
                for(let k=j;k<grid.length-1;k++)
                {
                    grid[i][k] = grid[i][k+1];
                    grid[i][k+1] =0;
                }
            }
        }
    }
  
}
function sumleft(arr)
{

    for(let i=0;i<arr.length-1;i++)
    {
        for(let j=0;j<arr.length;j++)
        {   if(arr[j][i]) //it the value is not zero
            {
                if(arr[j][i]==arr[j][i+1])    
                {
                    arr[j][i] +=arr[j][i+1];
                    arr[j][i+1] =0;
                    score+=arr[j][i];
                }
            }
            
        }
       
    }
    swipeleft(arr); //function here to shift values to left because after adding the value is set to zero 
}

function swipedown(arr)
{
for(let i=0;i<arr.length;i++)   //starting from 1 
{
    for(let j=1;j<arr.length;j++)
    {
        if(arr[j][i]==0)
        {
            for(let k=j;k>0;k--)
            {
                arr[k][i] =arr[k-1][i];
                arr[k-1][i] = 0;
            }
        }
    }
}

}

function sumdown(arr)
{
    for(let i=arr.length-1;i>0;i--)
    {
        for(let j=0;j<arr.length;j++)
        {
            if(arr[i][j])
            {
                if(arr[i][j]==arr[i-1][j])
                {
                    arr[i][j] += arr[i-1][j]
                    arr[i-1][j]=0;
                    score+=arr[i][j];
                }
            }
        }
        //call sumdown function here      
    }
    swipedown(arr);
}

function swipeup(arr)
{
    for(let i=0;i<arr.length;i++)
    {
        for(let j=arr.length-2;j>=0;j--)
        {
            if(arr[j][i]==0)
            {
               for(let k=j;k<arr.length-1;k++)
               {
                arr[k][i] =arr[k+1][i];
                arr[k+1][i]=0;
               } 
            }
        }
    }
    
}

function sumup(arr)
{
    for(let i=0;i<arr.length-1;i++)  //-1 because last row is not checked
    {
        for(let j=0;j<arr.length;j++)
        {
            if(arr[i][j])
            {
                if(arr[i][j]==arr[i+1][j])
                {
                    arr[i][j]+=arr[i+1][j];
                    arr[i+1][j] =0;
                    score+=arr[i][j];
                }
            }
        }
        //call shiftup function here 
    }
    swipeup(arr);
}



function find(arr) //looks for blank spaces to put random number 2 or 4
{   
    var newarr = Array();
    for(let i=0;i<arr.length;i++)
    {
        for(let j=0;j<arr.length;j++)
        {
            if(arr[i][j]==0)
            {
                newarr.push({row : i,col : j});
            }
        }
    }
    if(newarr.length>0)
    {
        var temp =(Math.random()>0.5) ? 2 : 4;
        var t = newarr[ Math.floor(Math.random() * newarr.length)];
        arr[t.row][t.col] =temp;
       
        
    }
}

function toputnewvalueornot(oldarr,newarr)
{
    for(let i=0;i<oldarr.length;i++)
    {
        for(let j=0;j<oldarr.length;j++)
        {
            if(oldarr[i][j]!=newarr[i][j])
            return true 
        }
    }
    return false;   //if there is no change in old arr so no value will be iserted;

} 


function checkgameover_row(arr) //row checker  //this function is called when there is no space
{
    for(let i=0;i<arr.length;i++)
    {
        for(let j=0;j<arr.length-1;j++)
        {
            if(arr[i][j]==arr[i][j+1])
            return true;               //if there is a move present for left or right 
        }
    }   
    return false; //if there is no move present for left or right
}

function checkgameover_col(arr)
{
    for(let i=0;i<arr.length-1;i++)
    {
        for(let j=0;j<arr.length;j++)
        {
            if(arr[i][j]==arr[i+1][j])
            return true;             //there is valid move present
        }
    }   
        return false;        //there is no valid move present
}

function checkgameover_num(arr)
{   
    for(let i=0;i<arr.length;i++)
    {
        for(let j=0;j<arr.length;j++)
        {
            if(arr[i][j]==0)
            return true; 
        }
    }
    return false;
}


function over()
{
    game.innerHTML = "Game over";
}

function localstore() //manages high score in local storage
{
    var check = localStorage.getItem('highscore');
    if(check)
    {
        if(check<score)   //new high score is created
        {
            localStorage.setItem('highscore',score); //new high score is updated in local storage

            
            //things to be added here
        }
        hs.innerHTML =localStorage.getItem('highscore');
        
    }
    else
    {
        localStorage.setItem('highscore',score);
        hs.innerHTML =score;
    }
    
}


//if new game button is pressed
newgame.addEventListener("click",function()
    {
        location.reload();
       
       
    }
    );


    function colorsetter(gindex,arrelement)
    {
        switch(arrelement)
        {
          

            case 2:
            button[gindex].style.backgroundColor="#EBADAD";
            break;

            case 4:
                button[gindex].style.backgroundColor="#b5a6ab";
                break;


            case 8:
                button[gindex].style.backgroundColor="#D1EC40";
                break;

                
            case 16:
                button[gindex].style.backgroundColor="#b89272";
                break;

                
            case 32:
                button[gindex].style.backgroundColor="#ff8703";
                break;


            case 64:
                button[gindex].style.backgroundColor="#00F7F7";
                break;


            case 128:
                button[gindex].style.backgroundColor="#B8ED88";
                break;


            case 256:
                button[gindex].style.backgroundColor="#B8ED88";
                break;


            case 512:
                button[gindex].style.backgroundColor="#FFFF6F";
                break;


            case 1024:
                button[gindex].style.backgroundColor="#CFAFAF";
                break;


            case 2048:
                button[gindex].style.backgroundColor="#CFAFAF";
                break;


        }
    }