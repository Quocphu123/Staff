staffList = [];

var createStaff = function() {
    var isFormValid = validation();

    if (!isFormValid) return;

    var id = document.getElementById("tknv").value;
    var name = document.getElementById("name").value;
    var email = document.getElementById("email").value;
    var password = document.getElementById("password").value;
    var dayWork = document.getElementById("datepicker").value;
    var salary = +document.getElementById("luongCB").value;
    var position = document.getElementById("chucvu").value;
    var timeWork = +document.getElementById("gioLam").value;

    var newStaff = new Staff(
        id,
        name,
        email,
        password,
        dayWork,
        salary,
        position,
        timeWork
    );

    staffList.push(newStaff);
    console.log(staffList);
    saveData();
    getData();
    document.getElementById("btnDong").click();
};

var renderStaff = function(renderList) {
    var dataHTML = "";
    for (var i = 0; i < renderList.length; i++) {
        dataHTML += `<tr>
            <td>${renderList[i].id}</td>
            <td>${renderList[i].name}</td>
            <td>${renderList[i].email}</td>
            <td>${renderList[i].dayWork}</td>
            <td>${renderList[i].position}</td>
            <td>${salaryStaff(
              renderList[i].position,
              renderList[i].salary
            )}</td>
            <td>${typeStaff(renderList[i].timeWork)}</td>
            <td>
                <button data-target="#myModal" data-toggle="modal" class="btn btn-info" onclick="getStaff(${
                  renderList[i].id
                })">Cập nhật</button>
                <button class="btn btn-danger" onclick="deleteStaff(${
                  renderList[i].id
                })">Xoá</button>
            </td>
        
        </tr>`;
    }

    document.getElementById("tableDanhSach").innerHTML = dataHTML;
};

var saveData = function() {
    var staffListJSON = JSON.stringify(staffList);
    localStorage.setItem("staffList", staffListJSON);
};

var getData = function() {
    var staffListJSON = JSON.parse(localStorage.getItem("staffList"));
    if (staffListJSON) {
        staffList = mapData(staffListJSON);
    }
    renderStaff(staffList);
};

var mapData = function(data) {
    var listData = [];
    for (var i = 0; i < data.length; i++) {
        var mappedStaff = new Staff(
            data[i].id,
            data[i].name,
            data[i].email,
            data[i].password,
            data[i].dayWork,
            data[i].salary,
            data[i].position,
            data[i].timeWork
        );
        listData.push(mappedStaff);
    }

    return listData;
};

var getStaff = function(id) {
    var index = findById(id);
    if (index === -1) {
        alert("Nhân viên k tồn tại");
        return false;
    }

    var foundStaff = staffList[index];

    document.getElementById("tknv").value = foundStaff.id;
    document.getElementById("name").value = foundStaff.name;
    document.getElementById("email").value = foundStaff.email;
    document.getElementById("password").value = foundStaff.password;
    document.getElementById("datepicker").value = foundStaff.dayWork;
    document.getElementById("luongCB").value = foundStaff.salary;
    document.getElementById("chucvu").value = foundStaff.position;
    document.getElementById("gioLam").value = foundStaff.timeWork;
};

var updateStaff = function(id) {
    var id = document.getElementById("tknv").value;
    var name = document.getElementById("name").value;
    var email = document.getElementById("email").value;
    var password = document.getElementById("password").value;
    var dayWork = document.getElementById("datepicker").value;
    var salary = +document.getElementById("luongCB").value;
    var position = document.getElementById("chucvu").value;
    var timeWork = +document.getElementById("gioLam").value;

    var newStaff = new Staff(
        id,
        name,
        email,
        password,
        dayWork,
        salary,
        position,
        timeWork
    );
};
var findById = function(id) {
    for (var i = 0; i < staffList.length; i++) {
        if (staffList[i].id === id) {
            return i;
        }
    }
    return -1;
};
var salaryStaff = function(position, salary) {
    if (position === "Sếp") {
        return salary * 3;
    }
    if (position === "Trưởng phòng") {
        return salary * 2;
    }
    return salary;
};

var typeStaff = function(time) {
    if (time >= 192) {
        return "Xuất sắc";
    }
    if (time >= 176 && time < 192) {
        return "Giỏi";
    }
    if (time >= 160 && time < 176) {
        return "Khá";
    }
    return "Trung Bình";
};

var deleteStaff = function(id) {
    var index = findById(id);
    if (index === -1) {
        alert("Sinh viên k tồn tại");
        return;
    }
    staffList.splice(index, 1);
    saveData();
    getData();
};

var findById = function(id) {
    for (var i = 0; i < staffList.length; i++) {
        if ((staffList[i].id = id)) {
            return i;
        }
    }
    return -1;
};

// ------ VALIDATION ------
var validation = function() {
    var id = document.getElementById("tknv").value;
    var name = document.getElementById("name").value;
    var email = document.getElementById("email").value;
    var password = document.getElementById("password").value;
    var dayWork = document.getElementById("datepicker").value;
    var position = document.getElementById("chucvu").value;
    var timeWork = +document.getElementById("gioLam").value;
    var salary = +document.getElementById("luongCB").value;

    var textPattern =
        /^[a-zA-ZÀÁÂÃÈÉÊÌÍÒÓÔÕÙÚĂĐĨŨƠàáâãèéêìíòóôõùúăđĩũơƯĂẠẢẤẦẨẪẬẮẰẲẴẶẸẺẼỀỀỂẾưăạảấầẩẫậắằẳẵặẹẻẽềềểếỄỆỈỊỌỎỐỒỔỖỘỚỜỞỠỢỤỦỨỪễệỉịọỏốồổỗộớờởỡợụủứừỬỮỰỲỴÝỶỸửữựỳỵỷỹ\s\W|_]+/;
    var emailPattern =
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    var passwordPattern =
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

    var isValid = true;
    // if (position === "Chọn chức vụ") {
    //     position = "";
    //     required(position, "tbChucVu", "Vui lòng chọn chức vụ");
    //     return !isValid;
    // }

    isValid &= required(id, "tbTKNV") && length(id, "tbTKNV", 4, 6);
    isValid &= required(name, "tbTen") && length(id, "tbTKNV", 4, 6);
    isValid &=
        required(email, "tbEmail") && pattern(email, "tbEmail", emailPattern);
    isValid &=
        required(password, "tbMatKhau") &&
        pattern(password, "tbMatKhau", passwordPattern);
    isValid &= required(dayWork, "tbNgay");
    isValid &=
        required(timeWork, "tbGiolam") && length(timeWork, "tbGiolam", 4, 6);
    var minTimeWork = 80;
    var maxTimeWork = 200;
    isValid &=
        required(timeWork, "tbGiolam") &&
        numberRangeValidate(
            timeWork,
            "tbGiolam",
            minTimeWork,
            maxTimeWork,
            `* Số giờ làm trong tháng ${minTimeWork} - ${maxTimeWork} giờ.`
        );

    var minSalary = 1000000;
    var maxSalary = 20000000;
    isValid &=
        required(salary, "tbLuongCB") &&
        numberRangeValidate(
            salary,
            "tbLuongCB",
            minSalary,
            maxSalary,
            `* Lương phải từ ${minSalary} - ${maxSalary} đồng.`
        );

    console.log(isValid);
    return isValid;
};

var required = function(val, spanId, message) {
    if (!val) {
        document.getElementById(spanId).innerHTML =
            message || "* Trường này bắt buộc nhập!";
        document.getElementById(spanId).style.display = "inline-block";
        return false;
    }
    document.getElementById(spanId).style.display = "none";
    document.getElementById(spanId).innerHTML = "";
    return true;
};

var length = function(val, spanId, min, max) {
    if (val.length < min || val.length > max) {
        document.getElementById(
            spanId
        ).innerHTML = `* Độ dài phải từ ${min} tới ${max} kí tự`;
        document.getElementById(spanId).style.display = "inline-block";
        return false;
    }
    document.getElementById(spanId).style.display = "none";
    document.getElementById(spanId).innerHTML = "";
    return true;
};

var pattern = function(val, spanId, regex) {
    var valid = regex.test(val);

    if (!valid) {
        document.getElementById(spanId).innerHTML = "* Không đúng định dạng";
        document.getElementById(spanId).style.display = "inline-block";
        return false;
    }
    document.getElementById(spanId).style.display = "none";

    document.getElementById(spanId).innerHTML = "";
    return true;
};

var numberRangeValidate = function(value, spanId, min, max, message) {
    if (value < min || value > max) {
        document.getElementById(spanId).innerHTML = message;
        return false;
    }
    // document.getElementById("tbTKNV").style.display = "none";
    document.getElementById(spanId).innerHTML = "";
    return true;
};