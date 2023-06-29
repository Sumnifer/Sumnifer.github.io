let cookie = 0;
let multiplicator = 1;
let cookieBtn = document.querySelector('.body__main_container_cta');
let cookieCount = document.querySelector('.cookieCount');
cookieCount.innerHTML = '0';

cookieBtn.addEventListener("click", function (){
    console.log("Click !")
    cookie = cookie + (multiplicator);
    console.log("Cookies : " + cookie)
    cookieCount.innerHTML=cookie;
})

function updateCookie(){
    cookieCount.innerHTML = cookie;
}

let amelioration1 = document.querySelector('.amelioration1');
let amelioration2 = document.querySelector('.amelioration2');
let amelioration3 = document.querySelector('.amelioration3');
let amelioration4 = document.querySelector('.amelioration4');
let cost1 = 10;
let amelioration1Cost =document.querySelector('.cost1');
amelioration1Cost.innerHTML = cost1;
let level1 = 1;
let amelioration1Level = document.querySelector('.level1');
amelioration1Level.innerHTML = level1;



        amelioration1.addEventListener("click", function () {
            if (cookie >= cost1) {
                cookie = cookie - cost1;
                cost1 = Math.round(cost1 * 1.10);
                multiplicator = multiplicator + 1;
                level1++;
                amelioration1Level.innerHTML = level1;
                amelioration1Cost.innerHTML = cost1;
                updateCookie();
            } else {
                console.log("Pas assez de Cookies ! ")
            }
        })


