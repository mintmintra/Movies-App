const contianer = document.querySelector('.container');
const seats = document.querySelectorAll('.row .seat:not(.occupied)');

const count = document.getElementById('count');
const total = document.getElementById('total');

const movieSelect = document.getElementById('movie');
let price = +movieSelect.value;


contianer.addEventListener('click', e => {
    if (e.target.classList.contains('seat') && !e.target.classList.contains('occupied')) {
        e.target.classList.toggle('selected');
        updateSelected();
    }
});

movieSelect.addEventListener('change', e => {
    price = +e.target.value;
    setMovieData(e.target.selectedIndex, e.target.value);
    updateSelected();
})

//เก็บข้อมูลที่นั่ง
function updateSelected() {
    const selectedSeats = document.querySelectorAll('.row .seat.selected');
    const countseats = selectedSeats.length;
    const seatsIndex = [...selectedSeats].map(seat => [...seats].indexOf(seat)); //หมายเลขที่นั่ง
    localStorage.setItem("selectedSeats", JSON.stringify(seatsIndex));
    count.innerText = countseats;
    total.innerText = countseats * price;
}
//เก็บข้อมูลหนัง
function setMovieData(movieIndex, moviePrice) {
    localStorage.setItem("movieIndex", movieIndex); //เก็บชื่อหนัง
    localStorage.setItem("moviePrice", moviePrice); //เก็บราคาหนัง
}

function showDatatoUI(){
    const selectedSeats=JSON.parse(localStorage.getItem("selectedSeats"));
    const selectmoveIndex=localStorage.getItem("movieIndex"); // ตำแหน่งหนังที่เรากดจองไว้
    seats.forEach((seat,index)=>{
        if(selectedSeats.indexOf(index)>-1){
            seat.classList.add('selected');
        }
    });
    if(selectmoveIndex !=null){
        movieSelect.selectedIndex=selectmoveIndex;
    }
}

showDatatoUI();
updateSelected();