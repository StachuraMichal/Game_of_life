!function(t){var i={};function e(n){if(i[n])return i[n].exports;var s=i[n]={i:n,l:!1,exports:{}};return t[n].call(s.exports,s,s.exports,e),s.l=!0,s.exports}e.m=t,e.c=i,e.d=function(t,i,n){e.o(t,i)||Object.defineProperty(t,i,{enumerable:!0,get:n})},e.r=function(t){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})},e.t=function(t,i){if(1&i&&(t=e(t)),8&i)return t;if(4&i&&"object"==typeof t&&t&&t.__esModule)return t;var n=Object.create(null);if(e.r(n),Object.defineProperty(n,"default",{enumerable:!0,value:t}),2&i&&"string"!=typeof t)for(var s in t)e.d(n,s,function(i){return t[i]}.bind(null,s));return n},e.n=function(t){var i=t&&t.__esModule?function(){return t.default}:function(){return t};return e.d(i,"a",i),i},e.o=function(t,i){return Object.prototype.hasOwnProperty.call(t,i)},e.p="",e(e.s=1)}([function(t,i){t.exports=jQuery},function(t,i,e){"use strict";e.r(i);var n=class{constructor(t=25,i=25){this.width=t,this.height=i,this.array=new Array(t).fill(new Array(i).fill(0))}setDimensions(t,i){this.array=new Array(t).fill(new Array(i).fill(0)),this.width=t,this.height=i}fillRandom(t){for(var i,e=0;e<this.array.length;e++){i=new Array(this.height);for(var n=0;n<this.array[0].length;n++)i[n]=Math.random()<t?1:0;this.array[e]=i}}doStep(){for(var t,i=new Array(this.width).fill(new Array(this.height)),e=0;e<this.array.length;e++){t=new Array(this.height);for(var n=0;n<this.array[0].length;n++)t[n]=(e-1<0?0:this.array[e-1][n])+this.array[e][n]+(e+1==this.width?0:this.array[e+1][n]);i[e]=t}for(e=0;e<this.array.length;e++){t=new Array(this.height);for(n=0;n<this.array[0].length;n++)t[n]=(n-1<0?0:i[e][n-1])+i[e][n]+(n+1==this.height?0:i[e][n+1])-this.array[e][n],3==t[n]?t[n]=1:2==t[n]?t[n]=this.array[e][n]:t[n]=0;this.array[e]=t}}},s=e(0),a=e.n(s);var h=class{constructor(){this.canvas=document.querySelector("#canvas"),this.ctx=this.canvas.getContext("2d"),this.resize(),this.allowDraw=a()("#allow-draw")}test(){this.ctx.fillRect(50,50,50,50)}render(t,i){this.clear(),this.ctx.fillStyle="green";for(var e=0;e<t.length;e++)for(var n=0;n<t[0].length;n++)1==t[e][n]&&this.ctx.fillRect(i*e,i*n,i,i)}clear(){this.ctx.clearRect(0,0,this.canvas.width,this.canvas.height)}resize(t=500,i=500){this.canvas.width=t,this.canvas.height=i}fillCell(t,i,e,n){var s=this.canvas.getBoundingClientRect();let a=Math.floor((t-s.left)/e),h=Math.floor((i-s.top)/e),l=[...n[a]];l[h]=1,n[a]=l,this.ctx.fillStyle="green",this.ctx.fillRect(a*e,h*e,e,e)}warning(t){this.clear(),this.ctx.font="30px Comic Sans MS",this.ctx.fillStyle="red",this.ctx.textAlign="center",this.ctx.fillText(t,this.canvas.width/2,this.canvas.height/2)}};new class{constructor(){this.runButton=a()("#run"),this.initializeButton=a()("#initialize"),this.cellSizeInput=a()("#cell-size"),this.cellDensityInput=a()("#cell-density"),this.simTimeInput=a()("#sim-time"),this.timeDisplay=a()("#current-time"),this.resizeButton=a()("#resize"),this.heightInput=a()("#height"),this.widthInput=a()("#width"),this.canvas=a()("#canvas"),this.allowDrawCheck=a()("#allow-draw"),this.drawingTool=new h,this.cellZone=new n,this.stopButton=a()("#stop"),this.enableEndCheck=a()("#enable-end"),this.events(),this.initialized=!1,this.painting=!1,this.allowDraw=this.allowDrawCheck.is(":checked"),this.stop=!0}events(){this.runButton.on("click",this.run.bind(this)),this.initializeButton.on("click",this.initialize.bind(this)),this.resizeButton.on("click",this.resize.bind(this)),this.canvas.on("mousedown",this.startPosition.bind(this)),this.canvas.on("mouseup",this.endPosition.bind(this)),this.canvas.on("mousemove",this.draw.bind(this)),this.allowDrawCheck.on("click",this.allowDrawFun.bind(this)),this.stopButton.on("click",()=>{this.stop=!0}),this.enableEndCheck.on("click",this.enableEnd.bind(this)),this.cellSizeInput.on("input",()=>{this.stop=!0,this.resize()})}enableEnd(){this.enableEndCheck.is(":checked")||this.simTimeInput.attr("disabled","disabled")}allowDrawFun(){this.allowDraw=this.allowDrawCheck.is(":checked"),this.initialized=!0}run(){if(!this.checkConditions()||!this.initialized)return void(this.initialized?this.drawingTool.warning("wrong input!"):this.drawingTool.warning("You have to initialize first"));this.stop=!1;let t=Date.now()-Math.floor(1e3*this.timeDisplay.text().replace("time: ",""));var i=setInterval(function(){let e=Date.now()-t;if(e>1e3*this.simTimeInput.val()&&this.enableEndCheck.is(":checked")||this.stop)return void clearInterval(i);this.cellZone.doStep(),this.drawingTool.render(this.cellZone.array,this.cellSizeInput.val()),this.timeDisplay.text("time: "+(e/1e3).toFixed(2))}.bind(this),30)}initialize(){if(!this.checkConditions())return void this.drawingTool.warning("wrong input!");this.stop=!0,this.timeDisplay.text("time: 0");let t=Math.floor(this.drawingTool.canvas.width/this.cellSizeInput.val()),i=Math.floor(this.drawingTool.canvas.height/this.cellSizeInput.val());this.cellZone.setDimensions(t,i),this.cellZone.fillRandom(this.cellDensityInput.val());var e=[...this.cellZone.array];this.drawingTool.render(e,this.cellSizeInput.val()),this.initialized=!0}checkConditions(){return!!a.a.isNumeric(this.cellDensityInput.val())&&(!(this.cellDensityInput.val()>1||this.cellDensityInput.val()<0)&&!!a.a.isNumeric(this.cellSizeInput.val()))}resize(){this.stop=!0,this.timeDisplay.text("time: 0"),this.initialized=!1,a.a.isNumeric(this.heightInput.val())||alert("nie bangla"),a.a.isNumeric(this.widthInput.val())||alert("nie bangla"),this.drawingTool.resize(this.widthInput.val(),this.heightInput.val());let t=Math.floor(this.drawingTool.canvas.width/this.cellSizeInput.val()),i=Math.floor(this.drawingTool.canvas.height/this.cellSizeInput.val());this.cellZone.setDimensions(t,i)}startPosition(t){this.painting=!0,this.draw(t)}endPosition(){this.painting=!1}draw(t){this.painting&&this.allowDraw&&(this.initialized=!0,this.drawingTool.fillCell(t.clientX,t.clientY,this.cellSizeInput.val(),this.cellZone.array))}}}]);