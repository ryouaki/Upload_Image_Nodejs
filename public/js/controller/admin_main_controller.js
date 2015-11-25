var tabs={  // name : url
			 Home:execHome
			,Production:execProduct
			,User:execUser
			,System:execSystem
			};

function admin_onload(dom) {
	admin_main_controller();
}

function admin_main_controller() {
	// initialize
	var menu = $("#main_menu");
	for( var key in tabs) {
		var li = document.createElement("li");
		var a  = document.createElement("a");
		a.href = "#";
		a.innerHTML = key;
		li.appendChild(a);
		li.onclick=tabs[key];
		menu.append(li);
	}
	menu.children().first().addClass("active");
	execHome();
}

function changeTabStatus(tag) {
	$("#main_menu").children().removeClass("active");
	$(tag).addClass("active");
}

function execHome(event) {
	if(event!=undefined)
		changeTabStatus(event.currentTarget);
	$("#panel-header").text(admin.home);
	$.get("/admin/main",function(data,status){
//		alert("Data: " + data + "\nStatus: " + status);
	});
}

function execProduct(event) {
	changeTabStatus(event.currentTarget);
	$.get("/admin/product",function(data,status){
//		alert("Data: " + data + "\nStatus: " + status);
	});
}

function execUser(event) {
	changeTabStatus(event.currentTarget);
	$.get("/admin/main",function(data,status){
//		alert("Data: " + data + "\nStatus: " + status);
	});
}

function execSystem(event) {
	changeTabStatus(event.currentTarget);
	$.get("/admin/main",function(data,status){
//		alert("Data: " + data + "\nStatus: " + status);
	});
}