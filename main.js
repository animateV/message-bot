// Функция, возвращающая новую кнопку
function getButton(text) {
  let button = document.createElement("button")
  button.classList.add("send-box__btn")
  button.textContent = text
  return button
}

// Обёртка для полей
function getWrapperField() {
  let wrapperField = document.createElement('div');
  wrapperField.classList.add('field-box')
  return wrapperField
}

// Текст ошибки
function getErrorText(text) {
  let errorFieldText = document.createElement('p');
  errorFieldText.classList.add('error-text')
  errorFieldText.textContent = text;
  return errorFieldText
}

// Функция, возвращающая новый input
function getInput(type, placeholder) {
  let input = document.createElement("input")
  input.classList.add("send-box__inp")
  input.type = type
  input.placeholder = placeholder
  return input
}

// Функция, возвращающая новый textarea
function getTextarea(placeholder) {
  let textarea = document.createElement("textarea")
  textarea.classList.add("send-box__inp")
  textarea.placeholder = placeholder
  return textarea
}

// Функция, возвращающая карточку сообщения
function getMsgCard(email, msg, incoming = false) {
  let msgCard = document.createElement("div")
  msgCard.classList.add("msg-box__card")

  // Если сообщение входящее
  if (incoming === true) {
    // Добавляем класс
    msgCard.classList.add("msg-box__card_incoming")
  }

  let emailSpan = document.createElement("span")
  emailSpan.classList.add("msg-box__email")
  emailSpan.textContent = email

  let messageText = document.createElement("p")
  messageText.classList.add("msg-box__text")
  messageText.textContent = msg

  let removeBtn = document.createElement("button")
  removeBtn.classList.add("msg-box__remove-btn")
  removeBtn.textContent = "Удалить"

  removeBtn.onclick = function () {
    if (confirm("Вы уверены, что хотите удалить сообщение?")) {
      msgCard.remove()
    }
  }

  msgCard.append(emailSpan, messageText, removeBtn)

  return msgCard
}

// Блок для сообщений
let msgBox = document.createElement("div")
msgBox.classList.add("msg-box")

// Блок для отправки сообщения
let sendBox = document.createElement("div")
sendBox.classList.add("send-box")

// Создание текстовых полей и кнопки
let emailWrapper = getWrapperField();
let emailInp = getInput("email", "E-mail")
emaiTextError = getErrorText();
emailWrapper.append(emailInp, emaiTextError)

let messageWrapper = getWrapperField();
let messageText = getTextarea("Сообщение")
let messageTextError = getErrorText();
messageWrapper.append(messageText, messageTextError)

let sendBtn = getButton("Отправить сообщение")

sendBox.append(emailWrapper, messageWrapper, sendBtn) // Добавление в sendBox

// Отправка сообщения
sendBtn.onclick = function () {
  let emailValue = emailInp.value
  let messageTextValue = messageText.value

  let validationError = false // Флаг ошибки

  // Сброс текста ошибок
  emaiTextError.textContent = ""
  messageTextError.textContent = ""

  // Проверки
  if (emailValue.includes('@') === false) {
    emaiTextError.textContent = 'Обязательно должна присутствовать @';
    validationError = true
  }

  if (emailValue.includes('.') === false) {
    emaiTextError.textContent = 'Обязательно должна присутствовать .';
    validationError = true
  }

  if (emailValue.search(/[a-z]/) === -1 && emailValue.search(/[A-Z]/) === -1) {
    emaiTextError.textContent = 'Язык почты должен иметь английскую раскладку';
    validationError = true
  }

  if (emailValue.length < 6) {
    emaiTextError.textContent = 'Минимальное количество символов - 6';
    validationError = true
  }

  if (messageTextValue.length > 100) {
    messageTextError.textContent = 'Максимальное количество символов - 100'
    validationError = true
  }

  if (messageTextValue.length < 3) {
    messageTextError.textContent = 'Минимальное количество символов - 3'
    validationError = true
  }

  // Если есть ошибки мы завершаем выполнение функции клика
  if (validationError === true) {
    return
  }

  // Отправка сообщения
  let newMsgCard = getMsgCard(emailValue, messageTextValue)
  msgBox.prepend(newMsgCard) // Добавляем в начало msgBox

  // Ответ от бота
  let botEmail = "bot@kurs.js"
  let botText = `Привет, ${emailValue}! Я Бот и я умею отвечать только приветственным сообщением. Но думаю скоро смогу научиться делать намного больше.`

  let botMsgCard = getMsgCard(botEmail, botText, true)
  msgBox.prepend(botMsgCard) // Добавляем в начало msgBox

  // Очищаем текст сообщения
  messageText.value = ""
}

document.body.append(sendBox, msgBox)
