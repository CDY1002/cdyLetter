let letterRainEnd = function(p) {
    let textNum = 600;
    let minSpeed = 0.1;
    let maxSpeed = 3.7;
  
    let positions = [];
    let speeds = [];
    let texts = [];
    let customFont;
  
    let textCandidates = ['我们', '现在', '你们', '没有', '大人', '不能', '母亲', '生活', '一切', '工作', '身体', '家中', '希望', '以后', '中国', '一定', '在外', '老人家', '痛苦', '家庭', '抗战', '社会','回家', '挂念', '收到', '革命', '为了', '家里' ,'读书', '国家', '情形','时代', '环境', '办法', '军阀', '父母', '困难'];
  
    p.preload = function() {
      customFont = p.loadFont('./font/FZLTXHJW.TTF');
    };
  
    p.setup = function() {
      p.background(255);
  
      let canvas = p.createCanvas(window.innerWidth, window.innerHeight);
      canvas.parent('letterRainEnd');
  
      p.textFont(customFont);
  
      for (let i = 0; i < textNum; i++) {
        positions.push({ x: p.random(0, p.windowWidth), y: p.random(0, -p.windowHeight * 3) });
        speeds.push(p.random(minSpeed, maxSpeed));
        texts.push(textCandidates[Math.floor(p.random(1) * textCandidates.length)]);
      }
  
      p.textAlign(p.CENTER);
      p.smooth();
    };
  
    p.draw = function() {
      p.clear();
  
      p.strokeWeight(2);
      p.stroke(255);
  
      p.fill(0);
      p.noStroke();
      for (let i = 0; i < textNum; i++) {
        p.push();
        p.translate(positions[i].x, positions[i].y);
        p.scale(5 * (speeds[i] - minSpeed) / (maxSpeed - minSpeed));
        p.textFont(customFont);
        p.text(texts[i], 0, 0);
        p.pop();
  
        positions[i].y += speeds[i];
  
        if (positions[i].y > p.windowHeight + 100) {
          texts[i] = textCandidates[Math.floor(p.random(1) * textCandidates.length)];
          speeds[i] = p.random(minSpeed, maxSpeed);
          positions[i] = { x: p.random(0, p.windowWidth), y: p.random(0, -p.windowHeight * 2) };
        }
      }
    };
  };
  let p2 = new p5(letterRainEnd, 'letterRainEnd');
  