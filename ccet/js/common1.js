$(document).ready(function()
{
	$('.new_Semester_Select_doc').change(function ()
        {
            $("#Subject_Type").val("");
            $("#subjectId").html("");
            $("#subjectId").html("<option value=''>Select Subject</option>");
	});
	
	
	$('#facultybtn').click(function ()
    {
		 var error = '';
		/************************* Assign_Department **************************************************/
		/*var Department_Id = $.trim($("#Department_Id").val());
		$("#Department_Id").val(Department_Id);    
		if (!Department_Id)
		{
				error = error + "<li>Select Department</li>";
				PU_validation(error);
				return false;
		}*/
	
	   $("#facultyinfo").html(""); 
       $dept_id = $("#Department_Id").val();       
       $csrf = $("#_csrf").val();
       if($dept_id)
       {
        startLoader();
        var url = BASEURL + "download/requestforfacultyinforeport/getfacultylist";
		$.ajax({
		type: "POST",
		dataType: "json",
		url: url,
		data: {dept_id: $dept_id,_csrf:$csrf},
			success: function(data) {
			stopLoader(); 
			//var status_id = data.STATUS_ID;
			var res = data.STATUS_RESPONSE;
			$("#facultyinfo").html(res);
			
			}
			});  
	
		   }
				  
		});
$('#Editgroup_Search').click(function ()
{
	$("#btnsubmit").show();
});


$('#stu_detail_dep').click(function ()
{
	$(".stu_detail_dep").show();
});

$('#stu_detail_leet').click(function ()
{
	$(".stu_detail_dep").show();
});

$('.change_studentDep').click(function ()
{
        $(".chage_dep_section").hide();
	if($(this).prop("checked") == true)
        {
	$(".chage_dep_section").show();
	}	
});

$('#semesterIdnewV').change(function ()
    {
	   PU_hide_validation();
	   $("#batchmarksinfo").html(""); 
       $secureKey = $("#secureKey").val();
	   $secureHash = $("#secureHash").val();
	   $batch_session = $("#batch_session").val();
	   $semesterId = $(this).val();
       $csrf = $("#_csrf").val();
       if($batch_session && $semesterId)
       {
       var Assign_Department = $('#Assign_Department').val();
       var Assign_Course = $('#Assign_Course').val();
        startLoader();
        var url = BASEURL + "result/viewuploadedmarks/getbatchsubjectlist";
            $.ajax({
            type: "POST",
            dataType: "json",
            url: url,
            data: {
                    _csrf:$csrf,
                    dept_id:Assign_Department,
                    courseid : Assign_Course,
        		batch:$batch_session,
                    semesterId:$semesterId,
                    secureKey:$secureKey,
                    secureHash:$secureHash,
            },
                    success: function(data) {
                    stopLoader();                         
                    var status_id = data.STATUS_ID;
                    var res = data.STATUS_RESPONSE;
                    if(status_id=="000")
                    $("#batchmarksinfo").html(res);
                    else
                    {   
                        $("#batchmarksinfo").html('');
                    PU_validation(res);
                    return false;
                    }

                    }
                });  

               }

            });

///////////////////////////// Add Scheme For Existing Subjects Start////////////////////////////////	
$('.checkbatch').on('change', function ()
{
    //alert('dd');	
	$('.checkscheme').prop('checked',false);
	$("#viewschemeinfo").hide();
	$("#showscheme").show();
});

$('.checksub' ).on('change', function ()
{
    //alert('dd');	
	$('.checkscheme').prop('checked',false);
	$("#viewschemeinfo").hide();
	$("#showscheme").show();
});


$('.gracesub').on('change', function ()
{
    //alert('dd');	
	//$("#viewschemeinfo").hide();
        $("#beGrace_RollNo").val("");
        $("#EDIT_studentinfo").html("");
        $val= $(this).val();
        if($val)
	$("#beGrace_RollNo_main_div").show();
        else
        $("#beGrace_RollNo_main_div").hide();
});



//$('#checkscheme').click(function ()
$('#schemedet input[type="checkbox"]').click(function()
 {
  if($(this).prop("checked") == true) {
	PU_hide_validation();
	$("#viewschemeinfo").html('');
	  var Assign_Department = $("#Assign_Department").val();
	if (!Assign_Department) {
		var error = "<li>Select Department </li>";
		PU_validation(error);
		return false;
	}else{
		if(!isInteger(Assign_Department)){
		    error = error + "<li>Invalid Department ID</li>";
		    PU_validation(error);
		    return false;
		}
	    }
	    
	var Assign_Course = $("#Assign_Course").val();
	if (!Assign_Course) {
		var error = "<li>Select Course </li>";
		PU_validation(error);
		return false;
	}else{
		if(!isInteger(Assign_Course)){
		    error = error + "<li>Invalid Course ID</li>";
		    PU_validation(error);
		    return false;
		}
	    }
            var actionSelect = $("#actionSelect").val();
	if (!actionSelect) {
		var error = "<li>Select Batch </li>";
		PU_validation(error);
		return false;
	}
	    
	    	var semesterId = $("#semesterId").val();
	if (!semesterId) {
		var error = "<li>Select Semester </li>";
		PU_validation(error);
		return false;
	}else{
		if(!isInteger(semesterId)){
		    error = error + "<li>Invalid Semester ID</li>";
		    PU_validation(error);
		    return false;
		}
	    }
	   var Subject_Type = $("#Subject_Type").val();
	   if (!Subject_Type) {
		var error = "<li>Select Subject Type </li>";
		PU_validation(error);
		return false;
	   }
	   var subjectId = $("#subjectId").val();
	   if (!subjectId) {
		var error = "<li>Select Subject </li>";
		PU_validation(error);
		return false;
	   }
	   
	    var secureKey = $("#secureKey").val();
	    var url = BASEURL+"schemes/showcreditschemeums/viewschemepsession";
		$csrf = $("#_csrf").val();
		startLoader();
        $.ajax({
        type:"POST",
        url:url,
        dataType: "json",
        data:{
            _csrf:$csrf,
            session_yr:actionSelect,
            department:Assign_Department, 
            course:Assign_Course, 
            semesterId:semesterId,
			Subject_Type:Subject_Type,
			subjectId:subjectId,
        },
        success: function(data)
        {  
        //var status_id = data.STATUS_ID;
		stopLoader(); 
        var res = data.STATUS_RESPONSE;
        $("#viewschemeinfo").html(res);
		$("#showscheme").hide();
		$("#viewschemeinfo").show();
        }	
	 });
  }
  else if($(this).prop("checked") == false)
  {
	    $("#viewschemeinfo").hide();
		$("#showscheme").show();
  }
});

/////////////////////////////// Add Scheme For Existing Subjects End////////////////////////////////	

	$('#stuviewbtn').click(function ()
    {
			   var error = '';
	 /************************* SelectBatch **************************************************/
    var actionSelect = $.trim($("#actionSelect").val());
    $("#actionSelect").val(actionSelect);    
    if (!actionSelect)
    {
            error = error + "<li>Select Batch</li>";
            PU_validation(error);
            return false;
    }
    
    /************************* Assign_Department **************************************************/
    var Assign_Department = $.trim($("#Assign_Department").val());
    $("#Assign_Department").val(Assign_Department);    
    if (!Assign_Department)
    {
            error = error + "<li>Select Department</li>";
            PU_validation(error);
            return false;
    }
    
    /************************* Assign_Course **************************************************/
    var Assign_Course = $.trim($("#Assign_Course").val());
    $("#Assign_Course").val(Assign_Course);    
    if (!Assign_Course)
    {
            error = error + "<li>Select Course</li>";
            PU_validation(error);
            return false;
    }
    
    /************************* semesterId **************************************************/
    var semesterId = $.trim($("#semesterId").val());
    $("#semesterId").val(semesterId);    
    if (!semesterId)
    {
            error = error + "<li>Select Semester</li>";
            PU_validation(error);
            return false;
    }
		PU_hide_validation();
		//startLoader();
	
	
	   $("#studentviewinfo").html(""); 
       $actionSelect = $("#actionSelect").val();
       $Assign_Department = $("#Assign_Department").val();
	   $Assign_Course = $("#Assign_Course").val();
	   $semesterId = $("#semesterId").val();      
       $csrf = $("#_csrf").val();
       if($actionSelect && $Assign_Department && $Assign_Course && $semesterId)
       {
        startLoader();
        var url = BASEURL + "download/requestforstudentinforeport/getstudentlist";
		$.ajax({
		type: "POST",
		dataType: "json",
		url: url,
		data: {
			_csrf:$csrf,
            Batch:$actionSelect, 
            Department:$Assign_Department, 
            Course:$Assign_Course, 
            Semester:$semesterId,
		},
			success: function(data) {
			stopLoader(); 
			//var status_id = data.STATUS_ID;
			var res = data.STATUS_RESPONSE;
			$("#studentviewinfo").html(res);
			
			}
			});  
	
		   }
				  
		});
		
		
   $('#sturegviewbtn').click(function ()
    {
			   var error = '';

    
    /************************* Assign_Department **************************************************/
    var Assign_Department = $.trim($("#Assign_Department").val());
    $("#Assign_Department").val(Assign_Department);    
    if (!Assign_Department)
    {
            error = error + "<li>Select Department</li>";
            PU_validation(error);
            return false;
    }
    
    /************************* Assign_Course **************************************************/
    var Assign_Course = $.trim($("#Assign_Course").val());
    $("#Assign_Course").val(Assign_Course);    
    if (!Assign_Course)
    {
            error = error + "<li>Select Course</li>";
            PU_validation(error);
            return false;
    }
    
    	 /************************* SelectBatch **************************************************/
    var actionSelect = $.trim($("#actionSelect").val());
    $("#actionSelect").val(actionSelect);    
    if (!actionSelect)
    {
            error = error + "<li>Select Batch</li>";
            PU_validation(error);
            return false;
    }
    
    /************************* semesterId **************************************************/
    var semesterId = $.trim($("#semesterId").val());
    $("#semesterId").val(semesterId);    
    if (!semesterId)
    {
            error = error + "<li>Select Semester</li>";
            PU_validation(error);
            return false;
    }
		PU_hide_validation();
		//startLoader();
	
	
	   $("#rstudentviewinfo").html(""); 
	   $secureKey = $("#secureKey").val();
	   $secureHash = $("#secureHash").val();
       $actionSelect = $("#actionSelect").val();
       $Assign_Department = $("#Assign_Department").val();
	   $Assign_Course = $("#Assign_Course").val();
	   $semesterId = $("#semesterId").val();      
       $csrf = $("#_csrf").val();
       if($actionSelect && $Assign_Department && $Assign_Course && $semesterId)
       {
        startLoader();
        var url = BASEURL + "workflow/viewregisteredstudent/getstudentreglist";
		$.ajax({
		type: "POST",
		dataType: "json",
		url: url,
		data: {
			_csrf:$csrf,
            Batch:$actionSelect, 
            Department:$Assign_Department, 
            Course:$Assign_Course, 
            Semester:$semesterId,
			secureKey:$secureKey,
			secureHash:$secureHash,
		},
			success: function(data) {
			stopLoader(); 
			//var status_id = data.STATUS_ID;
			var res = data.STATUS_RESPONSE;
			$("#rstudentviewinfo").html(res);
			
			}
			});  
	
		   }
				  
		});
		
   $('#semesterIdTEST').change(function ()
    {
	   PU_hide_validation();
	   $("#batchmarksinfo").html(""); 
       $secureKey = $("#secureKey").val();
	   $secureHash = $("#secureHash").val();
	   $batch_session = $("#batch_session").val();
	   $semesterId = $("#semesterId").val();
       $csrf = $("#_csrf").val();
       if($batch_session && $semesterId)
       {
        startLoader();
        var url = BASEURL + "result/uploadresult/getbatchsubjectlist";
		$.ajax({
		type: "POST",
		dataType: "json",
		url: url,
		data: {
			_csrf:$csrf,
            batch:$batch_session,
			semesterId:$semesterId,
			secureKey:$secureKey,
			secureHash:$secureHash,
		},
			success: function(data) {
			stopLoader();                         
			var status_id = data.STATUS_ID;
			var res = data.STATUS_RESPONSE;
                        if(status_id=="000")
			$("#batchmarksinfo").html(res);
                        else
                        {   
                        PU_validation(res);
                        return false;
                        }
			
			}
			});  
	
		   }
				  
		});
                
$('#viewuploadedmarks_semesterId').change(function ()
    {
	   PU_hide_validation();
	   $("#batchmarksinfo").html(""); 
       $secureKey = $("#secureKey").val();
	   $secureHash = $("#secureHash").val();
	   $batch_session = $("#batch_session").val();
	   $semesterId = $("#viewuploadedmarks_semesterId").val();
       $csrf = $("#_csrf").val();
       if($batch_session && $semesterId)
       {
        startLoader();
        var url = BASEURL + "result/viewuploadedmarks/getbatchsubjectlist";
		$.ajax({
		type: "POST",
		dataType: "json",
		url: url,
		data: {
			_csrf:$csrf,
            batch:$batch_session,
			semesterId:$semesterId,
			secureKey:$secureKey,
			secureHash:$secureHash,
		},
			success: function(data) {
			stopLoader();                         
			var status_id = data.STATUS_ID;
			var res = data.STATUS_RESPONSE;
                        if(status_id=="000")
			$("#batchmarksinfo").html(res);
                        else
                        {   
                        PU_validation(res);
                        return false;
                        }
			
			}
			});  
	
		   }
				  
		});
	
$('.uploadresult_studentinfo').click(function ()
{
PU_hide_validation();
if(!$("#error_main").hasClass('alert-error'))
$("#error_main").addClass('alert-error');
$("#error_main").removeClass('alert-success');
var chkDisplay=false;    
$("#upload_marks_group_list input[type=checkbox]").each(function ()
{
if($(this).prop("checked"))
{
    chkDisplay=true; 
    return false;
}   
});
if(chkDisplay)
{
    startLoader();
    $("#html_studentmarksinfo").html("");
    var formdata = $("#frm_enter_marks :input").serialize();
    var csrf = $("#_csrf").val();
    var url = BASEURL + "result/uploadresult/getstudentmarkslist";
    $.ajax({
        
        type: "POST",
        dataType: "json",
        url: url,
        data: {
            _csrf:csrf,
            formdata:formdata
        },
        success: function(data) {
            stopLoader();
            var status_id = data.STATUS_ID;
            var res = data.STATUS_RESPONSE;
            if(status_id=="000")
            $("#html_studentmarksinfo").html(res);
            else
            {   
            PU_validation(res);
            return false;
            }
        
        }
    });
}
    else
    {
    var error = "<li>Please Select Group</li>";
    PU_validation(error);
    return false;   
    }
  });
  
  $('.uploadresult_view_studentinfo').click(function ()
{
PU_hide_validation();
$("#download_student_result").hide();
if(!$("#error_main").hasClass('alert-error'))
$("#error_main").addClass('alert-error');
$("#error_main").removeClass('alert-success');
var chkDisplay=false;    
$("#upload_marks_group_list input[type=checkbox]").each(function ()
{
if($(this).prop("checked"))
{
    chkDisplay=true; 
    return false;
}   
});
if(chkDisplay)
{
    startLoader();
    $("#html_studentmarksinfo").html("");
    var formdata = $("#frm_enter_marks :input").serialize();
    var csrf = $("#_csrf").val();
    var url = BASEURL + "result/viewuploadedmarks/getstudentmarkslist";
    $.ajax({
        
        type: "POST",
        dataType: "json",
        url: url,
        data: {
            _csrf:csrf,
            formdata:formdata
        },
        success: function(data) {
            stopLoader();
            var status_id = data.STATUS_ID;
            var res = data.STATUS_RESPONSE;
            if(status_id=="000")
            {
            $("#html_studentmarksinfo").html(res);
            $("#download_student_result").show();
            }
            else
            {   
            PU_validation(res);
            return false;
            }
        
        }
    });
}
    else
    {
    var error = "<li>Please Select Group</li>";
    PU_validation(error);
    return false;   
    }
  });
  
  $('body').on('click','.saveAsDraft_finalize_btn',function()
    {   
    if(!$("#error_main").hasClass('alert-error'))
    $("#error_main").addClass('alert-error');
    $("#error_main").removeClass('alert-success');
     $action_id = $.trim($(this).attr('id'));
     $finalize = "No";
     if($action_id == "Finalize_btn")
     {
      $finalize = "Yes";
     }
     else if($action_id == "saveAsDraft_btn")
     {         
     }
     else
     {   
        PU_validation("<li> Wrong Input, Contact Admin</li>");
        return false;       
     }
     
    startLoader();
    var formdata = $("#frm_enter_marks :input").serialize();
    var formdata1 = $("#html_studentmarksinfo :input").serialize();
    var csrf = $("#_csrf").val();
    var url = BASEURL + "result/uploadresult/saveasdraft";
    $.ajax({
        
        type: "POST",
        dataType: "json",
        url: url,
        data: {
            _csrf:csrf,
            formdata:formdata,
            formdata1:formdata1,
            finalize:$finalize
        },
        success: function(data) {
        stopLoader();
            var status_id = data.STATUS_ID;
            var res = data.STATUS_RESPONSE;
            if(status_id=="000")
            {
            $("#error_main").removeClass('alert-error');
            $("#error_main").addClass('alert-success');
            if($finalize == "Yes")
            $("#html_studentmarksinfo").html("");
            PU_validation(res);
            return false;     
            }
            else
            {
            PU_validation(res);
            return false;  
            }
        }
    });
    
    });
    
    
   $('.assign_marks_checkbox').change(function ()
   {
   $("#html_studentmarksinfo").html(""); 
   $("#download_student_result").hide();
   });
   
   $('.marks_Upload_batch_session').change(function ()
   {
    PU_hide_validation();
   $(".marks_Upload_batch_semester").val('');
   $("#batchmarksinfo").html(""); 
   });
   
   
   
   
   
   
   
	
	
	$("#dob").datepicker(
	{
	 format: 'dd-mm-yyyy',
	 endDate: TODAY_DATE, //today_date
	 todayHighlight: true,
	}).on('changeDate', function ()
	{
	var dob = $(this).val();
	$(this).val(dob);
	$(".datepicker").hide();
	});
	
	$("#fatherDob").datepicker(
	{
	 format: 'dd-mm-yyyy',
	 endDate: TODAY_DATE, //today_date
	 todayHighlight: true,
	}).on('changeDate', function ()
	{
	var fatherDob = $(this).val();
	$("#fatherDob").val(fatherDob);
	
	$(".datepicker").hide();
	});
	
	$("#doj").datepicker(
	{
	 format: 'dd-mm-yyyy',
	 endDate: TODAY_DATE, //today_date
	 todayHighlight: true,
	}).on('changeDate', function ()
	{
	var doj = $(this).val();
	$(this).val(doj);
	$(".datepicker").hide();
	});

$('.resultGetsubjectstatus').change(function ()
{
resultGetsubjectstatus();
});
   
$('#viewstuattendance').click(function ()
    {
			   var error = '';

    
    /************************* Assign_Department **************************************************/
    var Assign_Department = $.trim($("#Assign_Department").val());
    $("#Assign_Department").val(Assign_Department);    
    if (!Assign_Department)
    {
            error = error + "<li>Select Department</li>";
            PU_validation(error);
            return false;
    }
    
    /************************* Assign_Course **************************************************/
    var Assign_Course = $.trim($("#Assign_Course").val());
    $("#Assign_Course").val(Assign_Course);    
    if (!Assign_Course)
    {
            error = error + "<li>Select Course</li>";
            PU_validation(error);
            return false;
    }
    
    	 /************************* SelectBatch **************************************************/
    var actionSelect = $.trim($("#actionSelect").val());
    $("#actionSelect").val(actionSelect);    
    if (!actionSelect)
    {
            error = error + "<li>Select Batch</li>";
            PU_validation(error);
            return false;
    }
    
    /************************* semesterId **************************************************/
    var semesterId = $.trim($("#semesterId").val());
    $("#semesterId").val(semesterId);    
    if (!semesterId)
    {
            error = error + "<li>Select Semester</li>";
            PU_validation(error);
            return false;
    }
		PU_hide_validation();
		//startLoader();
	
	
	   $("#studentattendanceinfo").html(""); 
	   $secureKey = $("#secureKey").val();
	   $secureHash = $("#secureHash").val();
       $actionSelect = $("#actionSelect").val();
       $Assign_Department = $("#Assign_Department").val();
	   $Assign_Course = $("#Assign_Course").val();
	   $semesterId = $("#semesterId").val();      
       $csrf = $("#_csrf").val();
       if($actionSelect && $Assign_Department && $Assign_Course && $semesterId)
       {
        startLoader();
		
		
        var url = BASEURL + "attendance/viewattendancebystudent/viewattendancestu";
		$.ajax({
		type: "POST",
		dataType: "json",
		url: url,
		data: {
			_csrf:$csrf,
            session_yr:$actionSelect, 
            dept_id:$Assign_Department, 
            course:$Assign_Course, 
            semesterId:$semesterId,
			secureKey:$secureKey,
			secureHash:$secureHash,
		},
			success: function(data) {
			stopLoader(); 
			//var status_id = data.STATUS_ID;
			
			var res = data.STATUS_RESPONSE;
			$("#studentattendanceinfo").html(res);
			
			}
			});  
	
		   }
				  
		});

$('#Student_Short_Attendance').click(function ()
    {
			   var error = '';

    
    /************************* Assign_Department **************************************************/
    var Assign_Department = $.trim($("#Assign_Department").val());
    $("#Assign_Department").val(Assign_Department);    
    if (!Assign_Department)
    {
            error = error + "<li>Select Department</li>";
            PU_validation(error);
            return false;
    }
    
    /************************* Assign_Course **************************************************/
    var Assign_Course = $.trim($("#Assign_Course").val());
    $("#Assign_Course").val(Assign_Course);    
    if (!Assign_Course)
    {
            error = error + "<li>Select Course</li>";
            PU_validation(error);
            return false;
    }
    
    	 /************************* SelectBatch **************************************************/
    var actionSelect = $.trim($("#actionSelect").val());
    $("#actionSelect").val(actionSelect);    
    if (!actionSelect)
    {
            error = error + "<li>Select Batch</li>";
            PU_validation(error);
            return false;
    }
    
    /************************* semesterId **************************************************/
    var semesterId = $.trim($("#semesterId").val());
    $("#semesterId").val(semesterId);    
    if (!semesterId)
    {
            error = error + "<li>Select Semester</li>";
            PU_validation(error);
            return false;
    }
		PU_hide_validation();
		//startLoader();
	
	
	   $("#studentattendanceinfo").html(""); 
	   $secureKey = $("#secureKey").val();
	   $secureHash = $("#secureHash").val();
       $actionSelect = $("#actionSelect").val();
       $Assign_Department = $("#Assign_Department").val();
	   $Assign_Course = $("#Assign_Course").val();
	   $semesterId = $("#semesterId").val();      
       $csrf = $("#_csrf").val();
       if($actionSelect && $Assign_Department && $Assign_Course && $semesterId)
       {
        startLoader();		
        var url = BASEURL + "attendance/umsshortattendancestustatus/viewshortattendancestu";
		$.ajax({
		type: "POST",
		dataType: "json",
		url: url,
		data: {
			_csrf:$csrf,
            session_yr:$actionSelect, 
            department:$Assign_Department, 
            course:$Assign_Course, 
            semesterId:$semesterId,
			secureKey:$secureKey,
			secureHash:$secureHash,
		},
			success: function(data) {
			stopLoader(); 
			//var status_id = data.STATUS_ID;
			
			var res = data.STATUS_RESPONSE;
			$("#studentattendanceinfo").html(res);
			
			}
			});  
	
		   }
				  
		});


});





function resultGetsubjectstatus()
{
    PU_hide_validation();
    if(!$("#error_main").hasClass('alert-error'))
    $("#error_main").addClass('alert-error');
    $("#error_main").removeClass('alert-success');
$("#html_viewSubject_Status").html('');
var session_yr = $("#session_yr").val();
var Assign_Department = $("#Assign_Department").val();
var Assign_Course = $("#Assign_Course").val();
var semesterId = $("#semesterId").val();
var Subject_Status_Status = $("#Subject_Status_Status").val();
if(session_yr && Assign_Department && Assign_Course && semesterId && Subject_Status_Status)
{
 startLoader();
    var formdata = $("#frm_Subject_Status :input").serialize();   
    var csrf = $("#_csrf").val();
    var url = BASEURL + "result/subjectstatus/getsubjectstatus";
    $.ajax({
        
        type: "POST",
        dataType: "json",
        url: url,
        data: {
            _csrf:csrf,
            formdata:formdata,
        },
        success: function(data) {
        stopLoader();
            var status_id = data.STATUS_ID;
            var res = data.STATUS_RESPONSE;
            if(status_id=="000")
            {
            $("#error_main").removeClass('alert-error');
            $("#error_main").addClass('alert-success');            
            $("#html_viewSubject_Status").html(res);
            }
            else
            {
            PU_validation(res);
            return false;  
            }
        }
    });   
}



}

function validateSchemExistMaster(){
     PU_hide_validation();
    var error ='';
       
    var Assign_Department = $.trim($('#Assign_Department').val());   
    if(!Assign_Department){
        var error = "<li>Select Department</li>";
        PU_validation(error);
        return false;
    }else{
        if(!$.isNumeric(Assign_Department)){
            var error = "<li>Invalid Department ID</li>";
            PU_validation(error);
            return false;
        }
    }
   
    var Assign_Course = $.trim($('#Assign_Course').val());
   
    if(!Assign_Course){
        var error = "<li>Select Course</li>";
        PU_validation(error);
        return false;
    }else{
        if(!$.isNumeric(Assign_Course)){
            var error = "<li>Invalid Course ID</li>";
            PU_validation(error);
            return false;
        }
    }
   
    /************************* SelectBatch **************************************************/
    var actionSelect = $.trim($("#actionSelect").val());
    $("#actionSelect").val(actionSelect);   
    if (!actionSelect)
    {
            error = error + "<li>Select Batch</li>";
            PU_validation(error);
            return false;
    }
   
   
    var semesterId = $.trim($('#semesterId').val());
    if(!semesterId){
        var error = "<li>Select Semester</li>";
        PU_validation(error);
        return false;
    }else{
        if(!$.isNumeric(semesterId)){
            var error = "<li>Invalid Semester ID</li>";
            PU_validation(error);
            return false;
        }
    }
   
   
    var Subject_Type = $.trim($('#Subject_Type').val());
    if(!Subject_Type){
        var error = "<li>Select Subject Type</li>";
        PU_validation(error);
        return false;
    }
   
    var subjectId = $.trim($('#subjectId').val());
    if(!subjectId){
        var error = "<li>Select Subject</li>";
        PU_validation(error);
        return false;
    }
   
   
    var subjectLecture = $.trim($("#subjectLecture").val());
    $("#subjectLecture").val(subjectLecture);
    if(!subjectLecture){
        var error = "<li>Enter Lectures /week</li>";
        PU_validation(error);
        return false;
    }
    else
    {
    if(!isInteger(subjectLecture)){
        error = error + "<li>Lectures /week Only in Integer.</li>";
        PU_validation(error);
        return false;
    }
    }
   
    var subjectTutorial = $.trim($("#subjectTutorial").val());
    $("#subjectTutorial").val(subjectTutorial);
    if(!subjectTutorial){
        var error = "<li>Enter Tutorials /week</li>";
        PU_validation(error);
        return false;
    }
    else
    {
    if(!isInteger(subjectTutorial)){
        error = error + "<li>Tutorials /week Only in Integer.</li>";
        PU_validation(error);
        return false;
    }
    }
   
   
    var subjectInternalMarks = $.trim($("#subjectInternalMarks").val());
    $("#subjectInternalMarks").val(subjectInternalMarks);
    if(!subjectInternalMarks){
        var error = "<li>Enter Internal Marks</li>";
        PU_validation(error);
        return false;
    }
    else
    {
    if(!isInteger(subjectInternalMarks)){
        error = error + "<li>Internal Marks Only in Integer.</li>";
        PU_validation(error);
        return false;
    }
    }
   
   
    var subjectExternalMarks = $.trim($("#subjectExternalMarks").val());
    $("#subjectExternalMarks").val(subjectExternalMarks);
    if(!subjectExternalMarks){
        var error = "<li>Enter External Marks</li>";
        PU_validation(error);
        return false;
    }
    else
    {
    if(!isInteger(subjectExternalMarks)){
        error = error + "<li>External Marks Only in Integer.</li>";
        PU_validation(error);
        return false;
    }
    }
   
    var subjectPractical = $.trim($("#subjectPractical").val());
    $("#subjectPractical").val(subjectPractical);
    if(!subjectPractical){
        var error = "<li>Enter Practicals /week Marks</li>";
        PU_validation(error);
        return false;
    }
    else
    {
    if(!isInteger(subjectPractical)){
        error = error + "<li>Practicals /week Only in Integer.</li>";
        PU_validation(error);
        return false;
    }
    }
   
    var practicalMarks = $.trim($("#practicalMarks").val());
    $("#practicalMarks").val(practicalMarks);
    if(!practicalMarks){
        var error = "<li>Enter Practicals /Marks Marks</li>";
        PU_validation(error);
        return false;
    }
    else
    {
    if(!isInteger(practicalMarks)){
        error = error + "<li>Practicals /Marks Only in Integer.</li>";
        PU_validation(error);
        return false;
    }
    }
   
   
    var subjectCredit = $.trim($("#subjectCredit").val());
    $("#subjectCredit").val(subjectCredit);
    if(!subjectCredit){
        var error = "<li>Enter Theory Credits Marks</li>";
        PU_validation(error);
        return false;
    }
    /*  Fraction Sysytem 06-APRIL-2021
    else
    {
    if(!isInteger(subjectCredit)){
        error = error + "<li>Theory Credits Only in Integer.</li>";
        PU_validation(error);
        return false;
    }
    }
    
    */
   
    var practicalCredit = $.trim($("#practicalCredit").val());
    $("#practicalCredit").val(practicalCredit);
    if(!practicalCredit){
        var error = "<li>Enter Practical Credits Marks</li>";
        PU_validation(error);
        return false;
    }
    
    /*  Fraction Sysytem 06-APRIL-2021
    else
    {
    if(!isInteger(practicalCredit)){
        error = error + "<li>Practical Credits Only in Integer.</li>";
        PU_validation(error);
        return false;
    }
    }
     */
   
    if(!validBatchWithSession())  
    return false;
  
    PU_hide_validation();
    startLoader();
}


function validate_GradeMaster(){
   var error = '';
	
   var gradeName = $.trim($("#gradeName").val());     
    $("#gradeName").val(gradeName);
    if (!gradeName)
    {
    error = error + "<li>Grade Name Required</li>";
    PU_validation(error);
    return false;  
    }
	
	var gradePoint = $.trim($("#gradePoint").val());     
    $("#gradePoint").val(gradePoint);
	if(gradePoint)
    {
        if (!isInteger(gradePoint))
        {
            error = error + "<li>Points Only In Integer </li>";
            PU_validation(error);
            return false;
        }
        
    }
    else
    {
    error = error + "<li>Points Required</li>";
    PU_validation(error);
    return false;  
    }
	
	var gradeDescription = $.trim($("#gradeDescription").val());     
    $("#gradeDescription").val(gradeDescription);
    if (!gradeDescription)
    {
    error = error + "<li>Description Required</li>";
    PU_validation(error);
    return false;  
    }
	
	var startYear = $.trim($("#startYear").val());     
    $("#startYear").val(startYear);
	if(startYear)
    {
        if (!isInteger(startYear))
        {
            error = error + "<li>Session Start Year Only In Integer </li>";
            PU_validation(error);
            return false;
        }
        else
        {
            var validMobilelength = startYear.length;
            if (validMobilelength != '4')
            {
                error = error + "<li>Session Start Year Must Be of 4 Integer Numbers</li>";
                PU_validation(error);
                return false;
            }
        }
    }
    else
    {
    error = error + "<li>Session Start Year Required</li>";
    PU_validation(error);
    return false;  
    }
	
	var endYear = $.trim($("#endYear").val());     
    $("#endYear").val(endYear);
    if(endYear)
    {
        if (!isInteger(endYear))
        {
            error = error + "<li>Session End Year Only In Integer </li>";
            PU_validation(error);
            return false;
        }
        else
        {
            var validMobilelength = endYear.length;
            if (validMobilelength != '4')
            {
                error = error + "<li>Session End Year Must Be of 4 Integer Numbers</li>";
                PU_validation(error);
                return false;
            }
        }
    }
	else
    {
    error = error + "<li>Session End Year Required</li>";
    PU_validation(error);
    return false;  
    }
	
	var startMarks = $.trim($("#startMarks").val());     
    $("#startMarks").val(startMarks);
    if(startMarks)
    {
        if (!isInteger(startMarks))
        {
            error = error + "<li>Percentage Start Marks Only In Integer </li>";
            PU_validation(error);
            return false;
        }
       
    }
	else
    {
    error = error + "<li>Percentage Start Marks Required</li>";
    PU_validation(error);
    return false;  
    }
	
	var endMarks = $.trim($("#endMarks").val());     
    $("#endMarks").val(endMarks);
    if(endMarks)
    {
        if (!isInteger(endMarks))
        {
            error = error + "<li>Percentage End Marks Only In Integer </li>";
            PU_validation(error);
            return false;
        }
       
    }
	else
    {
    error = error + "<li>Percentage End Marks Required</li>";
    PU_validation(error);
    return false;  
    }
    
}


function validateassigncourse(){
   var error = '';
    
    /************************* Assign_Department **************************************************/
    var Department = $.trim($("#Department").val());
    $("#Department").val(Department);    
    if (!Department)
    {
            error = error + "<li>Select Department</li>";
            PU_validation(error);
            return false;
    }
    
    /************************* Assign_Course **************************************************/
    var Course = $.trim($("#Course").val());
    $("#Course").val(Course);    
    if (!Course)
    {
            error = error + "<li>Select Course</li>";
            PU_validation(error);
            return false;
    }
    
}

function validatenotice(){
   var error = '';
    
    /************************* Assign_Department **************************************************/
    var frm_fac_title = $.trim($("#frm_fac_title").val());
    $("#frm_fac_title").val(frm_fac_title);    
    if (!frm_fac_title)
    {
            error = error + "<li>Select Title</li>";
            PU_validation(error);
            return false;
    }
    
	var dob = $.trim($("#dob").val());
    if (!dob)
    {
            error = error + "<li>Enter Date </li>";
            PU_validation(error);
            return false;
    }
	
    /************************* Assign_Course **************************************************/
    var frm_fac_address = $.trim($("#frm_fac_address").val());
    $("#frm_fac_address").val(frm_fac_address);    
    if (!frm_fac_address)
    {
            error = error + "<li>Select Descripation</li>";
            PU_validation(error);
            return false;
    }
    
}

function validatesyllabus(){
   var error = '';
    
    /************************* Assign_Department **************************************************/
    var Assign_Department = $.trim($("#Assign_Department").val());
    $("#Assign_Department").val(Assign_Department);    
    if (!Assign_Department)
    {
            error = error + "<li>Select Department</li>";
            PU_validation(error);
            return false;
    }
    
    /************************* Assign_Course **************************************************/
    var Assign_Course = $.trim($("#Assign_Course").val());
    $("#Assign_Course").val(Assign_Course);    
    if (!Assign_Course)
    {
            error = error + "<li>Select Course</li>";
            PU_validation(error);
            return false;
    }
	
	var frm_title = $.trim($("#frm_title").val());
    $("#frm_title").val(frm_title);    
    if (!frm_title)
    {
            error = error + "<li>Select Title</li>";
            PU_validation(error);
            return false;
    }
	
	var frm_fileUpload = $.trim($("#frm_fileUpload").val());
    $("#frm_fileUpload").val(frm_fileUpload);    
    if (!frm_fileUpload)
    {
            error = error + "<li>Select Syllabus File</li>";
            PU_validation(error);
            return false;
    }
    
}

function validategracemarks(){
   var error = '';
    
    /************************* Assign_Department **************************************************/
    var frm_grace_marks = $.trim($("#frm_grace_marks").val());
    $("#frm_grace_marks").val(frm_grace_marks);    
    if (!frm_grace_marks)
    {
            error = error + "<li>Enter Grace Marks</li>";
            PU_validation(error);
            return false;
    }
    
    PU_hide_validation();
    startLoader();
}

function validategraceMaster(){
    PU_hide_validation();

    var Assign_Department = $.trim($("#Assign_Department").val());
    if(!Assign_Department){
        var error = "<li>Select Department</li>";
        PU_validation(error);
        return false;
    }
    var Assign_Course = $.trim($("#Assign_Course").val());
    if(!Assign_Course){
        var error = "<li>Select Course</li>";
        PU_validation(error);
        return false;
    }
    var actionSelect = $.trim($("#actionSelect").val());
    if(!actionSelect){
        var error = "<li>Select Batch</li>";
        PU_validation(error);
        return false;
    }
    var semesterId = $.trim($("#semesterId").val());
    if(!semesterId){
        var error = "<li>Select Semester</li>";
        PU_validation(error);
        return false;
    }
    var Subject_Type = $.trim($("#Subject_Type").val());
    if(!Subject_Type){
        var error = "<li>Select Subject Type</li>";
        PU_validation(error);
        return false;
    }
	var subjectId = $.trim($("#subjectId").val());
    if(!subjectId){
        var error = "<li>Select Subject</li>";
        PU_validation(error);
        return false;
    }
 
    
    /********************************* beGroupMaster_RollNo  ******************************************/
    var beGrace_RollNo = $.trim($("#beGrace_RollNo").val());
    $("#beGrace_RollNo").val(beGrace_RollNo);
    if (beGrace_RollNo)
    {
        if (!validrollno(beGrace_RollNo))
        {
            error = "<li>Valid Roll No Required</li>";
            PU_validation(error);
            return false;
        }
    }
    else
    {
            error = "<li>Roll No Required</li>";
            PU_validation(error);
            return false;
    }
    
    PU_hide_validation();
    startLoader();
    getStudentGraceInfo();
}

function getStudentGraceInfo()
{
    $csrf = $("#_csrf").val();
    var formdata = $('#form_grace_serailize_EDIT :input').serialize();   
    var url = BASEURL + "result/gracemarks/getstudentgraceinfo";
    $("#EDIT_studentinfo").html('');
    $.ajax
    ({
        type: "POST",
        url: url,
        dataType: "json",
        data:
        {
        formdata: formdata,
        _csrf:$csrf
        },
        success: function (data) 
        {         
        var status_id = data.STATUS_ID;
        var res = data.STATUS_RESPONSE;         
        if(status_id=="000")
        {
         $("#EDIT_studentinfo").html(res);         
        }
        else
        {
            PU_validation("<li>"+res+"</li>");            
        }
        stopLoader();
        }
    });  
}

/*************************************************************************/
function validatedetainStudent(){
    PU_hide_validation();

    var Assign_Department = $.trim($("#Assign_Department").val());
    if(!Assign_Department){
        var error = "<li>Select Department</li>";
        PU_validation(error);
        return false;
    }
    var Assign_Course = $.trim($("#Assign_Course").val());
    if(!Assign_Course){
        var error = "<li>Select Course</li>";
        PU_validation(error);
        return false;
    }
    var actionSelect = $.trim($("#actionSelect").val());
    if(!actionSelect){
        var error = "<li>Select Batch</li>";
        PU_validation(error);
        return false;
    }
    var semesterId = $.trim($("#semesterId").val());
    if(!semesterId){
        var error = "<li>Select Semester</li>";
        PU_validation(error);
        return false;
    }
    var Subject_Type = $.trim($("#Subject_Type").val());
    if(!Subject_Type){
        var error = "<li>Select Subject Type</li>";
        PU_validation(error);
        return false;
    }
	var subjectId = $.trim($("#subjectId").val());
    if(!subjectId){
        var error = "<li>Select Subject</li>";
        PU_validation(error);
        return false;
    }
 
    
    /********************************* beGroupMaster_RollNo  ******************************************/
    var beGrace_RollNo = $.trim($("#beGrace_RollNo").val());
    $("#beGrace_RollNo").val(beGrace_RollNo);
    if (beGrace_RollNo)
    {
        if (!validrollno(beGrace_RollNo))
        {
            error = "<li>Valid Roll No Required</li>";
            PU_validation(error);
            return false;
        }
    }
    else
    {
            error = "<li>Roll No Required</li>";
            PU_validation(error);
            return false;
    }
    
    PU_hide_validation();
    startLoader();
    getDetainStudentInfo();
}

function getDetainStudentInfo()
{
    $csrf = $("#_csrf").val();
    $("#EDIT_studentinfo").html('');
    var formdata = $('#form_detain_serailize_EDIT :input').serialize();   
    var url = BASEURL + "attendance/umsdetainstudent/getstudentdetaininfo";
    $("#EDIT_studentinfo").html('');
    $.ajax
    ({
        type: "POST",
        url: url,
        dataType: "json",
        data:
        {
        formdata: formdata,
        _csrf:$csrf
        },
        success: function (data) 
        {         
        var status_id = data.STATUS_ID;
        var res = data.STATUS_RESPONSE; 
        
        if(status_id=="000")
        {
         $("#EDIT_studentinfo").html(res);         
        }
        else
        {
            PU_validation("<li>"+res+"</li>");            
        }
        stopLoader();
        }
    });  
}




function validateedoc(){
   var error = '';
    
    /************************* Assign_Department **************************************************/
    var Assign_Department = $.trim($("#Assign_Department").val());
    $("#Assign_Department").val(Assign_Department);    
    if (!Assign_Department)
    {
            error = error + "<li>Select Department</li>";
            PU_validation(error);
            return false;
    }
    
    /************************* Assign_Course **************************************************/
    var Assign_Course = $.trim($("#Assign_Course").val());
    $("#Assign_Course").val(Assign_Course);    
    if (!Assign_Course)
    {
            error = error + "<li>Select Course</li>";
            PU_validation(error);
            return false;
    }
	
	var actionSelect = $.trim($("#actionSelect").val());
    $("#actionSelect").val(actionSelect);    
    if (!actionSelect)
    {
            error = error + "<li>Select Batch</li>";
            PU_validation(error);
            return false;
    }
	
	var semesterId = $.trim($("#semesterId").val());
    $("#semesterId").val(semesterId);    
    if (!semesterId)
    {
            error = error + "<li>Select Semester</li>";
            PU_validation(error);
            return false;
    }
    
    var Subject_Type = $.trim($("#Subject_Type").val());
    $("#Subject_Type").val(Subject_Type);    
    if (!Subject_Type)
    {
            error = error + "<li>Select Type</li>";
            PU_validation(error);
            return false;
    }
    
     var subjectId = $.trim($("#subjectId").val());
    $("#subjectId").val(subjectId);    
    if (!subjectId)
    {
            error = error + "<li>Select Subject</li>";
            PU_validation(error);
            return false;
     }
     
	var frm_title = $.trim($("#frm_title").val());
    $("#frm_title").val(frm_title);    
    if (!frm_title)
    {
            error = error + "<li>Title Required</li>";
            PU_validation(error);
            return false;
    }
    else
    {
        if(!validString(frm_title))
        {
          error = error + "<li>Valid Title Required</li>";
            PU_validation(error);
            return false;  
        }
    }

    var frm_fileUpload = $.trim($("#frm_fileUpload").val());
    $("#frm_fileUpload").val(frm_fileUpload);    
    if (!frm_fileUpload)
    {
            error = error + "<li>Select File</li>";
            PU_validation(error);
            return false;
    }
    
    PU_hide_validation();
    startLoader();
    
}


function validateaddsubmenurole()
    {
     var error = '';
    /********************************* Assign_TypeofUser  ******************************************/
    var Assign_TypeofUser = $.trim($("#Assign_TypeofUser").val());
    $("#Assign_TypeofUser").val(Assign_TypeofUser);
    if (!Assign_TypeofUser)
    {
            error = error + "<li>Type of User Required</li>";
            PU_validation(error);
            return false;
    }
    
    getaddsubmenuroledetails();
    
    
}

function getaddsubmenuroledetails()
{
    PU_hide_validation();
    startLoader();
    $("#html_AssignActivityinfo").html("");
    var formdata = $(".main_Assign_Activity :input").serialize();
    var csrf = $("#_csrf").val();
	
    var url = BASEURL + "workflow/addsubmenurole/viewsubmenu";
	//alert(url);
     $.ajax({
        
        type: "POST",
        dataType: "json",
        url: url,
        data: {
            _csrf:csrf,
            formdata:formdata
        },
        success: function(data) {
            stopLoader();
            var status_id = data.STATUS_ID;
            var res = data.STATUS_RESPONSE;
            if(status_id=="000")
            $("#html_AssignActivityinfo").html(res);
            else
            {   
            PU_validation(res);
            return false;
            }
        
        }
    });
}


