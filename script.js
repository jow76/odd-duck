"use strict"

const productContainer = document.querySelector("section")
const resultsButton = document.querySelector("section+div")
const image1 = document.querySelector("section img:first-child")
const image2 = document.querySelector("section img:nth-child(2)")
const image3 = document.querySelector("section img:nth-child(3)")

let clicks = 0;
const maxClicksAllowed = 25;

let allProducts = [];

function getRandomNumber(){
    return Math.floor(Math.random() * allProducts.length);
}

function Product(name, src){
    this.name = name;
    this.src = src;
    this.votes = 0;
    this.views = 0;
    allProducts.push(this);
}

function renderProducts(){
    let prod1 = getRandomNumber();
    let prod2 = getRandomNumber();
    let prod3 = getRandomNumber();
    while(prod1 === prod2 || prod1 === prod3 || prod2 === prod3){
        prod2 = getRandomNumber();
        prod3 = getRandomNumber();
    }
    image1.src = allProducts[prod1].src;
    image2.src = allProducts[prod2].src;
    image3.src = allProducts[prod3].src;
    image1.alt = allProducts[prod1].name;
    image2.alt = allProducts[prod2].name;
    image3.alt = allProducts[prod3].name;
    allProducts[prod1].views++;
    allProducts[prod2].views++;
    allProducts[prod3].views++;
}

function handleClick(event){
    if(event.target === productContainer){
        alert("Please click on a product image.")
    }
    else{
        clicks++
        let clickedProduct = event.target.alt;
        for(let i=0; i < allProducts.length; i++){
            if(clickedProduct === allProducts[i].name){
                allProducts[i].votes++;
                break
            }
        }
        if(clicks === maxClicksAllowed){
            productContainer.removeEventListener("click", handleClick);
            productContainer.className = "no-voting";
            resultsButton.addEventListener("click", renderChart)
            resultsButton.className = "clicks-allowed";
        }
        else{
            renderProducts();
        }
    }
}

function renderResults(){
    let ul = document.querySelector("ul")
    for (let i=0; i <allProducts.length; i++){
        let li = document.createElement("li")
        li.textContent = `${allProducts[i].name} had ${allProducts[i].views} views and was picked ${allProducts[i].votes} times.`
        ul.appendChild(li)
    }
    resultsButton.className = "clicks-not-allowed";
}

function renderChart(){
    const prodName = [];
    const prodViews = [];
    const prodVotes = [];
    for(let i=0; i<allProducts.length; i++){
        prodName.push(allProducts[i].name)
        prodViews.push(allProducts[i].views)
        prodVotes.push(allProducts[i].votes)
    }
    const data = {
        labels: prodName,
        datasets: [
            {
                label: "Views",
                data: prodViews,
                backgroundColor: ["#1ac8d5"],
            },
            {
                label: "Votes",
                data: prodVotes,
                backgroundColor: ["#f8fbbf"],
            },
        ]
    }
    const config = {
        type: "bar",
        data: data,
    }
    const productChart = document.getElementById("chart")
    const resultsChart = new Chart(productChart, config)
    resultsButton.className = "clicks-not-allowed";
}

const bag = new Product("bag", "images/bag.jpg")
const banana = new Product("banana","images/banana.jpg")
const bathroom = new Product("bathroom", "images/bathroom.jpg")
const boots = new Product("boots","images/boots.jpg")
const breakfast = new Product("breakfast", "images/breakfast.jpg")
const bubblegum = new Product("bubblegum","images/bubblegum.jpg")
const chair = new Product("chair","images/chair.jpg")
const cthulhu = new Product("cthulhu", "images/cthulhu.jpg")
const dogduck = new Product ("dog-duck","images/dog-duck.jpg")
const dragon = new Product("dragon","images/dragon.jpg")
const pen = new Product("pen","images/pen.jpg")
const petsweep = new Product("pet-sweep","images/pet-sweep.jpg")
const scissors = new Product("scissors","images/scissors.jpg")
const shark = new Product("shark","images/shark.jpg")
const sweep = new Product("sweep","images/sweep.png")
const tauntaun = new Product("tauntaun","images/tauntaun.jpg")
const unicorn = new Product("unicorn", "images/unicorn.jpg")
const watercan = new Product("water-can","images/water-can.jpg")
const wineglass = new Product("wine-glass","images/wine-glass.jpg")

renderProducts();
productContainer.addEventListener("click", handleClick)