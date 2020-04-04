const apiKey= 'jCLPUDFqHDZV7369qCF3gfHGutmpcVKG'

const getCity = async(city)=>{

    const base= 'https://dataservice.accuweather.com/locations/v1/cities/search'
    const query= `?apikey=${apiKey}&q=${city}`
    const response =await fetch(base+query)
    const data = await response.json()
    return data[0]
} 

const getWeather =async(key)=>{

    const base= 'https://dataservice.accuweather.com/currentconditions/v1/'
    const query =`${key}?apikey=${apiKey}`
    const response =await fetch(base+query)
    const data = await response.json()
    
    return data[0]
}
