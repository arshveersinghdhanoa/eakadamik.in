$(document).ready(function () {


    $('#class_wise_select').change(function () {
        var error = '';
        $(".class_wise_select_rollnumberDiv").hide();
        $(".calculateresult_RollNo").val('');
        $val = $(this).val();
        if ($val == "CW" || $val == "SW") {
            if ($val == "SW") {
                $(".class_wise_select_rollnumberDiv").show();
            }
        }
        else {
            error = error + "<li>Invalid Class/Student Wise Selection</li>";
            PU_validation(error);
            return false;
        }
    });

    $("#Reappear_Form_YearDiv").datepicker(
        {
            format: ' yyyy',
            viewMode: "years",
            minViewMode: "years",
            endYear: CURRENT_YEAR,
        }).on('changeDate', function () {
            var Reappear_Form_YearDiv = $(this).val();
            $(this).val(Reappear_Form_YearDiv);
            $(".datepicker").hide();
            $("#Reappear_Form_Session").val("");
        });

    $("#ReappearstudentList_YearDiv").datepicker(
        {
            format: ' yyyy',
            viewMode: "years",
            minViewMode: "years",
            endYear: CURRENT_YEAR,
        }).on('changeDate', function () {
            var ReappearstudentList_YearDiv = $(this).val();
            $(this).val(ReappearstudentList_YearDiv);
            $(".datepicker").hide();
            $("#ReappearstudentList_Session").val("");
        });

    $('.other_dept_faculty_select').change(function () {
        $("#reapearAssignSubject_div_info").html("");
    });


    $("body").on('click', '.other_dept_faculty_checkbox', function () {
        $("#Show_Hide_OtherDeptList").hide();
        $("#reapearAssignSubject_div_info").html("");
        $("#other_dept_faculty_select").val("");
        if ($(this).prop("checked"))
            $("#Show_Hide_OtherDeptList").show();

    });

    $("body").on('click', '.other_dept_Badmin_checkbox', function () {
        $(".Other_Department_BAdmin_Div").hide();
        $("#assign_Other_Department_Faculty").html("");
        $("#assign_Other_Department_Faculty").html("<option>Select Faculty</option>");
        $("#Assign_Badmin_Other_Department").val("");
        if ($(this).prop("checked"))
            $(".Other_Department_BAdmin_Div").show();

    });
    $('.ReappearFacultyHide').change(function () {
        $("#reapearAssignSubject_div_info").html("");
        $("#ReappearSubjectID").html("");
        $(".ViewReAppearAssignFaculty_btn").hide();
        $(".other_dept_faculty_div").hide();
        $("#Show_Hide_OtherDeptList").hide();
        $(".other_dept_faculty_checkbox").prop("checked", false);
        $("#other_dept_faculty_select").val("");
    });
    $("body").on('click', '.assignunassignreappearsubjectbyhod', function () {
        var error = '';
        $id = $(this).attr('id');
        var valu = $(this).val();
        var val_length = valu.length;
        var str = $id;
        var len = str.length;
        var fstr = parseInt(len) - parseInt(val_length);
        var lastid = str.substr(val_length, fstr);

        var facultyid = $("#facultyid" + lastid).val();
        var facultysubjectId = $("#subjectId" + lastid).val();
        var Rsession = $("#Rsession" + lastid).val();
        var Ryear = $("#Ryear" + lastid).val();
        if ($.trim(valu) == $.trim('Definalize')) {
            var Status = $("#Definalize" + lastid).val();
        }
        else {
            var Status = $("#status" + lastid).val();
        }
        var webtoken = $("#unassignjsonwebtoken").val();

        var Assign_Department = $('#Assign_Department').val();
        var Assign_Course = $('#Assign_Course').val();
        var semesterId = $('#semesterId').val();

        var AssignSubjectData = '';

        if (webtoken && facultyid && Rsession && Ryear) {
            if (Status == "Unassign") {
                if (!facultysubjectId) {
                    error = error + "<li>Invalid Request, Contact admin</li>";
                    PU_validation(error);
                    return false;
                }
            }
            if (!Assign_Department) {
                error = error + "<li>Select Department</li>";
                PU_validation(error);
                return false;
            }
            if (!Assign_Course) {
                error = error + "<li>Select Course</li>";
                PU_validation(error);
                return false;
            }

            if (!semesterId) {
                error = error + "<li>Select Semester</li>";
                PU_validation(error);
                return false;
            }

            if (Status == "Assign") {
                var chkDisplay = false;
                $("#ReappearSubjectID input[type=checkbox]").each(function () {
                    if ($(this).prop("checked")) {
                        chkDisplay = true;
                        return false;
                    }
                });

                if (!chkDisplay) {
                    error = error + "<li>Select Subject</li>";
                    PU_validation(error);
                    return false;
                }
                AssignSubjectData = $("#ReappearSubjectID :input").serialize();
            }

            var isSpecial = $(".is_Special_checkbox").val();



            PU_hide_validation();
            //alert("yesss");return false;
            Assignunassignreappearsubjectbyhod(AssignSubjectData, Status, webtoken, facultyid, facultysubjectId, Assign_Department, Assign_Course, semesterId, Rsession, Ryear, isSpecial);
        }
    });

    $('.new_Semester_SelectSubject').change(function () {
        PU_hide_validation();
        $(".ReappearSubject").hide();
        $(".ViewReAppearAssignFaculty_btn").hide();
        $(".other_dept_faculty_div").hide();
        $(".ReappearSubject").html($html);
        $csrf = $("#_csrf").val();
        $Semester = $(this).val();
        $deptid = $("#Assign_Department").val();
        $Assign_Course_ReAppear = $("#Assign_Course").val();

        $RYear = $.trim($("#ReappearstudentList_Year").val());
        $RSession = $.trim($("#ReappearstudentList_Session").val());

        if ($RYear && $RSession && $Semester && $deptid && $Assign_Course_ReAppear) {
            var is_Special_checkbox = $(".is_Special_checkbox").val();

            startLoader();
            var url = BASEURL + "examination/umsreappearassignsubject/getreappearassignunassignsubjects";
            startLoader();
            $.ajax({
                type: "POST",
                dataType: "json",
                url: url,
                data: { is_Special: is_Special_checkbox, RSession: $RSession, RYear: $RYear, Semester: $Semester, dept: $deptid, course: $Assign_Course_ReAppear, _csrf: $csrf },
                success: function (data) {
                    stopLoader();

                    var status_id = data.STATUS_ID;
                    var res = data.STATUS_RESPONSE;
                    if (status_id == "000") {
                        $(".ReappearSubject").html(res);
                        $(".ReappearSubject").show();
                        $(".ViewReAppearAssignFaculty_btn").show();
                        $(".other_dept_faculty_div").show();

                    }
                    else if (status_id == "333") {
                        $(".ReappearSubject").html(res);
                        $(".ReappearSubject").show();
                        $(".ViewReAppearAssignFaculty_btn").show();
                    }
                    else {
                        PU_validation(res);
                        return false;
                    }
                }
            });
        }

    });

    /******************************************************************************/

    $('body').on('click', '.ViewStudentDetail', function () {
        $("#viewreAppearstudentdetails_html").html('');
        $frm_id = $(this).attr('id');

        var formdata = $("." + $frm_id + " :input").serialize();

        var csrf = $("#_csrf").val();
        var url = BASEURL + "examination/umsreappearstudentlist/viewinfo";
        startLoader();
        $.ajax({

            type: "POST",
            dataType: "json",
            url: url,
            data: {
                _csrf: csrf,
                formdata: formdata,
            },
            success: function (data) {
                stopLoader();
                var status_id = data.STATUS_ID;
                var res = data.STATUS_RESPONSE;
                if (status_id == "000") {
                    $("#viewreAppearstudentdetails_html").html(res);
                    $("#viewreAppearstudentdetails").modal();
                }
                else {
                    PU_validation(res);
                    return false;
                }
            }
        });

    });

    $('.Assign_Course_ReAppear_Student').change(function () {

        $csrf = $("#_csrf").val();
        $Assign_Course_ReAppear = $(this).val();
        if ($Assign_Course_ReAppear) {
            startLoader();
            var url = BASEURL + "examination/umsreappearstudentlist/getsemesterbycourse";
            startLoader();
            $.ajax({
                type: "POST",
                dataType: "json",
                url: url,
                data: { course_id: $Assign_Course_ReAppear, _csrf: $csrf },
                success: function (data) {
                    stopLoader();
                    //var status_id = data.STATUS_ID;
                    var res = data.STATUS_RESPONSE;
                    $(".new_Semester_Select").html(res);
                }
            });
        }
        else {
            $html = "<option value=''>Select Semester</option>";
            $(".new_Semester_Select").html($html);
        }
    });

    /******************************************************************************/
    $('body').on('click', '.ProcessStudentReappearFinalize', function () {
        $("#ActionCall_ID").val("");
        $val = $(this).val();
        if ($val == "Reject") {
            $RejectRemarks = $.trim($("#RejectRemarks").val());
            $("#RejectRemarks").val($RejectRemarks);
            if (!$RejectRemarks) {
                PU_validation("Remarks Required");
                return false;
            }
            else {
                if (!validStringalphanumeric($RejectRemarks)) {
                    PU_validation("Only Aplha Numeric Remarks");
                    return false;
                }
            }
        }
        $("#ActionCall_ID").val($val);
        ProcessReappearAprrovalByBAdmin();
    });

    function ProcessReappearAprrovalByBAdmin() {
        startLoader();
        if (!$("#error_main").hasClass('alert-error'))
            $("#error_main").addClass('alert-error');
        $("#error_main").removeClass('alert-success');
        var formdata = $("#reapearStudentStatusList_div_info :input").serialize();
        var csrf = $("#_csrf").val();
        var url = BASEURL + "examination/umsreappearstudentstatus/process";
        $.ajax({

            type: "POST",
            dataType: "json",
            url: url,
            data: {
                _csrf: csrf,
                formdata: formdata,
            },
            success: function (data) {
                stopLoader();
                var status_id = data.STATUS_ID;
                var res = data.STATUS_RESPONSE;
                if (status_id == "000") {
                    $("#error_main").removeClass('alert-error');
                    $("#error_main").addClass('alert-success');
                    $("#reapearStudentStatusList_div_info").html("");

                }
                PU_validation(res);
                return false;
            }
        });
    }



    /*****************************************************************************/
    $('body').on('click', '.ProcessStudentReappearForm', function () {
        $("#ActionCall_ID").val("");
        $val = $(this).val();
        if ($val == "Reject") {
            $RejectRemarks = $.trim($("#RejectRemarks").val());
            $("#RejectRemarks").val($RejectRemarks);
            if (!$RejectRemarks) {
                PU_validation("Remarks Required");
                return false;
            }
            else {
                if (!validStringalphanumeric($RejectRemarks)) {
                    PU_validation("Only Aplha Numeric Remarks");
                    return false;
                }
            }
        }
        $("#ActionCall_ID").val($val);
        ProcessReappearAprrovalByBAsst();
    });

    function ProcessReappearAprrovalByBAsst() {
        startLoader();
        if (!$("#error_main").hasClass('alert-error'))
            $("#error_main").addClass('alert-error');
        $("#error_main").removeClass('alert-success');
        var formdata = $("#reapearStudentList_div_info :input").serialize();
        var csrf = $("#_csrf").val();
        var url = BASEURL + "examination/umsreappearstudentlist/process";
        $.ajax({

            type: "POST",
            dataType: "json",
            url: url,
            data: {
                _csrf: csrf,
                formdata: formdata,
            },
            success: function (data) {
                stopLoader();
                var status_id = data.STATUS_ID;
                var res = data.STATUS_RESPONSE;
                if (status_id == "000") {
                    $("#error_main").removeClass('alert-error');
                    $("#error_main").addClass('alert-success');
                    $("#reapearStudentList_div_info").html("");

                }
                PU_validation(res);
                return false;
            }
        });
    }

    $('.new_Semester_StatusChange').change(function () {
        $("#reapearStudentList_div_info").html("");
        $("#reapearStudentStatusList_div_info").html("");
    });

    $('.student_reappear_subjectsSemester').change(function () {
        $("#reapearSubjects_div_info").html("");
    });

    $('#log_date').datepicker({
        autoclose: true,
        format: "dd-mm-yyyy",
        //            startDate: ,
        endDate: '+0d',
    }).change(function () {
        emptydiv();
    });


    $('.accr_title').click(function () {
        $("#studentattendance").html('');
        $("#attsubbtn").css('display', 'none');
    });

    $('#semesterIdnew').change(function () {
        PU_hide_validation();
        $("#batchmarksinfo").html("");
        $secureKey = $("#secureKey").val();
        $secureHash = $("#secureHash").val();
        $batch_session = $("#batch_session").val();
        $semesterId = $(this).val();
        $csrf = $("#_csrf").val();
        if ($batch_session && $semesterId) {
            var Assign_Department = $('#Assign_Department').val();
            var Assign_Course = $('#Assign_Course').val();
            startLoader();
            var url = BASEURL + "result/uploadresult/getbatchsubjectlist";
            $.ajax({
                type: "POST",
                dataType: "json",
                url: url,
                data: {
                    _csrf: $csrf,
                    dept_id: Assign_Department,
                    courseid: Assign_Course,
                    batch: $batch_session,
                    semesterId: $semesterId,
                    secureKey: $secureKey,
                    secureHash: $secureHash,
                },
                success: function (data) {
                    stopLoader();
                    var status_id = data.STATUS_ID;
                    var res = data.STATUS_RESPONSE;
                    if (status_id == "000")
                        $("#batchmarksinfo").html(res);
                    else {
                        $("#batchmarksinfo").html('');
                        PU_validation(res);
                        return false;
                    }

                }
            });

        }

    });

    $("#freezeattendance").click(function () {
        if (!confirm("Are you sure you want to finalize attendance?")) {
            return false;
        }
    })
});

/*
 * 
 * Allow Numbers only
 */
function allowOnlyNumber(e) {
    if (e.which != 8 && e.which != 0 && (e.which < 48 || e.which > 57)) {
        return false;
    }
    return true
}

/*
 * Get Semester 
 */

function getSmester(val, sem_id) {
    $("#subjectId").html("<option value='ALL'>Select Subject</option>");
    $("#facultyinfo").html("");
    $("#assign_groups").html();
    $("#assign_groups").hide();
    startLoader();
    if (val && sem_id) {
        val = atob(val);

        if (!$.isNumeric(val)) {
            $("#" + sem_id).html('');
            $("#" + sem_id).html('<option value="">Select Semester</option>');
            stopLoader();
            return false;

        }

        if (val == 33 || val == 22) {
            $("#" + sem_id).html('');
            $("#" + sem_id).html('<option value="">Select Semester</option>');

            var num = 4;
            for (var i = 1; i <= num; i++) {
                $("#" + sem_id).append('<option value="' + i + '">' + i + '</option>');
            }
            stopLoader();
        }
        if (val == 11) {
            $("#" + sem_id).html('');
            $("#" + sem_id).html('<option value="">Select Semester</option>');

            var num = 8;
            for (var i = 1; i <= num; i++) {
                $("#" + sem_id).append('<option value="' + i + '">' + i + '</option>');
            }
            stopLoader();
        }
    } else {
        stopLoader();
        $("#" + sem_id).html('');
        $("#" + sem_id).html('<option value="">Select Semester</option>');
    }

}

/*
 * Validation Group Master
 */


function validategroupMaster() {
    PU_hide_validation();


    //    var clgId = $.trim($("#clgId").val());
    //    if(!clgId){
    //        var error = "<li>Select College</li>";
    //        PU_validation(error);
    //        return false;
    //    }
    var Assign_Department = $.trim($("#Assign_Department").val());
    if (!Assign_Department) {
        var error = "<li>Select Department</li>";
        PU_validation(error);
        return false;
    }
    var Assign_Course = $.trim($("#Assign_Course").val());
    if (!Assign_Course) {
        var error = "<li>Select Course</li>";
        PU_validation(error);
        return false;
    }
    var actionSelect = $.trim($("#actionSelect").val());
    if (!actionSelect) {
        var error = "<li>Select Batch</li>";
        PU_validation(error);
        return false;
    }
    var semesterId = $.trim($("#semesterId").val());
    if (!semesterId) {
        var error = "<li>Select Semester</li>";
        PU_validation(error);
        return false;
    }
    //    if(!validBatchWithSession())
    //        return false;
    PU_hide_validation();
    startLoader();
    CreateGroup();
}

/*
 * Validate Subject Master
 */



function CreateGroup() {
    $csrf = $("#_csrf").val();
    var formdata = $('#form_group_serailize :input').serialize();
    var url = BASEURL + "workflow/umsgroupmaster/creategroup";
    $.ajax({
        type: "POST",
        url: url,
        dataType: "json",
        data: {
            formdata: formdata,
            _csrf: $csrf
        },
        success: function (data) {

            var status_id = data.STATUS_ID;
            var res = data.STATUS_RESPONSE;
            //alert(BASEURL + res);
            window.location.replace(BASEURL + res);
            //window.location.href(res);
            //         if(status_id=="000" || status_id=="111")
            //        {
            //         window.location.href(res);
            //        }
            //        else
            //        {
            //            window.location.href(res)           
            //        }
        }
    });

}
function validateSubjectMaster() {
    PU_hide_validation();
    var error = '';




    var Assign_Department = $.trim($('#Assign_Department').val());
    if (!Assign_Department) {
        var error = "<li>Select Department</li>";
        PU_validation(error);
        return false;
    } else {
        if (!$.isNumeric(Assign_Department)) {
            var error = "<li>Invalid Department ID</li>";
            PU_validation(error);
            return false;
        }
    }

    var Assign_Course = $.trim($('#Assign_Course').val());

    if (!Assign_Course) {
        var error = "<li>Select Course</li>";
        PU_validation(error);
        return false;
    } else {
        if (!$.isNumeric(Assign_Course)) {
            var error = "<li>Invalid Course ID</li>";
            PU_validation(error);
            return false;
        }
    }

    /************************* SelectBatch **************************************************/
    var actionSelect = $.trim($("#actionSelect").val());
    $("#actionSelect").val(actionSelect);
    if (!actionSelect) {
        error = error + "<li>Select Batch</li>";
        PU_validation(error);
        return false;
    }


    var semesterId = $.trim($('#semesterId').val());
    if (!semesterId) {
        var error = "<li>Select Semester</li>";
        PU_validation(error);
        return false;
    } else {
        if (!$.isNumeric(semesterId)) {
            var error = "<li>Invalid Semester ID</li>";
            PU_validation(error);
            return false;
        }
    }

    var subjectCode = $.trim($("#subjectCode").val());
    $("#subjectCode").val(subjectCode);
    if (!subjectCode) {
        var error = "<li>Enter Subject Code</li>";
        PU_validation(error);
        return false;
    }
    else {
        if (!validsubjectcode(subjectCode)) {
            var error = "<li>Invalid Subject Code</li>";
            PU_validation(error);
            return false;
        }
    }

    var subjectName = $.trim($("#subjectName").val());
    $("#subjectName").val(subjectName);
    if (!subjectName) {
        var error = "<li>Enter Subject Name</li>";
        PU_validation(error);
        return false;
    }
    else {
        if (!validsubjectnameanddescription(subjectName)) {
            var error = "<li>Invalid Subject Name</li>";
            PU_validation(error);
            return false;
        }
    }

    var description = $.trim($("#description").val());
    $("#description").val(description);
    if (!description) {
        var error = "<li>Enter Description</li>";
        PU_validation(error);
        return false;
    }
    else {
        if (!validsubjectnameanddescription(description)) {
            var error = "<li>Invalid Description</li>";
            PU_validation(error);
            return false;
        }
    }

    if (!$("#subjectTypeTheory").is(':checked') && !$("#subjectTypePractical").is(':checked')) {
        var error = "<li>Select Subject Type</li>";
        PU_validation(error);
        return false;
    }

    var subjectLecture = $.trim($("#subjectLecture").val());
    $("#subjectLecture").val(subjectLecture);
    if (!subjectLecture) {
        var error = "<li>Enter Lectures /week</li>";
        PU_validation(error);
        return false;
    }
    else {
        if (!isInteger(subjectLecture)) {
            error = error + "<li>Lectures /week Only in Integer.</li>";
            PU_validation(error);
            return false;
        }
    }

    var subjectTutorial = $.trim($("#subjectTutorial").val());
    $("#subjectTutorial").val(subjectTutorial);
    if (!subjectTutorial) {
        var error = "<li>Enter Tutorials /week</li>";
        PU_validation(error);
        return false;
    }
    else {
        if (!isInteger(subjectTutorial)) {
            error = error + "<li>Tutorials /week Only in Integer.</li>";
            PU_validation(error);
            return false;
        }
    }


    var subjectInternalMarks = $.trim($("#subjectInternalMarks").val());
    $("#subjectInternalMarks").val(subjectInternalMarks);
    if (!subjectInternalMarks) {
        var error = "<li>Enter Internal Marks</li>";
        PU_validation(error);
        return false;
    }
    else {
        if (!isInteger(subjectInternalMarks)) {
            error = error + "<li>Internal Marks Only in Integer.</li>";
            PU_validation(error);
            return false;
        }
    }


    var subjectExternalMarks = $.trim($("#subjectExternalMarks").val());
    $("#subjectExternalMarks").val(subjectExternalMarks);
    if (!subjectExternalMarks) {
        var error = "<li>Enter External Marks</li>";
        PU_validation(error);
        return false;
    }
    else {
        if (!isInteger(subjectExternalMarks)) {
            error = error + "<li>External Marks Only in Integer.</li>";
            PU_validation(error);
            return false;
        }
    }

    var subjectPractical = $.trim($("#subjectPractical").val());
    $("#subjectPractical").val(subjectPractical);
    if (!subjectPractical) {
        var error = "<li>Enter Practicals /week Marks</li>";
        PU_validation(error);
        return false;
    }
    else {
        if (!isInteger(subjectPractical)) {
            error = error + "<li>Practicals /week Only in Integer.</li>";
            PU_validation(error);
            return false;
        }
    }

    var practicalMarks = $.trim($("#practicalMarks").val());
    $("#practicalMarks").val(practicalMarks);
    if (!practicalMarks) {
        var error = "<li>Enter Practicals /Marks Marks</li>";
        PU_validation(error);
        return false;
    }
    else {
        if (!isInteger(practicalMarks)) {
            error = error + "<li>Practicals /Marks Only in Integer.</li>";
            PU_validation(error);
            return false;
        }
    }


    var subjectCredit = $.trim($("#subjectCredit").val());
    $("#subjectCredit").val(subjectCredit);
    if (!subjectCredit) {
        var error = "<li>Enter Theory Credits Marks</li>";
        PU_validation(error);
        return false;
    }
    /* Fraction System***** 06-APRIL-2021
    else
    {
    if(!isInteger(subjectCredit)){
        error = error + "<li>Theory Credits Only in Integer.</li>";
        PU_validation(error);
        return false;
    }
    }
    ****/

    var practicalCredit = $.trim($("#practicalCredit").val());
    $("#practicalCredit").val(practicalCredit);
    if (!practicalCredit) {
        var error = "<li>Enter Practical Credits Marks</li>";
        PU_validation(error);
        return false;
    }

    /* Fraction System*****  06-APRIL-2021
    else
    {
    if(!isInteger(practicalCredit)){
        error = error + "<li>Practical Credits Only in Integer.</li>";
        PU_validation(error);
        return false;
    }
    }
    ****/

    //    if(!validBatchWithSession())   
    //    return false;

    PU_hide_validation();
    startLoader();
}
/*
 * Attendance Upload For Assigned Subjects 
 */

function getStudentAttendance1() {
    PU_hide_validation();
    $("#batchmarksinfo").html("");
    var secureKey = $("#secureKey").val();
    var secureHash = $("#secureHash").val();
    var batch_session = $("#batch_session").val();
    var Assign_Department = $("#Assign_Department").val();
    var Assign_Course = $("#Assign_Course").val();
    //    alert(batch_session);
    var semesterId = $("#semesterIda").val();
    var csrf = $("#_csrf").val();
    if (Assign_Department && Assign_Course && batch_session && semesterId) {
        startLoader();
        var url = BASEURL + "attendance/uplaodattendance/subjectlistattendance";
        $.ajax({
            type: "POST",
            dataType: "json",
            url: url,
            data: {
                _csrf: csrf,
                batch: batch_session,
                semesterId: semesterId,
                dept: Assign_Department,
                course: Assign_Course,
                secureKey: secureKey,
                secureHash: secureHash,
            },
            success: function (data) {
                stopLoader();
                var status_id = data.STATUS_ID;
                var res = data.STATUS_RESPONSE;
                if (status_id == '000') {
                    $("#detail_min").show();
                    $("#departmentdetail").hide(500);
                    $("#subjectlist_attendance").html(res);
                    $("#grouplistattendance").html('');
                } else {
                    $("#subjectlist_attendance").html('');
                    $("#grouplistattendance").html('');
                    var error = "<li>" + res + "</li>";
                    PU_validation(error);
                    return false;
                }

            }
        });
    } else {
        $("#studentattendance").html('');
    }
}

/*
 * View Student
 */
function ViewStudent() {
    PU_hide_validation();
    var allgroups = [];
    $('#checkgrups input:checkbox:checked').each(function (i) {
        allgroups[i] = $(this).val();
    });

    if (allgroups.length === 0) {
        var error = "<li>Select any one group</li>";
        PU_validation(error);
        return false;
    }
    var attendance_date = $("#attendance_date").val();
    if (!attendance_date) {
        var error = "<li>Select Date</li>";
        PU_validation(error);
        return false;
    }

    var lecture = $("#lecture").val();
    if (!lecture) {
        var error = "<li>Select Lecture</li>";
        PU_validation(error);
        return false;
    } else {
        if (!$.isNumeric(lecture)) {
            var error = "<li>Invalid Lecture ID</li>";
            PU_validation(error);
            return false;
        }
    }
    startLoader();
    var formdata = $("#validateViewStudentlist :input").serialize();
    var csrf = $("#_csrf").val();
    var url = BASEURL + "attendance/uplaodattendance/groupstudentslist";
    $.ajax({
        type: "POST",
        dataType: "json",
        url: url,
        data: {
            _csrf: csrf,
            formdata: formdata
        },
        success: function (data) {
            stopLoader();
            //            alert(data);return false;
            var status_id = data.STATUS_ID;
            var res = data.STATUS_RESPONSE;
            $("#form_mark_attendance").show();
            if (status_id == '000') {
                $("#attsubbtn").show();
                $("#studentattendance").html(res);
                $("#studentattendance").append("<input type='hidden' readonly='readonly' value='" + lecture + "' name='StudentInfo[lecture]' />");
                $("#attendancedate").val(attendance_date);
            } else {
                $("#attsubbtn").hide();
                $("#studentattendance").html('');
                //                $("#studentattendance").html("No Records Found");
                var error = "<li>" + res + "</li>";
                PU_validation(error);
                return false;
            }

        }
    });
}


/*
 * Mark Attendance
 */

function changeAttendance(id) {
    if ($("#chkattid" + id).is(':checked')) {
        $("#newchk" + id).val('P');
    } else {
        $("#newchk" + id).val('A');
    }

}

/*
 * Mark absent all student
 */

function markAbsentDailyAttendanceAll() {
    if ($("#dailyabsentmark").is(':checked')) {
        $('#studentattendance').find('input[type=checkbox]:checked').each(function () {
            $(this).removeAttr('checked');
        });

        $('#studentattendance').find('input[type=hidden]').each(function () {
            if ($(this).hasClass('absentpresent')) {
                $(this).val('A');
            }
        });
        $('#dailyabsentmark').prop("checked", true);
    } else {
        $('#studentattendance').find('input[type=checkbox]').each(function () {
            $(this).prop("checked", true);
        });

        $('#studentattendance').find('input[type=hidden]').each(function () {
            if ($(this).hasClass('absentpresent')) {
                $(this).val('P');
            }
        });
        $("#dailyabsentmark").removeAttr('checked');
    }
}

/*
 * Validate Calculator Result
 */

function validateCalculateResult() {

    PU_hide_validation();



    var Assign_Department = $("#Assign_Department").val();
    var error = '';
    if (!Assign_Department) {
        error = "<li>Select Department</li>";
        PU_validation(error);
        return false;
    } else {
        if (!isInteger(Assign_Department)) {
            error = error + "<li>Invalid Department ID</li>";
            PU_validation(error);
            return false;
        }
    }

    var Assign_Course = $("#Assign_Course").val();
    if (!Assign_Course) {
        error = "<li>Select Course</li>";
        PU_validation(error);
        return false;
    } else {
        if (!isInteger(Assign_Course)) {
            error = error + "<li>Invalid Course ID</li>";
            PU_validation(error);
            return false;
        }
    }
    var session_yr = $("#session_yr").val();

    if (!session_yr) {
        error = "<li>Select Batch</li>";
        PU_validation(error);
        return false;
    }
    var semesterId = $("#semesterId").val();
    if (!semesterId) {
        error = "<li>Select Semester </li>";
        PU_validation(error);
        return false;
    } else {
        if (!isInteger(semesterId)) {
            error = error + "<li>Invalid Semester ID</li>";
            PU_validation(error);
            return false;
        }
    }
    $class_wise_select = $.trim($(".class_wise_select").val());
    $(".class_wise_select").val($class_wise_select);
    if ($class_wise_select == "CW" || $class_wise_select == "SW") {
        if ($class_wise_select == "SW") {

            $calculateresult_RollNo = $.trim($(".calculateresult_RollNo").val());
            $(".calculateresult_RollNo").val($calculateresult_RollNo);
            if (!$calculateresult_RollNo) {
                error = error + "<li>Enter Roll Number</li>";
                PU_validation(error);
                return false;
            }

        }
    }
    else {
        error = error + "<li>Invalid Class/Student Wise Selection</li>";
        PU_validation(error);
        return false;
    }

    startLoader();
    $("#html_viewCalculateResult").html("");
    var formdata = $("#frm_calculate_result :input").serialize();
    var csrf = $("#_csrf").val();
    var url = BASEURL + "result/calculateresult/viewresult";
    $.ajax({
        type: "POST",
        dataType: "json",
        url: url,
        data: {
            _csrf: csrf,
            formdata: formdata
        },
        success: function (data) {
            stopLoader();
            //            alert(data);return false;
            if (data.STATUS_ID == '000') {
                $("#html_viewCalculateResult").html(data.STATUS_RESPONSE);
            }
            if (data.STATUS_ID == '111') {
                $("#html_viewCalculateResult").html('');
                //                $("#html_viewCalculateResult").html(data.STATUS_RESPONSE);
                error = "<li>" + data.STATUS_RESPONSE + "</li>";
                PU_validation(error);
                return false;
            }
        }
    });
}

/*
 * View Student Details
 */

function viewStudentDetails(key) {
    //    alert(key);
    if (key) {
        if (!isInteger(key)) {
            return false;
        }
        var id = "studentdetail_key" + key;
        //        alert(id)
        //        startLoader();
        $("#infostudentid").html("");

        var formdata = $("#" + id + " :input").serialize();

        var csrf = $("#_csrf").val();
        var url = BASEURL + "result/calculateresult/viewstudentresult";
        $.ajax({
            type: "POST",
            dataType: "json",
            url: url,
            data: {
                _csrf: csrf,
                formdata: formdata
            },
            success: function (data) {
                stopLoader();
                //                alert(data);return false;
                if (data.STATUS_ID == '000') {
                    $("#infostudentid").html(data.STATUS_RESPONSE);
                }
                if (data.STATUS_ID == '111') {
                    $("#infostudentid").html('');
                    //                    $("#infostudentid").html(data.STATUS_RESPONSE);
                    var error = "<li>" + data.STATUS_RESPONSE + "</li>";
                    PU_validation(error);
                    return false;
                }
            }
        });
        $("#model_student_model").modal();
    }
}

/*
 * Validate View Result
 */

function validate_ViewResult() {
    PU_hide_validation();
    $("#course_name").val('');
    $("#dept_name").val('');


    var Assign_Department = $("#Assign_Department").val();
    if (!Assign_Department) {
        var error = "<li>Select Department </li>";
        PU_validation(error);
        return false;
    } else {
        if (!isInteger(Assign_Department)) {
            error = error + "<li>Invalid Department ID</li>";
            PU_validation(error);
            return false;
        }
    }
    var Departmentname = $('#Assign_Department option:selected').text();
    $("#dept_name").val(Departmentname);
    var Assign_Course = $("#Assign_Course").val();
    if (!Assign_Course) {
        var error = "<li>Select Course </li>";
        PU_validation(error);
        return false;
    } else {
        if (!isInteger(Assign_Course)) {
            error = error + "<li>Invalid Course ID</li>";
            PU_validation(error);
            return false;
        }
    }
    var coursename = $('#Assign_Course option:selected').text();
    $("#course_name").val(coursename);
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
    } else {
        if (!isInteger(semesterId)) {
            error = error + "<li>Invalid Semester ID</li>";
            PU_validation(error);
            return false;
        }
    }

    $class_wise_select = $.trim($(".class_wise_select").val());
    $(".class_wise_select").val($class_wise_select);
    if ($class_wise_select == "CW" || $class_wise_select == "SW") {
        if ($class_wise_select == "SW") {

            $calculateresult_RollNo = $.trim($(".calculateresult_RollNo").val());
            $(".calculateresult_RollNo").val($calculateresult_RollNo);
            if (!$calculateresult_RollNo) {
                var error = "<li>Enter Roll Number</li>";
                PU_validation(error);
                return false;
            }

        }
    }
    else {
        var error = "<li>Invalid Class/Student Wise Selection</li>";
        PU_validation(error);
        return false;
    }

}


/*
 * Validate View Result Student
 */

function validate_ViewResultStudent() {
    PU_hide_validation();
    $("#course_name").val('');
    $("#dept_name").val('');


    var Assign_Department = $("#Assign_Department_student").val();
    if (!Assign_Department) {
        var error = "<li>Select Department </li>";
        PU_validation(error);
        return false;
    } else {
        if (!isInteger(Assign_Department)) {
            error = error + "<li>Invalid Department ID</li>";
            PU_validation(error);
            return false;
        }
    }
    var Departmentname = $('#Assign_Department_student option:selected').text();
    $("#dept_name").val(Departmentname);
    var Assign_Course = $("#Assign_Course").val();
    if (!Assign_Course) {
        var error = "<li>Select Course </li>";
        PU_validation(error);
        return false;
    } else {
        if (!isInteger(Assign_Course)) {
            error = error + "<li>Invalid Course ID</li>";
            PU_validation(error);
            return false;
        }
    }
    var coursename = $('#Assign_Course option:selected').text();
    $("#course_name").val(coursename);
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
    } else {
        if (!isInteger(semesterId)) {
            error = error + "<li>Invalid Semester ID</li>";
            PU_validation(error);
            return false;
        }
    }

}

function validate_ViewReAppearSubjects() {
    PU_hide_validation();
    $("#reapearSubjects_div_info").html("");
    $("#course_name").val('');
    $("#dept_name").val('');
    var error = '';

    var Assign_Department = $("#Assign_Department_student").val();
    if (!Assign_Department) {
        var error = "<li>Select Department </li>";
        PU_validation(error);
        return false;
    } else {
        if (!isInteger(Assign_Department)) {
            error = error + "<li>Invalid Department ID</li>";
            PU_validation(error);
            return false;
        }
    }
    var Departmentname = $('#Assign_Department_student option:selected').text();
    $("#dept_name").val(Departmentname);
    var Assign_Course = $("#Assign_Course").val();
    if (!Assign_Course) {
        var error = "<li>Select Course </li>";
        PU_validation(error);
        return false;
    } else {
        if (!isInteger(Assign_Course)) {
            error = error + "<li>Invalid Course ID</li>";
            PU_validation(error);
            return false;
        }
    }
    var coursename = $('#Assign_Course option:selected').text();
    $("#course_name").val(coursename);
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
    } else {
        if (!isInteger(semesterId)) {
            error = error + "<li>Invalid Semester ID</li>";
            PU_validation(error);
            return false;
        }
    }

    /************************* Reappear_Form_Year **************************************************/
    var Reappear_Form_Year = $.trim($("#Reappear_Form_Year").val());
    $("#Reappear_Form_Year").val(Reappear_Form_Year);
    if (!Reappear_Form_Year) {
        error = error + "<li>Year Required</li>";
        PU_validation(error);
        return false;
    }

    /************************* Reappear_Form_Session **************************************************/
    var Reappear_Form_Session = $.trim($("#Reappear_Form_Session").val());
    $("#Reappear_Form_Session").val(Reappear_Form_Session);
    if (!Reappear_Form_Session) {
        error = error + "<li>Session Required</li>";
        PU_validation(error);
        return false;
    }

    ViewReappaeraSubjects();

}

function ViewReappaeraSubjects() {
    startLoader();
    $("#reapearSubjects_div_info").html("");
    var formdata = $("#frm_reapearSubjects_div_info :input").serialize();
    var csrf = $("#_csrf").val();
    var url = BASEURL + "examination/umsreappearformstudent/viewreappearsubjectlist";
    $.ajax({

        type: "POST",
        dataType: "json",
        url: url,
        data: {
            _csrf: csrf,
            formdata: formdata
        },
        success: function (data) {
            stopLoader();
            var status_id = data.STATUS_ID;
            var res = data.STATUS_RESPONSE;
            if (status_id == "000") {
                $("#reapearSubjects_div_info").html(res);
            }
            else {
                PU_validation(res);
                return false;
            }

        }
    });
}


function validate_ViewReAppearAssignFacultyList() {
    PU_hide_validation();
    $("#course_name").val('');
    $("#dept_name").val('');

    $("#reapearStudentList_div_info").html("");
    var Assign_Department = $("#Assign_Department").val();
    if (!Assign_Department) {
        var error = "<li>Select Department </li>";
        PU_validation(error);
        return false;
    } else {
        if (!isInteger(Assign_Department)) {
            error = error + "<li>Invalid Department ID</li>";
            PU_validation(error);
            return false;
        }
    }
    var Departmentname = $('#Assign_Department option:selected').text();
    $("#Reappearsubjectdepartment_name").val(Departmentname);
    var Assign_Course = $("#Assign_Course").val();
    if (!Assign_Course) {
        var error = "<li>Select Course </li>";
        PU_validation(error);
        return false;
    } else {
        if (!isInteger(Assign_Course)) {
            error = error + "<li>Invalid Course ID</li>";
            PU_validation(error);
            return false;
        }
    }
    var coursename = $('#Assign_Course option:selected').text();
    $("#Reappearsubjectcourse_name").val(coursename);

    var semesterId = $("#semesterId").val();
    if (!semesterId) {
        var error = "<li>Select Semester </li>";
        PU_validation(error);
        return false;
    } else {
        if (!isInteger(semesterId)) {
            error = error + "<li>Invalid Semester ID</li>";
            PU_validation(error);
            return false;
        }
    }
    $chk_OtherDept = $(".other_dept_faculty_checkbox").prop("checked");
    if ($chk_OtherDept) {
        $chk_OtherDept_Id = $("#other_dept_faculty_select").val();
        if (!$chk_OtherDept_Id) {
            var error = "<li>Select other department</li>";
            PU_validation(error);
            return false;
        }
    }

    ViewReappaeraAssignUnAssignFacultyList();

}

function ViewReappaeraAssignUnAssignFacultyList() {
    startLoader();
    $("#reapearAssignSubject_div_info").html("");
    var formdata = $("#frm_reapearAssignSubject_div_info :input").serialize();
    var csrf = $("#_csrf").val();
    var url = BASEURL + "examination/umsreappearassignsubject/viewfacultylist";
    $.ajax({
        type: "POST",
        dataType: "json",
        url: url,
        data: {
            _csrf: csrf,
            formdata: formdata
        },
        success: function (data) {
            stopLoader();
            var status_id = data.STATUS_ID;
            var res = data.STATUS_RESPONSE;
            if (status_id == "000") {
                $("#reapearAssignSubject_div_info").html(res);
            }
            else {
                PU_validation(res);
                return false;
            }

        }
    });
}


/******************************************************************************/
function validate_ViewReAppearCompleteStudentList($viewDownload) {
    PU_hide_validation();
    $("#course_name").val('');
    $("#dept_name").val('');

    $("#reapearStudentList_div_info").html("");
    var Assign_Department = $("#Assign_Department").val();
    if (!Assign_Department) {
        var error = "<li>Select Department </li>";
        PU_validation(error);
        return false;
    } else {
        if (!isInteger(Assign_Department)) {
            error = error + "<li>Invalid Department ID</li>";
            PU_validation(error);
            return false;
        }
    }
    var Departmentname = $('#Assign_Department option:selected').text();
    $("#Reappearstudentdepartment_name").val(Departmentname);
    var Assign_Course = $("#Assign_Course").val();
    if (!Assign_Course) {
        var error = "<li>Select Course </li>";
        PU_validation(error);
        return false;
    } else {
        if (!isInteger(Assign_Course)) {
            error = error + "<li>Invalid Course ID</li>";
            PU_validation(error);
            return false;
        }
    }
    var coursename = $('#Assign_Course option:selected').text();
    $("#Reappearstudentcourse_name").val(coursename);

    var semesterId = $("#semesterId").val();
    if (!semesterId) {
        var error = "<li>Select Semester </li>";
        PU_validation(error);
        return false;
    } else {
        if (!isInteger(semesterId)) {
            error = error + "<li>Invalid Semester ID</li>";
            PU_validation(error);
            return false;
        }
    }

    if ($viewDownload == "V")
        ViewReappaeraCompleteStudentList();
    else {
        downloadReappearListExcel();
    }

}

function ViewReappaeraCompleteStudentList() {
    startLoader();
    $("#reapearStudentList_div_info").html("");
    var formdata = $("#frm_reapearStudentList_info :input").serialize();
    var csrf = $("#_csrf").val();
    var url = BASEURL + "examination/umsreappearstudentcompletelist/viewreappearstudentlist";
    $.ajax({
        type: "POST",
        dataType: "json",
        url: url,
        data: {
            _csrf: csrf,
            formdata: formdata
        },
        success: function (data) {
            stopLoader();
            var status_id = data.STATUS_ID;
            var res = data.STATUS_RESPONSE;
            if (status_id == "000") {
                $("#reapearStudentList_div_info").html(res);
            }
            else {
                PU_validation(res);
                return false;
            }

        }
    });
}

function validate_ViewReAppearStudentList() {
    PU_hide_validation();
    $("#course_name").val('');
    $("#dept_name").val('');

    $("#reapearStudentList_div_info").html("");
    var Assign_Department = $("#Assign_Department").val();
    if (!Assign_Department) {
        var error = "<li>Select Department </li>";
        PU_validation(error);
        return false;
    } else {
        if (!isInteger(Assign_Department)) {
            error = error + "<li>Invalid Department ID</li>";
            PU_validation(error);
            return false;
        }
    }
    var Departmentname = $('#Assign_Department option:selected').text();
    $("#Reappearstudentdepartment_name").val(Departmentname);
    var Assign_Course = $("#Assign_Course").val();
    if (!Assign_Course) {
        var error = "<li>Select Course </li>";
        PU_validation(error);
        return false;
    } else {
        if (!isInteger(Assign_Course)) {
            error = error + "<li>Invalid Course ID</li>";
            PU_validation(error);
            return false;
        }
    }
    var coursename = $('#Assign_Course option:selected').text();
    $("#Reappearstudentcourse_name").val(coursename);

    var semesterId = $("#semesterId").val();
    if (!semesterId) {
        var error = "<li>Select Semester </li>";
        PU_validation(error);
        return false;
    } else {
        if (!isInteger(semesterId)) {
            error = error + "<li>Invalid Semester ID</li>";
            PU_validation(error);
            return false;
        }
    }

    var ReappearstudentActionId = $("#ReappearstudentActionId").val();
    if (!ReappearstudentActionId) {
        var error = "<li>Select Action </li>";
        PU_validation(error);
        return false;
    }

    var ReappearstudentList_Year = $.trim($("#ReappearstudentList_Year").val());
    $("#ReappearstudentList_Year").val(ReappearstudentList_Year);
    if (!ReappearstudentList_Year) {
        var error = "<li>Select Year </li>";
        PU_validation(error);
        return false;
    }

    var ReappearstudentList_Session = $.trim($("#ReappearstudentList_Session").val());
    $("#ReappearstudentList_Session").val(ReappearstudentList_Session);
    if (!ReappearstudentList_Session) {
        var error = "<li>Select Session </li>";
        PU_validation(error);
        return false;
    }

    ViewReappaeraStudentList();

}

function ViewReappaeraStudentList() {
    startLoader();
    $("#reapearStudentList_div_info").html("");
    var formdata = $("#frm_reapearStudentList_info :input").serialize();
    var csrf = $("#_csrf").val();
    var url = BASEURL + "examination/umsreappearstudentlist/viewreappearstudentlist";
    $.ajax({
        type: "POST",
        dataType: "json",
        url: url,
        data: {
            _csrf: csrf,
            formdata: formdata
        },
        success: function (data) {
            stopLoader();
            var status_id = data.STATUS_ID;
            var res = data.STATUS_RESPONSE;
            if (status_id == "000") {
                $("#reapearStudentList_div_info").html(res);
            }
            else {
                PU_validation(res);
                return false;
            }

        }
    });
}


function validate_ViewReAppearStudentStatusList() {
    PU_hide_validation();
    $("#course_name").val('');
    $("#dept_name").val('');


    var Assign_Department = $("#Assign_Department").val();
    if (!Assign_Department) {
        var error = "<li>Select Department </li>";
        PU_validation(error);
        return false;
    } else {
        if (!isInteger(Assign_Department)) {
            error = error + "<li>Invalid Department ID</li>";
            PU_validation(error);
            return false;
        }
    }
    var Departmentname = $('#Assign_Department option:selected').text();
    $("#Reappearstudentdepartment_name").val(Departmentname);
    var Assign_Course = $("#Assign_Course").val();
    if (!Assign_Course) {
        var error = "<li>Select Course </li>";
        PU_validation(error);
        return false;
    } else {
        if (!isInteger(Assign_Course)) {
            error = error + "<li>Invalid Course ID</li>";
            PU_validation(error);
            return false;
        }
    }
    var coursename = $('#Assign_Course option:selected').text();
    $("#Reappearstudentcourse_name").val(coursename);

    var semesterId = $("#semesterId").val();
    if (!semesterId) {
        var error = "<li>Select Semester </li>";
        PU_validation(error);
        return false;
    } else {
        if (!isInteger(semesterId)) {
            error = error + "<li>Invalid Semester ID</li>";
            PU_validation(error);
            return false;
        }
    }

    var ReappearstudentList_Year = $.trim($("#ReappearstudentList_Year").val());
    $("#ReappearstudentList_Year").val(ReappearstudentList_Year);
    if (!ReappearstudentList_Year) {
        var error = "<li>Select Year </li>";
        PU_validation(error);
        return false;
    }

    var ReappearstudentList_Session = $.trim($("#ReappearstudentList_Session").val());
    $("#ReappearstudentList_Session").val(ReappearstudentList_Session);
    if (!ReappearstudentList_Session) {
        var error = "<li>Select Session </li>";
        PU_validation(error);
        return false;
    }


    ViewReappaeraStudentStatusList();

}

function ViewReappaeraStudentStatusList() {
    startLoader();
    $("#reapearStudentStatusList_div_info").html("");
    var formdata = $("#frm_reapearStudentStatusList_info :input").serialize();
    var csrf = $("#_csrf").val();
    var url = BASEURL + "examination/umsreappearstudentstatus/viewreappearstudentlist";
    $.ajax({

        type: "POST",
        dataType: "json",
        url: url,
        data: {
            _csrf: csrf,
            formdata: formdata
        },
        success: function (data) {
            stopLoader();
            var status_id = data.STATUS_ID;
            var res = data.STATUS_RESPONSE;
            if (status_id == "000") {
                $("#reapearStudentStatusList_div_info").html(res);
            }
            else {
                PU_validation(res);
                return false;
            }

        }
    });
}



function validate_ViewReAppearStatus() {
    PU_hide_validation();
    $("#course_name").val('');
    $("#dept_name").val('');


    var Assign_Department = $("#Assign_Department").val();
    if (!Assign_Department) {
        var error = "<li>Select Department </li>";
        PU_validation(error);
        return false;
    }

    var Departmentname = $('#Assign_Department option:selected').text();
    $("#Reappearstudentdepartment_name").val(Departmentname);
    var Assign_Course = $("#Assign_Course").val();
    if (!Assign_Course) {
        var error = "<li>Select Course </li>";
        PU_validation(error);
        return false;
    }

    var coursename = $('#Assign_Course option:selected').text();
    $("#Reappearstudentcourse_name").val(coursename);

    var semesterId = $("#semesterId").val();
    if (!semesterId) {
        var error = "<li>Select Semester </li>";
        PU_validation(error);
        return false;
    }

    var report_action = $("#report_action").val();
    if (!report_action) {
        var error = "<li>Select Action </li>";
        PU_validation(error);
        return false;
    }

    var ReappearstudentList_Year = $.trim($("#ReappearstudentList_Year").val());
    $("#ReappearstudentList_Year").val(ReappearstudentList_Year);
    if (!ReappearstudentList_Year) {
        var error = "<li>Select Year </li>";
        PU_validation(error);
        return false;
    }

    var ReappearstudentList_Session = $.trim($("#ReappearstudentList_Session").val());
    $("#ReappearstudentList_Session").val(ReappearstudentList_Session);
    if (!ReappearstudentList_Session) {
        var error = "<li>Select Session </li>";
        PU_validation(error);
        return false;
    }


    DownloadReappaeraStatus();

}

function DownloadReappaeraStatus() {
    startLoader();
    $("#reapearStudentStatusList_div_info").html("");
    var formdata = $("#frm_reapearStudentStatusList_info :input").serialize();
    var csrf = $("#_csrf").val();
    var url = BASEURL + "examination/umsreappearstatusreport/download";
    $.ajax({

        type: "POST",
        dataType: "json",
        url: url,
        data: {
            _csrf: csrf,
            formdata: formdata
        },
        success: function (data) {
            var status_id = data.STATUS_ID;
            var res = data.STATUS_RESPONSE;
            stopLoader();
            var downloadurl = BASEURL + "attendance/umsshortattendancetxnstatus/downloadfile?filename=" + res;
            if (status_id == "000") {
                window.location.href = downloadurl;

            }
            else {
                PU_validation(res);
                return false;
            }

        }
    });
}


function ExtractElectiveSubject($actionSelect, $Validate, $Group_For, $Assign_Department, $Assign_Course, $semesterId) {

    var url = BASEURL + "workflow/umsgroupmaster/extractelectivesubject";
    var $resReturn;
    $csrf = $("#_csrf").val();
    startLoader();
    $.ajax({
        type: "POST",
        url: url,
        dataType: "json",
        data: {
            _csrf: $csrf,
            Department: $Assign_Department,
            Course: $Assign_Course,
            Semester: $semesterId,
            Group_For: $Group_For,
            Validate: $Validate,
            Batch: $actionSelect
        },
        success: function (data) {
            var status_id = data.STATUS_ID;
            var res = data.STATUS_RESPONSE;
            stopLoader();
            if (status_id == "000") {
                $("#Elective_Subject_For").html(res);
                $("#Elective_Subject_For").show();
                $resReturn = true;
            }
            else {
                $("#Elective_Subject_For").html('');
                PU_validation("<li>" + res + "</li>");
                $resReturn = false;
            }
            stopLoader();

        }
    });
    return $resReturn;


}



//Validate View / Update Scheme

function validate_ViewScheme() {
    PU_hide_validation();
    $("#viewhtmlscheme").html('');


    var Assign_Department = $("#Assign_Department").val();
    if (!Assign_Department) {
        var error = "<li>Select Department </li>";
        PU_validation(error);
        return false;
    } else {
        if (!isInteger(Assign_Department)) {
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
    } else {
        if (!isInteger(Assign_Course)) {
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
    } else {
        if (!isInteger(semesterId)) {
            error = error + "<li>Invalid Semester ID</li>";
            PU_validation(error);
            return false;
        }
    }
    var secureKey = $("#secureKey").val();
    var url = BASEURL + "schemes/viewschemeums/viewscheme";
    var $resReturn;
    $csrf = $("#_csrf").val();
    startLoader();
    $.ajax({
        type: "POST",
        url: url,
        dataType: "json",
        data: {
            _csrf: $csrf,
            session: actionSelect,
            Department: Assign_Department,
            Course: Assign_Course,
            Semester: semesterId,
        },
        success: function (data) {

            var status_id = data.STATUS_ID;
            var res = data.STATUS_RESPONSE;
            //alert(res);
            if (status_id == "000") {
                $("#viewhtmlscheme").html(res);
                $("#viewhtmlscheme").append("<input type='hidden' value='" + actionSelect + "' name='session_year' />");
                $("#viewhtmlscheme").append("<input type='hidden' value='" + Assign_Department + "' name='Assign_Department' />");
                $("#viewhtmlscheme").append("<input type='hidden' value='" + Assign_Course + "' name='Assign_Course' />");
                $("#viewhtmlscheme").append("<input type='hidden' value='" + semesterId + "' name='semesterId' />");
                $("#viewhtmlscheme").append("<input type='hidden' value='" + secureKey + "' name='secureKey' />");
                $("#btnsubmit").show();
                var aaa = '<button type="button" class="btn btn-primary" onclick="return editscheme()">Edit Scheme</button>';

                $("#btnsubmit").html('');
                $("#btnsubmit").html(aaa);

            }
            else {
                $("#viewhtmlscheme").html('');
                PU_validation("<li>" + res + "</li>");
                $resReturn = false;
            }
            stopLoader();

        }
    });

}

function editscheme() {
    $('#editscheme input').removeAttr('readonly');
    var aaa = '<button type="submit" class="btn btn-primary" onclick="return updatescheme()">Update Scheme</button>';

    $("#btnsubmit").html('');
    $("#btnsubmit").html(aaa);
}

function updatescheme() {
    PU_hide_validation();
    $("#checks").val('');
    $('#viewhtmlscheme :input').each(function (i) {
        if (!$(this).val()) {
            var aa = $(this).data('check') + " cannot empty.";
            $("#checks").val(aa);

        }
    });
    if ($("#checks").val()) {
        var error = "<li>" + $("#checks").val() + "</li>";
        PU_validation(error);
        return false;
    }
}

function validateExcelSheet() {
    PU_hide_validation();
    var checkexcel = $("#checkexcel").val();
    if (!checkexcel) {
        var error = "<li>Upload Excel Sheet</li>";
        PU_validation(error);
        return false;
    }
}

function ConsolidateStudent() {
    $("#consolidate_attsubbtn").hide();
    $("#consolidate_studentattendance").html('');
    PU_hide_validation();
    var allgroups = [];
    $('#checkgrups_consolidate input:checkbox:checked').each(function (i) {
        allgroups[i] = $(this).val();
    });

    if (allgroups.length === 0) {
        var error = "<li>Select any one group</li>";
        PU_validation(error);
        return false;
    }

    startLoader();
    var formdata = $("#consolidate_Attendence :input").serialize();
    var csrf = $("#_csrf").val();
    var url = BASEURL + "attendance/uplaodattendance/consolidatestudents";
    $.ajax({
        type: "POST",
        dataType: "json",
        url: url,
        data: {
            _csrf: csrf,
            formdata: formdata
        },
        success: function (data) {
            stopLoader();
            //            alert(data);return false;
            var status_id = data.STATUS_ID;
            var res = data.STATUS_RESPONSE;
            $("#form_mark_attendance_consolidate").show();
            if (status_id == '000') {
                $("#consolidate_attsubbtn").css('display', 'block');
                $("#consolidate_studentattendance").html(res);

            } else {

                $("#consolidate_attsubbtn").hide();
                $("#consolidate_studentattendance").html('');
                var error = "<li>" + res + "</li>";
                PU_validation(error);
                return false;
            }
        }
    });
}

function validateInsertConsolidateAttendance() {
    PU_hide_validation();
    var deliveredlecture = $.trim($("#deliveredlecture").val());
    if (!deliveredlecture) {
        var error = "<li>Enter Delivered Lectures</li>";
        PU_validation(error);
        return false;
    } else {
        if (!$.isNumeric(deliveredlecture)) {
            var error = "<li>Delivered Lectures should be in numbers</li>";
            PU_validation(error);
            return false;
        }
    }

    $("#checkempty").val('');
    $('#uploadview1 :input').each(function (i) {
        if (!$(this).val()) {
            if ($(this).data('check')) {
                var aa = $(this).data('check') + " cannot empty.";
                $("#checkempty").val(aa);
            }
        }
    });

    if ($("#checkempty").val()) {
        //        var error = "<li>"+$("#checkempty").val()+"</li>";
        var error = "<li>Attended Lectures fields cannot empty.</li>";
        PU_validation(error);
        return false;
    }

    submitconsolidatedattendance();
}


function checkLecture(id) {
    PU_hide_validation();

    var val1 = parseInt($("#deliveredlecture").val());
    if (!val1) {
        $("#attended" + id).val('');
        var error = "<li>Enter Delivered Lectures.</li>";
        PU_validation(error);
        return false;
    }
    var val2 = parseInt($("#attended" + id).val());
    if (val2 > val1) {
        $("#attended" + id).val('');
        var error = "<li>Attended lectures cannot more then delivered lectures.</li>";
        PU_validation(error);
        return false;
    }
}

/*
 * View / Freeze Attendance
 */

function getStudentViewAttendance() {
    $("#batchmarksinfo").html("");
    var secureKey = $("#secureKey").val();
    var secureHash = $("#secureHash").val();
    var batch_session = $("#batch_session").val();
    //    alert(batch_session);
    var semesterId = $("#semesterIda").val();
    var csrf = $("#_csrf").val();

    var dept_id = $("#Assign_Department").val();
    var courseid = $("#Assign_Course").val();

    if (batch_session && semesterId && dept_id && courseid) {
        //        startLoader();
        var url = BASEURL + "attendance/umsfinalizeattendance/subjectlistviewattendance";
        $.ajax({
            type: "POST",
            dataType: "json",
            url: url,
            data: {
                _csrf: csrf,
                batch: batch_session,
                semesterId: semesterId,
                secureKey: secureKey,
                secureHash: secureHash,
                dept_id: dept_id,
                courseid: courseid,
            },
            success: function (data) {
                //                stopLoader(); 
                var status_id = data.STATUS_ID;
                var res = data.STATUS_RESPONSE;
                if (status_id == '000') {
                    $("#detail_min").show();
                    $("#departmentdetail").hide(500);
                    $("#subjectlistattendanceview").html(res);
                    $("#grouplistattendanceview").html('');
                } else {
                    $("#subjectlistattendanceview").html('');
                    $("#grouplistattendanceview").html('');
                    var error = "<li>" + res + "</li>";
                    PU_validation(error);
                    return false;
                }

            }
        });
    } else {
        $("#studentattendance").html('');
    }
}

/*
 * 
 */
function EditAttendance() {
    PU_hide_validation();
    var aa = $("#lecdelivered").val();
    $("#showdeliveredlec").html('<label>Total Lectures Delivered</label><input type="text" id="deliveredlecture" value="' + aa + '" size="3" onkeypress="return allowOnlyNumber(event)" maxlength="3" autocomplete="off" name="lecture_delivered" />');

    $("#showdeliveredlec").show();
    $(".attended").removeAttr('readonly');
    $(".removediv").remove();
    $("#updatebtn").html('');
    $("#updatebtn").html('<button type="button" onclick="return validateViewAttendance()" class="btn btn-primary" name="update_attendance" value="Update Attendance">Update Attendance</button>');
    $("#isedit").val('yes');
    $('html,body').animate({
        scrollTop: 0
    }, 'slow');
}

function validateViewAttendance() {
    PU_hide_validation();
    var deliveredlecture = $.trim($("#deliveredlecture").val());
    if (!deliveredlecture) {
        var error = "<li>Enter Delivered Lectures</li>";
        PU_validation(error);
        return false;
    } else {
        if (!$.isNumeric(deliveredlecture)) {
            var error = "<li>Delivered Lectures should be in numbers</li>";
            PU_validation(error);
            return false;
        }
    }

    $("#checkempty").val('');
    $('#uploadview_consolidate :input').each(function (i) {
        if (!$(this).val()) {
            //            alert("data not");
            if ($(this).data('check')) {
                $("#checkempty").val('yes');
            }
        }
    });
    //    alert($("#checkempty").val());
    if ($("#checkempty").val()) {
        var error = "<li>Attended Lectures fields cannot empty.</li>";
        PU_validation(error);
        return false;
    }

    updateConsolidateAttendance();
}

function changeAction(val, curID, secID, thrdID, addValID) {
    PU_hide_validation();
    if (val && curID && secID && addValID && thrdID) {
        if (val == 'V' || val == 'U' || val == 'D') {
            $("#html_dailyattendance").html('');
            $("#" + secID).removeClass('btn-primary');
            $("#" + secID).addClass('btn-default');
            $("#" + thrdID).removeClass('btn-primary');
            $("#" + thrdID).addClass('btn-default');

            $("#" + curID).removeClass('btn-default');
            $("#" + curID).addClass('btn-primary');

            $("#" + addValID).val(val);
            $("#view_atnd_label").html("View Attendance");
            if (val == 'V') {
                $("#view_attendance").show();
                $("#update_attendance").hide();
                $("#attendance_from_date").val('');
                $("#attendance_to_date").val('');
                $("#attendance_to_date").val('');
                $("#delete_attendance").hide();
                $("#from_date_delete").val('');
                $("#to_date_delete").val('');
            } else if (val == 'U') {
                $("#attendance_from_date").val('');
                $("#attendance_to_date").val('');
                $("#attendance_to_date").val('');
                $("#from_date_delete").val('');
                $("#to_date_delete").val('');
                $("#view_attendance").hide();
                $("#update_attendance").show();
                $("#delete_attendance").hide();
            } else if (val == 'D') {
                $("#attendance_from_date").val('');
                $("#attendance_to_date").val('');
                $("#attendance_to_date").val('');
                $("#view_attendance").hide();
                $("#update_attendance").hide();
                $("#delete_attendance").show();
                $("#view_atnd_label").html("Delete Attendance");
            }
        }
    }
}

function ValidateFreezeDailayAttendance() {
    PU_hide_validation();
    $("#html_dailyattendance").html('');
    var action_attendance = $.trim($("#action_attendance").val());
    if (!action_attendance) {
        var error = "<li>Select Action</li>";
        PU_validation(error);
        return false;
    } else {
        if (action_attendance == 'U') {

        } else if (action_attendance == 'V') {

        } else {
            var error = "<li>Invalid Action</li>";
            PU_validation(error);
            return false;
        }
    }

    var lecture = $("#lecture").val();
    if (!lecture) {
        var error = "<li>Select Lecture</li>";
        PU_validation(error);
        return false;
    } else {
        if (!$.isNumeric(lecture)) {
            var error = "<li>Invalid Lecture ID</li>";
            PU_validation(error);
            return false;
        }
    }

    if (action_attendance == 'V') {
        var attendance_from_date = $("#attendance_from_date").val();
        var attendance_to_date = $("#attendance_to_date").val();

        if (!attendance_from_date) {
            var error = "<li>Select From date </li>";
            PU_validation(error);
            return false;
        }
        if (!attendance_to_date) {
            var error = "<li>Select To date</li>";
            PU_validation(error);
            return false;
        }

        attendance_from_date = attendance_from_date.split("-");
        var newDate = attendance_from_date[1] + "," + attendance_from_date[0] + "," + attendance_from_date[2];
        var _attendance_from_date = new Date(newDate).getTime();

        attendance_to_date = attendance_to_date.split("-");
        var attendance_to_date = attendance_to_date[1] + "," + attendance_to_date[0] + "," + attendance_to_date[2];
        var _attendance_to_date = new Date(attendance_to_date).getTime();
        //        console.log("From "+_attendance_from_date);
        //        console.log("to "+_attendance_to_date);
        if (_attendance_to_date < _attendance_from_date) {
            var error = "<li>To date cannot less than from Date</li>";
            PU_validation(error);
            return false;
        }

    } else if (action_attendance == 'U') {
        var attendance_date_update = $("#attendance_date_update").val();

        if (!attendance_date_update) {
            var error = "<li>Select Attendance Date</li>";
            PU_validation(error);
            return false;
        }
    } else {
        return false;
    }

    var csrf = $("#_csrf").val();
    startLoader();
    var formdata = $("#updatevalidateViewStudentlist :input").serialize();
    var url = BASEURL + "attendance/umsfinalizeattendance/viewdailyattendance";
    $.ajax({
        type: "POST",
        dataType: "json",
        url: url,
        data: {
            _csrf: csrf,
            formdata: formdata,
        },
        success: function (data) {
            stopLoader();
            var status_id = data.STATUS_ID;
            var res = data.STATUS_RESPONSE;
            if (status_id == '000') {
                $("#html_dailyattendance").html(res);
            } else {
                $("#html_dailyattendance").html('');
                var error = "<li>" + res + "</li>";
                PU_validation(error);
                return false;
            }

        }
    });
}

function modal_ViewStudentInfo(divid) {
    $("#viewdailyattendance_html").html('');
    var id = "#studentdetail_view" + divid;
    var id = id + " :input";

    var formdata = $(id).serialize();
    var url = BASEURL + "attendance/umsfinalizeattendance/individualviewstudentdetail";
    var csrf = $("#_csrf").val();
    $.ajax({
        type: "POST",
        dataType: "json",
        url: url,
        data: {
            _csrf: csrf,
            formdata: formdata,
        },
        success: function (data) {

            //            var status_id = data.STATUS_ID;
            var res = data.STATUS_RESPONSE;
            //            if(status_id == '000'){
            $("#viewdailyattendance_html").html(res);
            $("#viewdailyattendance").modal();

            //            }else{
            //                $("#html_dailyattendance").html('');
            //                var error = "<li>"+res+"</li>";
            //                PU_validation(error);
            //                return false;
            //            }

        }
    });

}
function emptydiv() {
    $("#html_dailyattendance").html('');

    //Upload Daily Attendance
    $("#studentattendance").html('');
    $("#attsubbtn").hide();

    //Upload Consolidate Attendance
    $("#consolidate_attsubbtn").hide();
    $("#consolidate_studentattendance").html('');
}

function submitdailyattendance() {
    startLoader();
    var formdata = $("#form_mark_attendance").serialize();
    var url = BASEURL + "attendance/uplaodattendance/insertattendance";
    var csrf = $("#_csrf").val();
    $.ajax({
        type: "POST",
        dataType: "json",
        url: url,
        data: {
            _csrf: csrf,
            formdata: formdata,
        },
        success: function (data) {
            var res = data.STATUS_RESPONSE;
            var status = data.STATUS_ID;
            if (status == '000') {
                $("#studentattendance").html('');
                $("#error_main").html(res);
                $("#error_main").removeClass('alert-error');
                $("#error_main").addClass('alert-success');
                //                $('#checkgrups').find('input[type=checkbox]:checked').removeAttr('checked');
                //                $("#attendance_date").val('');
                $("#attsubbtn").hide();
                $("#error_main").show();
                $('html, body').animate({ scrollTop: 0 }, 'slow');
                stopLoader();
                return false;
            } else {
                var error = "<li>" + res + "</li>";
                PU_validation(error);
                return false;
            }

            //            window.location.replace(BASEURL + res);

        }
    });
}

function submitconsolidatedattendance() {
    startLoader();
    var formdata = $("#form_mark_attendance_consolidate").serialize();
    var url = BASEURL + "attendance/uplaodattendance/consolidate_attendence";
    var csrf = $("#_csrf").val();
    $.ajax({
        type: "POST",
        dataType: "json",
        url: url,
        data: {
            _csrf: csrf,
            formdata: formdata,
        },
        success: function (data) {
            var res = data.STATUS_RESPONSE;
            window.location.replace(BASEURL + res);

        }
    });
}

function updateConsolidateAttendance() {
    startLoader();
    var formdata = $("#updateattendance_consolidate").serialize();
    var url = BASEURL + "attendance/umsfinalizeattendance/updateattendance";
    var csrf = $("#_csrf").val();
    $.ajax({
        type: "POST",
        dataType: "json",
        url: url,
        data: {
            _csrf: csrf,
            formdata: formdata,
        },
        success: function (data) {
            var res = data.STATUS_RESPONSE;
            window.location.replace(BASEURL + res);

        }
    });
}

function finalizeConsolidateAttendance() {
    if (!confirm("Are you sure you want to finalize attendance?")) {
        return false;
    }

    updateConsolidateAttendance();
}

function updateDailyAttendance(val) {
    if (!val) {
        return false;
    }
    if (val == 1) {
        $("#Update_Attendance").val('1');
        $("#Finalize_Attendance").val('');
    } else if (val == 2) {
        $("#Update_Attendance").val('');
        $("#Finalize_Attendance").val('2');

        if (!confirm("Are you sure you want to finalize attendance?")) {
            return false;
        }
    }
    startLoader();
    //    return false;
    var formdata = $("#updatedailyattendances :input").serialize();
    var url = BASEURL + "attendance/umsfinalizeattendance/updatedailyattendance";
    var csrf = $("#_csrf").val();
    $.ajax({
        type: "POST",
        dataType: "json",
        url: url,
        data: {
            _csrf: csrf,
            formdata: formdata,
        },
        success: function (data) {
            var res = data.STATUS_RESPONSE;
            window.location.replace(BASEURL + res);

        }
    });
}

function viewStudentForLectureCondonation() {
    $("#uploadGrace").html('');
    PU_hide_validation();
    var Assign_Department = $.trim($("#Assign_Department").val());
    var Assign_Course = $.trim($("#Assign_Course").val());
    var AssignBatch = $.trim($("#actionSelect").val());
    var semesterId = $.trim($("#semesterId").val());
    var Subject_Type = $.trim($("#Subject_Type").val());
    var subjectId = $.trim($("#subjectId").val());

    if (!Assign_Department) {
        var error = "<li>Select Department</li>";
        PU_validation(error);
        return false;
    }

    if (!Assign_Course) {
        var error = "<li>Select Course</li>";
        PU_validation(error);
        return false;
    }

    if (!AssignBatch) {
        var error = "<li>Select Batch</li>";
        PU_validation(error);
        return false;
    }

    if (!semesterId) {
        var error = "<li>Select Semester</li>";
        PU_validation(error);
        return false;
    }

    if (!Subject_Type) {
        var error = "<li>Select Subject Type</li>";
        PU_validation(error);
        return false;
    }
    if (!subjectId) {
        var error = "<li>Select Subject</li>";
        PU_validation(error);
        return false;
    }
    var Roll_Number = $.trim($('#Roll_Number').val());
    if (!Roll_Number) {
        var error = "<li>Enter Roll Number</li>";
        PU_validation(error);
        return false;
    }

    startLoader();
    var formdata = $("#frm_lc :input").serialize();
    var url = BASEURL + "attendance/umsrequestedgrace/getstudentlist";
    var csrf = $("#_csrf").val();
    $.ajax({
        type: "POST",
        dataType: "json",
        url: url,
        data: {
            _csrf: csrf,
            formdata: formdata,
        },
        success: function (data) {
            stopLoader();
            var status = data.STATUS_ID;
            if (status == '000') {
                $("#uploadGrace").html(data.STATUS_RESPONSE);
                if (data.STUDENT_STATUS == '555') {
                    $("#uploadGrace").append("<div class='text-center'><button type='button' class='btn btn-primary' onclick='return validateStudentGrace(3)' style='margin-right:5px;'>Save As Draft</button><button type='button' class='btn btn-primary' onclick='return validateStudentGrace(4)'>Finalize</button></div>");
                }

            } else {
                PU_validation(data.STATUS_RESPONSE);
                return false;
            }
        }
    });
}

function validateStudentGrace(status) {
    if (status == '3' || status == '4') {
        var check = true;
        //    var msg = "Sports Credit, Lectures Condoned Chairperson, VC Grace & VC in anticipation Approval cannot empty";
        var msg = "";
        $('#cccccccc').val('');
        $('#uploadview :input').each(function (i) {
            var fgf = $(this).val();
            if ($(this).hasClass("checkinput")) {
                if (fgf == '') {
                    $('#cccccccc').val('11');
                    msg = $(this).data('checkmarks');

                }
            }

        });
        if ($('#cccccccc').val()) {
            PU_validation(msg);
            return false;
        }

        startLoader();
        var formdata = $("#updatefrm :input").serialize();
        var url = BASEURL + "attendance/umsrequestedgrace/updatestudentattendance";
        var csrf = $("#_csrf").val();
        $.ajax({
            type: "POST",
            dataType: "json",
            url: url,
            data: {
                _csrf: csrf,
                formdata: formdata,
                status: status
            },
            success: function (data) {
                //                alert(data);
                stopLoader();
                var status = data.STATUS_ID;
                if (status == '000') {
                    $('#Roll_Number').val('');
                    $('#Assign_Department option, #Subject_Type option').prop('selected', function () {
                        return this.defaultSelected;
                    });
                    $('#Assign_Course, #actionSelect, #semesterId, #subjectId').html('');

                    $('#Assign_Course').html("<option value=''>Select Course</option>");
                    $('#actionSelect').html("<option value=''>Select Batch</option>");
                    $('#semesterId').html("<option value=''>Select Semester</option>");
                    $('#subjectId').html("<option value=''>Select Subject</option>");

                    $("#uploadGrace").html("<div class='alert alert-success text-center'>" + data.STATUS_RESPONSE + "</div>");
                } else {
                    PU_validation(data.STATUS_RESPONSE);
                    return false;
                }
            }
        });
    } else {
        PU_validation("Invalid Status");
        return false;
    }

}

/*
 * Validate Logs Activity
 */

function validateLogs() {
    PU_hide_validation();
    var username = $.trim($("#username").val());
    $("#username").val(username);
    var roleid = $("#roleid").val();
    var department_id = $("#department_id").val();
    var log_date = $("#log_date").val();

    if (!username && !roleid && !department_id && !log_date) {
        PU_validation("Select any one field from the search.");
        return false;
    }
}


/*
 * 13.02.2017 One page Attendance 
 * Get Groups for attendance 
 */

function getgrouplistforattendance(formid, btnid) {
    PU_hide_validation();
    if (formid && btnid) {
        var csrf = $("#_csrf").val();
        startLoader();
        var formid = formid + " :input";
        var formdata = $('#' + formid).serialize();
        var url = BASEURL + "attendance/uplaodattendance/getgrouplist";
        $.ajax({
            type: "POST",
            dataType: "json",
            url: url,
            data: {
                _csrf: csrf,
                formdata: formdata
            },
            success: function (data) {
                stopLoader();
                var status_id = data.STATUS_ID;
                var res = data.STATUS_RESPONSE;
                if (status_id == '000') {
                    $("#grouplistattendance").html(res);
                } else {
                    var error = "<li>" + res + "</li>";
                    PU_validation(error);
                    return false;
                }
            }
        });
        $("#subjectlist_attendance").find("button").removeClass("btn-success");
        $("#subjectlist_attendance").find("button").addClass("btn-primary");
        $("#" + btnid).addClass("btn-success");
        $("#" + btnid).removeClass("btn-primary");
    }
}

/*
 * View Attendance
 */

function getgrouplistforViewAttendance(formid, btnid) {
    PU_hide_validation();
    if (formid && btnid) {
        var csrf = $("#_csrf").val();
        startLoader();
        var formid = formid + " :input";
        var formdata = $('#' + formid).serialize();
        var url = BASEURL + "attendance/umsfinalizeattendance/viewdailyattendance1";
        $.ajax({
            type: "POST",
            dataType: "json",
            url: url,
            data: {
                _csrf: csrf,
                formdata: formdata
            },
            success: function (data) {
                stopLoader();
                var status_id = data.STATUS_ID;
                var res = data.STATUS_RESPONSE;
                if (status_id == '000') {
                    $("#grouplistattendanceview").html(res);
                } else {
                    $("#grouplistattendanceview").html('');
                    var error = "<li>" + res + "</li>";
                    PU_validation(error);
                    return false;
                }
            }
        });
        $("#subjectlistattendanceview").find("button").removeClass("btn-success");
        $("#subjectlistattendanceview").find("button").addClass("btn-primary");
        $("#" + btnid).addClass("btn-success");
        $("#" + btnid).removeClass("btn-primary");
    }
}

/*
 * Get Student List
 */

function ValidateFreezeDailayAttendance1() {
    PU_hide_validation();
    $("#html_dailyattendance").html('');
    var action_attendance = $.trim($("#action_attendance").val());
    if (!action_attendance) {
        var error = "<li>Select Action</li>";
        PU_validation(error);
        return false;
    } else {
        if (action_attendance == 'U') {

        } else if (action_attendance == 'V') {

        } else if (action_attendance == 'D') {

        } else {
            var error = "<li>Invalid Action</li>";
            PU_validation(error);
            return false;
        }
    }
    var url = BASEURL + "attendance/umsfinalizeattendance/studentlistforviewattendance";
    var lecture = $("#lecture").val();
    if (!lecture) {
        var error = "<li>Select Lecture</li>";
        PU_validation(error);
        return false;
    } else {
        if (!$.isNumeric(lecture)) {
            var error = "<li>Invalid Lecture ID</li>";
            PU_validation(error);
            return false;
        }
    }

    if (action_attendance == 'V') {
        var attendance_from_date = $("#attendance_from_date").val();
        var attendance_to_date = $("#attendance_to_date").val();

        if (!attendance_from_date) {
            var error = "<li>Select From date </li>";
            PU_validation(error);
            return false;
        }
        if (!attendance_to_date) {
            var error = "<li>Select To date</li>";
            PU_validation(error);
            return false;
        }

        attendance_from_date = attendance_from_date.split("-");
        var newDate = attendance_from_date[1] + "," + attendance_from_date[0] + "," + attendance_from_date[2];
        var _attendance_from_date = new Date(newDate).getTime();

        attendance_to_date = attendance_to_date.split("-");
        var attendance_to_date = attendance_to_date[1] + "," + attendance_to_date[0] + "," + attendance_to_date[2];
        var _attendance_to_date = new Date(attendance_to_date).getTime();
        //        console.log("From "+_attendance_from_date);
        //        console.log("to "+_attendance_to_date);
        if (_attendance_to_date < _attendance_from_date) {
            var error = "<li>To date cannot less than from Date</li>";
            PU_validation(error);
            return false;
        }

    } else if (action_attendance == 'U') {
        var attendance_date_update = $("#attendance_date_update").val();

        if (!attendance_date_update) {
            var error = "<li>Select Attendance Date</li>";
            PU_validation(error);
            return false;
        }
    } else if (action_attendance == 'D') {

        var from_date_delete = $("#from_date_delete").val();
        var to_date_delete = $("#to_date_delete").val();

        if (!from_date_delete) {
            var error = "<li>Select From Date</li>";
            PU_validation(error);
            return false;
        }
        if (!to_date_delete) {
            var error = "<li>Select To Date</li>";
            PU_validation(error);
            return false;
        }

        from_date_delete = from_date_delete.split("-");
        var newDate = from_date_delete[1] + "," + from_date_delete[0] + "," + from_date_delete[2];
        var _from_date_delete = new Date(newDate).getTime();

        to_date_delete = to_date_delete.split("-");
        var to_date_delete = to_date_delete[1] + "," + to_date_delete[0] + "," + to_date_delete[2];
        var _to_date_delete = new Date(to_date_delete).getTime();
        if (_to_date_delete < _from_date_delete) {
            var error = "<li>To date cannot less than from Date</li>";
            PU_validation(error);
            return false;
        }
        if (!confirm('Are you want to delete attendance from ' + $("#from_date_delete").val() + ' to ' + $("#to_date_delete").val())) {
            return false;
        }
        var url = BASEURL + "attendance/umsfinalizeattendance/deleteattendance";
    } else {
        return false;
    }

    var csrf = $("#_csrf").val();
    startLoader();
    var formdata = $("#updatevalidateViewStudentlist :input").serialize();

    $.ajax({
        type: "POST",
        dataType: "json",
        url: url,
        data: {
            _csrf: csrf,
            formdata: formdata,
        },
        success: function (data) {
            stopLoader();
            var status_id = data.STATUS_ID;
            var res = data.STATUS_RESPONSE;
            if (status_id == '000') {
                if (action_attendance == 'D') {
                    $("#error_main").removeClass('alert-error');
                    $("#error_main").addClass('alert-success');
                    $("#attsubbtn").hide();
                    $("#error_main").show();
                    $("#error_main").html(res);
                    $('html, body').animate({ scrollTop: 0 }, 'slow');
                } else {
                    $("#html_dailyattendance").html(res);
                }

            } else {
                $("#html_dailyattendance").html('');
                var error = "<li>" + res + "</li>";
                PU_validation(error);
                return false;
            }

        }
    });
}

function updateDailyAttendance1(val) {
    if (!val) {
        return false;
    }
    if (val == 1) {
        $("#Update_Attendance").val('1');
        $("#Finalize_Attendance").val('');
    } else if (val == 2) {
        $("#Update_Attendance").val('');
        $("#Finalize_Attendance").val('2');

        if (!confirm("Are you sure you want to finalize attendance?")) {
            return false;
        }
    }
    startLoader();
    //    return false;
    var formdata = $("#updatedailyattendances :input").serialize();
    var url = BASEURL + "attendance/umsfinalizeattendance/updatedailyattendance1";
    var csrf = $("#_csrf").val();
    $.ajax({
        type: "POST",
        dataType: "json",
        url: url,
        data: {
            _csrf: csrf,
            formdata: formdata,
        },
        success: function (data) {
            var status_id = data.STATUS_ID;
            var res = data.STATUS_RESPONSE;
            if (status_id == '000') {
                $("#studentattendance").html('');
                $("#error_main").html(res);
                $("#error_main").removeClass('alert-error');
                $("#error_main").addClass('alert-success');
                $("#attsubbtn").hide();
                $("#error_main").show();
                $('html, body').animate({ scrollTop: 0 }, 'slow');
                $('#html_dailyattendance').html('');
                stopLoader();
                return false;
            } else {
                var error = "<li>" + res + "</li>";
                PU_validation(error);
                return false;
            }

        }
    });
}

/*
 * Result Changes
 */

function getSubjectListforResult(semesterId) {
    PU_hide_validation();
    $("#batchmarksinfo").html("");
    //    $("#getstudentlist_html").html(""); 
    var secureKey = $("#secureKey").val();
    var secureHash = $("#secureHash").val();
    var batch_session = $("#batch_session").val();
    //    var semesterId = $(this).val();
    var csrf = $("#_csrf").val();
    if (batch_session && semesterId) {
        var Assign_Department = $('#Assign_Department').val();
        var Assign_Course = $('#Assign_Course').val();
        startLoader();
        var url = BASEURL + "result/uploadresult/getsubjectlist";
        $.ajax({
            type: "POST",
            dataType: "json",
            url: url,
            data: {
                _csrf: csrf,
                dept_id: Assign_Department,
                courseid: Assign_Course,
                batch: batch_session,
                semesterId: semesterId,
                secureKey: secureKey,
                secureHash: secureHash,
            },
            success: function (data) {
                stopLoader();
                var status_id = data.STATUS_ID;
                var res = data.STATUS_RESPONSE;
                if (status_id == "000") {
                    $("#batchmarksinfo").html(res);
                    $("#getstudentlist_html").html('');
                    $("#detail_min").show();
                    $("#departmentdetail").hide();
                } else {
                    $("#departmentdetail").show();
                    $("#getstudentlist_html").html('');
                    $("#detail_min").hide();
                    $("#batchmarksinfo").html('');
                    PU_validation(res);
                    return false;
                }
            }
        });
    }
}



/*
 * Show Groups for Result
 */

function showResultGroups(formid, btnid) {
    PU_hide_validation();
    if (formid && btnid) {
        var csrf = $("#_csrf").val();
        startLoader();
        var formid = formid + " :input";
        var formdata = $('#' + formid).serialize();
        var url = BASEURL + "result/uploadresult/listofgroups";
        $.ajax({
            type: "POST",
            dataType: "json",
            url: url,
            data: {
                _csrf: csrf,
                formdata: formdata
            },
            success: function (data) {
                stopLoader();
                var status_id = data.STATUS_ID;
                var res = data.STATUS_RESPONSE;
                if (status_id == '000') {
                    $("#getstudentlist_html").html(res);
                } else {
                    $("#getstudentlist_html").html('');
                    var error = "<li>" + res + "</li>";
                    PU_validation(error);
                    return false;
                }
            }
        });

        $("#batchmarksinfo").find("button").removeClass("btn-success");
        $("#batchmarksinfo").find("button").addClass("btn-primary");
        $("#" + btnid).addClass("btn-success");
        $("#" + btnid).removeClass("btn-primary");
    }
}

/*
 * View Student for Enter Marks 
 */

function viewStudentForEnterMarks() {
    $("#download_student_result").hide();
    PU_hide_validation();
    var chkDisplay = false;
    $("#upload_marks_group_list input[type=checkbox]").each(function () {
        if ($(this).prop("checked")) {
            chkDisplay = true;
            return false;
        }
    });
    //    alert(chkDisplay);
    if (chkDisplay) {
        startLoader();
        $("#html_studentmarksinfo").html("");
        var formdata = $("#frm_enter_marks :input").serialize();
        var csrf = $("#_csrf").val();
        var url = BASEURL + "result/uploadresult/studentlistformarks";
        $.ajax({

            type: "POST",
            dataType: "json",
            url: url,
            data: {
                _csrf: csrf,
                formdata: formdata
            },
            success: function (data) {
                stopLoader();
                var status_id = data.STATUS_ID;
                var res = data.STATUS_RESPONSE;
                if (status_id == "000") {
                    $("#html_studentmarksinfo").html(res);
                    $("#download_student_result").show();
                }
                else {
                    PU_validation(res);
                    return false;
                }

            }
        });
    } else {
        var error = "<li>Please Select Group</li>";
        PU_validation(error);
        return false;
    }
}

/*
 * View Result
 */

function getSubjectListforResultView(semesterId) {
    PU_hide_validation();
    $("#batchmarksinfo").html("");
    //    $("#getstudentlist_html").html(""); 
    var secureKey = $("#secureKey").val();
    var secureHash = $("#secureHash").val();
    var batch_session = $("#batch_session").val();
    //    var semesterId = $(this).val();
    var csrf = $("#_csrf").val();
    if (batch_session && semesterId) {
        var Assign_Department = $('#Assign_Department').val();
        var Assign_Course = $('#Assign_Course').val();
        startLoader();
        var url = BASEURL + "result/viewuploadedmarks/getsubjectlist";
        $.ajax({
            type: "POST",
            dataType: "json",
            url: url,
            data: {
                _csrf: csrf,
                dept_id: Assign_Department,
                courseid: Assign_Course,
                batch: batch_session,
                semesterId: semesterId,
                secureKey: secureKey,
                secureHash: secureHash,
            },
            success: function (data) {
                stopLoader();
                var status_id = data.STATUS_ID;
                var res = data.STATUS_RESPONSE;
                if (status_id == "000") {
                    $("#batchmarksinfo").html(res);
                    $("#detail_min").show();
                    $("#departmentdetail").hide();
                } else {
                    $("#departmentdetail").show();
                    $("#detail_min").hide();
                    $("#batchmarksinfo").html('');
                    $("#getstudentlist_html").html('');
                    PU_validation(res);
                    return false;
                }
            }
        });
    }
}

function showResultGroupsForView(formid, btnid) {
    PU_hide_validation();
    if (formid && btnid) {
        var csrf = $("#_csrf").val();
        startLoader();
        var formid = formid + " :input";
        var formdata = $('#' + formid).serialize();
        var url = BASEURL + "result/viewuploadedmarks/listofgroups";
        $.ajax({
            type: "POST",
            dataType: "json",
            url: url,
            data: {
                _csrf: csrf,
                formdata: formdata
            },
            success: function (data) {
                stopLoader();
                var status_id = data.STATUS_ID;
                var res = data.STATUS_RESPONSE;
                if (status_id == '000') {
                    $("#getstudentlist_html").html(res);
                } else {
                    $("#getstudentlist_html").html('');
                    var error = "<li>" + res + "</li>";
                    PU_validation(error);
                    return false;
                }
            }
        });

        $("#batchmarksinfo").find("button").removeClass("btn-success");
        $("#batchmarksinfo").find("button").addClass("btn-primary");
        $("#" + btnid).addClass("btn-success");
        $("#" + btnid).removeClass("btn-primary");
    }
}

function viewStudentMarks() {
    PU_hide_validation();
    $("#download_student_result").hide();
    if (!$("#error_main").hasClass('alert-error'))
        $("#error_main").addClass('alert-error');
    $("#error_main").removeClass('alert-success');
    var chkDisplay = false;
    $("#upload_marks_group_list input[type=checkbox]").each(function () {
        if ($(this).prop("checked")) {
            chkDisplay = true;
            return false;
        }
    });
    if (chkDisplay) {
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
                _csrf: csrf,
                formdata: formdata
            },
            success: function (data) {
                stopLoader();
                var status_id = data.STATUS_ID;
                var res = data.STATUS_RESPONSE;
                if (status_id == "000") {
                    $("#html_studentmarksinfo").html(res);
                    $("#download_student_result").show();
                }
                else {
                    PU_validation(res);
                    return false;
                }

            }
        });
    }
    else {
        var error = "<li>Please Select Group</li>";
        PU_validation(error);
        return false;
    }
}


function validateReappearForm() {
    var error = '';
    /************************* student_Subject_Lists **************************************************/
    var chkDisplay = false;
    $("#reapearSubjects_div_info table tbody input[type=checkbox]").each(function () {
        $chkDisabled = $(this).prop("disabled");
        if (!$chkDisabled) {
            if ($(this).prop("checked")) {
                chkDisplay = true;
                return false;
            }
        }
    });
    if (!chkDisplay) {
        error = error + "<li>Select atleast one subject.</li>";
        PU_validation(error);
        return false;
    }

    /************************* student_receipt_amount **************************************************/
    var student_receipt_amount = $.trim($("#student_receipt_amount").val());
    $("#student_receipt_amount").val(student_receipt_amount);
    if (!student_receipt_amount) {
        error = error + "<li>Amount Required</li>";
        PU_validation(error);
        return false;
    }
    else {
        $chkVal = onlyIntegerAllow(student_receipt_amount);
        if (!$chkVal)
            return false;
    }

    if (student_receipt_amount <= 0) {
        error = error + "<li>Valid amount required</li>";
        PU_validation(error);
        return false;
    }

    /************************* student_receipt_no **************************************************/
    var student_receipt_no = $.trim($("#student_receipt_no").val());
    $("#student_receipt_no").val(student_receipt_no);
    if (!student_receipt_no) {
        error = error + "<li>Receipt No Required</li>";
        PU_validation(error);
        return false;
    }
    else {
        if (!validStringalphanumeric(student_receipt_no)) {
            error = error + "<li>Enter Valid Receipt No</li>";
            PU_validation(error);
            return false;
        }

    }


    /************************* student_receiptDate **************************************************/
    var student_receiptDate = $.trim($("#student_receiptDate").val());
    $("#student_receiptDate").val(student_receiptDate);
    if (!student_receiptDate) {
        error = error + "<li>Receipt Date Required</li>";
        PU_validation(error);
        return false;
    }

    /************************* Reappear_Form_Year **************************************************/
    var Reappear_Form_Year = $.trim($("#Reappear_Form_Year").val());
    $("#Reappear_Form_Year").val(Reappear_Form_Year);
    if (!Reappear_Form_Year) {
        error = error + "<li>Year Required</li>";
        PU_validation(error);
        return false;
    }

    /************************* Reappear_Form_Session **************************************************/
    var Reappear_Form_Session = $.trim($("#Reappear_Form_Session").val());
    $("#Reappear_Form_Session").val(Reappear_Form_Session);
    if (!Reappear_Form_Session) {
        error = error + "<li>Session Required</li>";
        PU_validation(error);
        return false;
    }



    stopLoader();


}

function Assignunassignreappearsubjectbyhod(AssignSubjectData, Status, webtoken, facultyid, facultysubjectId, Assign_Department, Assign_Course, semesterId, Rsession, Ryear, isSpecial) {
    startLoader();

    var url = BASEURL + "examination/umsreappearassignsubject/assignunassignsubjectbyhod";
    $csrf = $("#_csrf").val();

    $.ajax({
        type: "POST",
        url: url,
        dataType: "json",
        data: {
            _csrf: $csrf,
            Department: Assign_Department,
            Course: Assign_Course,
            Semester: semesterId,
            facultyid: facultyid,
            facultysubjectId: facultysubjectId,
            token: webtoken,
            Rsession: Rsession,
            Ryear: Ryear,
            Status: Status,
            AssignSubject: AssignSubjectData,
            isSpecial: isSpecial,

        },
        success: function (data) {
            stopLoader();
            var status_id = data.STATUS_ID;
            var res = data.STATUS_RESPONSE;
            if (status_id == "000") {
                $("#error_main").removeClass('alert-error');
                $("#error_main").addClass('alert-success');
                PU_validation(res);
                $("#reapearAssignSubject_div_info").html("");
                $("#ReappearSubjectID").html("");
                $("#semesterId").val("");
                $("#ViewReAppearAssignFaculty_btn").hide();
                $(".other_dept_faculty_div").hide();
                $("#Show_Hide_OtherDeptList").hide();
                $(".other_dept_faculty_checkbox").prop("checked", false);
                $("#other_dept_faculty_select").val("");


            }
            else {
                PU_validation("<li>" + res + "</li>");
            }

        }
    });
}

function validate_ReAppearResultSheet() {
    PU_hide_validation();
    $("#course_name").val('');
    $("#dept_name").val('');


    var Assign_Department = $("#Assign_Department").val();
    if (!Assign_Department) {
        var error = "<li>Select Department </li>";
        PU_validation(error);
        return false;
    }

    var Departmentname = $('#Assign_Department option:selected').text();
    $("#Reappearstudentdepartment_name").val(Departmentname);
    var Assign_Course = $("#Assign_Course").val();
    if (!Assign_Course) {
        var error = "<li>Select Course </li>";
        PU_validation(error);
        return false;
    }
    var coursename = $('#Assign_Course option:selected').text();
    $("#Reappearstudentcourse_name").val(coursename);

    var semesterId = $("#semesterId").val();
    if (!semesterId) {
        var error = "<li>Select Semester </li>";
        PU_validation(error);
        return false;
    }

    var ReappearResultCard_year = $("#ReappearResultCard_year").val();
    if (!ReappearResultCard_year) {
        var error = "<li>Select Year </li>";
        PU_validation(error);
        return false;
    }

    var ReappearResultCard_Session = $("#ReappearResultCard_Session").val();
    if (!ReappearResultCard_Session) {
        var error = "<li>Select Session </li>";
        PU_validation(error);
        return false;
    }



    DownloadReAppearResultSheet();

}


function DownloadReAppearResultSheet() {
    PU_hide_validation();
    startLoader();
    $csrf = $("#_csrf").val();
    var formdata = $("#frm_reapearSubjects_div_info :input").serialize();
    var url = BASEURL + "result/umsreappearresultsheet/downloadresultsheet";
    $.ajax({
        type: "POST",
        url: url,
        dataType: "json",
        data: {
            formdata: formdata,
            _csrf: $csrf
        },
        success: function (data) {
            var status_id = data.STATUS_ID;
            var res = data.STATUS_RESPONSE;
            var downloadurl = BASEURL + "attendance/umsshortattendancetxnstatus/downloadfile?filename=" + res;

            stopLoader();
            if (status_id == "000") {
                window.location.href = downloadurl;
            }
            else {
                PU_validation(res);
                return false;
            }
        }
    });
}

function validate_ReAppearAdmitCard() {
    PU_hide_validation();
    $("#course_name").val('');
    $("#dept_name").val('');


    var Assign_Department = $("#Assign_Department").val();
    if (!Assign_Department) {
        var error = "<li>Select Department </li>";
        PU_validation(error);
        return false;
    }

    var Departmentname = $('#Assign_Department option:selected').text();
    $("#Reappearstudentdepartment_name").val(Departmentname);
    var Assign_Course = $("#Assign_Course").val();
    if (!Assign_Course) {
        var error = "<li>Select Course </li>";
        PU_validation(error);
        return false;
    }
    var coursename = $('#Assign_Course option:selected').text();
    $("#Reappearstudentcourse_name").val(coursename);

    var semesterId = $("#semesterId").val();
    if (!semesterId) {
        var error = "<li>Select Semester </li>";
        PU_validation(error);
        return false;
    }

    var ReappearstudentList_Year = $.trim($("#ReappearstudentList_Year").val());
    $("#ReappearstudentList_Year").val(ReappearstudentList_Year);
    if (!ReappearstudentList_Year) {
        var error = "<li>Select Year </li>";
        PU_validation(error);
        return false;
    }

    var ReappearstudentList_Session = $.trim($("#ReappearstudentList_Session").val());
    $("#ReappearstudentList_Session").val(ReappearstudentList_Session);
    if (!ReappearstudentList_Session) {
        var error = "<li>Select Session </li>";
        PU_validation(error);
        return false;
    }

    DownloadReAppearAdmitCard();

}

function DownloadReAppearAdmitCard() {
    PU_hide_validation();
    startLoader();
    $csrf = $("#_csrf").val();
    var formdata = $("#frm_reapearSubjects_div_info :input").serialize();
    var url = BASEURL + "examination/umsreappearadmitcard/downloadadmitcard";
    $.ajax({
        type: "POST",
        url: url,
        dataType: "json",
        data: {
            formdata: formdata,
            _csrf: $csrf
        },
        success: function (data) {
            var status_id = data.STATUS_ID;
            var res = data.STATUS_RESPONSE;
            var downloadurl = BASEURL + "attendance/umsshortattendancetxnstatus/downloadfile?filename=" + res;

            stopLoader();
            if (status_id == "000") {
                window.location.href = downloadurl;
            }
            else {
                PU_validation(res);
                return false;
            }
        }
    });
}
