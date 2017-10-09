$(document).ready(function ()
{

    init("#favorite_table", 'url_favorite_delete', 0, function ()
    {
        twoParamAjaxCall(".deleteButton", "user_id", "counter_set_id", "DELETE");
    });

    init("#counter_set_table", 'url_counter_set_delete', 1, function ()
    {
        twoParamAjaxCall(".deleteButton", "user_id", "counter_set_id", "DELETE");
        twoParamAjaxCall(".addFavButton", "user_id", "counter_set_id", "POST");
    });

    addCounter();

    function init(tableId, deleteUrl, bool, callback)
    {
        var table = $(tableId);
        var userId = table.data('user_id');
        var url_get_user = table.data('url_get_user').replace(":userId", userId);
        var url_delete = table.data(deleteUrl);

        $.ajax({
            url: url_get_user,
            method: "GET"
        }).then(function (user)
        {
            var length = user.counterSets.length;

            if(!bool)
                length = user.favoriteCounterSets.length;


            if(length !== 0)
            {
                var thead = generateThead();
                table.append(thead);

                var tbody = document.createElement("tbody");

                var content = user.favoriteCounterSets;

                if(bool)
                    content = user.counterSets;

                content.forEach(function (counterSetId, index)
                {
                    var url_get_counter_set = table.data('url_get_counter_set');
                    url_get_counter_set = url_get_counter_set.replace(":counterSetId", counterSetId);

                    $.ajax({
                        url: url_get_counter_set,
                        method: "GET"
                    }).then(function (counterSet)
                    {
                        var tr = document.createElement('tr');
                        var tdLabel = document.createElement('td');
                        var tdAction = document.createElement('td');
                        var deleteButton = document.createElement('button');

                        deleteButton.className = "deleteButton btn btn-danger";
                        deleteButton.innerHTML = "X";
                        deleteButton.setAttribute("data-user_id", userId);
                        deleteButton.setAttribute("data-url", url_delete);
                        deleteButton.setAttribute("data-counter_set_id", counterSet._id);

                        tdLabel.innerHTML = counterSet.label;

                        tdAction.appendChild(deleteButton);

                        if(bool)
                        {
                            var url_add_fav = $("#counter_set_table").data("url_add_fav");
                            var addFavButton = document.createElement('button');

                            addFavButton.className = "addFavButton btn btn-warning";
                            addFavButton.innerHTML = "+";
                            addFavButton.setAttribute("data-user_id", userId);
                            addFavButton.setAttribute("data-counter_set_id", counterSet._id);
                            addFavButton.setAttribute("data-url", url_add_fav);

                            tdAction.appendChild(addFavButton);
                        }

                        tr.appendChild(tdLabel);
                        tr.appendChild(tdAction);

                        tbody.appendChild(tr);

                        if(index === length-1)
                        {
                            table.append(thead);
                            table.append(tbody);
                            callback();
                        }

                    }).catch(function (err) { console.log(err) })
                });
            }
            else
            {
                var str = "Pas de compteurs";

                if(!bool)
                    str = "Pas de favoris";

                $(tableId).html(str);
            }


        }).catch(function (err)
        {
            console.log(err);
        });
    }

    function generateThead()
    {
        var thead = document.createElement("thead");
        var trHead = document.createElement("tr");
        var tdLabel = document.createElement("td");
        var tdAction = document.createElement("td");

        tdLabel.innerHTML = "Label";
        tdAction.innerHTML = "Actions";

        trHead.appendChild(tdLabel);
        trHead.appendChild(tdAction);

        thead.appendChild(trHead);

        return thead;
    }

    function twoParamAjaxCall(target, firstParamName, secondParamName, method)
    {
        $(target).unbind('click').bind('click', function ()
        {
            var btn = $(this);
            var userId = btn.data(firstParamName);
            var counterSetId = btn.data(secondParamName);
            var url = btn.data('url');

            $.ajax({
                url: url,
                method: method,
                data: {
                    userId: userId,
                    counterSetId: counterSetId
                }
            }).then(function (data)
            {
                location.reload();
                console.log(data);
            }).catch(function (err)
            {
                location.reload();
                console.log(err);
            })
        });
    }

    function addCounter()
    {
        $('#counter_set_modal').on('show.bs.modal', function (event)
        {
            let button = $(event.relatedTarget);
            let userId = button.data("user_id");
            let url = button.data("url_post_counter_set");

            $(".addCounterSetButton").unbind('click').bind('click', function ()
            {
                let label = $('#counterSetLabelInput').val();

                $.ajax({
                    url: url,
                    method: "POST",
                    data: {
                        userId: userId,
                        label: label
                    }
                }).done(function (resp)
                {
                    location.reload();
                }).fail(function (err) { console.log(err) });
            });
        });
    }
});