const time = document.querySelector('.stopwatch')
const lastTime = document.querySelector('.time')
const startBtn = document.querySelector('.start')
const pauseBtn = document.querySelector('.pause')
const stopBtn = document.querySelector('.stop')
const resetBtn = document.querySelector('.reset')
const historyBtn = document.querySelector('.history')
const timeList = document.querySelector('.time-list')

const infoBtn = document.querySelector('.fa-question')
const modalShadow = document.querySelector('.modal-shadow')
const closeModalBtn = document.querySelector('.close')

const pickerBtn = document.querySelector('.fa-brush')
const modalPicker = document.querySelector('.modal-picker')
const colorBorders = document.querySelector('.buttons')

const pickerColorBtn1 = document.querySelector('.green')
const pickerColorBtn2 = document.querySelector('.red')
const pickerColorBtn3 = document.querySelector('.blue')

let countTime;
let minutes = 0;
let seconds = 0;

let timerList = [];
const buttons = [startBtn, pauseBtn, stopBtn, resetBtn, historyBtn]

const startTimer = () => {
    clearInterval(countTime)
    countTime = setInterval(() => {
        if (seconds < 9) {
            seconds++
            time.textContent = `${minutes}:0${seconds}`
        } else if(seconds < 59) {
            seconds++
            time.textContent = `${minutes}:${seconds}`
        } else {
            minutes++
            seconds = 0;
            time.textContent = `${minutes}:0${seconds}`            
        }
    }, 1000)
}

const pauseTimer = () => { 
    clearInterval(countTime)
}

const stopTimer = () => {
    clearInterval(countTime)
    if (seconds < 10) {seconds = `0${seconds}`}
    lastTime.textContent = `Ostatni czas: ${minutes}:${seconds}`
    if (lastTime.textContent !== 'Ostatni czas: 0:00') {
        lastTime.style.visibility = 'visible'
        timerList.push(lastTime.textContent)
    } else {
        lastTime.style.visibility = 'hidden'
    }
    time.textContent = '0:00'
    minutes = 0;
    seconds = 0;
}

const cleanTimer = () => {
    clearInterval(countTime)
    lastTime.style.visibility = 'hidden'
    time.textContent = '0:00'
    minutes = 0;
    seconds = 0;
    timerList = [];
    timeList.textContent = '';
}

const showHistory = () => {
    timeList.textContent = '';
    let num = 1;

    timerList.forEach(time => {
        const newTime = document.createElement('li')
        newTime.innerHTML = `Pomiar nr ${num}: <span>${time}</span>`
        timeList.append(newTime)
        num++
    })
}

const showModal = () => {
    if(modalShadow.style.display === 'block') {
        modalShadow.style.display = 'none';
    } else {
        modalShadow.style.display = 'block';
    }
    modalShadow.classList.toggle('modal-animation');
}

const showPicker = () => {
    if(modalPicker.style.display === 'block') {
        modalPicker.style.display = 'none';
    } else {
        modalPicker.style.display = 'block';
    }
    modalPicker.classList.toggle('modal-animation');   
}

const pickColor = (e) => {
    console.log(e.target.classList[2])
    time.style.color = e.target.classList[2]
    buttons.forEach(button => {
        button.style.color = e.target.classList[2]
        button.style.border = `1px solid ${e.target.classList[2]}`
    })
    showPicker()
}

startBtn.addEventListener('click', startTimer)
pauseBtn.addEventListener('click', pauseTimer)
stopBtn.addEventListener('click', stopTimer)
resetBtn.addEventListener('click', cleanTimer)
historyBtn.addEventListener('click', showHistory)
infoBtn.addEventListener('click', showModal)
closeModalBtn.addEventListener('click', showModal)
window.addEventListener('click', e => e.target === modalShadow ? showModal() : false)
pickerBtn.addEventListener('click', showPicker)
pickerColorBtn1.addEventListener('click', pickColor)
pickerColorBtn2.addEventListener('click', pickColor)
pickerColorBtn3.addEventListener('click', pickColor)


