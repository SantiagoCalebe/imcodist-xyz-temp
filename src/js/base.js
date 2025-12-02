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

(() => {
  const body = document.body;
  const html = document.documentElement;

  let currentScroll = window.scrollY || window.pageYOffset;
  let targetScroll = currentScroll;
  let isScrolling = false;

  const ease = 0.1;

  function smoothScroll() {
    currentScroll += (targetScroll - currentScroll) * ease;
    window.scrollTo(0, currentScroll);

    if (Math.abs(targetScroll - currentScroll) > 0.5) {
      requestAnimationFrame(smoothScroll);
    } else {
      isScrolling = false;
    }
  }

  window.addEventListener("wheel", (e) => {
    e.preventDefault();
    targetScroll += e.deltaY;
    targetScroll = Math.max(0, Math.min(targetScroll, html.scrollHeight - window.innerHeight));

    if (!isScrolling) {
      isScrolling = true;
      requestAnimationFrame(smoothScroll);
    }
  }, { passive: false });

  window.addEventListener("keydown", (e) => {
    let delta = 0;
    switch(e.key) {
      case "ArrowDown": delta = 40; break;
      case "ArrowUp": delta = -40; break;
      case "PageDown": delta = window.innerHeight; break;
      case "PageUp": delta = -window.innerHeight; break;
      case "Home": delta = -targetScroll; break;
      case "End": delta = html.scrollHeight; break;
      default: return;
    }
    e.preventDefault();
    targetScroll += delta;
    targetScroll = Math.max(0, Math.min(targetScroll, html.scrollHeight - window.innerHeight));

    if (!isScrolling) {
      isScrolling = true;
      requestAnimationFrame(smoothScroll);
    }
  });
})();
