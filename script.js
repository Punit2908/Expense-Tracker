let list = JSON.parse(localStorage.getItem("list")) || [];
let total = document.getElementById("total")
// console.log(total)
let result = document.getElementById("list")
let btn = document.getElementById("submit")
let btn2 = document.getElementById("debit")
btn.addEventListener("click", (e) => {

    e.preventDefault();
    let ename = document.getElementById("ename").value
    let amount = document.getElementById("amount").value
    let cat = document.getElementById("category").value

    const obj = {
        id: Date.now(),
        type: "credit",
        name: ename,
        amount: amount,
        category: cat
    }
    // localStorage.setItem("expense", JSON.stringify(list))

    list.push(obj);
    addExpense()
    totalSum()
})
btn2.addEventListener("click", (e) => {
    e.preventDefault();
    let ename = document.getElementById("ename").value
    let amount = document.getElementById("amount").value
    let cat = document.getElementById("category").value

    const obj = {
        id: Date.now(),
        type: "debit",
        name: ename,
        amount: amount,
        category: cat
    }
    // localStorage.setItem("expense", JSON.stringify(list))

    list.push(obj);
    addExpense()
    totalSum()
})
function addExpense() {

    result.innerHTML = ""
    // localStorage.setItem("list", JSON.stringify(list))
    saveToExpense()
    list.forEach((item) => {
        if (item.name && item.amount) {
            result.innerHTML += `<div class="list-item">
        <p>${item.name}</p> <p class=${item.type}>${item.amount} </p><p> ${item.category} </p> <button onclick="deleteExpense(${item.id})">Delete</button></div>`
        }
    })
}

function saveToExpense() {
    localStorage.setItem("list", JSON.stringify(list))
}

function totalSum() {
    let total2;
    let sum1 = list.reduce((sum, el) => {
        // console.log(el.amount)
        if(el.type == "credit"){
            return sum + Number(el.amount);
        }
    },0) || 0
    let sum2 = list.reduce((sum, el) => {
        // console.log(el.amount)
        if(el.type == "debit"){
            return sum + Number(el.amount);
        }
    },0) || 0
    console.log(sum1)
    total.innerHTML = `The total cash Out are <span class="sum">${sum1}</span> and the total cash In is <span class="sum">${sum2}</span> and the remaining wallet is <span class="sum">${sum2-sum1}</span>`
}
function deleteExpense(id) {
    list = list.filter((item) => {
        return item.id !== id
    })
    totalSum()
    saveToExpense()
    addExpense()
}
function reset(){
    list = []
    totalSum()
    saveToExpense()
    addExpense()
}
addExpense();
totalSum()