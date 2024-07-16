"use strict"

/*
--	segera
=>	diurus
	sudah

-------------

*/
let ui = {}
pl.javascript_ui.push(async aa=>{
let lih = ru.lihat
let que = ru.que
let v3 = wgpuMatrix.vec3
let m3 = wgpuMatrix.mat3
let m4 = wgpuMatrix.mat4
let w = pl.canv.width
let h = pl.canv.height

lih('ui loadedddddddd')
let gltf_bin
let loadgltfbin = ui.loadgltfbin = async ()=>{
	let [fsfh] = await showOpenFilePicker()
	let file = await fsfh.getFile()
	gltf_bin = await file.arrayBuffer()
	lih(gltf_bin)
}
let gltf_json
let loadgltfjson = ui.loadgltfjson = async ()=>{
	let [fsfh] = await showOpenFilePicker()
	let file = await fsfh.getFile()
	gltf_json = JSON.parse(await file.text())
	lih(gltf_json)
}
let read = ()=>{
	let h = lih(freadgltf(gltf_json,gltf_bin,))
	mat3dpisah = h.mat3dpisah
	mat2dpisah = h.mat2dpisah
}
let mat3dpisah = null
let mat2dpisah = null
//https://github.com/toji/gl-matrix/blob/master/dist/gl-matrix.js
//aku edit dikit
  /**
   * Creates a matrix from a quaternion rotation, vector translation and vector scale
   * This is equivalent to (but much faster than):
   *
   *     mat4.identity(dest);
   *     mat4.translate(dest, vec);
   *     let quatMat = mat4.create();
   *     quat4.toMat4(quat, quatMat);
   *     mat4.multiply(dest, quatMat);
   *     mat4.scale(dest, scale)
   *
   * @param {mat4} out mat4 receiving operation result
   * @param {quat4} q Rotation quaternion
   * @param {ReadonlyVec3} v Translation vector
   * @param {ReadonlyVec3} s Scaling vector
   * @returns {mat4} out
   */

let matRTS = (q, v, s,out,)=>{//fromRotationTranslationScale
    // Quaternion math
	out = out??new Float32Array(16)
    var x = q[0],
        y = q[1],
        z = q[2],
        w = q[3];
    var x2 = x + x;
    var y2 = y + y;
    var z2 = z + z;
    var xx = x * x2;
    var xy = x * y2;
    var xz = x * z2;
    var yy = y * y2;
    var yz = y * z2;
    var zz = z * z2;
    var wx = w * x2;
    var wy = w * y2;
    var wz = w * z2;
    var sx = s[0];
    var sy = s[1];
    var sz = s[2];
    out[0] = (1 - (yy + zz)) * sx;
    out[1] = (xy + wz) * sx;
    out[2] = (xz - wy) * sx;
    out[3] = 0;
    out[4] = (xy - wz) * sy;
    out[5] = (1 - (xx + zz)) * sy;
    out[6] = (yz + wx) * sy;
    out[7] = 0;
    out[8] = (xz + wy) * sz;
    out[9] = (yz - wx) * sz;
    out[10] = (1 - (xx + yy)) * sz;
    out[11] = 0;
    out[12] = v[0];
    out[13] = v[1];
    out[14] = v[2];
    out[15] = 1;
    return out;
  }
/*










*/
//keyboard
ru.fkey = (key,namakey,berubah,)=>{
	if((namakey === 'm') && key.m && berubah){
		digeser = true
		document.body.requestPointerLock({unadjustedMovement:true,})
	}else
	if((namakey === 'r') && key.r && berubah){
		diputar = true
		document.body.requestPointerLock({unadjustedMovement:true,})
	}else
	if(
		((namakey === 's') && key.s) ||
		((namakey === 'v') && key.v) ||
		((namakey === 'o') && key.o)
	&& berubah){
		document.body.requestPointerLock({unadjustedMovement:true,})
	}
	
	if(!key.m && berubah){digeser = false}
	if(!key.r && berubah){diputar = false}
	
	if(
		!key.m &&
		!key.r &&
		!key.s &&
		!key.v &&
		!key.o &&
		berubah
	){
		document.exitPointerLock()
	}
	if(key.h){
		camreset()
		fcam()
	}
	if(key.x && key.naik){resizegedung(0,1,)}
	if(key.y && key.naik){resizegedung(1,1,)}
	if(key.z && key.naik){resizegedung(2,1,)}
	if(key.x && key.turun){resizegedung(0,-1,)}
	if(key.y && key.turun){resizegedung(1,-1,)}
	if(key.z && key.turun){resizegedung(2,-1,)}
	
	//warna gedung
	if(key['1']){warnagedung(0)}else
	if(key['2']){warnagedung(1)}else
	if(key['3']){warnagedung(2)}else
	if(key['4']){warnagedung(3)}
	
	//new & delete
	if(key['=']){eTS.newgedung()}
	if(key['del'] && berubah){
		let od = eTS.objdipilih()
		if(od.draw.name === 'rangkagedung0'){
			ui.deleteobj(od.node)
		}
	}
}
document.body.addEventListener('wheel',e=>
	document.pointerLockElement
	&& e.preventDefault()
,{passive:0,},)

ru.newkey('KeyM','m',) //move cam
ru.newkey('KeyR','r',) //rotate cam
ru.newkey('KeyH','h',) //reset cam
ru.newkey('KeyS','s',) //cursor 2d
ru.newkey('KeyV','v',) //move obj
ru.newkey('KeyO','o',) //rotate obj

ru.newkey('KeyX','x',) //resize x
ru.newkey('KeyY','y',) //resize y
ru.newkey('KeyZ','z',) //resize z
ru.newkey('ArrowUp','naik',) //resize tambah
ru.newkey('ArrowDown','turun',) //resize kurang

ru.newkey('Digit1','1',) //warna 1
ru.newkey('Digit2','2',) //warna 2
ru.newkey('Digit3','3',) //warna 3
ru.newkey('Digit4','4',) //warna 4

ru.newkey('Equal','=',) //new gedung
ru.newkey('Delete','del',) //delete gedung
//camera
	let persp = m4.identity()
	let cam = m4.identity()
	let view = ui.matview = m4.identity()//hasil dari persp*cam 
	
    m4.perspective(
        .9,//rad
        w/h,
        .01,      // zNear
        Number.MAX_SAFE_INTEGER,//999.01,   // zFar
        persp,
    );
	
	//change z to 1-z
	m4.invert(persp,persp,)
		m4.translate(persp,[0,0,1,],persp)
		m4.scale(persp,[1,1,-1,],persp,)
	m4.invert(persp,persp,)
	//it wokkkkkk, HOW?? 
	
	let camges = ui.camges = m4.identity()
	let rang = 0
	let camreset = ()=>{
		m4.identity(camges)
		m4.rotateY(camges,.4,camges,)
		m4.scale(camges,Array(3).fill(111),camges,)
		rang = -.5
	}
	camreset()
	let fcam = ()=>{
		m4.copy(camges,cam,)
		m4.rotateX(cam,rang,cam,)
		m4.translate(cam,[0,0,3,],cam,)
		m4.invert(cam,cam,)
		m4.mul(persp,cam,view,)
		pl.updcam(view)
	}
	fcam()
//gerak camera
	let digeser = false
	let diputar = false
	
	addEventListener('mousemove',e=>{
if(digeser){
	m4.translate(camges,[
		e.movementX/555,
		0,
		e.movementY/555,
	],camges,)
}
if(diputar){
	m4.rotateY(camges,-e.movementX/99,camges,)
	rang -= e.movementY/99
	let pi = Math.PI
	rang = Math.max(-pi/2,rang,)
	rang = Math.min(pi/2,rang,)
}

		fcam()
	},)
	addEventListener('wheel',e=>{

if(digeser){
	m4.translate(camges,[
		0,
		e.deltaY/3333,
		0,
	],camges,)
}
if(diputar){
	let s = 2**(e.deltaY/999)
	m4.scale(camges,Array(3).fill(s),camges,)
}

		fcam()
	},)
que('.settimeout')[0]
.addEventListener('input',e=>{
	let ele = e.currentTarget
	let t = +ele.value
	t = Math.max(t,+ele.min,)
	t = Math.min(t,+ele.max,)
	pl.settimeout = t
},)
que('.getar')[0]
.addEventListener('input',e=>
	pl.getar = +e
	.currentTarget
	.checked
,)
let resizegedung = (pilih,offset,)=>{
	//pilih -->> 0 1 2 = x y z 
	let node = eTS.objdipilih().node
	let sca = m4.getScaling(node.matlok)
	v3.mulScalar(sca,1/10,sca,)
	sca[pilih] += offset
	eTS.resizegedung(node,...sca,)
}
let warnagedung = id=>{
	let g = eTS.objdipilih().node
	eTS.warnagedung(g,id,)
}
/*========
let pisahmat3darr = ui.pisahmat3darr = draw=>{
	//lih(draw.mat3darr)
	let arr = draw.mat3darr//Float32Array
	let invlen = draw.invmat3d.data.size/4/16
	let out = []
	for(let i = 0;i < arr.length;i += invlen*16){
		let instout = []
		for(let j = 0;j < invlen;j++){
			instout.push(new Float32Array(arr.buffer,(i+j*16)*4,16,))
		}
		out.push(instout)
	}
	return out
}
--------*/
ui.newobj = namadraw=>{//draw
	let draw = null
	for(let o of pl.drawarr){ if(o.name === namadraw){draw = o;break} }
	if(!draw){return lih(['draw tidak dtemukan',pl.drawarr,])}
	if(draw.nmax <= draw.objarr.length){return lih('ERROR!: '+namadraw+' penuh, max = '+draw.nmax)}
	
	let json = gltf_json
	//cari armnode
	let list = []
	let out = {draw}
	
	for(let node of json.nodes){
		if(node.name === draw.name){
			out.node = {src:node,mat2d:'belum diisi',obj:out,}
			list.push(out.node)
			break
		}
	}
	
	//cari joint
	let srcskinjoints = null
	for(let {name,joints,} of json.skins){
		if(name === draw.name){
			out.skinjoints = (srcskinjoints = joints).slice()
			break
		}
	}
	
	while(list.length){
		let dst = list.shift()
		let src = dst.src
		dst.name = src.name
		dst.chi = []
		dst.matglo = m4.identity()
		dst.matlok = matRTS(
			src.rotation??[0,0,0,1,],
			src.translation??[0,0,0,],
			src.scale??[1,1,1,],
		)
		for(let isrcchi of src.children??[]){
			let srcchi = json.nodes[isrcchi]
			let dstchi = {src:srcchi,}
			list.push(dstchi)
			dst.chi.push(dstchi)
			//cari mat2d
			let ex = srcchi.extras?.geomat
			if(ex){
				//dst.mat2d = structuredClone(ex)
				dst.mat2d = []
				for(let m of ex){
					dst.mat2d.push(m3.set(...m))
				}
			}
		}
		//cari joint
		for(let i = 0;i < out.skinjoints.length;i++){
			let jointname = json.nodes[srcskinjoints[i]].name
			if(jointname === src.name){
				out.skinjoints[i] = dst
				break
			}
		}
		delete dst.src
	}
	
	draw.objarr.push(out)
	//lih(namadraw+' -->> nmax = '+draw.nmax+', objlen = '+draw.objarr.length)
	return out.node
}
ui.deleteobj = topnode=>{
	let obj = topnode.obj
	let arr = obj.draw.objarr
	let i = arr.indexOf(obj)
	;(i >= 0) && arr.splice(i,1,)
}

/*










*/
//mulai
ui.mulai = []
lih(await Promise.all([
	(async ()=>{
		let href = ru.que('#meshbin')[0].href
		let fileku = await fetch(href)//'3d/PolyLandhep-gear.bin'
		return gltf_bin = await fileku.arrayBuffer()
	})(),
	(async ()=>{
		let href = ru.que('#meshgltf')[0].href
		let fileku = await fetch(href)
		return gltf_json = await fileku.json()
	})(),
]))

read()
ui.render = null
for(let f of ui.mulai){
	await f?.()
}
//await ui.mulai?.()

/*










*/

pl.render.push(dt=>{
	ui.render?.(dt)
	
	//
	
	//hitung mat
	for(let dr of pl.drawarr){
		for(let {node} of dr.objarr){
			let nl = [node]//nodelist
			m4.identity(node.matglo)
			while(nl.length){
			
let nodeini = nl.shift()
let glo = nodeini.matglo
let lok = nodeini.matlok
m4.mul(glo,lok,glo,)
for(let chiini of nodeini.chi){
	nl.push(chiini)
	m4.copy(glo,chiini.matglo,)
}
			
			}
		}
	}
	
	//kirim
	for(let dr of pl.drawarr){
		let name = dr.name
		let objarr = dr.objarr
		
		let m2dpis = mat2dpisah[name]
		let m3dpis = mat3dpisah[name]
		for(let i = 0;i < objarr.length;i++){

//mat2d
let mp2d = m2dpis[i]
let geomat = objarr[i].node.mat2d
for(let j = 0;j < mp2d.length;j++){
	m3.copy(geomat[j],mp2d[j],)
}

//mat3d
let sj = objarr[i].skinjoints
let mp = m3dpis[i]
for(let j = 0;j < sj.length;j++){
	let m0 = sj[j].matglo
	let m1 = mp[j]
	m4.copy(m0,m1,)
}

		}
		pl.upddrawmat2d(dr)
		pl.upddrawmat3d(dr)
	}
})
})
