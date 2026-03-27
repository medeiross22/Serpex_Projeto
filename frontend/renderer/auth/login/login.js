function irParaCadastro() {
  window.location.href = "../cadastro/cadastro.html";
}

async function fazerLogin() {
  const email = document.getElementById("email").value;
  const senha = document.getElementById("senha").value;

  try {
    const response = await fetch("http://localhost:3000/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ email, senha })
    });

    const data = await response.json();

    if (response.ok) {

      //  SALVA USUÁRIO
      localStorage.setItem("usuario", JSON.stringify(data.usuario));

      // REDIRECIONA
      window.location.href = "../../app/home/home.html";

    } else {
      document.getElementById("mensagem").innerText = data.erro;
    }

  } catch (error) {
    document.getElementById("mensagem").innerText = "Erro ao conectar com servidor";
  }
}