require('./bootstrap');

import Echo from "laravel-echo"

window.io = require('socket.io-client');

window.Echo = new Echo({
    broadcaster: 'socket.io',
    host: window.location.hostname + ':6001'
});



let onlineUsersLength = 0;


window.Echo.join(`online`)
    .here((users) => {

        onlineUsersLength = users.length;

        if(users.length >1) {
            $('#no-online-users').css('display', 'none');
        }

        let userId = $('meta[name=user-id]').attr('content');

        users.forEach(function (user) {

            if(user.id == userId) {
                return;
            }


            $('#online-users').append(`<li id="user-${user.id}" class="list-group-item" id="online-users">
            <span class="fa fa-circle text-success"></span> ${user.name}</li>`);
        });

    })
    .joining((user) => {

        onlineUsersLength++;
        $('#no-online-users').css('display', 'none');
        $('#online-users').append(`<li id="user-${user.id}" class="list-group-item" id="online-users">
        <span class="fa fa-circle text-success"></span> ${user.name}</li>`);
    })
    .leaving((user) => {


        onlineUsersLength--;

        if(onlineUsersLength ==1)
        {
            $('#no-online-users').css('display', 'block');
        }

        $('#user-' + user.id).remove();
    });


$('#chat-text').keypress(function (e) {

    if (e.which == 13) {

        e.preventDefault();

        let body = $(this).val();
        let url = $(this).data('url');
        let name = $('meta[name=user-name]').attr('content');

        $(this).val('');

        $('#chat').append(`

        <div class="mt-4 w-50 text-white p-3 rounded float-right bg-primary">

            <p class="font-weight-bold">${name}</p>
            <p class="ml-3">${body}</p>
        </div>
        <div class="clearfix"></div>
        `)

        let data = {
            '_token': $('meta[name=csrf-token]').attr('content'),
            body: body
        }

        $.ajax({
            url: url,
            method: 'post',
            data: data,
        });


    } // end of if

}); // end of key press

window.Echo.channel('laravel_database_chat-group')
    .listen('MessageDelivered', (e) => {

        $('#chat').append(`
        <div class="mt-4 w-50 text-white p-3 rounded float-left bg-secondary">
            <p class="font-weight-bold">${e.message.user.name}</p>
            <p class="ml-3">${e.message.body}</p>
        </div>
        <div class="clearfix"></div>
        `)
    });

