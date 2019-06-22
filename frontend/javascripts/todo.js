
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
      });

 }

 function onTarefaItemClick(){

 }


});
