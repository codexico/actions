'use strict';
var  Actions = (function (window, document, $, undefined) {

  var api = {};

  var actionsList = [];
  var whereList = [];
  var $els = {};

  function getAllActions() {
    return JSON.parse(localStorage.getItem('actions')) || [];
  }

  function getAllWhere() {
    return JSON.parse(localStorage.getItem('where')) || [];
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

  api.getAction = function (options) {
    var filteredActions = actionsList;
    var random;

    if (options.duration) {
      filteredActions = filterActionsByDuration(filteredActions, options.duration);
    }

    if (options.where) {
      filteredActions = filterActionsByWhere(filteredActions, options.where);
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

    action = api.getAction(options);

    if (!action) {
      $('.action-title').html('not found');
      return api;
    }

    $('.action-title').html(action.title || '');
    $('.action-duration').html(action.duration || '');
    $('.action-where').html(action.where || '');

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

  function buildAction($form) {
    var newWhere = $.trim($form.find('.input-new-where').val());
    var action = {};

    // required data
    action.date = new Date();
    action.title = $.trim($form.find('.input-title').val());

    // extra data
    action.duration = $.trim($form.find('.input-duration').val()) || undefined;
    action.where = $.trim($form.find('.input-where').val()) || undefined;

    if (newWhere) {
      action.where = newWhere;
    }

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

  api.save = function (action) {
    actionsList.push(action);
    localStorage.setItem('actions', JSON.stringify(actionsList));

    api.saveWhere(action);

    return api;
  };

  api.getLast = function () {
    return actionsList[actionsList.length -1];
  };

  api.getLastWhere = function () {
    return whereList[whereList.length -1];
  };

  api.getLastPeople = function () {
    return false;
  };

  api.deleteAll = function () {
    localStorage.clear();
    actionsList = [];
  };

  function onActionSubmit(form) {
    var action = buildAction($(form));

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



  api.init = function () {
    actionsList = getAllActions();
    whereList = getAllWhere();

    $els.body = $('body');

    $els.body.on('submit', '.form-new-action', function (event) {
      event.preventDefault();
      onActionSubmit(this);
      onChangeWhere();
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

    $('input:first').focus();

    return api;
  };

  return api;
}(window, document, jQuery));

$(function () {
  Actions.init();
});
