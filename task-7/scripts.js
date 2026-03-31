const username_popup = document.getElementById("start-card");
const contact = document.querySelector(".sidebar-body");
const header = document.querySelector(".main-header");
const footer = document.querySelector(".main-footer");
const form = document.querySelector("form");
let user_id = "";
let active_receiver_id = "";
const savedId = JSON.parse(localStorage.getItem("chat-user-id"));

header.classList.add("empty-container");
footer.classList.add("empty-container");
updateUI();
updateSidebar();

form.addEventListener("submit", async (e) => {
  e.preventDefault();

  const username = document.getElementById("user-name").value;

  const res = await fetch(`http://localhost:3000/users?username=${username}`);
  const data = await res.json();

  if (data.length) {
    user_id = data[0].id;
    localStorage.setItem("chat-user-id", JSON.stringify(user_id));
    updateUI();
    return;
  }

  const res1 = await fetch("http://localhost:3000/users", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ username }),
  });
  const data1 = await res1.json();
  user_id = data1.id;
  localStorage.setItem("chat-user-id", JSON.stringify(user_id));
  updateUI();
});

function updateUI() {
  const savedId = localStorage.getItem("chat-user-id");

  if (savedId) {
    username_popup.classList.add("show-popup");
  }
}

async function updateSidebar() {
  const res = await fetch(`http://localhost:3000/users`);
  const data = await res.json();

  data.forEach((item) => {
    if (item.id != savedId) {
      const card = document.createElement("div");
      card.classList.add("contact-card");
      card.dataset.cardid = item.id;

      card.innerHTML = `
        <div class="image-container"><p id="badge">${item.username.charAt(0).toUpperCase()}</p></div>
          <div class="content-container">
            <div class="content-header">
              <h2>${item.username}</h2>
              <p>Today</p>
            </div>
            <p>Say hi! 👋</p>
          </div>
            `;
      contact.appendChild(card);

      card.addEventListener("click", async () => {
        const res1 = await fetch(`http://localhost:3000/messages`);
        const data1 = await res1.json();
        active_receiver_id = item.id;

        document.querySelector(".header-image #badge").textContent =
          item.username.charAt(0).toUpperCase();
        document.querySelector(".header-container h2").textContent =
          item.username;

        const conversation = data1.filter(
          (m) =>
            (m.sender_id == savedId && m.receiver_id == item.id) ||
            (m.sender_id == item.id && m.receiver_id == savedId),
        );

        header.classList.remove("empty-container");
        footer.classList.remove("empty-container");

        renderMessages(conversation, savedId);
      });
    }
  });
}

function renderMessages(conversation, savedId) {
  const mainBody = document.querySelector(".main-body");
  mainBody.innerHTML = "";

  conversation.forEach((m) => {
    const div = document.createElement("div");
    div.classList.add(
      "message",
      m.sender_id == savedId ? "sender" : "receiver",
    );
    div.innerHTML = `<p>${m.text}</p>`;
    mainBody.appendChild(div);
  });

  mainBody.scrollTop = mainBody.scrollHeight;
}

document.querySelector(".send-btn").addEventListener("click", async () => {
  const textarea = document.querySelector("textarea");
  const text = textarea.value.trim();
  if (!text || !active_receiver_id) {
    return;
  }

  await fetch("http://localhost:3000/messages", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      sender_id: savedId,
      receiver_id: active_receiver_id,
      text,
      timestamp: new Date().toISOString(),
    }),
  });

  textarea.value = "";

  const res = await fetch("http://localhost:3000/messages");
  const all = await res.json();
  const conversation = all.filter(
    (m) =>
      (m.sender_id == savedId && m.receiver_id == active_receiver_id) ||
      (m.sender_id == active_receiver_id && m.receiver_id == savedId),
  );
  renderMessages(conversation, savedId);
});

setInterval(async () => {
  if (!active_receiver_id) {
    return;
  }

  const res = await fetch("http://localhost:3000/messages");
  const all = await res.json();

  const conversation = all.filter(
    (m) =>
      (m.sender_id == savedId && m.receiver_id == active_receiver_id) ||
      (m.sender_id == active_receiver_id && m.receiver_id == savedId),
  );

  renderMessages(conversation, savedId);
}, 2000);
