export default function loadDOM() {

    return new Promise(func => {
        fetch('./DOM_Elems.json')
        .then(outp => outp.json())
        .then(elems => {
            const DOM = {};

            elems.forEach(elem => {

                DOM[elem] = document.getElementById(elem);
                
            });

            func(DOM);

        });

    });

}