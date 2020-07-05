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
    console.log(result)
});

function getTotalCapital(years,initialFund,monthlySaving,interestRate){
    let capital=initialFund;
    let months=years*12;
    let monthlyInterest=interestRate/12;
    for(let monthNumber=1; monthNumber<=months; monthNumber++){
        const monthlyProfit=capital/100*monthlyInterest;
        capital=capital+monthlyProfit+monthlySaving;
    }
    const investedCapital=initialFund+monthlySaving*months;
    const finalProfit=capital-investedCapital;
    return {
        capital,
        investedCapital,
        finalProfit
    };
}