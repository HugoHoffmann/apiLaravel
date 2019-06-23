
$(function(){
  $(document).ready(function() {
    $.ajax({
      type: 'GET',
      dataType: 'json',
      url: 'http://localhost:8000/api/todo',
      success: function(todos) {
        todos.forEach(todo => {
          addToDo(todo.todo, todo.id);
        });
      },error: function(error){
        console.log(error);
      }
    });
  });
  var ultimoClick;

  $(".tarefa-delete").click(onTarefaDeleteClick);
  $(".tarefa-item").click(onTarefaItemClick);

  $("#tarefa").keydown(onTarefaKeydown);
  $("#tarefa").focus();



 function onTarefaKeydown(e){
    // verifica se clicou enter e tem valor
    if (e.keyCode === 13 && $("#tarefa").val()) { 
      var $todo = $("#tarefa").val();
      $.ajax({
         type: "POST",
         dataType: 'json',
         url: "http://localhost:8000/api/todo",
         data: { todo: $todo },
         success: function(todo){
            addToDo(todo.todo, todo.id);
         },
         error: function(error){
            console.log(error);
         }
      })
    }
 }

 function addToDo(text, id){
   $("#tarefa").val('');
   let todo = $("<div />").addClass("tarefa-item").attr('rel', id);   
   todo.append($("<div />").addClass("tarefa-texto").text(text));
   todo.append($("<div />").addClass("tarefa-delete"));
   todo.append($("<div />").addClass("clear"));

   $("#tarefa-list").append(todo);
   $(".tarefa-item").click(onTarefaItemClick);
   $(".tarefa-delete").click(onTarefaDeleteClick);
   
 }

 function onTarefaDeleteClick(){
      var item = $(this).parent(".tarefa-item");
      item.unbind('click');
      item.hide();

      var id = item.attr('rel');
      $.ajax({
         type: 'DELETE',
         url: 'http://localhost:8000/api/todo/' + id,
         success: function(response){

         },
         error: function(error){

         }
      });

 }

 function onTarefaItemClick(){
  if (!$(this).is(ultimoClick)) {

    if (ultimoClick !== undefined) {
      saveEdit(ultimoClick);
    }

    ultimoClick = $(this);
    var texto = ultimoClick.children(".tarefa-texto").text();
    var input = "<input type='text' class='tarefa-edit'" + " value='"+texto+"'>";
    ultimoClick.html(input);
    $(".tarefa-edit").keydown(onToDoEditKeydown);
  }

 }

 function saveEdit(el) {
  var text = el.children(".tarefa-edit").val();
  var id = el.children(".tarefa-edit").parent(".tarefa-item").attr('rel');

  $.ajax({
    type: 'PUT',
    dataType: 'json',
    data: {"todo": text},
    url: 'http://localhost:8000/api/todo/' + id,
    success: function(response){
      debugger;
    },
    error: function(error){
      debugger;
    }
  });

  el.empty();
  el.append("<div class='tarefa-texto'>"+text+"</div>");
  el.append("<div class='tarefa-delete'></div>");
  el.append("<div class='clear'></div>");

  $(".tarefa-delete").click(onTarefaDeleteClick);

  el.click(onTarefaItemClick);
}

function onToDoEditKeydown(event) {
  if (event.keyCode === 13) {
    saveEdit(ultimoClick);
    ultimoClick = undefined;
  }
}


});
