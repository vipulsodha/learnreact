function createStore(reducer) {


    var state;

    var listeners = [];



    var dispatch = function (action) {

        state = reducer(action, state);
        listeners.forEach(function (listener) {
            listener();
        });

    }


    var subscribe = function (listener) {

        listeners.push(listener);

        return function () {
            listeners = listeners.filter(function (callback) {
                return listener !== callback
            });
        }
    }


    var getState = function () {

        return state;
    }



    return {
        getState: getState,
        subscribe: subscribe,
        dispatch: dispatch
    }

}


var ADD_TODO = "add_todo";
var REMOVE_TODO = "remove_todo";
var MARK_DONE = "mark_done";

var todoReducer = function (action, state = []) {

    switch (action.type) {

        case ADD_TODO:

            return state.concat(action.payload)

            break;

        case REMOVE_TODO:

            return state.filter(function (s) {
                s.id != action.payload.id;
            });

            break;

        case MARK_DONE:


            break;

    }


}


var combinedReducers = function (action, state = {}) {

    return {
        todo: todoReducer(action, state.todo)
    }

}



var addTodoActionCreator = function (data) {

    console.log(data);

    return {
        type: ADD_TODO,
        payload: data
    }

}

var removeTodoActionCreator = function (data) {

    return {
        type: REMOVE_TODO,
        payload: data
    }
}


var store = createStore(combinedReducers);
var uns = store.subscribe(function() {
    console.log("chnaged data");
});


// DOM
//
// var addTodoInput = document.getElementById("add-todo-input");
// var addTodoButton = document.getElementById("add-todo-button");
//
// addTodoButton.addEventListener("click", function(e) {
//
//     addTodoActionCreator(addTodoInput.value);
// });














