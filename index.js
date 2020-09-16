const Discord = require("discord.js");
const config = require("./config.json");

const request = require('request'); 
const cheerio = require('cheerio'); 


const client = new Discord.Client();

const prefix = "-c"; 


client.on("message", function(message) { 
    if(message.author.bot)return; 
    if (!message.content.startsWith(prefix)) return;

    let requestChampName = message.content.split(' ')[1];
    
    if(!requestChampName) return; 

    let url = "https://lolcounter.com/champions/"+ requestChampName; 

    let counters = []; 

    request({
        uri: url,
      }, function(error, response, body) {
         var $ = cheerio.load(body);
         $(".weak-block > .champ-block > a").each(function() {
           var link = $(this);
           var name = link.attr("href"); 
           let champName = name.split('/')[2];

           if(counters.length <=3){
               counters.push(champName); 
           }
        });

        if(!counters[0]){
            message.reply("Sorry, The request failed. Information about Sett, Lillia, Yone, Yummi and Samira is unavailable! Please check the champion name and try again."); 
        }else{
            message.reply("Top 3 Counters are : " + counters[1] +", " +  counters[2] + ", " +  counters[3])
        }

       
      
      });

     

                 
});                                      

client.login(config.BOT_TOKEN);

