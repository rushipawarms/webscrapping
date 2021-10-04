let fs=require("fs");
let cheerio=require("cheerio");
let f1kadata=fs.readFileSync("f1.txt","utf8");
//console.log(f1kadata);
//htmlkadata contains buffer formate data of index.html
let htmlkadata=fs.readFileSync("./index.html");
//if we want html tags data then we use cheerio
//to use cheerio functionality we load htmlkadata in ch
let ch=cheerio.load(htmlkadata);
let h1kadata=ch(".pa.outer").text();

//let h=ch(h1kadata[0]).text();
//console.log(h1kadata);
//console.log(h);
//console.log(h1kadata[0]);
/*
let list = [];
let myJson = {
  "name" : "sam"
}
list.push(myJson);
list=JSON.stringify(list);
fs.writeFileSync("./new",list);*/
