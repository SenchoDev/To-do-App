//  GLOBAL APP CONTROLLER-
const controller = (function (UiCtrl) {
    const setupEventListeners = function () {
        const DOM = UiCtrl.getDOMStrings();

        const parent = document.querySelector(DOM.displayTable);

        const addBtn = document.querySelector(DOM.plusSign);

        const inbox = document.querySelector(DOM.inbox);

        const today = document.querySelector(DOM.today);

        const searchBar = document.forms['search-tasks'].querySelector('input');



        parentEventListeners();

        inbox.addEventListener('click', inboxPage);
        today.addEventListener('click', todayPage);

        searchBar.addEventListener('keyup', function (e) {
            const term = e.target.value.toLowerCase();

            const lists = Array.from(document.querySelectorAll('.task .task__text'));

            const app = Array.from(document.querySelectorAll('.task'));

            lists.forEach((list, index) => {
                const title = list.textContent;
                if (title.toLowerCase().indexOf(term) != -1) app[index].style.display = 'flex';
                else app[index].style.display = 'none';
            })

        })

        addBtn.addEventListener('click', () => {
            const task = document.querySelector(DOM.displayInput);
            if (!task) showInput();
        });

    }


    const inboxPage = function () {

        //white background
        const el1 = document.querySelector('.navigation').firstElementChild;
        const el2 = document.querySelector('.navigation').getElementsByTagName('div')[1];
        el1.classList.add('white-2');
        el2.classList.remove('white-1');


        UiCtrl.dislayInbox();
    }

    const todayPage = function (e) {

        //whtie background
        const el1 = document.querySelector('.navigation').firstElementChild;
        const el2 = document.querySelector('.navigation').getElementsByTagName('div')[1];
        el1.classList.remove('white-2');
        el2.classList.add('white-1');

        UiCtrl.displayToday();

    }


    const showInput = function () {
        // remove add task bar when  clicked
        UiCtrl.removeAddInput();
        // insert add task
        UiCtrl.displayInput();
    }

    const deleteInput = function () {
        UiCtrl.removeInput();
    }


    const addTask = function () {
        let input, newItem;


        input = UiCtrl.getInput();

        if (input.description !== '') {
            // fiugre out each elements ID
            newItem = UiCtrl.calculateID(input.description);
            // add item to the ui to the top

            UiCtrl.addItem(newItem.description, newItem.id);

            // clear the field

            UiCtrl.clearField();

        }
    }

    const deleteTask = function (e) {
        //figure out how to delete it
        let itemID, splitID, ID, type;

        itemID = e.target.parentNode.id;

        if (itemID) {
            splitID = itemID.split('-');
            ID = parseInt(splitID[1]);


            //remove from the data structure

            UiCtrl.removeID(ID);

            //remove from the ui

            UiCtrl.removeItem(itemID);

        }
    }

    const parentEventListeners = function () {
        parent.addEventListener('click', e => {
            if (e.target.parentNode.className == 'add-task' || e.target.className == 'add-task') showInput();
            if (e.target.className == 'task__label') deleteTask(e);
            if (e.target.className == 'submit-task__cancle') deleteInput();
            if (e.target.className == 'submit-task__btn-red') addTask();
        });

        parent.addEventListener('keypress', e => {
            if (e.keyCode === 13) addTask();
        });

    }

    const dropdown = function() {
        const nav = document.querySelector('.searchbar__nav');
        const settings = document.querySelector('.settings-sharp');
        const arr = document.querySelector('.searchbar__arrow');


        settings.addEventListener('click', () => {
            nav.classList.toggle('display-block');
            arr.classList.toggle('display-block');
        })
    }


    return {
        init: function () {
            UiCtrl.displayMonth();
            setupEventListeners();
            dropdown();
        }
    }

})(UIController);

controller.init();