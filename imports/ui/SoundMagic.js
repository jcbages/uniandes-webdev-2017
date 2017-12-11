import Tone from 'tone';
const X = 12;
const Y = 14;
export default class SoundMagic {

	constructor(composition,synth) {
		this.id = Math.random();
		let noteNames = ["C3","D3","E3","F3","G3","A3","B3","C4","D4","E4","F4","G4","A4","B4"];
		this.loop = new Tone.Sequence(((Y,composition,synth)=> { return(
			(time, col) =>{  
				for (let i = 0; i < Y; i++){                
					let acum = false;
					for (let k = 0; k < composition.length ; k++) {
						if (composition[k][col*Y+i] === '1') {
							acum = true;
						}
					}
					if (acum){
						synth.triggerAttackRelease(noteNames[14-i-1],.150,time);
					}
				}
			});
		})(Y,composition,synth), [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11], .150);    
	}

	start() {
		this.loop.start();
	}

	stop() {
		this.loop.stop();
	}
}