// Import components.
$("<script>", { src: "/js/components/accordion.js"}).appendTo("head");

$("<script>", { src: "/js/includes/me.js"}).appendTo("head");


// Variables.
isBirthday = false;


// Functions.
function copyToClipboard(copy, message) {
    navigator.clipboard.writeText(copy);
    alert(message);
}

function confirmAndCopyToClipboard(copy, message, confirm_message) {
    if (confirm_message == undefined)
        copyToClipboard(copy, message);
    else if (confirm(confirm_message))
        copyToClipboard(copy, message);
}


$(function() {
    birthDate = new Date(birthday);
    currentDate = new Date();

    // Birthday detection.
    if (currentDate.getMonth() == birthDate.getMonth() && currentDate.getDate() == birthDate.getDate()) {
        isBirthday = true;
    }

    if (isBirthday) {
        $(".birthday_hidden").show();
    } else {
        $(".birthday").removeClass("birthday");
    }

    // Update age.
    var ageYears = (currentDate.getFullYear() - birthDate.getFullYear());
    if (
        currentDate.getMonth() < birthDate.getMonth() ||
        (currentDate.getMonth() == birthDate.getMonth() && currentDate.getDate() < birthDate.getDate())
    ) {
        ageYears--;
    }

    $(".age").html(ageYears);
    if (isBirthday)
        $(".age").addClass("birthday");
})