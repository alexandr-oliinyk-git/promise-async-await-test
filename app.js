const axios = require('axios');

const getExchaingeRate = async (from, to) => {
    try{
    const res = await axios.get(`https://api.fixer.io/latest?base=${from}`)
    const rate =  res.data.rates[to];
   
    if(rate) return rate 
    else throw new Error(`in message getExchaingeRate ${from} and ${to}`)

    }catch(err){
        throw new Error(`status:${err}\n in message getExchaingeRate ${from} and ${to}`)
    }
 };

const getCountries = async (code) => {
    try{
        const res = await axios.get(`http://restcountries.eu/rest/v2/currency/${code}`);
        return res.data.map((country) => country.name)
    } catch(err) {
        throw new Error(`status:${err}\n in message getCountries ${code}`)
    }
    
};


covertAlt = async (from, to, amount) => {
    const countries = await getCountries(to)
    const rate = await getExchaingeRate(from, to);
    const exchangedAmount = amount * rate;
    return `${amount} ${from} is worth ${exchangedAmount} ${to}.\n${to} can be used in following countries ${countries.join(', ')}.`;
};


covertAlt('USD', 'CAD', 100).then(status => {
    console.log((status == undefined)? 'No status return' :status)
}).catch((err) => console.log(err.message))