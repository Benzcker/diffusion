import {newAtom} from './Atom.js';
import loadDOM from './DOM.js';
import Membran from './membran';




let membran;

window.onload = function(){

    loadDOM()
    .then(DOM_obj => {
        const DOM = DOM_obj;
        
        const screen = DOM.screen;
        const context = screen.getContext('2d');
        
        let running = false;
        
        let temperature = 200;
        const maxTemp = 1000;
        let backgroundC = 'rgb(255, 255, 255)';
        let background = document.createElement('canvas');
        background.width = screen.width;
        background.height = screen.height;
        const bgContext = background.getContext('2d');
        bgContext.fillStyle = backgroundC;
        bgContext.fillRect(0, 0, background.width, background.height);
        
        function updateTemp() {
            // temperature = DOM.temp.value;
            // let red = 255;
            // let blue = 255;
            // const green = Math.abs(red - blue);
            // if (temperature > 500) {
            //     blue -= (temperature-500) / 500 * 255;
            // } else {
            //     red -= temperature / 500 * 255;
            // }
            // bgContext.fillStyle = 'rgba('+red+', '+0+', '+blue+', 0.05)';
            // bgContext.fillRect(0, 0, background.width, background.height);
            // // bgContext.fillStyle = 'rgba('+red+', 0, 0, 0.9)';
            // console.log(Math.round(red), Math.round(green), Math.round(blue));
            // bgContext.fillRect(0, 0, background.width, background.height);
        }


        const atoms = [];
        
        window.deleteAtoms = () => {
            atoms.length = 0;
        }

        window.newAtoms = () => {
            ['L', 'R'].forEach(side => {
                
                
                const r = parseInt(DOM['atomRadius'+side].value);
                const color = DOM['atomColor'+side].value;
                const count = parseInt(DOM['atomCount'+side].value);
                
                for (let i = 0; i < count; i++) {
                    const x = Math.random()*screen.width/2 + (side==='L' ? 0 : screen.width/2);
                    const y = false;
                    atoms.push(newAtom(x, y, r, color, screen, side));
                }
            });
        }
        
        
        
        window.start = () => {
            if (atoms.length > 0) {
                shuffle(atoms)

                DOM.initL.hidden = true;
                DOM.initM.hidden = true;
                DOM.initR.hidden = true;
                DOM.settings.hidden = false;
                
                // DOM.tableScreen.width = '100%';
                // DOM.tableSettings.width = '0%';
                
                if (DOM.membran.value !== 'none'){
                    membran = new Membran(DOM.membran.value, screen);
                }

                running = false;
                window.pauseToggle();
            }
        }
        
        window.stop = () => {
            DOM['initL'].hidden = false;
            DOM['initM'].hidden = false;
            DOM['initR'].hidden = false;
            DOM.settings.hidden = true
            
            // DOM.tableScreen.width = '55%';
            // DOM.tableSettings.width = '45%';
            
            membran = undefined;
            deleteAtoms();
            running = false;
        }
        
        window.pauseToggle = () => {
            running = !running;
            
            if (running){
                DOM.pauser.innerText = 'PAUSE';
            } else {
                DOM.pauser.innerText = 'WEITER';
            }
        }
        

        function draw() {
            // updateTemp();
            context.drawImage(background, 0, 0);

            if (membran) {
                membran.draw(context);
            }

            atoms.forEach(atom => {
                atom.draw(context);
            });
        }

        let lastTime = 0;
        const stepSize = 1/60;
        let dt = 0;
        function update(time = 0){
            let diff = (time - lastTime) / 1000; 
            if (diff > 1){
                diff = 1;
            }
            dt += diff;

            temperature = DOM.temp.value;

            while (dt > stepSize){
                atoms.forEach(atom => {
                    if (running) {
                        atom.update(stepSize, temperature, screen, membran);
                    }
                });
                dt -= stepSize;
            }
            
            // context.clearRect(0, 0, screen.width, screen.height);
            draw();
            
            lastTime = time;
            requestAnimationFrame(update);
        }
        update();
        


    });
}


function shuffle(a) {
    for (let i = a.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [a[i], a[j]] = [a[j], a[i]];
    }
}