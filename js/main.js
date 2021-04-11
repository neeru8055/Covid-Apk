const country = document.getElementById('country');
const startDate = document.getElementById('startDate');
const endDate = document.getElementById('endDate');
const submit = document.getElementById('submit');
const container = document.querySelector('.container');

submit.addEventListener('click', (e) => {
    const v1 = country.value;
    const v2 = startDate.value;
    const v3 = endDate.value;
    let flag = false;
    flag = validate(v1, v2, v3);
    const url = `https://api.covid19api.com/country/${v1}?from=${v2}T00:00:00Z&to=${v3}T00:00:00Z`;
    if (flag) {
        fetch(url)
            .then(response => response.json())
            .then(data => {
                data.forEach((val) => {
                    const dataContainer = document.createElement('div');
                    dataContainer.classList.add('cases');
                    const p1 = document.createElement('p');
                    const p2 = document.createElement('p');
                    const p3 = document.createElement('p');
                    p1.innerText = 'Confirmed Cases : ' + val.Confirmed;
                    p2.innerText = 'Active Cases : ' + val.Active;
                    p3.innerText = 'Death Cases : ' + val.Deaths;
                    dataContainer.appendChild(p1);
                    dataContainer.appendChild(p2);
                    dataContainer.appendChild(p3);
                    container.appendChild(dataContainer);
                });
            });
    }
});

function validate(c, sd, ed) {
    //current date
    const dateObj = new Date();
    const d = dateObj.getDate();
    const m = dateObj.getMonth() + 1;
    const y = dateObj.getFullYear();
    let curDate;
    if (d < 10 && m < 10) 
        curDate = y + '-0' + m + '0' + d;
    else if (d < 10) 
        curDate = y + '-' + m + '-0' + d;
    else if (m < 10) 
        curDate = y + '-0' + m + '-' + d;
    else 
        curDate = y + '-' + m + '-' + d;
    
    if (c.length === 0) {
        alert('Enter a country name');
        return false;
    } else if (sd.length === 0) {
        alert('Enter a start date');
        return false;
    } else if (ed.length === 0) {
        alert('Enter a end date');
        return false;
    }  else if (sd >= curDate) {
        alert('Start date should be less than current date.');
        return false;
    }  else if (ed >= curDate) {
        alert('End date should be less than current date.');
        return false;
    } else if (sd >= ed) {
        alert('Start date should be less than end date');
        return false;
    } else 
        return true;
    }