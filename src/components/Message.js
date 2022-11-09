// a form of global function used for displaying messages
import "../assets/displayMsg.css";
function displayMsg(type, resMsg) {
  let msg;
  msg = document.createElement("p");
  msg.className = "msg";
  document.body.insertBefore(msg, document.body.firstElementChild);
  if (type.toLowerCase() === "success") {
    msg.innerHTML = `&check; &nbsp; ${resMsg}`;
  } else {
    msg.innerHTML = `&#9888; &nbsp;${resMsg}`;
    msg.style.background = "rgb(248, 20, 3)";
  }
  setTimeout(() => {
    document.body.removeChild(msg);
  }, 2000);
}

export default displayMsg;
