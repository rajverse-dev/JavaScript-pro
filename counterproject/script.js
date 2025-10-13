let countEl=document.getElementById("count-el");
console.log(countEl);//print the with full coutEl tag
let count=0
function increment(){
    
    count=count+1
    console.log(count)
    countEl.innerText=count
}

let saveEl=document.getElementById("saved-el")
function save(){

    let countStr= count + " - "
    saveEl.textContent += countStr
    countEl.textContent=0
    count=0
    console.log(count)
}


