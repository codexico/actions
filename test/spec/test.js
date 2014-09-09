/* global describe, it, assert, expect, Actions */
(function () {
  'use strict';


  var actionFull = {
    title: 'testFull',
    date: new Date(),
    duration: 4,
    where: 'house'
  };
  var actionMin = {
    title: 'testMin',
    date: new Date()
  };

  describe('save action', function () {
    var actionsLength = 0;
    var savedAction = {};

    Actions.save(actionMin);

    actionsLength = JSON.parse(localStorage.getItem('actions')).length;
    savedAction = Actions.getLast();

    it('should saveAction', function () {
      assert(1, JSON.parse(localStorage.getItem('actions')).length);
      assert([actionMin], JSON.parse(localStorage.getItem('actions')));
      expect(savedAction).to.deep.equal(actionMin);
    });

    it('should have title', function () {
      expect(savedAction).to.have.a.property('title', actionMin.title);
      assert(actionMin.title, JSON.parse(localStorage.getItem('actions'))[0].title);
    });

  });


  describe('action with duration', function () {
    var actionsLength = 0;
    var savedAction = {};
    var filteredAction = {};

    Actions.save(actionFull);

    actionsLength = JSON.parse(localStorage.getItem('actions')).length;
    savedAction = Actions.getLast();

    filteredAction = Actions.getAction({duration: 4});

    it('should saveAction with duration', function () {
      assert(1, actionsLength);
      assert(actionFull, savedAction);
      expect(savedAction).to.deep.equal(actionFull);
    });

    it('should have duration', function () {
      expect(savedAction).to.have.a.property('duration', 4);
    });

    it('should filter duration', function () {
      expect(filteredAction).to.have.a.property('duration', 4);
      expect(filteredAction).to.have.a.property('title', 'testFull');
    });

  });


  describe('delete All actions', function () {
    var actionsLength = 0;
    var savedAction = {};

    Actions.save(actionMin);

    actionsLength = JSON.parse(localStorage.getItem('actions')).length;
    savedAction = Actions.getLast();

    it('should have actions', function () {
      assert(1, actionsLength);
      expect(actionsLength).to.be.at.least(0);
    });

    it('should delete all', function () {
      Actions.deleteAll();
      expect(localStorage.getItem('actions')).to.be.an('null');
    });

    it('should insert after delete', function () {
      Actions.save(actionMin);
      actionsLength = JSON.parse(localStorage.getItem('actions')).length;
      expect(actionsLength).to.be.equal(1);
    });
  });


  describe('action with where', function () {
    var actionsLength = 0;
    var savedAction = {};
    var savedWhere = {};
    var filteredAction = {};

    Actions.save(actionFull);

    actionsLength = JSON.parse(localStorage.getItem('actions')).length;
    savedAction = Actions.getLast();
    savedWhere = Actions.getLastWhere();
    filteredAction = Actions.getAction({where: 'house'});

    it('should saveAction with where', function () {
      assert(1, actionsLength);
      assert(actionFull, savedAction);
      expect(savedAction).to.deep.equal(actionFull);
    });

    it('should have where', function () {
      expect(savedAction).to.have.a.property('where', 'house');
    });

    it('should save where', function () {
      expect(savedWhere).to.have.a.property('name', 'house');
      expect(savedWhere).to.have.a.property('id');
    });

    it('should filter where', function () {
      expect(filteredAction).to.have.a.property('where', 'house');
      expect(filteredAction).to.have.a.property('title', 'testFull');
    });


  });




})();
