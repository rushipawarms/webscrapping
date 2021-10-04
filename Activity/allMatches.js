let request=require("request");

let cheerio=require("cheerio");
const getlink = require("./Match");
function getAllmatches(link)
{
    request(link,cb);
}

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
    let allAtag=ch('a[data-hover="Scorecard"]');
    
    for(i=0;i<allAtag.length;i++)
    {
        let link=ch(allAtag[i]).attr("href");
        let completLink="https://www.espncricinfo.com"+link;
        getlink(completLink);
        
    }
}
module.exports=getAllmatches;