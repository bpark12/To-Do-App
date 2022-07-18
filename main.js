// 유저가 값을 입력한다
// + 버튼을 클릭하면, 할일이 추가된다
// - 버튼을 클릭하면, 할일이 삭제 된다
// check버튼을 누르면 할일이 끝나면서 밑줄이 간다
// 진행중 끝남 탭을 누르면, 언더바가 이동한다
// 끝남탭은 끝난 아이템만, 진행중탭은 진행중인 아이템만
// 전체탭을 누르면 다시 전체아이템으로 돌아옴

let taskInput=document.querySelector(".task-input");
let addButton=document.querySelector(".add-button");
let taps=document.querySelectorAll(".taps div");
let underLine=document.getElementById("tap-underline");
let mode="all";
let filterList=[];
let taskList=[];

taskInput.addEventListener("keypress", (event)=>{
    if(event.key==="Enter") {
        addTask(event);
    }
})

addButton.addEventListener("click", addTask);

for(let i=1; i<taps.length; i++){
    taps[i].addEventListener("click", function (event){
        filter(event)
    })
}


function addTask(){
    let task={
        id:randomIDGenerate(),
        taskContent:taskInput.value,
        isCompleted:false
    }
    taskList.push(task);
    taskInput.value="";
    render();
}


function render(){
    let resultHTML='';
    let list=[]
    if(mode=="all"){
        list=taskList;
    }
    else if(mode=="ongoing" || mode == "done"){
        list=filterList;
    }

    for(let i=0; i<list.length; i++){
        if(list[i].isCompleted){
            resultHTML+= 
            `<div class="task">
                <span class="task-done">${list[i].taskContent}</span>
                <div class=button-box>
                    <button onclick="toggleComplete('${list[i].id}')">
                        <i class="fa fa-check" aria-hidden="true"></i>
                    </button>
                    <button onclick="deleteTask('${list[i].id}')">
                        <i class="fa fa-trash" aria-hidden="true"></i>
                    </button>
                </div>
            </div>`
        }
        else{
            resultHTML+= 
            `<div class="task">
                <span>${list[i].taskContent}</span>
                <div class=button-box>
                    <button onclick="toggleComplete('${list[i].id}')">
                        <i class="fa fa-check" aria-hidden="true"></i>
                    </button>
                    <button onclick="deleteTask('${list[i].id}')">
                        <i class="fa fa-trash" aria-hidden="true"></i>
                    </button>
                </div>
            </div>`
        }
    }

    document.querySelector(".task-board").innerHTML=resultHTML;
}

function toggleComplete(id){
    for(let i=0; i<taskList.length; i++){
        if(taskList[i].id==id){
            taskList[i].isCompleted=!taskList[i].isCompleted;
            break;
        }
    }
    filter();
}

function deleteTask(id){
    for(let i=0; i<taskList.length; i++){
        if(taskList[i].id==id){
            taskList.splice(i,1);
            break;
        }
    }
    filter();
}

function filter(event){
    filterList = [];
    if(event){
        mode=event.target.id;
        underLine.style.width=event.target.offsetWidth +"px";
        underLine.style.left=event.target.offsetLeft + "px" ;
        underLine.style.top=event.target.offsetTop+(event.target.offsetHeight-4) +"px";
    }

    if(mode=="ongoing"){
        for(let i=0; i<taskList.length; i++){
            if(taskList[i].isCompleted==false){
                filterList.push(taskList[i])
                
            }
        }
    }
    else if(mode=="done"){
        for(let i=0; i<taskList.length; i++){
            if(taskList[i].isCompleted==true){
                filterList.push(taskList[i]) 
            }
        }
    }
    render();
}
function randomIDGenerate(){
    return '_' + Math.random().toString(36).substr(2, 9);
}

