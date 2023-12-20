const list = document.getElementById("list");
const createBtn = document.getElementById("create-btn");

let items = [];

createBtn.addEventListener('click', createItem);

function createItem() {
    const item = {
        id: new Date().getTime(),
        text: "",
        complete: false
    }

    items.unshift(item);

    const {itemEl, textEl} = createItemElement(item);

    list.prepend(itemEl);

    textEl.removeAttribute("disabled");
    textEl.focus();

    saveToLocalStorage();
}

function createItemElement(item) {
    const itemEl = document.createElement("div");
    itemEl.classList.add("item");

    if (item.complete) {
        itemEl.classList.add("complete");
    }

    const checkBoxEl = document.createElement("input");
    checkBoxEl.type = "checkbox";
    checkBoxEl.checked = item.complete;

    const textEl = document.createElement("input");
    textEl.type = "text";
    textEl.value = item.text;
    textEl.setAttribute("disabled", "");

    let actionsEl = document.createElement("div");
    actionsEl.classList.add("actions");

    let editEl = document.createElement("button");
    editEl.classList.add("material-icons");
    editEl.innerText = "edit";

    let removeEl = document.createElement("button");
    removeEl.classList.add("material-icons", "remove-btn");
    removeEl.innerText = "remove_circle";

    actionsEl.append(editEl, removeEl);
    itemEl.append(checkBoxEl, textEl, actionsEl);

    // Events
    checkBoxEl.addEventListener("change", () => {
        item.complete = checkBoxEl.checked;

        if (item.complete) {
            itemEl.classList.add("complete");
        } else {
            itemEl.classList.remove("complete");
        }

        saveToLocalStorage();
    });

    textEl.addEventListener("input", () => {
        item.text = textEl.value;
    })

    textEl.addEventListener("blur", () => {
        textEl.setAttribute("disabled", "");

        saveToLocalStorage();
    });

    editEl.addEventListener("click", () => {
        textEl.removeAttribute("disabled");
        textEl.focus();
    });

    removeEl.addEventListener("click", () => {
        items = items.filter(i => i.id !== item.id);
        itemEl.remove();

        saveToLocalStorage();
    });

    return {itemEl, textEl}
}

function displayItems() {
    loadFromLocalStorage();

    for (let i = 0; i < items.length; i++) {
        const item = items[i];

        const {itemEl} = createItemElement(item);

        list.append(itemEl);
    }
}

displayItems();

function saveToLocalStorage() {
    const data = JSON.stringify(items);

    localStorage.setItem("items", data);
}

function loadFromLocalStorage() {
    const data = localStorage.getItem("items");

    if (data) {
        items = JSON.parse(data);
    }
}
