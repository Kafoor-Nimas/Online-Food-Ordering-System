export default function getFormattedPrice(price){
    
    //is price is a valid number
    if(price == null){
        return "N/A"
    }

    const priceInNumber = Number(price)

    if(isNaN(priceInNumber)){
        return "N/A"
    }else{
        return "Rs " + priceInNumber.toLocaleString("en-US", {minimumFractionDigits: 2, maximumFractionDigits: 2})
    }
}

