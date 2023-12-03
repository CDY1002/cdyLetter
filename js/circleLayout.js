// 创建SVG画布
//var svg = d3.select("div")
  //.append("svg")
  //.attr("width", 2000)
 // .attr("height", 2000);
var svg_circleLayout = d3.select("#circleLayout")
// 读取JSON文件
d3.json("./js/letter.json").then(data => {
  // 计算每个对象在圆上的位置
  const circleData = data.map((d, i) => {
    const radius = d.r;
    const textLength = d.letter.length;
    const textAngle = 2 * Math.PI / textLength;

    const letterData = d.letter.split("").map((letter, j) => {
      const angle = j * textAngle;
      const x = 500 + Math.cos(angle) * radius;
      const y = 500 + Math.sin(angle) * radius;
      return { letter, x, y,type:d.type }
      ;

    });

    return letterData;
  }).flat();

  // 在SVG上绘制文字
  const texts = svg_circleLayout.selectAll("text")
    .data(circleData)
    .enter()
    .append("text")
    .attr("x", d => d.x)
    .attr("y", d => d.y)
    .attr("text-anchor", "middle")
    .attr("dominant-baseline", "middle")
    .text(d => d.letter)
    .style('font-size', '1.4px');//字号

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