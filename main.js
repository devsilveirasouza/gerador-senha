
// recuperando o elemento do HTML
const inputEl = document.querySelector("#password");

// criando variavel no escopo global
let passwordLength = 16

// função que gera a senha
function generatePassword() {
    // conjunto de carcateres para criação da senha
    const chars =
        "abcdefghjklmnpqrstuvwyzABCDEFGHJKLMNPQRSTUVWXYZ123456789?!@&*()[]";
    // variavel para armazenar a senha
    let password = "";
    // gerador da senha
    for (let i = 0; i < passwordLength; i++) {
        const randomNumber = Math.floor(Math.random() * chars.length);
        password += chars.substring(randomNumber, randomNumber + 1);
    }

    // atribuindo valor gerado para o elemento
    inputEl.value = password;
    // console.log(password);
}

// função copy : API do navegador para copiar valores
function copy() {
    navigator.clipboard.writeText(inputEl.value)
}

// recuperando o elemento range
const passwordLengthEl = document.querySelector("#password-length")
// função para capturar o value do range
passwordLengthEl.addEventListener("input", function () {
    // variavel global
    passwordLength = passwordLengthEl.value
    // console.log(passwordLength)
    // chama a função sempre que o range é alterado
    generatePassword()
})

// *** requperando o elemento
// const copyButtonEl = document.querySelector("#copy")
// *** adiciona um evento ao botão
// copyButtonEl.addEventListener('click', copy) // função criada anteriormente

// Esta estrutura substitui a anterior //
document.querySelector("#copy-1").addEventListener("click", copy)
document.querySelector("#copy-2").addEventListener("click", copy)

// chamando a função que gera a senha
generatePassword();

