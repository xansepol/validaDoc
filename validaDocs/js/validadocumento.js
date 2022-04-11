function validar(){
	var documento = document.getElementById("documento").value;
	if(documento != "" && documento != null){
		let pattern = /^\d+$/;
		if(pattern.test(documento)){
			var tipo = 'CPF';
			if(document.getElementById("checkCNPJ").checked)
				tipo = 'CNPJ';
			if(tipo == 'CPF'){
				documento = formatted_string('00000000000', documento, 'l');
				if(documento.length == 11){
					if(calculoCPF(documento)){
						ExibeMensagem(tipo + " válido!", "success");
					}else{
						ExibeMensagem("Documento inválido!", "warning");	
					}
				}else
					ExibeMensagem("Documento inválido!", "warning");	
			}else if(tipo == 'CNPJ'){
				documento = formatted_string('00000000000000', documento, 'l');
				if(documento.length == 14){
					if(calculoCNPJ(documento)){
						ExibeMensagem(tipo + " válido!", "success");
					}else{
						ExibeMensagem("Documento inválido!", "warning");	
					}
				}else
					ExibeMensagem("Documento inválido!", "warning");
			}else
				ExibeMensagem("Tipo inválido!", "warning");
		}else{
			ExibeMensagem("Documento inválido!", "warning");
		}
	}else
		ExibeMensagem("Documento inválido!", "warning");
}

function calculoCPF(strCPF){
	var Soma;
    var Resto;
    Soma = 0;
  if (strCPF == "00000000000") return false;

  for (i=1; i<=9; i++) Soma = Soma + parseInt(strCPF.substring(i-1, i)) * (11 - i);
  Resto = (Soma * 10) % 11;

    if ((Resto == 10) || (Resto == 11))  Resto = 0;
    if (Resto != parseInt(strCPF.substring(9, 10)) ) return false;

  Soma = 0;
    for (i = 1; i <= 10; i++) Soma = Soma + parseInt(strCPF.substring(i-1, i)) * (12 - i);
    Resto = (Soma * 10) % 11;

    if ((Resto == 10) || (Resto == 11))  Resto = 0;
    if (Resto != parseInt(strCPF.substring(10, 11) ) ) return false;
    return true;

}

function calculoCNPJ(cnpj) {
 
    cnpj = cnpj.replace(/[^\d]+/g,'');
 
    if(cnpj == '') return false;
     
    if (cnpj.length != 14)
        return false;
 
    // Elimina CNPJs invalidos conhecidos
    if (cnpj == "00000000000000" || 
        cnpj == "11111111111111" || 
        cnpj == "22222222222222" || 
        cnpj == "33333333333333" || 
        cnpj == "44444444444444" || 
        cnpj == "55555555555555" || 
        cnpj == "66666666666666" || 
        cnpj == "77777777777777" || 
        cnpj == "88888888888888" || 
        cnpj == "99999999999999")
        return false;
         
    // Valida DVs
    tamanho = cnpj.length - 2
    numeros = cnpj.substring(0,tamanho);
    digitos = cnpj.substring(tamanho);
    soma = 0;
    pos = tamanho - 7;
    for (i = tamanho; i >= 1; i--) {
      soma += numeros.charAt(tamanho - i) * pos--;
      if (pos < 2)
            pos = 9;
    }
    resultado = soma % 11 < 2 ? 0 : 11 - soma % 11;
    if (resultado != digitos.charAt(0))
        return false;
         
    tamanho = tamanho + 1;
    numeros = cnpj.substring(0,tamanho);
    soma = 0;
    pos = tamanho - 7;
    for (i = tamanho; i >= 1; i--) {
      soma += numeros.charAt(tamanho - i) * pos--;
      if (pos < 2)
            pos = 9;
    }
    resultado = soma % 11 < 2 ? 0 : 11 - soma % 11;
    if (resultado != digitos.charAt(1))
          return false;
           
    return true;
    
}

function formatted_string(pad, user_str, pad_pos)
{
	if (typeof user_str === 'undefined') 
		return pad;
	if (pad_pos == 'l')
	{
		return (pad + user_str).slice(-pad.length);
	}
	else 
	{
		return (user_str + pad).substring(0, pad.length);
	}
}

function ExibeMensagem(texto, classe){
	var elemento = document.createElement("div");
	elemento.textContent = texto;
	elemento.setAttribute("class", "alert alert-" + classe);
	var mensagem = document.getElementById("mensagem");
	mensagem.style = "";
	mensagem.innerHTML = elemento.outerHTML;
}