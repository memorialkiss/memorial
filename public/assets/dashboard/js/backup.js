
//decodifica entidades html
var entidadesHTML = () => {};
entidadesHTML.map={"'":"&apos;","<":"&lt;",">":"&gt;"," ":"&nbsp;","¡":"&iexcl;","¢":"&cent;","£":"&pound;","¤":"&curren;","¥":"&yen;","¦":"&brvbar;","§":"&sect;","¨":"&uml;","©":"&copy;","ª":"&ordf;","«":"&laquo;","¬":"&not;","®":"&reg;","¯":"&macr;","°":"&deg;","±":"&plusmn;","²":"&sup2;","³":"&sup3;","´":"&acute;","µ":"&micro;","¶":"&para;","·":"&middot;","¸":"&cedil;","¹":"&sup1;","º":"&ordm;","»":"&raquo;","¼":"&frac14;","½":"&frac12;","¾":"&frac34;","¿":"&iquest;","À":"&Agrave;","Á":"&Aacute;","Â":"&Acirc;","Ã":"&Atilde;","Ä":"&Auml;","Å":"&Aring;","Æ":"&AElig;","Ç":"&Ccedil;","È":"&Egrave;","É":"&Eacute;","Ê":"&Ecirc;","Ë":"&Euml;","Ì":"&Igrave;","Í":"&Iacute;","Î":"&Icirc;","Ï":"&Iuml;","Ð":"&ETH;","Ñ":"&Ntilde;","Ò":"&Ograve;","Ó":"&Oacute;","Ô":"&Ocirc;","Õ":"&Otilde;","Ö":"&Ouml;","×":"&times;","Ø":"&Oslash;","Ù":"&Ugrave;","Ú":"&Uacute;","Û":"&Ucirc;","Ü":"&Uuml;","Ý":"&Yacute;","Þ":"&THORN;","ß":"&szlig;","à":"&agrave;","á":"&aacute;","â":"&acirc;","ã":"&atilde;","ä":"&auml;","å":"&aring;","æ":"&aelig;","ç":"&ccedil;","è":"&egrave;","é":"&eacute;","ê":"&ecirc;","ë":"&euml;","ì":"&igrave;","í":"&iacute;","î":"&icirc;","ï":"&iuml;","ð":"&eth;","ñ":"&ntilde;","ò":"&ograve;","ó":"&oacute;","ô":"&ocirc;","õ":"&otilde;","ö":"&ouml;","÷":"&divide;","ø":"&oslash;","ù":"&ugrave;","ú":"&uacute;","û":"&ucirc;","ü":"&uuml;","ý":"&yacute;","þ":"&thorn;","ÿ":"&yuml;","Œ":"&OElig;","œ":"&oelig;","Š":"&Scaron;","š":"&scaron;","Ÿ":"&Yuml;","ƒ":"&fnof;","ˆ":"&circ;","˜":"&tilde;","Α":"&Alpha;","Β":"&Beta;","Γ":"&Gamma;","Δ":"&Delta;","Ε":"&Epsilon;","Ζ":"&Zeta;","Η":"&Eta;","Θ":"&Theta;","Ι":"&Iota;","Κ":"&Kappa;","Λ":"&Lambda;","Μ":"&Mu;","Ν":"&Nu;","Ξ":"&Xi;","Ο":"&Omicron;","Π":"&Pi;","Ρ":"&Rho;","Σ":"&Sigma;","Τ":"&Tau;","Υ":"&Upsilon;","Φ":"&Phi;","Χ":"&Chi;","Ψ":"&Psi;","Ω":"&Omega;","α":"&alpha;","β":"&beta;","γ":"&gamma;","δ":"&delta;","ε":"&epsilon;","ζ":"&zeta;","η":"&eta;","θ":"&theta;","ι":"&iota;","κ":"&kappa;","λ":"&lambda;","μ":"&mu;","ν":"&nu;","ξ":"&xi;","ο":"&omicron;","π":"&pi;","ρ":"&rho;","ς":"&sigmaf;","σ":"&sigma;","τ":"&tau;","υ":"&upsilon;","φ":"&phi;","χ":"&chi;","ψ":"&psi;","ω":"&omega;","ϑ":"&thetasym;","ϒ":"&Upsih;","ϖ":"&piv;","–":"&ndash;","—":"&mdash;","‘":"&lsquo;","’":"&rsquo;","‚":"&sbquo;","“":"&ldquo;","”":"&rdquo;","„":"&bdquo;","†":"&dagger;","‡":"&Dagger;","•":"&bull;","…":"&hellip;","‰":"&permil;","′":"&prime;","″":"&Prime;","‹":"&lsaquo;","›":"&rsaquo;","‾":"&oline;","⁄":"&frasl;","€":"&euro;","ℑ":"&image;","℘":"&weierp;","ℜ":"&real;","™":"&trade;","ℵ":"&alefsym;","←":"&larr;","↑":"&uarr;","→":"&rarr;","↓":"&darr;","↔":"&harr;","↵":"&crarr;","⇐":"&lArr;","⇑":"&UArr;","⇒":"&rArr;","⇓":"&dArr;","⇔":"&hArr;","∀":"&forall;","∂":"&part;","∃":"&exist;","∅":"&empty;","∇":"&nabla;","∈":"&isin;","∉":"&notin;","∋":"&ni;","∏":"&prod;","∑":"&sum;","−":"&minus;","∗":"&lowast;","√":"&radic;","∝":"&prop;","∞":"&infin;","∠":"&ang;","∧":"&and;","∨":"&or;","∩":"&cap;","∪":"&cup;","∫":"&int;","∴":"&there4;","∼":"&sim;","≅":"&cong;","≈":"&asymp;","≠":"&ne;","≡":"&equiv;","≤":"&le;","≥":"&ge;","⊂":"&sub;","⊃":"&sup;","⊄":"&nsub;","⊆":"&sube;","⊇":"&supe;","⊕":"&oplus;","⊗":"&otimes;","⊥":"&perp;","⋅":"&sdot;","⌈":"&lceil;","⌉":"&rceil;","⌊":"&lfloor;","⌋":"&rfloor;","⟨":"&lang;","⟩":"&rang;","◊":"&loz;","♠":"&spades;","♣":"&clubs;","♥":"&hearts;","♦":"&diams;", "": "\n"};
entidadesHTML.decodificar = function(string) {
    var entityMap = entidadesHTML.map;
    for (var key in entityMap) {
        var entity = entityMap[key];
        var regex = new RegExp(entity, 'g');
        string = string.replace(regex, key);
    }
    string = string.replace(/&quot;/g, '"');
    string = string.replace(/&amp;/g, '&');
    return string;
}

//tira tags html
var removerTagHTML = (string) => {return string.replace(/<.*?>/g, '');}

//seletor de download
$(document).ready(function (){
    $('#backupMenu').change(function () {
        $('#backupBtn').css('display', 'inline');
    });

    $('#backupBtn').click(function () {
        let escolha = $("#backupMenu").val();
        let nomeArquivo = '';
        $.ajax({
            url: "/download",
            method: "POST",
            dataType: 'json',
            data: {
                escolha: escolha
            },
            success: function (data) {
                if(escolha == 1){
                    data.forEach(function(vitima){
                        vitima['descricao'] = removerTagHTML(vitima['descricao']);
                        vitima['descricao'] = entidadesHTML.decodificar(vitima['descricao']);
                        vitima['sexo'] = vitima['sexo'] == '0' ? 'M' : 'F';
                        vitima['idade'] = vitima['idade'] == null ? 'nulo' : vitima['idade'];
                        vitima['cidade'] = vitima['cidade'] == null ? 'nulo' : vitima['cidade'];
                        vitima['legenda'] = vitima['legenda'] == null ? 'nulo' : vitima['legenda'];
                    });
                    nomeArquivo = "kiss_vitimas_";
                } else if (escolha == 2) {
                    data.forEach(function(recordacao){
                        recordacao['recordacao'] = removerTagHTML(recordacao['recordacao']);
                        recordacao['recordacao'] = entidadesHTML.decodificar(recordacao['recordacao']);
                        tmpData = recordacao['dataRecordacao'].split("-");
                        hora = tmpData[2].split(" ")[1].substring(0,8);
                        if(hora == '04:44:44'){
                            recordacao['dataRecordacao'] = tmpData[0] + "-" + tmpData[1] + "-" + tmpData[2].split(" ")[0];
                        }
                    });
                    console.log(data);
                    nomeArquivo = "kiss_recordacoes_";
                } else if (escolha == 3) { 
                    data.forEach(function(informacao){
                        informacao['descricao'] = removerTagHTML(informacao['descricao']);
                        informacao['descricao'] = entidadesHTML.decodificar(informacao['descricao']);
                        informacao['arquivado'] = informacao['arquivado'] == '1' ? 'Sim' : 'Não';
                    });
                    nomeArquivo = "kiss_informacoes_";
                } else {
                    data.forEach(function(documento){
                        documento['descricao'] = removerTagHTML(documento['descricao']);
                        documento['descricao'] = entidadesHTML.decodificar(documento['descricao']);
                        documento['incendioDesdobramento'] = documento['incendioDesdobramento'] == '1' ? 'Sim' : 'Não';
                        documento['relativoVitima'] = documento['relativoVitima'] == '1' ? 'Sim' : 'Não';
                        documento['nomeDaVitima'] = documento['nomeDaVitima'] == null ? 'nulo' : documento['nomeDaVitima'];
                    });
                    nomeArquivo = "kiss_documentos_";
                }

                //cria o arquivo para download
                let hoje = new Date();
                let dia = hoje.getDate() < 10 ? ('0' + hoje.getDate()) : (hoje.getDate());
                let mes = hoje.getMonth() < 10 ? ('0' + hoje.getMonth()) : (hoje.getMonth());
                let ano = hoje.getFullYear();
                nomeArquivo += ano + mes + dia + ".xlsx";
                alasql('SELECT * INTO XLSX("'+ nomeArquivo +'", {headers: true}) FROM ?', [data]);
            }
        });
    });
});