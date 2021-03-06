// routes/note_routes.js
var ObjectID = require('mongodb').ObjectID;

module.exports = function(app, db) {
  const data = db.db('noteapi');

  app.get('/notes', (req, res) => {
    data.collection('notes').find({}).toArray(function(err, items) {
      if (err) {
        res.send({'error': err});
      } else {
        res.send(items);
      }
    })
  })

  app.get('/notes/:id', (req, res) => {
    const id = req.params.id;
    const details = { '_id': new ObjectID(id) };
    data.collection('notes').findOne(details, (err, item) => {
      if (err) {
        res.send({'error': err});
      } else {
        res.send(item);
      }
    })
  });

  app.post('/notes', (req, res) => {
    // create your note here.
    const note = { text: req.body.body, title: req.body.title };
    data.collection('notes').insert(note, (err, result) => {
      if (err) {
        res.send({ 'error': err});
      } else {
        res.send(note)
      }
    })
  });

  app.delete('/notes/:id', (req, res) => {
    const id = req.params.id;
    const details = { '_id': new ObjectID(id) };
    data.collection('notes').remove(details, (err, item) => {
      if (err) {
        res.send( {'error': err });
      } else {
        res.send('Note ' + id + ' deleted!');
      }
    })
  })

  app.put('/notes/:id', (req, res) => {
    const id = req.params.id;
    const details = { '_id': new ObjectID(id) };
    const note = { text: req.body.body, title: req.body.title };
    data.collection('notes').update(details, note, (err, result) => {
      if (err) {
        res.send({ 'error': err });
      } else {
        res.send(note);
      }
    })
  })
};
