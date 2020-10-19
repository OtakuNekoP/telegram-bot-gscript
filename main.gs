function doGet(e){
  return HtmlService.createHtmlOutput("Hello, this is a telegram bot server!");
}

function doPost(e){
  var dataFromTelegram = {
    "method": "post",
    "payload": e.postData.contents
  }
  //To JSON object
  var body = JSON.parse(e.postData.contents);
  //To string
  body.message.chat.id = body.message.chat.id + '';
 //payload
  var payload = preparePayload(body);
  //data format 
  var data = {
    "method": "post",
    "payload": payload
  }
 //callback
  UrlFetchApp.fetch("https://api.telegram.org/botYOUR-API-HERE/", data);
}

function preparePayload(body){
  var payload;
   
  if (body.message.text){ //recieved message
      var restText = body.message.text;
      if(restText.indexOf("ping") >= 0){
         restText = "pong!";
      }
     //message stracture
      payload = {
          "method": "sendMessage",
          "chat_id": body.message.chat.id,
          "text": restText,
      } 
     
  }
  else if (body.message.sticker){
    payload = {
      "method": "sendSticker",
      "chat_id": body.message.chat.id,
      "sticker": body.message.sticker.file_id
    }
   }
  else if (body.message.photo){
    array = body.message.photo;
    text = array[1];
    payload = {
      "method": "sendPhoto",
      "chat_id": body.message.chat.id,
      "photo": text.file_id
    }
   }
    else {
    payload = {
      "method": "sendMessage",
      "chat_id": body.message.chat.id,
      "text": "Try other stuff"
    }
   }
  return payload
}
