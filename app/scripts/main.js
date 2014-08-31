(function (window, document, $, undefined) {
  'use strict';

  var actions = JSON.parse(localStorage.getItem('actions')) || [];

  // Returns a random integer between min (included) and max (excluded)
  // Using Math.round() will give you a non-uniform distribution!
  function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
  }

  function showAction() {
    var action = actions[getRandomInt(0, actions.length)];
    $('.action').html(action.title);
  }

  function addAction(title) {
    var action = {
      title: title,
      date: new Date()
    };

    actions.push(action);
  }

  function saveAction(title) {
    addAction(title);

    localStorage.setItem('actions', JSON.stringify(actions));

    console.log("JSON.parse(localStorage.getItem('actions')) = ", JSON.parse(localStorage.getItem('actions')));
  }

  function clearActions() {
    localStorage.clear();
    actions = [];
  }


  $(function () {

    $(document).on ('submit', '.form-new-action', function (event) {
      event.preventDefault();

      var title = $(this).find('.input-title').val();

      if (title) {
        saveAction(title);
      }

      this.reset();
    });

    $(document).on ('click', '.button-delete-all', function (event) {
      event.preventDefault();
      clearActions();
    });

    $(document).on ('click', '.button-action', function (event) {
      event.preventDefault();
      showAction();
    });

  });



}(window, document, jQuery));
