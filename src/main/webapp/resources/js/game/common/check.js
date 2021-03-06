function isCleared(circleNum, arrIdx, direction) {
	if (circleNum < 0 || circleNum > 4) {
		return false;
	}
	
	switch (circles[circleNum][(arrIdx % 8 + 8) % 8]) {
	case 1: // ┗┓ 왼쪽
		switch (direction) {
		case 0:
			circleNum++;
			arrIdx++;
			break;
		case 1:
			return false;
		}
		break;
	case 2: // ┗┓ 오른쪽
		switch (direction) {
		case 0:
			return false;
		case 1:
			circleNum--;
			arrIdx--;
			break;
		}
		break;
	case 3: // ┏┛ 왼쪽
		switch (direction) {
		case 0:
			return false;
		case 1:
			circleNum--;
			arrIdx++;
			break;
		}
		break;
	case 4: // ┏┛ 오른쪽
		switch (direction) {
		case 0:
			circleNum++;
			arrIdx--;
			break;
		case 1:
			return false;
		}
		break;
	case 5: // ┗┛ 왼쪽
		switch (direction) {
		case 0:
			circleNum--;
			arrIdx++;
			direction = 1;
			break;
		case 1:
			return false;
		}
		break;
	case 6: // ┗┛ 오른쪽
		switch (direction) {
		case 0:
			circleNum--;
			arrIdx--;
			direction = 1;
			break;
		case 1:
			return false;
		}
		break;
	case 7: // ┏┓ 왼쪽
		switch (direction) {
		case 0:
			return false;
		case 1:
			circleNum++;
			arrIdx++;
			direction = 0;
			break;
		}
		break;
	case 8: // ┏┓ 오른쪽
		switch (direction) {
		case 0:
			return false;
		case 1:
			circleNum++;
			arrIdx--;
			direction = 0;
			break;
		}
		break;
	case 9: // ┃
		switch (direction) {
		case 0:
			circleNum++;
			break;
		case 1:
			circleNum--;
			break;
		}
		break;
	case -1: // 목표 지점
		return true;
	default:
		return false;
	}
	
	return isCleared(circleNum, arrIdx, direction);
}

// 스테이지 클리어 설정에 사용할 변수
let stageCleared = false;
let effectDeg = 0;

function clear() {
	if (!stageCleared) {
		clearInterval(timerFunc);
		
		$("#circle div").append("<img>");
		$("img:last").attr("id", "clearEffect");
		$("#clearEffect").attr("class", "circle");
		$("#clearEffect").attr("src", contextPath + "/resources/img/game/common/clear_circle.png");
		setInterval(function() {
			effectDeg++;
			$("#clearEffect").css({
				"-webkit-transform" : "rotate(" + effectDeg + "deg)",
				"-moz-transform" : "rotate(" + effectDeg + "deg)",
				"-ms-transform" : "rotate(" + effectDeg + "deg)",
				"-o-transform" : "rotate(" + effectDeg + "deg)",
				"transform" : "rotate(" + effectDeg + "deg)"
			});
		}, 100);
		
		let playTime = hourVal * 3600 + minVal * 60 + secVal;
		
		$("#next").show();
		$("#clearTime").val(playTime);
		
		new Audio(contextPath + "/resources/audio/clear.wav").play();
		
		stageCleared = true;
	}
}