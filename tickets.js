const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const fs = require("fs");
const app = express();

app.use(bodyParser.json());
app.use(cors());

app.post("/tickets/:where/:guestno/:arrives/:leaving", (req, res) => {
    const { where,guestno,arrives, leaving} = req.body;
  
  
    fs.readFile("./ticket.json", (err, data) => {
      if (err) {
        console.log(err);
      } else {
        const tickets = JSON.parse(data);
        const ticket = {
          id: tickets.length + 1,
          where,
          guestno,
          arrives,
          leaving,
        };
  
        tickets.push(ticket);
        fs.writeFile("ticket.json", JSON.stringify(tickets), (err) => {
          if (err) {
            console.log(err);
          } else {
            res.status(201).send(ticket);
          }
        });
      }
    });
  });

  app.get("/tickets/:id", (req, res) => {
    const { id } = req.params;
    fs.readFile("./tickets.json", (err, data) => {
      if (err) {
        console.log(err);
      } else {
        const tickets = JSON.parse(data);
        const ticket = tickets.find((t) => t.id == id);
  
        if (ticket) {
          res.status(200).send(ticket);
        } else {
          res.status(404).send("ticket not found");
        }
      }
    });
  });
  
  app.listen(3000, () => {
    console.log("server started at http://localhost:3000//tickets/:id");
  });