// 유저가 값을 입력한다
// + 버튼을 클릭하면, 할일이 추가된다
// - 버튼을 클릭하면, 할일이 삭제 된다
// check버튼을 누르면 할일이 끝나면서 밑줄이 간다
// 진행중 끝남 탭을 누르면, 언더바가 이동한다
// 끝남탭은 끝난 아이템만, 진행중탭은 진행중인 아이템만
// 전체탭을 누르면 다시 전체아이템으로 돌아옴

let taskInput=document.getElementById("task-input");
let addButton=document.getElementById("add-button");
let taskList=[];
addButton.addEventListener("click", addTask);

function addTask(){
    let task={
        id:randomIDGenerate(),
        taskContent:taskInput.value,
        isCompleted:false
    }
    taskList.push(task);
    console.log(taskList);
    render();
}

function render(){
    let resultHTML='';
    for(let i=0; i<taskList.length; i++){
        if(taskList[i].isCompleted==true){
            resultHTML+= 
            `<div class="task">
                <span class="task-done">${taskList[i].taskContent}</span>
                <div>
                    <button onclick="toggleComplete('${taskList[i].id}')">Check</button>
                    <button>Delete</button>
                </div>
            </div>`
        }
        else{
            resultHTML+= 
            `<div class="task">
                <span>${taskList[i].taskContent}</span>
                <div>
                    <button onClick="toggleComplete('${taskList[i].id}')">Check</button>
                    <button>Delete</button>
                </div>
            </div>`
        }
    }

    document.querySelector(".task-board").innerHTML=resultHTML;
}

function toggleComplete(id){
    //console.log(id);
    for(let i=0; i<taskList.length; i++){
        if(taskList[i].id==id){
            taskList[i].isCompleted=!taskList[i].isCompleted;
            break;
        }
    }
    render();
    console.log(taskList);
}

function randomIDGenerate(){
    return '_' + Math.random().toString(36).substr(2, 9);
}