var level = 0;
var but_arr = ["green","red","yellow","blue"];
var simon_arr = [];
var use_arr = [];
iter = 0;

function game_reset(){
	level = 0; 
	simon_arr = [];
	use_arr = [];
	iter = 0;
}

function play_sound(nid){
	switch(nid){
		case '#green':  var a = new Audio("sounds/green.mp3");
		a.play();
		break;

		case '#red':   	var a = new Audio("sounds/red.mp3");
		a.play();
		break;

		case '#yellow': var a = new Audio("sounds/yellow.mp3");
		a.play();
		break;

		case '#blue':   var a = new Audio("sounds/blue.mp3");
		a.play();
		break;

	}
}

function gen_simon(){
	var ran = Math.floor(Math.random() * 4);
	simon_arr.push(ran);
	var nid = "#" + but_arr[ran];
	play_simon(nid);
	$("h1").text("level " + ++level);
	play_sound(nid);
}

function check_user_input(nid){
	$(nid).addClass("pressed");
	setTimeout(function(){
		$(nid).removeClass("pressed");
	},100);

	switch(nid){
		case '#green':   use_arr.push(0);
		break;
		case '#red':   	 use_arr.push(1);
		break;
		case '#yellow':  use_arr.push(2);
		break;
		case '#blue':    use_arr.push(3);
		break;
	}

	if (simon_arr[iter] !== use_arr[iter]){
		var a = new Audio("sounds/wrong.mp3");
		a.play();
		iter = 0;
		level = 0;
		$("h1").text("Invalid sequence play again");
		$(".btn").off("click");
		$("#play_button").after('<button class="btn1 button1" id="start_btn">Restart Game</button>');
		// $("#start_btn").text("Restart Game");
		$("#start_btn").one("click",function (){
			game_reset();
			$("#start_btn").remove();
			$(".btn").click(function (){
				var nid = "#" + this.id;
				check_user_input(nid);
				play_sound(nid)
			});
			gen_simon();
		});
	}

	if ((iter + 1) === simon_arr.length){
		iter = 0;
		setTimeout(function(){
			gen_simon();
			use_arr = [];
		},1000);
		return;
	}
	iter++;
}

function play_simon(id){
	$(id).fadeOut(200).fadeIn(200);
}

function eClickCB(){
	var nid = "#" + this.id;
	check_user_input(nid);
	play_sound(nid);
}


// $(document).one("keydown",function (){

// 	$(".btn").click(eClickCB);
// 	gen_simon();
// });

$("#start_btn").one("click",function (){

	$(".btn").click(eClickCB);
	$("#start_btn").remove();
	gen_simon();
});