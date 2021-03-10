let paths = [
	"./audio/moan_01.mp3",
	"./audio/moan_02.mp3",
	"./audio/shreak_03.mp3",
	"./audio/shreak_01.mp3",
	"./audio/weird_03.mp3",
	"./audio/weird_01.mp3",
	"./audio/weird_04.mp3",
	"./audio/weird_02.mp3",
	"./audio/growl_01.mp3",
	"./audio/growl_02.mp3",
	"./audio/shortOoooh_01.mp3",
	"./audio/shortOoooh_03.mp3",
	"./audio/breath_08.mp3",
	"./audio/percusive_02.mp3",
	"./audio/percusive_03.mp3",
	"./audio/percusive_01.mp3"
];

let padKeys = [
	"1",
	"2",
	"3",
	"4",
	"q",
	"w",
	"e",
	"r",
	"a",
	"s",
	"d",
	"f",
	"z",
	"x",
	"c",
	"v"
];

let buttons = [...document.getElementsByTagName("button")];

buttons.forEach((btn, i) => {
	btn.onclick = () => {
		new Audio(paths[i]).play();
	};
});

document.body.onkeypress = e => {
	let index = padKeys.indexOf(e.key);
	if (index >= 0) buttons[index].click();
};
