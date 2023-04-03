/* ---------------------------------- texto --------------------------------- */
function validarTexto(texto) {
    let regex = /^[a-zA-Z]+$/;
    return regex.test(texto);
}

function normalizarTexto(texto) {
    return texto.normalize();
}

/* ---------------------------------- email --------------------------------- */
function validarEmail(email) {
    // ^[^\s@]+: This matches one or more characters that are not whitespace or '@' at the start of the string. The ^ symbol indicates the start of the string, and [^\s@]+ matches any character that is not whitespace or '@' one or more times. This ensures that there are no spaces at the beginning of the email address
    // @[^\s@]+: This matches the '@' character followed by one or more characters that are not whitespace or '@'. This ensures that there is exactly one '@' character in the email address.
    // \.[^\s@]+: This matches the period character '.' followed by one or more characters that are not whitespace or '@'. This ensures that there is exactly one period in the email address, after the '@' character.
    // [^\s@]+$: This matches one or more characters that are not whitespace or '@' at the end of the string. The $ symbol indicates the end of the string, and [^\s@]+ matches any character that is not whitespace or '@' one or more times. This ensures that there are no spaces at the end of the email address
    let regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
    
}

function normalizarEmail(email) {
    return email.normalize();
}

/* -------------------------------- password -------------------------------- */
function validarContrasenia(contrasenia) {
    // 8 caracteres, al menos una minuscula, una mayuscula y un dígito
    // /^: This indicates the start of the string.
    // (?=.*[a-z]): This is a positive lookahead assertion that checks if the string contains at least one lowercase letter ([a-z]).
    // (?=.*[A-Z]): This is another positive lookahead assertion that checks if the string contains at least one uppercase letter ([A-Z])
    // (?=.*\d): This is a third positive lookahead assertion that checks if the string contains at least one digit (\d).    
    // [a-zA-Z\d]{8,}: This is a character class that matches any combination of uppercase and lowercase letters ([a-zA-Z]) and digits (\d) that are at least 8 characters long ({8,}).
    // $: End of the string anchor.
    const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{5,}$/;
    return regex.test(contrasenia);
}

function compararContrasenias(contra1, contra2) {
    return (contra1 === contra2);
}

