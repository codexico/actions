/* global describe, it, assert, expect, Actions */
(function () {
  'use strict';


  var actionFull = {
    title: 'testFull',
    date: new Date(),
    duration: 4,
    where: 'house',
    people: 'friend',
    mood: 'happy',
    time: 2
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
      expect(actionFull).to.have.a.property('duration', 4);
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


  describe('done action', function () {
    var actionsLength = {};
    var actionsDone =  [];
    var actionsDoneLength = {};

    if (localStorage.getItem('done')) {
      actionsDone = JSON.parse(localStorage.getItem('done'));
    } else {
      localStorage.setItem('done', JSON.stringify(actionsDone));
    }

    actionsDoneLength.before = JSON.parse(localStorage.getItem('done')).length;
    Actions.save(actionMin);
    actionsLength.before = JSON.parse(localStorage.getItem('actions')).length;

    Actions.showAction();
    Actions.actionDone();

    actionsDoneLength.after = JSON.parse(localStorage.getItem('done')).length;
    actionsLength.after = JSON.parse(localStorage.getItem('actions')).length;

    it('should remove action', function () {
      expect(actionsLength.after).to.be.equal(actionsLength.before - 1);
    });

    it('should save action done', function () {
      expect(actionsDoneLength.after).to.be.equal(actionsDoneLength.before + 1);
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
      expect(actionFull).to.have.a.property('where', 'house');
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

  describe('action with people', function () {
    var actionsLength = 0;
    var savedAction = {};
    var savedPeople = {};
    var filteredAction = {};

    Actions.save(actionFull);

    actionsLength = JSON.parse(localStorage.getItem('actions')).length;
    savedAction = Actions.getLast();
    savedPeople = Actions.getLastPeople();
    filteredAction = Actions.getAction({people: 'friend'});

    it('should saveAction with people', function () {
      expect(actionFull).to.have.a.property('people', 'friend');
      assert(1, actionsLength);
      assert(actionFull, savedAction);
      expect(savedAction).to.deep.equal(actionFull);
    });

    it('should have people', function () {
      expect(savedAction).to.have.a.property('people', 'friend');
    });

    it('should save people', function () {
      expect(savedPeople).to.have.a.property('name', 'friend');
      expect(savedPeople).to.have.a.property('id');
    });

    it('should filter people', function () {
      expect(filteredAction).to.have.a.property('people', 'friend');
      expect(filteredAction).to.have.a.property('title', 'testFull');
    });

  });



  describe('action with mood', function () {
    var actionsLength = 0;
    var savedAction = {};
    var filteredAction = {};

    Actions.save(actionFull);

    actionsLength = JSON.parse(localStorage.getItem('actions')).length;
    savedAction = Actions.getLast();
    filteredAction = Actions.getAction({mood: 'happy'});

    it('should saveAction with mood', function () {
      expect(actionFull).to.have.a.property('mood', 'happy');
      assert(1, actionsLength);
      assert(actionFull, savedAction);
      expect(savedAction).to.deep.equal(actionFull);
    });

    it('should have mood', function () {
      expect(savedAction).to.have.a.property('mood', 'happy');
    });

    it('should filter mood', function () {
      expect(filteredAction).to.have.a.property('mood', 'happy');
      expect(filteredAction).to.have.a.property('title', 'testFull');
    });

  });



  describe('action with time', function () {
    var actionsLength = 0;
    var savedAction = {};
    var filteredAction = {};

    Actions.save(actionFull);

    actionsLength = JSON.parse(localStorage.getItem('actions')).length;
    savedAction = Actions.getLast();
    filteredAction = Actions.getAction({time: 2});

    it('should saveAction with time', function () {
      expect(actionFull).to.have.a.property('time', 2);
      assert(1, actionsLength);
      assert(actionFull, savedAction);
      expect(savedAction).to.deep.equal(actionFull);
    });

    it('should have time', function () {
      expect(savedAction).to.have.a.property('time', 2);
    });

    it('should filter time', function () {
      expect(filteredAction).to.have.a.property('time', 2);
      expect(filteredAction).to.have.a.property('title', 'testFull');
    });

  });




})();
