$(function() {
    //初次加载数据
    function newLoad() {
        $.getJSON('http://127.0.0.1:3000/api/students').done(function(data) {
            vm.students = data.students;
        }).fail(function(jqXHR, textStatus) {
            alert('Error: ' + jqXHR.status);
        });

    }
    newLoad();
    //点击新建与叉叉
    $("#add").click(function() {

        $("#add_box").css("display", "block");
    });
    $(".close").click(function() {
        $(".add_box").css("display", "none");
    });

    var vm = new Vue({
        el: '#student-list',
        data: {
            students: {
                college: "",
                name: '',
                sex: '',
                age: '',
                student_id: ''
            }
        },
        methods: {
            //点击删除
            deleteStudent: function(id) {
                var that = this;
                $.ajax({
                    type: 'delete',
                    dataType: 'json',
                    url: '/api/student/' + id
                }).done(function(r) {
                    // console.log(r);
                    alert(r.result);
                    newLoad();
                }).fail(function(jqXHR) {
                    alert('Error:' + jqXHR.status);
                });
            },
            //点击修改按钮
            putStudent: function(id) {
                $("#put_box").css("display", "block");
                var that = this;
                $.ajax({
                    type: 'get',
                    dataType: 'json',
                    url: '/api/student/' + id
                }).done(function(r) {
                    // console.log(r);
                    app2.student = r.student;
                }).fail(function(jqXHR) {
                    alert('Error:' + jqXHR.status);
                });
            }
        }
    });
    window.vm = vm;
    //新建学生
    var app = new Vue({
        el: '#student-form',
        data: {
            student: {
                college: "信息与工程",
                name: '何国锋',
                sex: '男',
                age: '23',
                student_id: '1306010053'
            }
        },
        methods: {
            submitForm: function() {
                var
                    student = {
                        college: app.student.college,
                        name: app.student.name,
                        sex: app.student.sex,
                        age: app.student.age,
                        student_id: app.student.student_id
                    };
                $.ajax({
                    type: "post",
                    dataType: "json",
                    url: '/api/student',
                    data: student
                }).done(function(r) {
                    newLoad();
                    $(".add_box").css("display", "none");
                }).fail(function(jqXHR, textStatus) {
                    alert('error' + jqXHR.status);
                });
            }
        }
    });
    window.app = app;

    //修改学生
    var app2 = new Vue({
        el: "#app2",
        data: {
            student: {
                college: "",
                name: '',
                sex: '',
                age: '',
                student_id: ''
            }
        },
        methods: {
            updateForm: function(id) {
                var
                    student = {
                        college: app2.student.college,
                        name: app2.student.name,
                        sex: app2.student.sex,
                        age: app2.student.age,
                        student_id: app2.student.student_id
                    };
                $.ajax({
                    type: "put",
                    dataType: "json",
                    url: '/api/student/' + id,
                    data: student
                }).done(function(r) {
                    alert("已成功修改");
                    newLoad();
                    $(".add_box").css("display", "none");
                }).fail(function(jqXHR, textStatus) {
                    alert('error' + jqXHR.status);
                });
            }
        }
    });
    $("#deleteAll").click(function() {
        $.getJSON('/api/students').done(function(data) {
            vm.students = data.students;
        }).fail(function(jqXHR, textStatus) {
            alert('Error: ' + jqXHR.status);
        });
        $.ajax({
            type: "delete",
            dataType: "json",
            url: '/api/delAllStudents'
        }).done(function(r) {
            alert(r.result);
            newLoad();
        }).fail(function(jqXHR) {
            alert("删除失败" + jqXHR.status);
        });
    });

    //加载结束标签
});