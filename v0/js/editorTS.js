"use strict"

//editor TanahSyam
let eTS = {}

;{
	let lih = ru.lihat
	let v2 = wgpuMatrix.vec2
	let v3 = wgpuMatrix.vec3
	let m3 = wgpuMatrix.mat3
	let m4 = wgpuMatrix.mat4
	let attr = ru.attr
	let que = ru.que
	
	let datang = e=>moutex.textContent = attr(e.target,'mousedescr',)
	let pergi = e=>moutex.textContent = ''
	let moutex = que('#moutex')[0]
	let w = pl.canv.width
	let h = pl.canv.height
let open = que('#open')[0]
let save = que('#save')[0]
let saveas = que('#saveas')[0]
let fhsave//file handle
let femptyproject = ()=>{
	lih('kosongkan')

for(let draw of pl.drawarr){
	ru.habisarr(draw.objarr)
}

}
let execjson = json=>{
	lih(json)

for(let prop in json){
	let drawsrc = json[prop]

for(let objsrc of drawsrc){
	let nodedstarr = [ui.newobj(prop)]

for(let i = 0;i < nodedstarr.length;i++){
	let nodedst = nodedstarr[i]
	let m = nodedst.matlok
	let nodesrc = objsrc[nodedst.name]
	m4.copy(nodesrc.matlok,m,)
	if(nodedst.mat2d){

for(let j = 0;j < nodedst.mat2d.length;j++){
	let mat2ddst = nodedst.mat2d[j] 
	m3.copy(nodesrc.mat2d[j],mat2ddst,)
}

	}
	nodedstarr.push(...nodedst.chi)
}
	
}

}

}
let fsaveas = async ()=>{
	fhsave = await showSaveFilePicker()
	attr(save,'mousedescr','Save '+fhsave.name,)
	fsave()
}
let fsave = async ()=>{
	let json = savejson()
	
	if(!fhsave){return}
	let wri = await fhsave.createWritable()
	await wri.write(lih(JSON.stringify(json,null,'\t',)))
	await wri.close()
}
let savejson = ()=>{
	let json = {}

for(let draw of pl.drawarr){
	let objarr = json[draw.name] = []

for(let obj of draw.objarr){
	let nodearr = [obj.node]
	let nodeprop = {}

for(let i = 0;i < nodearr.length;i++){
	let node = nodearr[i]
	let nodeout = nodeprop[node.name] = {matlok:[...node.matlok],}
	if(node.mat2d){
		let mat2d = []

for(let mat2dini of node.mat2d){
	mat2d.push([...mat2dini])
}

		nodeout.mat2d = mat2d
	}
	nodearr.push(...node.chi)
}

	objarr.push(nodeprop)
}

	json[draw.name] = objarr
}

	return json
}
eTS.newgedung = ()=>{//length width height jendela
	
	let g = ui.newobj('rangkagedung1')
	let m = g.matlok
	m4.rotationY(.75,m,)
	m[12] = 39000
	m[14] = -m[12]
	let a = ru.acak
	eTS.resizegedung(g,2+a(6),2+a(22),2+a(5),)
	eTS.warnagedung(g,0,)
	objdipilih = g.obj
	
	return g
}
eTS.objdipilih = ()=>objdipilih
eTS.resizegedung = (g,l,h,w,)=>{
	let m = g.matlok
	let scainv = m4.getScaling(m)
	scainv = m4.scaling(scainv)
	m4.invert(scainv,scainv,)
	m4.mul(m,scainv,m,)
	m4.scale(m,[l*10,h*10,w*10,],m,)
	
	//pilih warna
	let mdep = g.mat2d[1]
	let msam = g.mat2d[0]
	
	let pw = mdep[8]/200
	m3.translation([pw*200,0,],mdep,)
	m3.translation([pw*200,0,],msam,)
	m3.scale(mdep,[l*10,h*10,],mdep,)
	m3.scale(msam,[w*10,h*10,],msam,)
	
}
eTS.warnagedung = (g,wa,)=>{
	let mdep = g.mat2d[1]
	let msam = g.mat2d[0]
	
	mdep[8] = 
	msam[8] = wa*200
}
addEventListener('mousemove',e=>{

if(ru.key.s){
	let x = cacupos.x
	let y = cacupos.y
	
	x += e.movementX
	y += e.movementY
	x = Math.min(x,w,); x = Math.max(x,0,)
	y = Math.min(y,h,); y = Math.max(y,0,)
	
	cacupos.x = x
	cacupos.y = y
}
if(ru.key.v && objdipilih){
	//RUMUS: mbaru = cgbaru / cg * mawal

	let cg = ui.camges
	let cginv = m4.invert(cg)
	let m = objdipilih.node.matlok
	
	let mini = m4.translate(cg,[
		e.movementX/444,
		0,
		e.movementY/444,
	],)
	m4.mul(mini,cginv,mini,)
	m4.mul(mini,m,m,)
}
if(ru.key.o && objdipilih){
	//sampe sini, rotate relative di posisi objek
	let m = objdipilih.node.matlok
	let vecpos = m4.getTranslation(m)
	let pos = m4.translation(vecpos)
	v3.negate(vecpos,vecpos,)
	let posinv = m4.translation(vecpos)
	let r = m4.rotationY(-e.movementX/444)
	m4.mul(posinv,m,m,)
	m4.mul(r,m,m,)
	m4.mul(pos,m,m,)
}

},)
addEventListener('wheel',e=>{

if(ru.key.v && objdipilih){
	//RUMUS: mbaru = cgbaru / cg * mawal

	let cg = ui.camges
	let cginv = m4.invert(cg)
	let m = objdipilih.node.matlok
	
	let mini = m4.translate(cg,[
		0,
		e.deltaY/5555,
		0,
	],)
	m4.mul(mini,cginv,mini,)
	m4.mul(mini,m,m,)
}
	
})
addEventListener('mousedown',e=>{
	if(!ru.key.s){return}
	objdipilih = objdekat
},)

	for(let ele of que('[mousedescr]')){
		ele.addEventListener('mouseenter',datang,)
		ele.addEventListener('mouseleave',pergi,)
	}
	addEventListener('mousemove',e=>{
		let x = Math.min(e.clientX+11,innerWidth-moutex.clientWidth,)
		let y = Math.min(e.clientY+11,innerHeight-moutex.clientHeight,)
		moutex.style.left = x+'px'
		moutex.style.top = y+'px'
	})
open.addEventListener('click',async ()=>{
	let pickfile = await showOpenFilePicker()
	femptyproject()
	;[fhsave] = pickfile
	attr(save,'mousedescr','Save '+fhsave.name,)
	let json = await fhsave.getFile()
	json = await json.text()
	json = JSON.parse(json)
	execjson(json)
})
saveas.addEventListener('click',fsaveas,)
save.addEventListener('click',()=>fhsave?fsave():fsaveas(),)
let posmat = m=>{
	m = m4.copy(m)
	m4.mul(ui.matview,m,m,)
	return (0 < m[15])?{
		x:m[12]/m[15],
		y:-m[13]/m[15],
	}:null
}

pl.javascript_ui.push(async ()=>{
	let worldcoba = await fetch(ru.que('link#worldcoba')[0].href)
	worldcoba = await worldcoba.json()
	execjson(lih(worldcoba))
})

let cacupos = {x:w/2,y:h/2,} //canv2d cursor pos
let cx2d = pl.cx2d
let objdekat = null
let jarakdekat = Infinity
let objdipilih = null

pl.render.push(dt=>{
	cx2d.clearRect(-11,-11,w+11,h+11,)

//titik obj
objdekat = null
jarakdekat = Infinity

if(ru.key.s){
	let xgaris
	let ygaris

for(let draw of pl.drawarr){

for(let obj of draw.objarr){
	let posobj = posmat(obj.node.matlok)

if(posobj){
	let {x,y,} = posobj
	let x2d = (x+1)*w/2
	let y2d = (y+1)*h/2
	cx2d.fillStyle = ru.rgba(...Array(3).fill(Math.random()*255),1,)
	cx2d.fillRect(x2d-3,y2d-3,6,6,)
	let j = v2.dist(
		[cacupos.x,cacupos.y,],
		[x2d,y2d,],
	)

if(j < jarakdekat){
	objdekat = obj
	jarakdekat = j
	xgaris = x2d
	ygaris = y2d
}

}

}

}

if(objdekat){
	cx2d.strokeStyle = 'white'
	cx2d.beginPath()
	cx2d.moveTo(cacupos.x,cacupos.y,)
	cx2d.lineTo(xgaris,ygaris,)
	cx2d.stroke()
}

}

//cursor
if(ru.key.s){cx2d.save()
	cx2d.translate(cacupos.x,cacupos.y,)
	cx2d.lineWidth = 2
	
	cx2d.strokeStyle = 'black'
	cx2d.strokeRect(-11,-11,22,22,)
	cx2d.beginPath()
	cx2d.moveTo(-3,-3,)
	cx2d.lineTo(3,3,)
	cx2d.moveTo(-3,3,)
	cx2d.lineTo(3,-3,)
	cx2d.stroke()
	
	cx2d.strokeStyle = 'white'
	cx2d.beginPath()
	cx2d.moveTo(4,0,)
	cx2d.lineTo(-4,0,)
	cx2d.moveTo(0,-4,)
	cx2d.lineTo(0,4,)
	cx2d.stroke()
cx2d.restore()}

if(objdipilih){
	let pos = posmat(objdipilih.node.matlok)

if(pos){
	cx2d.fillStyle = ru.key.s?'white':ru.rgba(0,
		Math.random()*255,
		Math.random()*255,
	1,)
	let {x,y,} = pos
	cx2d.fillRect(
		(x+1)*w/2-5,
		(y+1)*h/2-5,
	10,10,)
}

}

})
}
