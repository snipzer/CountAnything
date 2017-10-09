var timeout = setTimeout(function () {}, 1);

$(document).ready(function ()
{
    initialiseCounter();

    function initialiseCounter()
    {
        var returnButton = $('#return-button');

        $('#image-button').unbind('click').bind('click', function ()
        {
            var url = $(this).data('url');
            var counterSetId = $(this).data('counter_set_id');

            $.ajax({
                url: url,
                method: "POST",
                data: {
                    id: counterSetId,
                }
            }).then(function (data)
            {
                // Actualisation de la zone de comptage
                var counterNumber = data.counters.length;
                $('#counter_zone').fadeOut("slow", function ()
                {
                    $(this).html(counterNumber).fadeIn("slow")
                });

                returnButton.data('counter_id', data.counters[counterNumber-1]);

                returnButtonHandler("SHOW");

            }).catch(function (err)
            {
                console.log(err);
            });
        });

        returnButton.unbind('click').bind('click', function ()
        {
            var counterId = $(this).data('counter_id');
            var counterSetId = $(this).data('counter_set_id');
            var url = $(this).data('url');
            var counterZone = $('#counter_zone');

            $.ajax({
                url: url,
                method: "DELETE",
                data: {
                    counterSetId: counterSetId,
                    counterId: counterId
                }
            }).then(function ()
            {
                returnButtonHandler("HIDE");
                counterZone.fadeOut("slow", function ()
                {
                    $(this).html(counterZone.html() - 1).fadeIn("slow");
                });
            }).catch(function (err)
            {
                console.log(err);
            });
        });
    }

    function returnButtonHandler(str)
    {
        var returnButton = $('#return-button');

        switch(str)
        {
            case "HIDE":
                if(!returnButton.hasClass("hidden"))
                {
                    returnButton.fadeOut('slow').addClass("hidden");
                    // clearTimeout(timeout);
                    // timeout = setTimeout(function ()
                    // {
                    //     console.log('toto');
                    //     if(returnButton.hasClass("hidden"))
                    //         returnButton.fadeIn('slow').removeClass("hidden");
                    // }, 5000);
                }
                break;
            case "SHOW":
                if(returnButton.hasClass("hidden"))
                {
                    returnButton.fadeIn('slow').removeClass("hidden");
                    clearTimeout(timeout);
                    timeout = setTimeout(function ()
                    {
                        if(!returnButton.hasClass("hidden"))
                            returnButton.fadeOut('slow').addClass("hidden");
                    }, 5000);
                }
                break;
            default:
                return false;
                break;
        }
    }

});