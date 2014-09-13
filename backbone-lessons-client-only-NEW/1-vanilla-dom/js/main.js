window.onload = function () {
  var todo = {
    title: 'mow the lawn'
  };
  var myApp = document.querySelector('#my-app');
  myApp.innerHTML = '<h1><i class="fa fa-check-square-o"></i> Todos</h1>' + 
                        '<ol><li>' + todo.title + '</li></ol>';
}
