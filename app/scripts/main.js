'use strict';
var  Actions = (function (window, document, $, undefined) {

  var api = {};

  var actionsList = JSON.parse(localStorage.getItem('actions')) || [];

  // function logActions() {
  //   console.log("actionsList.length = ", actionsList.length);
  //   console.log("JSON.parse(localStorage.getItem('actions')).length = ", JSON.parse(localStorage.getItem('actions')).length);
  //   for (var i = 0; i < actionsList.length; i++) {
  //     console.log("actionsList[i] = ", actionsList[i].title);
  //   }
  // }

  // Returns a random integer between min (included) and max (excluded)
  // Using Math.round() will give you a non-uniform distribution!
  function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
  }

  function showAction() {
    var action = actionsList[getRandomInt(0, actionsList.length)];
    $('.action').html(action.title);
  }

  api.save = function (action) {
    actionsList.push(action);
    localStorage.setItem('actions', JSON.stringify(actionsList));

    // logActions();
    return api;
  };

  api.getLast = function () {
    return actionsList[actionsList.length -1];
  };

  api.deleteAll = function () {
    localStorage.clear();
    actionsList = [];
  };

  function buildAction($form) {
    var action = {};

    action.title = $.trim($form.find('.input-title').val());
    action.duration = $form.find('.input-duration').val();
    action.date = new Date();

    return action;
  }

  api.init = function () {

    $(document).on ('submit', '.form-new-action', function (event) {
      event.preventDefault();

      var action = buildAction($(this));

      if (action.title) {
        api.save(action);
        this.reset();
      }

    });

    $(document).on ('click', '.button-delete-all', function (event) {
      event.preventDefault();
      api.deleteAll();
    });

    $(document).on ('click', '.button-action', function (event) {
      event.preventDefault();
      showAction();
    });

    return api;
  };

  return api;
}(window, document, jQuery));

$(function () {
  Actions.init();
});
