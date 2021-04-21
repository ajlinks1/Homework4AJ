const socket = io.connect();
search_field = document.getElementById('search-field');
const data = {};
let list = '';
const err_msg = 'Sorry, no content matched your criteria, try again!';

// do the function with every keystroke
search_field.onkeyup = function () {
  data.query = this.value;
  if (this.value == null || this.value == '' || this.value == ' ') {
    document.getElementById('search-results').innerHTML = '';
  } else {
    socket.emit('search-field', data);
    if (this.value === 'comic sans') {
      changeFontFamily('Comic Sans MS');
    } else {
      changeFontFamily('Source Sans Pro');
    }
  }
};

socket.on('search-results', (result) => {
  if (result.length <= 0) {
    document.getElementById('search-results').innerHTML = `<h4>${err_msg}</h4>`;
  } else {
    console.log(result);
    list = '';
    for (let i = 0; i < result.length; i++) {
      const data = result[i].nam;
      list += `<li>${htmlEncode(data.Name)}</li>`;
    }

    document.getElementById('search-results').innerHTML = list;
  }
});

socket.on('submit-results', (result) => {
  console.log(result);
});

function onSubmitQuery(event) {
  event.preventDefault();

  if (search_field.value == null || search_field.value == '' || search_field.value == ' ') {
    document.getElementById('search-results').innerHTML = '';
  } else {
    const data = {};
    data.query = search_field.value;

    socket.emit('submit', data);

    search_field.value = '';
  }
}

function htmlEncode(str) {
  return String(str).replace(/[^\w. ]/gi, (c) => `&#${c.charCodeAt(0)};`);
}
function changeFontFamily(font) {
  const fontTest = document.getElementById('text');
  fontTest.style.fontFamily = font;
}
