var fila="<tr><td class='id'></td><td class='foto'></td><td class='price'></td><td class='title'></td><td class='description'></td><td class='category'></td></tr>";
//<td class='boton'><button>Eliminar</button></td>
	 var productos=null;
  function codigoCat(catstr) {
	var code="null";
	switch(catstr) {
		case "electronicos":code="c1";break;
	    case "joyeria":code="c2";break;
		case "caballeros":code="c3";break;
		case "damas":code="c4";break;
	}
	return code;
}   
	  var orden=0;
	  
	  
	function listarProductos(productos) {
	  var precio=document.getElementById("price"); 
	  precio.setAttribute("onclick", "orden*=-1;listarProductos(productos);");
	  var num=productos.length;
	  var listado=document.getElementById("listado");
	  var ids,titles,prices,descriptions,categories,fotos,eliminar;
	  var tbody=document.getElementById("tbody"),nfila=0;
	  tbody.innerHTML="";
	  var catcode;
	  for(i=0;i<num;i++) tbody.innerHTML+=fila;
	  var tr; 
	  ids=document.getElementsByClassName("id");
	  titles=document.getElementsByClassName("title");
	  descriptions=document.getElementsByClassName("description");
	  categories=document.getElementsByClassName("category");   
	  fotos=document.getElementsByClassName("foto");   
	  prices=document.getElementsByClassName("price");  
	  //eliminar = document.getElementsByClassName("boton")
	  if(orden===0) {orden=-1;precio.innerHTML="Precio"}
	  else
	     if(orden==1) {ordenarAsc(productos,"price");precio.innerHTML="Precio A";precio.style.color="darkgreen"}
	     else 
	       if(orden==-1) {ordenarDesc(productos,"price");precio.innerHTML="Precio D";precio.style.color="blue"}
	
		  
	  	  listado.style.display="block";
	  for(nfila=0;nfila<num;nfila++) {
        ids[nfila].innerHTML=productos[nfila].id;
		titles[nfila].innerHTML=productos[nfila].title;
		descriptions[nfila].innerHTML=productos[nfila].description;
		categories[nfila].innerHTML=productos[nfila].category;
		catcode=codigoCat(productos[nfila].category);
		tr=categories[nfila].parentElement;
		tr.setAttribute("class",catcode);
		prices[nfila].innerHTML="$"+productos[nfila].price;
		fotos[nfila].innerHTML="<img src='"+productos[nfila].image+"'>";
		fotos[nfila].firstChild.setAttribute("onclick","window.open('"+productos[nfila].image+"');" );
		//eliminar[nfila].firstChild.setAttribute("onclick","eliminar('"+productos[nfila].id+"')");
		}
	}

function obtenerProductos() {
	  fetch('https://retoolapi.dev/zoNPAm/productos')
            .then(res=>res.json())
            .then(data=>{
				productos=data;
				productos.forEach(
					function(producto){
						producto.price = parseFloat(producto.price)
					}
				);
				listarProductos(data)})
			
}
function postProducto() {
	/*var producto  = {image:document.getElementById("c9").value,
	price: document.getElementById("c6").value,
	title: document.getElementById("c5").value,
	category: document.getElementById("c8").value,
	description: document.getElementById("c7").value}*/

	var img = document.getElementById("c9").value.toString();
	var pr = document.getElementById("c6").value.toString();
	var titu = document.getElementById("c5").value;
	var cat = document.getElementById("c8").value;
	var des = document.getElementById("c7").value;

	var producto  = {
		image: img,
		price: pr,
		title: titu,
		category: cat,
		description: des
	}

	var addresult;
	fetch("https://retoolapi.dev/zoNPAm/productos",
	{ method:"POST",
	body: JSON.stringify(producto),
	headers: {
		'Accept': 'application/json',
		'Content-type': 'application/json; charset=UTF-8',
	}
	}).then(response=>response.json()).then(data=>addresult=data);
	
	limpiarCampos();
	//obtenerProductos();
}
function limpiarCampos(){
	document.getElementById("c9").value = "";
	document.getElementById("c6").value = "";
	document.getElementById("c5").value = "";
	document.getElementById("c8").value = "";
	document.getElementById("c7").value = "";
}

function eliminar(){
	var id = document.getElementById("c10").value.toString();
	fetch("https://retoolapi.dev/zoNPAm/productos/"+id+"",
	{ method:"DELETE"}).then(response=>response.json()).then(data=>delresult=data);
	obtenerProductos();
}

function ordenarDesc(p_array_json, p_key) {
   p_array_json.sort(function (a, b) {
      if(a[p_key] > b[p_key]) return -1;
if(a[p_key] < b[p_key]) return 1;
return 0;
   });
}

function ordenarAsc(p_array_json, p_key) {
   p_array_json.sort(function (a, b) {
      if(a[p_key] > b[p_key]) return 1;
if(a[p_key] < b[p_key]) return -1;
return 0;
   });
}