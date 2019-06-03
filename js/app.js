const app = new App();

const draw = new Draw();

const move = new Move();

let draw_on = false; // 도형을 그리고 있는지 확인 하는 변수
let move_on = false;
let move_index = "";
let stop, // mouse click top
	sleft, // mouse click left
	mtop, // mouse move top
	mleft, // mouse move left
	width, // box width
	height, //box height
	rtop, // result top
	rleft, //result left
	dtop, // drag top
	dleft; // drag left

app.event(); // 이벤트 시작

function App(){
	this.event = () => {
		$(document)
			.keydown(app.on_menu)

		$("#side-bar>ul>li").on("click",app.select_menu);
	}
	this.on_menu = (e) => {
		let key = e.keyCode;
		if(key == "9"){
			if($("#side-bar").attr('class') == "tab"){
				if($("#side-bar").is(":animated")) return false;
				$("#side-bar").removeClass('tab').animate({"left":"-100px"});
				return false;
			}else{
				$("#side-bar").addClass('tab').animate({"left":0});
				if($("#side-bar").is(":animated")) return false;
				return false;
			}
		}
	}
	this.select_menu = (e) => {
		let index = $(e.target).text();
		$("#side-bar>ul>li").removeClass('active');
		$(e.target).addClass('active');
		switch(index){
			case "square":
				$(document)
					.on("mousedown",draw.drawstart)
					.on("mousemove",draw.drawing)
					.on("mouseup",draw.drawend)
				break;
			case "circle":
				console.log("circle");
				break;
			case "move":
				$(".box")
					.on("mousedown",move.movestart)
					.on("mousemove",move.moving)
					.on("mouseup",move.moveend)
				break;
			case "delete":
				break;
			case "clear":
				break;
		}
	}
}

function Draw(){
	this.drawstart = (e) => {
		if($(e.target).parents("div").attr("id") == "side-bar" || $("#square").attr("class") != "active") return false;
		draw_on = true;
		if(draw_on == true){
			stop = window.event.clientY;
			sleft = window.event.clientX;
		}
	}
	this.drawing = () => {
		mleft = window.event.clientX;
		mtop = window.event.clientY;
		if(draw_on == true){
			width = sleft > mleft ? sleft-mleft : mleft-sleft;
			height = stop > mtop ? stop-mtop : mtop-stop;
			mtop = stop > mtop ? stop-height : window.event.clientY;
			mleft = sleft > mleft ? sleft-width : window.event.clientX;

			rtop = stop>mtop?mtop:stop;
			rleft = sleft>mleft?mleft:sleft;
			$("#preview").css({"display":"block","top":rtop+"px","left":rleft+"px","width":width+"px","height":height+"px"});
			$("#preview-size").css({"display":"block","top":mtop-15+"px","left":mleft+20+"px"}).text("w : "+width+"px / h : "+height+"px");
		}
	}
	this.drawend = () => {
		if(draw_on == true){
			$("#preview, #preview-size").css({"display":"none"});
			$("#wrap").append("<div class='box' style='position:absolute; top:"+rtop+"px; left:"+rleft+"px; width:"+width+"px; height:"+height+"px; border:1px solid #000; background:#fff;'></div>");
		}
		stop = 0;
		sleft = 0;
		mtop = 0;
		mleft = 0;
		width = 0;
		height = 0;
		rtop = 0;
		rleft = 0;
		draw_on = false;
	}
}

function Move(){
	this.movestart = (e) => {
		if($(e.target).attr("class") != "box") return false;
		move_on = true;
		if(move_on == true){
			mleft = window.event.clientX;
			mtop = window.event.clientY;
			dtop = e.offsetY;
			dleft = e.offsetX;
			move_index = $(e.target).index()-3;
		}
	}
	this.moving = (e) => {
		mleft = window.event.clientX;
		mtop = window.event.clientY;
		if(move_on == true){
			mtop = mtop - dtop;
			mleft = mleft - dleft;
			$(e.target).css({"display":"block","top":mtop+"px","left":mleft+"px"});
		}
	}
	this.moveend = () => {
		move_on = false;
	}
}