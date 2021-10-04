let request=require("request");
let fs=require("fs");
let cheerio=require("cheerio");
const getAllmatches = require("./allMatches");
let link="https://www.espncricinfo.com/series/icc-cricket-world-cup-2019-1144415";
request(link,cb);
function cb(error,response,html)
{
    if(error==null && response.statusCode==200)
    {
        parseData(html);
    }
    else if(response.statusCode==404)
    {
        console.log("Page Not Found");
    }
    else
    {
        console.log(error);
    }
}
function parseData(html)
{
    let ch=cheerio.load(html);
    let atag=ch(".widget-items.cta-link a").attr("href");
    let completLink="https://www.espncricinfo.com"+atag;
    getAllmatches(completLink);
  

    
    
}
//This code give you link of all matche from home page of website
//Actully this link is in <a href="link of all matches"></a>