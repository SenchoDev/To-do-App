//  UI CONTROLLER-
const UIController = (function () {
    const Item = function (id, description) {
        this.id = id;
        this.description = description;
    }


    const DOMStrings = {
        addInput: '.add-task',
        displayInput: '.submit-task',
        displayTable: '.app',
        delInput: '.submit-task__cancle',
        taskWrap: '.submit-task__wrap',
        submitTaskInput: '.submit-task__input',
        searchInput: '.search__input',
        dateText: '.date',
        plusSign: '.searchbar__plus',
        inbox: '.nav__inbox--1',
        today: '.nav__inbox--2',
        dateLabel: '.date__real-date',
    }

    let dataID = {
        allItems: [],
    }
    let dates = [];

    return {
        calculateID: function (desc) {
            let ID, newItem;

            if (dataID.allItems.length > 0) ID = dataID.allItems[dataID.allItems.length - 1].id + 1;
            else ID = 0;

            newItem = new Item(ID, desc);

            dataID.allItems.push(newItem);

            return newItem;
        },

        dislayInbox: function () {
            const date = document.querySelector('.app');
            date.innerHTML = '';

            const html = `<div class="date">
                            <h4 class="date__today">Inbox</h4>
                          </div>
                          <div class="add-task">
                            <svg xmlns="http://www.w3.org/2000/svg"class="add-task__img" width="18.496" height="18.496" viewBox="0 0 18.496 18.496"><defs><style>.a{fill:none;stroke:#ff1654;stroke-width:2px;}</style></defs><g transform="translate(-1350.973 180.058)"><path class="a" d="M1350.973-173.224h18.5" transform="translate(0 2.847)"/><path class="a" d="M1357.5-181.058v18.5" transform="translate(2.719 1)"/></g></svg>
                            <p class="add-task__text">Add Task</p>
                          </div>       
                          `;
            document.querySelector(DOMStrings.displayTable).insertAdjacentHTML('afterbegin', html);

        },

        displayToday: function () {
            const date = document.querySelector('.app');
            date.innerHTML = '';
            const html = `<div class="date">
                            <h4 class="date__today">Today</h4>
                            <p class=" date__real-date">${dates[0]}</p>
                          </div>        
                          <div class="add-task">
                            <svg xmlns="http://www.w3.org/2000/svg"class="add-task__img" width="18.496" height="18.496" viewBox="0 0 18.496 18.496"><defs><style>.a{fill:none;stroke:#ff1654;stroke-width:2px;}</style></defs><g transform="translate(-1350.973 180.058)"><path class="a" d="M1350.973-173.224h18.5" transform="translate(0 2.847)"/><path class="a" d="M1357.5-181.058v18.5" transform="translate(2.719 1)"/></g></svg>
                            <p class="add-task__text">Add Task</p>
                          </div>`;
            document.querySelector(DOMStrings.displayTable).insertAdjacentHTML('afterbegin', html);
        },

        removeID: function (id) {
            let index;
            let ids = dataID.allItems.map(cur => cur.id);
            index = ids.indexOf(id);
            if (index !== -1) dataID.allItems.splice(index, 1);
        },
        getInput: function () {

            return {
                description: document.querySelector(DOMStrings.submitTaskInput).value,
            }
        },
        removeAddInput: function () {
            document.querySelector(DOMStrings.addInput).remove();
        },

        displayInput: function () {
            const html = `<div class="submit-task">
                            <div class="submit-task__input-box">
                              <input type="text" placeholder="eg. Do the UX for website" class="submit-task__input">
                              <div class="submit-task__box">${dates[1]}</div> 
                            </div>
                              <div class="submit-task__wrap">
                                <button class="submit-task__btn-red">
                                  Add Task
                                </button>
                                <a class="submit-task__cancle">
                                   Cancle
                                </a>
                            </div>
                        </div>`

            document.querySelector(DOMStrings.displayTable).insertAdjacentHTML('beforeend', html);
        },
        removeInput: function () {

            const html = `<div class="add-task">
                            <svg xmlns="http://www.w3.org/2000/svg"class="add-task__img" width="18.496" height="18.496" viewBox="0 0 18.496 18.496"><defs><style>.a{fill:none;stroke:#ff1654;stroke-width:2px;}</style></defs><g transform="translate(-1350.973 180.058)"><path class="a" d="M1350.973-173.224h18.5" transform="translate(0 2.847)"/><path class="a" d="M1357.5-181.058v18.5" transform="translate(2.719 1)"/></g></svg>
                            <p class="add-task__text">Add Task</p>
                          </div> `

            document.querySelector(DOMStrings.displayInput).remove();


            document.querySelector(DOMStrings.displayTable).insertAdjacentHTML('beforeend', html);
        },

        addItem: function (desc, id) {
            const html = `
                <div class="task" id="task-${id}">
                    <input class="task__checkbox" type="checkbox" id="check-${id}"  value="Nike">
                    <label class="task__label"for="check-${id}"></label>                   
                    <p class="task__text">${desc}</p>
                </div>
               `

            document.querySelector(DOMStrings.displayInput).insertAdjacentHTML('beforebegin', html);
        },

        removeItem: function (id) {
            setTimeout(() => {
                let el = document.getElementById(id);
                el.parentNode.removeChild(el);
            }, 180);
        },
        displayMonth(){
            let now;
        
            now = new Date();
            
            months = ['Jan', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
            month = now.getMonth();
            modifiedMonths = ['Jan', 'Feb', 'March', 'April', 'May', 'June', 'July', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']

            day = now.getDate();

            const date1 = months[month] + ' ' + day;
            const date2 = modifiedMonths[month] + ' ' + day;

            document.querySelector(DOMStrings.dateLabel).textContent =  date1;
            dates.push(date1, date2);

        
            
    
        },

        clearField: function () {
            let fieldsArr;

            fieldsArr = Array.from(document.querySelectorAll(`${DOMStrings.submitTaskInput}`));

            fieldsArr.forEach(el => el.value = "");


            fieldsArr[0].focus();

        },
        getDOMStrings: function () {
            return DOMStrings;
        },
        testing: function () {
            console.log(dataID);
        }

    }
})();

