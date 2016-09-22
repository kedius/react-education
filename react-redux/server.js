const express = require('express'),
      app = express(),
      port = process.env.PORT || 3000,
      cors = require('cors'),
      bodyParser = require('body-parser'),
      router = express.Router(),
      server = require('http').createServer(app),
      contacts = require('./contacts.json');


app.set('port', port);

app.use(cors());
app.use(bodyParser.json({limit: '50mb'}));
app.use(bodyParser.urlencoded({extended: false, limit: '50mb'}));

router.get('/contacts', (req, res) => {
  res.json(contacts);
});

router.post('/contacts', (req, res) => {
  if (req.body.name && req.body.phone && req.body.image) {
    const contact = Object.assign({}, {
      id: contacts[contacts.length - 1].id + 1
    }, req.body);
    contacts.push(contact);

    res.json({ success: true, contact });
  } else {
    res.statusCode = 400;

    res.json({ success: false });
  }
});

router.put('/contacts/:id', (req, res) => {
  const contactIndex = contacts.findIndex(contact => contact.id === Number(req.params.id));

  if (contactIndex !== -1) {
    contacts[contactIndex] = Object.assign({}, contacts[contactIndex], req.body);
    res.json({ success: true, contact: contacts[contactIndex] });
  } else {
    res.statusCode = 404;
    res.json({ success: false });
  }
});

router.delete('/contacts/:id', (req, res) => {
  const contactIndex = contacts.findIndex(contact => contact.id === Number(req.params.id));

  if (contactIndex !== -1) {
    contacts.splice(contactIndex, 1);
    res.json({ success: true });
  } else {
    res.statusCode = 404;
    res.json({ success: false });
  }
});

app.use(router);

server.listen(port, () => {
  console.log(
    '\x1b[32m%s\x1b[0m \x1b[44m\x1b[37m%s\x1b[0m',
    'GoWithMeServer started on',
    `http://localhost:${port}/`
  );
});
