/*  Using fetch javascript API we will learn how to GET data
*   from an JSON database.
*/



/*
*   GET Data from Local file
*   On page load, make a request to get the tasks
*   @return JSON tasks : array
*/
fetch('db.json')
    .then(function (response) {
        return response.json();
    }).then(function (tasks) {
        console.log(tasks)
        let allTasks = tasks.tasks;

        for (let i = 0; i < allTasks.length; i++) {
            document.getElementById("taskList").innerHTML += '<tr><td value="" id="task">' + allTasks[i].task_name + '</a></td><td id="status">' + allTasks[i].task_status + '</td></tr><br>';
        }
    });


/*
*   GET Data from Local API
*   On page load, make a request to mockapi and get the tasks
*   @return JSON object array
*/

// fetch('http://5af373afcca5e20014bba4d7.mockapi.io/tasks')
//     .then(function (response) {
//         return response.json();
//     }).then(function (tasks) {
//         console.log(tasks)
//         // let allTasks = tasks.tasks;

//         for (let i = 0; i < tasks.length; i++) {
//             document.getElementById("taskList").innerHTML += '<tr><td value="" id="task"><a href="#" onclick="details(' + tasks[i].id + ')">' + tasks[i].task_name + '</a></td><td id="status">' + tasks[i].task_status + '</td></tr><br>';
//         }
//     });



/*
*   POST data to local API
*   Add event listner on the button and execute the post request
*   @return status code success or fail
*/

document.getElementById('postTask').addEventListener('click', function () {
    //get and store task_name & task_status
    let taskName = document.getElementById('taskName').value;
    let taskStatus = false;

    //make the POST request
    fetch('http://5af373afcca5e20014bba4d7.mockapi.io/tasks', {
        method: 'POST',
        headers: new Headers,
        body: {
            'task_name': taskName,
            'task_status': taskStatus
        }
    })
        .then(function (response) {
            return response.json();
        })
        .then(function (addedTask) {
            //refresh tasks list
            document.getElementById("taskList").innerHTML += '<tr><td id="task"><a href="#" onclick="details(' + addedTask.id + ')">' + addedTask.task_name + '</td><td id="status">' + addedTask.task_status + '</td></tr><br>';
            //clear taskName input
            this.taskName.value = '';
            // console.log(this.taskName.value)
        })
        .catch(function (error) {
            throw error;
        })
});

/*
*   GET single task item
*   Add event listner on the task name and execute the get request
*   @return single task object
*/

function details(id) {
    // //get modal text targets
    let modalTaskName = document.getElementById('taskModalName');
    let modalTaskDescription = $('#taskModalDescription');

    fetch('http://5af373afcca5e20014bba4d7.mockapi.io/tasks/' + id)
        .then(function (response) {
            return response.json();
        }).then(function (singleTask) {
            document.getElementById("taskDetail").innerHTML = `
                <div class="form-group row">                            
                    <div class="col-sm-10">
                        <h5 id="taskNameDetail">${singleTask.task_name}</h5>
                    </div>
                    <div class="col-sm-10">
                        <span id="taskNameDetail">${singleTask.task_description}</span>
                    </div>
                </div>`
        });


}
