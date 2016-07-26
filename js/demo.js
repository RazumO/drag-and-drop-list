
(function() {
  var my_table = document.createElement("table"),
    N = 10,
    dragAndDropList = new window.DragAndDropList(),
    horizontalDragAndDropList = new window.DragAndDropList(),
    wrapper = document.getElementById("wrapper"),
    verticalListOptions,
    horizontalListOptions;

  my_table.setAttribute("id", "my_table");
  for(var i = 0; i < N; i++) {
    var tr = document.createElement("tr"),
    td1,
    td2;

    tr.setAttribute("id", "tr" + i);
    td1 = document.createElement("td");
    td1.innerHTML = i;
    td2 = document.createElement("td");
    td2.innerHTML = "UserName" + i + " UserSurname" + i;
    tr.appendChild(td1);
    tr.appendChild(td2);
    my_table.appendChild(tr);
  }

  wrapper.appendChild(my_table);

  verticalListOptions = {
    element: my_table,
    direction: 'vertical',
    cssClassForDruggingElement: 'dragging-element'
  };

  horizontalListOptions = {
    element: document.getElementById("horizontalList"),
    direction: 'horizontal',
    cssClassForDruggingElement: 'dragging-element'
  }
  dragAndDropList.init(verticalListOptions);
  horizontalDragAndDropList.init(horizontalListOptions);

})();