const Request = function(url){
  this.url = url;
}

Request.prototype.get = function(onComplete){
  const xhr = new XMLHttpRequest();

  xhr.addEventListener('load', () => {
    if(xhr.status !== 200){
      return;
    }

    const responseText = xhr.responseText;
    const data = JSON.parse(responseText);
    onComplete(data);
  });

  xhr.open("GET", this.url);
  xhr.setRequestHeader('Accept', 'application/json');
  xhr.send();
}

module.exports = Request;
