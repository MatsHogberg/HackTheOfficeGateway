$(document).ready(function(){
    $.getJSON("/settings", function(data){
        $("#connstr").text(data.connectionstring);
        $("#cachesize").val(data.cachesize);
        $("#delay").val(data.delay);
    });

    $("#savedata").on("click", function(){

        var cUrl = "/cachesize/" + $("#cachesize").val();
        var dUrl = "/interval/" + $("#delay").val();

        $.get(cUrl, function(){});
        $.get(dUrl, function(){});
    });
});
