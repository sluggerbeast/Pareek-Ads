import express from "express"
import path from "path"
import { Client } from "@adzerk/decision-sdk";
let client = new Client({ networkId: 23, siteId: 667480 });


const app = express()
const port = 3000
app.use(express.static('public'));
app.get("/",(req,res)=>{
    res.sendFile(path.join(__dirname, 'client/index.html'));
})
/////
// Demo network, site, and ad type IDs; find your own via the Adzerk UI!
var resp= {}
var ads = ()=>{
    


let request = {
  placements: [{ adTypes: [5] }],
  user: { key: "Rajesh" },
  keywords: ["shoe", "clothes"]
};

client.decisions.get(request).then(response => {
  console.dir(response, { depth: null });
  resp = response;
  
});

}

/////
app.get('/ads', (req, res) => {
    ads();
    ///send back impression url fire
    //client.pixels.fire({ url: resp.decisions.div0[0].impressionUrl });
  res.send({"ads":"true",
    "content":[{Clink:"/",img:"https://www.shutterstock.com/image-photo/female-mannequins-near-red-stand-600nw-2109598214.jpg",
        "extra":resp
    }]
})
})

app.listen(port, () => {
  console.log(`Ad-Server running ${port}`)
})