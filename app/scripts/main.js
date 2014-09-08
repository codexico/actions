'use strict';
var  Actions = (function (window, document, $, undefined) {

  var api = {};

  var actionsList = JSON.parse(localStorage.getItem('actions')) || [];
  var whereList = JSON.parse(localStorage.getItem('where')) || [];
  var $els = {};

  function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
  }

  function getActionsByDuration(duration) {
    var actions = [];

    for (var i = actionsList.length - 1; i >= 0; i--) {
      if (actionsList[i].duration === duration) {
        actions.push(actionsList[i]);
      }
    }

    return actions;
  }

  function getAction(options) {
    var filteredActions = actionsList;
    var random;

    if (options.duration) {
      filteredActions = getActionsByDuration(options.duration);
    }

    random = getRandomInt(0, filteredActions.length);
    return filteredActions[random];
  }

  api.showAction = function (form) {
    var action = {};
    var $form = $(form);
    var options = {};
    options.duration = $form.find('.option-duration_input').val();

    action = getAction(options);

    if (!action) {
      $('.action-title').html('not found');
      return api;
    }

    $('.action-title').html(action.title || '');
    $('.action-duration').html(action.duration || '');
    $('.action-where').html(action.where || '');

    return api;
  };

  function renderWhereHTML() {
    for (var i = whereList.length - 1; i >= 0; i--) {
      appendWhereHTML(whereList[i]);
    }
  }

  function appendWhereHTML(whereObj) {
    var option = '<option value="' + whereObj.id + '">' + whereObj.name + '</option>';
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

  function helperWhere() {
    $els.body.on('keyup keydown blur', '.input-new-where', function () {
      if($.trim($(this).val())) {
        $('.input-where').val('').prop('disabled', true);
        return true;
      }
      $('.input-where').prop('disabled', false);
    });
  }



  api.init = function () {
    $els.body = $('body');

    $els.body.on('submit', '.form-new-action', function (event) {
      event.preventDefault();
      onActionSubmit(this);
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
