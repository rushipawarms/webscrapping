let request=require("request");
let cheerio=require("cheerio");
let fs= require("fs");
function getlink(link)
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
  
    let bothInnings=ch(".Collapsible");
    for(let i=0;i<bothInnings.length;i++)
    {
        let teamname=ch(bothInnings[i]).find("h5").text();
        
        teamname=teamname.split(" INNINGS")[0];
        //console.log(teamname);
        if(!teamname.includes("Team"))
        {
        let alltr=ch(bothInnings[i]).find(".table.batsman tbody tr");
        for(let j=0;j<alltr.length-1;j++)
        {
            let alltd=ch(alltr[j]).find("td");
            if(alltd.length>1)
            {
                let batsman=ch(alltd[0]).find("a").text().trim();
                let runs=ch(alltd[2]).text().trim();
                let balls=ch(alltd[3]).text().trim();
                let four=ch(alltd[5]).text().trim();
                let six=ch(alltd[6]).text().trim();
                let strikeRate=ch(alltd[7]).text().trim();
                //console.log("Batsman: "+batsman+" Runs: "+runs+" Balls: "+ balls+" Four: "+ four+" Six: "+ six+" Strike Rate: " +strikeRate);
               // console.log(`Batsman=${batsman} Runs=${runs} Balls=${balls} Four=${four} Six=${six}, Strike Rate=${strikeRate}`);
               //here getting info of one batsman in one iteration so from here we have process info of that batsman
               proceesData(teamname,batsman, runs,balls,four,six,strikeRate);
            }
        }
    }
        
    }
}
    function checkTeamFolder(teamname)
    {
        return fs.existsSync(teamname);        
    }
    
    function checkBatsmanFile(teamname,batsman)
    {
        let path=`${teamname}/${batsman}.json`;
        return fs.existsSync(path);
    }
    function createTeamFolder(teamname)
    {
        fs.mkdirSync(teamname);
    }
    function createBatsmanFile(teamname,batsman, runs,balls,four,six,strikeRate)
    {
        let path=`${teamname}/${batsman}.json`;
        let batsManFile=[];
        let inning={batsman:batsman,runs:runs,balls:balls,four:four,six:six,strikeRate:strikeRate};
        batsManFile.push(inning);
        batsManFile=JSON.stringify(batsManFile);
        fs.writeFileSync(path,batsManFile);


        }
    
    function updateBatsmanFile(teamname,batsman, runs,balls,four,six, strikeRate)
    {
        let path=`${teamname}/${batsman}.json`;
        let batsManFile=fs.readFileSync(path);
        batsManFile=JSON.parse(batsManFile);
        let inning={batsman:batsman,runs:runs,balls:balls,four:four,six:six,strikeRate:strikeRate};
        batsManFile.push(inning);
        batsManFile=JSON.stringify(batsManFile);
        fs.writeFileSync(path,batsManFile);

    }
    function proceesData(teamname,batsman, runs,balls,four,six,strikeRate)
    {
        let isTeamFolder=checkTeamFolder(teamname);
        if(isTeamFolder)
        {
            let isBatsmanFile=checkBatsmanFile(teamname,batsman);
            if(isBatsmanFile)
            {
                updateBatsmanFile(teamname,batsman, runs,balls,four,six,strikeRate);
            }
            else
            {
                createBatsmanFile(teamname,batsman, runs,balls,four,six,strikeRate);
            }
        }
        else
        {
            createTeamFolder(teamname);
            createBatsmanFile(teamname,batsman, runs,balls,four,six,strikeRate);
        }
    }
   // console.log("****************************************************************************************************************************");
  
 

module.exports=getlink;
