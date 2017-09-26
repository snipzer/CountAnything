$(document).ready(function ()
{
    createUser();
    showUser(null, function ()
    {
        deleteUser();
        putUser();
    });

    function showUser(secondCall = false, callback)
    {
        let userTable = $('#userTable');
        if(secondCall)
        {
            userTable.empty()
                .hide()
                .fadeOut("slow");
        }

        $.ajax({
            url: 'v1/users',
            method: 'GET',
        }).done(function (data)
        {
            let tHead = document.createElement('thead');
            let trHead = document.createElement('tr');
            let thSurname = document.createElement('th');
            thSurname.innerHTML = "Surname";

            let thDelete = document.createElement('th');
            thDelete.innerHTML = "Delete";

            let thPut = document.createElement('th');
            thPut.innerHTML = "Modifier";

            trHead.appendChild(thSurname);
            trHead.appendChild(thDelete);
            trHead.appendChild(thPut);

            tHead.appendChild(trHead);

            userTable.append(tHead);

            data.forEach(function (value)
            {
                let tr = document.createElement("tr");
                let tdSurname = document.createElement("td");
                let tdDelete = document.createElement('td');
                let tdPut = document.createElement('td');
                let putButton = document.createElement('button');
                let deleteButton = document.createElement('button');

                putButton.innerHTML = "O";
                putButton.setAttribute('data-id', value._id);
                putButton.setAttribute('data-surname', value.surname);
                putButton.setAttribute("data-toggle", "modal");
                putButton.setAttribute("data-target", "#updateModal");
                putButton.className = "btn btn-warning putButton";

                tdPut.appendChild(putButton);

                deleteButton.innerHTML = "X";
                deleteButton.setAttribute('data-id', value._id);
                deleteButton.className = "btn btn-danger deleteButton";

                tdDelete.appendChild(deleteButton);

                tdSurname.innerHTML = value.surname;

                tr.appendChild(tdSurname);
                tr.appendChild(tdDelete);
                tr.appendChild(tdPut);

                userTable.append(tr).fadeIn("slow").show();
            });

            callback();
        }).fail( err => console.log(err));
    }

    function createUser()
    {
        $('#surnameUserCreate').unbind('click').bind('click', function ()
        {
            let surname = $('#surnameUser').val();

            $.ajax({
                url: "/v1/user/post",
                type: "POST",
                data: {
                    surname: surname,
                }
            }).done(function (resp)
            {
                showUser(true, function ()
                {
                    deleteUser();
                    putUser();
                });
            }).fail(function (err) { console.log(err) })
        })
    }

    function deleteUser()
    {
        let deleteButtons = $('.deleteButton');

        deleteButtons.each(function ()
        {
            let elem = $(this);
            let id = elem.data("id");

            elem.unbind('click').bind('click', function ()
            {
                $.ajax({
                    url: "/v1/user",
                    method: "DELETE",
                    data: {
                        id: id
                    }
                }).done(function (resp)
                {
                    showUser(true, function ()
                    {
                        deleteUser();
                        putUser();
                    });

                }).fail(function (err) { console.log(err) });
            });
        });
    }

    function putUser()
    {
        $('#updateModal').on('show.bs.modal', function (event)
        {
            let button = $(event.relatedTarget);
            let id = button.data('id');
            let oldSurname = button.data('surname');
            let modal = $(this);
            let surnameInput = $('#surnameInput');

            modal.find('.modal-title').text('Vous êtes sur le point de modifier le compteur ' + oldSurname);
            surnameInput.val(oldSurname);

            $("#putButton").unbind('click').bind('click', function ()
            {
                let surname = surnameInput.val();

                $.ajax({
                    url: "/v1/user/put",
                    method: "POST",
                    data: {
                        id: id,
                        surname: surname
                    }
                }).done(function (resp)
                {
                    showUser(true, function ()
                    {
                        deleteUser();
                        putUser();
                    });

                }).fail(function (err) { console.log(err) });
            });
        });
    }
});