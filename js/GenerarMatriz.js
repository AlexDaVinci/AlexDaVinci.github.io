Restriccion = document.getElementById('restriccion')
Desicion = document.getElementById('decision')
//Tabla = document.querySelector("table")
BotonGenerarMatriz = document.getElementById('generarMatriz')
container = document.querySelector("#fase2")



document.getElementById("cambiar").addEventListener("click", function() {
    document.body.style.backgroundImage = "url(./assets/img/bg-callout.jpg)";
    document.getElementById("home").style.display = "none";
    document.getElementById("fase2").style.display = "block";
});

function generarMatriz() {
    let restricciones = parseInt(Restriccion.value)
    let desiciones = parseInt(Desicion.value)
    const Tabla = document.createElement("table")
    const botonGenerar=document.createElement("button")
    const FuncionObejtivo = document.createElement("table")
    const tr = document.createElement("tr")
    label1 = document.createElement("h3");
    label1.innerHTML = "Funcion Objetivo";
    label1.className = "h3";
    label2 = document.createElement("h3");
    label2.innerHTML = "Restricciones";
    label2.className = "h3";
    botonGenerar.setAttribute("id", "calcular")
    botonGenerar.setAttribute("onclick", "Resolver()")
    botonGenerar.setAttribute("type", "button")
    botonGenerar.setAttribute("class", "btn btn-primary align-items-center col-md-6 textcool")
    botonGenerar.innerHTML = "calcular"

    container.setAttribute("class", " justify-content-start align-items-center container px-4 px-lg-5 text-center col-md-6 textcool")
    FuncionObejtivo.setAttribute("class", "table position:relative z-index:1")
    container.appendChild(label1)
    container.appendChild(FuncionObejtivo)
    document.body.appendChild(container)
    FuncionObejtivo.appendChild(tr)

    Tabla.setAttribute("class", "table position:absolute z-index:2")
    container.appendChild(label2)
    container.appendChild(Tabla)
    document.body.appendChild(container)
    FuncionObejtivo.appendChild(tr)

    container.appendChild(botonGenerar)

    for (let i = 0; i < desiciones; i++) {
        const span = document.createElement("span")
        const input = document.createElement("input")
        const td = document.createElement("td")

        span.setAttribute("class", "input-group-text")
        span.innerHTML = `X${i + 1}`
        input.setAttribute("type", "number")
        input.setAttribute("name", `X${i}`)
        input.setAttribute("id", `Costo${i}`)
        input.setAttribute("class", "form-control")
        input.setAttribute("value", "0")

        td.appendChild(span)
        td.appendChild(input)
        tr.appendChild(td)
    }

    for (let i = 0; i < restricciones; i++) {
        const tr = document.createElement("tr")
        const select=document.createElement("select")
        const options = [">=", "<=", "="];
        Tabla.appendChild(tr)
        for (var j = 0; j < desiciones; j++) {
            const td = document.createElement("td")
            const span = document.createElement("span")
            const input = document.createElement("input")
             
            span.setAttribute("class", "input-group-text")
            span.innerHTML = `X${j + 1}`
            input.setAttribute("type", "number")
            input.setAttribute("name", `X${i}` + j)
            input.setAttribute("id", `Posicion${i}` + j)
            input.setAttribute("class", "form-control")
            // input.setAttribute("min", "0")
            input.setAttribute("value", "0")

            td.appendChild(span)
            td.appendChild(input)
            tr.appendChild(td)
        }
        const td = document.createElement("td")
        const td2 = document.createElement("td")
        const span = document.createElement("span")
        const input = document.createElement("input")

        select.setAttribute("id", `select${i}`);
        select.setAttribute("name", `select${i}`);
        select.setAttribute("class", "width: 50px");
        for (let i = 0; i < options.length; i++) {
            const opt = document.createElement("option");
            opt.setAttribute("value", i);
            opt.setAttribute("id", `d${i}`);
            opt.innerHTML = options[i];
            select.appendChild(opt);
        }
        td.appendChild(select)
        span.setAttribute("class", "input-group-text w-55 p-2")
        span.innerHTML = `Restricción ${i + 1}`
        input.setAttribute("type", "number")
        input.setAttribute("name", `R${i}`)
        input.setAttribute("id", `Posicion${i}` + j)
        input.setAttribute("class", "form-control w-55 p-2")
        input.setAttribute("value", "0")

        td2.appendChild(span)
        td2.appendChild(input)
        tr.appendChild(td)
        tr.appendChild(td2)
    }
}

function Resolver(){

    // Obtiene el contenedor donde se agregará la tabla
    let container = document.getElementById("tablas");
    container.setAttribute("class", "justify-content-start align-items-center container px-4 px-lg-5 text-center col-md-6 textcool")
    
    // Limpia el contenido actual del contenedor
    document.getElementById("fase2").style.display = "none";
    document.getElementById("tablas").style.display = "block";

    let restricciones = parseInt(Restriccion.value)
    let desiciones = parseInt(Desicion.value)

    label1 = document.createElement("h3");
    label1.innerHTML = "Fase 1";
    label1.className = "h3";
    label2 = document.createElement("h3");
    label2.innerHTML = "Fase 2";
    label2.className = "h3";
    label3 = document.createElement("h3");
    label3.innerHTML = "No es optimo para fase 2";
    label3.className = "h3";
    label4 = document.createElement("h3");
    label4.innerHTML = "Solucion Optima";
    label4.className = "h3";

    var matrizMinimizar = new Array()
    var columnTitles = new Array()
    var rowTitles = new Array()
    var table= new Array()
    var caption= new Array()
    var headerRow= new Array()
    var emptyCell= new Array()
    var row= new Array()
    var titleCell= new Array()
    var dataCell= new Array()
    var headerCell= new Array()
    

    var conI=0
    var conS=0
    var conE=0
    var conA=0
    var contador=0
    var poneX=0
    var poneE=0
    var poneS=0
    var poneA=0
    var cpivote=0
    var fsaliente=1
    var conT=0


    // contar cuantas variables de horgura, de exceso y artificiales hay
    for(var i = 0; i < restricciones; i++){
        desigualdad = document.getElementById(`select${i}`) 
        let desigualdadvalor = parseInt(desigualdad.value)
        if(desigualdadvalor == 0){
            conE++
            conA++
        }else if(desigualdadvalor==1){
            conS++
        }else{
            conA++
        }
    }
    contador=conA+conE+conS
    container.appendChild(label1)
    //inicializar la primera matriz 
    for(var i = 0; i <= restricciones; i++){
        matrizMinimizar[i] = new Array();
        for(var j = 0; j <= desiciones+contador; j++){
            if (i == 0) {
                if (j >= (desiciones+conE+conS) && j < ((desiciones+contador))) {
                    matrizMinimizar[i][j] = -1
                } else {
                    matrizMinimizar[i][j] = 0
                }
            }else if(j<(desiciones)){
                valores = document.getElementById(`Posicion${i - 1}` + j)
                let valor = parseFloat(valores.value)
                matrizMinimizar[i][j] = valor
            }else if(j==(desiciones+contador)){
                valores = document.getElementById(`Posicion${i - 1}` + (desiciones))
                let valor = parseFloat(valores.value)
                matrizMinimizar[i][j] = valor
            }else{
                matrizMinimizar[i][j] = 0
            }     
        }
    }
    poneE=0
    poneS=0
    poneA=0
    for(var i = 0; i<restricciones; i++){   
   
        desigualdad = document.getElementById(`select${i}`) 
        let desigualdadvalor = parseInt(desigualdad.value)
        if(desigualdadvalor == 0){
            poneE++
            poneA++
            matrizMinimizar[i+1][(desiciones-1)+(poneE)] = -1
            matrizMinimizar[i+1][(desiciones-1)+(conE+conS+poneA)] = 1         
        }else if(desigualdadvalor==1){
            poneS++
            matrizMinimizar[i+1][(desiciones-1)+(conE+poneS)] = 1              
        }else{
            poneA++
            matrizMinimizar[i+1][(desiciones-1)+(conE+conS+poneA)] = 1 
        }
    }
    console.log("Matriz inicializada")
    for (let elemento in matrizMinimizar) {
        console.log(elemento + " = " + matrizMinimizar[elemento])
    }



    // Crea la tabla
    
    conT++
    table[conT] = document.createElement("table");
    table[conT].classList.add("table", "table-bordered", "table-hover", "text-center", "mb-3");
    

    // Define los títulos de las columnas

    for(var i = 0; i <= desiciones+contador; i++){
        columnTitles[i] = new Array();
    }
    poneE=0
    poneS=0
    poneA=0
    poneX=0
    for(var i = 0; i <= desiciones+contador; i++){
        if(i<desiciones){
            columnTitles[i] = `X${i+1}`
        }else if(i>=desiciones && i<desiciones+conE){
            poneE++
            columnTitles[i] = `E${poneE}`
        }
        else if(i>=desiciones+conE && i<desiciones+conE+conS){
            poneS++
            columnTitles[i] = `S${poneS}`
        }else if(i>=desiciones+conS+conE && i<desiciones+conS+conE+conA){
            poneA++
            columnTitles[i] = `A${poneA}`
        }else{
            columnTitles[i] = "XB"
        }   
    }

    // Define los títulos de las filas
    for(var i = 0; i <= restricciones; i++){
        rowTitles[i] = new Array();
    }
    poneE=0
    poneS=0
    poneA=0
    poneX=0
    for(var i = 0; i <= restricciones; i++){
        if(i==0){
            rowTitles[i] = `Z`
        }else{
            desigualdad = document.getElementById(`select${i-1}`) 
            let desigualdadvalor = parseInt(desigualdad.value)
            if(desigualdadvalor == 0){
                poneA++
                rowTitles[i] = `A${poneA}`
            }else if(desigualdadvalor==1){
                poneS++
                rowTitles[i] = `S${poneS}`
            }else{
                poneA++
                rowTitles[i] = `A${poneA}`
            }
        }  
    }

    // Crea el título de la tabla
    caption[conT] = document.createElement("caption");
    caption[conT].innerHTML = "Tabla Inicializada";
    table[conT].appendChild(caption[conT]);

    // Crea la fila de encabezados de columna
    headerRow[conT] = document.createElement("tr");
    emptyCell[conT] = document.createElement("th");
    emptyCell[conT].innerHTML = "";
    headerRow[conT].appendChild(emptyCell[conT]);
    for (let header of columnTitles) {
    headerCell[conT] = document.createElement("th");
    headerCell[conT].innerHTML = header;
    headerRow[conT].appendChild(headerCell[conT]);
    }
    table[conT].appendChild(headerRow[conT]);

    // Crea las filas de datos
    for (let i = 0; i < matrizMinimizar.length; i++) {
    row[conT] = document.createElement("tr");
    titleCell[conT] = document.createElement("th");
    titleCell[conT].innerHTML = rowTitles[i];
    row[conT].appendChild(titleCell[conT]);
    for (let cell of    matrizMinimizar[i]) {
        dataCell[conT] = document.createElement("td");
        dataCell[conT].innerHTML = cell;
        row[conT].appendChild(dataCell[conT]);
    }
    table[conT].appendChild(row[conT]);
    }

    // Agrega la tabla al contenedor
    container.appendChild(table[conT]);
        




    //empizan las operaciones

    //Primera Fase
    console.log("Primera Fase")
    for (var i = 1; i <= restricciones; i++) {
        for (var j = desiciones+conE+conS; j < desiciones+contador; j++) {
            console.log(matrizMinimizar[i][j])
            if(matrizMinimizar[i][j] == 1){
                for (var h = 0; h <= desiciones+contador; h++) {
                    matrizMinimizar[0][h]= matrizMinimizar[i][h]+matrizMinimizar[0][h]
                }               
            }
        }
    }
    console.log("iteracion 1 volver 0 los -1")
    for (let elemento in matrizMinimizar) {
        console.log(elemento + " = " + matrizMinimizar[elemento])
    }


    // Crea la tabla
    conI++
    conT++
    table[conT] = document.createElement("table");
    table[conT].classList.add("table", "table-bordered", "table-hover", "text-center", "mb-3");

    // Crea el título de la tabla
    caption[conT] = document.createElement("caption");
    caption[conT].innerHTML = `Iteracion ${conI}`;
    table[conT].appendChild(caption[conT]);

    // Crea la fila de encabezados de columna
    headerRow[conT] = document.createElement("tr");
    emptyCell[conT] = document.createElement("th");
    emptyCell[conT].innerHTML = "";
    headerRow[conT].appendChild(emptyCell[conT]);
    for (let header of columnTitles) {
    headerCell[conT] = document.createElement("th");
    headerCell[conT].innerHTML = header;
    headerRow[conT].appendChild(headerCell[conT]);
    }
    table[conT].appendChild(headerRow[conT]);

    // Crea las filas de datos
    for (let i = 0; i < matrizMinimizar.length; i++) {
    row[conT] = document.createElement("tr");
    titleCell[conT] = document.createElement("th");
    titleCell[conT].innerHTML = rowTitles[i];
    row[conT].appendChild(titleCell[conT]);
    for (let cell of    matrizMinimizar[i]) {
        dataCell[conT] = document.createElement("td");
        dataCell[conT].innerHTML = cell;
        row[conT].appendChild(dataCell[conT]);
    }
    table[conT].appendChild(row[conT]);
    }

    // Agrega la tabla al contenedor
    container.appendChild(table[conT]);

    console.log("determinar columna pivote y fila saliente")
    while(true){
        cpivote=0
        for (var j = 0 ; j < desiciones+contador; j++) {
            if(matrizMinimizar[0][j]>0){
                for (var h = j ; h < desiciones+contador; h++) {
                    if(matrizMinimizar[0][h]>matrizMinimizar[0][j] && matrizMinimizar[0][h]>cpivote){
                        cpivote=h
                    }else{
                        cpivote=j
                    }
                }             
            }
        }
        console.log("cpivote")
        console.log(cpivote)
        if(cpivote==0){
            break;
        }else{
            fsaliente=1
            for (var i = 1; i <= restricciones; i++) {
                if(matrizMinimizar[i][cpivote-1]!=0){
                    console.log("division")
                    let division = matrizMinimizar[i][(desiciones+contador)] / matrizMinimizar[i][cpivote-1]
                    console.log(division)
                    if (i == 1) {
                        var menor = division 
                    }
                    if (i > 1 && division < menor) {
                        menor = division
                        fsaliente= i
                    }
                }
            }
            console.log(fsaliente)
            var divisor = matrizMinimizar[fsaliente][cpivote-1]
    
            for (var j = 0; j <= (desiciones+contador); j++) {
                matrizMinimizar[fsaliente][j] = matrizMinimizar[fsaliente][j] / divisor
            }
    
            for (var i = 0; i <= restricciones; i++) {
                var eliminar = matrizMinimizar[i][cpivote-1]
                for (var j = 0; j <= (desiciones+contador); j++) {
                    if (i != fsaliente) {
                        matrizMinimizar[i][j] = matrizMinimizar[i][j] - eliminar * matrizMinimizar[fsaliente][j]
                    }
                }
            }
            console.log("iteracion")
            for (let elemento in matrizMinimizar) {
                console.log(elemento + " = " + matrizMinimizar[elemento])
            }
 
            // Crea la tabla
            conI++
            conT++
            table[conT] = document.createElement("table");
            table[conT].classList.add("table", "table-bordered", "table-hover", "text-center", "mb-3");
            

            // Define los títulos de las filas

            for(var i = 0; i <= desiciones+contador; i++){
                if(i==cpivote-1){
                    rowTitles[fsaliente]=columnTitles[i]
                }
            }

            // Crea el título de la tabla
            caption[conT] = document.createElement("caption");
            caption[conT].innerHTML = `Iteracion ${conI}`;
            table[conT].appendChild(caption[conT]);

            // Crea la fila de encabezados de columna
            headerRow[conT] = document.createElement("tr");
            emptyCell[conT] = document.createElement("th");
            emptyCell[conT].innerHTML = "";
            headerRow[conT].appendChild(emptyCell[conT]);
            for (let header of columnTitles) {
            headerCell[conT] = document.createElement("th");
            headerCell[conT].innerHTML = header;
            headerRow[conT].appendChild(headerCell[conT]);
            }
            table[conT].appendChild(headerRow[conT]);

            // Crea las filas de datos
            for (let i = 0; i < matrizMinimizar.length; i++) {
            row[conT] = document.createElement("tr");
            titleCell[conT] = document.createElement("th");
            titleCell[conT].innerHTML = rowTitles[i];
            row[conT].appendChild(titleCell[conT]);
            for (let cell of    matrizMinimizar[i]) {
                dataCell[conT] = document.createElement("td");
                dataCell[conT].innerHTML = cell;
                row[conT].appendChild(dataCell[conT]);
            }
            table[conT].appendChild(row[conT]);
            }

            // Agrega la tabla al contenedor
            container.appendChild(table[conT]);
    
        }
    }
    if(matrizMinimizar[0][desiciones+contador]==0){
        console.log("optimo para fase 2")
        container.appendChild(label2)
        var matrizMinimizar2Fase = new Array()

        for (var i = 0; i <= restricciones; i++) {
            matrizMinimizar2Fase[i] = new Array()
            for (var j = 0; j <= (desiciones + conE +conS); j++) {

                if (i == 0 && j < desiciones) {
                    valores = document.getElementById(`Costo${j}`)
                    let valor = parseInt(valores.value)
                    matrizMinimizar2Fase[i][j] = valor * (-1)
                } else if (i == 0 && j <= (desiciones + conE + conS)) {
                    matrizMinimizar2Fase[i][j] = 0
                }

                if (i > 0 && j < (desiciones + conE + conS)) {
                    matrizMinimizar2Fase[i][j] = matrizMinimizar[i][j]
                } else if (i > 0 && j == (desiciones + conE + conS)) {
                    matrizMinimizar2Fase[i][j] = matrizMinimizar[i][j + (conA)]
                }
            }
        }

        for (let elemento in matrizMinimizar2Fase) {
            console.log(elemento + " = " + matrizMinimizar2Fase[elemento])
        }

        
            // Crea la tabla
            conI=0
            conT++
            table[conT] = document.createElement("table");
            table[conT].classList.add("table", "table-bordered", "table-hover", "text-center", "mb-3");
            

            // Define los títulos de las columnas


            for(var i = 0; i <= desiciones+contador; i++){
                if(i>=desiciones+conS+conE && i<desiciones+conS+conE+conA){
                    poneA++
                    columnTitles[i] = "XB"
                }
                if(i==desiciones+contador){
                    columnTitles[i] = ""
                } 
            }

            // Crea el título de la tabla
            caption[conT] = document.createElement("caption");
            caption[conT].innerHTML = `Eliminacion Variables Artificiales`;
            table[conT].appendChild(caption[conT]);

            // Crea la fila de encabezados de columna
            headerRow[conT] = document.createElement("tr");
            emptyCell[conT] = document.createElement("th");
            emptyCell[conT].innerHTML = "";
            headerRow[conT].appendChild(emptyCell[conT]);
            for (let header of columnTitles) {
            headerCell[conT] = document.createElement("th");
            headerCell[conT].innerHTML = header;
            headerRow[conT].appendChild(headerCell[conT]);
            }
            table[conT].appendChild(headerRow[conT]);

            // Crea las filas de datos
            for (let i = 0; i < matrizMinimizar.length; i++) {
            row[conT] = document.createElement("tr");
            titleCell[conT] = document.createElement("th");
            titleCell[conT].innerHTML = rowTitles[i];
            row[conT].appendChild(titleCell[conT]);
            for (let cell of    matrizMinimizar2Fase[i]) {
                dataCell[conT] = document.createElement("td");
                dataCell[conT].innerHTML = cell;
                row[conT].appendChild(dataCell[conT]);
            }
            table[conT].appendChild(row[conT]);
            }

            // Agrega la tabla al contenedor
            container.appendChild(table[conT]);

        var Valorposiciones = new Array()

        for (var i = 1; i <= restricciones; i++) {
            let encontro = false
            let Posicion = 0
            var Lugar = 0
            while (encontro == false) {
                if (matrizMinimizar2Fase[i][Posicion] == 1) {
                    encontro = true
                }
                Lugar = Posicion
                Posicion++
            }
            Valorposiciones[i] = Math.abs(matrizMinimizar2Fase[0][Lugar])
        }

        for (var i = 1; i <= restricciones; i++) {
            for (var j = 0; j <= (desiciones + conS + conE); j++) {
                matrizMinimizar2Fase[0][j] += matrizMinimizar2Fase[i][j] * Valorposiciones[i]
            }
        }
        console.log("Tabla Optima")
        for (let elemento in matrizMinimizar2Fase) {
            console.log(elemento + " = " + matrizMinimizar2Fase[elemento])
        }

        // Crea la tabla
        conI=0
        conT++
        table[conT] = document.createElement("table");
        table[conT].classList.add("table", "table-bordered", "table-hover", "text-center", "mb-3");

        // Crea el título de la tabla
        caption[conT] = document.createElement("caption");
        caption[conT].innerHTML = `Tabla optima`;
        table[conT].appendChild(caption[conT]);

        // Crea la fila de encabezados de columna
        headerRow[conT] = document.createElement("tr");
        emptyCell[conT] = document.createElement("th");
        emptyCell[conT].innerHTML = "";
        headerRow[conT].appendChild(emptyCell[conT]);
        for (let header of columnTitles) {
        headerCell[conT] = document.createElement("th");
        headerCell[conT].innerHTML = header;
        headerRow[conT].appendChild(headerCell[conT]);
        }
        table[conT].appendChild(headerRow[conT]);

        // Crea las filas de datos
        for (let i = 0; i < matrizMinimizar.length; i++) {
        row[conT] = document.createElement("tr");
        titleCell[conT] = document.createElement("th");
        titleCell[conT].innerHTML = rowTitles[i];
        row[conT].appendChild(titleCell[conT]);
        for (let cell of    matrizMinimizar2Fase[i]) {
            dataCell[conT] = document.createElement("td");
            dataCell[conT].innerHTML = cell;
            row[conT].appendChild(dataCell[conT]);
        }
        table[conT].appendChild(row[conT]);
        }

        // Agrega la tabla al contenedor
        container.appendChild(table[conT]);

        container.appendChild(label4)

                // Crea la tabla
                conI=0
                conT++
                table[conT] = document.createElement("table");
                table[conT].classList.add("table", "table-bordered", "table-hover", "text-center", "mb-3");
        
                // Crea las filas de datos
                for (let i = 0; i < matrizMinimizar.length; i++) {
                row[conT] = document.createElement("tr");
                titleCell[conT] = document.createElement("th");
                titleCell[conT].innerHTML = rowTitles[i]+" = "+matrizMinimizar2Fase[i][desiciones+conE+conS];
                row[conT].appendChild(titleCell[conT]);
                table[conT].appendChild(row[conT]);
                }
        
                // Agrega la tabla al contenedor
                container.appendChild(table[conT]);
        
    }else{
        console.log("no optimo para fase 2")
        container.appendChild(label3)
    }
}



