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
    var title = '';

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

    it('should show title', function () {
      Actions.showAction();
      title = $('.action-title').html();
      assert(savedAction.title, title);
    });

  });


  describe('action with duration', function () {
    var actionsLength = 0;
    var savedAction = {};

    Actions.save(actionFull);

    actionsLength = JSON.parse(localStorage.getItem('actions')).length;
    savedAction = Actions.getLast();

    it('should saveAction with duration', function () {
      assert(1, actionsLength);
      assert(actionFull, savedAction);
      expect(savedAction).to.deep.equal(actionFull);
    });

    it('should have duration', function () {
      expect(savedAction).to.have.a.property('duration', 4);
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

    Actions.save(actionFull);

    actionsLength = JSON.parse(localStorage.getItem('actions')).length;
    savedAction = Actions.getLast();
    savedWhere = Actions.getLastWhere();

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
  });



  describe('action with where', function () {
    var actionsLength = 0;
    var savedAction = {};
    var savedWhere = {};

    Actions.save(actionFull);

    actionsLength = JSON.parse(localStorage.getItem('actions')).length;
    savedAction = Actions.getLast();
    savedWhere = Actions.getLastWhere();

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
  });



  describe('options', function () {

    describe('show options', function () {

      it('should show option duration', function () {
        expect($('.option-duration').length).to.deep.equal(1);
      });

      it('should show option where', function () {

      });

    });

    describe('use options', function () {

      it('should filter options with duration', function () {

      });

      it('should filter options with where', function () {

      });

    });

  });



})();
