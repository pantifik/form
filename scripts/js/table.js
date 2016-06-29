'use strict';
$(document).ready(function(){

    function Table(tableId){
        
        this.id = tableId;
    };

    Table.prototype.createTable = function (){
        
        var id = this.id;
        console.log(id)
        
        $(id).on('dblclick', 'td', function(){
            
            if ($(this).attr('class') == 'row-number'){
                return;
            };

            var self = this;
            var val = $(self).text();


            if ($(this).attr('class') == 'price'){
                $(this).html('<input type="number" id="editing" class="form-control" value="' + val + '" autofocus>');
            }else{
                $(this).html('<input type="text" id="editing" class="form-control" value="' + val + '" autofocus>');
            };
            

            $("#editing").focus();


            $(this).on('keydown', function(event){
                if (event.keyCode == 13){
                   $("#editing").blur();
                   return false;
                };
            });

            $("#editing").focusout(function(){
                val = $('#editing').val();
                $(this).remove();
                $(self).text(val);
            }); 
        });

        $('.add-row').on('click', function(){
            var number = +$('.row-number:last').text() + 1;
            $(id).append('<tr><td class="row-number">'+ number +'</td><td class="name"></td><td class="catalogue-number"></td><td class="delivery"></td><td class="price"></td></tr>');
            return false;
        });

        $(id).on('change', 'td.price', function(){
            var arr = $('.price');
            var sum = 0;

            for (var i=0; i<arr.length; i++){
                
                console.log(this == arr[i]);
                
                if (this == arr[i]){
                    sum += +this.firstChild.value;
                }else{
                    sum += +arr[i].textContent;
                };
                
            };

            return $('b.sum-value').text(sum);
        });        

    };

    Table.prototype.getContent = function(){
        
        var content = new Array();

        $(this.id + ' tr').has('td').each(function(){
            
            var arr = {};
            var children = $(this).children();

            for (var i = 0; i < children.length; i++){
                arr[children[i].className] = children[i].innerHTML;
            };

            content.push(arr);

        });

        return content;
    };


    function Submit(){
        $('.execute-button').on('click', function(){
            console.log('click');
            return false;
        })
        
    }


    var tableOn = new Table('#order-table');
    tableOn.createTable();
    tableOn.getContent();
    Submit();
});