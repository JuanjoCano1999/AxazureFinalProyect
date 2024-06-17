// A namespace defined for SDK sample code
// You should define a unique namespace for your libraries
var Sdk = window.Sdk || {};

// Registrar la función para que se ejecute cuando el formulario esté cargado
//Xrm.Page.data.entity.addOnLoad(addCustomLookupFilter);


        

Sdk.filterDisponibleYAspectos = function (executionContext) {

        //Obtener contexto del formulario
        var formContext = executionContext.getFormContext();

        var filter = "<filter type='and'>";
        filter += "<condition attribute='axz_disponible' operator='eq' value='" + 1 + "' />";

        if (formContext.getAttribute("axz_tipo") != null && formContext.getAttribute("axz_tipo").getValue() != null) {
            var tipo = formContext.getAttribute("axz_tipo").getValue();
            filter += "<condition attribute='axz_tipo' operator='eq' uitype='axz_tipo' value='" + tipo + "'/>";
        }
        if (formContext.getAttribute("axz_transmision") != null && formContext.getAttribute("axz_transmision").getValue() != null) {
            var transmision = formContext.getAttribute("axz_transmision").getValue();
            filter += "<condition attribute='axz_transmision' operator='eq' uitype='axz_transmision' value='" + transmision + "'/>";
        }
        if (formContext.getAttribute("axz_combustible") != null && formContext.getAttribute("axz_combustible").getValue() != null) {
            var combustible = formContext.getAttribute("axz_combustible").getValue();
            filter += "<condition attribute='axz_combustible' operator='eq' uitype='axz_combustible' value='" + combustible + "'/>";
        }
        if (formContext.getAttribute("axz_numerodepuertas") != null && formContext.getAttribute("axz_numerodepuertas").getValue() != null) {
            var puertas = formContext.getAttribute("axz_numerodepuertas").getValue();
            filter += "<condition attribute='axz_puertas' operator='eq' uitype='axz_numerodepuertas' value='" + puertas + "'/>";
        }
        if (formContext.getAttribute("axz_numerodeplazas") != null && formContext.getAttribute("axz_numerodeplazas").getValue() != null) {
            var plazas = formContext.getAttribute("axz_numerodeplazas").getValue();
            filter += "<condition attribute='axz_plazas' operator='eq' uitype='axz_numerodeplazas' value='" + plazas + "'/>";
        }


        /*
        if (formContext.getAttribute("axz_tipogestion") != null) {
            var tipoGestion = formContext.getAttribute("axz_tipogestion").getValue();
            filter += "<condition attribute='axz_tipogestion' operator='eq' value='" + tipoGestion + "'/>";
        }
        if (formContext.getAttribute("axz_resultado") != null && formContext.getAttribute("axz_resultado").getValue() != null) {
            var result = formContext.getAttribute("axz_resultado").getValue()[0].id;
            filter += "<condition attribute='axz_resultado' operator='eq' uitype='axz_resultado' value='" + result + "'/>";
        }
    
        //tipo: coche o furgoneta
        //combustible: electrico o manual
        //transmision: manual o automatico
        //numero de plazas
        //numero de asientos

        */
        filter += "</filter>";
        console.log(filter);
        formContext.getControl("axz_vehiculoid").addCustomFilter(filter, "axz_vehiculo");
}


//Recupero el valor del formulario, lo añado como condición pero usando los campos del vehículo como tal. La condición de disponible 
// se hace sin necesidad de buscarlo en el formcontext porque ya es un atributo del vehículo
/*
// Construir el filtro FetchXML
    var filterXml = "<filter type='and'>" +
                        "<condition attribute='disponible' operator='eq' value='0' />" +
                    "</filter>";
*/
// set 'Sdk.setParentAccountIdFilter' in the Opportunity form onload event handler
Sdk.setaxz_vehiculoidFilter = function (executionContext) {

    var formContext = executionContext.getFormContext();
    formContext.getControl("axz_vehiculoid").addPreSearch(function () {
        Sdk.filterDisponibleYAspectos(executionContext)
    })
}

/*
function addCustomLookupFilter() {
    // Construir el filtro FetchXML
    var filterXml = "<filter type='and'>" +
                        "<condition attribute='disponible' operator='eq' value='0' />" +
                    "</filter>";

    // Obtener el control de lookup
    var lookupControl = Xrm.Page.getControl("new_vehiculoslookup");

    // Añadir el filtro personalizado
    if (lookupControl) {
        lookupControl.addCustomFilter(filterXml);
    }
}
*/

