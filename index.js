let data = []; 
const header = document.createElement("div")
header.className = "container header"
header.innerHTML = `
<select id="product_type">
<option value="">Select Category</option>
    <option value="blush">Blush</option>
    <option value="eyeliner">Eyeliner</option>
    <option value="eyeshadow">Eyeshadow</option>
    <option value="foundation">Foundation</option>
    <option value="lipstick">Lipstick</option>
    <option value="mascara">Mascara</option>
    <option value="nail_polish">Nail polish</option>
    
<input type="search" placeholder="Search by Name" id="form1" class="form-control mysearch" />
<div class="pricerange">
<span>Price Range</span>
<input type="range" value="5" step="2" class="form-range" min="5"  max="20"  id="customRange1"> 
</div>

`
document.body.appendChild(header);


// search bar

const searchbar = document.getElementById('form1');
searchbar.addEventListener('keyup', (e) => {
    search_term = e.target.value;
    console.log(search_term)
    const searchFilter = data.filter((curItem) => curItem.name.toLowerCase().includes(search_term.toLowerCase()
    || curItem.brand.toLowerCase().includes(search_term.toLowerCase())
    ));
    displayData(searchFilter);
}
)


// price range
const range = document.getElementById('customRange1');
range.addEventListener('change', (e) => {
    price_greater = e.target.value;
    console.log(price_greater)
    const priceRangeFilter = data.filter((curItem) => curItem.price <= price_greater);
    displayData(priceRangeFilter);
})


// main div
const main = document.createElement('div');
main.id="main";
document.body.append(main);

// left side
const leftside = document.createElement('div');
leftside.id="leftside";
main.appendChild(leftside);

// right side
const rightside = document.createElement('div');
rightside.id="rightside";
main.appendChild(rightside);


var brand = ''
var product_type = ''
var price_greater_than = ''
var price_less_than = ''
var rating_greater_than=''
// fetching data from api
const FetchData = async () => {
    try {
        const response = await fetch(`https://makeup-api.herokuapp.com/api/v1/products.json?brand=maybelline`);
        data = await response.json(); 
    // Note since a lot of objects not have image_link in the starting responses, I have loop from 100 to the length of the data
        // data = data.slice(100,800)
        console.log(data);
        displayData(data);
    } catch (error) {
        console.error(error);
    }
};

// rendering data to the screen
const displayData = (response) => {
    let html = '';
    response.map(item => {
        // console.log(item);
       let  rating=item.rating;
       console.log()
        html += `
        <div class="row mydiv">
        <h5 class="myname">${item.name.slice(0,20).toUpperCase()}</h5>

        <div class="col">
            <img class="myimage" onerror="this.onerror=null;this.src='https://www.insticc.org/node/TechnicalProgram/56e7352809eb881d8c5546a9bbf8406e.png'" src="${(item.image_link.length>0)?item.image_link:"https://www.google.co.in/images/branding/googlelogo/1x/googlelogo_color_272x92dp.png"}" alt="">
            </div>
            <div class="col">
            <p class="myprice">Price : ${item.price}$ </p>
            <p class="myproduct">Product : ${item.product_type}</p>
            <p class="myrate">${rating==null?"ratings not available":"Rating : " + rating}</p>
        </div>
        <div class="colors">
        <span style="margin-left:40px">Available Shades : </span>
        ${(item.product_colors.length===0)?`<span>Only Default Shade</span>`:`${item.product_colors.slice(0,7).map(color => `<div class="color" style="background-color:${color.hex_value}; height: 20px; margin: 3px 3px 3px 3px"></div>`).join('')}
        `}
        </div>
        </div>        
        `;
    }
    );
    document.getElementById('rightside').innerHTML = html;
}
FetchData();
 
selectedValue = document.getElementById('product_type');
selectedValue.addEventListener('change', () => {
    product_type = selectedValue.value;
    const categoryFilter = data.filter((curItem) => curItem.product_type === product_type);
    console.log(categoryFilter)
    displayData(categoryFilter);
    console.log(product_type);
})

//price





