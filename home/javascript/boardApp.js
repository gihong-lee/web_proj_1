const listing = document.querySelector('#listing');

function getCookie(name) {
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) return parts.pop().split(';').shift();
}

function listingHandler(){
  const listingNum = listing.value;
  document.cookie = `listingNum = ${listingNum};`;
  location.reload();
}

function main(){
  console.log(getCookie('listingNum'))
  for(let i, j = 0; i = listing.options[j]; j++) {
    if(i.value == getCookie('listingNum')) {
      listing.selectedIndex = j;
      break;
    }
  }
  console.log(getCookie("listingNum"))
  listing.addEventListener('input', listingHandler)
}

main();