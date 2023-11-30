// 创建SVG画布
const svg = d3.select("body")
  .append("svg")
  .attr("width", 1000)
  .attr("height", 1000);

// 读取JSON文件
d3.json("letter.json").then(data => {
  // 计算每个对象在圆上的位置
  const circleData = data.map((d, i) => {
    const radius = d.r;
    const textLength = d.letter.length;
    const textAngle = 2 * Math.PI / textLength;

    const letterData = d.letter.split("").map((letter, j) => {
      const angle = j * textAngle;
      const x = 500 + Math.cos(angle) * radius;
      const y = 500 + Math.sin(angle) * radius;
      //const fontSize = radius / 200; // 调整字号大小的缩放因子
      return { letter, x, y,type:d.type }
      ;

    });

    return letterData;
  }).flat();

  // 在SVG上绘制文字
  const texts = svg.selectAll("text")
    .data(circleData)
    .enter()
    .append("text")
    .attr("x", d => d.x)
    .attr("y", d => d.y)
    .attr("text-anchor", "middle")
    .attr("dominant-baseline", "middle")
    .text(d => d.letter)
    .style('font-size', '2px');

  // 监听筛选器变化
  d3.select("#color-filter").on("change", function() {
    const selectedColor = d3.select(this).property("value");

    // 根据选中的颜色修改文字样式
    texts.attr("fill", d => {
      if (selectedColor === "粉色" && d.type === 1) {
        return "pink";
      } else if (selectedColor === "红色" && d.type === 2) {
        return "red";
      } else {
        return "black";
      }
    });
  });
});