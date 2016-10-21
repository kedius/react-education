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
  if (req.query.wait) {
    setTimeout(() => res.json({ success: true, contacts }), req.query.wait);
  } else {
    res.json({ success: true, contacts });
  }
});

router.post('/contacts', (req, res) => {
  if (req.body.name && req.body.phoneNumber && req.body.image) {
    const contact = Object.assign({}, {
      id: contacts[contacts.length - 1].id + 1
    }, req.body);

    contacts.push(contact);
    res.json({ success: true, contact });
  } else {
    res.statusCode = 400;
    res.json({ success: false, message: 'Bad Request' });
  }
});

router.put('/contacts/:id', (req, res) => {
  const contactIndex = contacts.findIndex(contact => contact.id === Number(req.params.id));

  if (contactIndex !== -1) {
    if (req.body.name && req.body.phoneNumber && req.body.image) {
      contacts[contactIndex] = Object.assign({}, contacts[contactIndex], req.body);
      res.json({ success: true, contact: contacts[contactIndex] });
    } else {
      res.statusCode = 400;
      res.json({ success: false, message: 'Bad Request' });
    }
  } else {
    res.statusCode = 404;
    res.json({ success: false, message: 'Contact Not Found' });
  }
});

router.delete('/contacts/:id', (req, res) => {
  const contactIndex = contacts.findIndex(contact => contact.id === Number(req.params.id));

  if (contactIndex !== -1) {
    contacts.splice(contactIndex, 1);
    res.json({ success: true });
  } else {
    res.statusCode = 404;
    res.json({ success: false, message: 'Contact Not Found' });
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
