'use strict';
var  Actions = (function (window, document, $, undefined) {

  var api = {};

  var actionsList = [];
  var whereList = [];
  var peopleList = [];
  var $els = {};

  function getAllActions() {
    return JSON.parse(localStorage.getItem('actions')) || [];
  }

  function getAllWhere() {
    return JSON.parse(localStorage.getItem('where')) || [];
  }

  function getAllPeople() {
    return JSON.parse(localStorage.getItem('people')) || [];
  }

  function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
  }

  function filterActionsByDuration(actions, duration) {
    var filteredActions = [];

    for (var i = actions.length - 1; i >= 0; i--) {
      if (actions[i].duration === duration) {
        filteredActions.push(actions[i]);
      }
    }

    return filteredActions;
  }

  function filterActionsByWhere(actions, where) {
    var filteredActions = [];

    for (var i = actions.length - 1; i >= 0; i--) {
      if (actions[i].where === where) {
        filteredActions.push(actions[i]);
      }
    }

    return filteredActions;
  }

  function filterActionsByPeople(actions, people) {
    var filteredActions = [];

    for (var i = actions.length - 1; i >= 0; i--) {
      if (actions[i].people === people) {
        filteredActions.push(actions[i]);
      }
    }

    return filteredActions;
  }

  function filterActionsByMood(actions, mood) {
    var filteredActions = [];

    for (var i = actions.length - 1; i >= 0; i--) {
      if (actions[i].mood === mood) {
        filteredActions.push(actions[i]);
      }
    }

    return filteredActions;
  }

  function filterActionsByDaytime(actions, daytime) {
    var filteredActions = [];

    for (var i = actions.length - 1; i >= 0; i--) {
      if (actions[i].daytime === daytime) {
        filteredActions.push(actions[i]);
      }
    }

    return filteredActions;
  }

  api.getAction = function (options) {
    var filteredActions = actionsList;
    var random;

    if (options.duration) {
      filteredActions = filterActionsByDuration(filteredActions, options.duration);
    }

    if (options.where) {
      filteredActions = filterActionsByWhere(filteredActions, options.where);
    }

    if (options.people) {
      filteredActions = filterActionsByPeople(filteredActions, options.people);
    }

    if (options.mood) {
      filteredActions = filterActionsByMood(filteredActions, options.mood);
    }

    if (options.daytime) {
      filteredActions = filterActionsByDaytime(filteredActions, options.daytime);
    }

    random = getRandomInt(0, filteredActions.length);
    return filteredActions[random];
  };

  api.showAction = function (form) {
    var action = {};
    var $form = $(form);
    var options = {};
    options.duration = $form.find('.option-duration_input').val();
    options.where = $form.find('.option-where_input').val();
    options.people = $form.find('.option-people_input').val();
    options.mood = $form.find('.option-mood_input').val();
    options.daytime = $form.find('.option-daytime_input').val();

    action = api.getAction(options);

    if (!action) {
      $('.action-title').html('not found');
      return api;
    }

    $('.action-title').html(action.title || '');
    $('.action-duration').html(action.duration || '');
    $('.action-where').html(action.where || '');
    $('.action-people').html(action.people || '');

    $('.action').removeClass('hidden');

    return api;
  };

  function buildWhereHTML(whereObj) {
    var option = '<option value="' + whereObj.name + '">' + whereObj.name + '</option>';
    return option;
  }

  function renderWhereHTML() {
    var options = '';
    for (var i = whereList.length - 1; i >= 0; i--) {
      options += buildWhereHTML(whereList[i]);
    }
    $('.input-where').append(options);
  }

  function appendWhereHTML(whereObj) {
    var option = buildWhereHTML(whereObj);
    $('.input-where').append(option);
  }

  function existWhere(where) {
    for (var i = whereList.length - 1; i >= 0; i--) {
      if (whereList[i].name === where) {
        return true;
      }
    }
    return false;
  }



  function buildPeopleHTML(peopleObj) {
    var option = '<option value="' + peopleObj.name + '">' + peopleObj.name + '</option>';
    return option;
  }

  function renderPeopleHTML() {
    var options = '';
    for (var i = peopleList.length - 1; i >= 0; i--) {
      options += buildPeopleHTML(peopleList[i]);
    }
    $('.input-people').append(options);
  }

  function appendPeopleHTML(peopleObj) {
    var option = buildPeopleHTML(peopleObj);
    $('.input-people').append(option);
  }

  function existPeople(people) {
    for (var i = peopleList.length - 1; i >= 0; i--) {
      if (peopleList[i].name === people) {
        return true;
      }
    }
    return false;
  }




  function buildAction($form) {
    var newWhere = $.trim($form.find('.input-new-where').val());
    var newPeople = $.trim($form.find('.input-new-people').val());
    var action = {};

    // required data
    action.date = new Date();
    action.title = $.trim($form.find('.input-title').val());

    // extra data
    action.duration = $.trim($form.find('.input-duration').val()) || undefined;
    action.where = $.trim($form.find('.input-where').val()) || undefined;
    action.people = $.trim($form.find('.input-people').val()) || undefined;
    action.mood = $.trim($form.find('.input-mood:checked').val()) || undefined;
    action.daytime = $.trim($form.find('.input-daytime:checked').val()) || undefined;

    if (newWhere) {
      action.where = newWhere;
    }

    if (newPeople) {
      action.people = newPeople;
    }
    // console.log("action = ", action);
    return action;
  }

  api.saveWhere = function (action) {
    var id = 'id_' + (+new Date());
    var whereObj = {
      id: id,
      name: action.where
    };

    if (existWhere(action.where)) {
      return true;
    }

    whereList.push(whereObj);
    localStorage.setItem('where', JSON.stringify(whereList));

    appendWhereHTML(whereObj);

    return api;
  };


  api.savePeople = function (action) {
    var id = 'id_' + (+new Date());
    var peopleObj = {
      id: id,
      name: action.people
    };

    if (existPeople(action.people)) {
      return true;
    }

    peopleList.push(peopleObj);
    localStorage.setItem('people', JSON.stringify(peopleList));

    appendPeopleHTML(peopleObj);

    return api;
  };


  api.save = function (action) {
    actionsList.push(action);
    localStorage.setItem('actions', JSON.stringify(actionsList));

    api.saveWhere(action);
    api.savePeople(action);

    return api;
  };

  api.getLast = function () {
    return actionsList[actionsList.length -1];
  };

  api.getLastWhere = function () {
    return whereList[whereList.length -1];
  };

  api.getLastPeople = function () {
    return peopleList[peopleList.length -1];
  };

  api.deleteAll = function () {
    localStorage.clear();
    actionsList = [];
  };

  function onActionSubmit(form) {
    var action = buildAction($(form));
    // console.log("$(form).serialize() = ", $(form).serialize());
    if (action.title) {
      api.save(action);
      form.reset();
    }
  }

  function onChangeWhere() {
    if($.trim($('.input-new-where').val())) {
        $('.input-where-list').val('').prop('disabled', true);
        return true;
      }
      $('.input-where-list').prop('disabled', false);
  }

  function helperWhere() {
    $els.body.on('keyup keydown blur', '.input-new-where', function () {
      onChangeWhere();
    });
  }


  function onChangePeople() {
    if($.trim($('.input-new-people').val())) {
        $('.input-people-list').val('').prop('disabled', true);
        return true;
      }
      $('.input-people-list').prop('disabled', false);
  }

  function helperPeople() {
    $els.body.on('keyup keydown blur', '.input-new-people', function () {
      onChangePeople();
    });
  }



  api.init = function () {
    actionsList = getAllActions();
    whereList = getAllWhere();
    peopleList = getAllPeople();

    $els.body = $('body');

    $els.body.on('submit', '.form-new-action', function (event) {
      event.preventDefault();
      onActionSubmit(this);
      onChangeWhere();
      onChangePeople();
    });

    $els.body.on('click', '.button-delete-all', function (event) {
      event.preventDefault();
      api.deleteAll();
    });

    $els.body.on('click', '.form-show-action', function (event) {
      event.preventDefault();
      api.showAction(this);
    });

    helperWhere();

    renderWhereHTML();

    helperPeople();

    renderPeopleHTML();

    $('input:first').focus();

    return api;
  };

  return api;
}(window, document, jQuery));

$(function () {
  Actions.init();
});
