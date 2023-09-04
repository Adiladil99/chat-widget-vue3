let style = document.createElement("style");
style.textContent = `
  .widgetClass {
    max-height: calc(100% - 40px);
    max-width: calc(100% - 40px);
    animation: impulse 2s ease-in-out infinite;
  }
  .widgetClass:hover {
    animation: none;
  }
  @keyframes impulse {
    0%, 100% {
        transform: scale(1);
    }
    50% {
        transform: scale(1.07);
    }
  }
`;
document.head.appendChild(style);

let iframe = document.createElement("iframe");
iframe.src = "http://localhost:8080"; // Замените на нужный вам URL
iframe.width = "100%";
iframe.height = "100%";
iframe.style.border = "none";
iframe.style.outline = "none";
iframe.style.borderRadius = "12px";

// Создание элемента iframe
let widget = document.createElement("div");
widget.id = "widgetId";
widget.className = "widgetClass";
widget.style.width = "60px";
widget.style.height = "60px";
widget.style.position = "fixed";
widget.style.bottom = "20px";
widget.style.right = "20px";
widget.appendChild(iframe);

document.body.appendChild(widget);

// Обработчик события сообщений из iframe
window.addEventListener("message", function (event) {
  if (event.origin === "http://localhost:8080") {
    // Проверьте правильность домена
    // Получаем данные из сообщения
    let receivedData = event.data;
    // Пример: Изменение стилей на основе полученных данных
    if (receivedData) {
      widget.style.width = "380px";
      widget.style.height = "600px";
      widget.style.backgroundColor = "#fff";
      widget.style.borderRadius = "12px";
      iframe.style.display = "block";
      widget.style.animation = "none";
      widget.style.boxShadow =
        "0 0 3px rgba(0,0,0,0.1), 0 5px 50px rgba(0,0,0,0.2)";
    } else {
      widget.style.width = "60px";
      widget.style.height = "60px";
      widget.style.backgroundColor = "#3569b7";
      widget.style.animation = "impulse 2s ease-in-out infinite";
      widget.style.borderRadius = "50%";
    }
  }
});

// let togg = false
// widget.addEventListener('click', () => {
//  togg = !togg
//  if (togg) {
//   widget.style.width = '380px';
//   widget.style.height = '600px';
//   widget.style.backgroundColor = '#fff';
//   widget.style.borderRadius = '12px';
//   widget.appendChild(iframe)
//   iframe.style.display = 'block'
//   widget.style.boxShadow = '0 0 3px rgba(0,0,0,0.1), 0 5px 50px rgba(0,0,0,0.2)';
//  } else {
//   widget.style.width = '60px';
//   widget.style.height = '60px';
//   widget.style.backgroundColor = '#3569b7';
//   widget.style.borderRadius = '50%';
//   iframe.style.display = 'none'
//  }
// })

// Создаем стили
// let style = document.createElement('style');
// style.textContent = `
//   .widgetClass {
//     position: fixed;
//     transform: none;
//     z-index: 999;
//     bottom: 20px;
//     right: 20px;
//     max-height: calc(100% - 40px);
//     max-width: calc(100% - 40px);
//   }
//   .widgetClass:hover {
//    cursor: pointer;
//    transition: all 0.3s;
//   }
// `;
