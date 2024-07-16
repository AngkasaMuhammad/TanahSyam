"use strict"

let suara = {}

pl.javascript_ui.push(async aa=>{
	let lih = ru.lihat
	let que = ru.que
	lih('file suara js')
let acx = new AudioContext()
let audroket = null
let audboom = null
;{
	let src
src = que('#suararoket')[0].href
audroket = await fetch(src)
audroket = await audroket.arrayBuffer()
audroket = await acx.decodeAudioData(audroket)

suara.roket = ()=>{
	let ga = acx.createGain()
	let audbufroket = acx.createBufferSource()
	audbufroket.buffer = audroket;
	audbufroket.connect(ga).connect(acx.destination);
	audbufroket.start(0)
	
	return ga.gain
}
src = que('#suaraboom')[0].href
audboom = await fetch(src)
audboom = await audboom.arrayBuffer()
audboom = await acx.decodeAudioData(audboom)

suara.boom = ()=>{
	let ga = acx.createGain()
	let audbufboom = acx.createBufferSource()
	audbufboom.buffer = audboom;
	audbufboom.connect(ga).connect(acx.destination);
	audbufboom.start(0)
	
	return ga.gain
}
}

})
