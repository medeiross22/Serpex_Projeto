async function cadastrar() {
  const nome = document.getElementById("nome").value;
  const email = document.getElementById("email").value;
  const senha = document.getElementById("senha").value;

  try {
    const response = await fetch("http://localhost:3000/usuario", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ nome, email, senha })
    });

const data = await response.json();

if (response.ok) {
  alert("Cadastro realizado com sucesso!");
  window.location.href = "../login/login.html";
} else {
  alert(data.erro);
}

  } catch (error) {
    alert("Erro ao conectar com servidor");
  }
}

function voltarLogin() {
  window.location.href = "../login/login.html";
}