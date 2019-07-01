document.addEventListener('DOMContentLoaded', function () {
    /*localStorage.clear();*/
    function loading() {
            if (JSON.parse(localStorage.getItem("localstorage")) === null) {
            console.log('null');
            Arrfilms2 = {
                film1: ['Moonlight (2019)', 'stars', '4'],
                film2: ['Green Book (2019)', 'stars', '5'],
                film3: ['Spotlight (2017)', 'stars', '3'],
                film4: ['The Artist (2012)', 'stars', '5'],
                film5: ['The Shape of Water (2018)', 'stars', '5']
            }
        } else {
            Arrfilms2 = JSON.parse(localStorage.getItem("localstorage"));
        };
    };
    loading();
    
    //Adding of new film    
    const newfilm = document.getElementById('add');
    newfilm.addEventListener('click', (e) => {
    e.preventDefault;    
    film = document.getElementById('input').value; 
    keys = Math.random();
    let Arr=[];
    Arr.push(film, 'stars', 0);
    Arrfilms2['newfilm']=Arr; 
    let serialObj = JSON.stringify(Arrfilms2);
    localStorage.setItem("localstorage", serialObj);
    });
    
    //creating table from massive in localstorage
    tableCreate();
    function tableCreate() {
        let body = document.body,
            tbl = document.createElement('table');
        for (const key in Arrfilms2) {
            let tr = tbl.insertRow();
            //1 col
            let td = tr.insertCell();
            td.appendChild(document.createTextNode(Arrfilms2[key][0]));
            td = tr.insertCell();
            //2 col
            let div = document.createElement('div');
            td.appendChild(div);
            div.classList.add('stars');
            for (let j = 0; j < 5; j++) {
                let span = document.createElement('span');
                span.innerHTML = '&nbsp;';
                div.appendChild(span);
                span.classList.add('star');
            }
            //3 col
            td = tr.insertCell();
            td.appendChild(document.createTextNode(Arrfilms2[key][2]));
        }
        body.appendChild(tbl);
        
        //getting current star-rating 
        let rowsArray = [].slice.call(tbl.rows);
        rowsArray.forEach(function (td, indexrow) {
            let stars = td.querySelectorAll('.star');
            stars.forEach(function (star) {
                star.addEventListener('click', setRating);
                stars.forEach(function (star, index) {
                    let keys = [];
                    for (let key in Arrfilms2) {
                        keys.push(key);
                    }
                    if (index < Arrfilms2[keys[indexrow]][2]) {
                        star.classList.add('rated');
                    } else {
                        star.classList.remove('rated');
                    }
                });
            });

            function setRating(ev) {
                let span = ev.currentTarget;
                let stars = td.querySelectorAll('.star');
                let match = false;
                let num = 0;
                stars.forEach(function (star, index) {
                    if (match) {
                        star.classList.remove('rated');
                    } else {
                        star.classList.add('rated');
                    }
                    if (star === span) {
                        match = true;
                        num = index + 1;
                    }
                })

                td.querySelector('.stars').setAttribute('data-rating', num);
                let counter = 0;
                for (let key in Arrfilms2) {
                    if (counter === indexrow) {
                        Arrfilms2[key][2] = num;
                        let serialObj = JSON.stringify(Arrfilms2);
                        localStorage.setItem("localstorage", serialObj);
                        return;
                    } else {
                        counter = counter + 1;
                    }
                }
            }
        });

        sort();

        function sort() {
            let tbody = document.getElementsByTagName('tbody')[0];
            let rows = [];
            for (let i = 0; i < tbody.children.length; i++) {
                rows.push(tbody.children[i]);
            }
            rows.sort(function (a, b) {
                return b.lastChild.innerHTML - a.lastChild.innerHTML;
                if (a == b) {
                    rows.sort(function (a, b) {
                        return a.firstChildChild.innerHTML > b.firstChild.innerHTML;
                    })
                }
            })
            for (let i = 0; i < rows.length; i++) {
                tbody.appendChild(rows[i]);
            }
        }
    }
});
