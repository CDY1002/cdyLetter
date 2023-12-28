var svg_birthDeath = d3.select("#birthDeath")

document.addEventListener("DOMContentLoaded", function () {
  // 使用d3.json()加载数据
  d3.json("./js/letter1.2.json").then(function(data) {

    // 去重，只保留第一个出现的name，并且去除birth或death值为空的对象
    const uniqueData = [];
    const seenNames = new Set();

    data.forEach(item => {
      if (!seenNames.has(item.name) && item.birth !== "" && item.death !== "" && item.letter_year !== "") {
        seenNames.add(item.name);
        uniqueData.push(item);
      }
    });

    // 定义SVG画布的大小
    //const width = 1200;
    const height = 1000;//方块高度

    // 创建SVG元素
    //const svg = d3.select("body").append("svg")
     // .attr("width", width)
      //.attr("height", height);

    // 定义每个人的行高和行距
    const lineHeight = 20;
    const lineSpacing = 5;

    // 为每个数据对象创建一列
    const columns = svg_birthDeath.selectAll("g")
      .data(uniqueData)
      .enter()
      .append("g")
      .attr("transform", (d, i) => `translate(${i * (lineHeight + lineSpacing) + 30}, 10)`);

    // 在每列中显示名字
    //columns.append("text")
      //.text(d => d.name)
      //.attr("x", lineHeight / 2)
      //.attr("y", 0)
      //.attr("fill", "black")
      //.attr("transform", "rotate(90)");

    // 生成数字范围数组（1881 到 1998）
    const years = d3.range(1887, 1999);

    // 在每列中显示年份，并根据条件设置颜色
    columns.selectAll("text.year")
      .data(years)
      .enter()
      .append("text")
      .attr("class", "year")
      .text(d => d)
      .attr("x", lineHeight / 2)
      .attr("y", d => (d - 1887) * 7 )  // 调整y坐标，调整倍数
      .attr("fill", (d, i, nodes) => {
        const birth = parseInt(nodes[i].parentNode.__data__.birth);
        const death = parseInt(nodes[i].parentNode.__data__.death);
        const letterYear = parseInt(nodes[i].parentNode.__data__.letter_year);

        // 根据条件设置颜色
        if (d === letterYear) {
          return "#d42f2f";  // 等于letter_year时为红色
        } else if (!isNaN(birth) && !isNaN(death) && birth <= d && death >= d) {
          return "black";
        } else {
          return "rgba(251, 251, 251)";//背景色
        }
      })
      .attr("font-size", "6px")// 字号
      .attr("font-family", "titleFont") ;

    // 在每列下方添加一个白色矩形，用于鼠标悬停时显示文本内容
    columns.append("rect")
      .attr("x", lineHeight / 2)
      .attr("y", lineHeight + 5) // 调整矩形的位置
      .attr("width", lineHeight)
      .attr("height", height)
      .attr("fill", "white")
      .attr("opacity", 0) // 初始时设置为透明
      .append("title") // 添加 title 元素用于悬停提示
        .text(d => `${d.name}\nBirth: ${d.birth}\nDeath: ${d.death}\nLetter Year: ${d.letter_year}`)
      .on("mouseover", function () {
        // 鼠标悬停时显示对应文本内容
        d3.select(this).attr("opacity", 0.7); // 设置矩形的透明度
      })
      .on("mouseout", function () {
        // 鼠标离开时隐藏文本内容
        d3.select(this).attr("opacity", 0); // 设置矩形的透明度为0
      });
  });
});
