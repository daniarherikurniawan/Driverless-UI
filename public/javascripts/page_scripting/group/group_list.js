isMyOwnGroup = profile_id == current_profile_id;

  if(!isMyOwnGroup){
  	/*not my profile page*/
  	document.getElementById('list-group-title').innerHTML = current_profile_name+"'s Groups";
  	document.getElementById('create-new-group').innerHTML = "";
	$('#list-group-title').attr('style', 'text-align: center');	
  }

  initiateListGroup(current_profile_id);

  function initiateListGroup(profile_id){
    var http = new XMLHttpRequest();
    http.open("POST", "/group/getList", true);
    http.setRequestHeader("Content-type","application/x-www-form-urlencoded");
    var params = "user_id=" + window.encodeURIComponent(profile_id);
    http.send((params));
    http.onload = function() {
      result = JSON.parse(http.responseText);
      if(http.responseText=="404" || result.status == 0){
        // alert(http.responseText);
      }else{
        result = result.message;
      	// alert(result.length)
        group_list_name = ''
        for (var i = 0; i <= result.length - 1 && i < 8; i++) {
        	if(i < 7){
        		if(result[i].group_accessibility == "Private Group"){
					icon = "<i style='color: #2d6363; margin-right:3px; font-size: 17px;' title='Private Group' class=\"fa fa-lock\"></i>";
				}else{
					icon = "<i style='color: #2d6363; margin-right:3px' title='Public Group' class=\"fa fa-globe\"></i>";
				}
	        	group_list_name += "<a href=\"/group/"+result[i]._id+"\" class=\"list-group-item\">"+icon+"   "+result[i].group_name+"</a> ";
        	}
        }
        // alert()
        if(result.length  == 8){
   			document.getElementById('show-all-groups').innerHTML = "<a href='/groups/"+profile_id+"'>See all groups</a>"     	
        }else{
        	$('#show-all-groups').attr('style', '')
        	if(result.length == 0){
        		if (isMyOwnGroup)
   					document.getElementById('show-all-groups').innerHTML = "You haven't joined to any group!"  
   				else
   					document.getElementById('show-all-groups').innerHTML = " There is no public group to display!"  
        	}
        }
        document.getElementById('group_list').innerHTML = group_list_name;


		$(function(){
 			 // alert($('div#main').hasScrollBar())
		  if(!$('div#main').hasScrollBar()){

		    $('div#middle-display').attr('style', 'padding-right: 11px; padding-left:0px;');
		  }
		});

      }
    }
  }


(function($) {
    $.fn.hasScrollBar = function() {
        return this.get(0).scrollHeight > this.height();
    }
})(jQuery);
