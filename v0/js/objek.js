"use strict"

let obj = {}
pl.javascript_ui.push(async ()=>{
	let lih = ru.lihat
	
	let abs = Math.abs
	let sin = Math.sin
	let atan = Math.atan
	let pi = Math.PI
	
	let v3 = wgpuMatrix.vec3
	let m3 = wgpuMatrix.mat3
	let m4 = wgpuMatrix.mat4
	let matide = m4.identity()
	
	lih('ini objek js')
let roketarr = []

let packwarna = arrrgba=>
new Uint32Array(
	new Uint8ClampedArray(
		arrrgba
		.map(fmappackwarna)
		.reverse()
	).buffer
)[0]

let fmappackwarna = aa=>aa*0xff

ru.que('.timespeed')[0].addEventListener('input',e=>{
	pl.timespeed = +e.currentTarget.value
},)

ru.que('#SHadvmenu')[0].addEventListener('click',e=>{
	e.currentTarget.textContent = 
		ru
		.que('#ui')[0]
		.classList
		.toggle('showadvmenu')
	?'Show Advanced'
	:'Hide Advanced'
},)

let farma = sudut=>{//arah matahari
	let m = m4.rotationZ(sudut)
	let v = v3.transformMat4([0,1,0,],m,)
	pl.updarahmatahari(v)
	
	let wei = sin(sudut+pi/2)
	let sunsky = atan(4*wei)*1.26/pi+.5
	let r = sunsky-.8
	let g = sunsky-.3
	let b = sunsky
	let a = 1.//.5
	pl.setlangit([r,g,b,a,])
	
	r = sunsky
	g = sunsky*sunsky
	b = atan(3*wei)
	a = -sunsky*.6+.75
	pl.updsinar(packwarna([r,g,b,a,]))
	
	r =
	g = -.08*wei-.01
	b = .08*wei+.1
	a = -abs(wei*.4)+.8-wei*.3
	pl.updbayangan(packwarna([r,g,b,a,]))
}
let arahmatahari = ru.que('.arahmatahari')[0]
arahmatahari.addEventListener('input',e=>farma(+e.currentTarget.value),)
addEventListener('mouseup',e=>arahmatahari.blur(),)
farma(0)
let objtype = ru.que('.objtype')[0]
for(let {name} of pl.drawarr){
	let op = document.createElement('option')
	objtype.appendChild(op)
	op.value = op.textContent = name
}
ru.que('.newobj')[0].addEventListener('click',()=>{
	ui.newobj(objtype.value)
})

let bikinroket =
obj.bikinroket = ()=>{
	let node = ui.newobj('rangkaroket')
	let s = 1.4
	let a0 = Math.random()*.3-.15
	let a1 = Math.random()*.3-.15
	let a2 = Math.random()*.3-.15
	let pos = v3.set(
		Math.random()*1111-555,
		44,
		Math.random()*1111-555,
	)
	let suararoket = suara.roket?.()
	let suaraboom = suara.boom
	;(suararoket??{}).value = .1
	let o = {
		rangka:node,
		pos,
		speed:v3.set(s+a0,s+a1,-s+a2,),
		suaraboom,
	}
	roketarr.push(o)
	
	return o
}
let lrr = 0 //luncurkan roket reload
let lrre = 0 //luncurkan roket recoil
let lrc = 0 //luncurkan roket count

//setTimeout(obj.bikinroket,1111,)
let render0 = dt=>{
	//arah matahari
	
	let arma = arahmatahari
	let v = +arma.value
	farma(v += dt*.00001)
	arma.value = v
	if(+arma.max < v){
		arma.value = +arma.min
	}
	
	//lampu gedung
	let g1arr = pl.drawarr[7].objarr
	if(!g1arr.length){return}
	let i = Math.floor(Math.random()*g1arr.length)
	let g1 = g1arr[i].node
	eTS.warnagedung(g1,(Math.cos(arma.value) > .0)+2,)
}
let render1 = dt=>{
	//roket
	
	for(let r of roketarr){
let rangka = r.rangka
let pos = r.pos

if(pos[1] < -111){
	ui.deleteobj(rangka)
	r.dihapus = true
	;(r.suaraboom?.()??{}).value = Math.random()*.04+.05
	continue
}

let m = rangka.matlok
let speed = r.speed
let posawal = [...pos]

speed[1] -= .0001*dt
v3.addScaled(pos,speed,dt,pos)
m4.cameraAim(posawal,pos,[0,1,0,],m,)
m4.scale(m,[5,5,5,],m,)

	}
	for(let i = 0;i < roketarr.length;i++){
		let r = roketarr[i]
		if(r.dihapus){
			roketarr.splice(i--,1,)
		}
	}
}
let render2 = dt=>{
	//luncurkan roket
	
	lrr -= dt
	if(lrr <= 0){
		lrc = ru.acak(11)+5
		lrr = ru.acak(22222)+4444
	}
	if(lrc > 0 && lrre <= 0){
		bikinroket()
		lrre = ru.acak(77)+44
		lrc--
	}else{
		lrre -= dt
	}
	
}
pl.render.push(dt=>{
	render0(dt) //arah matahari
	render1(dt) //roket
	render2(dt) //luncurkan roket
})
setTimeout(()=>lih('!!!!!\n\n\n\n\nsampe sini, lampu geddung siang malam\n\n\n\n!!!!!'),1111,)

return 0 //=-=-=-=-=-=-=-=-=-=-=-=-=-=-

/*










*/
	ui.newobj('rangkaxyz')
	let tanah = ui.newobj('rangkatanah')
	m4.scaling([99,99,99,],tanah.matlok,)
let bikingedung = (
	setm,
	l,h,w,
	mdep,msam,
)=>{//length width height jendela
	let g = ui.newobj('rangkagedung0')
	let m = g.matlok
	m4.copy(setm,m,)
	m4.scale(m,[l*10,h*10,w*10,],m,)
	m3.copy(mdep,g.mat2d[1],)
	m3.copy(msam,g.mat2d[0],)
//sampe sini, bikin bola, mau lihat arah sinar
}
let bikinkomplek = (
	x,z,rot,
	l,
	lg,wg,maxhg,
)=>{//g -->> gedung
for(let a = 0;a < l;a++){
	let hg = 1+ru.acak(maxhg)
	let m = m4.translation([x,0,z,])
	m4.rotateY(m,rot,m,)
	m4.translate(m,[a*10*(lg+1),0,0,],m,)
	
	//pilih warna
	let pw = (ru.acak(11) < 10)
	?ru.acak(1)
	:(2+ru.acak(1))
	let mdep = m3.translation([pw*200,0,])
	m3.scale(mdep,[lg*10,hg*10,],mdep,)
	let msam = m3.translation([pw*200,0,])
	m3.scale(msam,[wg*10,hg*10,],msam,)
	bikingedung(
		m,
		lg,hg,wg,
		mdep,msam,
	)
}
}

bikinkomplek(10,0,0, 6, 5,9,22)
bikinkomplek(20,80,1, 9, 3,5,6)

bikinkomplek(20,160,2, 33, 3,5,2)
bikinkomplek(20,240,3, 33, 3,5,3)
ui.render = dt=>{
	
	let m2d0
	let m3d0
}

})
