$("#signupForm").submit(async function (e) {
  e.preventDefault();
  const username = $("#username").val();
  const password = $("#password").val();
  const firstname = $("#firstname").val();
  const lastname = $("#lastname").val();

  const response = await fetch("/api/auth/signup", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ username, password, firstname, lastname }),
  });

  const data = await response.json();
  if (response.ok) {
    alert("Signup successful! Redirecting to login...");
    window.location.href = "login.html";
  } else {
    alert(data.message || "Signup failed");
  }
});

$("#loginForm").submit(async function (e) {
  e.preventDefault();
  const username = $("#username").val();
  const password = $("#password").val();

  const response = await fetch("/api/auth/login", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ username, password }),
  });

  const data = await response.json();
  if (response.ok) {
    localStorage.setItem("username", data.username);
    window.location.href = "chat.html";  
  } else {
    alert(data.message || "Login failed"); 
  }
});