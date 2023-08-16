
// recuperando o elemento do HTML
const inputEl = document.querySelector("#password")
// recuperando os elementos checkbox
const upperCaseCheckEl = document.querySelector("#uppercase-check")
const numberCheckEl = document.querySelector("#number-check")
const symbolCheckEl = document.querySelector("#symbol-check")
const securityIndicatorBarEl = document.querySelector("#security-indicator-bar")
// criando variavel no escopo global
let passwordLength = 16
// função que gera a senha
function generatePassword() {
    // conjunto de carcateres para criação da senha
    let chars = "abcdefghjklmnpqrstuvwyz"
    const upperCaseChars = "ABCDEFGHJKLMNPQRSTUVWXYZ"
    const numberChars = "123456789"
    const symbolChars = "?!@&*()[]"
    // VERIFICA O CHECKBOX PARA APLICAR COMO REGRA
    if (upperCaseCheckEl.checked) {
        chars += upperCaseChars
    }
    if (numberCheckEl.checked) {
        chars += numberChars
    } if (symbolCheckEl.checked) {
        chars += symbolChars
    }
    // variavel para armazenar a senha
    let password = ""
    // gerador da senha
    for (let i = 0; i < passwordLength; i++) {
        const randomNumber = Math.floor(Math.random() * chars.length)
        password += chars.substring(randomNumber, randomNumber + 1)
    }
    // atribuindo valor gerado para o elemento
    inputEl.value = password
    // chama a função de verificação de quaidade
    calculateQuality()
    calculateFontSize()
}
// function calculate...Ajustando a barra de segurança
function calculateQuality() {
    // 25% -> critico => 100% -> safe
    // Regra para o calculo de criticidade da segurança
    // T*0.25 + M*0.15 + N*0.25 + S*0.35 = 100
    const percent = Math.round((passwordLength / 64) * 25 +
        (upperCaseCheckEl.checked ? 15 : 0) +
        (numberCheckEl.checked ? 25 : 0) +
        (symbolCheckEl.checked ? 35 : 0))
    // atribuindo valor percentual a barra
    securityIndicatorBarEl.style.width = `${percent}%`

    if (percent > 69) {
        // safe
        securityIndicatorBarEl.classList.remove('critical')
        securityIndicatorBarEl.classList.remove('warning')
        securityIndicatorBarEl.classList.add('safe')
    } else if (percent > 50) {
        // warning
        securityIndicatorBarEl.classList.remove('safe')
        securityIndicatorBarEl.classList.remove('critical')
        securityIndicatorBarEl.classList.add('warning')
    } else {
        // critical
        securityIndicatorBarEl.classList.remove('warning')
        securityIndicatorBarEl.classList.remove('critical')
        securityIndicatorBarEl.classList.add('critical')
    }
    // 
    if (percent >= 100) {
        securityIndicatorBarEl.classList.add("completed")
    } else {
        securityIndicatorBarEl.classList.remove("completed");
    }
}
// --- CALCULAR O TAMANHO DA FONTE
function calculateFontSize() {
    if (passwordLength > 45) {
        inputEl.classList.remove('font-sm')
        inputEl.classList.remove('font-xs')
        inputEl.classList.add('font-xxs')
    } else if (passwordLength > 32) {
        inputEl.classList.remove('font-sm')
        inputEl.classList.remove('font-xxs')
        inputEl.classList.add('font-xs')
    } else if (passwordLength > 22) {
        inputEl.classList.remove('font-xs')
        inputEl.classList.remove('font-xxs')
        inputEl.classList.add('font-sm')
    } else {
        inputEl.classList.remove('font-sm')
        inputEl.classList.remove('font-xs')
        inputEl.classList.remove('font-sm')
    }
}
// --- função copy : API do navegador para copiar valores
function copy() {
    navigator.clipboard.writeText(inputEl.value)
}
// recuperando o elemento range
const passwordLengthEl = document.querySelector("#password-length")
// --- Função para capturar o value do range --- //
passwordLengthEl.addEventListener("input", function () {
    // variavel global (span: password-length-text)
    passwordLength = passwordLengthEl.value
    // pegar o valor (quantidade de caracteres) do password gerado e atribui ao span
    document.querySelector("#password-length-text").innerHTML = passwordLength
    // chama a função sempre que o range é alterado
    generatePassword()
})
// CHAMA A FUNÇÃO GENERATE AO CLICAR NO CHECKBOX
upperCaseCheckEl.addEventListener("click", generatePassword)
numberCheckEl.addEventListener("click", generatePassword)
symbolCheckEl.addEventListener("click", generatePassword)
// --- MESMA FUNÇÃO COM CHAMADAS DIFERENTES --- //
// *** requperando o elemento
// const copyButtonEl = document.querySelector("#copy")
// *** adiciona um evento ao botão
// copyButtonEl.addEventListener('click', copy) // função criada anteriormente
// --- Esta estrutura substitui a anterior --- //
document.querySelector("#copy-1").addEventListener("click", copy)
document.querySelector("#copy-2").addEventListener("click", copy)
// --- Regerar o password --- //
document.querySelector("#renew").addEventListener("click", generatePassword)
// --- chamando a função que gera a senha
generatePassword();