function byId(id) {
    return document.getElementById(id);
}

byId('investment-term').addEventListener('change', (evt)=>{
    byId('investment-term-label').innerText=evt.target.value;
})

byId('return-on-investment').addEventListener('change', (evt)=>{
    byId('return-on-investment-text').innerText=evt.target.value;
})

function getFloatFromId(id) {
    return parseFloat(byId(id).value);
}

byId('form').addEventListener('submit', (event)=>{
    event.preventDefault();
    const years=getFloatFromId('investment-term');
    const initialFund=getFloatFromId('initial-fund');
    const monthlySaving=getFloatFromId('monthly-saving');
    const interestRate=getFloatFromId('return-on-investment');
    const result=getTotalCapital(years,initialFund, monthlySaving,interestRate);
    showResult(result.capital, byId('final-capital'));
    showResult(result.investedCapital, byId('invested-capital-output'));
    showResult(result.finalProfit, byId('profit'));    

});

function getTotalCapital(years,initialFund,monthlySaving,interestRate){
    let capital=initialFund;
    let months=years*12;
    let monthlyInterest=round((1+interestRate)**(1/12)-1);
    for(let monthNumber=1; monthNumber<=months; monthNumber++){
        const monthlyProfit=round(capital/100*monthlyInterest);
        capital=round(capital+monthlyProfit+monthlySaving);
    }
    const investedCapital=initialFund+monthlySaving*months;
    const finalProfit=round(capital-investedCapital);
    return {
        capital,
        investedCapital,
        finalProfit
    };
}

function showResult (result, span){
    span.innerText=(result)
}

function round (number){
    const str=number.toString();
    const splitStr=str.split('.')
    if (splitStr[1]===undefined){
        return number;
    }
     else if (splitStr[1]!==''){
        const decimal=splitStr[1].slice(0, 2)
        let roundedNumber = parseFloat (splitStr[0] + '.' + decimal);
        return roundedNumber;
    }
}
