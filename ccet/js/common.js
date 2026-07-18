$(document).ready(function () {
  /*****************************************************************************/

  $("body").on("change", ".new_Semester_ReappearSession", function () {
    $("#Assign_Department").val("");
  });

  $("body").on("change", ".is_Special_checkbox_function", function () {
    PU_hide_validation();

    $("#semesterId").html("<option value='' >Select Semester</option>");
    var is_special = $(this).val();
    var ReappearstudentList_Session = $.trim(
      $("#ReappearstudentList_Session").val()
    );
    $("#ReappearstudentList_Session").val(ReappearstudentList_Session);

    var Gazette_Examination_year = $.trim($("#Gazette_Examination_year").val());
    $("#Gazette_Examination_year").val(Gazette_Examination_year);

    var Assign_Department = $.trim($("#Assign_Department").val());
    $("#Assign_Department").val(Assign_Department);

    var Assign_Course = $.trim($("#Assign_Course").val());
    $("#Assign_Course").val(Assign_Course);

    var semesterId = $.trim($("#semesterId").val());
    $("#semesterId").val(semesterId);

    var csrf = $("#_csrf").val();

    var url =
      BASEURL +
      "examination/umsreappearexaminationremarks/getreappearspecialsemester";

    if (
      ReappearstudentList_Session &&
      Gazette_Examination_year &&
      Assign_Department &&
      Assign_Course
    ) {
      startLoader();
      $.ajax({
        type: "POST",
        dataType: "json",
        url: url,
        data: {
          _csrf: csrf,
          Department: Assign_Department,
          Course: Assign_Course,
          Session: ReappearstudentList_Session,
          Year: Gazette_Examination_year,
          is_special: is_special,
        },
        success: function (data) {
          stopLoader();
          var status_id = data.STATUS_ID;
          var res = data.STATUS_RESPONSE;
          if (status_id == "000") {
            $("#semesterId").html(res);
          } else {
            PU_validation(res);
            return false;
          }
        },
      });
    }
  });

  $("body").on("change", ".new_semester_reappear_gazette", function () {
    PU_hide_validation();

    $("#semesterId").html("<option value='' >Select Semester</option>");

    var ReappearstudentList_Session = $.trim(
      $("#ReappearstudentList_Session").val()
    );
    $("#ReappearstudentList_Session").val(ReappearstudentList_Session);

    var Gazette_Examination_year = $.trim($("#Gazette_Examination_year").val());
    $("#Gazette_Examination_year").val(Gazette_Examination_year);

    var Assign_Department = $.trim($("#Assign_Department").val());
    $("#Assign_Department").val(Assign_Department);

    var Assign_Course = $(this).val();

    var semesterId = $.trim($("#semesterId").val());
    $("#semesterId").val(semesterId);

    var csrf = $("#_csrf").val();

    var url =
      BASEURL + "examination/umsreappearexaminationremarks/getreappearsemester";

    if (
      ReappearstudentList_Session &&
      Gazette_Examination_year &&
      Assign_Department &&
      Assign_Course
    ) {
      startLoader();
      $.ajax({
        type: "POST",
        dataType: "json",
        url: url,
        data: {
          _csrf: csrf,
          Department: Assign_Department,
          Course: Assign_Course,
          Session: ReappearstudentList_Session,
          Year: Gazette_Examination_year,
        },
        success: function (data) {
          stopLoader();
          var status_id = data.STATUS_ID;
          var res = data.STATUS_RESPONSE;
          if (status_id == "000") {
            $("#semesterId").html(res);
          } else {
            PU_validation(res);
            return false;
          }
        },
      });
    }
  });

  $("#Assign_DepartmentThesis").change(function () {
    $CY_class = $(this).hasClass("CY");

    $html = "<option value=''>Select Course</option>";
    $semesterId = "<option value=''>Select Semester</option>";
    $dept_id = $(this).val();
    $csrf = $("#_csrf").val();
    if ($dept_id && $CY_class) {
      startLoader();
      var url = BASEURL + "examination/umsthesisawardsheet/getcoursebydeptid";
      startLoader();
      $.ajax({
        type: "POST",
        dataType: "json",
        url: url,
        data: { dept_id: $dept_id, _csrf: $csrf },
        success: function (data) {
          stopLoader();
          //var status_id = data.STATUS_ID;
          var res = data.STATUS_RESPONSE;
          $("#Assign_Course").html(res);
        },
      });
    } else {
      $("#Assign_Course").html($html);
      $("#semesterId").html($semesterId);
      $htmlBatch = "<option value=''>Select Batch</option>";
      $(".new_Batch_Select").html($htmlBatch);
    }
  });

  $("body").on("click", ".uploadthesismarksbyfaculty", function () {
    var error = "";
    $id = $(this).attr("id");

    var str = $id;
    var len = str.length;
    var fstr = parseInt(len) - parseInt(5);
    var lastid = str.substr(5, fstr);
    //var lastid = $id.slice(-1);
    $(".thesis_marks_div").show();
    $(".main_thesis_btn").show();
    $(".uploadthesismarksbyfaculty").removeClass("btn-success");
    $(".uploadthesismarksbyfaculty").addClass("btn-primary");
    $(this).removeClass("btn-primary");
    $(this).addClass("btn-success");
    $("#prac_marks_thesis").val("");
    $("#student_process_div").html("");
    $("#student_process_div").html($("#thesismarks" + lastid).html());

    $view_topic_name = $.trim(
      $("#thesismarks" + lastid + " #view_topic_name").val()
    );
    $("#Topic_Name").val($view_topic_name);
    $view_examiner_name = $.trim(
      $("#thesismarks" + lastid + " #view_examiner_name").val()
    );
    $("#Examiner_Name").val($view_examiner_name);
  });

  $("body").on("click", ".saveAsDraft_finalize_btn_thesis", function () {
    var internal_marks_thesis = $.trim($("#internal_marks_thesis").val());
    $("#internal_marks_thesis").val(internal_marks_thesis);
    if (!internal_marks_thesis) {
      PU_validation("<li> Internal Marks is Required</li>");
      return false;
    }

    var prac_marks = $.trim($("#prac_marks_thesis").val());
    $("#prac_marks_thesis").val(prac_marks);
    if (!prac_marks) {
      PU_validation("<li> External Marks is Required</li>");
      return false;
    }
    var Topic_Name = $.trim($("#Topic_Name").val());
    $("#Topic_Name").val(Topic_Name);
    if (!Topic_Name) {
      PU_validation("<li> Topic Name is Required</li>");
      return false;
    }

    var Examiner_Name = $.trim($("#Examiner_Name").val());
    $("#Examiner_Name").val(Examiner_Name);
    if (!Examiner_Name) {
      PU_validation("<li> Examiner Name is Required</li>");
      return false;
    } else {
      if (!validString(Examiner_Name)) {
        var error = "<li>Valid Examiner Name Required (Only in English)</li>";
        PU_validation(error);
        return false;
      }
    }

    if (!$("#error_main").hasClass("alert-error"))
      $("#error_main").addClass("alert-error");
    $("#error_main").removeClass("alert-success");
    $action_id = $.trim($(this).attr("id"));
    $finalize = "No";
    if ($action_id == "Finalize_btn_thesis") {
      $finalize = "Yes";
    } else if ($action_id == "saveAsDraft_btn_thesis") {
    } else {
      PU_validation("<li> Wrong Input, Contact Admin</li>");
      return false;
    }

    startLoader();
    var formdata = $("#student_process_div :input").serialize();
    var secureKey = $("#secureKey").val();
    var secureHash = $("#secureHash").val();

    var csrf = $("#_csrf").val();
    var url = BASEURL + "examination/umsthesismarks/saveasdraft";
    $.ajax({
      type: "POST",
      dataType: "json",
      url: url,
      data: {
        _csrf: csrf,
        formdata: formdata,
        finalize: $finalize,
        prac_marks: prac_marks,
        int_marks: internal_marks_thesis,
        Topic_Name: Topic_Name,
        Examiner_Name: Examiner_Name,
        secureKey: secureKey,
        secureHash: secureHash,
      },
      success: function (data) {
        var status_id = data.STATUS_ID;
        var res = data.STATUS_RESPONSE;
        window.location.replace(BASEURL + res);
      },
    });
  });

  $("body").on("click", ".ProcessStudentThesisForm", function () {
    $("#ActionCall_ID").val("");
    $val = $(this).val();
    if ($val == "Reject") {
      $RejectRemarks = $.trim($("#RejectRemarks").val());
      $("#RejectRemarks").val($RejectRemarks);
      if (!$RejectRemarks) {
        PU_validation("Remarks Required");
        return false;
      } else {
        if (!validStringalphanumeric($RejectRemarks)) {
          PU_validation("Only Aplha Numeric Remarks");
          return false;
        }
      }
    }
    $("#ActionCall_ID").val($val);

    startLoader();
    if (!$("#error_main").hasClass("alert-error"))
      $("#error_main").addClass("alert-error");
    $("#error_main").removeClass("alert-success");
    var formdata = $("#reapearStudentList_div_info :input").serialize();
    var csrf = $("#_csrf").val();
    var url = BASEURL + "examination/umsthesisstudents/process";
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
          $("#error_main").removeClass("alert-error");
          $("#error_main").addClass("alert-success");
          $("#reapearStudentList_div_info").html("");
        }
        PU_validation(res);
        return false;
      },
    });
  });

  $(".ResetExaminationRemarksForm").change(function () {
    $("#ExaminationRemarks_RollNo").attr("readonly", false);
    $(".Examination_remarks_div").hide();
    $(".Examination_process_Button").html("");
    $("#examination_div_info").html("");
    $("#ExaminationRemarks_RollNo").val("");
  });

  $("body").on("click", ".resetExaminationRemarks", function () {
    $("#ExaminationRemarks_RollNo").attr("readonly", false);
    $(".Examination_remarks_div").hide();
    $(".Examination_process_Button").html("");
    $("#examination_div_info").html("");
  });

  $("body").on("click", ".viewstudentgrouplists", function () {
    $("#assigngrpidtofaculty").val("");
    var error = "";
    $id = $(this).attr("id");

    var str = $id;
    var len = str.length;
    var fstr = parseInt(len) - parseInt(10);
    var lastid = str.substr(10, fstr);
    //var lastid = $id.slice(-1);

    var facultygrpid = $("#grpid" + lastid).val();
    var facultysubjectId = $("#subjectId" + lastid).val();
    var webtoken = $("#unassignjsonwebtoken").val();

    var Assign_Department = $("#Assign_Department").val();
    var Assign_Course = $("#Assign_Course").val();
    var actionSelect = $("#actionSelect").val();
    var semesterId = $("#semesterId").val();
    var Subject_Type = $("#Subject_Type").val();
    var subjectId = $("#subjectId").val();

    if (webtoken && facultygrpid && facultysubjectId) {
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

      if (!actionSelect) {
        error = error + "<li>Select Batch</li>";
        PU_validation(error);
        return false;
      }

      if (!semesterId) {
        error = error + "<li>Select Semester</li>";
        PU_validation(error);
        return false;
      }

      if (!Subject_Type) {
        error = error + "<li>Select Subject Type</li>";
        PU_validation(error);
        return false;
      }

      if (!subjectId) {
        error = error + "<li>Select Subject</li>";
        PU_validation(error);
        return false;
      }
      $("#assigngrpidtofaculty").val(facultygrpid);
      ViewStudentGroupWise();
    }
  });

  $("body").on("click", ".viewstudentgrouplistsfaculty", function () {
    $("#assigngrpidtofaculty").val("");
    var error = "";
    $id = $(this).attr("id");

    var str = $id;
    var len = str.length;
    var fstr = parseInt(len) - parseInt(10);
    var lastid = str.substr(10, fstr);
    //var lastid = $id.slice(-1);

    var facultygrpid = $("#grpid" + lastid).val();

    var Assign_Department = $("#Assign_Department").val();
    var Assign_Course = $("#Assign_Course").val();
    var actionSelect = $("#actionSelect").val();
    var semesterId = $("#semesterId").val();
    var Subject_Type = $("#Subject_Type").val();
    var subjectId = $("#subjectId").val();

    if (facultygrpid) {
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

      if (!actionSelect) {
        error = error + "<li>Select Batch</li>";
        PU_validation(error);
        return false;
      }

      if (!semesterId) {
        error = error + "<li>Select Semester</li>";
        PU_validation(error);
        return false;
      }

      if (!Subject_Type) {
        error = error + "<li>Select Subject Type</li>";
        PU_validation(error);
        return false;
      }

      if (!subjectId) {
        error = error + "<li>Select Subject</li>";
        PU_validation(error);
        return false;
      }
      $("#assigngrpidtofaculty").val(facultygrpid);
      ViewStudentGroupWiseFaculty();
    }
  });

  $("#Gazette_Examination_yearDIV")
    .datepicker({
      format: " yyyy",
      viewMode: "years",
      minViewMode: "years",
      endYear: CURRENT_YEAR,
      endDate: TODAY_DATE, //today_date
    })
    .on("changeDate", function () {
      var Gazette_Examination_year = $(this).val();
      $(this).val(Gazette_Examination_year);
      $(".datepicker").hide();
      $("#Assign_Department").val("");
      $("#Assign_Course").html("<option value=''>Select Course</option>");
      $("#actionSelect").html("<option value=''>Select Batch</option>");
      $("#semesterId").html("<option value=''>Select Semester</option>");
    });

  $(".Gazette_Status_semester").change(function () {
    $(".Gazette_process_Button").html("");
    $(".Gazette_Status_display").html("");
    $("#gazette_div_info").html("");
  });

  $(".Gazette_Examination").change(function () {
    $("#Assign_Department").val("");
    $("#Assign_Course").html("<option value=''>Select Course</option>");
    $("#actionSelect").html("<option value=''>Select Batch</option>");
    $("#semesterId").html("<option value=''>Select Semester</option>");
  });

  $("body").on("click", ".startLoaderClass", function () {
    startLoader();
  });

  $("body").on("click", ".ReAppear_All_Student_FinalizeProcess", function () {
    $("#RejectRemarks").val("");
    if ($(".ReAppear_All_Student_FinalizeProcess").is(":checked")) {
      $(
        "#reapearStudentStatusList_div_info table tbody input[type=checkbox]"
      ).each(function () {
        $(this).prop("checked", true);
      });
      $(".Process_Div_ByBadmin").show();
    } else {
      $(".Process_Div_ByBadmin").hide();
      $(
        "#reapearStudentStatusList_div_info table tbody input[type=checkbox]"
      ).each(function () {
        $(this).prop("checked", false);
      });
    }
  });

  $("body").on("click", ".ReAppear_Indvdal_Student_Finalize", function () {
    $("#RejectRemarks").val("");
    var chkDisplay = false;
    $(
      "#reapearStudentStatusList_div_info table tbody input[type=checkbox]"
    ).each(function () {
      if ($(this).prop("checked")) {
        $("body .ReAppear_All_Student_Process").prop("checked", false);
        chkDisplay = true;
        return false;
      }
    });
    if (chkDisplay) {
      $(".Process_Div_ByBadmin").show();
    } else {
      $(".Process_Div_ByBadmin").hide();
    }
  });

  /******************************************************************************/
  $("body").on("click", ".ReAppear_All_Student_Process", function () {
    $("#RejectRemarks").val("");
    if ($(".ReAppear_All_Student_Process").is(":checked")) {
      $("#reapearStudentList_div_info table tbody input[type=checkbox]").each(
        function () {
          $(this).prop("checked", true);
        }
      );
      $(".Process_Div_ByBAsst").show();
    } else {
      $(".Process_Div_ByBAsst").hide();
      $("#reapearStudentList_div_info table tbody input[type=checkbox]").each(
        function () {
          $(this).prop("checked", false);
        }
      );
    }
  });

  $("body").on("click", ".ReAppear_Indvdal_Student_Process", function () {
    $("#RejectRemarks").val("");
    var chkDisplay = false;
    $("#reapearStudentList_div_info table tbody input[type=checkbox]").each(
      function () {
        if ($(this).prop("checked")) {
          $("body .ReAppear_All_Student_Process").prop("checked", false);
          chkDisplay = true;
          return false;
        }
      }
    );
    if (chkDisplay) {
      $(".Process_Div_ByBAsst").show();
    } else {
      $(".Process_Div_ByBAsst").hide();
    }
  });

  /*****************************************************************/
  $("body").on("click", ".ReAppear_Student_AllSubjects", function () {
    if ($(".ReAppear_Student_AllSubjects").is(":checked")) {
      $("#reapearSubjects_div_info table tbody input[type=checkbox]").each(
        function () {
          $(".ReAppear_Student_SubmitDiv").show();
          $(this).prop("checked", true);
        }
      );
    } else {
      $(".ReAppear_Student_SubmitDiv").hide();
      $("#reapearSubjects_div_info table tbody input[type=checkbox]").each(
        function () {
          $chkDisabled = $(this).prop("disabled");
          if (!$chkDisabled) {
            $(this).prop("checked", false);
          }
        }
      );
    }
  });

  $("body").on("click", ".ReAppear_Student_SubjectWise", function () {
    var chkDisplay = false;
    $("#reapearSubjects_div_info table tbody input[type=checkbox]").each(
      function () {
        $chkDisabled = $(this).prop("disabled");
        if (!$chkDisabled) {
          if ($(this).prop("checked")) {
            $("body .ReAppear_Student_AllSubjects").prop("checked", false);
            chkDisplay = true;
            return false;
          }
        }
      }
    );
    if (chkDisplay) {
      $(".ReAppear_Student_SubmitDiv").show();
    } else {
      $(".ReAppear_Student_SubmitDiv").hide();
    }
  });

  $("body").on("click", ".BA_FinaLize_ReAppearMarks", function () {
    if (!$("#error_main").hasClass("alert-error"))
      $("#error_main").addClass("alert-error");
    $("#error_main").removeClass("alert-success");
    $action = $(this).val();
    if ($action == "Save As Draft" || $action == "Finalize") {
      startLoader();

      var formdata = $("#html_studentmarksinfo :input").serialize();
      var csrf = $("#_csrf").val();
      var url = BASEURL + "result/umsuploadreappearmarks/submitmarks";
      $.ajax({
        type: "POST",
        dataType: "json",
        url: url,
        data: {
          _csrf: csrf,
          formdata: formdata,
          action: $action,
        },
        success: function (data) {
          stopLoader();
          var status_id = data.STATUS_ID;
          var res = data.STATUS_RESPONSE;
          if (status_id == "000") {
            $("#error_main").removeClass("alert-error");
            $("#error_main").addClass("alert-success");
            $("#html_studentmarksinfo").html("");
            if (res == "Successfully Finaliized") {
              $removeSubjectFromList = $("#remove_SubjectFromList").val();
              $("#" + $removeSubjectFromList)
                .closest("tr")
                .remove();
              $(".new_Semester_Select").val("");
            }
            PU_validation(res);
            return false;
          } else {
            PU_validation(res);
            return false;
          }
        },
      });
    }
  });

  $(".Assign_Faculty_Department").change(function () {
    $csrf = $("#_csrf").val();
    $Assign_Faculty_Department = $(this).val();
    if ($Assign_Faculty_Department) {
      startLoader();
      startLoader();
      var url = BASEURL + "common/getfacultyonlybydeptid";
      startLoader();
      $.ajax({
        type: "POST",
        dataType: "json",
        url: url,
        data: { dept_id: $Assign_Faculty_Department, _csrf: $csrf },
        success: function (data) {
          stopLoader();
          //var status_id = data.STATUS_ID;
          var res = data.STATUS_RESPONSE;
          $(".assign_subject_to_faculty").html(res);
        },
      });
    } else {
      $htmlFaculty = "<option value=''>Select Faculty</option>";
      $(".assign_subject_to_faculty").html($htmlFaculty);
    }
  });

  $(".Assign_Badmin_Other_Department").change(function () {
    $csrf = $("#_csrf").val();
    $Assign_Faculty_Department = $(this).val();
    if ($Assign_Faculty_Department) {
      startLoader();
      startLoader();
      var url = BASEURL + "common/getfacultyonlybydeptid";
      startLoader();
      $.ajax({
        type: "POST",
        dataType: "json",
        url: url,
        data: { dept_id: $Assign_Faculty_Department, _csrf: $csrf },
        success: function (data) {
          stopLoader();
          //var status_id = data.STATUS_ID;
          var res = data.STATUS_RESPONSE;
          $(".assign_Other_Department_Faculty").html(res);
        },
      });
    } else {
      $htmlFaculty = "<option value=''>Select Faculty</option>";
      $(".assign_Other_Department_Faculty").html($htmlFaculty);
    }
  });

  $(".unsetassignunassignall").change(function () {
    $("#assignfacultyinfoDIV").html("");
    $("#facultyinfo").html("");
    $("#actionSelect").html("");
    $("#actionSelect").html("<option>Select Batch</option>");
    $("#semesterId").html("");
    $("#semesterId").html("<option>Select Semester</option>");
    $("#Subject_Type").val("");
    $("#subjectId").html("");
    $("#subjectId").html("<option>Select Subject</option>");
    $(".hidedepartmentforassignsubject").hide();
    $("#Assign_Faculty_Department").val("");
    $htmlFaculty = "<option value=''>Select Faculty</option>";
    $(".assign_subject_to_faculty").html($htmlFaculty);
    $(".assign_subject_to_faculty_btn").hide();
    $("#assigngrpidtofaculty").val("");

    $("#assign_groups").html("");
    $("#assign_groups").hide();
  });

  $(".unsetassignunassignnot1").change(function () {
    $("#assignfacultyinfoDIV").html("");
    $("#facultyinfo").html("");
    $("#semesterId").html("");
    $("#semesterId").html("");
    $("#semesterId").html("<option>Select Semester</option>");
    $("#Subject_Type").val("");
    $("#subjectId").html("");
    $("#subjectId").html("<option>Select Subject</option>");
    $(".hidedepartmentforassignsubject").hide();
    $("#Assign_Faculty_Department").val("");
    $htmlFaculty = "<option value=''>Select Faculty</option>";
    $(".assign_subject_to_faculty").html($htmlFaculty);
    $(".assign_subject_to_faculty_btn").hide();
    $("#assigngrpidtofaculty").val("");

    $("#assign_groups").html("");
    $("#assign_groups").hide();
  });

  $(".unsetassignunassignnot2").change(function () {
    $("#assignfacultyinfoDIV").html("");
    $("#facultyinfo").html("");
    $("#Subject_Type").val("");
    $("#subjectId").html("");
    $("#subjectId").html("<option>Select Subject</option>");
    $(".hidedepartmentforassignsubject").hide();
    $("#Assign_Faculty_Department").val("");
    $htmlFaculty = "<option value=''>Select Faculty</option>";
    $(".assign_subject_to_faculty").html($htmlFaculty);
    $(".assign_subject_to_faculty_btn").hide();
    $("#assigngrpidtofaculty").val("");

    $("#assign_groups").html("");
    $("#assign_groups").hide();
  });
  $(".unsetassignunassignnot3").change(function () {
    $("#assignfacultyinfoDIV").html("");
    $("#facultyinfo").html("");
    $(".hidedepartmentforassignsubject").hide();
    $("#Assign_Faculty_Department").val("");
    $htmlFaculty = "<option value=''>Select Faculty</option>";
    $(".assign_subject_to_faculty").html($htmlFaculty);
    $(".assign_subject_to_faculty_btn").hide();
    $("#assigngrpidtofaculty").val("");

    $("#assign_groups").html("");
    $("#assign_groups").hide();
  });

  $("body").on("click", ".Unassignsubjectbyhod", function () {
    $(".hidedepartmentforassignsubject").hide();
    $("#Assign_Faculty_Department").val("");
    $htmlFaculty = "<option value=''>Select Faculty</option>";
    $(".assign_subject_to_faculty").html($htmlFaculty);
    $(".assign_subject_to_faculty_btn").hide();
    $("#assigngrpidtofaculty").val("");

    var error = "";
    $id = $(this).attr("id");

    var str = $id;
    var len = str.length;
    var fstr = parseInt(len) - parseInt(8);
    var lastid = str.substr(8, fstr);
    //var lastid = $id.slice(-1);

    var facultyid = $("#facultyid" + lastid).val();
    var facultygrpid = $("#grpid" + lastid).val();
    var facultysubjectId = $("#subjectId" + lastid).val();
    var webtoken = $("#unassignjsonwebtoken").val();

    var Assign_Department = $("#Assign_Department").val();
    var Assign_Course = $("#Assign_Course").val();
    var actionSelect = $("#actionSelect").val();
    var semesterId = $("#semesterId").val();
    var Subject_Type = $("#Subject_Type").val();
    var subjectId = $("#subjectId").val();

    if (webtoken && facultyid && facultygrpid && facultysubjectId) {
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

      if (!actionSelect) {
        error = error + "<li>Select Batch</li>";
        PU_validation(error);
        return false;
      }

      if (!semesterId) {
        error = error + "<li>Select Semester</li>";
        PU_validation(error);
        return false;
      }

      if (!Subject_Type) {
        error = error + "<li>Select Subject Type</li>";
        PU_validation(error);
        return false;
      }

      if (!subjectId) {
        error = error + "<li>Select Subject</li>";
        PU_validation(error);
        return false;
      }
      PU_hide_validation();
      Unassignsubjectbyhod(
        webtoken,
        facultyid,
        facultygrpid,
        facultysubjectId,
        Assign_Department,
        Assign_Course,
        actionSelect,
        semesterId,
        Subject_Type
      );
    }
  });

  $("body").on("click", ".Assignsubjectbyhod", function () {
    var error = "";
    $id = $(this).attr("id");
    var str = $id;
    var len = str.length;
    var fstr = parseInt(len) - parseInt(6);
    var lastid = str.substr(6, fstr);
    // var lastid = $id.slice(-1);
    $(".assign_subject_to_faculty_btn").hide();
    $(".hidedepartmentforassignsubject").hide();

    var facultygrpid = $("#grpid" + lastid).val();
    var facultysubjectId = $("#subjectId" + lastid).val();
    var webtoken = $("#unassignjsonwebtoken").val();

    if (webtoken && facultygrpid && facultysubjectId) {
      $("#csrf_webtoken").val(webtoken);
      $("#assigngrpidtofaculty").val(facultygrpid);
      $(".assign_subject_to_faculty_btn").show();
      $(".hidedepartmentforassignsubject").show();
      $(".Assignsubjectbyhod").addClass("btn-primary");
      $(this).removeClass("btn-primary");
      $(this).addClass("btn-success");
    }
  });

  $("#Short_Attendance_from_date")
    .datepicker({
      format: "dd-mm-yyyy",
      endDate: TODAY_DATE, //today_date
      todayHighlight: true,
    })
    .on("changeDate", function () {
      var Short_Attendance_from_date = $(this).val();
      $(this).val(Short_Attendance_from_date);
      $(".datepicker").hide();
    });

  $("#Short_Attendance_to_date")
    .datepicker({
      format: "dd-mm-yyyy",
      endDate: TODAY_DATE, //today_date
      todayHighlight: true,
    })
    .on("changeDate", function () {
      var Short_Attendance_to_date = $(this).val();
      $(this).val(Short_Attendance_to_date);
      $(".datepicker").hide();
    });

  //    $("#ChangePassword_sendotp").focusin(function(){
  $("body").on("focusin", "#ChangePassword_sendotp", function () {
    $("#msgDisplay").remove();
  });
  $("#Assign_TypeofUser").change(function () {
    $("#html_AssignActivityinfo").html("");
  });

  $("#signINValidate").click(function () {
    $("#user_validation_text").html("");
    $("#user_validation_div").hide();
    var error;
    $pu_username = $.trim($("#pu_username").val());
    if (!$pu_username) {
      error = "&nbsp;&nbsp;User Name Required";
      $("#user_validation_text").html(error);
      $("#user_validation_div").show();
      return false;
    }

    $pu_password = $("#pu_password").val();
    if (!$pu_password) {
      error = "&nbsp;&nbsp;Password Required";
      $("#user_validation_text").html(error);
      $("#user_validation_div").show();
      return false;
    }

    $roleId = $("#roleId").val();
    if (!$roleId) {
      error = "&nbsp;&nbsp;Select Role";
      $("#user_validation_text").html(error);
      $("#user_validation_div").show();
      return false;
    }
    $("#pu_username").val($pu_username);
    startLoader();
  });

  $(".PUIntegerOnly").blur(function () {
    $chkInt_val = $.trim($(this).val());
    $(this).val($chkInt_val);
    if ($chkInt_val) onlyIntegerAllow($chkInt_val);
  });

  $("body").on("keypress", ".PUIntegerOnly", function (e) {
    if (e.which != 8 && e.which != 0 && (e.which < 48 || e.which > 57)) {
      return false;
    }
    return true;
  });

  $("body").on("click", ".uploadresult_view_studentinfo_new", function () {
    PU_hide_validation();
    $("#download_student_result").hide();
    if (!$("#error_main").hasClass("alert-error"))
      $("#error_main").addClass("alert-error");
    $("#error_main").removeClass("alert-success");
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
          formdata: formdata,
        },
        success: function (data) {
          stopLoader();
          var status_id = data.STATUS_ID;
          var res = data.STATUS_RESPONSE;
          if (status_id == "000") {
            $("#html_studentmarksinfo").html(res);
            $("#download_student_result").show();
          } else {
            PU_validation(res);
            return false;
          }
        },
      });
    } else {
      var error = "<li>Please Select Group</li>";
      PU_validation(error);
      return false;
    }
  });

  $("body").on("click", ".viewuploadedgroups", function () {
    PU_hide_validation();
    startLoader();
    $("#displayuploadedmarkgroups").html("");
    $("#viewuploadedbutton").hide();
    var form_id = $(this).attr("id");
    var formdata = $("." + form_id + " :input").serialize();
    var csrf = $("#_csrf").val();
    var url = BASEURL + "result/viewuploadedmarks/viewgroups";
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
          $("#displayuploadedmarkgroups").html(res);
          $("#viewuploadedbutton").show();
        } else {
          PU_validation(res);
          return false;
        }
      },
    });
  });

  $("body").on("click", ".download_student_result", function () {
    PU_hide_validation();
    startLoader();
    var formdata = $("#frm_enter_marks :input").serialize();
    var csrf = $("#_csrf").val();
    var url = BASEURL + "result/viewuploadedmarks/downloaduploadedmarks";
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
        var downloadurl =
          BASEURL +
          "attendance/umsshortattendancetxnstatus/downloadfile?filename=" +
          res;
        stopLoader();
        if (status_id == "000") {
          window.location.href = downloadurl;
        } else {
          PU_validation(res);
          return false;
        }
      },
    });
  });

  $("body").on("keypress", ".PU_Upto2Decimal", function (event) {
    var $this = $(this);
    $(this).attr("maxlength", 6);
    if (
      event.which == 80 ||
      $(this).val() == "P" ||
      event.which == 82 ||
      $(this).val() == "R"
    ) {
      $(this).attr("maxlength", 2);
      return true;
    }

    // 17-3-2023 change start
    if (
      event.which == 83 ||
      $(this).val() == "S" ||
      event.which == 88 ||
      $(this).val() == "X"
    ) {
      $(this).attr("maxlength", 4);
      return true;
    }

    // if(event.which == 65 || $(this).val() == "A" || event.which == 83 || $(this).val() == "S" || event.which == 88 || $(this).val() == "X" || event.which == 85 || $(this).val() == "U")
    // {
    //     $(this).attr('maxlength', 1);
    //     return true;
    // }
    // 17-3-2023 change end

    if (
      event.which == 65 ||
      $(this).val() == "A" ||
      //   event.which == 83 ||
      //   $(this).val() == "S" ||
      //   event.which == 88 ||
      //   $(this).val() == "X" ||
      event.which == 85 ||
      $(this).val() == "U"
    ) {
      $(this).attr("maxlength", 1);
      return true;
    }

    if (
      (event.which != 46 || $this.val().indexOf(".") != -1) &&
      (event.which < 48 || event.which > 57) &&
      event.which != 0 &&
      event.which != 8
    ) {
      event.preventDefault();
    }

    var text = $(this).val();
    if (event.which == 46 && text.indexOf(".") == -1) {
      setTimeout(function () {
        if ($this.val().substring($this.val().indexOf(".")).length > 3) {
          $this.val($this.val().substring(0, $this.val().indexOf(".") + 3));
        }
      }, 1);
    }

    if (
      text.indexOf(".") != -1 &&
      text.substring(text.indexOf(".")).length > 2 &&
      event.which != 0 &&
      event.which != 8 &&
      $(this)[0].selectionStart >= text.length - 2
    ) {
      event.preventDefault();
    }
  });

  $("body").on("click", ".btn_downloaddetailawardsheet", function (event) {
    PU_hide_validation();

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
    var actionSelect = $.trim($("#batch_session").val());
    if (!actionSelect) {
      var error = "<li>Select Batch</li>";
      PU_validation(error);
      return false;
    }
    var semesterId = $.trim($("#detailaward_sheet_semester").val());
    if (!semesterId) {
      var error = "<li>Select Semester123</li>";
      PU_validation(error);
      return false;
    }
    startLoader();
    $csrf = $("#_csrf").val();
    $frm_id = $(this).attr("id");
    var formdata = $("." + $frm_id + " :input").serialize();
    var url = BASEURL + "result/umsdetailawardsheet/downloaddetailsheet";
    $.ajax({
      type: "POST",
      url: url,
      dataType: "json",
      data: {
        formdata: formdata,
        _csrf: $csrf,
      },
      success: function (data) {
        var status_id = data.STATUS_ID;
        var res = data.STATUS_RESPONSE;
        var downloadurl =
          BASEURL +
          "attendance/umsshortattendancetxnstatus/downloadfile?filename=" +
          res;

        stopLoader();
        if (status_id == "000") {
          window.location.href = downloadurl;
        } else {
          PU_validation(res);
          return false;
        }
      },
    });
  });

  $("body").on("click", ".btn_downloadawardsheet", function (event) {
    PU_hide_validation();

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
    var actionSelect = $.trim($("#batch_session").val());
    if (!actionSelect) {
      var error = "<li>Select Batch</li>";
      PU_validation(error);
      return false;
    }
    var semesterId = $.trim($("#award_sheet_semester").val());
    if (!semesterId) {
      var error = "<li>Select Semester</li>";
      PU_validation(error);
      return false;
    }

    startLoader();
    $csrf = $("#_csrf").val();
    $frm_id = $(this).attr("id");
    var formdata = $("." + $frm_id + " :input").serialize();
    var url = BASEURL + "result/viewresult/downloadawardsheet";
    $.ajax({
      type: "POST",
      url: url,
      dataType: "json",
      data: {
        formdata: formdata,
        _csrf: $csrf,
      },
      success: function (data) {
        var status_id = data.STATUS_ID;
        var res = data.STATUS_RESPONSE;
        var downloadurl =
          BASEURL +
          "attendance/umsshortattendancetxnstatus/downloadfile?filename=" +
          res;

        stopLoader();
        if (status_id == "000") {
          window.location.href = downloadurl;
        } else {
          PU_validation(res);
          return false;
        }
      },
    });
  });

  $("body").on("click", ".btn_downloadawardsheetreappear", function (event) {
    PU_hide_validation();
    startLoader();
    $csrf = $("#_csrf").val();
    $frm_id = $(this).attr("id");
    var formdata = $("." + $frm_id + " :input").serialize();
    var url = BASEURL + "result/umsreappearawardsheet/downloadawardsheet";
    $.ajax({
      type: "POST",
      url: url,
      dataType: "json",
      data: {
        formdata: formdata,
        _csrf: $csrf,
      },
      success: function (data) {
        var status_id = data.STATUS_ID;
        var res = data.STATUS_RESPONSE;
        var downloadurl =
          BASEURL +
          "attendance/umsshortattendancetxnstatus/downloadfile?filename=" +
          res;

        stopLoader();
        if (status_id == "000") {
          window.location.href = downloadurl;
        } else {
          PU_validation(res);
          return false;
        }
      },
    });
  });

  $("body").on(
    "click",
    ".btn_downloadawardsheetreappeardetail",
    function (event) {
      PU_hide_validation();
      startLoader();
      $csrf = $("#_csrf").val();
      $frm_id = $(this).attr("id");
      var formdata = $("." + $frm_id + " :input").serialize();
      var url =
        BASEURL + "result/umsreappeardetailawardsheet/downloaddetailsheet";
      $.ajax({
        type: "POST",
        url: url,
        dataType: "json",
        data: {
          formdata: formdata,
          _csrf: $csrf,
        },
        success: function (data) {
          var status_id = data.STATUS_ID;
          var res = data.STATUS_RESPONSE;
          var downloadurl =
            BASEURL +
            "attendance/umsshortattendancetxnstatus/downloadfile?filename=" +
            res;

          stopLoader();
          if (status_id == "000") {
            window.location.href = downloadurl;
          } else {
            PU_validation(res);
            return false;
          }
        },
      });
    }
  );

  $("body").on("click", ".btn_downloadawardsheetthesis", function (event) {
    PU_hide_validation();

    startLoader();
    $csrf = $("#_csrf").val();
    $frm_id = $(this).attr("id");
    var formdata = $("." + $frm_id + " :input").serialize();
    var url = BASEURL + "examination/umsthesisawardsheet/downloadawardsheet";
    $.ajax({
      type: "POST",
      url: url,
      dataType: "json",
      data: {
        formdata: formdata,
        _csrf: $csrf,
      },
      success: function (data) {
        var status_id = data.STATUS_ID;
        var res = data.STATUS_RESPONSE;
        var downloadurl =
          BASEURL +
          "attendance/umsshortattendancetxnstatus/downloadfile?filename=" +
          res;

        stopLoader();
        if (status_id == "000") {
          window.location.href = downloadurl;
        } else {
          PU_validation(res);
          return false;
        }
      },
    });
  });

  $("body").on("click", ".btn_downloadresultsheetthesis", function (event) {
    PU_hide_validation();

    startLoader();
    $csrf = $("#_csrf").val();
    $frm_id = $(this).attr("id");
    var formdata = $("." + $frm_id + " :input").serialize();
    var url = BASEURL + "examination/umsthesisawardsheet/downloaduploadedmarks";
    $.ajax({
      type: "POST",
      url: url,
      dataType: "json",
      data: {
        formdata: formdata,
        _csrf: $csrf,
      },
      success: function (data) {
        var status_id = data.STATUS_ID;
        var res = data.STATUS_RESPONSE;
        var downloadurl =
          BASEURL +
          "attendance/umsshortattendancetxnstatus/downloadfile?filename=" +
          res;

        stopLoader();
        if (status_id == "000") {
          window.location.href = downloadurl;
        } else {
          PU_validation(res);
          return false;
        }
      },
    });
  });

  $("body").on(
    "click",
    ".btn_downloadattendanceregistermonthly",
    function (event) {
      $attendance_register_month = $("#attendance_register_month").val();
      if (!$attendance_register_month) {
        var error = "<li>Please Select Month</li>";
        PU_validation(error);
        return false;
      }

      $attendance_register_year = $("#attendance_register_year").val();
      if (!$attendance_register_year) {
        var error = "<li>Please Select Year</li>";
        PU_validation(error);
        return false;
      }

      PU_hide_validation();
      startLoader();
      $csrf = $("#_csrf").val();
      $frm_id = $(this).attr("id");
      var formdata = $("." + $frm_id + " :input").serialize();
      var url =
        BASEURL +
        "attendance/umsattendanceregistermonthly/downloadattendanceregister";
      $.ajax({
        type: "POST",
        url: url,
        dataType: "json",
        data: {
          formdata: formdata,
          _csrf: $csrf,
          year: $attendance_register_year,
          month: $attendance_register_month,
        },
        success: function (data) {
          var status_id = data.STATUS_ID;
          var res = data.STATUS_RESPONSE;
          //var downloadurl =  BASEURL + "attendance/umsshortattendancetxnstatus/downloadfile?filename="+res;

          var downloadurl =
            BASEURL +
            "download/mdbdetailgrade/downloadexcelfile?filename=" +
            res;
          stopLoader();
          if (status_id == "000") {
            window.location.href = downloadurl;
          } else {
            PU_validation(res);
            return false;
          }
        },
      });
    }
  );

  $("body").on(
    "click",
    ".btn_downloadattendanceregistermonthlypdf",
    function (event) {
      $attendance_register_month = $("#attendance_register_month").val();
      if (!$attendance_register_month) {
        var error = "<li>Please Select Month</li>";
        PU_validation(error);
        return false;
      }

      $attendance_register_year = $("#attendance_register_year").val();
      if (!$attendance_register_year) {
        var error = "<li>Please Select Year</li>";
        PU_validation(error);
        return false;
      }

      PU_hide_validation();
      startLoader();
      $csrf = $("#_csrf").val();
      $frm_id = $(this).attr("id");
      var formdata = $("." + $frm_id + " :input").serialize();
      var url =
        BASEURL +
        "attendance/umsattendanceregistermonthly/downloadattendanceregisterpdf";
      $.ajax({
        type: "POST",
        url: url,
        dataType: "json",
        data: {
          formdata: formdata,
          _csrf: $csrf,
          year: $attendance_register_year,
          month: $attendance_register_month,
        },
        success: function (data) {
          var status_id = data.STATUS_ID;
          var res = data.STATUS_RESPONSE;
          var downloadurl =
            BASEURL +
            "attendance/umsshortattendancetxnstatus/downloadfile?filename=" +
            res;
          //var downloadurl =  BASEURL + "download/mdbdetailgrade/downloadexcelfile?filename="+res;
          stopLoader();
          if (status_id == "000") {
            window.location.href = downloadurl;
          } else {
            PU_validation(res);
            return false;
          }
        },
      });
    }
  );

  $("body").on("click", ".btn_downloadattendanceregister", function (event) {
    /*
                                                                                                        $attendance_register_month = $("#attendance_register_month").val();
                                                                                                        if(!$attendance_register_month)
                                                                                                        {
                                                                                                            var error = "<li>Please Select Month</li>";
                                                                                                            PU_validation(error);
                                                                                                            return false;    
                                                                                                        }
                                                                                                        
                                                                                                        $attendance_register_year = $("#attendance_register_year").val();
                                                                                                        if(!$attendance_register_year)
                                                                                                        {
                                                                                                            var error = "<li>Please Select Year</li>";
                                                                                                            PU_validation(error);
                                                                                                            return false;    
                                                                                                        }
                                                                                                        */

    PU_hide_validation();
    startLoader();
    $csrf = $("#_csrf").val();
    $frm_id = $(this).attr("id");
    var formdata = $("." + $frm_id + " :input").serialize();
    var url =
      BASEURL + "attendance/umsattendanceregister/downloadattendanceregister";
    $.ajax({
      type: "POST",
      url: url,
      dataType: "json",
      data: {
        formdata: formdata,
        _csrf: $csrf,
        //year:$attendance_register_year,
        //month:$attendance_register_month,
      },
      success: function (data) {
        var status_id = data.STATUS_ID;
        var res = data.STATUS_RESPONSE;
        //var downloadurl =  BASEURL + "attendance/umsshortattendancetxnstatus/downloadfile?filename="+res;

        var downloadurl =
          BASEURL + "download/mdbdetailgrade/downloadexcelfile?filename=" + res;
        stopLoader();
        if (status_id == "000") {
          window.location.href = downloadurl;
        } else {
          PU_validation(res);
          return false;
        }
      },
    });
  });

  $("body").on("click", ".btn_downloadattendanceregisterpdf", function (event) {
    $attendance_register_month = $("#attendance_register_month").val();
    if (!$attendance_register_month) {
      var error = "<li>Please Select Month</li>";
      PU_validation(error);
      return false;
    }

    $attendance_register_year = $("#attendance_register_year").val();
    if (!$attendance_register_year) {
      var error = "<li>Please Select Year</li>";
      PU_validation(error);
      return false;
    }

    PU_hide_validation();
    startLoader();
    $csrf = $("#_csrf").val();
    $frm_id = $(this).attr("id");
    var formdata = $("." + $frm_id + " :input").serialize();
    var url =
      BASEURL +
      "attendance/umsattendanceregister/downloadattendanceregisterpdf";
    $.ajax({
      type: "POST",
      url: url,
      dataType: "json",
      data: {
        formdata: formdata,
        _csrf: $csrf,
        year: $attendance_register_year,
        month: $attendance_register_month,
      },
      success: function (data) {
        var status_id = data.STATUS_ID;
        var res = data.STATUS_RESPONSE;
        var downloadurl =
          BASEURL +
          "attendance/umsshortattendancetxnstatus/downloadfile?filename=" +
          res;
        //var downloadurl =  BASEURL + "download/mdbdetailgrade/downloadexcelfile?filename="+res;
        stopLoader();
        if (status_id == "000") {
          window.location.href = downloadurl;
        } else {
          PU_validation(res);
          return false;
        }
      },
    });
  });

  $(".viewassignsubject_HideDisplaydiv").change(function () {
    $("#Subject_Type").val("");
    $("#subjectId").html("");
    $html = "<option value=''>Select Subject</option>";
    $("#subjectId").html($html);
    $("#ViewSubject_Div").html("");
  });

  $(".viewassignsubject_HideDisplaydiv1").change(function () {
    $("#ViewSubject_Div").html("");
  });

  $(".detailaward_sheet_semester").change(function () {
    PU_hide_validation();
    $("#batchmarksinfo").html("");
    $secureKey = $("#secureKey").val();
    $secureHash = $("#secureHash").val();
    $batch_session = $("#batch_session").val();
    $semesterId = $(this).val();
    $csrf = $("#_csrf").val();
    if ($batch_session && $semesterId) {
      var Assign_Department = $("#Assign_Department").val();
      var Assign_Course = $("#Assign_Course").val();
      startLoader();
      var url = BASEURL + "result/umsdetailawardsheet/getbatchsubjectlist";
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
          if (status_id == "000") $("#batchmarksinfo").html(res);
          else {
            $("#batchmarksinfo").html("");
            PU_validation(res);
            return false;
          }
        },
      });
    }
  });

  $(".award_sheet_semester").change(function () {
    PU_hide_validation();
    $("#batchmarksinfo").html("");
    $secureKey = $("#secureKey").val();
    $secureHash = $("#secureHash").val();
    $batch_session = $("#batch_session").val();
    $semesterId = $(this).val();
    $csrf = $("#_csrf").val();
    if ($batch_session && $semesterId) {
      var Assign_Department = $("#Assign_Department").val();
      var Assign_Course = $("#Assign_Course").val();
      startLoader();
      var url = BASEURL + "result/viewresult/getbatchsubjectlist";
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
          if (status_id == "000") $("#batchmarksinfo").html(res);
          else {
            $("#batchmarksinfo").html("");
            PU_validation(res);
            return false;
          }
        },
      });
    }
  });

  $(".thesis_award_sheet_semester").change(function () {
    PU_hide_validation();
    $("#batchmarksinfo").html("");
    $secureKey = $("#secureKey").val();
    $secureHash = $("#secureHash").val();
    $batch_session = $("#batch_session").val();
    $semesterId = $(this).val();
    $csrf = $("#_csrf").val();
    if ($batch_session && $semesterId) {
      var Assign_Department = $("#Assign_DepartmentThesis").val();
      var Assign_Course = $("#Assign_Course").val();
      startLoader();
      var url = BASEURL + "examination/umsthesisawardsheet/getbatchsubjectlist";
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
          if (status_id == "000") $("#batchmarksinfo").html(res);
          else {
            $("#batchmarksinfo").html("");
            PU_validation(res);
            return false;
          }
        },
      });
    }
  });

  $(".attendance_register_semester").change(function () {
    PU_hide_validation();
    $("#attendance_register_div_info").html("");
    $secureKey = $("#secureKey").val();
    $secureHash = $("#secureHash").val();
    $batch_session = $("#batch_session").val();
    $semesterId = $(this).val();
    $csrf = $("#_csrf").val();
    if ($batch_session && $semesterId) {
      var Assign_Department = $("#Assign_Department").val();
      var Assign_Course = $("#Assign_Course").val();
      startLoader();
      var url =
        BASEURL + "attendance/umsattendanceregister/getbatchsubjectlist";
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
          if (status_id == "000") $("#attendance_register_div_info").html(res);
          else {
            $("#attendance_register_div_info").html("");
            PU_validation(res);
            return false;
          }
        },
      });
    }
  });

  $(".attendance_register_monthly_semester").change(function () {
    PU_hide_validation();
    $("#attendance_register_monthly_div_info").html("");
    $secureKey = $("#secureKey").val();
    $secureHash = $("#secureHash").val();
    $batch_session = $("#batch_session").val();
    $semesterId = $(this).val();
    $csrf = $("#_csrf").val();
    if ($batch_session && $semesterId) {
      var Assign_Department = $("#Assign_Department").val();
      var Assign_Course = $("#Assign_Course").val();
      startLoader();
      var url =
        BASEURL + "attendance/umsattendanceregistermonthly/getbatchsubjectlist";
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
            $("#attendance_register_monthly_div_info").html(res);
          else {
            $("#attendance_register_monthly_div_info").html("");
            PU_validation(res);
            return false;
          }
        },
      });
    }
  });

  $("body").on("click", ".definalize_actionBtn", function () {
    $comonClass = $(this).attr("id");
    $subject_ID = $("." + $comonClass + "Subject").val();
    $faculty_ID = $("." + $comonClass + "Faculty").val();
    $dept_ID = $("#Assign_Department").val();
    $course_ID = $("#Assign_Course").val();
    $Batch = $("#session_yr").val();
    $semester_ID = $("#semesterId").val();
    $secureKey = $("#secureKey").val();
    $secureHash = $("#secureHash").val();

    if (
      $subject_ID &&
      $faculty_ID &&
      $dept_ID &&
      $course_ID &&
      $Batch &&
      $semester_ID
    ) {
      startLoader();
      $csrf = $("#_csrf").val();
      var url = BASEURL + "result/subjectstatus/definalize";
      $.ajax({
        type: "POST",
        url: url,
        dataType: "json",
        data: {
          Subject: $subject_ID,
          Faculty: $faculty_ID,
          Department: $dept_ID,
          Course: $course_ID,
          Session: $Batch,
          Semester: $semester_ID,
          secureKey: $secureKey,
          secureHash: $secureHash,
          _csrf: $csrf,
        },
        success: function (data) {
          var status_id = data.STATUS_ID;
          var res = data.STATUS_RESPONSE;
          window.location.replace(BASEURL + res);
        },
      });
    }
  });

  $("body").on("click", ".assign_allstudent_to_group", function () {
    if ($(".assign_allstudent_to_group").is(":checked")) {
      $("#subjectTable_wrapper table input[type=checkbox]").each(function () {
        $("#Assign_group").show();
        $(this).prop("checked", true);
      });
    } else {
      $("#Assign_group").hide();
      $("#subjectTable_wrapper table input[type=checkbox]").each(function () {
        $(this).prop("checked", false);
      });
    }
  });

  $("body").on("click", ".activate_decativate_action", function () {
    startLoader();
    $form_serialize_class = $(this).attr("id");
    var formdata = $("." + $form_serialize_class + " :input").serialize();
    $csrf = $("#_csrf").val();
    var url = BASEURL + "workflow/viewregisteredstudent/activatedeactivate";
    $.ajax({
      type: "POST",
      url: url,
      dataType: "json",
      data: {
        formdata: formdata,
        _csrf: $csrf,
      },
      success: function (data) {
        var status_id = data.STATUS_ID;
        var res = data.STATUS_RESPONSE;
        window.location.replace(BASEURL + res);
      },
    });
  });

  $("body").on("click", ".Final_Edit_Action", function () {
    PU_hide_validation();

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

    var beGroupMaster_action = $.trim($("#beGroupMaster_action").val());
    if (!beGroupMaster_action) {
      var error = "<li>Select Action</li>";
      PU_validation(error);
      return false;
    }

    if (
      beGroupMaster_action == "U" ||
      beGroupMaster_action == "S" ||
      beGroupMaster_action == "D"
    ) {
      var Group_For = $.trim($("#Group_For").val());
      if (!Group_For) {
        var error = "<li>Select Group For</li>";
        PU_validation(error);
        return false;
      }

      if (Group_For == "ET" || Group_For == "EP") {
        var Elective_Subject = $.trim($("#Elective_Subject").val());
        if (!Elective_Subject) {
          var error = "<li>Select Elective Subject</li>";
          PU_validation(error);
          return false;
        }
      }
      var beGroupMaster_Groups_To;
      if (beGroupMaster_action == "U") {
        beGroupMaster_Groups_To = "";
      } else {
        beGroupMaster_Groups_To = $.trim($("#beGroupMaster_Groups_To").val());
        if (!beGroupMaster_Groups_To) {
          var error = "<li>Select Group</li>";
          PU_validation(error);
          return false;
        }
      }
    }

    /********************************* beGroupMaster_RollNo  ******************************************/
    var beGroupMaster_RollNo = $.trim($("#beGroupMaster_RollNo").val());
    $("#beGroupMaster_RollNo").val(beGroupMaster_RollNo);
    if (beGroupMaster_RollNo) {
      if (!validrollno(beGroupMaster_RollNo)) {
        error = "<li>Valid Roll No Required</li>";
        PU_validation(error);
        return false;
      }
    } else {
      error = "<li>Roll No Required</li>";
      PU_validation(error);
      return false;
    }

    PU_hide_validation();
    startLoader();
    updateGroups();
  });

  $("body").on("click", ".assign_student_to_group", function () {
    var chkDisplay = false;
    $("#subjectTable_wrapper table input[type=checkbox]").each(function () {
      if ($(this).prop("checked")) {
        chkDisplay = true;
        return false;
      }
    });
    if (chkDisplay) {
      $("#Assign_group").show();
    } else {
      $("#Assign_group").hide();
    }
  });

  $("body").on("click", ".assign_group_checkbox", function () {
    var chkDisplay = false;
    $("#assign_groups input[type=checkbox]").each(function () {
      if ($(this).prop("checked")) {
        chkDisplay = true;
        return false;
      }
    });
    if (chkDisplay) {
      $("#assign_group_btn").show();
      $("#viewStudent_group_btn").show();
    } else {
      $("#assign_group_btn").hide();
      $("#viewStudent_group_btn").hide();
    }
  });

  $("#updateregno_yearDIV")
    .datepicker({
      format: " yyyy",
      viewMode: "years",
      minViewMode: "years",
      endYear: CURRENT_YEAR,
    })
    .on("changeDate", function () {
      var updateregno_yearDIV = $(this).val();
      $(this).val(updateregno_yearDIV);
      getEndBatch();
      $(".datepicker").hide();
    });

  $("#attendance_register_yearDIV")
    .datepicker({
      format: " yyyy",
      viewMode: "years",
      minViewMode: "years",
      endYear: CURRENT_YEAR,
      endDate: TODAY_DATE, //today_date
    })
    .on("changeDate", function () {
      var attendance_register_year = $(this).val();
      $(this).val(attendance_register_year);
      $(".datepicker").hide();
      $("#Reappear_Award_Sheet_Session").val("");
    });

  $("#attendance_register_monthDIV")
    .datepicker({
      format: "MM",
      viewMode: "months",
      minViewMode: "months",
      endDate: TODAY_DATE, //today_date
      endYear: CURRENT_YEAR,
    })
    .on("changeDate", function () {
      var attendance_register_month = $(this).val();
      $(this).val(attendance_register_month);
      $(".datepicker").hide();
    });

  $("#student_dob")
    .datepicker({
      format: "dd-mm-yyyy",
      endDate: TODAY_DATE, //today_date
      todayHighlight: true,
    })
    .on("changeDate", function () {
      var student_dob = $(this).val();
      $(this).val(student_dob);
      $(".datepicker").hide();
    });

  $("#student_fatherdob")
    .datepicker({
      format: "dd-mm-yyyy",
      endDate: TODAY_DATE, //today_date
      todayHighlight: true,
    })
    .on("changeDate", function () {
      var father_birth = $(this).val();
      $("#student_fatherdob").val(father_birth);

      $(".datepicker").hide();
    });

  $(".reset_editGroup_div").change(function () {
    $("#beGroupMaster_Group_For_Main_div").hide();
    $("#Editgroup_Search").hide();
    $("#beGroupMaster_Group_List").hide();
    $("#beGroupMaster_RollNo_main_div").hide();
    $("#EDIT_studentinfo").html("");
    $("#Group_For").val("");
    $("#beGroupMaster_RollNo").val("");
    $("#beGroupMaster_action").val("");
    $("#Elective_Subject_For").hide();
    $("#Elective_Subject_For").html("");
  });

  $("#beGroupMaster_action").change(function () {
    $actionVal = $(this).val();
    $("#beGroupMaster_Group_For_Main_div").hide();
    $("#Editgroup_Search").hide();
    $("#beGroupMaster_Group_List").hide();
    $("#beGroupMaster_RollNo_main_div").hide();
    $("#EDIT_studentinfo").html("");
    $("#Group_For").val("");
    $("#beGroupMaster_RollNo").val("");
    $("#Elective_Subject_For").hide();
    $("#Elective_Subject_For").html("");

    if ($actionVal) {
      if ($actionVal == "S") {
        $("#beGroupMaster_Group_For_Main_div").show();
        $("#Editgroup_Search").show();
      } else if ($actionVal == "D") {
        $("#beGroupMaster_Group_For_Main_div").show();
      } else if ($actionVal == "U") {
        $("#Editgroup_Search").show();
        $("#beGroupMaster_Group_For_Main_div").show();
      } else {
        PU_validation("<li> Contat Admin For Appropiate Action.</li>");
      }
    }
  });
  $("#Assign_Department").change(function () {
    $CY_class = $(this).hasClass("CY");
    $("#subjectId").html("<option value='ALL'>Select Subject</option>");
    $("#facultyinfo").html("");
    $("#assign_groups").html();
    $("#assign_groups").hide();
    $("#studentinfo").html("");
    $("#studentinfo").removeClass("panel panel-default");
    $html = "<option value=''>Select Course</option>";
    $("#frm_student_endSession").val("");
    $("#semester_promoted_to").val("");
    $semester_promoted_to = "<option value=''>Select Semester</option>";
    $semesterId = "<option value=''>Select Semester</option>";
    $dept_id = $(this).val();
    $csrf = $("#_csrf").val();
    if ($dept_id && $CY_class) {
      startLoader();
      var url = BASEURL + "workflow/umsassigncourse/getcoursebydeptid";
      startLoader();
      $.ajax({
        type: "POST",
        dataType: "json",
        url: url,
        data: { dept_id: $dept_id, _csrf: $csrf },
        success: function (data) {
          stopLoader();
          //var status_id = data.STATUS_ID;
          var res = data.STATUS_RESPONSE;
          $("#Assign_Course").html(res);
        },
      });
    } else {
      $("#Assign_Course").html($html);
      $("#semesterId").html($semesterId);
      $("#semester_promoted_to").html($semester_promoted_to);
      $htmlBatch = "<option value=''>Select Batch</option>";
      $(".new_Batch_Select").html($htmlBatch);
    }
  });

  $("#Assign_Course").change(function () {
    $("#semester_promoted_to").val("");
    $("#studentinfo").html("");
    $("#studentinfo").removeClass("panel panel-default");
    $Course_id = $(this).val();
    $frm_student_endSession = "";
    if ($Course_id) {
      if ($Course_id == "11") {
        $frm_student_endSession =
          parseInt($("#frm_student_startSession").val()) + parseInt(4);
      } else if ($Course_id == "33" || $Course_id == "22") {
        $frm_student_endSession =
          parseInt($("#frm_student_startSession").val()) + parseInt(2);
      } else {
      }
    }
    $("#frm_student_endSession").val($frm_student_endSession);
  });

  $(".new_Course_Select").change(function () {
    $csrf = $("#_csrf").val();
    $course_id = $(this).val();
    if ($course_id) {
      startLoader();
      startLoader();
      var url = BASEURL + "workflow/umsassigncourse/getbatchbycourseid";
      startLoader();
      $.ajax({
        type: "POST",
        dataType: "json",
        url: url,
        data: { course_id: $course_id, _csrf: $csrf },
        success: function (data) {
          stopLoader();
          //var status_id = data.STATUS_ID;
          var res = data.STATUS_RESPONSE;
          $(".new_Batch_Select").html(res);
        },
      });
    } else {
      $htmlBatch = "<option value=''>Select Batch</option>";
      $(".new_Batch_Select").html($htmlBatch);
      $htmlSemester = "<option value=''>Select Semester</option>";
      $(".new_Semester_Select").html($htmlSemester);
    }
  });

  $(".Gazette_Print_Course").change(function () {
    $csrf = $("#_csrf").val();
    $course_id = $(this).val();
    $Gazette_Examination = $("#Gazette_Examination").val();
    $Gazette_Examination_Year = $("#Gazette_Examination_year").val();
    if ($course_id && $Gazette_Examination && $Gazette_Examination_Year) {
      startLoader();
      startLoader();
      var url = BASEURL + "examination/umsgazetteprinting/getbatchbycourseid";
      startLoader();
      $.ajax({
        type: "POST",
        dataType: "json",
        url: url,
        data: {
          course_id: $course_id,
          _csrf: $csrf,
          Examination: $Gazette_Examination,
          Year: $Gazette_Examination_Year,
        },
        success: function (data) {
          stopLoader();
          var status_id = data.STATUS_ID;
          var res = data.STATUS_RESPONSE;
          if (status_id == "000") $(".Gazette_Print_Batch").html(res);
          else {
            PU_validation("<li>" + res + "</li>");
          }
        },
      });
    } else {
      $htmlBatch = "<option value=''>Select Batch</option>";
      $(".Gazette_Print_Batch").html($htmlBatch);
      $htmlSemester = "<option value=''>Select Semester</option>";
      $(".Gazette_Print_Semester").html($htmlSemester);
    }
  });

  $(".Gazette_Print_Batch").change(function () {
    $csrf = $("#_csrf").val();
    $Batch = $(this).val();
    $Gazette_Examination = $("#Gazette_Examination").val();
    $Gazette_Examination_Year = $("#Gazette_Examination_year").val();
    if ($Batch && $Gazette_Examination && $Gazette_Examination_Year) {
      startLoader();
      startLoader();
      var url = BASEURL + "examination/umsgazetteprinting/getsemesterbybatch";
      startLoader();
      $.ajax({
        type: "POST",
        dataType: "json",
        url: url,
        data: {
          Batch: $Batch,
          _csrf: $csrf,
          Examination: $Gazette_Examination,
          Year: $Gazette_Examination_Year,
        },
        success: function (data) {
          stopLoader();
          var status_id = data.STATUS_ID;
          var res = data.STATUS_RESPONSE;
          if (status_id == "000") $(".Gazette_Print_Semester").html(res);
          else {
            PU_validation("<li>" + res + "</li>");
          }
        },
      });
    } else {
      $htmlSemester = "<option value=''>Select Semester</option>";
      $(".Gazette_Print_Semester").html($htmlSemester);
    }
  });

  $(".new_Batch_Select").change(function () {
    $csrf = $("#_csrf").val();
    $batch_id = $(this).val();
    if ($batch_id) {
      startLoader();
      startLoader();
      var url = BASEURL + "workflow/umsassigncourse/getsemesterbybatch";
      startLoader();
      $.ajax({
        type: "POST",
        dataType: "json",
        url: url,
        data: { batch_id: $batch_id, _csrf: $csrf },
        success: function (data) {
          stopLoader();
          //var status_id = data.STATUS_ID;
          var res = data.STATUS_RESPONSE;
          $(".new_Semester_Select").html(res);
        },
      });
    } else {
      $htmlSemester = "<option value=''>Select Semester</option>";
      $(".new_Semester_Select").html($htmlSemester);
    }
  });

  $(".new_Batch_SelectTo").change(function () {
    $csrf = $("#_csrf").val();
    $batch_id = $(this).val();
    if ($batch_id) {
      startLoader();
      startLoader();
      var url = BASEURL + "workflow/umsassigncourse/getsemesterbybatch";
      startLoader();
      $.ajax({
        type: "POST",
        dataType: "json",
        url: url,
        data: { batch_id: $batch_id, _csrf: $csrf },
        success: function (data) {
          stopLoader();
          //var status_id = data.STATUS_ID;
          var res = data.STATUS_RESPONSE;
          $(".new_Semester_SelectTo").html(res);
        },
      });
    } else {
      $htmlSemester = "<option value=''>Select Semester</option>";
      $(".new_Semester_SelectTo").html($htmlSemester);
    }
  });

  $("#clgId").change(function () {
    $htmlDept = "<option value=''>Select Department</option>";
    $htmlCourse = "<option value=''>Select Course</option>";
    $semesterId = "<option value=''>Select Semester</option>";
    $("#frm_student_endSession").val("");
    $clgId = $(this).val();
    $csrf = $("#_csrf").val();
    if ($clgId) {
      startLoader();
      var url = BASEURL + "workflow/umsstudentmaster/getdepartmentbyclgid";
      startLoader();
      $.ajax({
        type: "POST",
        dataType: "json",
        url: url,
        data: { clgId: $clgId, _csrf: $csrf },
        success: function (data) {
          stopLoader();
          //var status_id = data.STATUS_ID;
          var res = data.STATUS_RESPONSE;
          $("#Assign_Department").html(res);
        },
      });
    } else {
      $("#Assign_Department").html($htmlDept);
      $("#Assign_Course").html($htmlCourse);
      $("#semesterId").html($semesterId);
    }
  });
  $("#semesterId").change(function () {
    $PromoteYes_class = $(this).hasClass("PromoteYes");
    if ($PromoteYes_class) {
      if (!semesterPromotedTo()) {
        return false;
      }
    }
    $PopulateStudent = $(this).hasClass("PopulateStudent");
    if ($PopulateStudent) PopulateStudent("Y");
  });
});
function assignSubjectByHOD() {
  startLoader();
  var formdata = $("#frm_assignsubjectbyhod :input").serialize();
  var csrf = $("#_csrf").val();
  var url = BASEURL + "workflow/umsfacultysubjectassigner/assignsubjectbyhod";
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
        $("#error_main").removeClass("alert-error");
        $("#error_main").addClass("alert-success");
        PU_validation(res);
        $("#assignfacultyinfoDIV").html("");
        $(".hidedepartmentforassignsubject").hide();
        $("#Assign_Faculty_Department").val("");
        $htmlFaculty = "<option value=''>Select Faculty</option>";
        $(".assign_subject_to_faculty").html($htmlFaculty);
        $(".assign_subject_to_faculty_btn").hide();
        $("#assigngrpidtofaculty").val("");
      } else {
        PU_validation("<li>" + res + "</li>");
      }
    },
  });
}
function Unassignsubjectbyhod(
  webtoken,
  facultyid,
  facultygrpid,
  facultysubjectId,
  Assign_Department,
  Assign_Course,
  actionSelect,
  semesterId,
  Subject_Type
) {
  startLoader();
  var url = BASEURL + "workflow/umsfacultysubjectassigner/unassignsubjectbyhod";
  $csrf = $("#_csrf").val();

  $.ajax({
    type: "POST",
    url: url,
    dataType: "json",
    data: {
      _csrf: $csrf,
      Batch: actionSelect,
      Department: Assign_Department,
      Course: Assign_Course,
      Semester: semesterId,
      Subject_Type: Subject_Type,
      facultyid: facultyid,
      facultygrpid: facultygrpid,
      facultysubjectId: facultysubjectId,
      token: webtoken,
    },
    success: function (data) {
      stopLoader();
      var status_id = data.STATUS_ID;
      var res = data.STATUS_RESPONSE;
      if (status_id == "000") {
        $("#error_main").removeClass("alert-error");
        $("#error_main").addClass("alert-success");
        PU_validation(res);
        $("#assignfacultyinfoDIV").html("");
      } else {
        PU_validation("<li>" + res + "</li>");
      }
    },
  });
}
function PopulateStudent($YesNo) {
  PU_hide_validation();
  $("#Assign_group").hide();
  $("#studentinfo").html("");
  $("#studentinfo").removeClass("panel panel-default");

  $actionSelect = $("#actionSelect").val();
  $Assign_Department = $("#Assign_Department").val();
  $Assign_Course = $("#Assign_Course").val();
  $semesterId = $("#semesterId").val();
  $Group_For = $("#Group_For").val();
  $populatestudent = true;
  $Elective_Subject = "";
  if (
    $actionSelect &&
    $Assign_Department &&
    $Assign_Course &&
    $semesterId &&
    $Group_For
  ) {
    //if(!validBatchWithSession())
    //return false;
    if ($YesNo == "Y") {
      $("#Elective_Subject_For").html("");
      $("#Elective_Subject_For").hide();
      if ($Group_For == "ET" || $Group_For == "EP") {
        $Validate = "Y";
        $resElective = ExtractElectiveSubject(
          $actionSelect,
          $Validate,
          $Group_For,
          $Assign_Department,
          $Assign_Course,
          $semesterId
        );
        if ($resElective) $populatestudent = true;
        else $populatestudent = false;
        return false;
      }
    } else {
      $Elective_Subject = $("#Elective_Subject").val();
      if ($Elective_Subject) $populatestudent = true;
      else $populatestudent = false;
    }

    if ($populatestudent) {
      var url = BASEURL + "workflow/umsgroupmaster/populatestudent";
      $csrf = $("#_csrf").val();
      startLoader();
      $.ajax({
        type: "POST",
        url: url,
        dataType: "json",
        data: {
          _csrf: $csrf,
          Batch: $actionSelect,
          Department: $Assign_Department,
          Course: $Assign_Course,
          Semester: $semesterId,
          Group_For: $Group_For,
          Elective_Subject: $Elective_Subject,
        },
        success: function (data) {
          var status_id = data.STATUS_ID;
          var res = data.STATUS_RESPONSE;
          if (status_id == "000") {
            $("#studentinfo").html(res);
            $("#studentinfo").addClass("panel panel-default");
          } else {
            PU_validation("<li>" + res + "</li>");
          }
          stopLoader();
        },
      });
    }
  }
}

function EditGroupList($YesNo) {
  PU_hide_validation();
  $("#beGroupMaster_Group_List").html("");
  $("#beGroupMaster_Group_List").hide();
  $("#beGroupMaster_RollNo").val("");
  $("#beGroupMaster_RollNo_main_div").hide();
  $("#Editgroup_Search").hide();
  $("#EDIT_studentinfo").html("");
  $("#beGroupMaster_Groups_To").val("");

  $actionSelect = $("#actionSelect").val();
  $Assign_Department = $("#Assign_Department").val();
  $Assign_Course = $("#Assign_Course").val();
  $semesterId = $("#semesterId").val();
  $Group_For = $("#Group_For").val();
  $populategroup = true;
  $Elective_Subject = "";
  if (
    $actionSelect &&
    $Assign_Department &&
    $Assign_Course &&
    $semesterId &&
    $Group_For
  ) {
    if ($YesNo == "Y") {
      $("#Elective_Subject_For").html("");
      $("#Elective_Subject_For").hide();
      if ($Group_For == "ET" || $Group_For == "EP") {
        $Validate = "N";
        $resElective = ExtractElectiveSubject(
          $actionSelect,
          $Validate,
          $Group_For,
          $Assign_Department,
          $Assign_Course,
          $semesterId
        );
        if ($resElective) $populategroup = true;
        else $populategroup = false;
        return false;
      }
    } else {
      $Elective_Subject = $("#Elective_Subject").val();
      if ($Elective_Subject) $populategroup = true;
      else $populategroup = false;
    }

    if ($populategroup) {
      var url = BASEURL + "workflow/umseditgroupmaster/populategroups";
      $csrf = $("#_csrf").val();
      startLoader();
      $.ajax({
        type: "POST",
        url: url,
        dataType: "json",
        data: {
          _csrf: $csrf,
          Batch: $actionSelect,
          Department: $Assign_Department,
          Course: $Assign_Course,
          Semester: $semesterId,
          Group_For: $Group_For,
          Elective_Subject: $Elective_Subject,
        },
        success: function (data) {
          var status_id = data.STATUS_ID;
          var res = data.STATUS_RESPONSE;
          if (status_id == "000") {
            $("#beGroupMaster_Group_List").html(res);

            $("#beGroupMaster_RollNo_main_div").show();
            $("#Editgroup_Search").show();
          } else {
            PU_validation("<li>" + res + "</li>");
          }
          stopLoader();
        },
      });
    }
  } else {
    $("#Editgroup_Search").hide();
    $("#beGroupMaster_Group_List").hide();
    $("#beGroupMaster_RollNo_main_div").hide();
  }
}

function semesterPromotedTo() {
  $semesterPromotedFrom = $("#semesterId").val();
  $Assign_Course = $("#Assign_Course").val();
  $("#semester_promoted_to").val("");
  if ($semesterPromotedFrom && $Assign_Course) {
    $maxvalue = $("#semesterId option:last-child").val();
    var error = "";
    if ($maxvalue) {
      if ($maxvalue > $semesterPromotedFrom) {
        $semesterPromotedTo = parseInt($semesterPromotedFrom) + parseInt(1);
        $("#semester_promoted_to").val($semesterPromotedTo);
      } else {
        error =
          error + "<li>Please Provide Valid Semester Value To Be Promoted</li>";
        PU_validation(error);
        return false;
      }
    } else {
      error = error + "<li>Wrong Course Value Provided</li>";
      PU_validation(error);
      return false;
    }
    PU_hide_validation();
    return true;
  }
}
function startLoader() {
  $("#loading").show();
}

function stopLoader() {
  $("#loading").hide();
}
function getEndBatch() {
  $("#uploadstudent_EndBatch").val("");
  $Assign_Course = $("#Assign_Course").val();
  $EndBatch = "";
  if ($Assign_Course) {
    $uploadstudent_StartBatch = $("#uploadstudent_StartBatch").val();
    $.each(CourseIDWITHVALUE, function (index, value) {
      if (value.courseID == $Assign_Course) {
        $EndBatch = value.courseYear;
        return true;
      }
    });
    if ($EndBatch) {
      if ($uploadstudent_StartBatch) {
        $t = parseInt($uploadstudent_StartBatch) + parseInt($EndBatch);
        $("#uploadstudent_EndBatch").val($t);
      }
    } else {
      /* if($Assign_Course=="22" || $Assign_Course=="33")
                                                                                                                                        {
                                                                                                                                            $EndBatch = 2;  
                                                                                                                                            $t = parseInt($uploadstudent_StartBatch) + parseInt($EndBatch)
                                                                                                                                            $("#uploadstudent_EndBatch").val($t);
                                                                                                                                        }
                                                                                                                                        else if($Assign_Course=="11")
                                                                                                                                        {
                                                                                                                                            $EndBatch = 4;     
                                                                                                                                            $t = parseInt($uploadstudent_StartBatch) + parseInt($EndBatch)
                                                                                                                                            $("#uploadstudent_EndBatch").val($t);
                                                                                                                                        }
                                                                                                                                        */
      PU_validation("<li>Wrong Course Value, Contact Admin</li>");
      return false;
    }
  }
}

function validBatchWithSession() {
  $actionSelect = $("#actionSelect").val();
  $Assign_Course = $("#Assign_Course").val();
  if ($actionSelect && $Assign_Course) {
    var SelectBatch_string = $actionSelect;
    var SelectBatch_arr = SelectBatch_string.split("-"),
      i;
    if (SelectBatch_arr[0] && SelectBatch_arr[1]) {
      var error = "";
      var SelectBatch_val =
        parseInt(SelectBatch_arr[1]) - parseInt(SelectBatch_arr[0]);
      if ($Assign_Course == "11" && SelectBatch_val == "4") {
      } else if (
        ($Assign_Course == "22" || $Assign_Course == "33") &&
        SelectBatch_val == "2"
      ) {
      } else {
        error = error + "<li>Select Vaild Batch For The Course Selected.</li>";
        PU_validation(error);
        return false;
      }
      return true;
    }
  }
}

function onlyIntegerAllow($chkInt_val) {
  if (!isInteger($chkInt_val)) {
    var error = "";
    error = error + "<li>Only Integer Value Allow.</li>";
    PU_validation(error);
    return false;
  }
  return true;
}

function validrollno(str) {
  var patt = new RegExp(/^[A-Za-z#\-,/\d\s]+$/i);
  var chk = patt.test(str);
  if (!chk) return false;
  else return true;
}
function validsubjectcode(str) {
  var patt = new RegExp(/^[A-Za-z#\-\d\s]+$/i);
  var chk = patt.test(str);
  if (!chk) return false;
  else return true;
}

function validsubjectnameanddescription(str) {
  var patt = new RegExp(/^[A-Za-z#+()&\-\d\s]+$/i);
  var chk = patt.test(str);
  if (!chk) return false;
  else return true;
}

function validaddress(str) {
  var patt = new RegExp(/^[A-Za-z#@,/\d\s]+$/i);
  var chk = patt.test(str);
  if (!chk) return false;
  else return true;
}

function isInteger(n) {
  return /^[0-9]+$/.test(n);
}
function validString(str) {
  var patt = new RegExp(/^[A-Za-z\s]+$/i);
  var chk = patt.test(str);
  if (!chk) return false;
  else return true;
}

function validStringalphanumeric(str) {
  var patt = new RegExp(/^[0-9A-Za-z\s]+$/i);
  var chk = patt.test(str);
  if (!chk) return false;
  else return true;
}
function validemailaddress(email) {
  var emailReg = /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/;
  if (emailReg.test(email)) {
    return true;
  }
  return false;
}

function PU_validation(error) {
  $("#widget_error_main_inner").html("");
  $("#error_main").show();
  $("#widget_error_main_inner").html(error);
  $("html, body").animate({ scrollTop: 0 }, "slow");
}
function PU_hide_validation() {
  $("#error_main").hide();
  $("#widget_error_main_inner").html("");
  $("#error_main").removeClass("alert-success");
  $("#error_main").addClass("alert-error");
  $("#error_main").html("<ul id='widget_error_main_inner'></ul>");
}

function getDepartmentslist() {
  var courseId = $.trim($("#courseId").val());
  var url = BASEURL + "workflow/umssubjectmaster/getdepartmentlist";
  var _csrf = $("#_csrf1").val();
  $.ajax({
    type: "POST",
    url: url,
    dataType: "json",
    data: {
      _csrf: _csrf,
      courseId: courseId,
    },
    success: function (data) {
      if (data) {
        $("#departmentName").html("");
        $("#departmentName").append(
          '<option value="">Select Department</option>'
        );
        $.each(data, function (key, value) {
          $("#departmentName").append(
            "<option value=" +
              value.Department_Id +
              ">" +
              value.Department_Name +
              "</option>"
          );
        });
      } else {
        $("#departmentName").append(
          '<option value="">Select Department</option>'
        );
      }
    },
  });
}

function validate_PromoteStudentMaster() {
  var error = "";

  /************************* Assign_Department **************************************************/
  var Assign_Department = $.trim($("#Assign_Department").val());
  $("#Assign_Department").val(Assign_Department);
  if (!Assign_Department) {
    error = error + "<li>Select Department</li>";
    PU_validation(error);
    return false;
  }

  /************************* Assign_Course **************************************************/
  var Assign_Course = $.trim($("#Assign_Course").val());
  $("#Assign_Course").val(Assign_Course);
  if (!Assign_Course) {
    error = error + "<li>Select Course</li>";
    PU_validation(error);
    return false;
  }

  /************************* SelectBatch **************************************************/
  var actionSelect = $.trim($("#actionSelect").val());
  $("#actionSelect").val(actionSelect);
  if (!actionSelect) {
    error = error + "<li>Select Batch</li>";
    PU_validation(error);
    return false;
  }

  /************************* semesterId **************************************************/
  var semesterId = $.trim($("#semesterId").val());
  $("#semesterId").val(semesterId);
  if (!semesterId) {
    error = error + "<li>Select Semester Promoted From</li>";
    PU_validation(error);
    return false;
  }

  /************************* semester_promoted_to **************************************************/
  var semester_promoted_to = $.trim($("#semester_promoted_to").val());
  $("#semester_promoted_to").val(semester_promoted_to);
  if (!semester_promoted_to) {
    error = error + "<li>Semester Promoted To Required</li>";
    PU_validation(error);
    return false;
  } else {
    if (semester_promoted_to != parseInt(semesterId) + parseInt(1)) {
      error =
        error +
        "<li>Provide Valid Semester Promoted From and Semester Promoted To Value</li>";
      PU_validation(error);
      return false;
    }
  }
  //if(!validBatchWithSession())
  //return false;
  PU_hide_validation();
  startLoader();
}
function validate_facultyMaster() {
  var error = "";

  /************************* frm_roleName **************************************************/
  var frm_roleName = $.trim($("#frm_roleName").val());
  $("#frm_roleName").val(frm_roleName);
  if (!frm_roleName) {
    error = error + "<li>Select Role Name</li>";
    PU_validation(error);
    return false;
  }
  /********************************* frm_fac_firstName  ******************************************/
  var frm_fac_firstName = $.trim($("#frm_fac_firstName").val());
  $("#frm_fac_firstName").val(frm_fac_firstName);
  if (frm_fac_firstName) {
    if (!validString(frm_fac_firstName)) {
      error = error + "<li>Valid First Name Required </li>";
      PU_validation(error);
      return false;
    }
  } else {
    error = error + "<li>First Name Required</li>";
    PU_validation(error);
    return false;
  }

  /********************************* frm_fac_lastName  ******************************************/
  var frm_fac_lastName = $.trim($("#frm_fac_lastName").val());
  $("#frm_fac_lastName").val(frm_fac_lastName);
  if (frm_fac_lastName) {
    if (!validString(frm_fac_lastName)) {
      error = error + "<li>Valid Last Name Required </li>";
      PU_validation(error);
      return false;
    }
  } else {
    error = error + "<li>Last Name Required</li>";
    PU_validation(error);
    return false;
  }
  /********************************* frm_fac_gender  ******************************************/
  var frm_fac_gender = $.trim($("#frm_fac_gender").val());
  $("#frm_fac_gender").val(frm_fac_gender);
  if (!frm_fac_gender) {
    error = error + "<li>Select Gender</li>";
    PU_validation(error);
    return false;
  }
  /********************************* dob  ******************************************/
  var dob = $.trim($("#dob").val());
  if (!dob) {
    error = error + "<li>Enter DOB </li>";
    PU_validation(error);
    return false;
  }

  /********************************* frm_fac_contactNo  ******************************************/
  var frm_fac_contactNo = $.trim($("#frm_fac_contactNo").val());
  $("#frm_fac_contactNo").val(frm_fac_contactNo);
  if (frm_fac_contactNo) {
    if (!isInteger(frm_fac_contactNo)) {
      error = error + "<li>Contact No Only In Integer </li>";
      PU_validation(error);
      return false;
    } else {
      var validMobilelength = frm_fac_contactNo.length;
      if (validMobilelength != "10") {
        error = error + "<li>Contact No Must Be of 10 Integer Numbers</li>";
        PU_validation(error);
        return false;
      }
    }
  } else {
    error = error + "<li>Contact No Required</li>";
    PU_validation(error);
    return false;
  }

  /********************************* frm_fac_emailId  ******************************************/
  var frm_fac_emailId = $.trim($("#frm_fac_emailId").val());
  $("#frm_fac_emailId").val(frm_fac_emailId);
  if (frm_fac_emailId) {
    if (!validemailaddress(frm_fac_emailId)) {
      error = error + "<li>Valid Email ID Required </li>";
      PU_validation(error);
      return false;
    }
  } else {
    error = error + "<li>Email ID Required</li>";
    PU_validation(error);
    return false;
  }
  /********************************* frm_fac_address  ******************************************/
  var frm_fac_address = $.trim($("#frm_fac_address").val());
  $("#frm_fac_address").val(frm_fac_address);
  if (frm_fac_address) {
    if (!validaddress(frm_fac_address)) {
      error = error + "<li>Valid Address Required</li>";
      PU_validation(error);
      return false;
    }
  } else {
    error = error + "<li>Address Required</li>";
    PU_validation(error);
    return false;
  }
  /********************************* frm_fac_fatherName  ******************************************/
  var frm_fac_fatherName = $.trim($("#frm_fac_fatherName").val());
  $("#frm_fac_fatherName").val(frm_fac_fatherName);
  if (frm_fac_fatherName) {
    if (!validString(frm_fac_fatherName)) {
      error = error + "<li>Valid Father Name Required </li>";
      PU_validation(error);
      return false;
    }
  }

  /********************************* frm_fac_motherName  ******************************************/
  var frm_fac_motherName = $.trim($("#frm_fac_motherName").val());
  $("#frm_fac_motherName").val(frm_fac_motherName);
  if (frm_fac_motherName) {
    if (!validString(frm_fac_motherName)) {
      error = error + "<li>Valid Mother Name Required </li>";
      PU_validation(error);
      return false;
    }
  }

  /********************************* frm_fac_fatherEmail  ******************************************/
  var frm_fac_fatherEmail = $.trim($("#frm_fac_fatherEmail").val());
  $("#frm_fac_fatherEmail").val(frm_fac_fatherEmail);
  if (frm_fac_fatherEmail) {
    if (!validemailaddress(frm_fac_fatherEmail)) {
      error = error + "<li>Valid Father Email Required </li>";
      PU_validation(error);
      return false;
    }
  }

  /********************************* Assign_Department  ******************************************/
  var Assign_Department = $.trim($("#Assign_Department").val());
  $("#Assign_Department").val(Assign_Department);
  if (Assign_Department) {
    if (!isInteger(Assign_Department)) {
      error = error + "<li>Select Valid Department Name</li>";
      PU_validation(error);
      return false;
    }
  } else {
    error = error + "<li>Select Department Name</li>";
    PU_validation(error);
    return false;
  }

  /********************************* frm_fac_empCode  ******************************************/
  var frm_fac_empCode = $.trim($("#frm_fac_empCode").val());
  $("#frm_fac_empCode").val(frm_fac_empCode);
  if (frm_fac_empCode) {
    if (!validrollno(frm_fac_empCode)) {
      error = error + "<li>Valid Faculty Code Required</li>";
      PU_validation(error);
      return false;
    }
  } else {
    error = error + "<li>Faculty Code Required</li>";
    PU_validation(error);
    return false;
  }
  /********************************* frm_fac_designation  ******************************************/
  var frm_fac_designation = $.trim($("#frm_fac_designation").val());
  $("#frm_fac_designation").val(frm_fac_designation);
  if (frm_fac_designation) {
    if (!validrollno(frm_fac_designation)) {
      error = error + "<li>Valid Designation Required</li>";
      PU_validation(error);
      return false;
    }
  } else {
    error = error + "<li>Designation Required</li>";
    PU_validation(error);
    return false;
  }

  /********************************* doj  ******************************************/
  var doj = $.trim($("#doj").val());
  if (!doj) {
    error = error + "<li>Date of Joining Required</li>";
    PU_validation(error);
    return false;
  }

  PU_hide_validation();
  startLoader();
}

function validate_subjectMaster() {
  var error = "";

  /************************* subjectBatch **************************************************/
  var subjectBatch = $.trim($("#subjectBatch").val());
  $("#subjectBatch").val(subjectBatch);
  if (subjectBatch) {
    if (!validString(subjectBatch)) {
      error = error + "<li>Valid Batch Name Required</li>";
      PU_validation(error);
      return false;
    }
  } else {
    error = error + "<li>Batch Name Required</li>";
    PU_validation(error);
    return false;
  }

  /********************************* subjectName  ******************************************/
  var subjectName = $.trim($("#subjectName").val());
  $("#subjectName").val(subjectName);
  if (subjectName) {
    if (!validaddress(subjectName)) {
      error = error + "<li>Valid Subject Name Required </li>";
      PU_validation(error);
      return false;
    }
  } else {
    error = error + "<li>Subject Name Required</li>";
    PU_validation(error);
    return false;
  }

  /********************************* subjectCode  ******************************************/
  var subjectCode = $.trim($("#subjectCode").val());
  $("#subjectCode").val(subjectCode);
  if (subjectCode) {
    if (!validString(subjectCode)) {
      error = error + "<li>Valid Subject Code Required </li>";
      PU_validation(error);
      return false;
    }
  } else {
    error = error + "<li>Subject Code Required</li>";
    PU_validation(error);
    return false;
  }
  /********************************* courseId  ******************************************/
  var courseId = $.trim($("#courseId").val());
  $("#courseId").val(courseId);
  if (courseId) {
    if (!isInteger(courseId)) {
      error = error + "<li>Select Valid Course Name</li>";
      PU_validation(error);
      return false;
    }
  } else {
    error = error + "<li>Select Course Name</li>";
    PU_validation(error);
    return false;
  }
  /********************************* departmentName  ******************************************/
  var departmentName = $.trim($("#departmentName").val());
  $("#departmentName").val(departmentName);
  if (departmentName) {
    if (!isInteger(departmentName)) {
      error = error + "<li>Select Valid Department Name</li>";
      PU_validation(error);
      return false;
    }
  } else {
    error = error + "<li>Select Department Name </li>";
    PU_validation(error);
    return false;
  }
  /********************************* semesterId  ******************************************/
  var semesterId = $.trim($("#semesterId").val());
  $("#semesterId").val(semesterId);
  if (semesterId) {
    if (!isInteger(semesterId)) {
      error = error + "<li>Valid Semester Required </li>";
      PU_validation(error);
      return false;
    }
  } else {
    error = error + "<li>Select Semester</li>";
    PU_validation(error);
    return false;
  }

  /********************************* Description  ******************************************/
  var description = $.trim($("#description").val());
  $("#description").val(description);
  if (description) {
    if (!validString(description)) {
      error = error + "<li>Valid Description Required </li>";
      PU_validation(error);
      return false;
    }
  } else {
    error = error + "<li>Description Required</li>";
    PU_validation(error);
    return false;
  }
  /********************************* semesterId  ******************************************/
  var elective = $.trim($("#elective").val());
  $("#semesterId").val(elective);
  if (elective) {
    if (!isInteger(elective)) {
      error = error + "<li>Select Valid Elective</li>";
      PU_validation(error);
      return false;
    }
  } else {
    error = error + "<li>Select Elective</li>";
    PU_validation(error);
    return false;
  }

  PU_hide_validation();
  startLoader();
}
function validate_DeptMaster() {
  var error = "";

  /************************* Department Name **************************************************/
  var departmentName = $.trim($("#departmentName").val());
  $("#departmentName").val(departmentName);
  if (departmentName) {
    if (!validString(departmentName)) {
      error = error + "<li>Valid Department Name Required</li>";
      PU_validation(error);
      return false;
    }
  } else {
    error = error + "<li>Department Name Required</li>";
    PU_validation(error);
    return false;
  }

  /********************************* Course Name  ******************************************/
  var courseName = $.trim($("#courseName").val());
  $("#courseName").val(courseName);
  if (!courseName) {
    error = error + "<li>Select Course Name</li>";
    PU_validation(error);
    return false;
  }

  /********************************* Description  ******************************************/
  var description = $.trim($("#description").val());
  $("#description").val(description);
  if (description) {
    if (!validString(description)) {
      error = error + "<li>Description Required </li>";
      PU_validation(error);
      return false;
    }
  } else {
    error = error + "<li>Description Required</li>";
    PU_validation(error);
    return false;
  }

  PU_hide_validation();
  startLoader();
}
function validate_ClgMaster() {
  var error = "";

  /************************* CollegeName **************************************************/
  var CollegeName = $.trim($("#CollegeName").val());
  $("#CollegeName").val(CollegeName);
  if (CollegeName) {
    if (!validString(CollegeName)) {
      error = error + "<li>Valid College Name Required</li>";
      PU_validation(error);
      return false;
    }
  } else {
    error = error + "<li>College Name Required</li>";
    PU_validation(error);
    return false;
  }

  /********************************* collegeAddress  ******************************************/
  var collegeAddress = $.trim($("#collegeAddress").val());
  $("#collegeAddress").val(collegeAddress);
  if (collegeAddress) {
    if (!validaddress(collegeAddress)) {
      error = error + "<li>Valid College Address Required </li>";
      PU_validation(error);
      return false;
    }
  } else {
    error = error + "<li>College Address Required</li>";
    PU_validation(error);
    return false;
  }

  /********************************* emailId  ******************************************/
  var emailId = $.trim($("#emailId").val());
  $("#emailId").val(emailId);
  if (emailId) {
    if (!validemailaddress(emailId)) {
      error = error + "<li>Valid Email-Id Required </li>";
      PU_validation(error);
      return false;
    }
  } else {
    error = error + "<li>Email-Id Required</li>";
    PU_validation(error);
    return false;
  }

  /********************************* collegeCity  ******************************************/
  var collegeCity = $.trim($("#collegeCity").val());
  $("#collegeCity").val(collegeCity);
  if (collegeCity) {
    if (!validString(collegeCity)) {
      error = error + "<li>Valid City Required </li>";
      PU_validation(error);
      return false;
    }
  } else {
    error = error + "<li>City Required</li>";
    PU_validation(error);
    return false;
  }

  /********************************* contactNo  ******************************************/
  var contactNo = $.trim($("#contactNo").val());
  $("#contactNo").val(contactNo);
  if (contactNo) {
    if (!isInteger(contactNo)) {
      error = error + "<li>Contact No Only In Integer </li>";
      PU_validation(error);
      return false;
    } else {
      var validMobilelength = contactNo.length;
      if (validMobilelength != "10") {
        error = error + "<li>Contact No Must Be of 10 Integer Numbers</li>";
        PU_validation(error);
        return false;
      }
    }
  } else {
    error = error + "<li>Contact No Required</li>";
    PU_validation(error);
    return false;
  }

  /********************************* pinCode  ******************************************/
  var pinCode = $.trim($("#pinCode").val());
  $("#pinCode").val(pinCode);
  if (pinCode) {
    if (!isInteger(pinCode)) {
      error = error + "<li>Pin Code Only In Integer </li>";
      PU_validation(error);
      return false;
    } else {
      var validpinCodelength = pinCode.length;
      if (validpinCodelength != "6") {
        error = error + "<li>Pin Code Must Be of 10 Integer Numbers</li>";
        PU_validation(error);
        return false;
      }
    }
  } else {
    error = error + "<li>Pin Code Required</li>";
    PU_validation(error);
    return false;
  }

  PU_hide_validation();
  startLoader();
}

function validate_CourseMaster() {
  var error = "";
  /************************* CourseName **************************************************/
  var CourseName = $.trim($("#CourseName").val());
  $("#CollegeName").val(CourseName);
  if (CourseName) {
    if (!validString(CourseName)) {
      error = error + "<li>Valid Course Name Required</li>";
      PU_validation(error);
      return false;
    }
  } else {
    error = error + "<li>Course Name Required</li>";
    PU_validation(error);
    return false;
  }

  /************************* CourseName **************************************************/
  var CourseName = $.trim($("#CourseName").val());
  $("#CollegeName").val(CourseName);
  if (CourseName) {
    if (!validString(CourseName)) {
      error = error + "<li>Valid Course Name Required</li>";
      PU_validation(error);
      return false;
    }
  } else {
    error = error + "<li>Course Name Required</li>";
    PU_validation(error);
    return false;
  }

  /************************* noOfSemester **************************************************/
  var noOfSemester = $.trim($("#noOfSemester").val());
  $("#noOfSemester").val(noOfSemester);
  if (noOfSemester) {
    if (!isInteger(noOfSemester)) {
      error = error + "<li>No Of Semester Only In Integer</li>";
      PU_validation(error);
      return false;
    }
  } else {
    error = error + "<li>No Of Semester Required</li>";
    PU_validation(error);
    return false;
  }

  /************************* Description **************************************************/
  var Description = $.trim($("#Description").val());
  $("#Description").val(Description);
  if (Description) {
    if (!validString(Description)) {
      error = error + "<li>Valid Description Required</li>";
      PU_validation(error);
      return false;
    }
  } else {
    error = error + "<li>Description Required</li>";
    PU_validation(error);
    return false;
  }

  PU_hide_validation();
  startLoader();
}

function validate_DeptMaster() {
  var error = "";
  /************************* DepartmentName **************************************************/
  var departmentName = $.trim($("#departmentName").val());
  $("#departmentName").val(departmentName);
  if (departmentName) {
    if (!validString(departmentName)) {
      error = error + "<li>Valid Department Name Required</li>";
      PU_validation(error);
      return false;
    }
  } else {
    error = error + "<li>Department Name Required</li>";
    PU_validation(error);
    return false;
  }

  /************************* Description **************************************************/
  var description = $.trim($("#description").val());
  $("#description").val(description);
  if (description) {
    if (!validString(description)) {
      error = error + "<li>Valid Description Name Required</li>";
      PU_validation(error);
      return false;
    }
  } else {
    error = error + "<li>Description Name Required</li>";
    PU_validation(error);
    return false;
  }

  PU_hide_validation();
  startLoader();
}

function validate_ViewReappearSubject() {
  var error = "";
  /************************* Assign_Department **************************************************/
  var Assign_Department = $.trim($("#Assign_Department").val());
  $("#Assign_Department").val(Assign_Department);
  if (!Assign_Department) {
    error = error + "<li>Select Department</li>";
    PU_validation(error);
    return false;
  }

  /************************* Assign_Course **************************************************/
  var Assign_Course = $.trim($("#Assign_Course").val());
  $("#Assign_Course").val(Assign_Course);
  if (!Assign_Course) {
    error = error + "<li>Select Course</li>";
    PU_validation(error);
    return false;
  }

  var Reappear_Award_Sheet_SemesterId = $.trim(
    $("#Reappear_Award_Sheet_SemesterId").val()
  );
  if (!Reappear_Award_Sheet_SemesterId) {
    var error = "<li>Select Semester</li>";
    PU_validation(error);
    return false;
  }

  var Reappear_Award_Sheet_year = $.trim($("#Reappear_Award_Sheet_year").val());
  if (!Reappear_Award_Sheet_year) {
    var error = "<li>Select Year</li>";
    PU_validation(error);
    return false;
  }

  var Reappear_Award_Sheet_Session = $.trim(
    $("#Reappear_Award_Sheet_Session").val()
  );
  if (!Reappear_Award_Sheet_Session) {
    var error = "<li>Select Session</li>";
    PU_validation(error);
    return false;
  }

  PU_hide_validation();
  startLoader();
  displayReapperAssignedSubjectlist();
}

function displayReapperAssignedSubjectlist() {
  $("#ViewReappearSubject_Div").html("");
  //       $("#"+subjectId).html("");
  //       $html="<option value='ALL'>Select Subject</option>";
  //       $("#"+subjectId).html($html);
  $csrf = $("#_csrf").val();
  $Assign_Department = $("#Assign_Department").val();
  $Assign_Course = $("#Assign_Course").val();
  $Reappear_Award_Sheet_SemesterId = $(
    "#Reappear_Award_Sheet_SemesterId"
  ).val();
  $Reappear_Award_Sheet_year = $("#Reappear_Award_Sheet_year").val();
  $Reappear_Award_Sheet_Session = $("#Reappear_Award_Sheet_Session").val();

  if (
    $Reappear_Award_Sheet_year &&
    $Reappear_Award_Sheet_Session &&
    $Reappear_Award_Sheet_SemesterId &&
    $Assign_Department &&
    $Assign_Course
  ) {
    startLoader();
    var url = BASEURL + "result/umsreappearawardsheet/getsubjectlist";
    startLoader();
    $.ajax({
      type: "POST",
      dataType: "json",
      url: url,
      data: {
        semesterId: $Reappear_Award_Sheet_SemesterId,
        _csrf: $csrf,
        dept_id: $Assign_Department,
        course_id: $Assign_Course,
        RYear: $Reappear_Award_Sheet_year,
        RSession: $Reappear_Award_Sheet_Session,
      },
      success: function (data) {
        stopLoader();
        var status_id = data.STATUS_ID;
        var res = data.STATUS_RESPONSE;
        if (status_id == "000") {
          $("#ViewReappearSubject_Div").html(res);
        } else {
          PU_validation(res);
          return false;
        }
      },
    });
  }
}

function validate_ViewReappearSubjectDetail() {
  var error = "";
  /************************* Assign_Department **************************************************/
  var Assign_Department = $.trim($("#Assign_Department").val());
  $("#Assign_Department").val(Assign_Department);
  if (!Assign_Department) {
    error = error + "<li>Select Department</li>";
    PU_validation(error);
    return false;
  }

  /************************* Assign_Course **************************************************/
  var Assign_Course = $.trim($("#Assign_Course").val());
  $("#Assign_Course").val(Assign_Course);
  if (!Assign_Course) {
    error = error + "<li>Select Course</li>";
    PU_validation(error);
    return false;
  }

  var Reappear_Award_Sheet_SemesterId = $.trim(
    $("#Reappear_Award_Sheet_SemesterId").val()
  );
  if (!Reappear_Award_Sheet_SemesterId) {
    var error = "<li>Select Semester</li>";
    PU_validation(error);
    return false;
  }

  var Reappear_Award_Sheet_year = $.trim($("#Reappear_Award_Sheet_year").val());
  if (!Reappear_Award_Sheet_year) {
    var error = "<li>Select Year</li>";
    PU_validation(error);
    return false;
  }

  var Reappear_Award_Sheet_Session = $.trim(
    $("#Reappear_Award_Sheet_Session").val()
  );
  if (!Reappear_Award_Sheet_Session) {
    var error = "<li>Select Session</li>";
    PU_validation(error);
    return false;
  }

  PU_hide_validation();
  startLoader();
  displayReapperAssignedSubjectlistDetail();
}

function displayReapperAssignedSubjectlistDetail() {
  $("#ViewReappearSubject_Div").html("");
  //       $("#"+subjectId).html("");
  //       $html="<option value='ALL'>Select Subject</option>";
  //       $("#"+subjectId).html($html);
  $csrf = $("#_csrf").val();
  $Assign_Department = $("#Assign_Department").val();
  $Assign_Course = $("#Assign_Course").val();
  $Reappear_Award_Sheet_SemesterId = $(
    "#Reappear_Award_Sheet_SemesterId"
  ).val();
  $Reappear_Award_Sheet_year = $("#Reappear_Award_Sheet_year").val();
  $Reappear_Award_Sheet_Session = $("#Reappear_Award_Sheet_Session").val();

  if (
    $Reappear_Award_Sheet_year &&
    $Reappear_Award_Sheet_Session &&
    $Reappear_Award_Sheet_SemesterId &&
    $Assign_Department &&
    $Assign_Course
  ) {
    startLoader();
    var url = BASEURL + "result/umsreappeardetailawardsheet/getsubjectlist";
    startLoader();
    $.ajax({
      type: "POST",
      dataType: "json",
      url: url,
      data: {
        semesterId: $Reappear_Award_Sheet_SemesterId,
        _csrf: $csrf,
        dept_id: $Assign_Department,
        course_id: $Assign_Course,
        RYear: $Reappear_Award_Sheet_year,
        RSession: $Reappear_Award_Sheet_Session,
      },
      success: function (data) {
        stopLoader();
        var status_id = data.STATUS_ID;
        var res = data.STATUS_RESPONSE;
        if (status_id == "000") {
          $("#ViewReappearSubject_Div").html(res);
        } else {
          PU_validation(res);
          return false;
        }
      },
    });
  }
}

function validate_ViewSubject() {
  var error = "";
  /************************* Assign_Department **************************************************/
  var Assign_Department = $.trim($("#Assign_Department").val());
  $("#Assign_Department").val(Assign_Department);
  if (!Assign_Department) {
    error = error + "<li>Select Department</li>";
    PU_validation(error);
    return false;
  }

  /************************* Assign_Course **************************************************/
  var Assign_Course = $.trim($("#Assign_Course").val());
  $("#Assign_Course").val(Assign_Course);
  if (!Assign_Course) {
    error = error + "<li>Select Course</li>";
    PU_validation(error);
    return false;
  }

  var semesterId = $.trim($("#semesterId").val());
  if (!semesterId) {
    var error = "<li>Select Semester</li>";
    PU_validation(error);
    return false;
  }

  var Subject_Type = $.trim($("#Subject_Type").val());
  if (!Subject_Type) {
    var error = "<li>Select Subject Type</li>";
    PU_validation(error);
    return false;
  }

  var subjectId = $.trim($("#subjectId").val());
  if (!subjectId) {
    var error = "<li>Select Subject</li>";
    PU_validation(error);
    return false;
  }

  PU_hide_validation();
  startLoader();
  displayAssignedUnassignedSubjectlist();
}
function displayAssignedUnassignedSubjectlist() {
  $("#ViewSubject_Div").html("");
  //       $("#"+subjectId).html("");
  //       $html="<option value='ALL'>Select Subject</option>";
  //       $("#"+subjectId).html($html);
  $csrf = $("#_csrf").val();
  $Assign_Department = $("#Assign_Department").val();
  $Assign_Course = $("#Assign_Course").val();
  $actionSelect = $("#actionSelect").val();
  $Subject_Type = $("#Subject_Type").val();
  $subjectId = $("#subjectId").val();

  $semesterId = $("#semesterId").val();
  if (
    $subjectId &&
    $Subject_Type &&
    $semesterId &&
    $Assign_Department &&
    $Assign_Course
  ) {
    startLoader();
    var url = BASEURL + "workflow/viewassignsubject/getassignunassignlist";
    startLoader();
    $.ajax({
      type: "POST",
      dataType: "json",
      url: url,
      data: {
        subjectId: $subjectId,
        semesterId: $semesterId,
        _csrf: $csrf,
        dept_id: $Assign_Department,
        course_id: $Assign_Course,
        SubjectType: $Subject_Type,
        batch: $actionSelect,
      },
      success: function (data) {
        stopLoader();
        var status_id = data.STATUS_ID;
        var res = data.STATUS_RESPONSE;
        if (status_id == "000") {
          $("#ViewSubject_Div").html(res);
        } else {
          PU_validation(res);
          return false;
        }
      },
    });
  }
}
function getSubject(SubjectType, subjectId) {
  $("#assign_groups").html();
  $("#assign_groups").hide();
  $("#facultyinfo").html("");
  $("#" + subjectId).html("");
  $html = "<option value='ALL'>Select Subject</option>";
  $("#" + subjectId).html($html);
  $csrf = $("#_csrf").val();
  $Assign_Department = $("#Assign_Department").val();
  $Assign_Course = $("#Assign_Course").val();
  $actionSelect = $("#actionSelect").val();

  var semesterId = $("#semesterId").val();
  if (SubjectType && semesterId && $Assign_Department && $Assign_Course) {
    $subject_val = $("#" + subjectId).val();
    startLoader();
    var url = BASEURL + "workflow/facassignsubjects/getsubjectlist";
    startLoader();
    $.ajax({
      type: "POST",
      dataType: "json",
      url: url,
      data: {
        subject_val: $subject_val,
        semesterId: semesterId,
        _csrf: $csrf,
        dept_id: $Assign_Department,
        course_id: $Assign_Course,
        SubjectType: SubjectType,
        batch: $actionSelect,
      },
      success: function (data) {
        stopLoader();
        //var status_id = data.STATUS_ID;
        var res = data.STATUS_RESPONSE;
        $("#subjectId").html(res);
      },
    });
  } else {
    $("#" + subjectId).html($html);
  }
}

function getSubjectforschemeonly(SubjectType, subjectId) {
  $("#assign_groups").html();
  $("#assign_groups").hide();
  $("#facultyinfo").html("");
  $("#" + subjectId).html("");
  $html = "<option value='ALL'>Select Subject</option>";
  $("#" + subjectId).html($html);
  $csrf = $("#_csrf").val();
  $Assign_Department = $("#Assign_Department").val();
  $Assign_Course = $("#Assign_Course").val();
  $actionSelect = $("#actionSelect").val();

  var semesterId = $("#semesterId").val();
  if (SubjectType && semesterId && $Assign_Department && $Assign_Course) {
    $subject_val = $("#" + subjectId).val();
    startLoader();
    var url = BASEURL + "schemes/showcreditschemeums/getsubjectlist";
    startLoader();
    $.ajax({
      type: "POST",
      dataType: "json",
      url: url,
      data: {
        subject_val: $subject_val,
        semesterId: semesterId,
        _csrf: $csrf,
        dept_id: $Assign_Department,
        course_id: $Assign_Course,
        SubjectType: SubjectType,
        batch: $actionSelect,
      },
      success: function (data) {
        stopLoader();
        //var status_id = data.STATUS_ID;
        var res = data.STATUS_RESPONSE;
        $("#subjectId").html(res);
      },
    });
  } else {
    $("#" + subjectId).html($html);
  }
}

function getSubjectandgroups() {
  PU_hide_validation();
  $("#facultyinfo").html("");
  $("#assign_groups").html();
  $("#assign_groups").hide();
  $("#assign_group_btn").hide();
  $("#viewStudent_group_btn").hide();
  $csrf = $("#_csrf").val();
  $("#facultyinfo").removeClass("panel panel-default");
  $actionSelect = $("#actionSelect").val();
  $Assign_Department = $("#Assign_Department").val();
  $Assign_Course = $("#Assign_Course").val();
  $semesterId = $("#semesterId").val();
  $subjectId = $("#subjectId").val();
  $Subject_Type = $("#Subject_Type").val();

  if (
    $Subject_Type &&
    $semesterId &&
    $actionSelect &&
    $Assign_Department &&
    $Assign_Course &&
    $subjectId
  ) {
    $subject_val = $subjectId;
    startLoader();
    var url = BASEURL + "workflow/facassignsubjects/getsubjectandgroups";
    startLoader();
    $.ajax({
      type: "POST",
      dataType: "json",
      url: url,
      data: {
        batch: $actionSelect,
        subject_val: $subjectId,
        semesterId: $semesterId,
        _csrf: $csrf,
        dept_id: $Assign_Department,
        course_id: $Assign_Course,
        Subject_Type: $Subject_Type,
      },
      success: function (data) {
        stopLoader();
        var status_id = data.STATUS_ID;
        var res = data.STATUS_RESPONSE;

        if (status_id == "000") {
          var STATUS_RESPONSE_SUBJECT = data.STATUS_RESPONSE_SUBJECT;
          var STATUS_RESPONSE_GROUPS = data.STATUS_RESPONSE_GROUPS;
          $("#assign_groups").show();
          $("#facultyinfo").html(STATUS_RESPONSE_SUBJECT);
          $("#assign_groups").html(STATUS_RESPONSE_GROUPS);
          //$("#assign_group_btn").show();
          $("#facultyinfo").addClass("panel panel-default");
        } else {
          PU_validation("<li>" + res + "</li>");
        }
        stopLoader();
      },
    });
  }
}

function validate_AssignGroup($yesno) {
  PU_hide_validation();
  if ($yesno == "Y" || $yesno == "N") {
    PU_hide_validation();
    $("#assign_group_btn").hide();
    $("#viewStudent_group_btn").hide();

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
    var subjectId = $.trim($("#subjectId").val());
    if (!subjectId) {
      var error = "<li>Select Subject</li>";
      PU_validation(error);
      return false;
    }

    //if(!validBatchWithSession())
    //return false;

    var chkDisplay = false;
    $("#assign_groups input[type=checkbox]").each(function () {
      if ($(this).prop("checked")) {
        chkDisplay = true;
      }
    });
    if (chkDisplay) {
      $("#assign_group_btn").show();
      $("#viewStudent_group_btn").show();
    } else {
      $("#assign_group_btn").hide();
      $("#viewStudent_group_btn").hide();
    }

    PU_hide_validation();
    startLoader();
    if ($yesno == "N") {
      viewStudentListGroupandSubjectWise();
    }
  } else {
    var error = "<li>Invalid request</li>";
    PU_validation(error);
    return false;
  }
}

function viewStudentListGroupandSubjectWise() {
  PU_hide_validation();
  $("#viewgroupstudentlist_html").html("");
  var formdata = $(".frm_assignsubjectbyfaculty :input").serialize();
  var csrf = $("#_csrf").val();
  var url = BASEURL + "workflow/facassignsubjects/viewstudentlist";
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
        $("#viewgroupstudentlist_html").html(res);
        $("#viewgroupstudentlist").modal();
      } else {
        PU_validation(res);
        return false;
      }
    },
  });
}

function getAssignandUnassignsubject() {
  $(".hidedepartmentforassignsubject").hide();
  $("#Assign_Faculty_Department").val("");
  $htmlFaculty = "<option value=''>Select Faculty</option>";
  $(".assign_subject_to_faculty").html($htmlFaculty);
  $(".assign_subject_to_faculty_btn").hide();
  $("#assigngrpidtofaculty").val("");

  PU_hide_validation();
  $("#assignfacultyinfoDIV").html("");
  $csrf = $("#_csrf").val();
  $actionSelect = $("#actionSelect").val();
  $Assign_Department = $("#Assign_Department").val();
  $Assign_Course = $("#Assign_Course").val();
  $semesterId = $("#semesterId").val();
  $subjectId = $("#subjectId").val();
  $Subject_Type = $("#Subject_Type").val();

  if (
    $Subject_Type &&
    $semesterId &&
    $actionSelect &&
    $Assign_Department &&
    $Assign_Course &&
    $subjectId
  ) {
    $subject_val = $subjectId;
    startLoader();
    var url =
      BASEURL + "workflow/umsfacultysubjectassigner/getassignunassignsubjects";
    startLoader();
    $.ajax({
      type: "POST",
      dataType: "json",
      url: url,
      data: {
        batch: $actionSelect,
        subject_val: $subjectId,
        semesterId: $semesterId,
        _csrf: $csrf,
        dept_id: $Assign_Department,
        course_id: $Assign_Course,
        Subject_Type: $Subject_Type,
      },
      success: function (data) {
        stopLoader();
        var status_id = data.STATUS_ID;
        var res = data.STATUS_RESPONSE;

        if (status_id == "000") {
          $("#assignfacultyinfoDIV").html(res);
        } else {
          PU_validation("<li>" + res + "</li>");
        }
        stopLoader();
      },
    });
  }
}

function getViewGroupDetails() {
  $(".hidedepartmentforassignsubject").hide();
  $("#Assign_Faculty_Department").val("");
  $htmlFaculty = "<option value=''>Select Faculty</option>";
  $(".assign_subject_to_faculty").html($htmlFaculty);
  $(".assign_subject_to_faculty_btn").hide();
  $("#assigngrpidtofaculty").val("");

  PU_hide_validation();
  $("#assignfacultyinfoDIV").html("");
  $csrf = $("#_csrf").val();
  $actionSelect = $("#actionSelect").val();
  $Assign_Department = $("#Assign_Department").val();
  $Assign_Course = $("#Assign_Course").val();
  $semesterId = $("#semesterId").val();
  $subjectId = $("#subjectId").val();
  $Subject_Type = $("#Subject_Type").val();

  if (
    $Subject_Type &&
    $semesterId &&
    $actionSelect &&
    $Assign_Department &&
    $Assign_Course &&
    $subjectId
  ) {
    $subject_val = $subjectId;
    startLoader();
    var url = BASEURL + "workflow/umsviewgroupdetails/viewgroupdetails";
    startLoader();
    $.ajax({
      type: "POST",
      dataType: "json",
      url: url,
      data: {
        batch: $actionSelect,
        subject_val: $subjectId,
        semesterId: $semesterId,
        _csrf: $csrf,
        dept_id: $Assign_Department,
        course_id: $Assign_Course,
        Subject_Type: $Subject_Type,
      },
      success: function (data) {
        stopLoader();
        var status_id = data.STATUS_ID;
        var res = data.STATUS_RESPONSE;

        if (status_id == "000") {
          $("#assignfacultyinfoDIV").html(res);
        } else {
          PU_validation("<li>" + res + "</li>");
        }
        stopLoader();
      },
    });
  }
}

function validate_AssignSubjectbyhod() {
  PU_hide_validation();
  var error = "";
  var Assign_Department = $.trim($("#Assign_Department").val());
  if (!Assign_Department) {
    error = "<li>Select Department</li>";
    PU_validation(error);
    return false;
  }
  var Assign_Course = $.trim($("#Assign_Course").val());
  if (!Assign_Course) {
    error = "<li>Select Course</li>";
    PU_validation(error);
    return false;
  }

  var actionSelect = $.trim($("#actionSelect").val());
  if (!actionSelect) {
    error = "<li>Select Batch</li>";
    PU_validation(error);
    return false;
  }

  var semesterId = $.trim($("#semesterId").val());
  if (!semesterId) {
    error = "<li>Select Semester</li>";
    PU_validation(error);
    return false;
  }

  var Subject_Type = $.trim($("#Subject_Type").val());
  if (!Subject_Type) {
    error = "<li>Select Subject Type</li>";
    PU_validation(error);
    return false;
  }

  var subjectId = $.trim($("#subjectId").val());
  if (!subjectId) {
    error = "<li>Select Subject</li>";
    PU_validation(error);
    return false;
  }

  var Assign_Faculty_Department = $.trim($("#Assign_Faculty_Department").val());
  if (!Assign_Faculty_Department) {
    error = "<li>Select Faculty Department</li>";
    PU_validation(error);
    return false;
  }
  var assign_subject_to_faculty = $.trim($("#assign_subject_to_faculty").val());
  if (!assign_subject_to_faculty) {
    error = "<li>Select Faculty</li>";
    PU_validation(error);
    return false;
  }

  PU_hide_validation();
  assignSubjectByHOD();
}

function validate_AssignCourse() {
  var error = "";
  /************************* Assign_Department **************************************************/
  var Assign_Department = $.trim($("#Assign_Department").val());
  $("#Assign_Department").val(Assign_Department);
  if (!Assign_Department) {
    error = error + "<li>Select Department</li>";
    PU_validation(error);
    return false;
  }

  /************************* Assign_Course **************************************************/
  var Assign_Course = $.trim($("#Assign_Course").val());
  $("#Assign_Course").val(Assign_Course);
  if (!Assign_Course) {
    error = error + "<li>Select Course</li>";
    PU_validation(error);
    return false;
  }
  PU_hide_validation();
  startLoader();
}

function validate_StudentMaster() {
  var error = "";
  /************************* frm_student_firstName **************************************************/
  var frm_student_firstName = $.trim($("#frm_student_firstName").val());
  $("#frm_student_firstName").val(frm_student_firstName);
  if (frm_student_firstName) {
    if (!validString(frm_student_firstName)) {
      error = error + "<li>Valid First Name Required</li>";
      PU_validation(error);
      return false;
    }
  } else {
    error = error + "<li>First Name Required</li>";
    PU_validation(error);
    return false;
  }

  /************************* frm_student_lastName **************************************************/
  var frm_student_lastName = $.trim($("#frm_student_lastName").val());

  $("#frm_student_lastName").val(frm_student_lastName);
  if (frm_student_lastName) {
    if (!validString(frm_student_lastName)) {
      error = error + "<li>Valid Last Name Required</li>";
      PU_validation(error);
      return false;
    }
  }

  /************************* frm_student_gender **************************************************/
  var frm_student_gender = $.trim($("#frm_student_gender").val());
  $("#frm_student_gender").val(frm_student_gender);
  if (!frm_student_gender) {
    error = error + "<li>Select Gender</li>";
    PU_validation(error);
    return false;
  }
  /************************** student_dob **************************************************/
  var student_dob = $.trim($("#student_dob").val());
  $("#student_dob").val(student_dob);
  if (!student_dob) {
    error = error + "<li>DOB Required</li>";
    PU_validation(error);
    return false;
  }

  /************************** frm_student_contactNumber **************************************************/
  var frm_student_contactNumber = $.trim($("#frm_student_contactNumber").val());
  $("#frm_student_contactNumber").val(frm_student_contactNumber);
  if (frm_student_contactNumber) {
    if (!isInteger(frm_student_contactNumber)) {
      error = error + "<li>Contact No Only In Integer </li>";
      PU_validation(error);
      return false;
    } else {
      var validMobilelength = frm_student_contactNumber.length;
      if (validMobilelength != "10") {
        error = error + "<li>Contact No Must Be of 10 Integer Numbers</li>";
        PU_validation(error);
        return false;
      }
    }
  } else {
    error = error + "<li>Contact No Required</li>";
    PU_validation(error);
    return false;
  }

  /************************** frm_student_bloodGroup **************************************************/
  var frm_student_bloodGroup = $.trim($("#frm_student_bloodGroup").val());
  $("#frm_student_bloodGroup").val(frm_student_bloodGroup);
  if (!frm_student_bloodGroup) {
    error = error + "<li>Blood Group Required</li>";
    PU_validation(error);
    return false;
  }

  /************************** frm_student_emailId **************************************************/
  var frm_student_emailId = $.trim($("#frm_student_emailId").val());
  $("#frm_student_emailId").val(frm_student_emailId);
  if (frm_student_emailId) {
    if (!validemailaddress(frm_student_emailId)) {
      error = error + "<li>Valid Email-Id Required </li>";
      PU_validation(error);
      return false;
    }
  } else {
    error = error + "<li>Email-Id Required</li>";
    PU_validation(error);
    return false;
  }

  /************************** frm_student_address **************************************************/
  var frm_student_address = $.trim($("#frm_student_address").val());
  $("#frm_student_address").val(frm_student_address);
  if (frm_student_address) {
    if (!validaddress(frm_student_address)) {
      error = error + "<li>Valid Address Required </li>";
      PU_validation(error);
      return false;
    }
  } else {
    error = error + "<li>Address Required</li>";
    PU_validation(error);
    return false;
  }

  /************************* frm_student_gender **************************************************/
  var frm_student_category = $.trim($("#frm_student_category").val());
  $("#frm_student_category").val(frm_student_category);
  if (!frm_student_category) {
    error = error + "<li>Select Category</li>";
    PU_validation(error);
    return false;
  }

  /************************** clgId **************************************************/
  //    var clgId = $.trim($("#clgId").val());
  //    $("#clgId").val(clgId);
  //    if (!clgId)
  //    {
  //    error = error + "<li>College Name Required</li>";
  //    PU_validation(error);
  //    return false;
  //    }

  /************************** Assign_Department **************************************************/
  var Assign_Department = $.trim($("#Assign_Department").val());
  $("#Assign_Department").val(Assign_Department);
  if (!Assign_Department) {
    error = error + "<li>Department Required</li>";
    PU_validation(error);
    return false;
  }

  /************************** Assign_Course **************************************************/
  var Assign_Course = $.trim($("#Assign_Course").val());
  $("#Assign_Course").val(Assign_Course);
  if (!Assign_Course) {
    error = error + "<li>Course Required</li>";
    PU_validation(error);
    return false;
  }
  /************************** frm_student_rollnumber **************************************************/
  var frm_student_rollnumber = $.trim($("#frm_student_rollnumber").val());
  $("#frm_student_rollnumber").val(frm_student_rollnumber);
  if (frm_student_rollnumber) {
    if (!validrollno(frm_student_rollnumber)) {
      error = error + "<li>Valid Roll No Required </li>";
      PU_validation(error);
      return false;
    }
  } else {
    error = error + "<li>Roll No Required</li>";
    PU_validation(error);
    return false;
  }

  /************************** frm_student_registrationNumber **************************************************/
  var frm_student_registrationNumber = $.trim(
    $("#frm_student_registrationNumber").val()
  );
  $("#frm_student_registrationNumber").val(frm_student_registrationNumber);
  if (frm_student_registrationNumber) {
    if (!validrollno(frm_student_registrationNumber)) {
      error = error + "<li>Valid Registration No Required </li>";
      PU_validation(error);
      return false;
    }
  } else {
    error = error + "<li>Registration No Required</li>";
    PU_validation(error);
    return false;
  }

  /************************* frm_student_fathersName **************************************************/
  var frm_student_fathersName = $.trim($("#frm_student_fathersName").val());

  $("#frm_student_fathersName").val(frm_student_fathersName);
  if (frm_student_fathersName) {
    if (!validString(frm_student_fathersName)) {
      error = error + "<li>Valid Father Name Required</li>";
      PU_validation(error);
      return false;
    }
  }

  /************************* frm_student_mothersName **************************************************/
  var frm_student_mothersName = $.trim($("#frm_student_mothersName").val());

  $("#frm_student_mothersName").val(frm_student_mothersName);
  if (frm_student_mothersName) {
    if (!validString(frm_student_mothersName)) {
      error = error + "<li>Valid Mother Name Required</li>";
      PU_validation(error);
      return false;
    }
  }

  /************************* frm_student_fathersEmail **************************************************/
  var frm_student_fathersEmail = $.trim($("#frm_student_fathersEmail").val());

  $("#frm_student_fathersEmail").val(frm_student_fathersEmail);
  if (frm_student_fathersEmail) {
    if (!validemailaddress(frm_student_fathersEmail)) {
      error = error + "<li>Valid Father's Email Required</li>";
      PU_validation(error);
      return false;
    }
  }
  if ($(".change_studentDep").prop("checked")) {
    var New_Department = $.trim($("#New_Department").val());
    $("#New_Department").val(New_Department);
    if (New_Department) {
      if (New_Department == Assign_Department) {
        error = error + "<li>From And Shift Department Can Not Be Same.</li>";
        PU_validation(error);
        return false;
      }
    } else {
      error = error + "<li>Select Shift Department</li>";
      PU_validation(error);
      return false;
    }
    var New_Semester = $.trim($("#New_Semester").val());
    $("#New_Semester").val(New_Semester);
    if (!New_Semester) {
      error = error + "<li>Select Shift Semester</li>";
      PU_validation(error);
      return false;
    }
  }
  PU_hide_validation();
  startLoader();
}

function validateupdateregistrationno() {
  var error = "";
  PU_hide_validation();
  /************************* Assign_Department **************************************************/
  var Assign_Department = $.trim($("#Assign_Department").val());
  $("#Assign_Department").val(Assign_Department);
  if (!Assign_Department) {
    error = error + "<li>Select Department</li>";
    PU_validation(error);
    return false;
  }

  /************************* Assign_Course **************************************************/
  var Assign_Course = $.trim($("#Assign_Course").val());
  $("#Assign_Course").val(Assign_Course);
  if (!Assign_Course) {
    error = error + "<li>Select Course</li>";
    PU_validation(error);
    return false;
  }

  /************************* uploadstudent_StartBatch **************************************************/
  var uploadstudent_StartBatch = $.trim($("#uploadstudent_StartBatch").val());
  $("#uploadstudent_StartBatch").val(uploadstudent_StartBatch);
  if (!uploadstudent_StartBatch) {
    error = error + "<li>Start Batch Required</li>";
    PU_validation(error);
    return false;
  }

  /************************* uploadstudent_EndBatch **************************************************/
  var uploadstudent_EndBatch = $.trim($("#uploadstudent_EndBatch").val());
  $("#uploadstudent_EndBatch").val(uploadstudent_EndBatch);
  if (!uploadstudent_EndBatch) {
    error = error + "<li>End Batch Required</li>";
    PU_validation(error);
    return false;
  }

  /************************* frm_fileUpload     **************************************************/
  var frm_fileUpload = $.trim($("#frm_fileUpload").val());
  if (!frm_fileUpload) {
    error = error + "<li>Upload Sheet Required</li>";
    PU_validation(error);
    return false;
  } else {
    $chk_ext = frm_fileUpload.split(".").pop();
    if ($chk_ext != "xlsx" && $chk_ext != "xls") {
      error = error + "<li>Upload Valid Sheet.</li>";
      PU_validation(error);
      return false;
    }
  }
  PU_hide_validation();
  startLoader();
}

function validategendercategorysheet() {
  var error = "";
  PU_hide_validation();
  /************************* Assign_Department **************************************************/
  var Assign_Department = $.trim($("#Assign_Department").val());
  $("#Assign_Department").val(Assign_Department);
  if (!Assign_Department) {
    error = error + "<li>Select Department</li>";
    PU_validation(error);
    return false;
  }

  /************************* Assign_Course **************************************************/
  var Assign_Course = $.trim($("#Assign_Course").val());
  $("#Assign_Course").val(Assign_Course);
  if (!Assign_Course) {
    error = error + "<li>Select Course</li>";
    PU_validation(error);
    return false;
  }

  /************************* UpdateGenderCategory Session **************************************************/
  var UpdateGenderCategorySession = $.trim(
    $("#UpdateGenderCategorySession").val()
  );
  $("#UpdateGenderCategorySession").val(UpdateGenderCategorySession);
  if (!UpdateGenderCategorySession) {
    error = error + "<li>Batch Required</li>";
    PU_validation(error);
    return false;
  }

  /************************* frm_fileUpload     **************************************************/
  var frm_fileUpload = $.trim($("#frm_fileUpload").val());
  if (!frm_fileUpload) {
    error = error + "<li>Upload Sheet Required</li>";
    PU_validation(error);
    return false;
  } else {
    $chk_ext = frm_fileUpload.split(".").pop();
    if ($chk_ext != "xlsx" && $chk_ext != "xls") {
      error = error + "<li>Upload Valid Sheet.</li>";
      PU_validation(error);
      return false;
    }
  }
  PU_hide_validation();
  startLoader();
}

function validateupdatemultiplestudents() {
  var error = "";
  PU_hide_validation();
  /************************* Assign_Department **************************************************/
  var Assign_Department = $.trim($("#Assign_Department").val());
  $("#Assign_Department").val(Assign_Department);
  if (!Assign_Department) {
    error = error + "<li>Select Department</li>";
    PU_validation(error);
    return false;
  }

  /************************* Assign_Course **************************************************/
  var Assign_Course = $.trim($("#Assign_Course").val());
  $("#Assign_Course").val(Assign_Course);
  if (!Assign_Course) {
    error = error + "<li>Select Course</li>";
    PU_validation(error);
    return false;
  }

  /************************* uploadstudent_StartBatch **************************************************/
  var uploadstudent_StartBatch = $.trim($("#uploadstudent_StartBatch").val());
  $("#uploadstudent_StartBatch").val(uploadstudent_StartBatch);
  if (!uploadstudent_StartBatch) {
    error = error + "<li>Start Batch Required</li>";
    PU_validation(error);
    return false;
  }

  /************************* uploadstudent_EndBatch **************************************************/
  var uploadstudent_EndBatch = $.trim($("#uploadstudent_EndBatch").val());
  $("#uploadstudent_EndBatch").val(uploadstudent_EndBatch);
  if (!uploadstudent_EndBatch) {
    error = error + "<li>End Batch Required</li>";
    PU_validation(error);
    return false;
  }

  /************************* frm_fileUpload     **************************************************/
  var frm_fileUpload = $.trim($("#frm_fileUpload").val());
  if (!frm_fileUpload) {
    error = error + "<li>Upload Sheet Required</li>";
    PU_validation(error);
    return false;
  } else {
    $chk_ext = frm_fileUpload.split(".").pop();
    if ($chk_ext != "xlsx" && $chk_ext != "xls") {
      error = error + "<li>Upload Valid Sheet.</li>";
      PU_validation(error);
      return false;
    }
  }
  PU_hide_validation();
  startLoader();
}

function validateupdatemultiplefaculty() {
  var error = "";
  PU_hide_validation();
  /************************* Assign_Department **************************************************/
  var Assign_Department = $.trim($("#Assign_Department").val());
  $("#Assign_Department").val(Assign_Department);
  if (!Assign_Department) {
    error = error + "<li>Select Department</li>";
    PU_validation(error);
    return false;
  }

  /************************* frm_fileUpload     **************************************************/
  var frm_fileUpload = $.trim($("#frm_fileUpload").val());
  if (!frm_fileUpload) {
    error = error + "<li>Upload Sheet Required</li>";
    PU_validation(error);
    return false;
  } else {
    $chk_ext = frm_fileUpload.split(".").pop();
    if ($chk_ext != "xlsx" && $chk_ext != "xls") {
      error = error + "<li>Upload Valid Sheet.</li>";
      PU_validation(error);
      return false;
    }
  }
  PU_hide_validation();
  startLoader();
}

function validateassignactivity() {
  var error = "";
  /********************************* Assign_TypeofUser  ******************************************/
  var Assign_TypeofUser = $.trim($("#Assign_TypeofUser").val());
  $("#Assign_TypeofUser").val(Assign_TypeofUser);
  if (!Assign_TypeofUser) {
    error = error + "<li>Type of User Required</li>";
    PU_validation(error);
    return false;
  }
  var Assign_LoginName = $.trim($("#Assign_LoginName").val());
  $("#Assign_LoginName").val(Assign_LoginName);

  var Assign_FirstName = $.trim($("#Assign_FirstName").val());
  $("#Assign_FirstName").val(Assign_FirstName);

  var Assign_LastName = $.trim($("#Assign_LastName").val());
  $("#Assign_LastName").val(Assign_LastName);
  if (Assign_LoginName || Assign_FirstName || Assign_LastName) {
    if (Assign_FirstName) {
      if (!validString(Assign_FirstName)) {
        error = error + "<li>Valid First Name Required</li>";
        PU_validation(error);
        return false;
      }
    }
    if (Assign_LastName) {
      if (!validString(Assign_LastName)) {
        error = error + "<li>Valid Last Name Required</li>";
        PU_validation(error);
        return false;
      }
    }
  } else {
    error =
      error + "<li>Either Login Name OR First Name/Last Name Required</li>";
    PU_validation(error);
    return false;
  }
  getAssignActivitydetails();
}

function getAssignActivitydetails() {
  PU_hide_validation();
  startLoader();
  $("#html_AssignActivityinfo").html("");
  var formdata = $(".main_Assign_Activity :input").serialize();
  var csrf = $("#_csrf").val();
  var url = BASEURL + "workflow/assignactivities/getassignactivitydetails";
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
      if (status_id == "000") $("#html_AssignActivityinfo").html(res);
      else {
        PU_validation(res);
        return false;
      }
    },
  });
}

function validateExcelSheet() {
  /************************* Excel Upload     **************************************************/
  //alert("yesss");
  var error = "";
  var frm_fileUpload = $.trim($("#frm_fileUpload").val());
  if (!frm_fileUpload) {
    error = error + "<li>Upload Sheet Required</li>";
    PU_validation(error);
    return false;
  } else {
    $chk_ext = frm_fileUpload.split(".").pop();
    if ($chk_ext != "xlsx" && $chk_ext != "xls") {
      error = error + "<li>Upload Valid Sheet.</li>";
      PU_validation(error);
      return false;
    }
  }
}

function validateChangedPassword() {
  $("#resendmsgDisplay").hide();

  /************************* Excel Upload     **************************************************/
  //alert("yesss");
  var error = "";
  var ChangePassword_OldPassword = $("#ChangePassword_OldPassword").val();
  if (!ChangePassword_OldPassword) {
    error = error + "<li>Old Password Required</li>";
    PU_validation(error);
    return false;
  }

  var ChangePassword_NewPassword = $("#ChangePassword_NewPassword").val();
  if (!ChangePassword_NewPassword) {
    error = error + "<li>New Password Required</li>";
    PU_validation(error);
    return false;
  }

  var ChangePassword_ConfirmPassword = $(
    "#ChangePassword_ConfirmPassword"
  ).val();
  if (!ChangePassword_ConfirmPassword) {
    error = error + "<li>Confirm Password Required</li>";
    PU_validation(error);
    return false;
  }
  if (ChangePassword_NewPassword != ChangePassword_ConfirmPassword) {
    error = error + "<li>New Password and Confirm Password Does Not Match</li>";
    PU_validation(error);
    return false;
  }

  var checkupdate = $("#checkupdate").val();
  if (checkupdate) {
    if (checkupdate != "1") {
      error = error + "<li>Fraudulent data detected</li>";
      PU_validation(error);
      return false;
    }

    var ChangePassword_sendotp = $.trim($("#ChangePassword_sendotp").val());
    $("#ChangePassword_sendotp").val(ChangePassword_sendotp);
    if (!ChangePassword_sendotp) {
      error = error + "<li>Enter OTP.</li>";
      PU_validation(error);
      return false;
    } else {
      if (!isInteger(ChangePassword_sendotp)) {
        error = error + "<li>Invalid OTP.</li>";
        PU_validation(error);
        return false;
      }
    }
    updatepassword();
  } else {
    sendotpforChangePassword();
  }
}

function updatepassword() {
  $("#successmsg").hide();
  PU_hide_validation();
  //    $("#html_ChangePasswordOtpDiv").html("");
  startLoader();
  //    $("#html_ChangePasswordOtpDiv").html("");
  var formdata = $("#frm_senOTP :input").serialize();
  var csrf = $("#_csrf").val();
  var url = BASEURL + "settings/changepasswordbyuserdashboard/updatepassword";
  $.ajax({
    formdata: formdata,
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
        $("#html_ChangePasswordOtpDiv").html("");
        $("#ChangePassword_ConfirmPassword").removeAttr("readonly");
        $("#ChangePassword_OldPassword").removeAttr("readonly");
        $("#ChangePassword_NewPassword").removeAttr("readonly");
        $("#ChangePassword_ConfirmPassword").val("");
        $("#ChangePassword_OldPassword").val("");
        $("#ChangePassword_NewPassword").val("");
        //                $("#successmsg").show();
        //                $("#successmsg_msg").html(res);
        setInterval(function () {
          location.reload();
        }, 500);
      } else {
        PU_validation(res);
        return false;
      }
    },
  });
}

function sendotpforChangePassword() {
  PU_hide_validation();
  $("#html_ChangePasswordOtpDiv").html("");
  startLoader();
  $("#html_ChangePasswordOtpDiv").html("");
  var formdata = $("#frm_senOTP :input").serialize();
  var csrf = $("#_csrf").val();
  var url = BASEURL + "settings/changepasswordbyuserdashboard/sendotp";
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
        $("#entoldpass").hide();
        $("#ChangePassword_ConfirmPassword").attr("readonly", true);
        $("#ChangePassword_OldPassword").attr("readonly", true);
        $("#ChangePassword_NewPassword").attr("readonly", true);
        $("#ChangePassword_OldPassword").removeAttr("type");
        $("#ChangePassword_OldPassword").attr("type", "hidden");
        $("#hidesendotpdiv").remove();
        $("#html_ChangePasswordOtpDiv").html(res);
        $("#checkupdate").val("1");
      } else {
        PU_validation(res);
        return false;
      }
    },
  });
}

/*
 *
 * @Resend OTP
 */

function resenOtp() {
  $("#successmsg").hide();
  $("#ChangePassword_sendotp").val("");
  PU_hide_validation();
  var error = "";
  var ChangePassword_OldPassword = $("#ChangePassword_OldPassword").val();
  if (!ChangePassword_OldPassword) {
    error = error + "<li>Old Password Required</li>";
    PU_validation(error);
    return false;
  }

  var ChangePassword_NewPassword = $("#ChangePassword_NewPassword").val();
  if (!ChangePassword_NewPassword) {
    error = error + "<li>New Password Required</li>";
    PU_validation(error);
    return false;
  }

  var ChangePassword_ConfirmPassword = $(
    "#ChangePassword_ConfirmPassword"
  ).val();
  if (!ChangePassword_ConfirmPassword) {
    error = error + "<li>Confirm Password Required</li>";
    PU_validation(error);
    return false;
  }
  if (ChangePassword_NewPassword != ChangePassword_ConfirmPassword) {
    error = error + "<li>New Password and Confirm Password Does Not Match</li>";
    PU_validation(error);
    return false;
  }

  var formdata = $("#frm_senOTP :input").serialize();
  var csrf = $("#_csrf").val();
  var url = BASEURL + "settings/changepasswordbyuserdashboard/sendotp";
  $.ajax({
    type: "POST",
    dataType: "json",
    url: url,
    data: {
      _csrf: csrf,
      formdata: formdata,
      resend: "resend",
    },
    success: function (data) {
      stopLoader();
      var status_id = data.STATUS_ID;
      var res = data.STATUS_RESPONSE;
      if (status_id == "000") {
        $("#reSend_ChangePassword").remove();
        $("#resendmsg").html("OTP Resent Successfully");
        $("#resendmsgDisplay").show();
      } else {
        PU_validation(res);
        return false;
      }
    },
  });
}
function validateForgetPassword() {
  /********************************* ForgetPassword_Email  ******************************************/
  var error = "";
  var ForgetPassword_Email = $.trim($("#ForgetPassword_Email").val());
  $("#ForgetPassword_Email").val(ForgetPassword_Email);
  if (ForgetPassword_Email) {
    if (!validemailaddress(ForgetPassword_Email)) {
      error = error + "<li>Valid Email ID Required </li>";
      PU_validation(error);
      return false;
    }
  } else {
    error = error + "<li>Email ID Required</li>";
    PU_validation(error);
    return false;
  }
  PU_hide_validation();
  startLoader();
}

function validateRecoverPassword() {
  /********************************* RecoverPassword_Email  ******************************************/
  var error = "";
  var RecoverPassword_Email = $.trim($("#RecoverPassword_Email").val());
  $("#RecoverPassword_Email").val(RecoverPassword_Email);
  if (RecoverPassword_Email) {
    if (!validemailaddress(RecoverPassword_Email)) {
      error = error + "<li>Valid Email ID Required </li>";
      PU_validation(error);
      return false;
    }
  } else {
    error = error + "<li>Email ID Required</li>";
    PU_validation(error);
    return false;
  }

  var RecoverPassword_NewPassword = $("#RecoverPassword_NewPassword").val();
  if (!RecoverPassword_NewPassword) {
    error = error + "<li>New Password Required</li>";
    PU_validation(error);
    return false;
  }

  var RecoverPassword_ConfirmPassword = $(
    "#RecoverPassword_ConfirmPassword"
  ).val();
  if (!RecoverPassword_ConfirmPassword) {
    error = error + "<li>Confirm Password Required</li>";
    PU_validation(error);
    return false;
  }
  if (RecoverPassword_NewPassword != RecoverPassword_ConfirmPassword) {
    error = error + "<li>New Password and Confirm Password Does Not Match</li>";
    PU_validation(error);
    return false;
  }
  PU_hide_validation();
  startLoader();
}

function validateEditgroupMaster() {
  PU_hide_validation();

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

  var beGroupMaster_action = $.trim($("#beGroupMaster_action").val());
  if (!beGroupMaster_action) {
    var error = "<li>Select Action</li>";
    PU_validation(error);
    return false;
  }

  if (
    beGroupMaster_action == "U" ||
    beGroupMaster_action == "S" ||
    beGroupMaster_action == "D"
  ) {
    var Group_For = $.trim($("#Group_For").val());
    if (!Group_For) {
      var error = "<li>Select Group For</li>";
      PU_validation(error);
      return false;
    }

    if (Group_For == "ET" || Group_For == "EP") {
      var Elective_Subject = $.trim($("#Elective_Subject").val());
      if (!Elective_Subject) {
        var error = "<li>Select Elective Subject</li>";
        PU_validation(error);
        return false;
      }
    }
    //        var beGroupMaster_Groups_To = $.trim($("#beGroupMaster_Groups_To").val());
    //        if(!beGroupMaster_Groups_To)
    //        {
    //        var error = "<li>Select Group</li>";
    //        PU_validation(error);
    //        return false;
    //        }
  }

  /********************************* beGroupMaster_RollNo  ******************************************/
  var beGroupMaster_RollNo = $.trim($("#beGroupMaster_RollNo").val());
  $("#beGroupMaster_RollNo").val(beGroupMaster_RollNo);
  if (beGroupMaster_RollNo) {
    if (!validrollno(beGroupMaster_RollNo)) {
      error = "<li>Valid Roll No Required</li>";
      PU_validation(error);
      return false;
    }
  } else {
    error = "<li>Roll No Required</li>";
    PU_validation(error);
    return false;
  }

  PU_hide_validation();
  startLoader();
  getEditStudentInfo();
}

function getEditStudentInfo() {
  $csrf = $("#_csrf").val();
  var formdata = $("#form_group_serailize_EDIT :input").serialize();
  var url = BASEURL + "workflow/umseditgroupmaster/getstudentinfo";
  $("#EDIT_studentinfo").html("");
  var beGroupMaster_action = $("#beGroupMaster_action").val();
  $.ajax({
    type: "POST",
    url: url,
    dataType: "json",
    data: {
      formdata: formdata,
      _csrf: $csrf,
    },
    success: function (data) {
      var status_id = data.STATUS_ID;
      var res = data.STATUS_RESPONSE;
      var BTN_LABEL = data.BTN_LABEL;
      if (status_id == "000") {
        $("#EDIT_studentinfo").html(res);
        $("#beGroupMaster_Group_List").show();
        $("#EDIT_GROUP_ACTION").html(BTN_LABEL);
        if (beGroupMaster_action == "U") {
          $(".RemoveUG1").remove();
          $(".RemoveUG2").remove();
          $("#EDIT_GROUP_ACTION").attr("style", "margin-left:20%");
        }
      } else {
        PU_validation("<li>" + res + "</li>");
      }
      stopLoader();
    },
  });
}

function updateGroups() {
  $csrf = $("#_csrf").val();
  var formdata = $("#form_group_serailize_EDIT :input").serialize();
  var url = BASEURL + "workflow/umseditgroupmaster/updategroupinfo";
  $.ajax({
    type: "POST",
    url: url,
    dataType: "json",
    data: {
      formdata: formdata,
      _csrf: $csrf,
    },
    success: function (data) {
      //var status_id = data.STATUS_ID;
      var res = data.STATUS_RESPONSE;
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
    },
  });
}

function validateScrutinySheet() {
  var error = "";
  var Assign_Department = $.trim($("#Assign_Department").val());
  $("#Assign_Department").val(Assign_Department);
  if (!Assign_Department) {
    error = "<li>Select Department.</li>";
    PU_validation(error);
    return false;
  }

  var Assign_Course = $.trim($("#Assign_Course").val());
  $("#Assign_Course").val(Assign_Course);
  if (!Assign_Course) {
    error = "<li>Select Course.</li>";
    PU_validation(error);
    return false;
  }

  var Scrutiny_Sheet_Batch = $.trim($("#Scrutiny_Sheet_Batch").val());
  $("#Scrutiny_Sheet_Batch").val(Scrutiny_Sheet_Batch);
  if (!Scrutiny_Sheet_Batch) {
    error = "<li>Select Batch</li>";
    PU_validation(error);
    return false;
  }

  var Scrutiny_Sheet_Semester = $.trim($("#Scrutiny_Sheet_Semester").val());
  $("#Scrutiny_Sheet_Semester").val(Scrutiny_Sheet_Semester);
  if (!Scrutiny_Sheet_Semester) {
    error = "<li>Select Semester</li>";
    PU_validation(error);
    return false;
  }

  $("#Scrutiny_Sheet_department_name").val(
    $("#Assign_Department :selected").text()
  );
  $("#Scrutiny_Sheet_course_name").val($("#Assign_Course :selected").text());
  $("#Scrutiny_Sheet_group_name").val($("#Group_For :selected").text());

  PU_hide_validation();
  startLoader();
  downloadScrutinySheet();
}

function downloadScrutinySheet() {
  $csrf = $("#_csrf").val();
  var formdata = $("#downloadscrutinysheet :input").serialize();
  var url = BASEURL + "result/umsscrutinysheet/downloadscrutinysheet";
  $.ajax({
    type: "POST",
    url: url,
    dataType: "json",
    data: {
      formdata: formdata,
      _csrf: $csrf,
    },
    success: function (data) {
      var status_id = data.STATUS_ID;
      var res = data.STATUS_RESPONSE;
      var downloadurl =
        BASEURL +
        "attendance/umsshortattendancetxnstatus/downloadfile?filename=" +
        res;

      stopLoader();
      if (status_id == "000") {
        window.location.href = downloadurl;
      } else {
        PU_validation(res);
        return false;
      }
    },
  });
}

function validateShortAttendance(DownloadAction) {
  var error = "";
  if (DownloadAction != "P" && DownloadAction != "E") {
    error = "<li>Invalid Download Action.</li>";
    PU_validation(error);
    return false;
  }
  var Assign_Department = $.trim($("#Assign_Department").val());
  $("#Assign_Department").val(Assign_Department);
  if (!Assign_Department) {
    error = "<li>Select Department.</li>";
    PU_validation(error);
    return false;
  }

  var Assign_Course = $.trim($("#Assign_Course").val());
  $("#Assign_Course").val(Assign_Course);
  if (!Assign_Course) {
    error = "<li>Select Course.</li>";
    PU_validation(error);
    return false;
  }

  var Short_Attendance_Batch = $.trim($("#Short_Attendance_Batch").val());
  $("#Short_Attendance_Batch").val(Short_Attendance_Batch);
  if (!Short_Attendance_Batch) {
    error = "<li>Select Batch</li>";
    PU_validation(error);
    return false;
  }

  var Short_Attendance_Semester = $.trim($("#Short_Attendance_Semester").val());
  $("#Short_Attendance_Semester").val(Short_Attendance_Semester);
  if (!Short_Attendance_Semester) {
    error = "<li>Select Semester</li>";
    PU_validation(error);
    return false;
  }

  var Group_For = $.trim($("#Group_For").val());
  $("#Group_For").val(Group_For);
  if (!Group_For) {
    error = "<li>Select Group</li>";
    PU_validation(error);
    return false;
  }

  var Short_Attendance_from_date = $.trim(
    $("#Short_Attendance_from_date").val()
  );
  $("#Short_Attendance_from_date").val(Short_Attendance_from_date);
  if (!Short_Attendance_from_date) {
    error = "<li>Select From Date</li>";
    PU_validation(error);
    return false;
  }
  var Short_Attendance_to_date = $.trim($("#Short_Attendance_to_date").val());
  $("#Short_Attendance_to_date").val(Short_Attendance_to_date);
  if (!Short_Attendance_to_date) {
    error = "<li>Select To Date</li>";
    PU_validation(error);
    return false;
  }

  var dateto = Short_Attendance_to_date.split("-");
  var datefrom = Short_Attendance_from_date.split("-");

  var datetoo = new Date(dateto[2], dateto[1] - 1, dateto[0]);
  var datefromm = new Date(datefrom[2], datefrom[1] - 1, datefrom[0]);

  if (datetoo <= datefromm) {
    error = "<li>To date should be greater than From Date</li>";
    PU_validation(error);
    return false;
  }

  $("#Short_Attendance_department_name").val(
    $("#Assign_Department :selected").text()
  );
  $("#Short_Attendance_course_name").val($("#Assign_Course :selected").text());
  $("#Short_Attendance_group_name").val($("#Group_For :selected").text());

  PU_hide_validation();
  startLoader();
  downloadShortAttendance(DownloadAction);
}

function downloadShortAttendance(DownloadAction) {
  $csrf = $("#_csrf").val();
  var formdata = $("#downloadshortattendance :input").serialize();
  if (DownloadAction == "P")
    var url =
      BASEURL +
      "attendance/umsshortattendancetxnstatus/downloadshortattendance";
  else
    var url =
      BASEURL +
      "attendance/umsshortattendancetxnstatus/downloadshortattendanceexcel";
  $.ajax({
    type: "POST",
    url: url,
    dataType: "json",
    data: {
      formdata: formdata,
      _csrf: $csrf,
    },
    success: function (data) {
      var status_id = data.STATUS_ID;
      var res = data.STATUS_RESPONSE;
      if (DownloadAction == "P")
        var downloadurl =
          BASEURL +
          "attendance/umsshortattendancetxnstatus/downloadfile?filename=" +
          res;
      else
        var downloadurl =
          BASEURL + "download/mdbdetailgrade/downloadexcelfile?filename=" + res;

      stopLoader();
      if (status_id == "000") {
        window.location.href = downloadurl;
      } else {
        PU_validation(res);
        return false;
      }
    },
  });
}

function validateAttendanceStatus(DownloadAction) {
  var error = "";
  if (DownloadAction != "P" && DownloadAction != "E") {
    error = "<li>Invalid Download Action.</li>";
    PU_validation(error);
    return false;
  }
  var Assign_Department = $.trim($("#Assign_Department").val());
  $("#Assign_Department").val(Assign_Department);
  if (!Assign_Department) {
    error = "<li>Select Department.</li>";
    PU_validation(error);
    return false;
  }

  var Assign_Course = $.trim($("#Assign_Course").val());
  $("#Assign_Course").val(Assign_Course);
  if (!Assign_Course) {
    error = "<li>Select Course.</li>";
    PU_validation(error);
    return false;
  }

  var Short_Attendance_Batch = $.trim($("#Short_Attendance_Batch").val());
  $("#Short_Attendance_Batch").val(Short_Attendance_Batch);
  if (!Short_Attendance_Batch) {
    error = "<li>Select Batch</li>";
    PU_validation(error);
    return false;
  }

  var Short_Attendance_Semester = $.trim($("#Short_Attendance_Semester").val());
  $("#Short_Attendance_Semester").val(Short_Attendance_Semester);
  if (!Short_Attendance_Semester) {
    error = "<li>Select Semester</li>";
    PU_validation(error);
    return false;
  }

  var Group_For = $.trim($("#Group_For").val());
  $("#Group_For").val(Group_For);
  if (!Group_For) {
    error = "<li>Select Group</li>";
    PU_validation(error);
    return false;
  }

  var Short_Attendance_from_date = $.trim(
    $("#Short_Attendance_from_date").val()
  );
  $("#Short_Attendance_from_date").val(Short_Attendance_from_date);
  if (!Short_Attendance_from_date) {
    error = "<li>Select From Date</li>";
    PU_validation(error);
    return false;
  }
  var Short_Attendance_to_date = $.trim($("#Short_Attendance_to_date").val());
  $("#Short_Attendance_to_date").val(Short_Attendance_to_date);
  if (!Short_Attendance_to_date) {
    error = "<li>Select To Date</li>";
    PU_validation(error);
    return false;
  }

  var dateto = Short_Attendance_to_date.split("-");
  var datefrom = Short_Attendance_from_date.split("-");

  var datetoo = new Date(dateto[2], dateto[1] - 1, dateto[0]);
  var datefromm = new Date(datefrom[2], datefrom[1] - 1, datefrom[0]);

  if (datetoo <= datefromm) {
    error = "<li>To date should be greater than From Date</li>";
    PU_validation(error);
    return false;
  }
  $("#Short_Attendance_department_name").val(
    $("#Assign_Department :selected").text()
  );
  $("#Short_Attendance_course_name").val($("#Assign_Course :selected").text());
  $("#Short_Attendance_group_name").val($("#Group_For :selected").text());

  PU_hide_validation();
  startLoader();
  downloadAttendanceStatus(DownloadAction);
}

function downloadAttendanceStatus(DownloadAction) {
  $csrf = $("#_csrf").val();
  var formdata = $("#downloadshortattendance :input").serialize();
  if (DownloadAction == "P")
    var url =
      BASEURL + "attendance/umsattendancestatus/downloadshortattendance";
  else
    var url =
      BASEURL + "attendance/umsattendancestatus/downloadshortattendanceexcel";

  $.ajax({
    type: "POST",
    url: url,
    dataType: "json",
    data: {
      formdata: formdata,
      _csrf: $csrf,
    },
    success: function (data) {
      var status_id = data.STATUS_ID;
      var res = data.STATUS_RESPONSE;
      if (DownloadAction == "P")
        var downloadurl =
          BASEURL +
          "attendance/umsshortattendancetxnstatus/downloadfile?filename=" +
          res;
      else
        var downloadurl =
          BASEURL + "download/mdbdetailgrade/downloadexcelfile?filename=" + res;

      stopLoader();
      if (status_id == "000") {
        window.location.href = downloadurl;
      } else {
        PU_validation(res);
        return false;
      }
    },
  });
}

function validateMDBSummaryGrade() {
  var error = "";
  var Assign_Department = $.trim($("#Assign_Department").val());
  $("#Assign_Department").val(Assign_Department);
  if (!Assign_Department) {
    error = "<li>Select Department.</li>";
    PU_validation(error);
    return false;
  }

  var Assign_Course = $.trim($("#Assign_Course").val());
  $("#Assign_Course").val(Assign_Course);
  if (!Assign_Course) {
    error = "<li>Select Course.</li>";
    PU_validation(error);
    return false;
  }

  var MDB_SG_Batch = $.trim($("#MDB_SG_Batch").val());
  $("#Short_Attendance_Batch").val(MDB_SG_Batch);
  if (!MDB_SG_Batch) {
    error = "<li>Select Batch</li>";
    PU_validation(error);
    return false;
  }

  var MDB_SG_Semester = $.trim($("#MDB_SG_Semester").val());
  $("#MDB_SG_Semester").val(MDB_SG_Semester);
  if (!MDB_SG_Semester) {
    error = "<li>Select Semester</li>";
    PU_validation(error);
    return false;
  }
  $("#MDB_SG_department_name").val($("#Assign_Department :selected").text());
  $("#MDB_SG_course_name").val($("#Assign_Course :selected").text());

  PU_hide_validation();
  startLoader();
  downloadmdbsummarygrade();
}

function downloadmdbsummarygrade() {
  $csrf = $("#_csrf").val();
  var formdata = $("#downloadmdbsummarygrade :input").serialize();
  var url = BASEURL + "download/mdbsummarygrade/downloadmdbsummarygrade";
  $.ajax({
    type: "POST",
    url: url,
    dataType: "json",
    data: {
      formdata: formdata,
      _csrf: $csrf,
    },
    success: function (data) {
      var status_id = data.STATUS_ID;
      var res = data.STATUS_RESPONSE;
      var downloadurl =
        BASEURL + "download/mdbdetailgrade/downloadexcelfile?filename=" + res;

      stopLoader();
      if (status_id == "000") {
        window.location.href = downloadurl;
      } else {
        PU_validation(res);
        return false;
      }
    },
  });
}

function validateMDBSubjectMaster() {
  var error = "";
  var Assign_Department = $.trim($("#Assign_Department").val());
  $("#Assign_Department").val(Assign_Department);
  if (!Assign_Department) {
    error = "<li>Select Department.</li>";
    PU_validation(error);
    return false;
  }

  var Assign_Course = $.trim($("#Assign_Course").val());
  $("#Assign_Course").val(Assign_Course);
  if (!Assign_Course) {
    error = "<li>Select Course.</li>";
    PU_validation(error);
    return false;
  }

  var MDB_SBM_Batch = $.trim($("#MDB_SBM_Batch").val());
  $("#Short_Attendance_Batch").val(MDB_SBM_Batch);
  if (!MDB_SBM_Batch) {
    error = "<li>Select Batch</li>";
    PU_validation(error);
    return false;
  }

  var MDB_SBM_Semester = $.trim($("#MDB_SBM_Semester").val());
  $("#MDB_SBM_Semester").val(MDB_SBM_Semester);
  if (!MDB_SBM_Semester) {
    error = "<li>Select Semester</li>";
    PU_validation(error);
    return false;
  }
  $("#MDB_SBM_department_name").val($("#Assign_Department :selected").text());
  $("#MDB_SBM_course_name").val($("#Assign_Course :selected").text());

  PU_hide_validation();
  startLoader();
  downloadMDBSubjectMaster();
}

function downloadMDBSubjectMaster() {
  $csrf = $("#_csrf").val();
  var formdata = $("#downloadmdbsubjectmaster :input").serialize();
  var url = BASEURL + "download/mdbsubjectmastergrade/downloadmdbsubjectmaster";
  $.ajax({
    type: "POST",
    url: url,
    dataType: "json",
    data: {
      formdata: formdata,
      _csrf: $csrf,
    },
    success: function (data) {
      var status_id = data.STATUS_ID;
      var res = data.STATUS_RESPONSE;
      var downloadurl =
        BASEURL + "download/mdbdetailgrade/downloadexcelfile?filename=" + res;

      stopLoader();
      if (status_id == "000") {
        window.location.href = downloadurl;
      } else {
        PU_validation(res);
        return false;
      }
    },
  });
}

function validateMDBStudentList() {
  var error = "";
  var Assign_Department = $.trim($("#Assign_Department").val());
  $("#Assign_Department").val(Assign_Department);
  if (!Assign_Department) {
    error = "<li>Select Department.</li>";
    PU_validation(error);
    return false;
  }

  var Assign_Course = $.trim($("#Assign_Course").val());
  $("#Assign_Course").val(Assign_Course);
  if (!Assign_Course) {
    error = "<li>Select Course.</li>";
    PU_validation(error);
    return false;
  }

  var MDB_STL_Batch = $.trim($("#MDB_STL_Batch").val());
  $("#Short_Attendance_Batch").val(MDB_STL_Batch);
  if (!MDB_STL_Batch) {
    error = "<li>Select Batch</li>";
    PU_validation(error);
    return false;
  }

  var MDB_STL_Semester = $.trim($("#MDB_STL_Semester").val());
  $("#MDB_STL_Semester").val(MDB_STL_Semester);
  if (!MDB_STL_Semester) {
    error = "<li>Select Semester</li>";
    PU_validation(error);
    return false;
  }
  $("#MDB_STL_department_name").val($("#Assign_Department :selected").text());
  $("#MDB_STL_course_name").val($("#Assign_Course :selected").text());

  PU_hide_validation();
  startLoader();
  downloadmdbstudentlist();
}

function downloadmdbstudentlist() {
  $csrf = $("#_csrf").val();
  var formdata = $("#downloadmdbstudentlist :input").serialize();
  var url = BASEURL + "download/mdbstudentlist/downloadmdbstudentlist";
  $.ajax({
    type: "POST",
    url: url,
    dataType: "json",
    data: {
      formdata: formdata,
      _csrf: $csrf,
    },
    success: function (data) {
      var status_id = data.STATUS_ID;
      var res = data.STATUS_RESPONSE;
      var downloadurl =
        BASEURL + "download/mdbdetailgrade/downloadexcelfile?filename=" + res;

      stopLoader();
      if (status_id == "000") {
        window.location.href = downloadurl;
      } else {
        PU_validation(res);
        return false;
      }
    },
  });
}

/***************** REAPPEAR STARTS *******************************************/

function validateREappearMDBSummaryGrade() {
  var error = "";
  var Assign_Department = $.trim($("#Assign_Department").val());
  $("#Assign_Department").val(Assign_Department);
  if (!Assign_Department) {
    error = "<li>Select Department.</li>";
    PU_validation(error);
    return false;
  }

  var Assign_Course = $.trim($("#Assign_Course").val());
  $("#Assign_Course").val(Assign_Course);
  if (!Assign_Course) {
    error = "<li>Select Course.</li>";
    PU_validation(error);
    return false;
  }

  var Reappear_Award_Sheet_SemesterId = $.trim(
    $("#Reappear_Award_Sheet_SemesterId").val()
  );
  $("#Reappear_Award_Sheet_SemesterId").val(Reappear_Award_Sheet_SemesterId);
  if (!Reappear_Award_Sheet_SemesterId) {
    error = "<li>Select Semester</li>";
    PU_validation(error);
    return false;
  }

  var Reappear_Award_Sheet_year = $.trim($("#Reappear_Award_Sheet_year").val());
  $("#Reappear_Award_Sheet_year").val(Reappear_Award_Sheet_year);
  if (!Reappear_Award_Sheet_year) {
    error = "<li>Select Year</li>";
    PU_validation(error);
    return false;
  }

  var Reappear_Award_Sheet_Session = $.trim(
    $("#Reappear_Award_Sheet_Session").val()
  );
  $("#Reappear_Award_Sheet_Session").val(Reappear_Award_Sheet_Session);
  if (!Reappear_Award_Sheet_Session) {
    error = "<li>Select Session</li>";
    PU_validation(error);
    return false;
  }
  $("#MDB_SG_department_name").val($("#Assign_Department :selected").text());
  $("#MDB_SG_course_name").val($("#Assign_Course :selected").text());

  PU_hide_validation();
  startLoader();
  reappeardownloadmdbsummarygrade();
}

function reappeardownloadmdbsummarygrade() {
  $csrf = $("#_csrf").val();
  var formdata = $("#downloadmdbsummarygrade :input").serialize();
  var url =
    BASEURL + "download/reappearmdbsummarygrade/downloadmdbsummarygrade";
  $.ajax({
    type: "POST",
    url: url,
    dataType: "json",
    data: {
      formdata: formdata,
      _csrf: $csrf,
    },
    success: function (data) {
      var status_id = data.STATUS_ID;
      var res = data.STATUS_RESPONSE;
      var downloadurl =
        BASEURL + "download/mdbdetailgrade/downloadexcelfile?filename=" + res;

      stopLoader();
      if (status_id == "000") {
        window.location.href = downloadurl;
      } else {
        PU_validation(res);
        return false;
      }
    },
  });
}

function validateReappearMDBSubjectMaster() {
  var error = "";
  var Assign_Department = $.trim($("#Assign_Department").val());
  $("#Assign_Department").val(Assign_Department);
  if (!Assign_Department) {
    error = "<li>Select Department.</li>";
    PU_validation(error);
    return false;
  }

  var Assign_Course = $.trim($("#Assign_Course").val());
  $("#Assign_Course").val(Assign_Course);
  if (!Assign_Course) {
    error = "<li>Select Course.</li>";
    PU_validation(error);
    return false;
  }

  var Reappear_Award_Sheet_SemesterId = $.trim(
    $("#Reappear_Award_Sheet_SemesterId").val()
  );
  $("#Reappear_Award_Sheet_SemesterId").val(Reappear_Award_Sheet_SemesterId);
  if (!Reappear_Award_Sheet_SemesterId) {
    error = "<li>Select Semester</li>";
    PU_validation(error);
    return false;
  }

  var Reappear_Award_Sheet_year = $.trim($("#Reappear_Award_Sheet_year").val());
  $("#Reappear_Award_Sheet_year").val(Reappear_Award_Sheet_year);
  if (!Reappear_Award_Sheet_year) {
    error = "<li>Select Year</li>";
    PU_validation(error);
    return false;
  }

  var Reappear_Award_Sheet_Session = $.trim(
    $("#Reappear_Award_Sheet_Session").val()
  );
  $("#Reappear_Award_Sheet_Session").val(Reappear_Award_Sheet_Session);
  if (!Reappear_Award_Sheet_Session) {
    error = "<li>Select Session</li>";
    PU_validation(error);
    return false;
  }
  $("#MDB_SBM_department_name").val($("#Assign_Department :selected").text());
  $("#MDB_SBM_course_name").val($("#Assign_Course :selected").text());

  PU_hide_validation();
  startLoader();
  downloadreappearMDBSubjectMaster();
}

function downloadreappearMDBSubjectMaster() {
  $csrf = $("#_csrf").val();
  var formdata = $("#downloadmdbsubjectmaster :input").serialize();
  var url =
    BASEURL + "download/reappearmdbsubjectmastergrade/downloadmdbsubjectmaster";
  $.ajax({
    type: "POST",
    url: url,
    dataType: "json",
    data: {
      formdata: formdata,
      _csrf: $csrf,
    },
    success: function (data) {
      var status_id = data.STATUS_ID;
      var res = data.STATUS_RESPONSE;
      var downloadurl =
        BASEURL + "download/mdbdetailgrade/downloadexcelfile?filename=" + res;

      stopLoader();
      if (status_id == "000") {
        window.location.href = downloadurl;
      } else {
        PU_validation(res);
        return false;
      }
    },
  });
}

function validateReappearMDBStudentList() {
  var error = "";
  var Assign_Department = $.trim($("#Assign_Department").val());
  $("#Assign_Department").val(Assign_Department);
  if (!Assign_Department) {
    error = "<li>Select Department.</li>";
    PU_validation(error);
    return false;
  }

  var Assign_Course = $.trim($("#Assign_Course").val());
  $("#Assign_Course").val(Assign_Course);
  if (!Assign_Course) {
    error = "<li>Select Course.</li>";
    PU_validation(error);
    return false;
  }

  var Reappear_Award_Sheet_SemesterId = $.trim(
    $("#Reappear_Award_Sheet_SemesterId").val()
  );
  $("#Reappear_Award_Sheet_SemesterId").val(Reappear_Award_Sheet_SemesterId);
  if (!Reappear_Award_Sheet_SemesterId) {
    error = "<li>Select Semester</li>";
    PU_validation(error);
    return false;
  }

  var Reappear_Award_Sheet_year = $.trim($("#Reappear_Award_Sheet_year").val());
  $("#Reappear_Award_Sheet_year").val(Reappear_Award_Sheet_year);
  if (!Reappear_Award_Sheet_year) {
    error = "<li>Select Year</li>";
    PU_validation(error);
    return false;
  }

  var Reappear_Award_Sheet_Session = $.trim(
    $("#Reappear_Award_Sheet_Session").val()
  );
  $("#Reappear_Award_Sheet_Session").val(Reappear_Award_Sheet_Session);
  if (!Reappear_Award_Sheet_Session) {
    error = "<li>Select Session</li>";
    PU_validation(error);
    return false;
  }

  $("#MDB_STL_department_name").val($("#Assign_Department :selected").text());
  $("#MDB_STL_course_name").val($("#Assign_Course :selected").text());

  PU_hide_validation();
  startLoader();
  downloadreappearmdbstudentlist();
}

function downloadreappearmdbstudentlist() {
  $csrf = $("#_csrf").val();
  var formdata = $("#downloadmdbstudentlist :input").serialize();
  var url = BASEURL + "download/reappearmdbstudentlist/downloadmdbstudentlist";
  $.ajax({
    type: "POST",
    url: url,
    dataType: "json",
    data: {
      formdata: formdata,
      _csrf: $csrf,
    },
    success: function (data) {
      var status_id = data.STATUS_ID;
      var res = data.STATUS_RESPONSE;
      var downloadurl =
        BASEURL + "download/mdbdetailgrade/downloadexcelfile?filename=" + res;

      stopLoader();
      if (status_id == "000") {
        window.location.href = downloadurl;
      } else {
        PU_validation(res);
        return false;
      }
    },
  });
}

function validateReappearMDBDetailGrade() {
  var error = "";
  var Assign_Department = $.trim($("#Assign_Department").val());
  $("#Assign_Department").val(Assign_Department);
  if (!Assign_Department) {
    error = "<li>Select Department.</li>";
    PU_validation(error);
    return false;
  }

  var Assign_Course = $.trim($("#Assign_Course").val());
  $("#Assign_Course").val(Assign_Course);
  if (!Assign_Course) {
    error = "<li>Select Course.</li>";
    PU_validation(error);
    return false;
  }

  var Reappear_Award_Sheet_SemesterId = $.trim(
    $("#Reappear_Award_Sheet_SemesterId").val()
  );
  $("#Reappear_Award_Sheet_SemesterId").val(Reappear_Award_Sheet_SemesterId);
  if (!Reappear_Award_Sheet_SemesterId) {
    error = "<li>Select Semester</li>";
    PU_validation(error);
    return false;
  }
  var Reappear_Award_Sheet_year = $.trim($("#Reappear_Award_Sheet_year").val());
  $("#Reappear_Award_Sheet_year").val(Reappear_Award_Sheet_year);
  if (!Reappear_Award_Sheet_year) {
    error = "<li>Select Year</li>";
    PU_validation(error);
    return false;
  }

  var Reappear_Award_Sheet_Session = $.trim(
    $("#Reappear_Award_Sheet_Session").val()
  );
  $("#Reappear_Award_Sheet_Session").val(Reappear_Award_Sheet_Session);
  if (!Reappear_Award_Sheet_Session) {
    error = "<li>Select Session</li>";
    PU_validation(error);
    return false;
  }

  $("#MDB_DG_department_name").val($("#Assign_Department :selected").text());
  $("#MDB_DG_course_name").val($("#Assign_Course :selected").text());

  PU_hide_validation();
  startLoader();
  downloadReapperMDBDetailGrade();
}

function downloadReapperMDBDetailGrade() {
  $csrf = $("#_csrf").val();
  var formdata = $("#downloadmdbdetailgrade :input").serialize();
  var url = BASEURL + "download/reappearmdbdetailgrade/downloadmdbdetailgrade";
  $.ajax({
    type: "POST",
    url: url,
    dataType: "json",
    data: {
      formdata: formdata,
      _csrf: $csrf,
    },
    success: function (data) {
      var status_id = data.STATUS_ID;
      var res = data.STATUS_RESPONSE;
      var downloadurl =
        BASEURL + "download/mdbdetailgrade/downloadexcelfile?filename=" + res;

      stopLoader();
      if (status_id == "000") {
        window.location.href = downloadurl;
      } else {
        PU_validation(res);
        return false;
      }
    },
  });
}

function validateReappearMDBstudentmasterGrade() {
  var error = "";
  var Assign_Department = $.trim($("#Assign_Department").val());
  $("#Assign_Department").val(Assign_Department);
  if (!Assign_Department) {
    error = "<li>Select Department.</li>";
    PU_validation(error);
    return false;
  }

  var Assign_Course = $.trim($("#Assign_Course").val());
  $("#Assign_Course").val(Assign_Course);
  if (!Assign_Course) {
    error = "<li>Select Course.</li>";
    PU_validation(error);
    return false;
  }

  var Reappear_Award_Sheet_SemesterId = $.trim(
    $("#Reappear_Award_Sheet_SemesterId").val()
  );
  $("#Reappear_Award_Sheet_SemesterId").val(Reappear_Award_Sheet_SemesterId);
  if (!Reappear_Award_Sheet_SemesterId) {
    error = "<li>Select Semester</li>";
    PU_validation(error);
    return false;
  }

  var Reappear_Award_Sheet_year = $.trim($("#Reappear_Award_Sheet_year").val());
  $("#Reappear_Award_Sheet_year").val(Reappear_Award_Sheet_year);
  if (!Reappear_Award_Sheet_year) {
    error = "<li>Select Year</li>";
    PU_validation(error);
    return false;
  }

  var Reappear_Award_Sheet_Session = $.trim(
    $("#Reappear_Award_Sheet_Session").val()
  );
  $("#Reappear_Award_Sheet_Session").val(Reappear_Award_Sheet_Session);
  if (!Reappear_Award_Sheet_Session) {
    error = "<li>Select Session</li>";
    PU_validation(error);
    return false;
  }

  $("#MDB_SMG_department_name").val($("#Assign_Department :selected").text());
  $("#MDB_SMG_course_name").val($("#Assign_Course :selected").text());

  PU_hide_validation();
  startLoader();
  downloadReappearMDBStudentMasterGrade();
}

function downloadReappearMDBStudentMasterGrade() {
  $csrf = $("#_csrf").val();
  var formdata = $("#downloadmdbstudentmastergrade :input").serialize();
  var url =
    BASEURL +
    "download/reappearmdbstudentmastergrade/downloadmdbstudentmastergrade";
  $.ajax({
    type: "POST",
    url: url,
    dataType: "json",
    data: {
      formdata: formdata,
      _csrf: $csrf,
    },
    success: function (data) {
      var status_id = data.STATUS_ID;
      var res = data.STATUS_RESPONSE;
      var downloadurl =
        BASEURL + "download/mdbdetailgrade/downloadexcelfile?filename=" + res;

      stopLoader();
      if (status_id == "000") {
        window.location.href = downloadurl;
      } else {
        PU_validation(res);
        return false;
      }
    },
  });
}

/********************************REAPPEAR ENDS *******************************/
function validateMDBDetailGrade() {
  var error = "";
  var Assign_Department = $.trim($("#Assign_Department").val());
  $("#Assign_Department").val(Assign_Department);
  if (!Assign_Department) {
    error = "<li>Select Department.</li>";
    PU_validation(error);
    return false;
  }

  var Assign_Course = $.trim($("#Assign_Course").val());
  $("#Assign_Course").val(Assign_Course);
  if (!Assign_Course) {
    error = "<li>Select Course.</li>";
    PU_validation(error);
    return false;
  }

  var MDB_DG_Batch = $.trim($("#MDB_DG_Batch").val());
  $("#Short_Attendance_Batch").val(MDB_DG_Batch);
  if (!MDB_DG_Batch) {
    error = "<li>Select Batch</li>";
    PU_validation(error);
    return false;
  }

  var MDB_DG_Semester = $.trim($("#MDB_DG_Semester").val());
  $("#MDB_DG_Semester").val(MDB_DG_Semester);
  if (!MDB_DG_Semester) {
    error = "<li>Select Semester</li>";
    PU_validation(error);
    return false;
  }
  $("#MDB_DG_department_name").val($("#Assign_Department :selected").text());
  $("#MDB_DG_course_name").val($("#Assign_Course :selected").text());

  PU_hide_validation();
  startLoader();
  downloadMDBDetailGrade();
}

function downloadMDBDetailGrade() {
  $csrf = $("#_csrf").val();
  var formdata = $("#downloadmdbdetailgrade :input").serialize();
  var url = BASEURL + "download/mdbdetailgrade/downloadmdbdetailgrade";
  $.ajax({
    type: "POST",
    url: url,
    dataType: "json",
    data: {
      formdata: formdata,
      _csrf: $csrf,
    },
    success: function (data) {
      var status_id = data.STATUS_ID;
      var res = data.STATUS_RESPONSE;
      var downloadurl =
        BASEURL + "download/mdbdetailgrade/downloadexcelfile?filename=" + res;

      stopLoader();
      if (status_id == "000") {
        window.location.href = downloadurl;
      } else {
        PU_validation(res);
        return false;
      }
    },
  });
}

function validateMDBstudentmasterGrade() {
  var error = "";
  var Assign_Department = $.trim($("#Assign_Department").val());
  $("#Assign_Department").val(Assign_Department);
  if (!Assign_Department) {
    error = "<li>Select Department.</li>";
    PU_validation(error);
    return false;
  }

  var Assign_Course = $.trim($("#Assign_Course").val());
  $("#Assign_Course").val(Assign_Course);
  if (!Assign_Course) {
    error = "<li>Select Course.</li>";
    PU_validation(error);
    return false;
  }

  var MDB_SMG_Batch = $.trim($("#MDB_SMG_Batch").val());
  $("#Short_Attendance_Batch").val(MDB_SMG_Batch);
  if (!MDB_SMG_Batch) {
    error = "<li>Select Batch</li>";
    PU_validation(error);
    return false;
  }

  var MDB_SMG_Semester = $.trim($("#MDB_SMG_Semester").val());
  $("#MDB_SMG_Semester").val(MDB_SMG_Semester);
  if (!MDB_SMG_Semester) {
    error = "<li>Select Semester</li>";
    PU_validation(error);
    return false;
  }
  $("#MDB_SMG_department_name").val($("#Assign_Department :selected").text());
  $("#MDB_SMG_course_name").val($("#Assign_Course :selected").text());

  PU_hide_validation();
  startLoader();
  downloadMDBStudentMasterGrade();
}

function downloadMDBStudentMasterGrade() {
  $csrf = $("#_csrf").val();
  var formdata = $("#downloadmdbstudentmastergrade :input").serialize();
  var url =
    BASEURL + "download/mdbstudentmastergrade/downloadmdbstudentmastergrade";
  $.ajax({
    type: "POST",
    url: url,
    dataType: "json",
    data: {
      formdata: formdata,
      _csrf: $csrf,
    },
    success: function (data) {
      var status_id = data.STATUS_ID;
      var res = data.STATUS_RESPONSE;
      var downloadurl =
        BASEURL + "download/mdbdetailgrade/downloadexcelfile?filename=" + res;

      stopLoader();
      if (status_id == "000") {
        window.location.href = downloadurl;
      } else {
        PU_validation(res);
        return false;
      }
    },
  });
}

function validateAwardSheet() {
  var error = "";
  var Assign_Department = $.trim($("#Assign_Department").val());
  $("#Assign_Department").val(Assign_Department);
  if (!Assign_Department) {
    error = "<li>Select Department.</li>";
    PU_validation(error);
    return false;
  }

  var Assign_Course = $.trim($("#Assign_Course").val());
  $("#Assign_Course").val(Assign_Course);
  if (!Assign_Course) {
    error = "<li>Select Course.</li>";
    PU_validation(error);
    return false;
  }

  var Award_Sheet_Batch = $.trim($("#Award_Sheet_Batch").val());
  $("#Award_Sheet_Batch").val(Award_Sheet_Batch);
  if (!Award_Sheet_Batch) {
    error = "<li>Select Batch</li>";
    PU_validation(error);
    return false;
  }

  var Award_Sheet_Semester = $.trim($("#Award_Sheet_Semester").val());
  $("#Award_Sheet_Semester").val(Award_Sheet_Semester);
  if (!Award_Sheet_Semester) {
    error = "<li>Select Semester</li>";
    PU_validation(error);
    return false;
  }
  $("#Award_Sheet_department_name").val(
    $("#Assign_Department :selected").text()
  );
  $("#Award_Sheet_course_name").val($("#Assign_Course :selected").text());

  PU_hide_validation();
  //startLoader();
}

function validate_SuperAdmin() {
  var error = "";

  var frm_fac_firstName = $.trim($("#frm_fac_firstName").val());
  $("#frm_fac_firstName").val(frm_fac_firstName);
  if (frm_fac_firstName) {
    if (!validString(frm_fac_firstName)) {
      error = error + "<li>Valid First Name Required </li>";
      PU_validation(error);
      return false;
    }
  } else {
    error = error + "<li>First Name Required</li>";
    PU_validation(error);
    return false;
  }

  /********************************* frm_fac_lastName  ******************************************/
  var frm_fac_lastName = $.trim($("#frm_fac_lastName").val());
  $("#frm_fac_lastName").val(frm_fac_lastName);
  if (frm_fac_lastName) {
    if (!validString(frm_fac_lastName)) {
      error = error + "<li>Valid Last Name Required </li>";
      PU_validation(error);
      return false;
    }
  } else {
    error = error + "<li>Last Name Required</li>";
    PU_validation(error);
    return false;
  }
  /********************************* frm_fac_gender  ******************************************/
  var frm_fac_gender = $.trim($("#frm_fac_gender").val());
  $("#frm_fac_gender").val(frm_fac_gender);
  if (!frm_fac_gender) {
    error = error + "<li>Select Gender</li>";
    PU_validation(error);
    return false;
  }
  /********************************* dob  ******************************************/
  var dob = $.trim($("#dob").val());
  if (!dob) {
    error = error + "<li>Enter DOB </li>";
    PU_validation(error);
    return false;
  }

  /********************************* frm_fac_contactNo  ******************************************/
  var frm_fac_contactNo = $.trim($("#frm_fac_contactNo").val());
  $("#frm_fac_contactNo").val(frm_fac_contactNo);
  if (frm_fac_contactNo) {
    if (!isInteger(frm_fac_contactNo)) {
      error = error + "<li>Contact No Only In Integer </li>";
      PU_validation(error);
      return false;
    } else {
      var validMobilelength = frm_fac_contactNo.length;
      if (validMobilelength != "10") {
        error = error + "<li>Contact No Must Be of 10 Integer Numbers</li>";
        PU_validation(error);
        return false;
      }
    }
  } else {
    error = error + "<li>Contact No Required</li>";
    PU_validation(error);
    return false;
  }

  /********************************* frm_fac_emailId  ******************************************/
  var frm_fac_emailId = $.trim($("#frm_fac_emailId").val());
  $("#frm_fac_emailId").val(frm_fac_emailId);
  if (frm_fac_emailId) {
    if (!validemailaddress(frm_fac_emailId)) {
      error = error + "<li>Valid Email ID Required </li>";
      PU_validation(error);
      return false;
    }
  } else {
    error = error + "<li>Email ID Required</li>";
    PU_validation(error);
    return false;
  }
  /********************************* frm_fac_address  ******************************************/
  var frm_fac_address = $.trim($("#frm_fac_address").val());
  $("#frm_fac_address").val(frm_fac_address);
  if (frm_fac_address) {
    if (!validaddress(frm_fac_address)) {
      error = error + "<li>Valid Address Required</li>";
      PU_validation(error);
      return false;
    }
  } else {
    error = error + "<li>Address Required</li>";
    PU_validation(error);
    return false;
  }
  /********************************* frm_fac_fatherName  ******************************************/
  var frm_fac_fatherName = $.trim($("#frm_fac_fatherName").val());
  $("#frm_fac_fatherName").val(frm_fac_fatherName);
  if (frm_fac_fatherName) {
    if (!validString(frm_fac_fatherName)) {
      error = error + "<li>Valid Father Name Required </li>";
      PU_validation(error);
      return false;
    }
  }

  /********************************* frm_fac_motherName  ******************************************/
  var frm_fac_motherName = $.trim($("#frm_fac_motherName").val());
  $("#frm_fac_motherName").val(frm_fac_motherName);
  if (frm_fac_motherName) {
    if (!validString(frm_fac_motherName)) {
      error = error + "<li>Valid Mother Name Required </li>";
      PU_validation(error);
      return false;
    }
  }

  /********************************* frm_fac_fatherEmail  ******************************************/
  var frm_fac_fatherEmail = $.trim($("#frm_fac_fatherEmail").val());
  $("#frm_fac_fatherEmail").val(frm_fac_fatherEmail);
  if (frm_fac_fatherEmail) {
    if (!validemailaddress(frm_fac_fatherEmail)) {
      error = error + "<li>Valid Father Email Required </li>";
      PU_validation(error);
      return false;
    }
  }

  /********************************* Assign_Department  ******************************************/
  var Assign_Department = $.trim($("#Assign_Department").val());
  $("#Assign_Department").val(Assign_Department);
  if (Assign_Department) {
    if (!isInteger(Assign_Department)) {
      error = error + "<li>Select Valid Department Name</li>";
      PU_validation(error);
      return false;
    }
  } else {
    error = error + "<li>Select Department Name</li>";
    PU_validation(error);
    return false;
  }

  /********************************* frm_fac_empCode  ******************************************/
  var frm_fac_empCode = $.trim($("#frm_fac_empCode").val());
  $("#frm_fac_empCode").val(frm_fac_empCode);
  if (frm_fac_empCode) {
    if (!validrollno(frm_fac_empCode)) {
      error = error + "<li>Valid Faculty Code Required</li>";
      PU_validation(error);
      return false;
    }
  } else {
    error = error + "<li>Faculty Code Required</li>";
    PU_validation(error);
    return false;
  }
  /********************************* frm_fac_designation  ******************************************/
  var frm_fac_designation = $.trim($("#frm_fac_designation").val());
  $("#frm_fac_designation").val(frm_fac_designation);
  if (frm_fac_designation) {
    if (!validrollno(frm_fac_designation)) {
      error = error + "<li>Valid Designation Required</li>";
      PU_validation(error);
      return false;
    }
  } else {
    error = error + "<li>Designation Required</li>";
    PU_validation(error);
    return false;
  }

  /********************************* doj  ******************************************/
  var doj = $.trim($("#doj").val());
  if (!doj) {
    error = error + "<li>Date of Joining Required</li>";
    PU_validation(error);
    return false;
  }

  PU_hide_validation();
  startLoader();
}

function validateYearBackSubmit() {
  PU_hide_validation();

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
    var error = "<li>Select Batch From</li>";
    PU_validation(error);
    return false;
  }
  var semesterId = $.trim($("#semesterId").val());
  if (!semesterId) {
    var error = "<li>Select Semester From</li>";
    PU_validation(error);
    return false;
  }

  var yearback_RollNo = $.trim($("#yearback_RollNo").val());
  $("#yearback_RollNo").val(yearback_RollNo);
  if (!yearback_RollNo) {
    var error = "<li>Enter Roll No</li>";
    PU_validation(error);
    return false;
  }
  var actionSelectTo = $.trim($("#actionSelectTo").val());
  $("#actionSelectTo").val(actionSelectTo);
  if (!actionSelectTo) {
    var error = "<li>Select Batch To </li>";
    PU_validation(error);
    return false;
  }
  var semesterIdTo = $.trim($("#semesterIdTo").val());
  $("#semesterIdTo").val(semesterIdTo);
  if (!semesterIdTo) {
    var error = "<li>Enter Semester To</li>";
    PU_validation(error);
    return false;
  }
  startLoader();
}

function validateYearBack() {
  PU_hide_validation();

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

  var yearback_RollNo = $.trim($("#yearback_RollNo").val());
  $("#yearback_RollNo").val(yearback_RollNo);
  if (!yearback_RollNo) {
    var error = "<li>Enter Roll No</li>";
    PU_validation(error);
    return false;
  }
  getYearBackStudentInfo(
    Assign_Department,
    Assign_Course,
    actionSelect,
    semesterId,
    yearback_RollNo
  );
}

function getYearBackStudentInfo(
  Assign_Department,
  Assign_Course,
  actionSelect,
  semesterId,
  yearback_RollNo
) {
  PU_hide_validation();
  $("#actionSelectTo").html("<option>Select Batch</option>");
  $("#semesterIdTo").html("<option>Select Semester</option>");
  $("#Year_Back_ProcessDiv").hide();
  $("#YearBackStudentDetails").html("");
  var secureKey = $("#secureKey").val();
  var secureHash = $("#secureHash").val();
  var csrf = $("#_csrf").val();
  if (Assign_Department && Assign_Course && semesterId) {
    startLoader();
    var url = BASEURL + "workflow/umsyearback/getstudentinfo";
    $.ajax({
      type: "POST",
      dataType: "json",
      url: url,
      data: {
        _csrf: csrf,
        dept_id: Assign_Department,
        courseid: Assign_Course,
        semesterId: semesterId,
        Batch: actionSelect,
        Roll_Number: yearback_RollNo,
        secureKey: secureKey,
        secureHash: secureHash,
      },
      success: function (data) {
        stopLoader();
        var status_id = data.STATUS_ID;
        var res = data.STATUS_RESPONSE;
        if (status_id == "000") {
          $("#YearBackStudentDetails").html(res);
          $batchToHtml = $("#actionSelect").html();
          $("#actionSelectTo").html($batchToHtml);
          $("#Year_Back_ProcessDiv").show();
        } else {
          PU_validation(res);
          return false;
        }
      },
    });
  }
}

function getSubjectListforReappearResult() {
  PU_hide_validation();
  $("#batchmarksinfo").html("");
  //    $("#getstudentlist_html").html("");
  var secureKey = $("#secureKey").val();
  var secureHash = $("#secureHash").val();
  var Assign_Department = $("#Assign_Department").val();
  var Assign_Course = $("#Assign_Course").val();

  var semesterId = $(".new_Semester_Select").val();
  //    var semesterId = $(this).val();
  var csrf = $("#_csrf").val();
  if (Assign_Department && Assign_Course && semesterId) {
    startLoader();
    var url = BASEURL + "result/umsuploadreappearmarks/getsubjectlist";
    $.ajax({
      type: "POST",
      dataType: "json",
      url: url,
      data: {
        _csrf: csrf,
        dept_id: Assign_Department,
        courseid: Assign_Course,
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
          $("#getstudentlist_html").html("");
          $("#detail_min").show();
          $("#departmentdetail").hide();
        } else {
          $("#departmentdetail").show();
          $("#getstudentlist_html").html("");
          $("#detail_min").hide();
          $("#batchmarksinfo").html("");
          PU_validation(res);
          return false;
        }
      },
    });
  }
}

function viewReappearStudentForEnterMarks(formid, btnid) {
  $("#download_student_result").hide();
  PU_hide_validation();
  startLoader();
  $("#html_studentmarksinfo").html("");
  var removeformid = formid;
  var formid = formid + " :input";
  var formdata = $("#" + formid).serialize();
  $("#remove_SubjectFromList").val("");

  var csrf = $("#_csrf").val();
  var url = BASEURL + "result/umsuploadreappearmarks/studentlistformarks";
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
        $("#html_studentmarksinfo").html(res);
        $("#download_student_result").show();
        $("#remove_SubjectFromList").val(removeformid);
      } else {
        PU_validation(res);
        return false;
      }
      $("#batchmarksinfo").find("button").removeClass("btn-success");
      $("#batchmarksinfo").find("button").addClass("btn-primary");
      $("#" + btnid).addClass("btn-success");
      $("#" + btnid).removeClass("btn-primary");
    },
  });
}

function fileSelected(fileid, preview_pdf, fileobj) {
  PU_hide_validation();
  $("#update_ProfileButton").css("display", "none");
  $("#Image_type").val("");
  $("#Image_Ext").val("");
  var filesize = parseInt(FILEUPLOADSIZE);
  var valid = validateFileSize(fileid, filesize);
  var error = "";
  if (valid == "0") {
    $("#" + fileid).val("");
    error =
      error +
      "<li>Size can not be greater then " +
      FILEUPLOADSIZE +
      " KB / File Empty.</li>";
    PU_validation(error);
    return false;
  }
  var ext_name = "jpg,jpeg,png";

  var jpeg = "data:image/jpeg";
  var jpeg_magic = "0xFFD8FFE0";

  var png = "data:image/png";
  var pngmagic = "0x89504E47";

  var slice = fileobj.slice(0, 4);
  var reader = new FileReader();
  reader.readAsArrayBuffer(slice);
  reader.onload = function (e) {
    var buffer = reader.result;
    var view = new DataView(buffer);
    var magic = view.getUint32(0, false);

    if (magic) {
      var extall = ext_name;
      var filen = fileobj.name;
      var ext = filen.split(".").pop().toLowerCase();
      if (parseInt(extall.indexOf(ext)) < 0) {
        error = error + "<li>File extension not supported !</li>";
        PU_validation(error);
        return false;
      } else {
        //alert('true part');
        var fname = document.getElementById(fileid).value;

        var oFile = document.getElementById(fileid).files[0];
        var oImage = document.getElementById(preview_pdf);
        var counter = fileid.substr(-1);
        var iserror = false;
        var oReader = new FileReader();
        oReader.onload = function (e) {
          //e.target.result contains the DataURL which we will use as a source of the image
          var chktype = e.target.result.split(";")[0];
          if (
            (chktype == jpeg && magic == jpeg_magic) ||
            (chktype == png && magic == pngmagic)
          ) {
            $("#removesingleupload").css("display", "block");
            $("#removesingleupload").html(
              "<button id=\"removeimagebutton\" type=\"button\" onclick=\"removesingleupload('singleuploadtag','removeimagebutton','imagepreviewsrc','" +
                fileid +
                '\')" class="btn btn-danger" >Remove</button>'
            );
            $("#imagepreviewsrc").html("");
            $("#singleuploadtag").html("Change Photo");
            $("#singleimageupload").css("right", "34%");
            $("#singleimageupload").css("width", "33%");
            $("#singleimageupload").css("height", "35%");
            $("#Image_type").val(chktype);
            $("#Image_Ext").val(ext);

            var img_src_url;
            img_src_url = e.target.result;
            var img =
              '<a target="_blank" href="' +
              e.target.result +
              '"><img style="border-radius:50%;height:100px; width:100px;" src="' +
              img_src_url +
              '"/></a><input type="hidden" id="pu_candidate_image" name="tblCandidateImage[Image_Content]" value="' +
              e.target.result +
              '" />';
            $("#imagepreviewsrc").css("float", "left");
            $("#singleupload").css("float", "left");
            $("#singleupload").css("margin-left", "2%");

            $("#imagepreviewsrc").html(img);
            $("#imagepreviewsrc").css("display", "block");
            $("#update_ProfileButton").css("display", "inline-block");
          } else {
            document.getElementById(fileid).value = "";
            error = error + "<li>File type/content not supported!</li>";
            PU_validation(error);
            return false;
          }
        }; //oReader.onload
        oReader.readAsDataURL(oFile);
      } //else parseInt(extall.indexOf(ext)) < 0
    } else {
      $("#file").val("");
      error = error + "<li>File type/content not supported!</li>";
      PU_validation(error);
      return false;
    } //else magic==magiccode
  };
}

function removesingleupload(tag, buttonid, divimgprev, fileid) {
  PU_hide_validation();
  $("#" + buttonid).remove();
  $("#" + divimgprev).css("display", "none");
  $("#" + divimgprev).html("");
  $("#" + fileid).val("");
  $("#" + tag).html("");
  $("#" + tag).html("Upload Photo");
  $("#" + fileid).css("right", "65%");
  $("#" + fileid).css("width", "31%");
  $("#" + fileid).css("height", "100%");
  $("#Image_type").val("");
  $("#Image_Ext").val("");
  $("#update_ProfileButton").css("display", "none");
}

function validateFileSize(id, filesize) {
  var file = document.getElementById(id);
  var file_Size = file.files[0].size / 1000; //(file[0].size||file[0].fileSize);//file.files[0].size;
  if (file_Size == 0 || file_Size > filesize) {
    return "0";
  }
  return "1";
}

function validateFreezeAttendance() {
  PU_hide_validation();

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

  startLoader();
}

function validate_GazettePrinting() {
  var error = "";
  /************************* Gazette_Examination **************************************************/
  var Gazette_Examination = $.trim($("#Gazette_Examination").val());
  $("#Gazette_Examination").val(Gazette_Examination);
  if (!Gazette_Examination) {
    error = error + "<li>Select Examination</li>";
    PU_validation(error);
    return false;
  }
  /************************* Gazette_Examination_year **************************************************/
  var Gazette_Examination_year = $.trim($("#Gazette_Examination_year").val());
  $("#Gazette_Examination_year").val(Gazette_Examination_year);
  if (!Gazette_Examination_year) {
    error = error + "<li>Select Year</li>";
    PU_validation(error);
    return false;
  }
  /************************* Assign_Department **************************************************/
  var Assign_Department = $.trim($("#Assign_Department").val());
  $("#Assign_Department").val(Assign_Department);
  if (!Assign_Department) {
    error = error + "<li>Select Department</li>";
    PU_validation(error);
    return false;
  }
  var Departmentname = $("#Assign_Department option:selected").text();
  $("#dept_name").val(Departmentname);
  /************************* Assign_Course **************************************************/
  var Assign_Course = $.trim($("#Assign_Course").val());
  $("#Assign_Course").val(Assign_Course);
  if (!Assign_Course) {
    error = error + "<li>Select Course</li>";
    PU_validation(error);
    return false;
  }
  var coursename = $("#Assign_Course option:selected").text();
  $("#course_name").val(coursename);

  /************************* SelectBatch **************************************************/
  var actionSelect = $.trim($("#actionSelect").val());
  $("#actionSelect").val(actionSelect);
  if (!actionSelect) {
    error = error + "<li>Select Batch</li>";
    PU_validation(error);
    return false;
  }

  /************************* semesterId **************************************************/
  var semesterId = $.trim($("#semesterId").val());
  $("#semesterId").val(semesterId);
  if (!semesterId) {
    error = error + "<li>Select Semester</li>";
    PU_validation(error);
    return false;
  }

  //if(!validBatchWithSession())
  //return false;
  PU_hide_validation();
  startLoader();
  downloadGazettePrinting();
}

function downloadGazettePrinting() {
  var formdata = $("#frm_gazetteprinting :input").serialize();
  var csrf = $("#_csrf").val();
  var url = BASEURL + "examination/umsgazetteprinting/download";
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
      var downloadurl =
        BASEURL +
        "attendance/umsshortattendancetxnstatus/downloadfile?filename=" +
        res;
      stopLoader();
      if (status_id == "000") {
        window.location.href = downloadurl;
      } else {
        PU_validation(res);
        return false;
      }
    },
  });
}

function validate_DMCPrinting() {
  var error = "";
  /************************* Gazette_Examination **************************************************/
  var Gazette_Examination = $.trim($("#Gazette_Examination").val());
  $("#Gazette_Examination").val(Gazette_Examination);
  if (!Gazette_Examination) {
    error = error + "<li>Select Examination</li>";
    PU_validation(error);
    return false;
  }
  /************************* Gazette_Examination_year **************************************************/
  var Gazette_Examination_year = $.trim($("#Gazette_Examination_year").val());
  $("#Gazette_Examination_year").val(Gazette_Examination_year);
  if (!Gazette_Examination_year) {
    error = error + "<li>Select Year</li>";
    PU_validation(error);
    return false;
  }
  /************************* Assign_Department **************************************************/
  var Assign_Department = $.trim($("#Assign_Department").val());
  $("#Assign_Department").val(Assign_Department);
  if (!Assign_Department) {
    error = error + "<li>Select Department</li>";
    PU_validation(error);
    return false;
  }
  var Departmentname = $("#Assign_Department option:selected").text();
  $("#dept_name").val(Departmentname);
  /************************* Assign_Course **************************************************/
  var Assign_Course = $.trim($("#Assign_Course").val());
  $("#Assign_Course").val(Assign_Course);
  if (!Assign_Course) {
    error = error + "<li>Select Course</li>";
    PU_validation(error);
    return false;
  }
  var coursename = $("#Assign_Course option:selected").text();
  $("#course_name").val(coursename);

  /************************* SelectBatch **************************************************/
  var actionSelect = $.trim($("#actionSelect").val());
  $("#actionSelect").val(actionSelect);
  if (!actionSelect) {
    error = error + "<li>Select Batch</li>";
    PU_validation(error);
    return false;
  }

  /************************* semesterId **************************************************/
  var semesterId = $.trim($("#semesterId").val());
  $("#semesterId").val(semesterId);
  if (!semesterId) {
    error = error + "<li>Select Semester</li>";
    PU_validation(error);
    return false;
  }

  //if(!validBatchWithSession())
  //return false;
  PU_hide_validation();
  startLoader();
  downloadDMCPrinting();
}

function downloadDMCPrinting() {
  var formdata = $("#frm_gazetteprinting :input").serialize();
  var csrf = $("#_csrf").val();
  var url = BASEURL + "examination/umsdmcprinting/download";
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
      var downloadurl =
        BASEURL +
        "attendance/umsshortattendancetxnstatus/downloadfile?filename=" +
        res;
      stopLoader();
      if (status_id == "000") {
        window.location.href = downloadurl;
      } else {
        PU_validation(res);
        return false;
      }
    },
  });
}

function validate_GazetteDeclarationDate($chk) {
  var error = "";
  if ($chk != "S" && $chk != "V") {
    error = error + "<li>In Valid Action</li>";
    PU_validation(error);
    return false;
  }

  /************************* Gazette_Examination **************************************************/
  var Gazette_Examination = $.trim($("#Gazette_Examination").val());
  $("#Gazette_Examination").val(Gazette_Examination);
  if (!Gazette_Examination) {
    error = error + "<li>Select Examination</li>";
    PU_validation(error);
    return false;
  }

  /************************* Gazette_Examination_year **************************************************/
  var Gazette_Examination_year = $.trim($("#Gazette_Examination_year").val());
  $("#Gazette_Examination_year").val(Gazette_Examination_year);
  if (!Gazette_Examination_year) {
    error = error + "<li>Select Examination Year</li>";
    PU_validation(error);
    return false;
  }

  /************************* Assign_Department **************************************************/
  var Assign_Department = $.trim($("#Assign_Department").val());
  $("#Assign_Department").val(Assign_Department);
  if (!Assign_Department) {
    error = error + "<li>Select Department</li>";
    PU_validation(error);
    return false;
  }
  var Departmentname = $("#Assign_Department option:selected").text();
  $("#dept_name").val(Departmentname);
  /************************* Assign_Course **************************************************/
  var Assign_Course = $.trim($("#Assign_Course").val());
  $("#Assign_Course").val(Assign_Course);
  if (!Assign_Course) {
    error = error + "<li>Select Course</li>";
    PU_validation(error);
    return false;
  }
  var coursename = $("#Assign_Course option:selected").text();
  $("#course_name").val(coursename);

  /************************* SelectBatch **************************************************/
  var actionSelect = $.trim($("#actionSelect").val());
  $("#actionSelect").val(actionSelect);
  if (!actionSelect) {
    error = error + "<li>Select Batch</li>";
    PU_validation(error);
    return false;
  }

  /************************* semesterId **************************************************/
  var semesterId = $.trim($("#semesterId").val());
  $("#semesterId").val(semesterId);
  if (!semesterId) {
    error = error + "<li>Select Semester</li>";
    PU_validation(error);
    return false;
  }

  if ($chk == "V") {
    viewGazetteDeclarationDate();
    return false;
  } else {
    /************************* Gazette_Action **************************************************/
    var Gazette_Action = $.trim($("#Gazette_Action").val());
    $("#Gazette_Action").val(Gazette_Action);
    if (!Gazette_Action) {
      error = error + "<li>Select Action</li>";
      PU_validation(error);
      return false;
    }

    /************************* semesterId **************************************************/
    var Gazette_Date = $.trim($("#Short_Attendance_from_date").val());
    $("#Short_Attendance_from_date").val(Gazette_Date);
    if (!Gazette_Date) {
      error = error + "<li>Select Gazette Date</li>";
      PU_validation(error);
      return false;
    }

    PU_hide_validation();
    startLoader();
  }

  //if(!validBatchWithSession())
  //return false;
}
function viewGazetteDeclarationDate() {
  PU_hide_validation();
  startLoader();
  $("#gazette_div_info").html("");
  $(".Gazette_Status_display").html("");
  $(".Gazette_process_Button").html("");
  $Gazette_Status_displayhtml =
    "<div class='col-lg-2'>Action </div><div class='col-lg-4'><select name='Gazette[Action]' id='Gazette_Action' class='Gazette_Action'> <option value=''>Select Action</option><option value='S'>Save As Draft</option><option value='F'>Finalize</option></select></div><div class='col-lg-2'>Gazette Date</div><div class='col-lg-4'><input readonly = 'readonly' id='Short_Attendance_from_date' type='text' name='Gazette[Gazette_Date]' value='' /></div>";
  $Gazette_process_Button =
    "<input name='Process' class='btn btn-primary' type='submit' onclick='return validate_GazetteDeclarationDate(\"S\");' value='Submit' id='frm_submit'>";

  var formdata = $("#frm_gazettedate :input").serialize();
  var csrf = $("#_csrf").val();
  var url = BASEURL + "examination/umsgazettedeclarationdate/view";
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
      stopLoader();
      var Gazette_Status = data.Gazette_Status;
      if (Gazette_Status == "0") {
        $(".Gazette_Status_display").html($Gazette_Status_displayhtml);
        $(".Gazette_process_Button").html($Gazette_process_Button);

        $("#Short_Attendance_from_date")
          .datepicker({
            format: "dd-mm-yyyy",
            endDate: TODAY_DATE, //today_date
            todayHighlight: true,
          })
          .on("changeDate", function () {
            var Short_Attendance_from_date = $(this).val();
            $(this).val(Short_Attendance_from_date);
            $(".datepicker").hide();
          });
      }

      if (status_id == "000") {
        $("#gazette_div_info").html(res);
      } else {
        PU_validation(res);
        return false;
      }
    },
  });
}

function fileSelectedCOESignature(fileid, preview_pdf, fileobj) {
  PU_hide_validation();
  $("#Image_type").val("");
  $("#Image_Ext").val("");
  var filesize = parseInt(FILEUPLOADSIZE);
  var valid = validateFileSize(fileid, filesize);
  var error = "";
  if (valid == "0") {
    $("#" + fileid).val("");
    error =
      error +
      "<li>Size can not be greater then " +
      FILEUPLOADSIZE +
      " KB / File Empty </li>";
    PU_validation(error);
    return false;
  }
  var ext_name = "jpg,jpeg,png";

  var jpeg = "data:image/jpeg";
  var jpeg_magic = "0xFFD8FFE0";

  var png = "data:image/png";
  var pngmagic = "0x89504E47";

  var slice = fileobj.slice(0, 4);
  var reader = new FileReader();
  reader.readAsArrayBuffer(slice);
  reader.onload = function (e) {
    var buffer = reader.result;
    var view = new DataView(buffer);
    var magic = view.getUint32(0, false);

    if (magic) {
      var extall = ext_name;
      var filen = fileobj.name;
      var ext = filen.split(".").pop().toLowerCase();
      if (parseInt(extall.indexOf(ext)) < 0) {
        error = error + "<li>File extension not supported !</li>";
        PU_validation(error);
        return false;
      } else {
        //alert('true part');
        var fname = document.getElementById(fileid).value;

        var oFile = document.getElementById(fileid).files[0];
        var oImage = document.getElementById(preview_pdf);
        var counter = fileid.substr(-1);
        var iserror = false;
        var oReader = new FileReader();
        oReader.onload = function (e) {
          //e.target.result contains the DataURL which we will use as a source of the image
          var chktype = e.target.result.split(";")[0];
          if (
            (chktype == jpeg && magic == jpeg_magic) ||
            (chktype == png && magic == pngmagic)
          ) {
            $("#removesingleupload").css("display", "block");
            $("#removesingleupload").html(
              "<button id=\"removeimagebutton\" type=\"button\" onclick=\"removesingleuploadCOESignature('singleuploadtag','removeimagebutton','imagepreviewsrc','" +
                fileid +
                '\')" class="btn btn-danger" >Remove</button>'
            );
            $("#imagepreviewsrc").html("");
            $("#singleuploadtag").html("Change Signature");
            $("#singleimageupload").css("right", "34%");
            $("#singleimageupload").css("width", "33%");
            $("#singleimageupload").css("height", "35%");
            $("#Image_type").val(chktype);
            $("#Image_Ext").val(ext);

            var img_src_url;
            img_src_url = e.target.result;
            var img =
              '<a target="_blank" href="' +
              e.target.result +
              '"><img style="border-radius:50%;height:100px; width:100px;" src="' +
              img_src_url +
              '"/></a><input type="hidden" id="pu_candidate_image" name="tblCandidateImage[Image_Content]" value="' +
              e.target.result +
              '" />';
            $("#imagepreviewsrc").css("float", "left");
            $("#singleupload").css("float", "left");
            $("#singleupload").css("margin-left", "0%");

            $("#imagepreviewsrc").html(img);
            $("#imagepreviewsrc").css("display", "block");
          } else {
            document.getElementById(fileid).value = "";
            error = error + "<li>File type/content not supported!</li>";
            PU_validation(error);
            return false;
          }
        }; //oReader.onload
        oReader.readAsDataURL(oFile);
      } //else parseInt(extall.indexOf(ext)) < 0
    } else {
      $("#file").val("");
      error = error + "<li>File type/content not supported!</li>";
      PU_validation(error);
      return false;
    } //else magic==magiccode
  };
}

function removesingleuploadCOESignature(tag, buttonid, divimgprev, fileid) {
  PU_hide_validation();
  $("#" + buttonid).remove();
  $("#" + divimgprev).css("display", "none");
  $("#" + divimgprev).html("");
  $("#" + fileid).val("");
  $("#" + tag).html("");
  $("#" + tag).html("Upload Signature");
  $("#" + fileid).css("right", "65%");
  $("#" + fileid).css("width", "31%");
  $("#" + fileid).css("height", "100%");
  $("#Image_type").val("");
  $("#Image_Ext").val("");
}

function validate_COEDetails($chk) {
  var error = "";
  if ($chk != "S" && $chk != "V") {
    error = error + "<li>In Valid Action</li>";
    PU_validation(error);
    return false;
  }
  /************************* COE_Examination **************************************************/
  var COE_Examination = $.trim($("#COE_Examination").val());
  $("#COE_Examination").val(COE_Examination);
  if (!COE_Examination) {
    error = error + "<li>Select Examination</li>";
    PU_validation(error);
    return false;
  }

  /************************* attendance_register_year **************************************************/
  var attendance_register_year = $.trim($("#attendance_register_year").val());
  $("#attendance_register_year").val(attendance_register_year);
  if (!attendance_register_year) {
    error = error + "<li>Select Year</li>";
    PU_validation(error);
    return false;
  }

  if ($chk == "V") {
    viewCOEDetails();
    return false;
  } else {
    /************************* pu_candidate_image **************************************************/
    var COE_Signature = $.trim($("#pu_candidate_image").val());
    if (!COE_Signature) {
      error = error + "<li>Select Signature</li>";
      PU_validation(error);
      return false;
    }

    /************************* COE_Action **************************************************/
    var COE_Action = $.trim($("#COE_Action").val());
    $("#COE_Action").val(COE_Action);
    if (!COE_Action) {
      error = error + "<li>Select Action</li>";
      PU_validation(error);
      return false;
    }

    /************************* COE_Name **************************************************/
    var COE_Name = $.trim($("#COE_Name").val());
    $("#COE_Name").val(COE_Name);

    if (COE_Name) {
      if (!validString(COE_Name)) {
        error = error + "<li>Valid COE Name Required </li>";
        PU_validation(error);
        return false;
      }
    } else {
      error = error + "<li>COE Name Required</li>";
      PU_validation(error);
      return false;
    }

    PU_hide_validation();
    startLoader();
  }
}

function viewCOEDetails() {
  PU_hide_validation();
  startLoader();
  $("#COE_Signature_Div").hide();
  $("#gazette_div_info").html("");
  $(".COE_Status_display").html("");
  $(".COE_process_Button").html("");
  $valid_Function_Value = "S";
  $COE_Status_displayhtml =
    "<div class='col-lg-2'>Action </div><div class='col-lg-4'><select name='COE[Action]' id='COE_Action' class='COE_Action'> <option value=''>Select Action</option><option value='S'>Save As Draft</option><option value='F'>Finalize</option></select></div><div class='col-lg-2'>COE Name</div><div class='col-lg-4'><input id='COE_Name' type='text' name='COE[Name]' value='' /></div>";
  $COE_process_Button =
    "<input name='Process' class='btn btn-primary' type='submit' onclick='return validate_COEDetails(\"S\")' value='Submit' id='frm_submit'>";

  var formdata = $("#update_coe_details_frm :input").serialize();
  var csrf = $("#_csrf").val();
  var url = BASEURL + "examination/umscoedetails/view";
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
      stopLoader();
      var COE_Status = data.COE_Status;
      if (COE_Status == "0") {
        $(".COE_Status_display").html($COE_Status_displayhtml);
        $(".COE_process_Button").html($COE_process_Button);
        $("#COE_Signature_Div").show();
      }

      if (status_id == "000") {
        $("#COE_div_info").html(res);
      } else {
        PU_validation(res);
        return false;
      }
    },
  });
}

function ViewStudentGroupWise() {
  PU_hide_validation();
  startLoader();
  $("#viewgroupstudentlist_html").html("");
  var formdata = $(".frm_assignsubjectbyhod :input").serialize();
  var csrf = $("#_csrf").val();
  var url = BASEURL + "workflow/umsviewgroupdetails/viewstudentlist";
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
        $("#viewgroupstudentlist_html").html(res);
        $("#viewgroupstudentlist").modal();
      } else {
        PU_validation(res);
        return false;
      }
    },
  });
}

function ViewStudentGroupWiseFaculty() {
  PU_hide_validation();
  startLoader();
  $("#viewgroupstudentlist_html").html("");
  var formdata = $(".frm_viewassignsubject :input").serialize();
  var csrf = $("#_csrf").val();
  var url = BASEURL + "workflow/viewassignsubject/viewstudentlist";
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
        $("#viewgroupstudentlist_html").html(res);
        $("#viewgroupstudentlist").modal();
      } else {
        PU_validation(res);
        return false;
      }
    },
  });
}

function validate_ExaminationRemarks($chk) {
  var error = "";
  if ($chk != "S" && $chk != "V") {
    error = error + "<li>In Valid Action</li>";
    PU_validation(error);
    return false;
  }

  /************************* Gazette_Examination **************************************************/
  var Gazette_Examination = $.trim($("#Gazette_Examination").val());
  $("#Gazette_Examination").val(Gazette_Examination);
  if (!Gazette_Examination) {
    error = error + "<li>Select Examination</li>";
    PU_validation(error);
    return false;
  }

  /************************* Gazette_Examination_year **************************************************/
  var Gazette_Examination_year = $.trim($("#Gazette_Examination_year").val());
  $("#Gazette_Examination_year").val(Gazette_Examination_year);
  if (!Gazette_Examination_year) {
    error = error + "<li>Select Examination Year</li>";
    PU_validation(error);
    return false;
  }

  /************************* Assign_Department **************************************************/
  var Assign_Department = $.trim($("#Assign_Department").val());
  $("#Assign_Department").val(Assign_Department);
  if (!Assign_Department) {
    error = error + "<li>Select Department</li>";
    PU_validation(error);
    return false;
  }
  var Departmentname = $("#Assign_Department option:selected").text();
  $("#dept_name").val(Departmentname);
  /************************* Assign_Course **************************************************/
  var Assign_Course = $.trim($("#Assign_Course").val());
  $("#Assign_Course").val(Assign_Course);
  if (!Assign_Course) {
    error = error + "<li>Select Course</li>";
    PU_validation(error);
    return false;
  }
  var coursename = $("#Assign_Course option:selected").text();
  $("#course_name").val(coursename);

  /************************* SelectBatch **************************************************/
  var actionSelect = $.trim($("#actionSelect").val());
  $("#actionSelect").val(actionSelect);
  if (!actionSelect) {
    error = error + "<li>Select Batch</li>";
    PU_validation(error);
    return false;
  }

  /************************* semesterId **************************************************/
  var semesterId = $.trim($("#semesterId").val());
  $("#semesterId").val(semesterId);
  if (!semesterId) {
    error = error + "<li>Select Semester</li>";
    PU_validation(error);
    return false;
  }

  /************************* ExaminationRemarks_RollNo **************************************************/
  var ExaminationRemarks_RollNo = $.trim($("#ExaminationRemarks_RollNo").val());
  $("#ExaminationRemarks_RollNo").val(ExaminationRemarks_RollNo);
  if (!ExaminationRemarks_RollNo) {
    error = error + "<li>Roll Number Required</li>";
    PU_validation(error);
    return false;
  }

  if ($chk == "V") {
    viewExaminationRemarksStudentDetails();
    return false;
  } else {
    /************************* ExaminationRemarks_Remarks **************************************************/
    var ExaminationRemarks_Remarks = $.trim(
      $("#ExaminationRemarks_Remarks").val()
    );
    $("#ExaminationRemarks_Remarks").val(ExaminationRemarks_Remarks);
    if (ExaminationRemarks_Remarks) {
      if (!validsubjectnameanddescription(ExaminationRemarks_Remarks)) {
        error = error + "<li>Valid Remarks Required</li>";
        PU_validation(error);
        return false;
      }
    }

    PU_hide_validation();
    startLoader();
  }
}

function viewGazetteDeclarationDate() {
  PU_hide_validation();
  startLoader();
  $("#gazette_div_info").html("");
  $(".Gazette_Status_display").html("");
  $(".Gazette_process_Button").html("");
  $Gazette_Status_displayhtml =
    "<div class='col-lg-2'>Action </div><div class='col-lg-4'><select name='Gazette[Action]' id='Gazette_Action' class='Gazette_Action'> <option value=''>Select Action</option><option value='S'>Save As Draft</option><option value='F'>Finalize</option></select></div><div class='col-lg-2'>Gazette Date</div><div class='col-lg-4'><input readonly = 'readonly' id='Short_Attendance_from_date' type='text' name='Gazette[Gazette_Date]' value='' /></div>";
  $Gazette_process_Button =
    "<input name='Process' class='btn btn-primary' type='submit' onclick='return validate_GazetteDeclarationDate(\"S\");' value='Submit' id='frm_submit'>";

  var formdata = $("#frm_gazettedate :input").serialize();
  var csrf = $("#_csrf").val();
  var url = BASEURL + "examination/umsgazettedeclarationdate/view";
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
      stopLoader();
      var Gazette_Status = data.Gazette_Status;
      if (Gazette_Status == "0") {
        $(".Gazette_Status_display").html($Gazette_Status_displayhtml);
        $(".Gazette_process_Button").html($Gazette_process_Button);

        $("#Short_Attendance_from_date")
          .datepicker({
            format: "dd-mm-yyyy",
            endDate: TODAY_DATE, //today_date
            todayHighlight: true,
          })
          .on("changeDate", function () {
            var Short_Attendance_from_date = $(this).val();
            $(this).val(Short_Attendance_from_date);
            $(".datepicker").hide();
          });
      }

      if (status_id == "000") {
        $("#gazette_div_info").html(res);
      } else {
        PU_validation(res);
        return false;
      }
    },
  });
}

function viewExaminationRemarksStudentDetails() {
  PU_hide_validation();
  startLoader();
  $("#examination_div_info").html("");
  $(".Examination_process_Button").html("");
  $Examination_process_Button =
    "<input name='Process' class='btn btn-primary' type='submit' onclick='return validate_ExaminationRemarks(\"S\");' value='Submit' id='frm_submit'>";

  var formdata = $("#frm_examinationYear :input").serialize();
  var csrf = $("#_csrf").val();
  var url = BASEURL + "examination/umsexaminationremarks/view";
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
      stopLoader();

      if (status_id == "000") {
        $("#examination_div_info").html(res);
        $(".Examination_remarks_div").show();
        $("#ExaminationRemarks_RollNo").attr("readonly", true);
        $(".Examination_process_Button").html($Examination_process_Button);
      } else {
        PU_validation(res);
        return false;
      }
    },
  });
}

function validatefileSelectedAssignment(fileid, fileobj) {
  PU_hide_validation();
  $("#update_ProfileButton").css("display", "none");
  $("#Image_type").val("");
  $("#Image_Ext").val("");
  var filesize = parseInt(FILEUPLOADSIZEASSIGNMENT);
  var valid = validateFileSize(fileid, filesize);
  var error = "";
  if (valid == "0") {
    $("#" + fileid).val("");
    error =
      error +
      "<li>Size can not be greater then " +
      FILEUPLOADSIZEASSIGNMENT +
      " KB / File Empty. </li>";
    PU_validation(error);
    return false;
  }
  var ext_name = "pdf,doc,docx,ppt,pptx";

  //var pdf = 'data:image/jpeg';
  var pdf_magic = "0xFFD8FFE0";
  var pdf_magic2 = "626017350";

  //var doc="data:image/png";
  var docpptmagic = "OxD0CF11E0A1B11AE1";
  var docpptmagic2 = "D0CF11E0A1B11AE1";
  var docpptmagic3 = "3503231456";

  var docxpptxmagic = "Ox504B030414000600";
  var docxpptxmagic2 = "Ox504B0304";
  var docxpptxmagic3 = "504B030414000600";
  var docxpptxmagic4 = "504B0304";
  var docxpptxmagic5 = "1347093252";

  var slice = fileobj.slice(0, 4);
  var reader = new FileReader();
  reader.readAsArrayBuffer(slice);
  reader.onload = function (e) {
    var buffer = reader.result;
    var view = new DataView(buffer);
    var magic = view.getUint32(0, false);

    if (magic) {
      var extall = ext_name;
      var filen = fileobj.name;
      var ext = filen.split(".").pop().toLowerCase();
      if (parseInt(extall.indexOf(ext)) < 0) {
        error = error + "<li>File extension not supported !</li>";
        $("#frm_fileUpload").val("");
        PU_validation(error);
        return false;
      } else {
        //alert('true part');
        //var fname = document.getElementById(fileid).value;

        var oFile = document.getElementById(fileid).files[0];
        // var oImage = document.getElementById(preview_pdf);
        //var counter=fileid.substr(-1);
        //var iserror=false;
        var oReader = new FileReader();
        oReader.onload = function (e) {
          //e.target.result contains the DataURL which we will use as a source of the image
          var chktype = e.target.result.split(";")[0];
          alert(chktype);
          //alert(magic);
          if (
            magic == pdf_magic ||
            magic == pdf_magic2 ||
            magic == docpptmagic ||
            magic == docpptmagic2 ||
            magic == docpptmagic3 ||
            magic == docxpptxmagic ||
            magic == docxpptxmagic2 ||
            magic == docxpptxmagic3 ||
            magic == docxpptxmagic4 ||
            magic == docxpptxmagic5
          ) {
            $("#Image_type").val(chktype);
            $("#Image_Ext").val(ext);
          } else {
            document.getElementById(fileid).value = "";
            error = error + "<li>File type/content not supported!</li>";
            $("#frm_fileUpload").val("");
            PU_validation(error);
            return false;
          }
        }; //oReader.onload
        oReader.readAsDataURL(oFile);
      } //else parseInt(extall.indexOf(ext)) < 0
    } else {
      $("#file").val("");
      error = error + "<li>File type/content not supported!</li>";
      $("#frm_fileUpload").val("");
      PU_validation(error);
      return false;
    } //else magic==magiccode
  };
}

function validateAssignBAdmin($id) {
  PU_hide_validation();
  $val = $id.value;
  if ($val == "View" || $val == "Assign") {
    var Assign_Faculty_Department = $.trim(
      $("#Assign_Faculty_Department").val()
    );
    if (!Assign_Faculty_Department) {
      var error = "<li>Select Department</li>";
      PU_validation(error);
      return false;
    }
    if ($val == "View") {
      viewCurrentBadmin(Assign_Faculty_Department);
    } else {
      if ($(".other_dept_Badmin_checkbox").prop("checked")) {
        var Assign_Badmin_Other_Department = $.trim(
          $("#Assign_Badmin_Other_Department").val()
        );
        if (!Assign_Badmin_Other_Department) {
          var error = "<li>Select Other Department</li>";
          PU_validation(error);
          return false;
        }

        var assign_Other_Department_Faculty = $.trim(
          $("#assign_Other_Department_Faculty").val()
        );
        if (!assign_Other_Department_Faculty) {
          var error = "<li>Select Other Department Faculty</li>";
          PU_validation(error);
          return false;
        }
      } else {
        var assign_subject_to_faculty = $.trim(
          $("#assign_subject_to_faculty").val()
        );
        if (!assign_subject_to_faculty) {
          var error = "<li>Select Faculty</li>";
          PU_validation(error);
          return false;
        }
      }
    }
    startLoader();
  } else {
    var error = "<li>In valid Selection</li>";
    PU_validation(error);
    return false;
  }
}

function viewCurrentBadmin(Assign_Faculty_Department) {
  PU_hide_validation();
  startLoader();
  $("#ViewCurrentBadmin_div_info").html("");
  var csrf = $("#_csrf").val();
  var url = BASEURL + "workflow/umsassignbranchadmin/viewcurrentbranchadmin";
  $.ajax({
    type: "POST",
    dataType: "json",
    url: url,
    data: {
      _csrf: csrf,
      dept: Assign_Faculty_Department,
    },
    success: function (data) {
      stopLoader();
      var status_id = data.STATUS_ID;
      var res = data.STATUS_RESPONSE;

      if (status_id == "000") {
        $("#ViewCurrentBadmin_div_info").html(res);
      } else {
        PU_validation(res);
        return false;
      }
    },
  });
}

function validate_ThesisCordinatorStudent() {
  PU_hide_validation();
  $("#course_name").val("");
  $("#dept_name").val("");

  var Assign_Department = $("#Assign_Department_student").val();
  if (!Assign_Department) {
    var error = "<li>Select Department </li>";
    PU_validation(error);
    return false;
  } else {
  }
  var Departmentname = $("#Assign_Department_student option:selected").text();
  $("#dept_name").val(Departmentname);
  var Assign_Course = $("#Assign_Course").val();
  if (!Assign_Course) {
    var error = "<li>Select Course </li>";
    PU_validation(error);
    return false;
  } else {
    if (Assign_Course == "22" || Assign_Course == "33") {
    } else {
      var error = "<li>Invalid Course Selection,Contact Admin.</li>";
      PU_validation(error);
      return false;
    }
  }
  var coursename = $("#Assign_Course option:selected").text();
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
  }

  var subject_id = $("#subject_id").val();
  if (!subject_id) {
    var error = "<li>Select Subject </li>";
    PU_validation(error);
    return false;
  } else {
  }

  var topic_name = $.trim($("#topic_name").val());
  $("#topic_name").val(topic_name);
  if (!topic_name) {
    var error = "<li>Topic Name Required</li>";
    PU_validation(error);
    return false;
  }

  var Assign_Faculty_Department = $("#Assign_Faculty_Department").val();
  if (!Assign_Faculty_Department) {
    var error = "<li>Select Department </li>";
    PU_validation(error);
    return false;
  } else {
  }

  var assign_subject_to_faculty = $("#assign_subject_to_faculty").val();
  if (!assign_subject_to_faculty) {
    var error = "<li>Select Coordinator-I Faculty </li>";
    PU_validation(error);
    return false;
  } else {
  }

  var Assign_Badmin_Other_Department = $(
    "#Assign_Badmin_Other_Department"
  ).val();
  if (!Assign_Badmin_Other_Department) {
    var error = "<li>Select Department </li>";
    PU_validation(error);
    return false;
  } else {
  }

  var assign_Other_Department_Faculty = $(
    "#assign_Other_Department_Faculty"
  ).val();
  if (!assign_Other_Department_Faculty) {
    var error = "<li>Select Coordinator-II Faculty </li>";
    PU_validation(error);
    return false;
  } else {
  }

  PU_hide_validation();
  startLoader();
}

function validate_ViewThesisStudentList() {
  PU_hide_validation();

  var ThesisstudentActionId = $("#ThesisstudentActionId").val();
  if (!ThesisstudentActionId) {
    var error = "<li>Select Action </li>";
    PU_validation(error);
    return false;
  }
  PU_hide_validation();
  startLoader();

  $("#reapearStudentList_div_info").html("");
  var action = $("#ThesisstudentActionId").val();
  var csrf = $("#_csrf").val();
  var url = BASEURL + "examination/umsthesisstudents/viewthesisstudentlist";
  $.ajax({
    type: "POST",
    dataType: "json",
    url: url,
    data: {
      _csrf: csrf,
      action: action,
    },
    success: function (data) {
      stopLoader();
      var status_id = data.STATUS_ID;
      var res = data.STATUS_RESPONSE;
      if (status_id == "000") {
        $("#reapearStudentList_div_info").html(res);
      } else {
        PU_validation(res);
        return false;
      }
    },
  });
}
