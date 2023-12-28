let letterRainEnd = function(p) {
    let textNum = 400;
    let minSpeed = 0.1;
    let maxSpeed = 6;
    let verticalSpacing = 12; // 调整垂直间距

    let positions = [];
    let speeds = [];
    let texts = [];
    let customFont;
  
    let textCandidates = [
        '现在仗打完了。', 
        '人生无不散的筵席', 
        '流水般的时光，谁也挽不住它。',
        '接来信，颇悲切', 
        '我今与你们永诀了。', 
        '我的死是为着社会、国家和人类',
        '现在我的心很镇静', 
        '多回忆我对你不好的地方，忘记我',
        '一切以丈夫在外卫国抗敌消灭日寇国家平安之后，丈夫还家',
        '现在好否?身体康泰。',
        '所寄葡萄干等物尚未收到', 
        '万福金安，玉体双立', 
        '永别了!永别了!!永别了!!!', 
        '继我遗志，报效党国，则我含笑九泉矣!', 
        '夫今死矣!是为时代而牺牲。', 
        '这次路上土匪虽多，但儿没有遇难', 
        '这是个大时代，你要踏上民族解放战争的最前线', 
        '精神生活，已极痛苦，物质生活，更断来源家', 
        '一切都拜托你们了。拥抱你们!', 
        '悲莫悲兮生别离', 
        '你们别挂心吧', 
    ];
  
    p.preload = function() {
      customFont = p.loadFont('./font/FZLTXHJW.TTF');
    };
  
    p.setup = function() {
      p.background(255);
  
      let canvas = p.createCanvas(window.innerWidth, window.innerHeight+35);
      canvas.parent('letterRainEnd');
      canvas.style('display', 'block');
  
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
        let currentText = texts[i];
        let xPos = positions[i].x;
        let yPos = positions[i].y;

        // 显示每个字符
        for (let j = 0; j < currentText.length; j++) {
          p.push();
          p.translate(xPos, yPos + j * verticalSpacing); // 使用固定的垂直间距
          p.scale(1 * (speeds[i] - minSpeed) / (maxSpeed - minSpeed));
          p.textFont(customFont);
          p.text(currentText.charAt(j), 0, 0);
          p.pop();
        }

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
