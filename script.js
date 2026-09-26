let list = JSON.parse(localStorage.getItem("list")) || [];

let result = document.getElementById("list")
let btn = document.getElementById("submit")
btn.addEventListener("click", (e) => {


    e.preventDefault();
    let ename = document.getElementById("ename").value
    let amount = document.getElementById("amount").value
    let cat = document.getElementById("category").value

    const obj = {
        id: Date.now(),
        name: ename,
        amount: amount,
        category: cat
    }
    // localStorage.setItem("expense", JSON.stringify(list))
    
    list.push(obj);
    addExpense()
})

function addExpense() {

    result.innerHTML = ""
    // localStorage.setItem("list", JSON.stringify(list))
    saveToExpense()
    list.forEach((item) => {
        result.innerHTML += `<li>${item.name} - ${item.amount} - ${item.category} - <button onclick="deleteExpense(${item.id})">Delete</button></li>`
    })
}

function saveToExpense(){
    localStorage.setItem("list", JSON.stringify(list))
}

function deleteExpense(id) {
    list = list.filter((item) => {
        return item.id !== id
    })
    saveToExpense()
    addExpense()
}

addExpense();