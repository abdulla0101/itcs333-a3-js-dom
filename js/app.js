// ITCS333 A3 starter — implement the to-do app per README.
// You may wrap everything in a DOMContentLoaded handler or an IIFE.
// Requirements: add / toggle-complete / delete / filter / counter,
// using event delegation on #todo-list.

// TODO: your code here
(() => {

    let form = document.getElementById("todo-form");
    let input = document.getElementById("todo-input");
    let list = document.getElementById("todo-list");
    let errorMsg = document.getElementById("error-msg");
    let counter = document.getElementById("counter");

    let filterAll = document.getElementById("filter-all");
    let filterActive = document.getElementById("filter-active");
    let filterDone = document.getElementById("filter-done");

    let currentFilter = "all";

    
    form.addEventListener("submit", function(e) {

        e.preventDefault();

        let task = input.value.trim();

        if (task == "") {
            errorMsg.classList.remove("hidden");
            return;
        }

        errorMsg.classList.add("hidden");

        let li = document.createElement("li");

        let span = document.createElement("span");
        span.className = "item-text";
        span.textContent = task;

        let deleteBtn = document.createElement("button");
        deleteBtn.className = "delete-btn";
        deleteBtn.textContent = "Delete";
        deleteBtn.type = "button";

        li.appendChild(span);
        li.appendChild(deleteBtn);

        list.appendChild(li);

        input.value = "";

        updateCounter();
        applyFilter();

    });

   
    list.addEventListener("click", function(e) {

        if (e.target.className == "delete-btn") {

            list.removeChild(e.target.parentNode);

            updateCounter();

        } else if (e.target.className == "item-text") {

            e.target.parentNode.classList.toggle("completed");

            updateCounter();

        }

        applyFilter();

    });

    
    function updateCounter() {

        let items = list.querySelectorAll("li");
        let remaining = 0;

        for (let item of items) {

            if (!item.classList.contains("completed")) {
                remaining++;
            }

        }

        counter.textContent = remaining + " items left";

        if (remaining == 1) {
            counter.textContent = "1 item left";
        }

    }

    
    function applyFilter() {

        let items = list.querySelectorAll("li");

        for (let item of items) {

            let completed = item.classList.contains("completed");

            if (currentFilter == "all") {
                item.style.display = "flex";
            }

            else if (currentFilter == "active") {

                if (completed) {
                    item.style.display = "none";
                } else {
                    item.style.display = "flex";
                }

            }

            else if (currentFilter == "done") {

                if (completed) {
                    item.style.display = "flex";
                } else {
                    item.style.display = "none";
                }

            }

        }

    }

    
    filterAll.addEventListener("click", function() {

        currentFilter = "all";
        applyFilter();

    });

   
    filterActive.addEventListener("click", function() {

        currentFilter = "active";
        applyFilter();

    });

    
    filterDone.addEventListener("click", function() {

        currentFilter = "done";
        applyFilter();

    });

})();