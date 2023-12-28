// 创建SVG画布
//var svg = d3.select("div")
  //.append("svg")
  //.attr("width", 2000)
  //.attr("height", 2000);
var svg_circleLayout = d3.select("#circleLayout")
// 读取JSON文件
d3.json("./js/letter1.2.json").then(data => {
  // 计算每个对象在圆上的位置
  const circleData = data.map((d, i) => {
    const radius = d.r*3;
    const textLength = d.letter.length;
    const textAngle = 2 * Math.PI / textLength;

    const letterData = d.letter.split("").map((letter, j) => {
      const angle = j * textAngle;
      const x = 500 + Math.cos(angle) * radius;
      const y = 740 + Math.sin(angle) * radius;
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
    .style('font-size', '4px');//字号

  // 监听筛选器变化
  d3.select("#color-filter").on("change", function() {
    const selectedColor = d3.select(this).property("value");

    // 根据选中的类型显示对应的文字
    texts.attr("fill", d => {
      if (selectedColor === "遗书" && d.type === 1) {
        return "black";
      } else if (selectedColor === "离别书" && d.type === 2) {
        return "black";
      } else if (selectedColor === "境况" && d.type === 3) {
        return "black";
      } else if (selectedColor === "叮嘱" && d.type === 4) {
        return "black";
      } else if (selectedColor === "报平安" && d.type === 5) {
        return "black";
      }else if (selectedColor === "全部") {
        return "black";
      }  
      else {
        return "white";
      }
    });
  });
});