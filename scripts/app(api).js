class Forcast{
    constructor(){
        this.apiKey='jCLPUDFqHDZV7369qCF3gfHGutmpcVKG'
        this.weatherURI='https://dataservice.accuweather.com/currentconditions/v1/'
        this.cityURI='https://dataservice.accuweather.com/locations/v1/cities/search'
    }
    async updateCity(city){
        const cityData = await this.getCity(city)
        const weather = await this.getWeather(cityData.Key)
        return { cityData,weather }
    }

    async getCity(city){
        const query= `?apikey=${this.apiKey}&q=${city}`
        const response =await fetch(this.cityURI+query)
        const data = await response.json()
        return data[0]

    }

    async getWeather(key){
        const query =`${key}?apikey=${this.apiKey}`
        const response =await fetch(this.weatherURI+query)
        const data = await response.json()    
        return data[0]

    }
}
