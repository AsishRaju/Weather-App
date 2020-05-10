const h1text = document.querySelector('.head-text')
const label = document.querySelector('.label')
const input = document.querySelector('.change-location')
const card = document.querySelector('.card')
const details =document.querySelector('.details')
const timeimg = document.querySelector('img.time')
const icon = document.querySelector('.icon img')
const forcast = new Forcast()


const updateUI=(data)=>{
    //destructure properties
    const {cityData,weather}=data;
    console.log(data)

    //update details template
    details.innerHTML=`
    <h5 class="my-3">
    ${cityData.EnglishName},${cityData.Country.EnglishName}
    </h5>
    <div class="my-3">${weather.WeatherText}</div>
    <div class="display-4 my-4">
        <span>${weather.Temperature.Metric.Value}</span>
        <span>&deg;C</span>
    </div>
    `

    // update day/night & icon images
    if(card.classList.contains('d-none'))
    {
        card.classList.remove('d-none')
    }

    const imgIcon= `img/icons/${weather.WeatherIcon}.svg`
    icon.setAttribute('src',imgIcon)

    var timeSrc
    if(weather.IsDayTime)
    {
        updateColor('day')

    }else{
        
        updateColor('night')
    }
    



}

function updateColor(time){
    window.scrollTo(0,document.body.scrollHeight);
    if(time==='day'){
        timeSrc='img/day.svg'
        timeimg.setAttribute('src', timeSrc)
        document.body.style.backgroundColor = "#e6ecf6"
        if(h1text.classList.contains('text-light') /*&& input.classList.contains('text-light')*/)
        {
            console.log('day-here')
            h1text.classList.remove('text-light')
            //input.classList.remove('text-light')
            details.classList.remove('text-light')
            h1text.classList.add('text-dark')
            //input.classList.add('text-dark')
            details.classList.add('text-muted')
            card.style.backgroundColor= "white"
        }
        else
        {
            console.log('day-not here')
        }
    }
    else{
        timeSrc='img/night.svg'
        timeimg.setAttribute('src', timeSrc)
        document.body.style.backgroundColor = "#0e2432";
        if(h1text.classList.contains('text-dark')/*&&input.classList.contains('text-dark')*/)
        {
            console.log('night-here')
            h1text.classList.remove('text-dark')
           // input.classList.remove('text-dark')
            details.classList.remove('text-muted')
            h1text.classList.add('text-light')
           // input.classList.add('text-light')
            details.classList.add('text-light')
            card.style.backgroundColor= "#081d27"
        }
        else{
            console.log('night-not here')
        }
    }
}

input.addEventListener('submit',(e)=>{
    
    e.preventDefault()
    const city=input.city.value.trim()
    localStorage.setItem('city',city)
    input.reset()
    input.city.blur()
    forcast.updateCity(city).then(data => updateUI(data))
                    .catch(err => console.log(err))
})

if(localStorage.getItem('city'))
{
    forcast.updateCity(localStorage.getItem('city'))
        .then(data => updateUI(data))
        .catch(err => console.log(err))
}