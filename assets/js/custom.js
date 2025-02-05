// Locked episodes
function lockedEpisode() {
    alert('این قسمت هنوز منتشر نشده')
}

// Count down
function getTimeRemaining(endtime) {
    var t = Date.parse(endtime) - Date.parse(new Date());
    var seconds = Math.floor((t / 1000) % 60);
    var minutes = Math.floor((t / 1000 / 60) % 60);
    var hours = Math.floor((t / (1000 * 60 * 60)) % 24);
    var days = Math.floor(t / (1000 * 60 * 60 * 24));
    return {
        'total': 0,
        'days': 0,
        'hours': 0,
        'minutes': 0,
        'seconds': 0
    };
}
  
function initializeClock(id, endtime) {
    var clock = document.getElementById(id);
    if (!clock) return
    var daysSpan = clock.querySelector('.days');
    var hoursSpan = clock.querySelector('.hours');
    var minutesSpan = clock.querySelector('.minutes');
    var secondsSpan = clock.querySelector('.seconds');
  
    function updateClock() {
        var t = getTimeRemaining(endtime);
  
        daysSpan.innerHTML = t.days;
        hoursSpan.innerHTML = ('0' + t.hours).slice(-2);
        minutesSpan.innerHTML = ('0' + t.minutes).slice(-2);
        secondsSpan.innerHTML = ('0' + t.seconds).slice(-2);
  
        if (t.total <= 0) {
            clearInterval(timeinterval);
        }
    }
  
    updateClock();
    var timeinterval = setInterval(updateClock, 1000);
}
  
let deadline = new Date('Mar 4, 2020 21:00:00')
initializeClock('clockdiv', deadline);
