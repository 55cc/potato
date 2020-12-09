import { onMount } from 'svelte';
// import { createEventDispatcher } from 'svelte';
// const dispatch = (...s)=>console.log(...s)
// createEventDispatcher();
export let next;
export let style;
export let scale = 3.3;

// export let count = null;
let _calc_count = null;
let rowNum = 0;
let colNum = 0;
let grid = [];

function setGrid(count) {
  console.log("setGrid", count)
  let arr = Array(count || 0).fill(0);
  grid = arr.map((v, i) => {
    return {
      index: i + 1,
    }
  })
  grid = grid;
}


let classSuff = (Math.random() + "").replace("0.", "").slice(0, 5);
let styleTag = null;

$: __watchStyle = resetStyle() || style;

onMount(async () => {
  // resetStyle();
});

function resetStyle() {
  grid = [];
  cssCodeToStyle(style);
  // setTimeout(() => {

  // }, 300)
  // ;
  // let span = getSpan();
  // outPutCount(rowNum, colNum, span);
}
let gridGtr = "";
function cssCodeToStyle(cssCode) {
  // debugger
  cssCode = cssCode.replace(/\/\*.*?\*\//g, "");

  let root = "\n.grid-" + classSuff;
  let csstag = cssCode.replace(/[^}]+{/g, function (str) {
    //    return root+str.trim().replace(/,/g,','+root)
    return str.trim().split(',').map(v => {
      let c = v.indexOf(".container") > -1 ? "" : ">"
      return (root + c + v);
    }).join(',');
  });
  styleTag = csstag;
  setTimeout(() => {
    let ele = document.querySelector(".preview.grid-" + classSuff);
    let style = window.getComputedStyle(ele);

    let calcLen = (str) => {
      let m1 = str.match(/(\d+)/g) || [];
      let m2 = str.match(/(calc)/g) || [];
      console.log("calc len", str, m1.length , m2.length);
      return m1.length - m2.length;
    }



    rowNum = calcLen(style.gridTemplateRows + "");//
    colNum = calcLen(style.gridTemplateColumns + "");//
    let repeatStr = " repeat(10, 0px);";
    gridGtr = "grid-template-rows:" + Array(rowNum).fill("10px").join(" ") + repeatStr;
    setTimeout(() => {
      let hidden = Array.from(document.querySelectorAll(".hidden>.grid-" + classSuff + ">.item"));
      let f = hidden.every((item, i) => {
        item.innerText = "" + window.getComputedStyle(item).height;
        if (window.getComputedStyle(item).height == "0px") {
          _calc_count = i;
          // break;
          console.log("every height", i);
          return false;
        }
        return true;
      });
      if (f) _calc_count = hidden.length;
      setGrid(_calc_count);
    }, 100)

  }, 100);
}
// 内部放大
$: scaleCalc = `transform:scale3d(${1 / scale}, ${1 / scale}, ${1 / scale});width:${scale * 100}%;height:${scale * 100}%;`;
