var textNum = 600
var minSpeed = 0.1
var maxSpeed = 3.7

var positions = []
var speeds = []
var texts = []
var customFont;

var textCandidates = ['我们', '现在', '你们', '没有', '大人', '不能', '母亲', '生活', '一切', '工作', '身体', '家中', '希望', '以后', '中国', '一定', '在外', '老人家', '痛苦', '家庭', '抗战', '社会','回家', '挂念', '收到', '革命', '为了', '家里' ,'读书', '国家', '情形','时代', '环境', '办法', '军阀', '父母', '困难']


function preload() {
	customFont = loadFont('font\FZLTXHJW.TTF');
  }

function setup() {
	background(255)
	
	let canvas = createCanvas(windowWidth, windowHeight);
	canvas.parent('letterRain')

	textFont(customFont);
	
	for (var i = 0; i < textNum; i++) {
		positions.push({ x: random(0, windowWidth), y: random(0, -windowHeight*3) })
		speeds.push(random(minSpeed, maxSpeed))
		texts.push(textCandidates[Math.floor(random(1) * textCandidates.length)])
	}
	
	textAlign(CENTER)
	smooth()
}

function draw() {
	clear()
	
	strokeWeight(2)
	stroke(255)
	
	fill(0)
	noStroke()
	for (var i = 0; i<textNum; i++) {
		
		push()
			translate(positions[i].x,  positions[i].y)
			scale(2 * (speeds[i] - minSpeed)/(maxSpeed - minSpeed))
			textFont(customFont);
			text(texts[i], 0, 0)
		pop()
		
		positions[i].y += speeds[i]
		
		if (positions[i].y > windowHeight + 100) { 
			texts[i] = textCandidates[Math.floor(random(1) * textCandidates.length)]
			speeds[i] = random(minSpeed, maxSpeed)
			positions[i] = { x: random(0, windowWidth), y: random(0, -windowHeight*2) }
		}
	}
}