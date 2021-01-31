@extends('layouts.app')

@section('content')

    <div class="container">

        <div class="row">

            <div class="col-md-4">

                <h3>online users</h3>
                <hr>

                <h5 id="no-online-users">No online users</h5>

                <ul class="list-group" id="online-users"></ul>


            </div> <!-- end of column -->

            <div class="col-md-8 d-flex flex-column" style="height: 80vh">

                <div class="height-100 bg-white mb-4 p-5" id="chat"  style="overflow-y: scroll;height: 80vh">

                    @foreach($messages as $message)

                        <div class="mt-4 w-50 text-white p-3 rounded {{ auth()->user()->id == $message->user_id ? 'float-right bg-primary' : 'float-left bg-secondary' }}">
                           <p class="font-weight-bold">{{$message->user->name}}</p>
                            <p class="ml-3">{{$message->body}}</p>
                        </div>
                        <div class="clearfix"></div>



                    @endforeach

                </div> <!-- end of div -->


                <form action="" class="d-flex">
                    <input type="text" name="" data-url="{{ route('messages.store') }}" style="margin-right: 10px" class="form-control" id="chat-text">
                    <button class="btn btn-outline-primary">Send</button>
                </form>


            </div> <!-- end of column -->

        </div> <!-- end of row -->

    </div> <!-- end of container -->


@endsection
