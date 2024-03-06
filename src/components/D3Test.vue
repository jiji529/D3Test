
<template>
  <div>
    <button @click="update(data1)">Dataset 1</button>
    <button @click="update(data2)">Dataset 2</button>
    <div id="my_dataviz"></div>
  </div>
</template>

<script>
import * as d3 from 'd3';

export default {
  name: 'D3Test',
  data () {
    return {
      // Create 2 datasets
      data1: [
        {ser1: 0.3, ser2: 4},
        {ser1: 2, ser2: 16},
        {ser1: 3, ser2: 8}
      ],
      data2: [
        {ser1: 1, ser2: 7},
        {ser1: 4, ser2: 1},
        {ser1: 6, ser2: 8}
      ],
      // set the dimensions and margins of the graph
      margin: {},
      width: "",
      height: "",

      //InitialiseX
      x: "",
      xAxis: "",

      //InitialiseY
      y: "",
      yAxis: "",

      svg: ""
    }
  },
  async mounted(){
    //https://d3-graph-gallery.com/graph/line_change_data.html
    //넓이, 높이 값을 설정하고 svg 태그 생성.
    await this.svgMake();
    await this.initialiseX();
    await this.initialiseY();
    // At the beginning, I run the update function on the first dataset:
    this.update(this.data1);
  },
  methods: {
    // append the svg object to the body of the page
    svgMake(){
      const margin = {top: 10, right: 30, bottom: 30, left: 50};
      this.width = 460 - margin.left - margin.right;
      this.height = 400 - margin.top - margin.bottom;

      this.svg 
        = d3.select("#my_dataviz")
        .append("svg")
          .attr("width", this.width + margin.left + margin.right)
          .attr("height", this.height + margin.top + margin.bottom)
        .append("g")
          .attr("transform",
                "translate(" + margin.left + "," + margin.top + ")");
    },

    // Initialise a X axis
    initialiseX(){
      //선형 스케일 생성 : scaleLinear(도메인, 범위)기본값 지정하지 않으면 기본값은 [0, 1]
      this.x = d3.scaleLinear().range([0,this.width]);
      //x축 생성
      this.xAxis = d3.axisBottom().scale(this.x);
      this.svg.append("g")
        .attr("transform", "translate(0," + this.height + ")")
        .attr("class","myXaxis")
    },

    // Initialize an Y axis
    initialiseY(){
      this.y = d3.scaleLinear().range([this.height, 0]);
      this.yAxis = d3.axisLeft().scale(this.y);
      this.svg.append("g")
        .attr("class","myYaxis")
    },

    // Create a function that takes a dataset as input and update the plot:
    update(data) {
      // Create the X axis:
      // 최대값을 찾을 배열 data, ser1 중 최대값 d.ser1
      this.x.domain([0, d3.max(data, function(d) { return d.ser1 }) ]);
      this.svg.selectAll(".myXaxis").transition()// x축이 부드럽게 그려지도록!
        .duration(3000)
        .call(this.xAxis);

      // create the Y axis
      this.y.domain([0, d3.max(data, function(d) { return d.ser2  }) ]);
      this.svg.selectAll(".myYaxis")
        .transition()
        .duration(3000)
        .call(this.yAxis);

      // Create a update selection: bind to the new data
      const u = this.svg.selectAll(".lineTest")
        .data([data], function(d){ return d.ser1 });

      // Updata the line
      u
        .join("path")
        .attr("class","lineTest")
        .transition()
        .duration(3000)
        .attr("d", d3.line()   //선 그래프의 경로 정의
          .this.x(function(d) { return this.x(d.ser1); })
          .this.y(function(d) { return this.y(d.ser2); }))
          .attr("fill", "none")
          .attr("stroke", "steelblue")
          .attr("stroke-width", 2.5)
    }

  }
}
</script>

<style scoped>

</style>
