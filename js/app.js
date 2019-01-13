const app = new App();

const draw = new Draw();

let draw_on = false; //도형을 그리고 있는지 확인 하는 변수
let stop, sleft, mtop, mleft, width, height, rtop, rleft; //도형의 위치, 크기 값

app.event(); //이벤트 시작

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
		$("#side-bar>ul>li").css({"background":"#fff","color":"#000"});
		$(e.target).css({"background":"#000","color":"#fff"});
		switch(index){
			case "square":
				$(document)
					.on("mousedown",draw.drawstart)
					.on("mousemove",draw.drawing)
					.on("mouseup",draw.drawfinish)
				console.log("square");
				break;
			case "circle":
				console.log("circle");
				break;
			case "move":
				console.log("move");
				break;
			case "delete":
				console.log("delete");
				break;
			case "clear":
				console.log("clear");
				break;
		}
	}
}

function Draw(){
	this.drawstart = () => {
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
			height = stop > mtop ? stop-mtop : mtop-stop;
			width = sleft > mleft ? sleft-mleft : mleft-sleft;
			mtop = stop > mtop ? stop - height : window.event.clientY;
			mleft = sleft > mleft ? sleft - width : window.event.clientX;

			rtop = stop>mtop?mtop:stop;
			rleft = sleft>mleft?mleft:sleft;

			$("#preview").css({"display":"block","top":rtop+"px","left":rleft+"px","width":width+"px","height":height+"px"});
		}
	}
	this.drawfinish = () => {
		draw_on = false;
		$("#preview").css({"display":"none"});
		$("#wrap").append("<div class='box' style='position:absolute; top:"+rtop+"px; left:"+rleft+"px; width:"+width+"px; height:"+height+"px; border:1px solid #000; background:#fff;'></div>");
		stop = 0;
		sleft = 0;
		mtop = 0;
		mleft = 0;
		height = 0;
		width = 0;
		rtop = 0;
		rleft = 0;
	}
}